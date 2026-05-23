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
                <img src="/images/premium_tarot.png" alt="Consultation" className="modal-banner-img mb-3" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '15px' }} />
                <h3>Consultation Details</h3>
                <p>Please provide your birth details for accurate analysis</p>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group mb-3">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Full Name" />
                </div>

                <div className="form-group mb-3">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10 Digit Phone Number" />
                </div>

                <div className="form-group mb-3">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email Address" />
                </div>

                <div className="birth-details-grid mb-3">
                  <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <label>Date of Birth</label>
                      <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                      <label>Time of Birth</label>
                      <input type="time" name="tob" value={formData.tob || ''} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                      <label>Place of Birth</label>
                      <input type="text" name="pob" value={formData.pob || ''} onChange={handleChange} required placeholder="City, State" />
                    </div>
                  </div>
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
                  <label>Your Message (Optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe your concern briefly..." rows="2"></textarea>
                </div>
                
                <div className="form-group mb-3 consent-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input type="checkbox" id="consent-consultation" name="consent" required style={{ width: 'auto', marginTop: '4px' }} />
                  <label htmlFor="consent-consultation" style={{ fontSize: '13px', color: '#555', lineHeight: '1.4', margin: 0, fontWeight: 'normal' }}>
                    I agree to the <a href="/privacy-policy" style={{ color: '#8B4A1E', textDecoration: 'underline' }}>Privacy Policy</a> and consent to DS Astro Institute LLP contacting me via phone, email, and WhatsApp.
                  </label>
                </div>

                <button type="submit" className="cta-reg-btn w-100 justify-content-center" disabled={isSubmitting}>
                  {isSubmitting ? 'Booking...' : 'Confirm Consultation Booking'}
                </button>
                <p className="secure-text"><i className="fas fa-lock me-2"></i> Private & Encrypted Consultation</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultationModal;
