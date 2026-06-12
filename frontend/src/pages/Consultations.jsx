import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConsultationModal from '../components/ConsultationModal';
import BookConsultationCTA from '../components/BookConsultationCTA';
import ConsultationServiceCard from '../components/ConsultationServiceCard';
import SuccessModal from '../components/SuccessModal';
import SEO from '../components/SEO';
import { useConsultationCatalog } from '../utils/consultationApi';
import { getContactValidationError, normalizeIndianMobile } from '../utils/validation';
import {
  BOOKING_MODES,
  submitConsultationBooking,
  getEmptyConsultationForm,
} from '../utils/consultationBooking';

const SEARCH_HINTS = ['Tarot', 'Marriage', 'Career', 'Remedies'];

const GUIDELINES = [
  { icon: 'fa-lock', title: 'Confidentiality', text: 'All sessions are private & confidential' },
  { icon: 'fa-calendar-check', title: 'Prior Booking', text: 'Mandatory for all consultation types' },
  { icon: 'fa-ban', title: 'Refund Policy', text: 'No refund after booking completion' },
  { icon: 'fa-balance-scale', title: 'Divine Balance', text: 'Results depend on karma & planetary timing' },
  { icon: 'fa-vial', title: 'Remedies', text: 'Suggested only after proper analysis' },
];

function Consultations() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(getEmptyConsultationForm());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState(BOOKING_MODES.PAY_LATER);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

    const sanitizedPhone = normalizeIndianMobile(formData.phone);
    setIsSubmitting(true);

    try {
      const service = formData.serviceId
        ? {
            id: formData.serviceId,
            title: formData.consultationType,
            price: parseInt(String(formData.price).replace(/[₹,]/g, ''), 10) || undefined,
            priceLabel: formData.priceLabel,
          }
        : null;

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

  const openGeneralEnquiry = () => {
    setBookingMode(BOOKING_MODES.PAY_LATER);
    setFormData(getEmptyConsultationForm());
    setIsModalOpen(true);
  };

  const { categories: consultationCategories, loading: catalogLoading, error: catalogError } =
    useConsultationCatalog();

  useEffect(() => {
    if (catalogError) toast.error(catalogError);
  }, [catalogError]);

  const filteredCategories = consultationCategories
    .map((cat) => ({
      ...cat,
      cards: cat.cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.cards.length > 0);

  const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.cards.length, 0);

  return (
    <>
      <SEO
        title="Consultation Services"
        description="Understand your life path, remove confusion, and make decisions with confidence."
        url="/book-consultation"
      />

      <div className="consultations-page">
        {/* Hero */}
        <div className="cp-hero">
          <div className="cp-wrap">
            <div className="cp-center">
              <span className="cp-kicker">Divine Guidance &amp; Transformation</span>
              <h1 className="cp-title">
                Consultation{' '}
                <span className="text-gradient">Services</span>
              </h1>
              <p className="cp-lead">
                Understand your life path, remove confusion, and make decisions with confidence. Every
                session is conducted with complete dedication and confidentiality.
              </p>

              <div className="cp-search-block">
                <label htmlFor="consult-search" className="sr-only">
                  Search consultation services
                </label>
                <div className="cp-search-box">
                  <i className="fas fa-search text-site-accent-dark" aria-hidden="true" />
                  <input
                    id="consult-search"
                    type="text"
                    role="searchbox"
                    inputMode="search"
                    enterKeyHint="search"
                    autoComplete="off"
                    placeholder="Search services (Career, Tarot, Marriage…)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="cp-search-clear"
                      aria-label="Clear search"
                    >
                      <i className="fas fa-times" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>

                <div className="cp-hint-row">
                  <span className="cp-category-desc" style={{ margin: 0, fontSize: '0.8125rem' }}>
                    Try searching:
                  </span>
                  {SEARCH_HINTS.map((hint) => (
                    <button
                      key={hint}
                      type="button"
                      className="cp-hint-btn"
                      onClick={() => setSearchQuery(hint === 'Remedies' ? 'Spell' : hint)}
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="cp-main">
          <div className="cp-wrap">
            {catalogLoading ? (
              <div className="cp-center" style={{ padding: '4rem 0' }}>
                <div
                  className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-site-accent-dark/20 border-t-site-accent-dark"
                  aria-hidden="true"
                />
                <p className="cp-category-desc">Loading consultation services…</p>
              </div>
            ) : filteredCategories.length > 0 ? (
              <>
                {searchQuery ? (
                  <p className="cp-category-desc" style={{ marginBottom: '1.5rem' }}>
                    Showing <strong>{totalResults}</strong> result{totalResults !== 1 ? 's' : ''} for
                    &ldquo;{searchQuery}&rdquo;
                  </p>
                ) : null}

                <div className="cp-category-stack">
                  {filteredCategories.map((cat, idx) => (
                    <section key={cat.name ?? idx} className="cp-category-block" aria-labelledby={`category-${idx}`}>
                      <div className="cp-category-head">
                        <h2 id={`category-${idx}`} className="cp-category-title">
                          {cat.name}
                        </h2>
                        {cat.description ? (
                          <p className="cp-category-desc">{cat.description}</p>
                        ) : null}
                      </div>

                      <ul className="cp-grid">
                        {cat.cards.map((card, cIdx) => (
                          <li key={card.id ?? cIdx}>
                            <ConsultationServiceCard card={card} detailPath="/book-consultation" />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </>
            ) : (
              <div className="cp-empty">
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(200, 131, 42, 0.1)', color: '#8b4a1e', fontSize: '1.25rem' }}
                  aria-hidden="true"
                >
                  <i className="fas fa-search-minus" />
                </div>
                <h2 className="cp-category-title">No services found</h2>
                <p className="cp-category-desc" style={{ marginTop: '0.5rem' }}>
                  No results for &ldquo;{searchQuery}&rdquo;. Try different keywords or browse all
                  categories.
                </p>
                <button
                  type="button"
                  className="cp-service-card__btn consult-btn--auto"
                  style={{ marginTop: '1.5rem', maxWidth: '14rem', marginInline: 'auto' }}
                  onClick={() => setSearchQuery('')}
                >
                  Show All Services
                </button>
              </div>
            )}

            {!searchQuery && !catalogLoading && filteredCategories.length > 0 && (
              <>
                <section className="cp-guidelines" aria-labelledby="consult-guidelines">
                  <div className="cp-section-head">
                    <span className="cp-section-head__icon" aria-hidden="true">
                      <i className="fas fa-star-of-david" />
                    </span>
                    <h2 id="consult-guidelines" className="cp-section-title">
                      Important Guidelines
                    </h2>
                  </div>
                  <ul className="cp-guidelines-grid">
                    {GUIDELINES.map((item) => (
                      <li key={item.title} className="cp-guideline-item">
                        <span className="cp-guideline-icon" aria-hidden="true">
                          <i className={`fas ${item.icon}`} />
                        </span>
                        <div>
                          <p className="cp-guideline-title">{item.title}</p>
                          <p className="cp-guideline-text">{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <BookConsultationCTA onBookClick={openGeneralEnquiry} />
              </>
            )}
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isFixedService={!!formData.consultationType && !!formData.serviceId}
        bookingMode={bookingMode}
        priceLabel={formData.priceLabel}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Consultation Request Received!"
        message="Your details have been securely sent to our experts. We will contact you on your provided phone number within 24 hours to schedule the session."
      />
    </>
  );
}

export default Consultations;
