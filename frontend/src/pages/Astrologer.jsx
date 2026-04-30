import { useEffect } from 'react';

function Astrologer() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const astrologers = [
    { name: "Damini Ma'am", role: "Vedic Astrology Expert", exp: "16+ years", image: "/images/avatar.png", bio: "Specializes in Vedic Astrology, Numerology, and Deep Karmic Analysis." },
    { name: "Sanjay Ji", role: "Vastu & Numerology", exp: "12+ years", image: "/images/avatar.png", bio: "Expert in home Vastu corrections and name numerology for business success." },
    { name: "Kavita Ji", role: "Tarot & Psychic", exp: "8+ years", image: "/images/avatar.png", bio: "Intuitive tarot reader providing clarity on love and career crossroads." },
    { name: "Rahul Shastri", role: "KP Astrology", exp: "10+ years", image: "/images/avatar.png", bio: "Predictive specialist using KP system for accurate timing of events." },
  ];

  return (
    <>
      {/* Hero Header */}
      <section className="astro-hero py-5 text-center">
        <div className="container" data-aos="fade-down">
          <h5 className="section-subtitle">Our Guiding Stars</h5>
          <h1 className="display-4 fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Meet Our <span className="text-gradient">Expert Astrologers</span>
          </h1>
          <p className="lead mx-auto mb-5" style={{ maxWidth: '700px', color: 'var(--cosmic-text-muted)' }}>
            Highly qualified specialists dedicated to providing you with clarity, direction, and profound cosmic insights.
          </p>
        </div>
      </section>

      {/* Astrologers Grid */}
      <section className="container pb-5 mb-5">
        <div className="row g-4">
          {astrologers.map((astro, idx) => (
            <div key={idx} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="astrologer-card text-center h-100">
                <div className="astro-image-container mb-4">
                  <div className="astro-image-bg"></div>
                  <img src={astro.image} alt={astro.name} className="astro-img" />
                </div>
                <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--cosmic-text)' }}>{astro.name}</h3>
                <p className="text-gradient small fw-bold mb-3">{astro.role}</p>
                <div className="experience-tag mb-3">
                  <i className="fas fa-award me-2"></i>{astro.exp} Exp.
                </div>
                <p className="small text-muted mb-4 px-2">{astro.bio}</p>
                
                <div className="rating mb-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <span className="ms-2 fw-bold" style={{ fontSize: '0.8rem' }}>5.0</span>
                </div>
                
                <button className="btn btn-astro-card w-100 mt-auto">
                  BOOK SESSION <i className="fas fa-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .astro-hero {
          background: var(--cosmic-bg);
          padding: 160px 0 100px !important;
          overflow: hidden;
        }

        .section-subtitle {
          color: var(--cosmic-accent-pink);
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 800;
          font-size: 0.85rem;
          margin-bottom: 15px;
          display: block;
        }

        .text-gradient {
          background: var(--cosmic-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .astrologer-card {
          background: var(--cosmic-white);
          padding: 45px 30px;
          border-radius: 35px;
          border: 1px solid var(--glass-border);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: var(--premium-shadow);
          display: flex;
          flex-direction: column;
        }

        .astrologer-card:hover {
          transform: translateY(-15px);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
        }

        .astro-image-container {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 0 auto 30px;
        }

        .astro-image-bg {
          position: absolute;
          inset: -8px;
          background: var(--cosmic-gradient);
          border-radius: 50%;
          opacity: 0.15;
          filter: blur(10px);
        }

        .astro-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 6px solid var(--cosmic-white);
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .experience-tag {
          display: inline-block;
          background: var(--cosmic-accent-soft);
          color: var(--cosmic-accent-pink);
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .rating i {
          color: #ffb800;
          font-size: 0.9rem;
          margin: 0 3px;
        }

        .btn-astro-card {
          background: var(--cosmic-white);
          border: 1px solid var(--glass-border);
          color: var(--cosmic-text);
          padding: 15px;
          border-radius: 18px;
          font-weight: 800;
          font-size: 0.8rem;
          transition: 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-astro-card:hover {
          background: var(--cosmic-gradient);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 10px 20px rgba(227, 27, 122, 0.2);
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .astro-hero { padding: 140px 0 80px !important; }
          .display-4 { font-size: 2.5rem; }
        }
      `}</style>
    </>
  );
}

export default Astrologer;
