import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    // Try to get saved end time from localStorage or set a new one (24 hours from now)
    const storedEndTime = localStorage.getItem('webinar_timer_end');
    let endTime;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime);
      // If stored time is in the past, reset it
      if (endTime < Date.now()) {
        endTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('webinar_timer_end', endTime.toString());
      }
    } else {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('webinar_timer_end', endTime.toString());
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        // Reset timer when it reaches zero
        const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('webinar_timer_end', newEndTime.toString());
        endTime = newEndTime;
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer-container">
      <div className="timer-title">OFFER ENDS IN:</div>
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
          background: rgba(255, 106, 0, 0.1);
          border: 1px solid rgba(255, 106, 0, 0.3);
          padding: 20px 40px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin: 30px auto;
          max-width: max-content;
        }
        .timer-title {
          font-size: 0.8rem;
          font-weight: 800;
          color: #ff6a00;
          letter-spacing: 2px;
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
          min-width: 60px;
        }
        .unit-value {
          font-size: 2.5rem;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          font-family: 'Outfit', sans-serif;
        }
        .unit-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
          margin-top: 5px;
        }
        .timer-separator {
          font-size: 2rem;
          font-weight: 900;
          color: #ff6a00;
          margin-bottom: 20px;
        }
        @media (max-width: 576px) {
          .unit-value { font-size: 1.8rem; }
          .timer-unit { min-width: 45px; }
          .countdown-timer-container { padding: 15px 25px; }
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
