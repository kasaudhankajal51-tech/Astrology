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
        navigate,
        onSuccess: ({ mode }) => {
          setIsModalOpen(false);
          if (mode === BOOKING_MODES.PAY_NOW) {
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

  const wrapClass =
    'mx-auto w-full max-w-[var(--container-public)] px-[var(--page-pad-x)]';

  return (
    <>
      <SEO
        title="Consultation Services"
        description="Understand your life path, remove confusion, and make decisions with confidence."
        url="/book-consultation"
      />

      <div className="w-full min-h-screen m-0 overflow-x-clip bg-site-bg p-0 font-body text-site-text">
        {/* Hero */}
        <div className="m-0 border-b border-site-accent-dark/8 bg-gradient-to-b from-white/65 to-site-bg/85 py-[clamp(2rem,5vw,3rem)]">
          <div className={wrapClass}>
            <div className="mx-auto max-w-3xl p-0 text-center">
              <span className="mb-3 inline-block m-0 rounded-full border border-site-accent-dark/15 bg-site-surface px-3 py-1 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-site-accent-dark">
                Divine Guidance &amp; Transformation
              </span>
              <h1 className="m-0 p-0 font-heading text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-tight text-site-primary">
                Consultation{' '}
                <span className="bg-gradient-to-br from-site-accent-dark to-site-accent bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-[42rem] p-0 text-base leading-relaxed text-site-muted">
                Understand your life path, remove confusion, and make decisions with confidence. Every
                session is conducted with complete dedication and confidentiality.
              </p>

              <div className="mx-auto mt-8 w-full max-w-xl p-0">
                <label htmlFor="consult-search" className="sr-only">
                  Search consultation services
                </label>
                <div className="flex items-center gap-3 m-0 rounded-xl border border-site-accent-dark/12 bg-site-surface px-4 py-3 shadow-[0_4px_14px_rgba(42,15,2,0.06)]">
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
                    className="min-w-0 flex-1 m-0 border-0 bg-transparent p-0 text-base text-site-text outline-none"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center m-0 rounded-full border-none bg-site-accent/12 p-0 text-xs text-site-accent-dark hover:bg-site-accent/22"
                      aria-label="Clear search"
                    >
                      <i className="fas fa-times" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 m-0 p-0">
                  <span className="m-0 p-0 text-[0.8125rem] text-site-muted">Try searching:</span>
                  {SEARCH_HINTS.map((hint) => (
                    <button
                      key={hint}
                      type="button"
                      className="cursor-pointer m-0 rounded-lg border border-site-accent-dark/12 bg-site-surface px-3 py-[0.35rem] text-sm font-semibold text-site-accent-dark"
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
        <div className="m-0 py-[clamp(2rem,5vw,3rem)]">
          <div className={wrapClass}>
            {catalogLoading ? (
              <div className="mx-auto max-w-3xl py-16 text-center">
                <div
                  className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-site-accent-dark/20 border-t-site-accent-dark"
                  aria-hidden="true"
                />
                <p className="m-0 p-0 text-base leading-relaxed text-site-muted">
                  Loading consultation services…
                </p>
              </div>
            ) : filteredCategories.length > 0 ? (
              <>
                {searchQuery ? (
                  <p className="mb-6 m-0 p-0 text-base leading-relaxed text-site-muted">
                    Showing <strong>{totalResults}</strong> result{totalResults !== 1 ? 's' : ''} for
                    &ldquo;{searchQuery}&rdquo;
                  </p>
                ) : null}

                <div className="space-y-10 sm:space-y-12 lg:space-y-14">
                  {filteredCategories.map((cat, idx) => (
                    <section key={cat.name ?? idx} aria-labelledby={`category-${idx}`}>
                      <div className="mb-5 m-0 p-0">
                        <h2
                          id={`category-${idx}`}
                          className="m-0 p-0 font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold leading-tight text-site-primary"
                        >
                          {cat.name}
                        </h2>
                        {cat.description ? (
                          <p className="mt-1.5 m-0 p-0 text-base leading-relaxed text-site-muted">
                            {cat.description}
                          </p>
                        ) : null}
                      </div>

                      <ul className="grid list-none grid-cols-1 gap-4 m-0 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                        {cat.cards.map((card, cIdx) => (
                          <li key={card.id ?? cIdx} className="m-0 min-w-0 p-0">
                            <ConsultationServiceCard card={card} detailPath="/book-consultation" />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </>
            ) : (
              <div className="mx-auto max-w-md rounded-2xl border border-site-accent-dark/10 bg-site-surface px-6 py-12 text-center">
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-site-accent/10 text-xl text-site-accent-dark"
                  aria-hidden="true"
                >
                  <i className="fas fa-search-minus" />
                </div>
                <h2 className="m-0 p-0 font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold leading-tight text-site-primary">
                  No services found
                </h2>
                <p className="mt-2 m-0 p-0 text-base leading-relaxed text-site-muted">
                  No results for &ldquo;{searchQuery}&rdquo;. Try different keywords or browse all
                  categories.
                </p>
                <button
                  type="button"
                  className="mx-auto mt-6 inline-flex w-auto max-w-56 cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-site-primary px-4 py-[0.65rem] text-[0.9375rem] font-bold text-white hover:bg-site-accent-dark hover:text-white"
                  onClick={() => setSearchQuery('')}
                >
                  Show All Services
                </button>
              </div>
            )}

            {!searchQuery && !catalogLoading && filteredCategories.length > 0 && (
              <>
                <section
                  className="mt-10 rounded-2xl border border-site-accent-dark/10 bg-site-surface p-5 shadow-[0_4px_16px_rgba(42,15,2,0.05)] md:mt-12 md:px-8 md:py-6"
                  aria-labelledby="consult-guidelines"
                >
                  <div className="mb-5 flex items-center gap-[0.65rem] m-0 p-0">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-site-accent/12 text-[0.9rem] text-site-accent-dark"
                      aria-hidden="true"
                    >
                      <i className="fas fa-star-of-david" />
                    </span>
                    <h2
                      id="consult-guidelines"
                      className="m-0 p-0 font-heading text-[clamp(1.35rem,2.2vw,1.625rem)] font-bold leading-tight text-site-primary"
                    >
                      Important Guidelines
                    </h2>
                  </div>
                  <ul className="mt-5 grid list-none grid-cols-1 gap-4 m-0 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {GUIDELINES.map((item) => (
                      <li
                        key={item.title}
                        className="flex gap-3 rounded-xl border border-site-accent-dark/8 bg-site-bg/60 p-[0.85rem] m-0"
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-site-accent/10 text-[0.85rem] text-site-accent-dark"
                          aria-hidden="true"
                        >
                          <i className={`fas ${item.icon}`} />
                        </span>
                        <div>
                          <p className="m-0 p-0 font-body text-[0.9375rem] font-bold leading-snug text-site-primary">
                            {item.title}
                          </p>
                          <p className="mt-[0.2rem] m-0 p-0 font-body text-[0.8125rem] leading-normal text-site-soft">
                            {item.text}
                          </p>
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
