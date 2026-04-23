import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const leadId = searchParams.get('leadId');
  const amount = searchParams.get('amount') || '999';
  const txn = searchParams.get('txn');

  useEffect(() => {
    if (!leadId) {
      toast.error('Invalid Payment Request');
      navigate('/');
    }
  }, [leadId, navigate]);

  const handlePayment = async (status) => {
    setIsProcessing(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads/payment-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status, transactionId: txn }),
      });
      const data = await res.json();
      
      if (data.success && status === 'Completed') {
        toast.success('Payment Successful! Confirmation email sent.');
        navigate(`/payment-success?txn=${txn}`);
      } else {
        toast.error('Payment Failed. Please try again.');
        navigate(`/payment-failed?leadId=${leadId}&txn=${txn}`);
      }
    } catch (err) {
      toast.error('Network Error during payment processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#070913', color: '#fff' }}>
      <div className="payment-card p-5" style={{ background: '#1a1a2e', borderRadius: '15px', border: '1px solid #ff6a00', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <i className="fas fa-lock mb-3" style={{ fontSize: '3rem', color: '#ff6a00' }}></i>
        <h2 className="mb-4">Secure Checkout</h2>
        
        <div className="order-summary mb-4 text-start p-3" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
          <div className="d-flex justify-content-between mb-2">
            <span>Registration Fee</span>
            <strong>₹{amount}</strong>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Taxes</span>
            <strong>₹0.00</strong>
          </div>
          <hr style={{ borderColor: '#555' }} />
          <div className="d-flex justify-content-between fs-4">
            <span>Total</span>
            <strong style={{ color: '#ff6a00' }}>₹{amount}</strong>
          </div>
        </div>

        <p className="text-muted mb-4">Click below to simulate the payment process.</p>
        
        <button 
          onClick={() => handlePayment('Completed')} 
          className="btn btn-success w-100 mb-3 p-3 fs-5"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Simulate Successful Payment'}
        </button>
        
        <button 
          onClick={() => handlePayment('Failed')} 
          className="btn btn-outline-danger w-100 p-2"
          disabled={isProcessing}
        >
          Simulate Failed Payment
        </button>
      </div>
    </div>
  );
}

export default Payment;
