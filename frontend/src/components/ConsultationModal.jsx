import React from 'react';
import './webinar/RegistrationModal.css'; // Reusing the same base styles for consistency

function ConsultationModal({ isOpen, onClose, formData, handleChange, handleSubmit, isSubmitting }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <div className="modal-scroll-area">
          <div className="modal-content-wrapper">
            <div className="modal-image-side">
              <h4>Book Your <br/><span className="text-highlight">Consultation</span></h4>
              <p>Get personalized insights and life guidance from India's leading astrology mentor.</p>
              <ul className="modal-points">
                <li><i className="fa fa-check-circle"></i> Detailed Birth Chart Analysis</li>
                <li><i className="fa fa-check-circle"></i> Career & Relationship Guidance</li>
                <li><i className="fa fa-check-circle"></i> Remedies & Future Predictions</li>
              </ul>
            </div>
            <div className="modal-form-side">
              <div className="form-header-mini">
                <h3>Consultation Details</h3>
                <p>Please provide your birth details for accurate analysis</p>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group mb-3">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
                </div>
                <div className="form-group mb-3">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                </div>
                <div className="form-group mb-3">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone" />
                </div>
                <div className="form-group mb-3">
                  <label>Consultation Type</label>
                  <select name="consultationType" value={formData.consultationType} onChange={handleChange} required className="form-select-custom">
                    <option value="">Select consultation type</option>
                    <option value="Career">Career & Business</option>
                    <option value="Relationship">Marriage & Relationships</option>
                    <option value="Health">Health & Wellness</option>
                    <option value="Finance">Finance & Wealth</option>
                    <option value="Other">Other Concerns</option>
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label>Your Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Describe your concern briefly..." rows="3"></textarea>
                </div>
                <button type="submit" className="cta-reg-btn w-100 justify-content-center" disabled={isSubmitting}>
                  {isSubmitting ? 'Booking...' : 'Book Consultation Now'}
                </button>
                <p className="secure-text"><i className="fas fa-lock me-2"></i> Your data is safe & private</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultationModal;
