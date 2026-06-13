import { Link, useNavigate } from 'react-router-dom';

const FEATURES = [
  { icon: '👥', title: 'Learn from Experts', sub: '20+ Years of Experience' },
  { icon: '▶', title: 'Self-Paced Learning', sub: 'Study Anytime, Anywhere' },
  { icon: '🏅', title: 'Certificate of Completion', sub: 'Boost Your Credibility' },
  { icon: '🎧', title: 'Lifetime Support', sub: "We're Here for You" },
];

const Card1SVG = () => (
  <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <defs>
      <radialGradient id="ac-bg1" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#8B4A1E" />
        <stop offset="100%" stopColor="#2A0F02" />
      </radialGradient>
      <radialGradient id="ac-glow1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C8832A" stopOpacity=".4" />
        <stop offset="100%" stopColor="#2A0F02" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="300" height="160" fill="url(#ac-bg1)" />
    <ellipse cx="150" cy="80" rx="90" ry="70" fill="url(#ac-glow1)" />
    <rect x="80" y="65" width="140" height="70" rx="3" fill="#C8832A" opacity=".9" />
    <rect x="147" y="62" width="6" height="76" rx="2" fill="#5C2D12" />
    <rect x="83" y="68" width="62" height="64" rx="2" fill="#FDF6EE" />
    <rect x="155" y="68" width="62" height="64" rx="2" fill="#FFFBF5" />
    <circle cx="186" cy="100" r="22" fill="none" stroke="#5C2D12" strokeWidth="1" />
    <circle cx="186" cy="100" r="6" fill="#5C2D12" opacity=".5" />
  </svg>
);

const Card2SVG = () => (
  <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <defs>
      <radialGradient id="ac-bg2" cx="40%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#C8832A" />
        <stop offset="100%" stopColor="#8B4A1E" />
      </radialGradient>
    </defs>
    <rect width="300" height="160" fill="url(#ac-bg2)" />
    <rect x="75" y="20" width="120" height="120" fill="none" stroke="#f0d070" strokeWidth="1.2" opacity=".8" />
    <polygon points="135,20 195,80 135,140 75,80" fill="none" stroke="#f0d070" strokeWidth="1" opacity=".7" />
    <rect x="105" y="50" width="60" height="60" fill="rgba(240,210,100,.08)" stroke="#f0d070" strokeWidth=".8" opacity=".6" />
  </svg>
);

const Card3SVG = () => (
  <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <defs>
      <radialGradient id="ac-bg3" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#3D1A08" />
        <stop offset="100%" stopColor="#2A0F02" />
      </radialGradient>
      <radialGradient id="ac-jupGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C8832A" />
        <stop offset="100%" stopColor="#5C2D12" />
      </radialGradient>
    </defs>
    <rect width="300" height="160" fill="url(#ac-bg3)" />
    <circle cx="155" cy="78" r="52" fill="url(#ac-jupGlow)" />
    <ellipse cx="155" cy="78" rx="75" ry="12" fill="none" stroke="#d4a050" strokeWidth="2.5" opacity=".35" />
  </svg>
);

const Card4SVG = () => (
  <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
    <defs>
      <radialGradient id="ac-bg4" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#8B4A1E" />
        <stop offset="100%" stopColor="#5C2D12" />
      </radialGradient>
    </defs>
    <rect width="300" height="160" fill="url(#ac-bg4)" />
    <circle cx="155" cy="80" r="56" fill="none" stroke="#d4a840" strokeWidth="2" opacity=".7" />
    <polygon points="155,38 150,80 155,68 160,80" fill="#e84030" opacity=".9" />
    <circle cx="155" cy="80" r="6" fill="#e8c050" opacity=".9" />
  </svg>
);

