function Cancellation() {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-5">Refund & Cancellation Policy</h1>
          <div className="policy-content">
            <h3>1. Consultation Cancellations</h3>
            <p>If you need to cancel or reschedule your consultation appointment, please notify us at least 24 hours in advance. Cancellations made less than 24 hours before the scheduled appointment will not be eligible for a refund.</p>

            <h3>2. Course Refunds</h3>
            <p>We offer a 7-day money-back guarantee for our online courses. To be eligible for a refund:</p>
            <ul>
              <li>You must request the refund within 7 days of purchase</li>
              <li>You must have completed less than 20% of the course content</li>
              <li>You must provide a valid reason for the refund request</li>
            </ul>

            <h3>3. Refund Processing</h3>
            <p>Once your refund request is approved, we will process the refund within 5-7 business days. The refund will be credited to the original payment method used during the purchase.</p>

            <h3>4. Non-Refundable Items</h3>
            <p>The following are not eligible for refunds:</p>
            <ul>
              <li>Completed consultations</li>
              <li>Downloaded digital products after 7 days</li>
              <li>Personalized reports that have been delivered</li>
              <li>Gemstones and physical products once shipped</li>
            </ul>

            <h3>5. How to Request a Refund</h3>
            <p>To request a refund, please contact us with your order details and reason for the refund. We reserve the right to deny refund requests that do not meet our policy criteria.</p>

            <h3>6. Contact for Cancellations</h3>
            <p>For cancellations or refund requests, please contact us at:</p>
            <p>Email: dsastro@gmail.com<br/>Phone: +91 75709 72970</p>
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

export default Cancellation;
