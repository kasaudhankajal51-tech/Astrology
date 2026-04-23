import { Link, useSearchParams } from 'react-router-dom';

function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('leadId');
  const txn = searchParams.get('txn');

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#070913', color: '#fff' }}>
      <div className="text-center p-5" style={{ background: 'rgba(220, 53, 69, 0.1)', border: '1px solid #dc3545', borderRadius: '15px', maxWidth: '600px' }}>
        <i className="fas fa-times-circle mb-4" style={{ fontSize: '5rem', color: '#dc3545' }}></i>
        <h1 className="mb-3">Payment Failed</h1>
        <p className="fs-5 mb-4">We couldn't process your payment. Your account has not been charged.</p>
        <p className="text-muted mb-4">Attempted Transaction: {txn}</p>
        
        <div className="d-flex gap-3 justify-content-center mt-4">
          <Link to={`/payment?leadId=${leadId}&amount=999&txn=retry_${Date.now()}`} className="btn btn-danger px-4 py-2">
            Retry Payment
          </Link>
          <Link to="/" className="btn btn-outline-light px-4 py-2">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;