const COURSES = [
  {
    id: 1,
    level: 'Beginner Level',
    title: 'Foundation in Astrology',
    desc: 'Start your journey. Learn the basics of planets, signs, houses and their impact on our lives.',
    icon: '☸',
    price: '₹699',
    original: '₹4100',
    SVG: Card1SVG,
    link: '/vedic-course',
  },
  {
    id: 2,
    level: 'Intermediate Level',
    title: 'Vedic Astrology Deep Dive',
    desc: 'Deepen your understanding of planetary dasha, yogas, and divisional charts in Vedic astrology.',
    icon: '☽',
    price: '₹999',
    original: '₹5100',
    SVG: Card2SVG,
    link: '/advanced-astrology',
  },
  {
    id: 3,
    level: 'Advanced Level',
    title: 'KP Astrology Mastery',
    desc: 'Master the precision of KP system with practical techniques for accurate predictions.',
    icon: '24',
    price: '₹1299',
    original: '₹6500',
    SVG: Card3SVG,
    iconStyle: { fontSize: '13px', fontWeight: 600 },
    link: '/predictive-astrology',
  },
  {
    id: 4,
    level: 'Practitioner Level',
    title: 'Astrology for Guidance & Counseling',
    desc: "Learn how to guide, empower and bring positive change in others' lives using astrology.",
    icon: '✦',
    price: '₹1499',
    original: '₹7000',
    SVG: Card4SVG,
    link: '/certification-courses',
  },
];

