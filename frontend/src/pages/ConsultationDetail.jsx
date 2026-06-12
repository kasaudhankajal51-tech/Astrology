import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ConsultationModal from '../components/ConsultationModal';
import SuccessModal from '../components/SuccessModal';
import SEO from '../components/SEO';
import { useConsultationService } from '../utils/consultationApi';
import { getContactValidationError, normalizeIndianMobile } from '../utils/validation';
import {
  BOOKING_MODES,
  submitConsultationBooking,
  fetchConsultationPaymentConfig,
  getEmptyConsultationForm,
} from '../utils/consultationBooking';

function ConsultationDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { service, loading, error } = useConsultationService(serviceId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState(BOOKING_MODES.PAY_NOW);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [paymentConfig, setPaymentConfig] = useState(null);
  const [formData, setFormData] = useState(getEmptyConsultationForm());

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchConsultationPaymentConfig().then(setPaymentConfig);
  }, [serviceId]);

  useEffect(() => {
    if (service) {
      setFormData((prev) => ({
        ...prev,
        consultationType: service.title,
        serviceId: service.id,
        priceLabel: service.priceLabel,
      }));
    }
  }, [service]);

  if (loading) {
    return (
      <div className="consult-detail-page site-container text-center">
        <p className="consult-desc">Loading consultation details…</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="consult-detail-page site-container text-center">
        <h2 className="type-heading">Service Not Found</h2>
        <p className="consult-desc">{error || 'This consultation may have been moved or removed.'}</p>
        <Link to="/book-consultation" className="consult-btn consult-btn--auto">
          Back to All Services
        </Link>
      </div>
    );
  }

  const openBooking = (mode) => {
    setBookingMode(mode);
    setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = getContactValidationError(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const sanitizedPhone = normalizeIndianMobile(formData.phone);
    setIsSubmitting(true);

    try {
      await submitConsultationBooking({
        formData,
        service,
        bookingMode,
        sanitizedPhone,
        onSuccess: ({ mode }) => {
          setIsModalOpen(false);
          if (mode === BOOKING_MODES.PAY_NOW) {
            navigate('/payment-success?type=consultation');
            return;
          }
          setSuccessMessage(
            'Your request has been received. Our team will call you within 24 hours to confirm your session and payment options.'
          );
          setIsSuccessOpen(true);
          setFormData(getEmptyConsultationForm());
        },
        onDismiss: () => setIsSubmitting(false),
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentModeLabel =
    paymentConfig?.mode === 'live'
      ? 'Live payments'
      : paymentConfig?.mode === 'test'
        ? 'Test payments'
        : 'Mock payments (add Razorpay keys to enable checkout)';

  return (
    <div className="consult-detail-page">
      <SEO
        title={`${service.title} Consultation`}
        description={service.desc}
        url={`/book-consultation/${service.id}`}
      />

      <div className="site-container consult-detail-inner">
        <Link to="/book-consultation" className="consult-back-link">
          <i className="fas fa-arrow-left" aria-hidden="true" />
          Back to Consultations
        </Link>

        <div className="consult-panel consult-panel--detail">
          <div className="consult-detail-grid">
            <div>
              <span className="consult-kicker">{service.category}</span>
              <h1 className="type-heading">{service.title}</h1>
              <div className="consult-meta-row">
                <span className="consult-price-lg">{service.priceLabel}</span>
                {service.duration && (
                  <span className="consult-card__duration">
                    <i className="far fa-clock" aria-hidden="true" />
                    {service.duration}
                  </span>
                )}
              </div>
              <p className="consult-desc">{service.desc}</p>

              {service.highlights?.length > 0 && (
                <ul className="consult-highlights">
                  {service.highlights.map((item) => (
                    <li key={item}>
                      <i className="fas fa-check-circle" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="consult-actions">
                <button type="button" onClick={() => openBooking(BOOKING_MODES.PAY_NOW)} className="consult-btn">
                  <i className="fas fa-credit-card" aria-hidden="true" />
                  Pay Now — {service.priceLabel}
                </button>
                <button
                  type="button"
                  onClick={() => openBooking(BOOKING_MODES.PAY_LATER)}
                  className="consult-btn consult-btn--outline"
                >
                  <i className="fas fa-phone-alt" aria-hidden="true" />
                  Request a Call — Pay Later
                </button>
              </div>

              {paymentConfig && (
                <p className="consult-note">
                  <i className="fas fa-info-circle" aria-hidden="true" /> {paymentModeLabel}.
                </p>
              )}
            </div>

            <div className="consult-image-wrap">
              <div className="consult-image-accent" aria-hidden="true" />
              <img src={service.img} alt={service.title} className="consult-hero-img" />
            </div>
          </div>
        </div>

        <section className="consult-section-gap">
          <div className="consult-panel consult-panel--compact">
            <h2 className="type-subheading text-center">What&apos;s Included</h2>
            <div className="consult-benefits-grid">
              {[
                { icon: 'fa-user-shield', title: '100% Private', desc: 'Your data and discussion remain strictly confidential.' },
                { icon: 'fa-file-alt', title: 'Detailed Analysis', desc: 'Comprehensive chart review and intuitive insights.' },
                { icon: 'fa-magic', title: 'Remedies', desc: 'Practical Vedic remedies to overcome life obstacles.' },
              ].map((item) => (
                <div key={item.title} className="consult-benefit-card">
                  <div className="consult-benefit-icon">
                    <i className={`fas ${item.icon}`} aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isFixedService
        bookingMode={bookingMode}
        priceLabel={service.priceLabel}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Request Received!"
        message={successMessage}
      />
    </div>
  );
}

export default ConsultationDetail;
