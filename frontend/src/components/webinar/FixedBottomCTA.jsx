import React from 'react';
import CountdownTimer from './CountdownTimer';

function FixedBottomCTA({ onJoinNow }) {
  return (
    <div className="fixed-bottom-cta-v4">
      {/* Animated Background Stars */}
      <div className="cta-stars-container">
        <div className="cta-star s1"></div>
        <div className="cta-star s2"></div>
        <div className="cta-star s3"></div>
        <div className="cta-star s4"></div>
      </div>

      <div className="cta-container-v4">
        <div className="cta-top-row-v4">
          <div className="cta-left-v4">
            <div className="offer-badge-v4">
              <i className="fas fa-bolt"></i> <span>LIMITED TIME OFFER</span>
            </div>
            <div className="price-display-v4">
              <span className="only-text-v4">Only</span>
              <span className="amount-v4">₹99</span>
            </div>
          </div>

          <div className="cta-vertical-divider-v4"></div>

          <div className="cta-right-v4">
            <CountdownTimer minimal={true} />
          </div>
        </div>

        <div className="cta-bottom-row-v4">
          <button onClick={onJoinNow} className="register-now-btn-v5">
            <span className="btn-text-v4">Enroll Now</span>
            <span className="btn-icon-v4"><i className="fas fa-arrow-right"></i></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FixedBottomCTA;
