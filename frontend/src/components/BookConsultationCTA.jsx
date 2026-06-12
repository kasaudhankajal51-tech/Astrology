const REQUIRED_FIELDS = [
  'Name',
  'Date of Birth',
  'Time of Birth',
  'Place of Birth',
  'Consultation Type',
];

export default function BookConsultationCTA({ onBookClick }) {
  return (
    <section className="cp-cta" aria-labelledby="consult-cta-heading">
      <div className="cp-cta-panel">
        <div className="cp-cta-grid">
          <div className="cp-cta-copy">
            <p className="cp-section-kicker">Get Started</p>
            <h2 id="consult-cta-heading" className="cp-cta-title">
              Ready to book your consultation?
            </h2>
            <p className="cp-cta-lead">
              Share your birth details and preferred consultation type. Our team will contact you
              within 24 hours to confirm your session.
            </p>
            <div className="cp-tag-row">
              {REQUIRED_FIELDS.map((label) => (
                <span key={label} className="cp-tag">
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="consult-cta-actions">
            <button type="button" onClick={onBookClick} className="cp-cta-btn">
              Book Your Session
              <i className="fas fa-paper-plane" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
