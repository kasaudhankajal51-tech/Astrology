import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';


function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Extract parameters
  const leadId = searchParams.get('leadId');
  const name = decodeURIComponent(searchParams.get('name') || '');
  const email = decodeURIComponent(searchParams.get('email') || '');
  const phone = searchParams.get('phone') || '';
  const rawAmount = searchParams.get('amount') || '9900'; 
  const orderId = searchParams.get('orderId');
  const keyId = searchParams.get('keyId');

  // Calculations to match the image (₹99 total)
  const totalAmountNum = parseFloat(rawAmount) / 100 || 99;
  const totalAmount = totalAmountNum.toFixed(2);
  const cgst = (totalAmountNum * 0.0763).toFixed(2); // Approximate to match image's 7.55
  const sgst = (totalAmountNum * 0.0763).toFixed(2); // Approximate to match image's 7.55
  const baseAmount = (totalAmountNum - cgst - sgst).toFixed(2); // Should be around 83.90

  useEffect(() => {
    if (!leadId) {
      toast.error('Invalid Session');
      navigate('/webinar');
    }
  }, [leadId, navigate]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    setIsProcessing(true);

    if (orderId && orderId.startsWith('order_mock_')) {
      toast.success('Simulating Payment...');
      setTimeout(async () => {
        try {
          const verifyRes = await fetch(`${API_BASE}/api/leads/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: orderId,
              razorpay_payment_id: 'pay_mock_' + Date.now(),
              razorpay_signature: 'mock_signature',
              leadId
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success('Payment Successful!');
            navigate(`/payment-success?txn=mock_txn_${Date.now()}`);
          }
        } catch (err) {
          toast.error('Verification Error');
        } finally {
          setIsProcessing(false);
        }
      }, 1500);
      return;
    }

    const resScript = await loadRazorpay();
    if (!resScript) {
      toast.error('Razorpay SDK failed to load');
      setIsProcessing(false);
      return;
    }

    const options = {
      key: keyId || "rzp_test_placeholder",
      amount: rawAmount,
      currency: "INR",
      name: "Astro Ava",
      description: "Webinar Registration",
      image: "/images/logo.png",
      order_id: orderId,
      handler: async function (response) {
        setIsProcessing(true);
        try {
          const verifyRes = await fetch(`${API_BASE}/api/leads/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, leadId })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success('Booking Confirmed!');
            navigate(`/payment-success?txn=${response.razorpay_payment_id}`);
          } else {
            toast.error('Payment verification failed.');
          }
        } catch (err) {
          toast.error('Connection Error');
        } finally {
          setIsProcessing(false);
        }
      },
      prefill: { name, email, contact: phone },
      theme: { color: "#6b4a44" },
      modal: { ondismiss: () => setIsProcessing(false) }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="razorpay-page-clone">
      <div className="payment-card shadow-sm">
        <div className="card-header-custom">
          <span>Astroga-Mega Astrology Webinar</span>
        </div>
        
        <div className="card-body-custom">
          <div className="price-row mt-3">
            <span className="label">Amount</span>
            <span className="value">Rs.{baseAmount}</span>
          </div>
          <p className="note-text mt-2">Please note that this payment is non-refundable.</p>

          <div className="gst-section mt-4">
            <div className="gst-input-group">
              <label>GST Identification Number (Optional)</label>
              <input type="text" className="form-control-custom" />
            </div>
            
            <div className="price-row mt-3">
              <span className="label-sub">CGST9 (9%)</span>
              <span className="value-sub">Rs.{cgst}</span>
            </div>
            <div className="price-row mt-2">
              <span className="label-sub">SGST9 (9%)</span>
              <span className="value-sub">Rs.{sgst}</span>
            </div>
          </div>

          <div className="total-box mt-4">
            <span className="total-label">Total</span>
            <span className="total-value">Rs.{totalAmount}</span>
          </div>

          <div className="contact-details mt-5">
            <h6 className="section-title">Contact Details</h6>
            <div className="row g-3">
              <div className="col-md-6">
                <input type="text" className="form-control-custom" placeholder="Full Name*" value={name} readOnly />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control-custom" placeholder="Email*" value={email} readOnly />
              </div>
              <div className="col-12">
                <input type="text" className="form-control-custom" placeholder="WhatsApp Number With Country Code*" value={phone} readOnly />
              </div>
            </div>
          </div>

          <div className="billing-address mt-4">
            <h6 className="section-title">Billing Address</h6>
            <div className="row g-3">
              <div className="col-12">
                <select className="form-select-custom">
                  <option>India</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select-custom">
                  <option>Uttar Pradesh</option>
                </select>
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control-custom" placeholder="City" />
              </div>
            </div>
          </div>

          <div className="action-button mt-5">
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Checkout with Razorpay'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .razorpay-page-clone {
          background: #fdfdfd;
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #2c3e50;
        }
        .payment-card {
          background: #fff;
          width: 100%;
          max-width: 500px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          overflow: hidden;
        }
        .card-header-custom {
          background: #6b4a44;
          color: #fff;
          padding: 15px;
          text-align: center;
          font-weight: 500;
          font-size: 1.1rem;
        }
        .card-body-custom {
          padding: 30px;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .label { font-weight: 500; font-size: 1rem; }
        .value { font-weight: 700; font-size: 1.1rem; }
        .note-text { font-size: 0.85rem; color: #7f8c8d; }
        
        .gst-input-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .gst-input-group label { font-size: 0.85rem; color: #7f8c8d; flex: 1; }
        .gst-input-group input { width: 140px; }

        .label-sub { font-size: 0.9rem; color: #34495e; }
        .value-sub { font-size: 0.95rem; color: #34495e; }

        .total-box {
          background: #f8f9fa;
          padding: 15px 0;
          margin: 0 -30px;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #f1f1f1;
          border-bottom: 1px solid #f1f1f1;
        }
        .total-label { font-size: 1.1rem; color: #2c3e50; }
        .total-value { font-size: 1.2rem; font-weight: 700; color: #2c3e50; }

        .section-title {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #2c3e50;
        }
        .form-control-custom {
          width: 100%;
          padding: 10px;
          border: 1px solid #dcdde1;
          border-radius: 4px;
          font-size: 0.9rem;
          background: #fff;
        }
        .form-control-custom:focus { outline: none; border-color: #6b4a44; }
        .form-select-custom {
          width: 100%;
          padding: 10px;
          border: 1px solid #dcdde1;
          border-radius: 4px;
          font-size: 0.9rem;
          background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e") no-repeat right 0.75rem center/16px 12px;
          appearance: none;
        }

        .checkout-btn {
          width: 100%;
          background: #4a5568;
          color: #fff;
          border: none;
          padding: 15px;
          font-weight: 600;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .checkout-btn:hover { background: #34495e; }
        .checkout-btn:disabled { background: #95a5a6; cursor: wait; }

        @media (max-width: 500px) {
          .razorpay-page-clone { padding: 10px; background: #fff; }
          .payment-card { border: none; border-radius: 0; box-shadow: none; }
          .card-body-custom { padding: 15px; }
          .total-box { margin: 0 -15px; padding: 15px; }
          .gst-input-group label { font-size: 0.75rem; }
          .gst-input-group input { width: 100px; }
          .section-title { font-size: 0.85rem; }
          .form-control-custom, .form-select-custom { padding: 8px; font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
}

export default Payment;
