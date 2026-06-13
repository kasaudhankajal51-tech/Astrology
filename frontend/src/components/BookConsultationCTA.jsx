const REQUIRED_FIELDS = [
  'Name',
  'Date of Birth',
  'Time of Birth',
  'Place of Birth',
  'Consultation Type',
];

export default function BookConsultationCTA({ onBookClick }) {
  return (
    <section className="mt-10 m-0 p-0 md:mt-12" aria-labelledby="consult-cta-heading">
      <div className="m-0 rounded-2xl border border-site-accent-dark/14 border-l-4 border-l-site-accent bg-gradient-to-br from-white via-[#fffbf5] to-site-bg p-6 shadow-[0_12px_28px_rgba(139,74,30,0.1)] md:p-10">
        <div className="grid items-center gap-6 m-0 p-0 lg:grid-cols-[1fr_auto] lg:gap-8">
          <div className="m-0 p-0 text-center lg:text-left">
            <p className="mb-2 inline-block m-0 rounded-md bg-site-accent/10 px-[0.65rem] py-[0.2rem] font-body text-xs font-bold uppercase leading-snug tracking-[0.08em] text-site-accent-dark">
              Get Started
            </p>
            <h2
              id="consult-cta-heading"
              className="m-0 p-0 font-heading text-[clamp(1.4rem,2.5vw,1.75rem)] font-bold leading-tight text-site-primary"
            >
              Ready to book your consultation?
            </h2>
            <p className="mt-3 m-0 p-0 font-body text-[0.9375rem] font-normal leading-[1.65] text-site-muted">
              Share your birth details and preferred consultation type. Our team will contact you
              within 24 hours to confirm your session.
            </p>
            <div className="mt-4 m-0 flex flex-wrap justify-center gap-2 p-0 lg:justify-start">
              {REQUIRED_FIELDS.map((label) => (
                <span
                  key={label}
                  className="m-0 rounded-lg border border-site-accent-dark/12 bg-white/85 px-[0.65rem] py-[0.35rem] font-body text-[0.8125rem] font-semibold leading-snug text-site-accent-dark"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center m-0 p-0 lg:justify-end">
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 m-0 rounded-[0.625rem] border-none bg-site-primary px-6 py-3 font-body text-[0.9375rem] font-bold leading-tight text-white shadow-[0_8px_20px_rgba(42,15,2,0.15)] hover:bg-site-accent-dark hover:text-white sm:w-auto sm:min-w-56"
            >
              Book Your Session
              <i className="fas fa-paper-plane" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
