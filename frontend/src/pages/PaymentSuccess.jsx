import { Link, useSearchParams } from 'react-router-dom';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const txn = searchParams.get('txn');

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#070913', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
      <div className="text-center p-5" style={{ background: 'rgba(255, 106, 0, 0.05)', border: '1px solid rgba(255, 106, 0, 0.2)', borderRadius: '30px', maxWidth: '600px', backdropFilter: 'blur(10px)' }}>
        <div className="success-icon-wrapper mb-4">
          <i className="fas fa-check-circle" style={{ fontSize: '6rem', color: '#ff6a00' }}></i>
        </div>
        <h1 className="mb-3" style={{ fontWeight: 800 }}>Registration Successful!</h1>
        <p className="fs-5 mb-4" style={{ color: '#a0aec0' }}>Your stars are aligned. Your seat for the 2-Day Mega Astrology Webinar is now confirmed.</p>
        
        <div className="txn-box p-3 mb-4" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <span className="text-muted small d-block mb-1">TRANSACTION ID</span>
          <code style={{ color: '#ff6a00', fontSize: '1.1rem' }}>{txn}</code>
        </div>

        <div className="alert alert-success" style={{ background: 'rgba(40, 167, 69, 0.1)', color: '#a3d1a9', border: '1px solid rgba(40, 167, 69, 0.2)', borderRadius: '15px' }}>
          <i className="fas fa-envelope-open-text me-2"></i>
          A confirmation email with the joining link has been sent to you.
        </div>
        
        <div className="d-flex gap-3 justify-content-center mt-5">
          <Link to="/" className="btn btn-outline-light px-4 py-3" style={{ borderRadius: '50px' }}>Return Home</Link>
          <Link to="/admin/leads" className="btn btn-primary px-4 py-3" style={{ background: 'linear-gradient(135deg, #ff6a00, #ff0080)', border: 'none', borderRadius: '50px', fontWeight: '700' }}>
            Check Admin Bookings
          </Link>
        </div>
      </div>

      <style>{`
        .success-icon-wrapper {
          animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes scaleUp {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default PaymentSuccess;
