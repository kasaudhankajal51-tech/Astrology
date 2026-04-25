import { useState, useEffect } from 'react';

const CountdownTimer = ({ minimal = false }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // 24 Hour Persistence Logic
    const getTargetTime = () => {
      const stored = localStorage.getItem('webinar_timer_v4');
      if (stored) return parseInt(stored);
      
      const newTarget = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('webinar_timer_v4', newTarget.toString());
      return newTarget;
    };

    const targetTime = getTargetTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        // Reset for another 24 hours
        const resetTarget = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('webinar_timer_end', resetTarget.toString());
        return;
      }

      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (minimal) {
    return (
      <div className="minimal-timer">
        <span className="timer-label">Ends In:</span>
        <div className="timer-vals">
          <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
        <style>{`
          .minimal-timer { display: flex; align-items: center; gap: 12px; background: #FFF1F2; padding: 10px 20px; border-radius: 12px; border: 1px solid #FECACA; }
          .timer-label { font-size: 0.8rem; font-weight: 800; color: #EE6662; text-transform: uppercase; }
          .timer-vals { display: flex; gap: 8px; font-weight: 900; color: #3B2261; font-size: 1.1rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="countdown-timer-container">
      <div className="timer-title">OFFER EXPIRES IN</div>
      <div className="timer-display">
        <div className="timer-unit">
          <span className="unit-value">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="unit-label">HOURS</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-unit">
          <span className="unit-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="unit-label">MINS</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-unit">
          <span className="unit-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="unit-label">SECS</span>
        </div>
      </div>
      <style>{`
        .countdown-timer-container {
          background: #fff;
          border: 2px solid #3B2261;
          padding: 30px 50px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          max-width: max-content;
          margin: 40px auto;
          box-shadow: 0 15px 35px rgba(59, 34, 97, 0.1);
        }
        .timer-title { font-size: 0.9rem; font-weight: 900; color: #3B2261; letter-spacing: 2px; }
        .timer-display { display: flex; align-items: center; gap: 15px; }
        .timer-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #3B2261;
          padding: 12px 20px;
          border-radius: 15px;
          min-width: 85px;
        }
        .unit-value { font-size: 2.8rem; font-weight: 900; color: #fff; line-height: 1; }
        .unit-label { font-size: 0.65rem; font-weight: 800; color: rgba(255, 255, 255, 0.6); margin-top: 5px; }
        .timer-separator { font-size: 2rem; font-weight: 900; color: #EE6662; }
        @media (max-width: 576px) {
          .countdown-timer-container { padding: 20px 30px; }
          .unit-value { font-size: 2rem; }
          .timer-unit { min-width: 70px; padding: 10px; }
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
