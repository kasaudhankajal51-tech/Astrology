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
            <h2 className="section-title text-dark">✨ What Makes Us Unique? ✨</h2>
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
        
        /* Hero Section - Warm Light Theme */
        .about-hero {
          position: relative;
          padding: 100px 0 80px;
          background: linear-gradient(135deg, #FFF8F0 0%, #FFF5EB 50%, #FFF8F0 100%);
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(255, 107, 53, 0.06), transparent 60%);
        }

        .stats-badge {
          display: inline-flex;
          flex-direction: column;
          background: #FFFFFF;
          backdrop-filter: blur(10px);
          padding: 12px 24px;
          border-radius: 20px;
          border: 1px solid rgba(255, 107, 53, 0.25);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .stats-badge .number { 
          font-size: 2.8rem; 
          font-weight: 900; 
          line-height: 1.1;
        }
        
        .stats-badge .text { 
          font-size: 0.85rem; 
          text-transform: uppercase; 
          letter-spacing: 1.5px; 
          color: #6B7280;
          font-weight: 600;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #1A1A2E;
          line-height: 1.2;
        }

        .hero-description {
          font-size: 1.2rem;
          color: #4A5568;
          line-height: 1.7;
          font-weight: 500;
        }

        .text-gradient {
          background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 70%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }

        .cta-mystic {
          display: inline-block;
          background: linear-gradient(135deg, #FF8C42, #FF6B35);
          color: #FFFFFF;
          padding: 14px 32px;
          border-radius: 50px;
          border: none;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(255, 107, 53, 0.25);
        }

        .cta-mystic:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.35);
        }

        /* Hero Image */
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
          box-shadow: 0 30px 50px rgba(0,0,0,0.15);
          border: 3px solid #FFFFFF;
        }

        .glow-circle {
          position: absolute;
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #FF8C42, #FF6B35);
          filter: blur(70px);
          opacity: 0.12;
          border-radius: 50%;
          animation: pulse 4s infinite alternate;
        }

        @keyframes pulse {
          from { transform: scale(0.8); opacity: 0.08; }
          to { transform: scale(1.2); opacity: 0.15; }
        }

        /* About Details Section - Light Theme */
        .about-details {
          background: #FFFFFF;
          padding: 80px 0;
        }

        .section-subtitle {
          background: linear-gradient(135deg, #FF8C42, #FF6B35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 800;
          font-size: 1rem;
          margin-bottom: 15px;
          display: inline-block;
        }

        .section-title {
          font-family: 'Merriweather Sans', 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 800;
          color: #1A1A2E;
          line-height: 1.3;
        }

        .about-text {
          font-size: 1.05rem;
          color: #4A5568;
          line-height: 1.7;
          font-weight: 500;
        }

        .highlight-name {
          background: linear-gradient(135deg, #FF8C42, #FF6B35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.1rem;
          font-weight: 800;
        }

        .tag-glass {
          padding: 8px 20px;
          background: #FFF8F0;
          border: 1px solid rgba(255, 107, 53, 0.3);
          border-radius: 40px;
          color: #FF6B35;
          font-size: 0.9rem;
          font-weight: 700;
          transition: all 0.3s;
        }

        .tag-glass:hover {
          background: #FF6B35;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* Video Section */
        .video-placeholder iframe {
          width: 100%;
          height: 280px;
          border-radius: 20px;
          border: 2px solid rgba(255, 107, 53, 0.2);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .glass-card {
          background: #FFFFFF;
          border-radius: 30px;
          border: 1px solid rgba(255, 107, 53, 0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .video-caption {
          font-size: 0.9rem;
          color: #6B7280;
          font-weight: 500;
        }

        /* Unique Features Section - Light Theme */
        .unique-features {
          background: #FDF9F5;
          padding: 80px 0;
        }

        .unique-subtitle {
          font-size: 1.1rem;
          color: #6B7280;
          font-weight: 500;
        }

        .unique-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(255, 107, 53, 0.15);
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .unique-card:hover {
          transform: translateY(-8px);
          border-color: #FF8C42;
          box-shadow: 0 20px 40px rgba(255, 140, 66, 0.12);
        }

        .icon-box-lg {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, rgba(255, 140, 66, 0.1), rgba(255, 107, 53, 0.08));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .feature-icon {
          font-size: 2rem;
        }

        .unique-card-text {
          font-size: 1rem;
          color: #2D3748;
          line-height: 1.6;
          font-weight: 600;
        }

        /* Aims Section - Light Theme */
        .aims-section {
          background: #FFFFFF;
          padding: 80px 0;
        }

        .aims-description {
          font-size: 1.1rem;
          color: #4A5568;
          line-height: 1.7;
          font-weight: 500;
        }

        .mission-box {
          background: linear-gradient(135deg, rgba(255, 140, 66, 0.05), rgba(255, 107, 53, 0.04));
          border-radius: 24px;
          border-left: 4px solid #FF8C42;
          border-right: 4px solid #FF6B35;
        }

        .mission-text {
          font-size: 1.15rem;
          color: #1A1A2E;
          font-style: italic;
          font-weight: 600;
          line-height: 1.6;
        }

        .aim-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .check-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        .check-icon i {
          color: #FF8C42;
        }

        .aim-text {
          font-size: 1rem;
          color: #2D3748;
          line-height: 1.6;
          font-weight: 500;
        }

        /* CTA Section - Light Theme */
        .cta-section {
          background: linear-gradient(135deg, #FFF8F0 0%, #FFF5EB 100%);
          padding: 80px 0;
        }

        .cta-card {
          background: #FFFFFF;
          border-radius: 40px;
          border: 1px solid rgba(255, 107, 53, 0.2);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .cta-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #1A1A2E;
        }

        .cta-description {
          font-size: 1.1rem;
          color: #4A5568;
          font-weight: 500;
        }

        .cta-button {
          background: linear-gradient(135deg, #FF8C42, #FF6B35);
          color: white;
          border: none;
          padding: 16px 40px;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(255, 107, 53, 0.25);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.35);
        }

        /* Responsive */
        @media (max-width: 991px) {
          .about-hero { padding-top: 120px; text-align: center; }
          .stats-badge { margin: 0 auto 30px; }
          .hero-img-main { margin-top: 40px; width: 70%; }
          .about-details { text-align: center; }
          .expertise-tags { justify-content: center; }
          .aims-section { text-align: center; }
          .mission-box { text-align: center; }
          .aim-item { justify-content: center; text-align: left; }
          .cta-card { margin: 0 20px; }
        }

        @media (max-width: 768px) {
          .hero-description { font-size: 1rem; }
          .about-text { font-size: 0.95rem; }
          .unique-card-text { font-size: 0.9rem; }
          .cta-button { padding: 12px 24px; font-size: 1rem; }
          .section-title { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}

export default About;