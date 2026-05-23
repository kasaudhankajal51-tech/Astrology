import { useState, useEffect } from 'react';
import { 
  Shield, 
  Calendar, 
  Clock, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  UserCheck, 
  AlertCircle, 
  Sparkles, 
  CreditCard, 
  MessageSquare, 
  Cookie, 
  Share2, 
  History, 
  Scale, 
  User, 
  ExternalLink, 
  Globe, 
  BookOpen, 
  Gavel, 
  HeartHandshake, 
  Compass, 
  ChevronRight, 
  FileText
} from 'lucide-react';

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('info-collect');

  const sections = [
    { id: 'info-collect', label: '1. Information We Collect', icon: FileText },
    { id: 'legal-basis', label: '2. Legal Basis for Processing', icon: Scale },
    { id: 'how-use', label: '3. How We Use Your Information', icon: Compass },
    { id: 'astro-data', label: '4. Astrology Consultation Data', icon: Sparkles },
    { id: 'payment-info', label: '5. Payment Information', icon: CreditCard },
    { id: 'comm-consent', label: '6. Communication Consent', icon: MessageSquare },
    { id: 'cookies-policy', label: '7. Cookies Policy', icon: Cookie },
    { id: 'data-sharing', label: '8. Data Sharing & Disclosure', icon: Share2 },
    { id: 'data-retention', label: '9. Data Retention', icon: History },
    { id: 'data-security', label: '10. Data Security', icon: Lock },
    { id: 'user-rights', label: '11. Your Rights as a Data Principal', icon: UserCheck },
    { id: 'minors-policy', label: '12. Children & Minors Policy', icon: User },
    { id: 'third-party', label: '13. Third-Party Links & Platforms', icon: ExternalLink },
    { id: 'intl-users', label: '14. International Users', icon: Globe },
    { id: 'intellectual-prop', label: '15. Intellectual Property', icon: BookOpen },
    { id: 'governing-law', label: '16. Governing Law & Jurisdiction', icon: Gavel },
    { id: 'grievance-officer', label: '17. Grievance Officer', icon: Shield },
    { id: 'policy-changes', label: '18. Changes to This Policy', icon: History },
    { id: 'contact-us', label: '19. Contact Us', icon: HeartHandshake }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // Offset for header + padding

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
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetPosition = el.offsetTop - 140; // Adjust for sticky layout
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="privacy-policy-wrapper">
      {/* Hero / Header Section */}
      <section className="policy-hero py-5 text-center position-relative">
        <div className="policy-hero-bg"></div>
        <div className="container position-relative z-2">
          <div className="d-inline-flex align-items-center justify-content-center p-3 mb-4 rounded-circle bg-white shadow-sm border border-gold-light text-primary-gold animate__animated animate__fadeInDown">
            <Shield size={40} className="text-primary-gold" />
          </div>
          <h1 className="hero-title mb-2 animate__animated animate__fadeIn">Privacy Policy</h1>
          <h4 className="company-subtitle mb-4 text-muted">DS ASTRO INSTITUTE LLP</h4>
          
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <div className="meta-badge d-flex align-items-center gap-2">
              <Calendar size={14} className="text-muted" />
              <span>Effective Date: <strong className="text-dark">22nd May, 2026</strong></span>
            </div>
            <div className="meta-badge d-flex align-items-center gap-2">
              <Clock size={14} className="text-muted" />
              <span>Last Updated: <strong className="text-dark">22nd May, 2026</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout Container */}
      <div className="container pb-5">
        {/* Intro Highlight Box */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card glass-card p-4 p-md-5 border-0 shadow-sm animate__animated animate__fadeInUp">
              <p className="lead mb-4 text-dark font-sans" style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
                <strong>DS ASTRO INSTITUTE LLP</strong> ("Company", "we", "our", or "us"), registered under the laws of India, is engaged in providing live astrology courses, astrology consultations, and astrology-related merchandise through its website, mobile platforms, and associated digital channels.
              </p>
              <p className="mb-4">
                This Privacy Policy describes how we collect, use, store, process, share, and protect your personal data in accordance with the <strong>Digital Personal Data Protection Act, 2023 ("DPDP Act")</strong>, the Information Technology Act, 2000, and other applicable Indian laws and regulations.
              </p>
              <div className="p-3 bg-light-gold rounded-3 border-left-gold">
                <p className="mb-0 text-dark-brown" style={{ fontSize: '0.95rem' }}>
                  By accessing or using our website, enrolling in courses, booking consultations, or purchasing merchandise, you acknowledge that you have read and understood this Privacy Policy and consent to the processing of your personal data as described herein.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section with Sticky Sidebar */}
        <div className="row">
          {/* Sticky Left Sidebar Navigation */}
          <aside className="col-lg-4 d-none d-lg-block">
            <div className="sticky-sidebar card border-0 p-4 shadow-sm bg-white rounded-4">
              <h5 className="sidebar-heading mb-4 d-flex align-items-center gap-2">
                <BookOpen size={18} className="text-primary-gold" />
                Table of Contents
              </h5>
              <div className="sidebar-links-container custom-scrollbar">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`sidebar-nav-item text-start border-0 bg-transparent w-100 py-2.5 px-3 mb-1 rounded-3 d-flex align-items-center gap-2.5 transition-all ${
                        isActive ? 'active-nav-item' : 'text-muted'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-primary-gold' : 'text-muted-50'} />
                      <span className="nav-label">{section.label.substring(3)}</span>
                      {isActive && <ChevronRight size={14} className="ms-auto text-primary-gold" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Detailed Content Area */}
          <main className="col-lg-8 col-12">
            <div className="policy-document-content bg-white p-4 p-md-5 rounded-4 shadow-sm">
              
              {/* Section 1 */}
              <section id="info-collect" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <FileText size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">1. Information We Collect</h2>
                </div>
                
                <div className="mb-4">
                  <h5 className="sub-section-title text-primary-gold mb-3">A. Personal Data You Provide</h5>
                  <div className="card-sub-grid grid-two-col gap-3">
                    {[
                      { label: "Full name", desc: "For course enrollment, student management, and invoice generation." },
                      { label: "Contact Details", desc: "Mobile number and email address for communication, reminders, and notifications." },
                      { label: "Physical Address", desc: "Billing and shipping address for astrology-related merchandise delivery." },
                      { label: "Birth details", desc: "Date of birth, time of birth, and place of birth (required for astrology consultations)." },
                      { label: "Payment Info", desc: "Processed securely through third-party gateways (we do NOT store payment card or banking details)." },
                      { label: "Communications", desc: "Queries, messages, and feedback submitted through forms, WhatsApp, email, or support channels." },
                      { label: "Verification Proof", desc: "Government-issued identity proof, only if explicitly required for verification purposes." }
                    ].map((item, idx) => (
                      <div key={idx} className="sub-card p-3 rounded-3 bg-light border-light-gold">
                        <strong className="text-dark font-sans">{item.label}</strong>
                        <p className="small mb-0 text-muted mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="sub-section-title text-primary-gold mb-3">B. Technical and Usage Data</h5>
                  <ul className="custom-bullets font-sans">
                    <li>IP address and geographic location data</li>
                    <li>Browser type, version, and device information</li>
                    <li>Operating system details</li>
                    <li>Website usage data, including pages visited, time spent, and navigation patterns</li>
                    <li>Cookies, web beacons, and similar tracking technologies</li>
                    <li>Login activity and session data</li>
                  </ul>
                </div>

                <div>
                  <h5 className="sub-section-title text-primary-gold mb-3">C. Data from Third Parties</h5>
                  <p className="text-content">
                    We may receive information from third-party platforms such as payment gateways, social media platforms (if you connect your account), and analytics providers, in accordance with their respective privacy policies.
                  </p>
                </div>
              </section>

              <hr className="divider" />

              {/* Section 2 */}
              <section id="legal-basis" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Scale size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">2. Legal Basis for Processing Your Data</h2>
                </div>
                <p className="mb-4">
                  Under the Digital Personal Data Protection Act, 2023, we process your personal data on the following lawful bases:
                </p>
                <div className="grid-two-col gap-3">
                  {[
                    { title: "Consent", desc: "Where you have given explicit consent for us to process your data for specific purposes, such as marketing communications or astrology consultation services." },
                    { title: "Contractual Necessity", desc: "Where processing is necessary to provide services you have requested, including course enrollment, consultation bookings, and merchandise delivery." },
                    { title: "Legitimate Use", desc: "Where processing is required for compliance with applicable Indian laws, prevention of fraud, and maintenance of financial and transaction records." },
                    { title: "Legal Obligation", desc: "Where we are required to process or retain your data under law, including tax laws, GST regulations, and regulatory directives." }
                  ].map((basis, idx) => (
                    <div key={idx} className="basis-card p-3 rounded-3 border-light-gold">
                      <h6 className="basis-title text-primary-gold font-sans font-weight-bold mb-2">{basis.title}</h6>
                      <p className="small mb-0 text-content">{basis.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="divider" />

              {/* Section 3 */}
              <section id="how-use" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Compass size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">3. How We Use Your Information</h2>
                </div>
                <p>We use your personal data for the following purposes:</p>
                <ul className="custom-bullets font-sans grid-list-items">
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

              <hr className="divider" />

              {/* Section 4 */}
              <section id="astro-data" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Sparkles size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">4. Astrology Consultation Data</h2>
                </div>
                <div className="card-callout p-4 rounded-4 border-left-gold bg-light-gold mb-4">
                  <p className="mb-3 text-dark font-sans font-weight-bold">
                    Information shared during astrology consultations, including birth details, personal queries, kundali/charts, session recordings, and consultation notes, is used exclusively for:
                  </p>
                  <ul className="custom-bullets text-content font-sans mb-3">
                    <li>Providing the requested consultation service.</li>
                    <li>Maintaining service and records as part of our legitimate business operations.</li>
                    <li>Improving consultation quality and training purposes (only in anonymised form, without disclosure of identity).</li>
                  </ul>
                  <div className="alert-badge d-flex align-items-center gap-2 p-2 px-3 bg-white rounded-3 border">
                    <AlertCircle size={16} className="text-primary-gold flex-shrink-0" />
                    <span className="small text-dark-brown">We do not publicly disclose, publish, or share consultation data with any unauthorised third party. Disclosure is made only where mandated by a competent authority or court of law.</span>
                  </div>
                </div>
              </section>

              <hr className="divider" />

              {/* Section 5 */}
              <section id="payment-info" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <CreditCard size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">5. Payment Information</h2>
                </div>
                <p>
                  All payments on our platform are processed through PCI-DSS compliant third-party payment gateways and licensed banking partners regulated by the Reserve Bank of India (RBI).
                </p>
                <div className="secure-callout p-3 rounded-3 d-flex align-items-center gap-3 bg-light border-light-gold">
                  <Lock size={28} className="text-primary-gold flex-shrink-0" />
                  <div className="callout-content">
                    <strong className="text-dark font-sans">Payment Details Not Stored</strong>
                    <p className="small text-muted mb-0">We do not store complete debit card or credit card numbers, CVV, UPI PINs, or banking passwords on our servers. Transaction records are retained solely for the purposes of invoicing, dispute resolution, and compliance with GST and income tax laws.</p>
                  </div>
                </div>
              </section>

              <hr className="divider" />

              {/* Section 6 */}
              <section id="comm-consent" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <MessageSquare size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">6. Communication Consent</h2>
                </div>
                <p>
                  By submitting your contact details on our platform, you authorise <strong>DS ASTRO INSTITUTE LLP</strong> to contact you through phone calls, SMS, email, WhatsApp, and push notifications for:
                </p>
                <ul className="custom-bullets font-sans mb-4">
                  <li>Service updates, booking confirmations, and reminders</li>
                  <li>Customer support communications</li>
                  <li>Important notices regarding your account or services</li>
                  <li>Promotional offers and marketing material (with opt-out option)</li>
                </ul>
                <div className="info-badge p-3 rounded-3 bg-light-brown text-dark-brown font-sans border-left-primary-gold">
                  <strong>Consent Withdrawal:</strong> You may withdraw your consent for promotional communications at any time by contacting us at the details provided in this policy or by using the opt-out mechanism in any marketing communication. Withdrawal of marketing consent will not affect transactional communications required to deliver services.
                </div>
              </section>

              <hr className="divider" />

              {/* Section 7 */}
              <section id="cookies-policy" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Cookie size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">7. Cookies Policy</h2>
                </div>
                <p className="mb-4">
                  Our website uses cookies and similar tracking technologies to improve user experience, analyse website traffic, personalise content, and remember user preferences.
                </p>
                <div className="grid-two-col gap-3 mb-4">
                  {[
                    { name: "Essential Cookies", desc: "Required for core website functionality. Cannot be disabled." },
                    { name: "Analytics Cookies", desc: "Help us understand user behaviour and improve our services." },
                    { name: "Preference Cookies", desc: "Remember your settings and personalise your experience." },
                    { name: "Marketing Cookies", desc: "Used to deliver relevant promotional content." }
                  ].map((cookie, idx) => (
                    <div key={idx} className="cookie-card p-3 rounded-3 border-light-gold">
                      <strong className="text-dark font-sans block mb-1">{cookie.name}</strong>
                      <p className="small mb-0 text-muted">{cookie.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-content">
                  You may disable non-essential cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of some features on our website.
                </p>
              </section>

              <hr className="divider" />

              {/* Section 8 */}
              <section id="data-sharing" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Share2 size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">8. Data Sharing and Disclosure</h2>
                </div>
                <p className="mb-3">
                  <strong>We do not sell, rent, or trade your personal data to any third party.</strong>
                </p>
                <p className="mb-3">Your data may be shared with:</p>
                <ul className="custom-bullets font-sans grid-list-items mb-4">
                  <li>Payment gateway and banking service providers for transaction processing.</li>
                  <li>Delivery and logistics partners for merchandise fulfilment.</li>
                  <li>Technology, hosting, and cloud infrastructure providers.</li>
                  <li>Analytics and marketing platforms, subject to appropriate data processing agreements.</li>
                  <li>Legal, regulatory, or governmental authorities where required under applicable law or court orders.</li>
                  <li>Internal staff, consultants, and advisors on a need-to-know basis.</li>
                </ul>
                <div className="p-3 bg-light rounded-3 font-sans border-left-gold">
                  <p className="mb-0 text-muted small">All third parties with whom we share data are contractually obligated to maintain confidentiality and process data only for the specified purpose.</p>
                </div>
              </section>

              <hr className="divider" />

              {/* Section 9 */}
              <section id="data-retention" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <History size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">9. Data Retention</h2>
                </div>
                <p className="mb-4">
                  We retain your personal data only for as long as is necessary for the purposes set out in this policy, unless a longer retention period is required by law.
                </p>
                <div className="timeline-container font-sans mb-4">
                  {[
                    { label: "Course & Consultation Records", period: "Duration of service and up to 3 years thereafter for operational and dispute resolution purposes." },
                    { label: "Financial & Transaction Records", period: "Minimum of 7 years as required under Indian tax and GST laws." },
                    { label: "Marketing Data", period: "Retained until consent is withdrawn." },
                    { label: "Technical & Log Data", period: "Retained for up to 90 days unless required for investigation purposes." }
                  ].map((item, idx) => (
                    <div key={idx} className="timeline-item d-flex gap-3 mb-3 pb-3 border-bottom-light">
                      <div className="timeline-period text-primary-gold font-weight-bold flex-shrink-0" style={{ width: '150px' }}>{item.label}</div>
                      <div className="timeline-desc text-content">{item.period}</div>
                    </div>
                  ))}
                </div>
                <p className="small text-muted italic">Upon expiry of the retention period, personal data is securely deleted or anonymised.</p>
              </section>

              <hr className="divider" />

              {/* Section 10 */}
              <section id="data-security" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Lock size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">10. Data Security</h2>
                </div>
                <p className="mb-4">
                  We implement reasonable and appropriate administrative, technical, and physical security measures to protect your personal data from unauthorised access, disclosure, alteration, loss, or destruction, including:
                </p>
                <div className="row g-3 mb-4">
                  {[
                    { title: "SSL/TLS Encryption", desc: "For data transmitted through our website securely." },
                    { title: "Access Controls", desc: "Role-based permissions for internal staff on need-to-know basis." },
                    { title: "Security Assessments", desc: "Regular audits and performance monitoring to prevent leaks." },
                    { title: "Secure Data Storage", desc: "Hosted with reputed cloud service providers with advanced firewalls." }
                  ].map((security, idx) => (
                    <div key={idx} className="col-md-6">
                      <div className="security-card p-3 rounded-3 bg-light border h-100">
                        <strong className="text-dark font-sans font-weight-bold block mb-1">{security.title}</strong>
                        <p className="small text-muted mb-0">{security.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="small text-muted italic mb-0">
                  However, no method of digital transmission or storage is completely secure. In the event of a personal data breach that is likely to affect your rights, we will notify you and the appropriate authorities in accordance with applicable law.
                </p>
              </section>

              <hr className="divider" />

              {/* Section 11 */}
              <section id="user-rights" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <UserCheck size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">11. Your Rights as a Data Principal</h2>
                </div>
                <p className="mb-4">
                  Under the Digital Personal Data Protection Act, 2023 and applicable Indian law, you have the following rights:
                </p>
                <div className="grid-two-col gap-3 mb-4">
                  {[
                    { right: "Right to Access", desc: "Request information about the personal data we hold about you and how it is being processed." },
                    { right: "Right to Correction", desc: "Request correction of inaccurate or incomplete personal data." },
                    { right: "Right to Erasure", desc: "Request deletion of your personal data, subject to our legal obligations and legitimate business requirements." },
                    { right: "Right to Withdraw Consent", desc: "Withdraw consent at any time, without affecting the lawfulness of processing prior to withdrawal." },
                    { right: "Right to Grievance Redressal", desc: "Lodge a complaint with our Grievance Officer (details in Section 17)." },
                    { right: "Right to Nominate", desc: "Nominate a person to exercise your rights in the event of your death or incapacity, as permissible under applicable law." }
                  ].map((item, idx) => (
                    <div key={idx} className="rights-card p-3 rounded-3 border-left-gold bg-light">
                      <strong className="text-dark font-sans block mb-1">{item.right}</strong>
                      <p className="small text-muted mb-0">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="small text-muted mb-0">
                  Requests to exercise any of the above rights may be submitted to our Grievance Officer using the contact details below. We will respond within the timeframes prescribed by applicable law.
                </p>
              </section>

              <hr className="divider" />

              {/* Section 12 */}
              <section id="minors-policy" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <User size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">12. Children and Minors Policy</h2>
                </div>
                <p>Our services are primarily intended for individuals who are 18 years of age or older.</p>
                <p className="mb-3">
                  We do not knowingly collect personal data from individuals below 18 years of age without verified parental or guardian consent. If a minor wishes to access our services, they must do so under the supervision and with the explicit consent of a parent or legal guardian who accepts responsibility for the minor's use of our services.
                </p>
                <div className="alert-badge d-flex align-items-center gap-2 p-3 bg-light rounded-3 border">
                  <AlertCircle size={18} className="text-primary-gold flex-shrink-0" />
                  <span className="small text-content">If we become aware that we have inadvertently collected personal data from a minor without appropriate consent, we will take immediate steps to delete such data. Parents or guardians who believe their child's data has been collected may contact our Grievance Officer.</span>
                </div>
              </section>

              <hr className="divider" />

              {/* Section 13 */}
              <section id="third-party" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <ExternalLink size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">13. Third-Party Links and Platforms</h2>
                </div>
                <p>
                  Our website and communications may contain links to third-party websites, applications, social media platforms, or payment portals. These third-party platforms operate independently and are governed by their own privacy policies.
                </p>
                <p className="text-content mb-0">
                  We are not responsible for the privacy practices, data handling, or content of any third-party platform. We encourage you to review the privacy policies of any third-party platforms you access.
                </p>
              </section>

              <hr className="divider" />

              {/* Section 14 */}
              <section id="intl-users" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Globe size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">14. International Users</h2>
                </div>
                <p>
                  Our services are designed and intended for users located in India. If you access our services from outside India, you do so at your own discretion and are responsible for compliance with the laws of your local jurisdiction.
                </p>
                <p className="text-content mb-0">
                  Data collected from international users will be stored and processed in India in accordance with Indian law.
                </p>
              </section>

              <hr className="divider" />

              {/* Section 15 */}
              <section id="intellectual-prop" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <BookOpen size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">15. Intellectual Property — Notice to Users</h2>
                </div>
                <div className="card-ip-warning p-4 rounded-4 border-left-gold bg-light-gold mb-3">
                  <p className="mb-3 text-dark font-sans font-weight-bold">
                    All course materials, videos, PDFs, live session recordings, study resources, branding materials, and website content are the exclusive intellectual property of DS ASTRO INSTITUTE LLP and are protected under the Copyright Act, 1957 and applicable Indian intellectual property laws.
                  </p>
                  <p className="text-content mb-3 font-sans" style={{ fontSize: '0.95rem' }}>
                    Users are strictly prohibited from copying, recording, redistribution, resale, or unauthorised sharing of any course or platform content. Credential sharing is prohibited. Violations may result in immediate account termination and civil or criminal legal action.
                  </p>
                  <div className="small italic text-muted">
                    Note: Detailed terms governing intellectual property, course usage rights, cancellations, and refunds are set out in our separate Terms and Conditions document.
                  </div>
                </div>
              </section>

              <hr className="divider" />

              {/* Section 16 */}
              <section id="governing-law" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Gavel size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">16. Governing Law and Jurisdiction</h2>
                </div>
                <p>
                  This Privacy Policy is governed by and construed in accordance with the laws of India, including the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                </p>
                <p className="text-content mb-0">
                  Any disputes arising out of or relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Lucknow, Uttar Pradesh, India</strong>.
                </p>
              </section>

              <hr className="divider" />

              {/* Section 17 */}
              <section id="grievance-officer" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <Shield size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">17. Grievance Officer</h2>
                </div>
                <p className="mb-4">
                  In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, DS ASTRO INSTITUTE LLP has designated a Grievance Officer to address privacy-related concerns.
                </p>
                
                <div className="officer-card card border-0 p-4 shadow-sm bg-light mb-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="p-2 bg-white rounded-circle border border-gold-light">
                      <UserCheck size={28} className="text-primary-gold" />
                    </div>
                    <div>
                      <h5 className="mb-0 text-dark font-sans font-weight-bold">Ananya Singh</h5>
                      <span className="small text-muted">Grievance Officer</span>
                    </div>
                  </div>
                  
                  <div className="d-flex flex-column gap-2 font-sans text-content">
                    <a href="mailto:help@dsastroinstitute.com" className="contact-link d-flex align-items-center gap-2.5 text-decoration-none">
                      <Mail size={16} className="text-primary-gold" />
                      <span>help@dsastroinstitute.com</span>
                    </a>
                    <a href="tel:+917570972970" className="contact-link d-flex align-items-center gap-2.5 text-decoration-none">
                      <Phone size={16} className="text-primary-gold" />
                      <span>+91 75709 72970</span>
                    </a>
                    <div className="d-flex align-items-start gap-2.5">
                      <MapPin size={16} className="text-primary-gold mt-1" />
                      <span>D321, Vibhuti Khand, Lucknow, Uttar Pradesh - 226010</span>
                    </div>
                    <div className="d-flex align-items-center gap-2.5 mt-2 p-2 bg-white rounded border">
                      <Clock size={15} className="text-primary-gold" />
                      <span className="small"><strong>Response Time:</strong> Within 7 working days of receipt of complaint</span>
                    </div>
                  </div>
                </div>

                <p className="text-content mb-0">
                  You may also raise a complaint with the Data Protection Board of India, once constituted under the DPDP Act, 2023, if you are not satisfied with the resolution provided by us.
                </p>
              </section>

              <hr className="divider" />

              {/* Section 18 */}
              <section id="policy-changes" className="policy-section mb-5">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <History size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">18. Changes to This Privacy Policy</h2>
                </div>
                <p>
                  DS ASTRO INSTITUTE LLP reserves the right to update, amend, or modify this Privacy Policy at any time to reflect changes in our practices, services, or applicable legal requirements.
                </p>
                <p className="text-content mb-0">
                  Any material changes will be notified to users via email or through a prominent notice on our website. The revised policy will be effective from the date of publication. Continued use of our services after such changes constitutes acceptance of the revised policy.
                </p>
              </section>

              <hr className="divider" />

              {/* Section 19 */}
              <section id="contact-us" className="policy-section mb-0">
                <div className="section-header d-flex align-items-center gap-3 mb-4">
                  <div className="icon-wrapper">
                    <HeartHandshake size={22} className="text-primary-gold" />
                  </div>
                  <h2 className="section-title-text h4 m-0 text-dark-brown">19. Contact Us</h2>
                </div>
                <p className="mb-4">
                  For any questions, concerns, or requests relating to this Privacy Policy, please contact us at:
                </p>

                <div className="contact-card card border-0 p-4 shadow-sm bg-light-gold">
                  <h5 className="mb-3 text-dark font-sans font-weight-bold">DS ASTRO INSTITUTE LLP</h5>
                  <div className="d-flex flex-column gap-2.5 font-sans text-content">
                    <a href="mailto:info@dsastroinstitute.com" className="contact-link d-flex align-items-center gap-2.5 text-decoration-none">
                      <Mail size={16} className="text-primary-gold" />
                      <span>info@dsastroinstitute.com</span>
                    </a>
                    <a href="tel:+917570972970" className="contact-link d-flex align-items-center gap-2.5 text-decoration-none">
                      <Phone size={16} className="text-primary-gold" />
                      <span>+91 75709 72970</span>
                    </a>
                    <div className="d-flex align-items-start gap-2.5">
                      <MapPin size={16} className="text-primary-gold mt-1" />
                      <span>Registered Address: D321, Vibhuti Khand, Lucknow, Uttar Pradesh - 226010</span>
                    </div>
                    <a href="https://dsastroinstitute.com/" target="_blank" rel="noopener noreferrer" className="contact-link d-flex align-items-center gap-2.5 text-decoration-none">
                      <Globe size={16} className="text-primary-gold" />
                      <span>https://dsastroinstitute.com/</span>
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-light rounded-3 text-center border">
                  <p className="small text-muted mb-0 font-sans">
                    This Privacy Policy is applicable to all services offered by DS ASTRO INSTITUTE LLP, including online astrology courses, live consultations, merchandise sales, and all associated digital platforms.
                  </p>
                </div>
              </section>

            </div>
          </main>
        </div>
      </div>

      <style>{`
        .privacy-policy-wrapper {
          background-color: var(--bg-color);
          color: var(--text-content);
          font-family: var(--font-sans);
          min-height: 100vh;
        }

        /* Hero / Header Section */
        .policy-hero {
          background: radial-gradient(circle at 50% 50%, rgba(200, 131, 42, 0.08), transparent 70%);
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 50px;
        }
        
        .hero-title {
          font-family: var(--font-serif);
          color: var(--text-heading);
          font-weight: 700;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
        }

        .company-subtitle {
          font-family: var(--font-sans);
          font-weight: 600;
          letter-spacing: 2px;
          font-size: 1rem;
        }

        .meta-badge {
          background: #FFFFFF;
          border: 1px solid var(--glass-border);
          border-radius: 40px;
          padding: 8px 18px;
          font-size: 0.85rem;
          color: var(--text-muted);
          box-shadow: var(--premium-shadow);
        }

        .border-gold-light {
          border-color: rgba(200, 131, 42, 0.25) !important;
        }

        .text-primary-gold {
          color: var(--primary-color) !important;
        }

        /* Glass / Card styling */
        .glass-card {
          background: var(--card-color) !important;
          border: 1px solid var(--glass-border) !important;
          border-radius: 24px !important;
          box-shadow: var(--premium-shadow) !important;
        }

        .bg-light-gold {
          background-color: rgba(200, 131, 42, 0.06) !important;
        }

        .bg-light-brown {
          background-color: rgba(139, 74, 30, 0.04) !important;
        }

        .text-dark-brown {
          color: var(--text-heading) !important;
        }

        .border-left-gold {
          border-left: 4px solid var(--primary-color) !important;
        }

        .border-left-primary-gold {
          border-left: 4px solid var(--primary-color) !important;
        }

        /* Sticky Sidebar */
        .sticky-sidebar {
          position: sticky;
          top: 100px;
          max-height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
          border: 1px solid var(--glass-border) !important;
        }

        .sidebar-heading {
          font-family: var(--font-serif);
          color: var(--text-heading);
          font-weight: 700;
          font-size: 1.15rem;
        }

        .sidebar-links-container {
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 4px;
        }

        .sidebar-nav-item {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: all 0.25s ease;
          outline: none;
          cursor: pointer;
        }

        .sidebar-nav-item:hover {
          background-color: rgba(200, 131, 42, 0.08) !important;
          color: var(--primary-color) !important;
          padding-left: 18px !important;
        }

        .active-nav-item {
          background-color: rgba(139, 74, 30, 0.08) !important;
          color: var(--primary-color) !important;
          font-weight: 600;
        }

        .nav-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Document Content styling */
        .policy-document-content {
          border: 1px solid var(--glass-border);
        }

        .section-header .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(139, 74, 30, 0.08);
          border-radius: 12px;
          color: var(--primary-color);
        }

        .section-title-text {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--text-heading);
          font-size: 1.35rem;
        }

        .sub-section-title {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 600;
        }

        .text-content {
          color: var(--text-content);
          line-height: 1.7;
          font-size: 0.98rem;
        }

        .grid-two-col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        @media (max-width: 767px) {
          .grid-two-col {
            grid-template-columns: 1fr;
          }
        }

        .sub-card {
          border: 1px solid rgba(200, 131, 42, 0.12);
          transition: all 0.25s ease;
        }

        .sub-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 74, 30, 0.04);
        }

        .basis-card {
          background-color: #FFFFFF;
          border: 1px solid var(--glass-border);
          transition: all 0.25s ease;
        }

        .basis-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
        }

        .cookie-card {
          background-color: #FFFFFF;
          border: 1px solid var(--glass-border);
        }

        .rights-card {
          border-left: 3px solid var(--primary-color);
          border-top: 1px solid rgba(200, 131, 42, 0.08);
          border-right: 1px solid rgba(200, 131, 42, 0.08);
          border-bottom: 1px solid rgba(200, 131, 42, 0.08);
        }

        /* Custom Bullet List */
        .custom-bullets {
          list-style: none;
          padding-left: 0;
        }

        .custom-bullets li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          color: var(--text-content);
          line-height: 1.6;
        }

        .custom-bullets li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-size: 0.9rem;
          top: 0px;
        }

        .grid-list-items {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6px;
        }

        /* Timeline for retention */
        .timeline-item {
          border-bottom: 1px solid rgba(200, 131, 42, 0.1);
        }

        .timeline-item:last-child {
          border-bottom: none;
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }

        /* Cards inside content */
        .officer-card, .contact-card {
          border: 1px solid var(--glass-border) !important;
          border-radius: 16px !important;
        }

        .contact-link {
          color: var(--text-content);
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .contact-link:hover {
          color: var(--primary-color);
        }

        .divider {
          border: 0;
          height: 1px;
          background: linear-gradient(to right, rgba(200, 131, 42, 0.05), rgba(200, 131, 42, 0.2), rgba(200, 131, 42, 0.05));
          margin: 40px 0;
        }

        .policy-section {
          scroll-margin-top: 140px;
        }
      `}</style>
    </div>
  );
}

export default PrivacyPolicy;
