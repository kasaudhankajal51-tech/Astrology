import { useState, useEffect } from 'react';

function Cancellation() {
  const [activeSection, setActiveSection] = useState('online-courses');

  const sections = [
    { id: 'online-courses', label: '1. Online Courses' },
    { id: 'astro-consultations', label: '2. Astrology Consultations' },
    { id: 'merchandise', label: '3. Merchandise' },
    { id: 'quick-ref', label: '4. Quick Reference Summary' },
    { id: 'refund-processing', label: '5. Refund Processing' },
    { id: 'raise-request', label: '6. Raise a Request' },
    { id: 'chargebacks', label: '7. Chargebacks & Disputes' },
    { id: 'governing-law', label: '8. Governing Law' },
    { id: 'amendments', label: '9. Amendments to Policy' },
    { id: 'contact-us', label: '10. Contact Us' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetPosition = el.offsetTop - 100;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="terms-page-wrapper">
      <div className="terms-header">
        <h1 className="terms-title">Refund & Cancellation Policy</h1>
        <p className="terms-subtitle">Last Updated: May 22, 2026</p>
      </div>

      <div className="terms-container">
        <aside className="terms-sidebar-wrapper">
          <nav className="terms-sidebar">
            <p className="sidebar-heading">Contents</p>
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`sidebar-btn ${isActive ? 'active' : ''}`}
                >
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="terms-main-content">


          <section id="online-courses" className="content-section">
            <h2 className="section-title">1. Online Courses — Strictly No Refund Policy</h2>
            <p>
              <strong>IMPORTANT NOTICE — PLEASE READ CAREFULLY BEFORE PURCHASING</strong><br />
              All course purchases made on the DS ASTRO INSTITUTE LLP platform are final and non-refundable under any circumstances whatsoever.<br />
              By completing your course purchase, you explicitly acknowledge and agree to this no-refund policy.
            </p>

            <h3 className="subsection-title">A. Why Courses Are Non-Refundable</h3>
            <p>
              Our courses are digital products. Upon purchase, the user is granted immediate or scheduled access to proprietary course materials, live sessions, recordings, PDFs, and other digital content that cannot be "returned" in any practical sense. The value of this content is delivered from the moment access is granted.
            </p>
            <p>
              Accordingly, once a course purchase is made, NO refund shall be issued under any of the following circumstances (this list is illustrative and not exhaustive):
            </p>
            <ul className="content-list">
              <li>User changed their mind after purchase.</li>
              <li>User did not find the course content suitable to their expectations.</li>
              <li>User did not attend or access the course, whether partially or fully.</li>
              <li>User was unable to attend due to personal scheduling conflicts, illness, travel, or any other personal reason.</li>
              <li>User's device, internet connection, or technical setup was incompatible.</li>
              <li>User accidentally purchased the wrong course.</li>
              <li>User purchased the course and later found a cheaper alternative elsewhere.</li>
              <li>User did not complete the course within the access period.</li>
              <li>User's account was suspended or terminated due to violation of our Terms and Conditions.</li>
              <li>User claims they were unaware of the no-refund policy at the time of purchase.</li>
            </ul>

            <h3 className="subsection-title">B. Access Period</h3>
            <p>
              Access to course materials is granted for the duration specified at the time of purchase. Failure to access or utilise the course within this period does not entitle the user to a refund, extension (unless expressly offered by the Company), or any other remedy.
            </p>

            <h3 className="subsection-title">C. The Only Exception — Company-Side Failure</h3>
            <p>
              A refund or appropriate remedy will be considered ONLY in the following circumstance:
            </p>
            <ul className="content-list">
              <li>The course was permanently discontinued by the Company before the user was given any access whatsoever to any course material.</li>
            </ul>
            <p>
              In such a rare event, the Company will offer either a full refund or transfer of enrolment to an equivalent course at its discretion. Partial completion of a course before discontinuation does not entitle the user to a refund.
            </p>
            <p>
              Technical issues such as temporary platform downtime, video buffering, or connectivity issues do not constitute grounds for a refund. The Company will make reasonable efforts to resolve such issues promptly.
            </p>

            <h3 className="subsection-title">D. No Exceptions Policy</h3>
            <p>
              The Company strictly does not entertain refund requests on compassionate, exceptional, or special grounds for course purchases. All users are advised to review course descriptions, syllabi, demo content (if available), and FAQs carefully before making a purchase. If you have queries about course content before purchasing, you are encouraged to contact us at info@dsastroinstitute.com prior to completing your purchase.
            </p>
          </section>

          <section id="astro-consultations" className="content-section">
            <h2 className="section-title">2. Astrology Consultations — Cancellation & Refund</h2>
            <p>
              The following policy applies to all individual astrology consultation sessions, kundali readings, birth chart analyses, and related personalised advisory sessions booked through our Platform.
            </p>

            <h3 className="subsection-title">A. Cancellation by the User</h3>
            <ul className="content-list">
              <li><strong>Cancellation made 24 hours or more before the scheduled session:</strong> Eligible for a full refund or a reschedule at the user's preference. Refunds will be processed within 7-10 working days to the original payment method.</li>
              <li><strong>Cancellation made less than 24 hours before the scheduled session:</strong> No refund will be issued. A one-time reschedule may be offered at the Company's sole discretion and is not guaranteed.</li>
              <li><strong>No-show (user fails to join at the scheduled session time):</strong> No refund and no reschedule will be provided under any circumstances.</li>
              <li><strong>Joining late:</strong> If the user joins after the scheduled start time, the session will run only for the remaining duration. No refund or extension will be provided for time lost due to late joining by the user.</li>
            </ul>

            <h3 className="subsection-title">B. Cancellation by the Company</h3>
            <ul className="content-list">
              <li>If the Company cancels a confirmed session for any reason within its control, the user will be offered either a full refund or a reschedule, at the user's preference.</li>
              <li>If a session is disrupted due to reasons beyond the Company's control (including power failure, internet outage, natural events, or force majeure), the Company will offer a reschedule. A refund in such cases is at the Company's discretion.</li>
            </ul>

            <h3 className="subsection-title">C. Incorrect Birth Details</h3>
            <p>
              Astrology consultations are entirely dependent on the accuracy of birth details provided by the user (date, time, and place of birth). If a session is completed based on incorrect details provided by the user, no refund will be issued. Users are advised to verify and confirm their birth details prior to booking.
            </p>

            <h3 className="subsection-title">D. Dissatisfaction with Consultation</h3>
            <p>
              Astrology is an advisory and interpretive practice. Dissatisfaction with the content, predictions, or tone of a consultation does not constitute grounds for a refund. The Company does not guarantee any specific outcome, prediction, or result from any consultation session.
            </p>
          </section>

          <section id="merchandise" className="content-section">
            <h2 className="section-title">3. Merchandise — Returns, Cancellations & Refunds</h2>
            <h3 className="subsection-title">A. Order Cancellation</h3>
            <ul className="content-list">
              <li><strong>Cancellation before dispatch:</strong> Orders may be cancelled and a full refund will be issued if the cancellation request is made before the order has been dispatched. Contact us immediately at info@dsastroinstitute.com with your order details.</li>
              <li><strong>Cancellation after dispatch:</strong> Orders cannot be cancelled once dispatched. Users must follow the return process after delivery.</li>
            </ul>

            <h3 className="subsection-title">B. Returns — Eligible Conditions</h3>
            <p>Returns are accepted ONLY under the following conditions:</p>
            <ul className="content-list">
              <li>The item received is damaged or defective.</li>
              <li>The item received is incorrect (different product or variant from what was ordered).</li>
            </ul>
            <p>
              Return requests must be raised within 48 hours of delivery with clear photographic or video evidence of the issue. Requests raised after 48 hours will not be entertained.
            </p>

            <h3 className="subsection-title">C. Returns — Not Accepted</h3>
            <p>Returns will NOT be accepted under the following circumstances:</p>
            <ul className="content-list">
              <li>Change of mind or preference after delivery.</li>
              <li>Product was not liked or did not meet subjective expectations.</li>
              <li>Minor variations in colour, texture, or appearance due to screen display differences or handmade nature of the product.</li>
              <li>Damage caused by the user after delivery.</li>
              <li>Items without original packaging or tags.</li>
              <li>Return request raised after 48 hours of delivery.</li>
            </ul>

            <h3 className="subsection-title">D. Refund on Approved Returns</h3>
            <ul className="content-list">
              <li>Upon verification and approval of a return request, the Company will arrange either a replacement of the item or a refund, at the Company's discretion.</li>
              <li>Approved refunds will be credited to the original payment method within 7-10 working days.</li>
              <li>Shipping costs for returning an eligible item will be borne by the Company. Users must not return items without prior written approval from the Company.</li>
            </ul>
          </section>

          <section id="quick-ref" className="content-section">
            <h2 className="section-title">4. Quick Reference Summary</h2>
            <div style={{ overflowX: 'auto' }} className="mb-4">
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px', fontWeight: '600', color: '#8b4513' }}>Service / Scenario</th>
                    <th style={{ padding: '12px', fontWeight: '600', color: '#8b4513' }}>Cancellation Window</th>
                    <th style={{ padding: '12px', fontWeight: '600', color: '#8b4513' }}>Refund Eligibility</th>
                    <th style={{ padding: '12px', fontWeight: '600', color: '#8b4513' }}>Outcome</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '1rem' }}>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#000000' }}>Course — any reason</td>
                    <td style={{ padding: '12px', color: '#000000' }}>Any time</td>
                    <td style={{ padding: '12px', color: '#000000' }}>None</td>
                    <td style={{ padding: '12px', color: '#ef4444', fontWeight: '500' }}>NOT Refundable</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#000000' }}>Course — company discontinues (pre-access)</td>
                    <td style={{ padding: '12px', color: '#000000' }}>N/A</td>
                    <td style={{ padding: '12px', color: '#000000' }}>Full</td>
                    <td style={{ padding: '12px', color: '#10b981', fontWeight: '500' }}>Full Refund</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#000000' }}>Consultation — user cancels 24h+ before</td>
                    <td style={{ padding: '12px', color: '#000000' }}>24h+ before session</td>
                    <td style={{ padding: '12px', color: '#000000' }}>Full</td>
                    <td style={{ padding: '12px', color: '#10b981', fontWeight: '500' }}>Full Refund</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#000000' }}>Consultation — user cancels &lt;24h before</td>
                    <td style={{ padding: '12px', color: '#000000' }}>&lt;24h before session</td>
                    <td style={{ padding: '12px', color: '#000000' }}>None</td>
                    <td style={{ padding: '12px', color: '#ef4444', fontWeight: '500' }}>NOT Refundable</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#000000' }}>Consultation — no-show</td>
                    <td style={{ padding: '12px', color: '#000000' }}>N/A</td>
                    <td style={{ padding: '12px', color: '#000000' }}>None</td>
                    <td style={{ padding: '12px', color: '#ef4444', fontWeight: '500' }}>NOT Refundable</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#000000' }}>Consultation — company cancels</td>
                    <td style={{ padding: '12px', color: '#000000' }}>N/A</td>
                    <td style={{ padding: '12px', color: '#000000' }}>Full</td>
                    <td style={{ padding: '12px', color: '#10b981', fontWeight: '500' }}>Full Refund</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#000000' }}>Merchandise — before dispatch</td>
                    <td style={{ padding: '12px', color: '#000000' }}>Before dispatch</td>
                    <td style={{ padding: '12px', color: '#000000' }}>Full</td>
                    <td style={{ padding: '12px', color: '#10b981', fontWeight: '500' }}>Full Refund</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#000000' }}>Merchandise — damaged/incorrect item</td>
                    <td style={{ padding: '12px', color: '#000000' }}>Within 48h of delivery</td>
                    <td style={{ padding: '12px', color: '#000000' }}>Full / Replacement</td>
                    <td style={{ padding: '12px', color: '#10b981', fontWeight: '500' }}>Full Refund</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', color: '#000000' }}>Merchandise — change of mind</td>
                    <td style={{ padding: '12px', color: '#000000' }}>N/A</td>
                    <td style={{ padding: '12px', color: '#000000' }}>None</td>
                    <td style={{ padding: '12px', color: '#ef4444', fontWeight: '500' }}>NOT Refundable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="refund-processing" className="content-section">
            <h2 className="section-title">5. Refund Processing</h2>
            <ul className="content-list">
              <li>All approved refunds will be credited to the original payment method used at the time of purchase.</li>
              <li>Processing time is 7-10 working days from the date of refund approval. Actual credit timelines may vary depending on your bank or payment provider.</li>
              <li>The Company does not issue refunds in cash or via alternative payment methods.</li>
              <li>GST and transaction charges, where applicable, may be deducted from refunds as per applicable Indian tax law.</li>
              <li>If a payment was made via EMI, the refund will be subject to the policies of the lending institution or bank.</li>
            </ul>
          </section>

          <section id="raise-request" className="content-section">
            <h2 className="section-title">6. How to Raise a Cancellation or Refund Request</h2>
            <p>
              To raise a cancellation, return, or refund request, contact our support team through any of the following channels:
            </p>
            <ul className="content-list">
              <li><strong>Email:</strong> help@dsastroinstitute.com</li>
              <li><strong>Phone / WhatsApp:</strong> +91 7570972970</li>
              <li><strong>Website:</strong> https://dsastroinstitute.com/</li>
            </ul>
            <p>
              Your request must include: your full name, registered email address, order or booking ID, reason for the request, and any supporting evidence (photographs, screenshots, etc.) where applicable.
            </p>
            <p>
              We endeavour to acknowledge all requests within 2 working days and resolve them within 7 working days of receipt.
            </p>
          </section>

          <section id="chargebacks" className="content-section">
            <h2 className="section-title">7. Chargebacks and Payment Disputes</h2>
            <p>
              Initiating a chargeback or payment dispute with your bank or payment provider without first contacting the Company and allowing us a reasonable opportunity to resolve the matter is a violation of this Policy and our Terms and Conditions.
            </p>
            <p>In the event of an unjustified chargeback, the Company reserves the right to:</p>
            <ul className="content-list">
              <li>Immediately suspend or permanently terminate the user's account and access to all Services.</li>
              <li>Pursue recovery of amounts owed through appropriate legal channels.</li>
              <li>Report the matter to relevant payment networks and authorities.</li>
            </ul>
          </section>

          <section id="governing-law" className="content-section">
            <h2 className="section-title">8. Governing Law</h2>
            <p>
              This Policy is governed by the laws of India, including the Consumer Protection Act, 2019, the Indian Contract Act, 1872, and applicable RBI and GST regulations. Any disputes arising from this Policy shall be subject to the exclusive jurisdiction of the competent courts in Lucknow, Uttar Pradesh, India.
            </p>
          </section>

          <section id="amendments" className="content-section">
            <h2 className="section-title">9. Amendments to This Policy</h2>
            <p>
              DS ASTRO INSTITUTE LLP reserves the right to revise this Policy at any time. Changes will be posted on the Platform with an updated effective date. Continued use of our Services after any revision constitutes your acceptance of the revised Policy.
            </p>
          </section>

          <section id="contact-us" className="contact-section">
            <h2 className="contact-title">10. Contact Us</h2>
            <div className="contact-details">
              <p><strong>Company Name:</strong> DS ASTRO INSTITUTE LLP</p>
              <p><strong>Registered Address:</strong> D321, Vibhuti Khand, Lucknow, Uttar Pradesh - 226010</p>
              <p><strong>Email:</strong> info@dsastroinstitute.com</p>
              <p><strong>Support Email:</strong> help@dsastroinstitute.com</p>
              <p><strong>Phone / WhatsApp:</strong> +91 7570972970</p>
              <p><strong>Website:</strong> https://dsastroinstitute.com/</p>
            </div>
            <a href="mailto:help@dsastroinstitute.com" className="contact-button">Contact Support</a>
            <p className="mt-4" style={{ fontSize: '1rem', color: '#000000' }}>
              <em>By purchasing any course, booking any consultation, or placing any merchandise order on our Platform, you confirm that you have read, understood, and accepted this Refund and Cancellation Policy in its entirety.</em>
            </p>
          </section>
        </main>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .terms-page-wrapper {
          min-height: 100vh;
          background-color: #ffffff;
          font-family: 'Outfit', ui-sans-serif, system-ui, -apple-system, sans-serif;
          color: #000000;
          -webkit-font-smoothing: antialiased;
        }

        /* Hero Header */
        .terms-header {
          background-color: #8b4513;
          padding: 4rem 1.5rem;
          text-align: center;
          color: white;
        }

        .terms-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
          color: #ffffff !important;
        }

        .terms-subtitle {
          color: #ffffff !important;
          font-size: 0.95rem;
          font-weight: 400;
        }

        /* Layout Container */
        .terms-container {
          max-width: 100%; /* Push to extreme edges of screen */
          margin: 0 auto;
          padding: 3rem 4vw;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        @media (min-width: 1024px) {
          .terms-container {
            flex-direction: row;
          }
        }

        /* Sidebar Navigation */
        .terms-sidebar-wrapper {
          width: 100%;
        }

        @media (min-width: 1024px) {
          .terms-sidebar-wrapper {
            width: 300px; /* Fixed width for better control */
            flex-shrink: 0;
            padding-top: 3.5rem; /* Aligns exactly with the main content's top padding */
          }
        }

        .terms-sidebar {
          position: sticky;
          top: 6.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sidebar-heading {
          font-size: 1.05rem; /* Increased size */
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8b4513;
          margin-bottom: 0.85rem;
          padding: 0 1rem;
        }

        .sidebar-btn {
          width: 100%;
          text-align: left;
          padding: 0.85rem 1.25rem;
          border-radius: 0.5rem;
          font-size: 1.35rem; /* Increased text size */
          font-weight: 500;
          transition: all 0.2s ease;
          background: transparent;
          border: 1px solid transparent; /* Invisible border to prevent layout shift */
          color: #000000;
          cursor: pointer;
          font-family: inherit;
        }

        .sidebar-btn:hover {
          background-color: #f8fafc;
          color: #000000;
        }

        .sidebar-btn.active {
          background-color: #ffffff;
          color: #8b4513; /* Match the brown heading color */
          font-weight: 600;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); /* Soft drop shadow */
          border: 1px solid #e2e8f0; /* Light gray border all around */
          border-left: 4px solid #8b4513; /* Solid brown left edge */
          border-radius: 0.5rem;
          padding-left: calc(1.25rem - 3px); /* Adjust padding for the 4px border (1px is already in base border) */
        }

        /* Main Content Box */
        .terms-main-content {
          width: 100%;
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        @media (min-width: 768px) {
          .terms-main-content {
            padding: 3rem;
          }
        }

        @media (min-width: 1024px) {
          .terms-main-content {
            flex-grow: 1;
            max-width: 75rem; /* Ensure reading width is comfortable */
            padding: 3.5rem 4rem;
          }
        }

        /* Content Styling */
        .intro-text p {
          color: #000000;
          line-height: 1.8;
          margin-top: 0;
          margin-bottom: 1.25rem;
          font-size: 0.9rem !important;
          font-weight: 300;
        }

        .content-section {
          scroll-margin-top: 100px;
        }

        .section-title {
          font-size: 2.25rem !important;
          line-height: 2.8rem;
          font-weight: 600;
          color: #8b4513 !important; /* Brown */
          margin-top: 0;
          margin-bottom: 1.25rem;
          font-family: inherit;
        }

        .subsection-title {
          font-size: 1.75rem !important;
          line-height: 2.2rem;
          font-weight: 600;
          color: #8b4513;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .content-section p {
          color: #000000;
          line-height: 1.9;
          margin-top: 0;
          margin-bottom: 1.5rem;
          font-size: 1.35rem !important; /* Increased content size */
          font-weight: 300;
        }

        .content-list {
          list-style-type: disc;
          padding-left: 1.5rem;
          color: #000000;
          line-height: 1.9;
          margin-top: 0.85rem;
          margin-bottom: 1.5rem;
          font-size: 1.35rem !important; /* Increased content size */
          font-weight: 300;
        }

        .content-list li {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .content-list li::marker {
          color: #000000;
        }

        .contact-box {
          background-color: #ffffff;
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid #f1f5f9;
          color: #000000;
          line-height: 1.9;
          font-size: 1.35rem !important; /* Increased content size */
          font-weight: 300;
        }

        .contact-box p {
          margin-bottom: 0.5rem;
        }
        
        .contact-box p:last-child {
          margin-bottom: 0;
        }

        /* Contact Section */
        .contact-section {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid #f1f5f9;
        }

        .contact-title {
          font-size: 2.25rem !important;
          font-weight: 600;
          color: #8b4513 !important; /* Brown */
          margin-bottom: 0.5rem;
        }

        .contact-desc {
          color: #000000;
          font-size: 1.05rem;
          margin-bottom: 1.5rem;
        }

        .contact-details {
          color: #000000;
          font-size: 1.05rem;
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .contact-details p {
          margin-bottom: 0.5rem;
        }

        .contact-button {
          display: inline-block;
          background-color: #8b4513;
          color: white;
          padding: 0.75rem 1.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .contact-button:hover {
          background-color: #6b340e;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default Cancellation;
