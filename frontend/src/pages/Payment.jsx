import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const leadId = searchParams.get('leadId');
  const name = decodeURIComponent(searchParams.get('name') || '');
  const email = decodeURIComponent(searchParams.get('email') || '');
  const phone = searchParams.get('phone') || '';
  const amount = searchParams.get('amount') || '9900'; 
  const orderId = searchParams.get('orderId');
  const keyId = searchParams.get('keyId');

  const totalAmount = (parseInt(amount) / 100).toFixed(2);
  const cgst = (totalAmount * 0.09).toFixed(2);
  const sgst = (totalAmount * 0.09).toFixed(2);
  const baseAmount = (totalAmount - cgst - sgst).toFixed(2);

  useEffect(() => {
    if (!leadId) {
      toast.error('Invalid Session. Please register again.');
      navigate('/webinar');
    }
  }, [leadId, navigate]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
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
      toast.success('Cosmic Alignment in Progress...');
      setTimeout(async () => {
        try {
          const verifyRes = await fetch('http://localhost:5000/api/leads/verify-payment', {
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
            toast.success('Your Destiny is Confirmed!');
            navigate(`/payment-success?txn=mock_txn_${Date.now()}`);
          }
        } catch (err) {
          toast.error('Cosmic interference. Try again.');
        } finally {
          setIsProcessing(false);
        }
      }, 2000);
      return;
    }

    const resScript = await loadRazorpay();
    if (!resScript) {
      toast.error('Razorpay SDK failed to load.');
      setIsProcessing(false);
      return;
    }

    const options = {
      key: keyId || "rzp_test_placeholder",
      amount: amount,
      currency: "INR",
      name: "Astro Ava",
      description: "2-Day Mega Astrology Webinar",
      image: "/images/logo.png",
      order_id: orderId,
      handler: async function (response) {
        setIsProcessing(true);
        try {
          const verifyRes = await fetch('http://localhost:5000/api/leads/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              leadId
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success('Registration successful!');
            navigate(`/payment-success?txn=${response.razorpay_payment_id}`);
          } else {
            toast.error('Payment verification failed.');
          }
        } catch (err) {
          toast.error('Error verifying payment.');
        } finally {
          setIsProcessing(false);
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: phone
      },
      theme: { color: "#ff6a00" },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="cosmic-payment-page">
      <div className="stars-bg"></div>
      <div className="payment-container" data-aos="fade-up">
        <div className="payment-glass-card">
          <div className="brand-header">
            <img src="/images/logo.png" alt="Astro Ava" className="payment-logo" />
            <h2 className="brand-name">Astro <span className="text-highlight">Ava</span></h2>
          </div>

          <div className="order-summary-box">
            <h5 className="summary-title">Booking Summary</h5>
            <div className="summary-grid">
              <div className="summary-row">
                <span>Webinar Registration Fee</span>
                <span>₹{baseAmount}</span>
              </div>
              <div className="summary-row">
                <span>CGST (9%)</span>
                <span>₹{cgst}</span>
              </div>
              <div className="summary-row">
                <span>SGST (9%)</span>
                <span>₹{sgst}</span>
              </div>
              <div className="total-divider"></div>
              <div className="summary-row total-row">
                <span className="total-label">Total Amount Payable</span>
                <span className="total-value">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="user-info-section">
            <div className="info-badge">
              <i className="fas fa-user"></i>
              <span>{name}</span>
            </div>
            <div className="info-badge">
              <i className="fas fa-envelope"></i>
              <span>{email}</span>
            </div>
          </div>

          <div className="payment-action mt-4">
            <button 
              className="checkout-button-cosmic" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="loader-container">
                  <span className="spinner"></span>
                  Aligning Stars...
                </span>
              ) : (
                <>
                  <i className="fas fa-lock-alt me-2"></i>
                  Complete Secure Payment
                </>
              )}
            </button>
            <p className="secure-tag mt-3">
              <i className="fas fa-shield-check"></i> 100% Secure Transaction via Razorpay
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Merriweather+Sans:wght@400;700;800&display=swap');

        :root {
          --brand-dark: #070913;
          --brand-navy: #0b1220;
          --brand-accent: #ff6a00;
          --brand-highlight: #ff0080;
          --brand-light: #ffffff;
          --brand-gray: #a0aec0;
          --gradient-cosmic: linear-gradient(135deg, #070913 0%, #1a0b2e 100%);
          --gradient-cta: linear-gradient(135deg, #ff6a00 0%, #ff0080 100%);
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
        }

        .cosmic-payment-page {
          min-height: 100vh;
          background: var(--brand-dark);
          background-image: var(--gradient-cosmic);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
          color: #fff;
        }

        .stars-bg {
          position: absolute;
          inset: 0;
          background: url('https://www.transparenttextures.com/patterns/stardust.png');
          opacity: 0.3;
          pointer-events: none;
        }

        .payment-container {
          width: 100%;
          max-width: 550px;
          z-index: 10;
        }

        .payment-glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 30px;
          padding: 50px 40px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5), 0 0 30px rgba(255, 106, 0, 0.1);
          text-align: center;
        }

        .brand-header { margin-bottom: 40px; }
        .payment-logo { height: 60px; margin-bottom: 15px; filter: drop-shadow(0 0 10px rgba(255,106,0,0.3)); }
        .brand-name { font-size: 2rem; font-weight: 800; letter-spacing: 1px; }
        .text-highlight { background: var(--gradient-cta); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .order-summary-box {
          background: rgba(0,0,0,0.2);
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 30px;
          border: 1px solid var(--glass-border);
        }
        .summary-title { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: var(--brand-gray); margin-bottom: 20px; font-weight: 700; }
        .summary-grid { display: flex; flex-direction: column; gap: 12px; }
        .summary-row { display: flex; justify-content: space-between; font-size: 1rem; color: #ddd; }
        .total-divider { height: 1px; background: var(--glass-border); margin: 10px 0; }
        .total-row { color: #fff; font-weight: 700; }
        .total-label { font-size: 1.1rem; }
        .total-value { font-size: 1.4rem; color: var(--brand-accent); }

        .user-info-section { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 30px; }
        .info-badge { background: rgba(255,255,255,0.05); padding: 8px 15px; border-radius: 50px; border: 1px solid var(--glass-border); font-size: 0.85rem; color: var(--brand-gray); display: flex; align-items: center; gap: 8px; }
        .info-badge i { color: var(--brand-accent); }

        .checkout-button-cosmic {
          width: 100%;
          background: var(--gradient-cta);
          color: #fff;
          border: none;
          padding: 18px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 106, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .checkout-button-cosmic:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(255, 106, 0, 0.6); }
        .checkout-button-cosmic:disabled { opacity: 0.7; transform: none; cursor: wait; }

        .secure-tag { font-size: 0.85rem; color: var(--brand-gray); display: flex; align-items: center; justify-content: center; gap: 8px; }
        .secure-tag i { color: #28a745; }

        .loader-container { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .spinner { width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid #fff; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .payment-glass-card { padding: 40px 20px; }
          .brand-name { font-size: 1.6rem; }
          .total-value { font-size: 1.2rem; }
        }
      `}</style>
    </div>
  );
}

export default Payment;
