import { Link } from 'react-router-dom';

const BADGE_CLASS = {
  purple: 'border-purple-200 bg-purple-100 text-purple-800',
  pink: 'border-pink-200 bg-pink-100 text-pink-800',
  orange: 'border-orange-200 bg-orange-100 text-orange-800',
  red: 'border-red-200 bg-red-100 text-red-800',
  green: 'border-green-200 bg-green-100 text-green-800',
};

export default function ConsultationServiceCard({ card, detailPath = '/book-consultation' }) {
  const badgeClass = BADGE_CLASS[card.badgeColor] || BADGE_CLASS.purple;
  const detailUrl = `${detailPath}/${card.id}`;

  return (
    <article className="flex h-full m-0 flex-col overflow-hidden rounded-2xl border border-site-accent-dark/12 bg-site-surface p-0 shadow-[0_8px_22px_rgba(42,15,2,0.06)]">
      <Link
        to={detailUrl}
        className="relative m-0 block aspect-[16/10] overflow-hidden p-0 no-underline"
      >
        <img
          src={card.img}
          alt={card.title}
          className="m-0 h-full w-full border-none object-cover p-0"
        />
        <div
          className="pointer-events-none absolute inset-0 m-0 bg-gradient-to-t from-site-primary/70 via-site-primary/10 to-transparent p-0"
          aria-hidden="true"
        />
        <span
          className={`absolute left-3 top-3 m-0 rounded-lg border px-2.5 py-1 text-sm font-bold uppercase tracking-wide ${badgeClass}`}
        >
          {card.badge}
        </span>
        <span className="absolute bottom-3 right-3 m-0 rounded-lg bg-white/95 px-3 py-1.5 text-[0.9375rem] font-extrabold text-site-accent-dark shadow-[0_2px_8px_rgba(42,15,2,0.08)]">
          {card.priceLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col m-0 px-[1.1rem] pb-[1.15rem] pt-4">
        <Link
          to={detailUrl}
          className="mb-2 m-0 p-0 font-heading text-[1.0625rem] font-bold leading-snug text-site-primary no-underline"
        >
          {card.short || card.title}
        </Link>
        <p className="mb-3 m-0 flex-1 p-0 text-sm leading-[1.55] text-site-muted">{card.desc}</p>
        {card.duration ? (
          <p className="mb-4 m-0 inline-flex w-fit items-center gap-2 rounded-lg bg-site-accent/10 px-[0.65rem] py-[0.35rem] text-[0.8125rem] font-semibold text-site-accent-dark">
            <i className="far fa-clock" aria-hidden="true" /> {card.duration}
          </p>
        ) : null}
        <Link
          to={detailUrl}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 m-0 rounded-lg border-none bg-site-primary px-4 py-[0.65rem] text-[0.9375rem] font-bold text-white no-underline hover:bg-site-accent-dark hover:text-white"
        >
          View Details
          <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
