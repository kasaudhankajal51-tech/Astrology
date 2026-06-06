import { Link, useSearchParams } from 'react-router-dom';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const txn = searchParams.get('txn') || searchParams.get('razorpay_payment_id');

  return (
    <div className="payment-result-page site-page">
      <div className="payment-result-card">
        <div className="payment-status-icon success">
          <i className="fas fa-check"></i>
        </div>
        <span className="site-kicker">Payment Complete</span>
        <h1>Registration Successful</h1>
        <p>Your seat for the webinar is confirmed. A confirmation email with the joining details has been sent to you.</p>

        {txn && (
          <div className="txn-box">
            <span>Transaction ID</span>
            <code>{txn}</code>
          </div>
        )}

        <Link to="/" className="site-btn">Return Home</Link>
      </div>

      <style>{`
        .payment-result-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--site-bg);
          padding: var(--page-pad-x);
        }

        .payment-result-card {
          width: min(100%, 38rem);
          text-align: center;
          background: var(--site-surface);
          border: 1px solid var(--site-border);
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-card);
          padding: clamp(1.5rem, 5vw, 2.5rem);
        }

        .payment-status-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 1.6rem;
        }

        .payment-status-icon.success {
          color: #087f4f;
          background: rgba(8, 127, 79, 0.12);
        }

        .payment-result-card h1 {
          font-family: var(--font-heading);
          color: var(--site-text);
          font-size: var(--h1-size);
          margin-bottom: 0.8rem;
        }

        .payment-result-card p {
          color: var(--site-muted);
          line-height: 1.7;
          margin-bottom: 1.3rem;
        }

        .txn-box {
          background: #fff7ee;
          border: 1px solid var(--site-border);
          border-radius: var(--radius-control);
          padding: 0.9rem;
          margin-bottom: 1.4rem;
        }

        .txn-box span {
          display: block;
          color: var(--site-muted);
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.35rem;
        }

        .txn-box code {
          color: var(--site-primary);
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}

export default PaymentSuccess;
