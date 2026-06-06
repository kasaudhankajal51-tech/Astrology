import { Link, useSearchParams } from 'react-router-dom';

function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('leadId');
  const txn = searchParams.get('txn');

  return (
    <div className="payment-result-page site-page">
      <div className="payment-result-card">
        <div className="payment-status-icon failed">
          <i className="fas fa-times"></i>
        </div>
        <span className="site-kicker">Payment Failed</span>
        <h1>We Could Not Process It</h1>
        <p>Your account has not been charged. You can retry the payment or return to the website.</p>

        {txn && (
          <div className="txn-box">
            <span>Attempted Transaction</span>
            <code>{txn}</code>
          </div>
        )}

        <div className="payment-actions">
          <Link to={`/payment?leadId=${leadId || ''}&amount=999&txn=retry_${Date.now()}`} className="site-btn">
            Retry Payment
          </Link>
          <Link to="/" className="site-btn site-btn-outline">
            Cancel
          </Link>
        </div>
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

        .payment-status-icon.failed {
          color: #b42318;
          background: rgba(180, 35, 24, 0.1);
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

        .payment-actions {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}

export default PaymentFailed;
