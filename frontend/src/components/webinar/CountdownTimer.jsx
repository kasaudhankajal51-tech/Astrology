import { motion } from 'framer-motion';

const CountdownTimer = ({ timeLeft }) => {
  // If no timeLeft is provided (e.g. standalone usage), use a default
  const time = timeLeft || { hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="countdown-timer-container">
      <div className="timer-title">OFFER ENDS IN:</div>
      <div className="timer-display">
        <div className="timer-unit">
          <span className="unit-value">{String(time.hours).padStart(2, '0')}</span>
          <span className="unit-label">HOURS</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-unit">
          <span className="unit-value">{String(time.minutes).padStart(2, '0')}</span>
          <span className="unit-label">MINS</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-unit">
          <span className="unit-value">{String(time.seconds).padStart(2, '0')}</span>
          <span className="unit-label">SECS</span>
        </div>
      </div>
      <style>{`
        .countdown-timer-container {
          background: rgba(255, 106, 0, 0.05);
          border: 1px solid rgba(255, 106, 0, 0.2);
          padding: 25px 45px;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin: 30px 0;
          max-width: max-content;
        }
        .timer-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: #ff6a00;
          letter-spacing: 2px;
          opacity: 0.9;
        }
        .timer-display {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .timer-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #2d3748;
          padding: 10px 15px;
          border-radius: 12px;
          min-width: 75px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .unit-value {
          font-size: 2.2rem;
          font-weight: 900;
          color: #fff;
          line-height: 1;
        }
        .unit-label {
          font-size: 0.6rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
          margin-top: 5px;
          text-transform: uppercase;
        }
        .timer-separator {
          font-size: 1.8rem;
          font-weight: 900;
          color: #ff6a00;
        }
        @media (max-width: 576px) {
          .unit-value { font-size: 1.8rem; }
          .timer-unit { min-width: 60px; padding: 8px 10px; }
          .countdown-timer-container { padding: 15px 25px; }
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
