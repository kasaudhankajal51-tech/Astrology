import { useState, useEffect } from 'react';

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('info-collect');

  const sections = [
    { id: 'info-collect', label: '1. Information We Collect' },
    { id: 'legal-basis', label: '2. Legal Basis for Processing' },
    { id: 'how-use', label: '3. How We Use Your Information' },
    { id: 'astro-data', label: '4. Astrology Consultation Data' },
    { id: 'payment-info', label: '5. Payment Information' },
    { id: 'comm-consent', label: '6. Communication Consent' },
    { id: 'cookies-policy', label: '7. Cookies Policy' },
    { id: 'data-sharing', label: '8. Data Sharing & Disclosure' },
    { id: 'data-retention', label: '9. Data Retention' },
    { id: 'data-security', label: '10. Data Security' },
    { id: 'user-rights', label: '11. Your Rights as a Data Principal' },
    { id: 'minors-policy', label: '12. Children & Minors Policy' },
    { id: 'third-party', label: '13. Third-Party Links & Platforms' },
    { id: 'intl-users', label: '14. International Users' },
    { id: 'intellectual-prop', label: '15. Intellectual Property' },
    { id: 'governing-law', label: '16. Governing Law & Jurisdiction' },
    { id: 'grievance-officer', label: '17. Grievance Officer' },
    { id: 'policy-changes', label: '18. Changes to This Policy' },
    { id: 'contact-us', label: '19. Contact Us' }
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
        <h1 className="terms-title">Privacy Policy</h1>
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


          <section id="info-collect" className="content-section">
            <h2 className="section-title">1. Information We Collect</h2>
            <h3 className="subsection-title">A. Personal Data You Provide</h3>
            <ul className="content-list">
              <li><strong>Full name:</strong> For course enrollment, student management, and invoice generation.</li>
              <li><strong>Contact Details:</strong> Mobile number and email address for communication, reminders, and notifications.</li>
              <li><strong>Physical Address:</strong> Billing and shipping address for astrology-related merchandise delivery.</li>
              <li><strong>Birth details:</strong> Date of birth, time of birth, and place of birth (required for astrology consultations).</li>
              <li><strong>Payment Info:</strong> Processed securely through third-party gateways (we do NOT store payment card or banking details).</li>
              <li><strong>Communications:</strong> Queries, messages, and feedback submitted through forms, WhatsApp, email, or support channels.</li>
              <li><strong>Verification Proof:</strong> Government-issued identity proof, only if explicitly required for verification purposes.</li>
            </ul>

            <h3 className="subsection-title">B. Technical and Usage Data</h3>
            <ul className="content-list">
              <li>IP address and geographic location data</li>
              <li>Browser type, version, and device information</li>
              <li>Operating system details</li>
              <li>Website usage data, including pages visited, time spent, and navigation patterns</li>
              <li>Cookies, web beacons, and similar tracking technologies</li>
              <li>Login activity and session data</li>
            </ul>

            <h3 className="subsection-title">C. Data from Third Parties</h3>
            <p>
              We may receive information from third-party platforms such as payment gateways, social media platforms (if you connect your account), and analytics providers, in accordance with their respective privacy policies.
            </p>
          </section>

          <section id="legal-basis" className="content-section">
            <h2 className="section-title">2. Legal Basis for Processing Your Data</h2>
            <p>Under the Digital Personal Data Protection Act, 2023, we process your personal data on the following lawful bases:</p>
            <ul className="content-list">
              <li><strong>Consent:</strong> Where you have given explicit consent for us to process your data for specific purposes, such as marketing communications or astrology consultation services.</li>
              <li><strong>Contractual Necessity:</strong> Where processing is necessary to provide services you have requested, including course enrollment, consultation bookings, and merchandise delivery.</li>
              <li><strong>Legitimate Use:</strong> Where processing is required for compliance with applicable Indian laws, prevention of fraud, and maintenance of financial and transaction records.</li>
              <li><strong>Legal Obligation:</strong> Where we are required to process or retain your data under law, including tax laws, GST regulations, and regulatory directives.</li>
            </ul>
          </section>

          <section id="how-use" className="content-section">
            <h2 className="section-title">3. How We Use Your Information</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="content-list">
              <li>Course enrollment, student management, and delivery of online learning content.</li>
              <li>Conducting astrology consultations and preparing personalised reports and charts.</li>
              <li>Processing payments, generating invoices, and maintaining financial records as required under GST and applicable tax laws.</li>
              <li>Delivering merchandise and coordinating logistics.</li>
              <li>Providing customer support and responding to queries.</li>
              <li>Sending transactional communications (confirmations, reminders, updates).</li>
              <li>Sending promotional material and offers, subject to your consent and opt-out rights.</li>
              <li>Improving our website, services, and user experience through analytics.</li>
              <li>Detecting, preventing, and investigating fraud, misuse, or security incidents.</li>
              <li>Compliance with applicable laws, regulatory requirements, and court orders.</li>
            </ul>
          </section>

          <section id="astro-data" className="content-section">
            <h2 className="section-title">4. Astrology Consultation Data</h2>
            <p>
              Information shared during astrology consultations, including birth details, personal queries, kundali/charts, session recordings, and consultation notes, is used exclusively for:
            </p>
            <ul className="content-list">
              <li>Providing the requested consultation service.</li>
              <li>Maintaining service and records as part of our legitimate business operations.</li>
              <li>Improving consultation quality and training purposes (only in anonymised form, without disclosure of identity).</li>
            </ul>
            <p>
              <strong>Privacy Notice:</strong> We do not publicly disclose, publish, or share consultation data with any unauthorised third party. Disclosure is made only where mandated by a competent authority or court of law.
            </p>
          </section>

          <section id="payment-info" className="content-section">
            <h2 className="section-title">5. Payment Information</h2>
            <p>
              All payments on our platform are processed through PCI-DSS compliant third-party payment gateways and licensed banking partners regulated by the Reserve Bank of India (RBI).
            </p>
            <p>
              <strong>Payment Details Not Stored:</strong> We do not store complete debit card or credit card numbers, CVV, UPI PINs, or banking passwords on our servers. Transaction records are retained solely for the purposes of invoicing, dispute resolution, and compliance with GST and income tax laws.
            </p>
          </section>

          <section id="comm-consent" className="content-section">
            <h2 className="section-title">6. Communication Consent</h2>
            <p>
              By submitting your contact details on our platform, you authorise <strong>DS ASTRO INSTITUTE LLP</strong> to contact you through phone calls, SMS, email, WhatsApp, and push notifications for:
            </p>
            <ul className="content-list">
              <li>Service updates, booking confirmations, and reminders</li>
              <li>Customer support communications</li>
              <li>Important notices regarding your account or services</li>
              <li>Promotional offers and marketing material (with opt-out option)</li>
            </ul>
            <p>
              <strong>Consent Withdrawal:</strong> You may withdraw your consent for promotional communications at any time by contacting us at the details provided in this policy or by using the opt-out mechanism in any marketing communication. Withdrawal of marketing consent will not affect transactional communications required to deliver services.
            </p>
          </section>

          <section id="cookies-policy" className="content-section">
            <h2 className="section-title">7. Cookies Policy</h2>
            <p>
              Our website uses cookies and similar tracking technologies to improve user experience, analyse website traffic, personalise content, and remember user preferences.
            </p>
            <ul className="content-list">
              <li><strong>Essential Cookies:</strong> Required for core website functionality. Cannot be disabled.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand user behaviour and improve our services.</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and personalise your experience.</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant promotional content.</li>
            </ul>
            <p>
              You may disable non-essential cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of some features on our website.
            </p>
          </section>

          <section id="data-sharing" className="content-section">
            <h2 className="section-title">8. Data Sharing and Disclosure</h2>
            <p>
              <strong>We do not sell, rent, or trade your personal data to any third party.</strong> Your data may be shared with:
            </p>
            <ul className="content-list">
              <li>Payment gateway and banking service providers for transaction processing.</li>
              <li>Delivery and logistics partners for merchandise fulfilment.</li>
              <li>Technology, hosting, and cloud infrastructure providers.</li>
              <li>Analytics and marketing platforms, subject to appropriate data processing agreements.</li>
              <li>Legal, regulatory, or governmental authorities where required under applicable law or court orders.</li>
              <li>Internal staff, consultants, and advisors on a need-to-know basis.</li>
            </ul>
            <p>
              All third parties with whom we share data are contractually obligated to maintain confidentiality and process data only for the specified purpose.
            </p>
          </section>

          <section id="data-retention" className="content-section">
            <h2 className="section-title">9. Data Retention</h2>
            <p>
              We retain your personal data only for as long as is necessary for the purposes set out in this policy, unless a longer retention period is required by law.
            </p>
            <ul className="content-list">
              <li><strong>Course & Consultation Records:</strong> Duration of service and up to 3 years thereafter for operational and dispute resolution purposes.</li>
              <li><strong>Financial & Transaction Records:</strong> Minimum of 7 years as required under Indian tax and GST laws.</li>
              <li><strong>Marketing Data:</strong> Retained until consent is withdrawn.</li>
              <li><strong>Technical & Log Data:</strong> Retained for up to 90 days unless required for investigation purposes.</li>
            </ul>
            <p>Upon expiry of the retention period, personal data is securely deleted or anonymised.</p>
          </section>

          <section id="data-security" className="content-section">
            <h2 className="section-title">10. Data Security</h2>
            <p>
              We implement reasonable and appropriate administrative, technical, and physical security measures to protect your personal data from unauthorised access, disclosure, alteration, loss, or destruction, including:
            </p>
            <ul className="content-list">
              <li><strong>SSL/TLS Encryption:</strong> For data transmitted through our website securely.</li>
              <li><strong>Access Controls:</strong> Role-based permissions for internal staff on need-to-know basis.</li>
              <li><strong>Security Assessments:</strong> Regular audits and performance monitoring to prevent leaks.</li>
              <li><strong>Secure Data Storage:</strong> Hosted with reputed cloud service providers with advanced firewalls.</li>
            </ul>
            <p>
              However, no method of digital transmission or storage is completely secure. In the event of a personal data breach that is likely to affect your rights, we will notify you and the appropriate authorities in accordance with applicable law.
            </p>
          </section>

          <section id="user-rights" className="content-section">
            <h2 className="section-title">11. Your Rights as a Data Principal</h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023 and applicable Indian law, you have the following rights:
            </p>
            <ul className="content-list">
              <li><strong>Right to Access:</strong> Request information about the personal data we hold about you and how it is being processed.</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete personal data.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data, subject to our legal obligations and legitimate business requirements.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time, without affecting the lawfulness of processing prior to withdrawal.</li>
              <li><strong>Right to Grievance Redressal:</strong> Lodge a complaint with our Grievance Officer.</li>
              <li><strong>Right to Nominate:</strong> Nominate a person to exercise your rights in the event of your death or incapacity, as permissible under applicable law.</li>
            </ul>
            <p>
              Requests to exercise any of the above rights may be submitted to our Grievance Officer using the contact details below. We will respond within the timeframes prescribed by applicable law.
            </p>
          </section>

          <section id="minors-policy" className="content-section">
            <h2 className="section-title">12. Children and Minors Policy</h2>
            <p>Our services are primarily intended for individuals who are 18 years of age or older.</p>
            <p>
              We do not knowingly collect personal data from individuals below 18 years of age without verified parental or guardian consent. If a minor wishes to access our services, they must do so under the supervision and with the explicit consent of a parent or legal guardian who accepts responsibility for the minor's use of our services.
            </p>
            <p>
              If we become aware that we have inadvertently collected personal data from a minor without appropriate consent, we will take immediate steps to delete such data. Parents or guardians who believe their child's data has been collected may contact our Grievance Officer.
            </p>
          </section>

          <section id="third-party" className="content-section">
            <h2 className="section-title">13. Third-Party Links and Platforms</h2>
            <p>
              Our website and communications may contain links to third-party websites, applications, social media platforms, or payment portals. These third-party platforms operate independently and are governed by their own privacy policies.
            </p>
            <p>
              We are not responsible for the privacy practices, data handling, or content of any third-party platform. We encourage you to review the privacy policies of any third-party platforms you access.
            </p>
          </section>

          <section id="intl-users" className="content-section">
            <h2 className="section-title">14. International Users</h2>
            <p>
              Our services are designed and intended for users located in India. If you access our services from outside India, you do so at your own discretion and are responsible for compliance with the laws of your local jurisdiction.
            </p>
            <p>
              Data collected from international users will be stored and processed in India in accordance with Indian law.
            </p>
          </section>

          <section id="intellectual-prop" className="content-section">
            <h2 className="section-title">15. Intellectual Property — Notice to Users</h2>
            <p>
              All course materials, videos, PDFs, live session recordings, study resources, branding materials, and website content are the exclusive intellectual property of DS ASTRO INSTITUTE LLP and are protected under the Copyright Act, 1957 and applicable Indian intellectual property laws.
            </p>
            <p>
              Users are strictly prohibited from copying, recording, redistribution, resale, or unauthorised sharing of any course or platform content. Credential sharing is prohibited. Violations may result in immediate account termination and civil or criminal legal action.
            </p>
            <p>
              <em>Note: Detailed terms governing intellectual property, course usage rights, cancellations, and refunds are set out in our separate Terms and Conditions document.</em>
            </p>
          </section>

          <section id="governing-law" className="content-section">
            <h2 className="section-title">16. Governing Law and Jurisdiction</h2>
            <p>
              This Privacy Policy is governed by and construed in accordance with the laws of India, including the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
            <p>
              Any disputes arising out of or relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Lucknow, Uttar Pradesh, India</strong>.
            </p>
          </section>

          <section id="grievance-officer" className="content-section">
            <h2 className="section-title">17. Grievance Officer</h2>
            <p>
              In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, DS ASTRO INSTITUTE LLP has designated a Grievance Officer to address privacy-related concerns.
            </p>
            <div className="contact-box">
              <p><strong>Name:</strong> Ananya Singh</p>
              <p><strong>Designation:</strong> Grievance Officer</p>
              <p><strong>Email:</strong> help@dsastroinstitute.com</p>
              <p><strong>Phone:</strong> +91 7570972970</p>
              <p><strong>Address:</strong> D321, Vibhuti Khand, Lucknow, Uttar Pradesh - 226010</p>
              <p><strong>Response Time:</strong> Within 7 working days of receipt of complaint</p>
            </div>
            <p>
              You may also raise a complaint with the Data Protection Board of India, once constituted under the DPDP Act, 2023, if you are not satisfied with the resolution provided by us.
            </p>
          </section>

          <section id="policy-changes" className="content-section">
            <h2 className="section-title">18. Changes to This Privacy Policy</h2>
            <p>
              DS ASTRO INSTITUTE LLP reserves the right to update, amend, or modify this Privacy Policy at any time to reflect changes in our practices, services, or applicable legal requirements.
            </p>
            <p>
              Any material changes will be notified to users via email or through a prominent notice on our website. The revised policy will be effective from the date of publication. Continued use of our services after such changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section id="contact-us" className="contact-section">
            <h2 className="contact-title">19. Contact Us</h2>
            <p className="contact-desc">
              For any questions, concerns, or requests relating to this Privacy Policy, please contact us at:
            </p>
            <div className="contact-details">
              <p><strong>Company Name:</strong> DS ASTRO INSTITUTE LLP</p>
              <p><strong>Registered Address:</strong> D321, Vibhuti Khand, Lucknow, Uttar Pradesh - 226010</p>
              <p><strong>Email:</strong> info@dsastroinstitute.com</p>
              <p><strong>Phone:</strong> +91 7570972970</p>
              <p><strong>Website:</strong> https://dsastroinstitute.com/</p>
            </div>
            <a href="mailto:info@dsastroinstitute.com" className="contact-button">Contact Support</a>
            <p className="mt-4" style={{ fontSize: '1rem', color: '#000000' }}>
              <em>This Privacy Policy is applicable to all services offered by DS ASTRO INSTITUTE LLP, including online astrology courses, live consultations, merchandise sales, and all associated digital platforms.</em>
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

export default PrivacyPolicy;
