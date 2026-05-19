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
          padding: 100px 0 80px;
          background: var(--bg-color);
          overflow: hidden;
          font-family: var(--font-sans);
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
          padding: 15px 30px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          box-shadow: var(--premium-shadow);
        }

        .stats-badge .number { 
          font-family: var(--font-serif);
          font-size: 3rem; 
          font-weight: 700; 
          line-height: 1.1;
          color: var(--primary-color);
        }
        
        .stats-badge .text { 
          font-size: 0.85rem; 
          text-transform: uppercase; 
          letter-spacing: 1.5px; 
          color: var(--text-muted);
          font-weight: 600;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: var(--text-heading);
          line-height: 1.2;
        }

        .hero-description {
          font-size: 1.2rem;
          color: var(--text-content);
          line-height: 1.7;
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
          padding: 16px 40px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          font-size: 1.1rem;
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
          border-radius: 24px;
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
          padding: 100px 0;
        }

        .section-subtitle {
          color: var(--primary-color);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 15px;
          display: block;
          font-family: var(--font-sans);
        }

        .section-title {
          font-family: var(--font-serif) !important;
          font-size: clamp(42px, 5vw, 48px) !important;
          font-weight: 700 !important;
          color: var(--text-heading) !important;
          line-height: 1.2;
        }

        @media (max-width: 991px) {
          .section-title { font-size: clamp(2.2rem, 5vw, 2.8rem) !important; }
        }

        @media (max-width: 767px) {
          .section-title { font-size: clamp(1.8rem, 6vw, 2.2rem) !important; }
        }

        .about-text {
          font-size: 1.1rem;
          color: var(--text-content);
          line-height: 1.8;
          font-weight: 400;
        }

        .highlight-name {
          color: var(--primary-color);
          font-weight: 700;
        }

        .tag-glass {
          padding: 10px 24px;
          background: var(--card-color);
          border: 1px solid var(--glass-border);
          border-radius: 40px;
          color: var(--primary-color);
          font-size: 1rem;
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
          height: 320px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          box-shadow: var(--premium-shadow);
        }

        .glass-card {
          background: var(--card-color);
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          box-shadow: var(--premium-shadow);
        }

        .video-caption {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 15px;
        }

        /* Unique Features Section */
        .unique-features {
          background: var(--bg-color);
          padding: 100px 0;
        }

        .unique-subtitle {
          font-size: 1.2rem;
          color: var(--text-content);
          font-weight: 400;
        }

        .unique-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          transition: all 0.3s ease;
          box-shadow: var(--premium-shadow);
        }

        .unique-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary-color);
          box-shadow: 0 15px 35px rgba(139, 74, 47, 0.1);
        }

        .icon-box-lg {
          width: 80px;
          height: 80px;
          background: rgba(139, 74, 47, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .feature-icon {
          font-size: 2.2rem;
        }

        .unique-card-text {
          font-size: 1.1rem;
          color: var(--text-main);
          line-height: 1.6;
          font-weight: 500;
        }

        /* Aims Section */
        .aims-section {
          background: #FFFFFF;
          padding: 100px 0;
        }

        .aims-description {
          font-size: 1.2rem;
          color: var(--text-content);
          line-height: 1.7;
          font-weight: 400;
        }

        .mission-box {
          background: var(--card-color);
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          padding: 35px;
          border-left: 5px solid var(--primary-color);
        }

        .mission-text {
          font-size: 1.25rem;
          color: var(--text-heading);
          font-style: italic;
          font-weight: 600;
          line-height: 1.6;
        }

        .aim-item {
          padding: 15px 0;
          border-bottom: 1px solid var(--glass-border);
        }

        .check-icon i {
          color: var(--primary-color);
          font-size: 1.4rem;
        }

        .aim-text {
          font-size: 1.15rem;
          color: var(--text-content);
          line-height: 1.6;
          font-weight: 500;
        }

        /* CTA Section */
        .cta-section {
          background: var(--bg-color);
          padding: 100px 0;
        }

        .cta-card {
          background: #FFFFFF;
          border-radius: 30px;
          border: 1px solid var(--glass-border);
          box-shadow: var(--premium-shadow);
          padding: 60px 40px;
        }

        .cta-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 6vw, 3.5rem);
          font-weight: 700;
          color: var(--text-heading);
        }

        .cta-description {
          font-size: 1.3rem;
          color: var(--text-content);
          font-weight: 400;
        }

        .cta-button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 18px 45px;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 12px;
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
          .about-hero { padding-top: 120px; text-align: center; }
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