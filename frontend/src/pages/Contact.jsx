import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';
import { getContactValidationError, normalizeIndianMobile } from '../utils/validation';

const contactChannels = [
  {
    icon: 'fa-phone-alt',
    title: 'Call Us',
    valueKey: 'contactPhone',
    href: (value) => `tel:${value.replace(/\s/g, '')}`,
    hint: 'Mon–Sat, 10 AM – 7 PM IST'
  },
  {
    icon: 'fa-envelope',
    title: 'Email Us',
    valueKey: 'contactEmail',
    href: (value) => `mailto:${value}`,
    hint: 'We reply within 24 hours'
  },
  {
    icon: 'fa-map-marker-alt',
    title: 'Visit Us',
    valueKey: 'address',
    href: null,
    hint: 'In-person consultations by appointment'
  }
];

const supportHighlights = [
  { icon: 'fa-clock', text: 'Average response time: within 24 hours' },
  { icon: 'fa-shield-alt', text: 'Your details are kept private and secure' },
  { icon: 'fa-headset', text: 'Dedicated support for students and clients' }
];

const grievanceDetails = [
  ['Name', 'Ananya Singh'],
  ['Email', 'help@dsastroinstitute.com'],
  ['Phone', '+91 7570972970'],
  ['Address', 'D321, Vibhuti Khand, Lucknow, Uttar Pradesh - 226010'],
  ['Response time', 'Within 7 working days']
];

const channelCardClass =
  'site-card-pad relative z-0 flex h-full items-start gap-4 rounded-2xl border border-site-accent-dark/15 bg-white shadow-[0_10px_24px_rgba(42,15,2,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-site-accent hover:shadow-[0_18px_36px_rgba(139,74,30,0.12)] max-md:hover:translate-y-0';

const inputClass =
  'w-full rounded-lg border border-site-accent-dark/20 bg-[#fafafa] px-4 py-4 text-body-sm text-site-text placeholder:text-[#9a8478] transition focus:border-site-accent-dark focus:bg-white focus:outline-none focus:ring-4 focus:ring-site-accent-dark/10';

function Contact() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = getContactValidationError(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);
    const sanitizedPhone = normalizeIndianMobile(formData.phone);
    try {
      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: sanitizedPhone,
          type: 'Contact'
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Message sent! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Network Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const channelValues = {
    contactPhone: settings?.contactPhone || '+91 75709 72970',
    contactEmail: settings?.contactEmail || 'info@dsastroinstitute.com',
    address: settings?.address || 'Varanasi, Uttar Pradesh, India'
  };

  return (
    <div className="relative z-0 min-h-screen bg-site-bg font-body text-site-text">
      <SEO title="Contact Us" description="Get in touch with DS Institute for astrology consultations and courses." url="/contact" />

      {/* Hero */}
      <section className="site-gradient-hero bg-gradient-to-br from-site-primary to-site-accent-dark">
        <div className="site-gradient-hero__inner">
          <span className="site-gradient-hero__kicker">We&apos;re Here to Help</span>
          <h1 className="site-gradient-hero__title">
            Contact <span className="site-gradient-hero__accent">Us</span>
          </h1>
          <p className="site-gradient-hero__subtitle">
            Questions about courses, consultations, or remedies? Reach out and our team will guide you with clarity and care.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative z-0 pb-16 md:pb-24">
        <div className="site-container">
          {/* Contact channels — site-banner-cards-gap beats legacy padding:0 reset */}
          <div className="site-banner-cards-gap grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
            {contactChannels.map((channel) => {
              const value = channelValues[channel.valueKey];
              const content = (
                <>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-site-accent-dark/10 bg-[#fff8ef]">
                    <i className={`fas ${channel.icon} text-xl text-site-accent-dark`} />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1.5 text-body-sm font-bold uppercase tracking-wide text-site-accent-dark">
                      {channel.title}
                    </p>
                    <p className="mb-1.5 break-words text-body font-semibold text-site-text">{value}</p>
                    <p className="mb-0 text-body-sm text-site-muted">{channel.hint}</p>
                  </div>
                </>
              );

              return channel.href ? (
                <a
                  key={channel.title}
                  href={channel.href(value)}
                  className={`${channelCardClass} text-inherit no-underline`}
                >
                  {content}
                </a>
              ) : (
                <div key={channel.title} className={channelCardClass}>
                  {content}
                </div>
              );
            })}
          </div>

          {/* Support + form */}
          <div className="site-section-divider grid grid-cols-1 items-start gap-12 md:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            {/* Left column */}
            <div className="flex flex-col gap-8 md:gap-10">
              <div>
                <span className="type-kicker text-site-accent-dark">Support</span>
                <h2 className="type-heading mb-5 mt-4 font-bold text-site-text">Let&apos;s Start a Conversation</h2>
                <p className="mb-0 text-body text-site-muted">
                  Whether you need help choosing a course, booking a consultation, or understanding a remedy — our advisors are ready to assist you.
                </p>
              </div>

              <div className="space-y-4">
                {supportHighlights.map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-body-sm text-site-muted">
                    <i className={`fas ${item.icon} w-5 text-center text-site-accent`} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="site-card-pad rounded-2xl border border-site-accent-dark/15 bg-[#fffbf5]">
                <h3 className="type-subheading mb-3 flex items-center gap-2 font-bold text-site-text">
                  <i className="fas fa-user-shield text-site-accent-dark" />
                  Grievance Officer
                </h3>
                <dl className="m-0 space-y-3">
                  {grievanceDetails.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-3 text-body-sm">
                      <dt className="m-0 font-bold text-site-accent-dark">{label}</dt>
                      <dd className="m-0 text-site-muted">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="mb-0 text-body-sm text-site-soft">
                Prefer a consultation instead?{' '}
                <Link to="/book-consultation" className="font-bold text-site-accent-dark no-underline hover:text-site-accent">
                  Book a session →
                </Link>
              </p>
            </div>

            {/* Form — padding on inner div, not <form>, to beat legacy CSS reset */}
            <div className="overflow-hidden rounded-2xl border border-site-accent-dark/15 bg-white shadow-[0_10px_24px_rgba(42,15,2,0.06)]">
              <form onSubmit={handleSubmit}>
                <div className="site-pad-box">
                <div className="mb-10">
                  <h3 className="type-subheading mb-3 font-bold text-site-text">Send a Message</h3>
                  <p className="mb-0 text-body-sm text-site-soft">Fill in the form and we&apos;ll get back to you shortly.</p>
                </div>

                <div className="site-field-stack">
                  <div>
                    <label htmlFor="contact-name" className="site-field-label text-body-sm font-semibold text-site-text">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="site-field-label text-body-sm font-semibold text-site-text">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="site-field-label text-body-sm font-semibold text-site-text">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="10-digit Indian mobile number"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="site-field-label text-body-sm font-semibold text-site-text">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you..."
                      className={`${inputClass} min-h-32 resize-y`}
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-site-accent-dark"
                  />
                  <label htmlFor="consent" className="mb-0 text-caption font-normal leading-relaxed text-site-muted">
                    I agree to the{' '}
                    <Link to="/privacy-policy" className="font-semibold text-site-accent-dark no-underline hover:text-site-accent">
                      Privacy Policy
                    </Link>{' '}
                    and consent to DS Institute LLP contacting me via phone, email, and WhatsApp.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 w-full rounded-lg border-0 bg-site-primary px-4 py-4 text-btn font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-site-accent-dark hover:shadow-[0_8px_20px_rgba(139,74,30,0.15)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
