import { Link, useSearchParams } from 'react-router-dom';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const txn = searchParams.get('txn');

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#070913', color: '#fff' }}>
      <div className="text-center p-5" style={{ background: 'rgba(40, 167, 69, 0.1)', border: '1px solid #28a745', borderRadius: '15px', maxWidth: '600px' }}>
        <i className="fas fa-check-circle mb-4" style={{ fontSize: '5rem', color: '#28a745' }}></i>
        <h1 className="mb-3">Booking Confirmed!</h1>
        <p className="fs-5 mb-4">Your payment was successful and your seat is reserved.</p>
        <p className="text-muted mb-4">Transaction ID: {txn}</p>
        <div className="alert alert-success" style={{ background: 'rgba(40, 167, 69, 0.2)', color: '#a3d1a9', border: 'none' }}>
          We have sent a confirmation email to your registered email address with further details.
        </div>
        <Link to="/" className="btn btn-outline-light mt-4 px-4 py-2">Return Home</Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
