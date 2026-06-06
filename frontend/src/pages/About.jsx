import { useEffect } from 'react';
import SEO from '../components/SEO';

function About() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  return (
    <>
      <SEO title="About Us" description="Guided by knowledge, driven by purpose. Meet our expert astrologers." url="/about" />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="container position-relative z-2">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right" data-aos-duration="800">
              <div className="stats-badge mb-4">
                <span className="number text-gradient">100K+</span>
                <span className="text">Trusted Consultations</span>
              </div>
              <h1 className="hero-title mb-4">
                Meet <span className="text-gradient">Damini Ma'am</span>
              </h1>
              <p className="hero-description mb-5">
                Guided by knowledge, driven by purpose, and focused on your growth. Discover the cosmic narrative written in your stars.
              </p>
              <div className="cta-mystic">
                <i className="fas fa-award me-2"></i> ⭐ Get Your Star Blessing Today ⭐
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
              <div className="hero-img-container">
                <div className="glow-circle"></div>
                <img src="/manimage.png" className="hero-img-main" alt="Astrologer Damini Ma'am" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-details py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-up" data-aos-duration="800">
              <h5 className="section-subtitle">🌟 Our Astrologer 🌟</h5>
              <h2 className="section-title mb-4">A Sacred Science of <span className="text-gradient">Intuition</span></h2>
              <p className="about-text mb-4">
                At our platform, astrology is not just a service—it is a sacred science rooted in deep knowledge, intuition, and spiritual wisdom.
              </p>
              <p className="about-text mb-4">
                Our expert astrologer, <strong className="highlight-name">Damini Ma'am</strong>, is a highly respected and experienced practitioner who combines the timeless principles of Vedic astrology with modern-day insights to offer guidance that is both practical and transformative.
              </p>
              <div className="expertise-tags d-flex flex-wrap gap-3 mt-4">
                <span className="tag-glass">🔮 Vedic Astrology</span>
                <span className="tag-glass">🃏 Tarot Reading</span>
                <span className="tag-glass">🔢 Numerology</span>
                <span className="tag-glass">💫 Spiritual Healing</span>
              </div>
            </div>
            <div className="col-lg-6" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="100">
              <div className="video-scroll-wrapper">
                <div className="glass-card p-4 text-center">
                  <div className="video-placeholder mb-3">
                    <iframe 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title="Astrology Wisdom with Damini Ma'am"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="video-caption">📺 Watch: Transforming lives through cosmic alignment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Section */}
      <section className="unique-features py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up" data-aos-duration="700">
            <h2 className="section-title text-dark">✨ What Makes Us <span className="text-gradient">Unique?</span> ✨</h2>
            <p className="unique-subtitle mt-3">Discover why thousands trust us for their cosmic guidance</p>
          </div>
          <div className="row g-4">
            {[
              { icon: "🌙", text: "Profound understanding of planetary movements and their real-life impact" },
              { icon: "⭐", text: "Personalized consultations tailored to each individual's situation" },
              { icon: "🔒", text: "Honest, confidential, and ethically grounded guidance" },
              { icon: "🧠", text: "A powerful blend of intuitive insight and scientific methods" }
            ].map((item, idx) => (
              <div className="col-md-6 col-lg-3" key={idx} data-aos="fade-up" data-aos-duration="600" data-aos-delay={idx * 100}>
                <div className="unique-card h-100 p-4 text-center">
                  <div className="icon-box-lg mb-3">
                    <span className="feature-icon">{item.icon}</span>
                  </div>
                  <p className="unique-card-text m-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aims Section */}
      <section className="aims-section py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5" data-aos="fade-right" data-aos-duration="800">
              <h2 className="section-title text-dark mb-4">Our Aims & <br/><span className="text-gradient">Objectives</span></h2>
              <p className="aims-description mb-4">
                In today's fast-moving world, astrology is a powerful tool that connects ancient wisdom with modern life.
              </p>
              <div className="mission-box p-4">
                <p className="mission-text mb-0">
                  <i className="fas fa-quote-left me-2 text-gradient"></i> 
                  "Our mission is to simplify astrology and make it practical, accessible, and result-oriented for everyone."
                  <i className="fas fa-quote-right ms-2 text-gradient"></i>
                </p>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
              <div className="aims-grid">
                {[
                  "🎯 To remove doubts and superstitions and prepare astrologers methodically.",
                  "📚 To provide the highest quality education in astrology for human welfare.",
                  "🕉️ To combine traditional Vedic knowledge with modern techniques.",
                  "💡 To offer clear and practical guidance to overcome life's challenges.",
                  "⚖️ To solve life problems scientifically while preserving Vedic principles.",
                  "🌟 To empower individuals to become spiritually aware."
                ].map((aim, idx) => (
                  <div className="aim-item d-flex gap-3 mb-4" key={idx}>
                    <div className="check-icon"><i className="fas fa-check-circle"></i></div>
                    <p className="aim-text m-0">{aim}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <div className="cta-card p-5" data-aos="zoom-in" data-aos-duration="800">
            <h2 className="cta-title mb-3">Ready to Begin Your Cosmic Journey?</h2>
            <p className="cta-description mb-4">Book a consultation with Damini Ma'am today and unlock the secrets of your stars.</p>
            <button className="cta-button">
              <i className="fas fa-calendar-alt me-2"></i> Book Your Consultation Now
            </button>
          </div>
        </div>
      </section>

      <style>{`
        /* Global Reset */
        body {
          overflow-x: hidden !important;
          margin: 0;
          padding: 0;
        }
        
        /* Hero Section */
        .about-hero {
          position: relative;
          padding: var(--section-pad-y) var(--page-pad-x);
          background: var(--site-bg);
          overflow: hidden;
          font-family: var(--font-body);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(200, 162, 122, 0.1), transparent 60%);
        }

        .stats-badge {
          display: inline-flex;
          flex-direction: column;
          background: #FFFFFF;
          padding: 0.85rem 1.3rem;
          border-radius: var(--radius-card);
          border: 1px solid var(--site-border);
          box-shadow: var(--shadow-card);
        }

        .stats-badge .number { 
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 2.6rem); 
          font-weight: 700; 
          line-height: 1.1;
          color: var(--primary-color);
        }
        
        .stats-badge .text { 
          font-size: 0.78rem; 
          text-transform: uppercase; 
          letter-spacing: 1.5px; 
          color: var(--text-muted);
          font-weight: 600;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: var(--h1-size);
          font-weight: 800;
          color: var(--site-text);
          line-height: 1.12;
        }

        .hero-description {
          font-size: var(--body-size);
          color: var(--site-text-muted);
          line-height: 1.6;
          font-weight: 400;
          font-family: var(--font-sans);
        }

        .text-gradient {
          color: var(--primary-color);
          font-weight: 700;
        }

        .cta-mystic {
          display: inline-block;
          background: var(--primary-color);
          color: #FFFFFF;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-control);
          border: none;
          font-weight: 600;
          font-size: 0.92rem;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(139, 74, 47, 0.2);
          text-decoration: none;
        }

        .cta-mystic:hover {
          transform: translateY(-3px);
          background: #723c26;
          box-shadow: 0 8px 25px rgba(139, 74, 47, 0.3);
        }

        /* Hero Image */
        .hero-img-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-img-main {
          width: 85%;
          border-radius: var(--radius-card);
          position: relative;
          z-index: 2;
          box-shadow: var(--premium-shadow);
          border: 4px solid #FFFFFF;
        }

        .glow-circle {
          position: absolute;
          width: 400px;
          height: 400px;
          background: var(--primary-color);
          filter: blur(80px);
          opacity: 0.1;
          border-radius: 50%;
        }

        /* About Details Section */
        .about-details {
          background: #FFFFFF;
          padding: var(--section-pad-y) var(--page-pad-x);
        }

        .section-subtitle {
          color: var(--primary-color);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
          font-size: 0.82rem;
          margin-bottom: 15px;
          display: block;
          font-family: var(--font-sans);
        }

        .section-title {
          font-family: var(--font-heading) !important;
          font-size: var(--h2-size) !important;
          font-weight: 800 !important;
          color: var(--site-text) !important;
          line-height: 1.18;
        }

        @media (max-width: 991px) {
          .section-title { font-size: clamp(2.2rem, 5vw, 2.8rem) !important; }
        }

        @media (max-width: 767px) {
          .section-title { font-size: clamp(1.8rem, 6vw, 2.2rem) !important; }
        }

        .about-text {
          font-size: var(--body-size);
          color: var(--site-text-muted);
          line-height: 1.6;
          font-weight: 400;
        }

        .highlight-name {
          color: var(--primary-color);
          font-weight: 700;
        }

        .tag-glass {
          padding: 0.5rem 0.8rem;
          background: var(--card-color);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-control);
          color: var(--primary-color);
          font-size: 0.88rem;
          font-weight: 600;
          transition: all 0.3s;
        }

        .tag-glass:hover {
          background: var(--primary-color);
          color: #FFFFFF;
          transform: translateY(-3px);
        }

        /* Video Section */
        .video-placeholder iframe {
          width: 100%;
          height: clamp(220px, 38vw, 300px);
          border-radius: var(--radius-card);
          border: 1px solid var(--site-border);
          box-shadow: var(--shadow-card);
        }

        .glass-card {
          background: var(--card-color);
          border-radius: var(--radius-card);
          border: 1px solid var(--site-border);
          box-shadow: var(--shadow-card);
        }

        .video-caption {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 15px;
        }

        /* Unique Features Section */
        .unique-features {
          background: var(--bg-color);
          padding: var(--section-pad-y) var(--page-pad-x);
        }

        .unique-subtitle {
          font-size: var(--body-size);
          color: var(--site-text-muted);
          font-weight: 400;
        }

        .unique-card {
          background: #FFFFFF;
          border-radius: var(--radius-card);
          border: 1px solid var(--site-border);
          transition: all 0.3s ease;
          box-shadow: var(--shadow-card);
        }

        .unique-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-color);
          box-shadow: 0 15px 35px rgba(139, 74, 47, 0.1);
        }

        .icon-box-lg {
          width: 80px;
          height: 80px;
          background: rgba(139, 74, 47, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .feature-icon {
          font-size: 1.6rem;
        }

        .unique-card-text {
          font-size: 0.96rem;
          color: var(--site-text-muted);
          line-height: 1.5;
          font-weight: 500;
        }

        /* Aims Section */
        .aims-section {
          background: #FFFFFF;
          padding: var(--section-pad-y) var(--page-pad-x);
        }

        .aims-description {
          font-size: var(--body-size);
          color: var(--site-text-muted);
          line-height: 1.6;
          font-weight: 400;
        }

        .mission-box {
          background: var(--card-color);
          border-radius: var(--radius-card);
          border: 1px solid var(--site-border);
          padding: clamp(1rem, 3vw, 1.5rem);
          border-left: 5px solid var(--primary-color);
        }

        .mission-text {
          font-size: 1rem;
          color: var(--site-text);
          font-style: italic;
          font-weight: 600;
          line-height: 1.6;
        }

        .aim-item {
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--site-border);
        }

        .check-icon i {
          color: var(--primary-color);
          font-size: 1.4rem;
        }

        .aim-text {
          font-size: 0.98rem;
          color: var(--site-text-muted);
          line-height: 1.5;
          font-weight: 500;
        }

        /* CTA Section */
        .cta-section {
          background: var(--bg-color);
          padding: var(--section-pad-y) var(--page-pad-x);
        }

        .cta-card {
          background: #FFFFFF;
          border-radius: var(--radius-card);
          border: 1px solid var(--site-border);
          box-shadow: var(--shadow-card);
          padding: clamp(1.5rem, 5vw, 3rem);
        }

        .cta-title {
          font-family: var(--font-heading);
          font-size: var(--h2-size);
          font-weight: 800;
          color: var(--site-text);
        }

        .cta-description {
          font-size: var(--body-size);
          color: var(--site-text-muted);
          font-weight: 400;
        }

        .cta-button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.8rem 1.35rem;
          font-size: 0.94rem;
          font-weight: 600;
          border-radius: var(--radius-control);
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(139, 74, 47, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          background: #723c26;
          box-shadow: 0 15px 35px rgba(139, 74, 47, 0.3);
        }

        @media (max-width: 991px) {
          .about-hero { padding-top: 6rem; text-align: center; }
          .stats-badge { margin: 0 auto 30px; }
          .hero-img-main { margin-top: 40px; width: 80%; }
          .about-details { text-align: center; }
          .expertise-tags { justify-content: center; }
          .aims-section { text-align: center; }
          .mission-box { text-align: center; }
          .aim-item { justify-content: center; text-align: left; }
          .cta-card { margin: 0 15px; }
        }
      `}</style>
    </>
  );
}

export default About;
