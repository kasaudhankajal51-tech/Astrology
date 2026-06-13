import { X, Tag, Percent, CheckCircle2, Loader2, CreditCard, Phone, User, Mail, MapPin, Calendar, Heart, MessageSquare, BookOpen } from 'lucide-react';
import { BTN } from './consultation/tokens';

const INPUT =
  'm-0 w-full rounded-xl border border-site-accent-dark/20 bg-site-bg/50 px-4 py-3 font-body text-sm text-site-primary placeholder:text-site-soft/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] outline-none transition-all duration-300 focus:border-site-accent focus:bg-white focus:ring-4 focus:ring-site-accent/15 hover:border-site-accent/50 disabled:cursor-not-allowed disabled:bg-site-surface disabled:opacity-70';

const LABEL =
  '!mb-2 block font-body text-[0.6875rem] !font-bold uppercase tracking-[0.1em] text-site-accent-dark/80';

function IconInput({ icon: Icon, className = '', ...props }) {
  return (
    <div className="group relative flex items-center">
      {Icon && (
        <Icon
          size={18}
          className={`absolute left-4 pointer-events-none transition-all duration-300 ${
            props.disabled ? 'text-site-muted' : 'text-site-soft/80 group-focus-within:text-site-accent group-focus-within:scale-110'
          }`}
          aria-hidden
        />
      )}
      <input
        {...props}
        className={`peer ${Icon ? INPUT.replace('px-4', 'pl-[3.25rem] pr-4') : INPUT} ${className}`}
      />
    </div>
  );
}

function ModalShell({ open, onClose, title, subtitle, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100002] flex items-end justify-center bg-site-primary/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        className="relative flex max-h-[94dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-[2rem] border border-white/20 bg-white/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:max-h-[90dvh] sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 m-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-site-accent-dark/12 bg-site-surface text-site-primary transition hover:bg-site-bg"
        >
          <X size={15} strokeWidth={2.5} aria-hidden />
        </button>
        <div className="overflow-y-auto overscroll-contain p-5 pt-12 sm:p-8 sm:pt-14">
          <header className="mb-4">
            <h3 className="!m-0 font-heading text-lg font-bold text-site-primary">{title}</h3>
            {subtitle ? (
              <p className="!mt-1 font-body text-xs leading-relaxed text-site-muted">{subtitle}</p>
            ) : null}
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}