export default function AstrologyCoursesSection() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .ac-section {
          position: relative !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 3rem 0 2.5rem !important;
          background: var(--bg-color) !important;
          font-family: var(--font-sans) !important;
        }
        .ac-section::before {
          content: '✦';
          position: absolute;
          top: 20px;
          left: 30px;
          font-size: 60px;
          opacity: 0.06;
          color: var(--primary-color);
          pointer-events: none;
        }
        .ac-section::after {
          content: '☽';
          position: absolute;
          bottom: 30px;
          right: 40px;
          font-size: 80px;
          opacity: 0.06;
          color: var(--primary-color);
          pointer-events: none;
        }
        .ac-deco {
          position: absolute;
          opacity: 0.07;
          pointer-events: none;
          top: 0;
          right: 0;
          width: 150px;
          height: 150px;
        }

        /* Use <div>, not <header> — style.min.css sets header { position: absolute } */
        .ac-header {
          position: static !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          z-index: auto !important;
          text-align: center !important;
          margin: 0 0 2.5rem !important;
          padding: 0 !important;
          background: transparent !important;
          backdrop-filter: none !important;
        }
        .ac-title {
          font-family: var(--font-serif) !important;
          font-size: var(--h2-size) !important;
          font-weight: 700 !important;
          color: var(--text-heading) !important;
          line-height: 1.2 !important;
          letter-spacing: 0.02em !important;
          margin: 0 0 0.4rem !important;
          padding: 0 !important;
        }
        .ac-divider {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          margin: 0.4rem 0 0.8rem !important;
          padding: 0 !important;
        }
        .ac-divider::before,
        .ac-divider::after {
          content: '';
          flex: 1;
          max-width: 70px;
          height: 0.5px;
          background: var(--accent-color);
        }
        .ac-divider-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-color);
          flex-shrink: 0;
        }
        .ac-tag {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          margin: 0 0 0.6rem !important;
          padding: 0 !important;
          font-size: 0.75rem !important;
          letter-spacing: 0.15em !important;
          color: var(--text-muted) !important;
          text-transform: uppercase !important;
          font-family: var(--font-sans) !important;
        }
        .ac-tag::before,
        .ac-tag::after {
          content: '—';
          opacity: 0.4;
        }
        .ac-sub {
          color: var(--text-content) !important;
          font-size: 0.95rem !important;
          max-width: 500px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          line-height: 1.7 !important;
          font-family: var(--font-sans) !important;
        }

        .ac-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)) !important;
          gap: 1.5rem !important;
          margin: 0 0 2rem !important;
          padding: 0 !important;
          list-style: none !important;
        }

        .ac-card {
          margin: 0 !important;
          padding: 0 !important;
          background: var(--card-color) !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          border: 1px solid var(--glass-border) !important;
          display: flex !important;
          flex-direction: column !important;
          transition: transform 0.3s ease !important;
          cursor: pointer !important;
          box-shadow: var(--premium-shadow) !important;
        }
        .ac-card:hover {
          transform: translateY(-8px) !important;
        }

        .ac-card-media {
          width: 100% !important;
          height: 170px !important;
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
          position: relative !important;
          overflow: hidden !important;
          flex-shrink: 0 !important;
        }
        .ac-card-media svg {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
        }

        .ac-badge {
          position: absolute !important;
          top: 10px !important;
          left: 10px !important;
          margin: 0 !important;
          padding: 4px 10px !important;
          background: var(--primary-color) !important;
          color: #fff !important;
          font-size: 0.65rem !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          border-radius: 20px !important;
          font-family: var(--font-sans) !important;
          font-weight: 600 !important;
          z-index: 3 !important;
        }

        .ac-floaticon {
          position: absolute !important;
          bottom: -20px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 44px !important;
          height: 44px !important;
          margin: 0 !important;
          padding: 0 !important;
          background: var(--card-color) !important;
          border: 2px solid var(--accent-color) !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 18px !important;
          color: var(--primary-color) !important;
          z-index: 2 !important;
          font-family: var(--font-serif) !important;
        }

        .ac-card-body {
          margin: 0 !important;
          padding: 2rem 1.25rem 1.25rem !important;
          text-align: center !important;
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          background: var(--card-color) !important;
        }

        .ac-level {
          margin: 0 0 0.4rem !important;
          padding: 0 !important;
          font-size: 0.65rem !important;
          letter-spacing: 0.18em !important;
          color: var(--text-muted) !important;
          text-transform: uppercase !important;
          font-family: var(--font-sans) !important;
          font-weight: 600 !important;
        }

        .ac-card-title {
          margin: 0 0 0.4rem !important;
          padding: 0 !important;
          font-family: var(--font-serif) !important;
          font-size: 1.25rem !important;
          color: var(--text-card-heading) !important;
          font-weight: 600 !important;
          line-height: 1.3 !important;
        }

        .ac-card-desc {
          margin: 0 0 1rem !important;
          padding: 0 !important;
          font-size: 0.875rem !important;
          color: var(--text-content) !important;
          line-height: 1.6 !important;
          flex: 1 !important;
          font-family: var(--font-sans) !important;
        }

        .ac-price {
          margin: 0.2rem 0 0.8rem !important;
          padding: 0 !important;
          font-family: var(--font-serif) !important;
          font-size: 1.5rem !important;
          color: var(--text-heading) !important;
          font-weight: 700 !important;
        }
        .ac-price-old {
          font-size: 0.9rem !important;
          color: var(--text-muted) !important;
          text-decoration: line-through !important;
          font-family: var(--font-sans) !important;
          font-weight: 400 !important;
          margin-left: 8px !important;
        }

        .ac-rule {
          height: 1px !important;
          margin: 0.5rem 0 1rem !important;
          padding: 0 !important;
          background: var(--glass-border) !important;
          border: none !important;
        }

        .ac-instructor {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          margin: 0 0 1rem !important;
          padding: 0 !important;
        }
        .ac-avatar {
          width: 36px !important;
          height: 36px !important;
          margin: 0 !important;
          padding: 0 !important;
          border-radius: 50% !important;
          background: var(--primary-color) !important;
          border: 2px solid var(--accent-color) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 12px !important;
          color: #fff !important;
          font-family: var(--font-serif) !important;
          flex-shrink: 0 !important;
        }
        .ac-iname {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 0.85rem !important;
          color: var(--text-main) !important;
          font-weight: 600 !important;
          font-family: var(--font-sans) !important;
          text-align: left !important;
        }
        .ac-iexp {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 0.75rem !important;
          color: var(--text-muted) !important;
          font-family: var(--font-sans) !important;
          text-align: left !important;
        }

        .ac-btnrow {
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .ac-btn {
          margin: 0 !important;
          padding: 0.85rem 2rem !important;
          background: #2a0f02 !important;
          color: #fff !important;
          border: none !important;
          border-radius: 10px !important;
          font-size: 0.95rem !important;
          font-family: var(--font-sans) !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
          text-decoration: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
        }
        .ac-btn:hover {
          background: #723c18 !important;
          transform: translateY(-2px) !important;
          color: #fff !important;
        }

        .ac-features {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
          gap: 1.5rem !important;
          margin: 0 !important;
          padding: 2rem 0 0 !important;
          border-top: 1px solid var(--glass-border) !important;
          list-style: none !important;
        }
        .ac-feature {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 8px !important;
          margin: 0 !important;
          padding: 0 !important;
          text-align: center !important;
        }
        .ac-feature-icon {
          width: 70px !important;
          height: 70px !important;
          margin: 0 !important;
          padding: 0 !important;
          border-radius: 50% !important;
          background: rgba(139, 74, 30, 0.08) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 28px !important;
          color: var(--primary-color) !important;
        }
        .ac-feature-title {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          color: var(--text-main) !important;
          font-family: var(--font-sans) !important;
        }
        .ac-feature-sub {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 0.875rem !important;
          color: var(--text-muted) !important;
          font-family: var(--font-sans) !important;
          font-weight: 500 !important;
        }

        @media (max-width: 575px) {
          .ac-section { padding: 3rem 0 2rem !important; }
          .ac-card { max-width: 360px !important; margin-left: auto !important; margin-right: auto !important; }
          .ac-card-media { height: 160px !important; }
          .ac-card-body { text-align: left !important; padding: 1.75rem 1rem 1rem !important; }
          .ac-level { text-align: left !important; }
          .ac-card-title { text-align: left !important; font-size: 1.15rem !important; }
          .ac-card-desc { text-align: left !important; }
          .ac-price { text-align: left !important; }
          .ac-instructor { justify-content: flex-start !important; }
          .ac-floaticon { left: 1.5rem !important; transform: none !important; width: 36px !important; height: 36px !important; font-size: 14px !important; bottom: -18px !important; }
          .ac-features { grid-template-columns: 1fr 1fr !important; gap: 1.5rem 1rem !important; }
          .ac-feature-title { font-size: 0.85rem !important; }
          .ac-feature-sub { font-size: 0.7rem !important; }
          .ac-feature-icon { width: 42px !important; height: 42px !important; font-size: 18px !important; }
        }
      `}</style>

      <section className="ac-section" aria-labelledby="astro-courses-heading">
        <svg className="ac-deco" viewBox="0 0 160 160" aria-hidden="true">
          <circle cx="130" cy="30" r="50" fill="none" stroke="#4a2508" strokeWidth=".8" />
          <circle cx="130" cy="30" r="35" fill="none" stroke="#4a2508" strokeWidth=".5" />
        </svg>

        <div className="container">
          <div className="ac-header" data-aos="fade-up">
            <h2 id="astro-courses-heading" className="ac-title">
              Astrology <span className="text-gradient">Courses</span>
            </h2>
            <div className="ac-divider" aria-hidden="true">
              <span className="ac-divider-dot" />
            </div>
            <p className="ac-tag">Ancient Wisdom · Modern Learning · Meaningful Transformation</p>
            <p className="ac-sub">
              Explore our carefully designed courses from beginner to advanced level by experienced astrologers.
            </p>
          </div>

          <div className="ac-grid">
            {COURSES.map(({ id, level, title, desc, icon, price, original, SVG, iconStyle, link }) => (
              <article
                key={id}
                className="ac-card"
                onClick={() => navigate(link)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(link);
                  }
                }}
                role="link"
                tabIndex={0}
              >
                <div className="ac-card-media">
                  <SVG />
                  <span className="ac-badge">Mega Discount</span>
                  <div className="ac-floaticon" style={iconStyle}>
                    {icon}
                  </div>
                </div>
                <div className="ac-card-body">
                  <p className="ac-level">{level}</p>
                  <h3 className="ac-card-title">{title}</h3>
                  <p className="ac-card-desc">{desc}</p>
                  <p className="ac-price">
                    {price}
                    <span className="ac-price-old">{original}</span>
                  </p>
                  <div className="ac-rule" aria-hidden="true" />
                  <div className="ac-instructor">
                    <div className="ac-avatar">MS</div>
                    <div>
                      <p className="ac-iname">Acharya Meera Sharma</p>
                      <p className="ac-iexp">20+ Years of Experience</p>
                    </div>
                  </div>
                  <div className="ac-btnrow">
                    <Link to="/courses" className="ac-btn" onClick={(e) => e.stopPropagation()}>
                      Learn More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="ac-features">
            {FEATURES.map((f) => (
              <div key={f.title} className="ac-feature">
                <div className="ac-feature-icon">{f.icon}</div>
                <p className="ac-feature-title">{f.title}</p>
                <p className="ac-feature-sub">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
