import { Link } from 'react-router-dom';

const BADGE_CLASS = {
  purple: 'consult-badge--purple',
  pink: 'consult-badge--pink',
  orange: 'consult-badge--orange',
  red: 'consult-badge--red',
  green: 'consult-badge--green',
};

export default function ConsultationServiceCard({ card, detailPath = '/book-consultation' }) {
  const badgeClass = BADGE_CLASS[card.badgeColor] || BADGE_CLASS.purple;
  const detailUrl = `${detailPath}/${card.id}`;

  return (
    <article className="cp-service-card">
      <Link to={detailUrl} className="cp-service-card__media consult-card__media">
        <img src={card.img} alt={card.title} />
        <div className="consult-card__overlay" aria-hidden="true" />
        <span className={`consult-card__badge ${badgeClass}`}>{card.badge}</span>
        <span className="consult-card__price">{card.priceLabel}</span>
      </Link>

      <div className="cp-service-card__body">
        <Link to={detailUrl} className="cp-service-card__title">
          {card.short || card.title}
        </Link>
        <p className="cp-service-card__desc">{card.desc}</p>
        {card.duration ? (
          <p className="cp-service-card__duration">
            <i className="far fa-clock" aria-hidden="true" /> {card.duration}
          </p>
        ) : null}
        <Link to={detailUrl} className="cp-service-card__btn">
          View Details
          <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
