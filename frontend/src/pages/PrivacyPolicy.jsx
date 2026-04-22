function PrivacyPolicy() {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">Privacy Policy</h1>
          <div className="policy-content">
            <h3>1. Information We Collect</h3>
            <p>We collect information that you provide directly to us, including name, email address, phone number, date of birth, and other information you choose to provide.</p>

            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your consultations and appointments</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>

            <h3>3. Information Sharing</h3>
            <p>We do not share your personal information with third parties except as described in this policy. We may share information with vendors and service providers who need access to such information to carry out work on our behalf.</p>

            <h3>4. Data Security</h3>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>

            <h3>5. Your Choices</h3>
            <p>You may update, correct, or delete your account information at any time by contacting us. You may also opt out of receiving promotional communications from us.</p>

            <h3>6. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at dsastro@gmail.com or call +91 8418-9039-66.</p>
          </div>
        </div>
      </div>

      <style>{`
        .policy-content { max-width: 800px; margin: 0 auto; }
        .policy-content h3 { color: #ff6a00; margin-top: 30px; margin-bottom: 15px; }
        .policy-content p { color: #ccc; line-height: 1.8; margin-bottom: 15px; }
        .policy-content ul { color: #ccc; margin-bottom: 20px; }
        .policy-content li { margin-bottom: 8px; }
      `}</style>
    </section>
  );
}

export default PrivacyPolicy;