export function CouponControls({
  couponCode,
  setCouponCode,
  appliedCoupon,
  couponStatus,
  couponLoading,
  hasAvailableCoupons,
  availableCoupons,
  onApply,
  onRemove,
  getPayableAmount,
  compact = false,
}) {
  return (
    <div className={`rounded-xl border border-site-accent-dark/20 bg-site-bg/40 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] ${compact ? 'p-4' : 'p-5'}`}>
      <div className="mb-2 flex items-center gap-1.5 font-body text-xs font-bold text-site-primary">
        <Tag size={14} className="text-site-accent-dark" aria-hidden />
        Apply coupon
      </div>

      {!appliedCoupon && hasAvailableCoupons && (
        <p className="!mb-2 font-body text-[0.6875rem] text-site-muted">
          {availableCoupons.length} active coupon{availableCoupons.length !== 1 ? 's' : ''} available
        </p>
      )}

      <div className="mb-2 grid grid-cols-[1fr_auto] gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          placeholder={appliedCoupon ? 'Coupon applied' : 'Enter code'}
          disabled={Boolean(appliedCoupon)}
          className={INPUT}
        />
        <button
          type="button"
          onClick={() => (appliedCoupon ? onRemove() : onApply())}
          disabled={couponLoading}
          className="m-0 shrink-0 cursor-pointer rounded-lg border-0 bg-site-accent-dark px-3 py-2 font-body text-xs font-bold text-white transition hover:bg-site-primary disabled:opacity-60"
        >
          {couponLoading ? '…' : appliedCoupon ? 'Remove' : 'Apply'}
        </button>
      </div>

      {couponStatus && (
        <div
          className={`mb-2 flex items-start gap-1.5 rounded-lg px-2.5 py-2 font-body text-xs ${
            couponStatus.type === 'success'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          <CheckCircle2 size={14} className="mt-0.5 shrink-0" aria-hidden />
          <span>{couponStatus.message}</span>
        </div>
      )}

      {appliedCoupon && (
        <div className="flex items-center gap-1.5 rounded-lg border border-site-accent/25 bg-site-accent/10 px-2.5 py-2 font-body text-xs font-semibold text-site-accent-dark">
          <Percent size={14} aria-hidden />
          {appliedCoupon.code} applied — pay ₹{getPayableAmount()}
        </div>
      )}

      {!appliedCoupon && hasAvailableCoupons && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {availableCoupons.slice(0, 3).map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => onApply(c.code)}
              disabled={couponLoading}
              className="m-0 cursor-pointer rounded-full border border-site-accent-dark/15 bg-white px-2.5 py-1 font-body text-[0.625rem] font-bold text-site-accent-dark transition hover:border-site-accent"
            >
              {c.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CheckoutModal({
  open,
  onClose,
  course,
  formData,
  onInputChange,
  onSubmit,
  isProcessingPayment,
  appliedCoupon,
  getCoursePrice,
  getDiscountAmount,
  getPayableAmount,
  couponProps,
}) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Secure checkout"
      subtitle="Review your details and proceed to payment."
    >
      <CouponControls {...couponProps} />

      <div className="my-5 space-y-3 rounded-xl border border-site-accent-dark/20 bg-gradient-to-br from-site-bg/80 to-site-surface/50 p-5 font-body text-sm shadow-sm backdrop-blur-md">
        <div className="flex justify-between text-site-muted">
          <span>Course price</span>
          <span className="font-medium text-site-primary">₹{getCoursePrice()}</span>
        </div>
        {appliedCoupon && (
          <div className="flex justify-between text-emerald-700">
            <span>Coupon ({appliedCoupon.code})</span>
            <span className="font-medium">- ₹{getDiscountAmount()}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-site-accent-dark/20 pt-3 text-base font-bold text-site-primary">
          <span>Amount to pay</span>
          <span className="text-site-accent-dark">₹{getPayableAmount()}</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5">
        <div>
          <label className={LABEL}>Course</label>
          <IconInput icon={BookOpen} type="text" value={course.title} readOnly disabled />
        </div>
        <div>
          <label htmlFor="checkout-name" className={LABEL}>
            Full name
          </label>
          <IconInput
            icon={User}
            id="checkout-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            placeholder="Your full name"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label htmlFor="checkout-phone" className={LABEL}>
              Phone
            </label>
            <IconInput
              icon={Phone}
              id="checkout-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              placeholder="10-digit mobile"
              inputMode="numeric"
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              required
            />
          </div>
          <div>
            <label htmlFor="checkout-email" className={LABEL}>
              Email
            </label>
            <IconInput
              icon={Mail}
              id="checkout-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="Email address"
              required
            />
          </div>
        </div>
        <button type="submit" disabled={isProcessingPayment} className="group relative mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-site-primary to-site-accent-dark px-6 py-4 font-body text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(var(--site-primary-rgb),0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(var(--site-primary-rgb),0.6)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_20px_-6px_rgba(var(--site-primary-rgb),0.5)]">
          {isProcessingPayment ? (
            <Loader2 size={18} className="animate-spin" aria-hidden />
          ) : (
            <CreditCard size={18} className="transition-transform group-hover:scale-110" aria-hidden />
          )}
          {isProcessingPayment ? 'Initializing…' : `Pay ₹${getPayableAmount()}`}
        </button>
      </form>
    </ModalShell>
  );
}

export function EnquiryModal({ open, onClose, course, enquiryData, onChange, onSubmit }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Course enquiry"
      subtitle="Our team will contact you with batch timing, syllabus, and fees."
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5">
        <div>
          <label className={LABEL}>Course</label>
          <IconInput icon={BookOpen} type="text" value={course.title} readOnly disabled />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label htmlFor="enq-name" className={LABEL}>
              Full name
            </label>
            <IconInput icon={User} id="enq-name" type="text" name="name" value={enquiryData.name} onChange={onChange} placeholder="Your full name" required />
          </div>
          <div>
            <label htmlFor="enq-phone" className={LABEL}>
              Phone
            </label>
            <IconInput
              icon={Phone}
              id="enq-phone"
              type="tel"
              name="phone"
              value={enquiryData.phone}
              onChange={onChange}
              placeholder="10-digit mobile"
              inputMode="numeric"
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label htmlFor="enq-email" className={LABEL}>
              Email
            </label>
            <IconInput icon={Mail} id="enq-email" type="email" name="email" value={enquiryData.email} onChange={onChange} placeholder="Email address" required />
          </div>
          <div>
            <label htmlFor="enq-city" className={LABEL}>
              City
            </label>
            <IconInput icon={MapPin} id="enq-city" type="text" name="city" value={enquiryData.city} onChange={onChange} placeholder="Your city" required />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label htmlFor="enq-age" className={LABEL}>
              Age
            </label>
            <IconInput icon={Calendar} id="enq-age" type="number" name="age" value={enquiryData.age} onChange={onChange} placeholder="Your age" required />
          </div>
          <div>
            <label htmlFor="enq-interest" className={LABEL}>
              Interest
            </label>
            <IconInput
              icon={Heart}
              id="enq-interest"
              type="text"
              name="interest"
              value={enquiryData.interest}
              onChange={onChange}
              placeholder="e.g. career, marriage"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="enq-message" className={LABEL}>
            Notes <span className="normal-case font-normal tracking-normal text-site-soft">(optional)</span>
          </label>
          <div className="relative flex">
            <textarea
              id="enq-message"
              name="message"
              value={enquiryData.message}
              onChange={onChange}
              rows={3}
              placeholder="Any specific questions?"
              className={`peer resize-none ${INPUT.replace('px-4', 'pl-[3.25rem] pr-4')}`}
            />
            <MessageSquare
              size={18}
              className="absolute left-4 top-4 pointer-events-none transition-all duration-300 text-site-soft/80 peer-focus:scale-110 peer-focus:text-site-accent"
              aria-hidden
            />
          </div>
        </div>
        <button type="submit" className="group relative mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-site-primary to-site-accent-dark px-6 py-4 font-body text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(var(--site-primary-rgb),0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(var(--site-primary-rgb),0.6)]">
          <Phone size={18} className="transition-transform group-hover:rotate-12" aria-hidden />
          Submit enquiry
        </button>
      </form>
    </ModalShell>
  );
}
