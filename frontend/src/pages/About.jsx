import { useEffect } from 'react';

function About() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="container position-relative z-2">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="stats-badge mb-4">
                <span className="number text-gradient">100k+</span>
                <span className="text">Trusted Consultations</span>
              </div>
              <h1 className="display-3 fw-bold text-white mb-4">
                Meet <span className="text-gradient">Damini Ma'am</span>
              </h1>
              <p className="lead text-light opacity-75 mb-5">
                Guided by knowledge, driven by purpose, and focused on your growth. Discover the cosmic narrative written in your stars.
              </p>
              <div className="cta-mystic">
                <i className="fas fa-award me-2"></i> Get Your Star Blessing Back
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="hero-img-container">
                <div className="glow-circle"></div>
                <img src="/manimage.png" className="hero-img-main" alt="astrologer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-details py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-up">
              <h5 className="section-subtitle">Our Astrologer</h5>
              <h2 className="section-title text-white mb-4">A Sacred Science of Intuition</h2>
              <p className="text-light opacity-75 mb-4">
                At our platform, astrology is not just a service—it is a sacred science rooted in deep knowledge, intuition, and spiritual wisdom.
              </p>
              <p className="text-light opacity-75 mb-4">
                Our expert astrologer, <strong>Damini Ma'am</strong>, is a highly respected and experienced practitioner who combines the timeless principles of Vedic astrology with modern-day insights to offer guidance that is both practical and transformative.
              </p>
              <div className="expertise-tags d-flex flex-wrap gap-2 mt-4">
                <span className="tag-glass">Vedic Astrology</span>
                <span className="tag-glass">Tarot Reading</span>
                <span className="tag-glass">Numerology</span>
                <span className="tag-glass">Spiritual Healing</span>
              </div>
            </div>
            <div className="col-lg-6" data-aos="zoom-in">
              <div className="video-scroll-wrapper">
                <div className="glass-card p-4 text-center">
                  <div className="video-placeholder glass-panel mb-3">
                     <iframe 
                       src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                       title="Astrology Wisdom"
                       frameBorder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen
                     ></iframe>
                  </div>
                  <p className="small text-muted">Watch: Transforming lives through cosmic alignment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Section */}
      <section className="unique-features py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="section-title text-white">What Makes Us Unique?</h2>
          </div>
          <div className="row g-4">
            {[
              "Profound understanding of planetary movements and their real-life impact",
              "Personalized consultations tailored to each individual's situation",
              "Honest, confidential, and ethically grounded guidance",
              "A powerful blend of intuitive insight and scientific methods"
            ].map((text, idx) => (
              <div className="col-md-6 col-lg-3" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="glass-panel h-100 p-4 text-center hover-up">
                  <div className="icon-box-sm mb-3">
                    <i className="fas fa-star text-gradient"></i>
                  </div>
                  <p className="m-0 text-light opacity-85">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aims Section */}
      <section className="aims-section py-5 background-glow">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <h2 className="section-title text-white mb-4">Our Aims & <br/><span className="text-gradient">Objectives</span></h2>
              <p className="text-light opacity-75 mb-4">
                In today's fast-moving world, astrology is a powerful tool that connects ancient wisdom with modern life.
              </p>
              <div className="mission-box glass-panel p-4">
                <p className="m-0 font-italic text-light">
                  "Our mission is to simplify astrology and make it practical, accessible, and result-oriented for everyone."
                </p>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="aims-grid">
                {[
                  "To remove doubts and superstitions and prepare astrologers methodically.",
                  "To provide the highest quality education in astrology for human welfare.",
                  "To combine traditional Vedic knowledge with modern techniques.",
                  "To offer clear and practical guidance to overcome life's challenges.",
                  "To solve life problems scientifically while preserving Vedic principles.",
                  "To empower individuals to become spiritually aware."
                ].map((aim, idx) => (
                  <div className="aim-item d-flex gap-3 mb-4" key={idx}>
                    <div className="check-icon"><i className="fas fa-check-circle text-gradient"></i></div>
                    <p className="m-0 text-light opacity-85">{aim}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-hero {
          position: relative;
          padding: 80px 0 60px;
          background: var(--cosmic-dark);
          overflow: hidden;
        }

        /* Prevent AOS horizontal scroll */
        body {
          overflow-x: hidden;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(255, 106, 0, 0.1), transparent 50%);
        }

        .stats-badge {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.05);
          width: fit-content;
          padding: 10px 20px;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stats-badge .number { font-size: 2.5rem; font-weight: 900; line-height: 1; }
        .stats-badge .text { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #888; }

        .text-gradient {
          background: linear-gradient(135deg, #ff6a00, #ff0080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cta-mystic {
          display: inline-block;
          background: rgba(255, 106, 0, 0.1);
          color: var(--cosmic-accent);
          padding: 12px 25px;
          border-radius: 30px;
          border: 1px solid var(--cosmic-accent);
          font-weight: 700;
          letter-spacing: 1px;
          transition: 0.3s;
        }

        .cta-mystic:hover {
          background: var(--cosmic-accent);
          color: #fff;
          box-shadow: 0 0 20px var(--cosmic-glow);
          transform: translateY(-2px);
        }

        .hero-img-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-img-main {
          width: 80%;
          border-radius: 30px;
          position: relative;
          z-index: 2;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          border: 2px solid rgba(255,255,255,0.1);
        }

        .glow-circle {
          position: absolute;
          width: 300px;
          height: 300px;
          background: var(--cosmic-accent);
          filter: blur(80px);
          opacity: 0.2;
          border-radius: 50%;
          animation: pulse 4s infinite alternate;
        }

        @keyframes pulse {
          from { transform: scale(1); opacity: 0.1; }
          to { transform: scale(1.2); opacity: 0.3; }
        }

        .section-subtitle {
          color: var(--cosmic-accent);
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .section-title {
          font-family: 'Merriweather Sans', serif;
          font-size: 2.5rem;
          font-weight: 800;
        }

        .tag-glass {
          padding: 6px 15px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .video-placeholder iframe {
          width: 100%;
          height: 250px;
          border-radius: 15px;
        }

        .hover-up:hover {
          transform: translateY(-10px);
          border-color: var(--cosmic-accent);
        }

        .icon-box-sm {
          width: 50px;
          height: 50px;
          background: rgba(255, 106, 0, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-size: 1.2rem;
        }

        .background-glow {
          background: radial-gradient(circle at 10% 50%, rgba(255, 0, 128, 0.05), transparent 40%);
        }

        .check-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        @media (max-width: 991px) {
          .about-hero { padding-top: 100px; text-align: center; }
          .stats-badge { margin: 0 auto 30px; }
          .hero-img-main { margin-top: 40px; }
        }
      `}</style>
    </>
  );
}

export default About;
