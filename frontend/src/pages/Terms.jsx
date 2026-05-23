function Terms() {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">Terms & Conditions</h1>
          <div className="policy-content">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using our astrology services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>

            <h3>2. Services Description</h3>
            <p>We provide astrology consultations, courses, and related services. All readings and predictions are for entertainment and guidance purposes only. Results may vary and we make no guarantees about outcomes.</p>

            <h3>3. Payment Terms</h3>
            <p>All payments must be made in advance for consultations and courses. Prices are subject to change without notice. We accept various payment methods including credit cards, debit cards, and online transfers.</p>

            <h3>4. Cancellation Policy</h3>
            <p>Consultations can be rescheduled with 24 hours notice. No refunds for cancellations within 24 hours of appointment. Course cancellations follow our refund policy outlined below.</p>

            <h3>5. Refund Policy</h3>
            <p>Refunds for courses are available within 7 days of purchase if less than 20% of the course content has been accessed. No refunds after 7 days or once significant course content has been consumed.</p>

            <h3>6. Intellectual Property</h3>
            <p>All content, materials, and resources provided are for personal use only. Reproduction, distribution, or commercial use without written permission is strictly prohibited.</p>

            <h3>7. Limitation of Liability</h3>
            <p>We are not liable for any decisions made based on our astrological guidance. Our services are not a substitute for professional medical, legal, or financial advice.</p>

            <h3>8. Contact Information</h3>
            <p>For questions about these terms, contact us at dsastro@gmail.com or +91 75709 72970.</p>
          </div>
        </div>
      </div>

      <style>{`
        .policy-content { max-width: 800px; margin: 0 auto; }
        .policy-content h3 { color: #ff6a00; margin-top: 30px; margin-bottom: 15px; }
        .policy-content p { color: #ccc; line-height: 1.8; margin-bottom: 15px; }
      `}</style>
    </section>
  );
}

export default Terms;
