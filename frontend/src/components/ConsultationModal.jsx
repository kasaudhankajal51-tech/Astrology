import React, { useState } from 'react';
import { BOOKING_MODES } from '../utils/consultationBooking';

/* All sizing uses px not rem because style.min.css sets html{font-size:68.75%}
   making 1rem = 11px, which would shrink all Tailwind rem utilities. */

const baseInput =
  'w-full px-[14px] py-[11px] rounded-[10px] border text-stone-800 text-[14px] leading-[1.4] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all';

const fieldCls = (err) =>
  `${baseInput} ${err
    ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/10'
    : 'border-stone-200 bg-stone-50 focus:border-[#8B4A1E] focus:ring-[#8B4A1E]/10'}`;

const labelCls = 'block text-[10px] font-bold text-[#2A0F02] uppercase tracking-widest mb-[6px]';
const errMsg   = (msg) => msg ? <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{msg}</p> : null;

function validate(data, isFixedService) {
  const e = {};
  if (!data.name.trim())                                     e.name  = 'Full name is required';
  else if (data.name.trim().length < 2)                      e.name  = 'Enter a valid name';

  const ph = data.phone.replace(/[\s\-]/g, '');
  if (!ph)                                                   e.phone = 'Phone number is required';
  else if (!/^\d{10}$/.test(ph))                             e.phone = 'Enter a valid 10-digit number';

  if (!data.email.trim())                                    e.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))  e.email = 'Enter a valid email address';

  if (!data.dob)                                             e.dob   = 'Date of birth is required';
  if (!data.tob)                                             e.tob   = 'Time of birth is required';
  if (!data.pob?.trim())                                     e.pob   = 'Place of birth is required';

  if (!isFixedService && !data.consultationType?.trim())     e.consultationType = 'Please specify consultation type';

  return e;
}

