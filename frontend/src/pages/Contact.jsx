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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      <SEO title="Contact Us" description="Get in touch with DS Institute for astrology consultations and courses." url="/contact" />

      {/* Hero Section - Modern Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"></div>

        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <i className="fas fa-headset text-amber-300 text-sm"></i>
              <span className="text-sm font-medium">24/7 Support Available</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-amber-100 mb-8 leading-relaxed">
              Have questions about our courses or consultations? We're here to help you on your astrological journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative -mt-16 pb-20">
        <div className="container mx-auto px-4">

          {/* Contact Channels - Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactChannels.map((channel) => {
              const value = channelValues[channel.valueKey];
              const cardContent = (
                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className={`fas ${channel.icon} text-2xl text-amber-600`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{channel.title}</h3>
                    <p className="text-gray-600 font-medium mb-2">{value}</p>
                    <p className="text-sm text-gray-500">{channel.hint}</p>
                  </div>
                </div>
              );

              return channel.href ? (
                <a key={channel.title} href={channel.href(value)} className="block no-underline">
                  {cardContent}
                </a>
              ) : (
                <div key={channel.title}>{cardContent}</div>
              );
            })}
          </div>

          {/* Form and Support Section */}
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left Column - Support Info */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 mb-4">
                  <i className="fas fa-heart text-amber-600 text-sm"></i>
                  <span className="text-sm font-semibold text-amber-700">Why Choose Us</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  We're Here to<br />Support You
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Whether you need help choosing a course, booking a consultation, or understanding a remedy —
                  our dedicated advisors are ready to assist you with personalized guidance.
                </p>
              </div>

              {/* Support Highlights */}
              <div className="space-y-4">
                {supportHighlights.map((item) => (
                  <div key={item.text} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                      <i className={`fas ${item.icon} text-amber-600`}></i>
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Grievance Officer Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-user-shield text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Grievance Officer</h3>
                </div>
                <div className="space-y-3">
                  {grievanceDetails.map(([label, value]) => (
                    <div key={label} className="flex flex-wrap gap-2 text-sm">
                      <span className="font-semibold text-amber-700 min-w-[120px]">{label}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center lg:text-left">
                <Link
                  to="/book-consultation"
                  className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors group"
                >
                  Prefer a consultation instead?
                  <span className="group-hover:translate-x-1 transition-transform">Book a session →</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Modern Form */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-6">
                <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                <p className="text-amber-100">Fill out the form and we'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-6">
                  {/* Name and Phone Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="fas fa-user text-amber-500 mr-2"></i>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="fas fa-phone text-amber-500 mr-2"></i>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-envelope text-amber-500 mr-2"></i>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-comment-dots text-amber-500 mr-2"></i>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      className="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <Link to="/privacy-policy" className="text-amber-600 hover:text-amber-700 font-semibold">
                        Privacy Policy
                      </Link>{' '}
                      and consent to DS Institute contacting me via phone, email, and WhatsApp.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
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