import React from 'react';
import './webinar/RegistrationModal.css';

function SuccessModal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-container text-center py-5 px-4" style={{ maxWidth: '450px' }}>
        <div className="success-icon-wrap mb-4">
          <div className="success-circle">
            <i className="fas fa-check"></i>
          </div>
          <div className="success-glow"></div>
        </div>
        
        <h2 className="fw-bold mb-3" style={{ color: '#2A0F02', fontFamily: 'serif' }}>{title || 'Booking Successful!'}</h2>
        <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          {message || 'Your consultation request has been received. Our expert team will contact you within 24 hours to finalize your session.'}
        </p>
        
        <button className="cta-reg-btn w-100 justify-content-center py-3" onClick={onClose}>
          Great, Thank You!
        </button>

        <style jsx>{`
          .success-icon-wrap {
            position: relative;
            display: inline-block;
          }
          .success-circle {
            width: 80px;
            height: 80px;
            background: #10b981;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            position: relative;
            z-index: 2;
            animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .success-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 120px;
            background: rgba(16, 185, 129, 0.2);
            border-radius: 50%;
            z-index: 1;
            animation: pulseSuccess 2s infinite;
          }
          @keyframes scaleIn {
            from { transform: scale(0); }
            to { transform: scale(1); }
          }
          @keyframes pulseSuccess {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
            70% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default SuccessModal;