function ConsultationModal({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  isFixedService,
  bookingMode = BOOKING_MODES.PAY_LATER,
  priceLabel = '',
}) {
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const submitLabel = (() => {
    if (isSubmitting) return 'Processing…';
    if (bookingMode === BOOKING_MODES.PAY_NOW)
      return priceLabel ? `Pay Now — ${priceLabel}` : 'Pay Now';
    if (bookingMode === BOOKING_MODES.PAY_LATER && priceLabel)
      return `Request a Call — Pay Later (${priceLabel})`;
    return 'Request a Call';
  })();

  /* Clear a field's error as soon as the user starts editing it */
  const onChange = (e) => {
    const { name } = e.target;
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    handleChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(formData, isFixedService);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    handleSubmit(e);
  };

  return (
    <div
      className="fixed inset-0 z-[100001] flex items-center justify-center bg-[#2A0F02]/50 backdrop-blur-md"
      style={{ padding: '16px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full bg-white overflow-hidden flex flex-col"
        style={{ maxWidth: '900px', maxHeight: '95vh', borderRadius: '28px', boxShadow: '0 40px 100px rgba(0,0,0,0.3)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[14px] right-[14px] z-20 flex items-center justify-center rounded-full bg-[#8B4A1E] border-2 border-white/30 text-white hover:bg-[#C8832A] transition-colors duration-200"
          style={{ width: '34px', height: '34px', fontSize: '13px', flexShrink: 0 }}
        >
          <i className="fa fa-times" aria-hidden="true" />
        </button>

        {/* Scroll area */}
        <div className="overflow-y-auto flex-1">
          <div className="grid lg:grid-cols-[38%_62%]">

            {/* ── Left panel ── */}
            <div
              className="relative flex flex-col text-white overflow-hidden"
              style={{ background: '#8B4A1E' }}
            >
              <img
                src="/images/premium_tarot.png"
                alt="Consultation"
                className="w-full object-cover flex-shrink-0"
                style={{ height: '160px', objectPosition: 'center 30%' }}
              />

              <div className="absolute rounded-full bg-white/5 pointer-events-none"
                style={{ width: '180px', height: '180px', top: '-48px', left: '-48px' }} />
              <div className="absolute rounded-full bg-black/10 pointer-events-none"
                style={{ width: '240px', height: '240px', bottom: '-60px', right: '-60px' }} />

              <div className="relative z-10" style={{ padding: '24px 28px 32px' }}>
                <span
                  className="inline-flex items-center bg-white/10 text-white/90 font-bold uppercase"
                  style={{ fontSize: '10px', letterSpacing: '0.1em', padding: '6px 12px', borderRadius: '999px', marginBottom: '20px' }}
                >
                  Expert Consultation
                </span>

                <h4
                  className="font-black leading-tight font-heading text-white"
                  style={{ fontSize: '28px', marginBottom: '14px' }}
                >
                  Book Your<br />
                  <span style={{ color: '#C8832A' }}>Consultation</span>
                </h4>

                <p
                  className="font-medium font-body"
                  style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)', marginBottom: '22px' }}
                >
                  Get personalized insights and life guidance from India&apos;s leading astrology mentor.
                </p>

                <ul className="list-none p-0" style={{ marginBottom: '22px' }}>
                  {[
                    'Detailed Birth Chart Analysis',
                    'Career & Relationship Guidance',
                    'Remedies & Future Predictions',
                  ].map((item) => (
                    <li key={item} className="flex items-center font-semibold font-body" style={{ gap: '10px', marginBottom: '10px', fontSize: '13px' }}>
                      <span
                        className="flex items-center justify-center flex-shrink-0 rounded-full"
                        style={{ width: '20px', height: '20px', background: 'rgba(200,131,42,0.25)' }}
                      >
                        <i className="fa fa-check text-[#C8832A]" style={{ fontSize: '9px' }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {bookingMode === BOOKING_MODES.PAY_LATER && (
                  <div
                    className="font-body"
                    style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', fontSize: '12px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}
                  >
                    <i className="fas fa-phone-alt text-[#C8832A]" style={{ marginRight: '8px' }} />
                    Our team will call you within 24 hours to confirm your session. Pay online anytime before the appointment.
                  </div>
                )}
              </div>
            </div>

            {/* ── Right panel ── */}
            <div className="bg-white flex flex-col" style={{ padding: '28px 32px' }}>
              <div style={{ marginBottom: '18px' }}>
                <h3 className="font-black text-[#2A0F02] font-heading" style={{ fontSize: '20px', marginBottom: '4px' }}>
                  Consultation Details
                </h3>
                <p className="font-bold uppercase font-body" style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#C8832A' }}>
                  Please provide your birth details for accurate analysis
                </p>
              </div>

              <form onSubmit={onSubmit} noValidate className="flex flex-col" style={{ gap: '14px' }}>

                {/* Name + Phone */}
                <div className="grid grid-cols-2" style={{ gap: '12px' }}>
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange}
                      placeholder="Your Full Name" className={fieldCls(errors.name)} />
                    {errMsg(errors.name)}
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={onChange}
                      placeholder="10-digit number" maxLength={10} className={fieldCls(errors.phone)} />
                    {errMsg(errors.phone)}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={onChange}
                    placeholder="Your Email Address" className={fieldCls(errors.email)} />
                  {errMsg(errors.email)}
                </div>

                {/* Birth details */}
                <div className="grid grid-cols-3" style={{ gap: '10px' }}>
                  <div>
                    <label className={labelCls}>Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob || ''} onChange={onChange}
                      className={fieldCls(errors.dob)} />
                    {errMsg(errors.dob)}
                  </div>
                  <div>
                    <label className={labelCls}>Time of Birth</label>
                    <input type="time" name="tob" value={formData.tob || ''} onChange={onChange}
                      className={fieldCls(errors.tob)} />
                    {errMsg(errors.tob)}
                  </div>
                  <div>
                    <label className={labelCls}>Place of Birth</label>
                    <input type="text" name="pob" value={formData.pob || ''} onChange={onChange}
                      placeholder="City, State" className={fieldCls(errors.pob)} />
                    {errMsg(errors.pob)}
                  </div>
                </div>

                {/* Consultation type */}
                <div>
                  <label className={labelCls}>Consultation Type</label>
                  {isFixedService ? (
                    <input type="text" name="consultationType" value={formData.consultationType} readOnly
                      className={`${baseInput} border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed`} />
                  ) : (
                    <>
                      <input type="text" name="consultationType" value={formData.consultationType}
                        onChange={onChange} placeholder="e.g. Career, Marriage, Tarot…"
                        className={fieldCls(errors.consultationType)} />
                      {errMsg(errors.consultationType)}
                    </>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className={labelCls}>
                    Your Message{' '}
                    <span className="normal-case font-normal text-stone-400" style={{ letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <textarea name="message" value={formData.message} onChange={onChange}
                    placeholder="Describe your concern briefly…" rows={2}
                    className={`${baseInput} border-stone-200 bg-stone-50 focus:border-[#8B4A1E] focus:ring-[#8B4A1E]/10 resize-none`} />
                </div>

                {/* Consent */}
                <div className="flex items-start" style={{ gap: '10px' }}>
                  <input type="checkbox" id="consent-consultation" name="consent" required
                    className="flex-shrink-0 accent-[#8B4A1E] cursor-pointer"
                    style={{ width: '15px', height: '15px', marginTop: '2px' }} />
                  <label htmlFor="consent-consultation" className="font-body cursor-pointer"
                    style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5', fontWeight: 400 }}>
                    I agree to the{' '}
                    <a href="/privacy-policy" className="text-[#8B4A1E] underline hover:text-[#C8832A] transition-colors">
                      Privacy Policy
                    </a>
                    {' '}and consent to DS Institute LLP contacting me via phone, email, and WhatsApp.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center font-bold font-body disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0"
                  style={{
                    gap: '8px',
                    padding: '14px 24px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    background: 'linear-gradient(135deg, #2A0F02 0%, #8B4A1E 100%)',
                    color: '#fff',
                    border: 'none',
                    boxShadow: '0 6px 20px rgba(139,74,30,0.3)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.background = 'linear-gradient(135deg, #8B4A1E 0%, #C8832A 100%)')}
                  onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.background = 'linear-gradient(135deg, #2A0F02 0%, #8B4A1E 100%)')}
                >
                  {submitLabel}
                </button>

                <p className="text-center font-medium font-body" style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                  <i className="fas fa-lock text-[#8B4A1E]" style={{ marginRight: '6px' }} />
                  Private &amp; Encrypted Consultation
                </p>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultationModal;
