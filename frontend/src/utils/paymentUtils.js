import API_BASE from './api';
import toast from 'react-hot-toast';

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const handleRazorpayPayment = async (formData, onSuccess) => {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error('Razorpay SDK failed to load. Check your connection.');
      return false;
    }

    const amount = parseInt(formData.price.replace('₹', '').replace(',', ''), 10);
    const payload = { ...formData, amount, type: 'Consultation', consultationType: formData.consultationType };

    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    
    if (!data.success) {
      toast.error(data.error || data.message || 'Failed to initiate booking');
      return false;
    }

    const options = {
      key: data.keyId,
      name: "DS Astro Institute",
      description: `Consultation Booking: ${formData.consultationType}`,
      image: "/images/logo.png",
      order_id: data.orderId,
      handler: async function (response) {
        try {
          const verifyRes = await fetch(`${API_BASE}/api/leads/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              leadId: data.leadId
            })
          });
          const verifyData = await verifyRes.json();
          
          if (verifyData.success) {
            onSuccess();
          } else {
            toast.error('Payment verification failed.');
          }
        } catch (err) {
          toast.error('Error verifying payment.');
        }
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone
      },
      theme: {
        color: "#8B4A1E"
      }
    };

    if (data.isMock) {
      toast.success("Test Mode: Simulating Payment Success...");
      options.handler({
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_order_id: data.orderId,
        razorpay_signature: "mock_signature"
      });
    } else {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
    }
    return true; // Indicates payment flow started
  } catch (err) {
    toast.error('Error: ' + err.message);
    return false;
  }
};
