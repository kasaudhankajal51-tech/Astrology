import { useEffect, useRef } from 'react';

function Home() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const scrollTestimonials = (direction) => {
    if (trackRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 350;
      trackRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Banner Section */}
      <section className="banner-section w-100">
        <div className="img-main-banner">
          <div className="banner-overlay"></div>
          <img alt="cosmic background" src="/images/bg-bannerpic.jpg" />
        </div>
        <div className="container">
          <div className="banner-text-home">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <span className="spm-small" data-aos="fade-up">The Complete Guide To Astrology</span>
                <h1 className="banner-title my-3" data-aos="fade-down">
                  Let the Stars Shape<br/>
                  <span className="text-gradient">Your Journey</span>
                </h1>
                <p className="banner-desc mb-5" data-aos="fade-up">
                  Discover the cosmic narrative written in the stars. Learn astrology
                  online and gain the skills to understand planetary influences,
                  houses, and signs. Predict outcomes, guide life journeys, and explore the
                  mysteries of yourself and others.
                </p>
                <div data-aos="fade-up">
                  <a href="#" className="btn mystic-btn-primary">ENROLL NOW <i className="fas fa-arrow-right ms-2"></i></a>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-flex justify-content-center">
                <div className="cosmic-orbit-container">
                  <div className="big-circle">
                    <div className="icon-block"><img alt="planet" src="/images/as6.png" /></div>
                    <div className="icon-block"><img alt="stars" src="/images/as7.png" /></div>
                    <div className="icon-block"><img alt="moon" src="/images/as8.png" /></div>
                    <div className="icon-block"><img alt="sun" src="/images/as9.png" /></div>
                    <div className="icon-block"><img alt="zodiac" src="/images/as10.png" /></div>
                  </div>
                  <div className="small-circle">
                    <div className="icon-block"><img alt="app" src="/images/as1.png" /></div>
                    <div className="icon-block"><img alt="constellation" src="/images/as2.png" /></div>
                    <div className="icon-block"><img alt="galaxy" src="/images/as3.png" /></div>
                  </div>
                  <div className="center-logo">
                    <div className="glow-orb"></div>
                    <img alt="logo center" src="/images/middle-img.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <main className="w-100 body-main">
        <section className="about-part-section w-100">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="img-box01 position-relative">
                  <figure className="moon-img">
                    <img alt="moon" src="/images/moon.jpg" className="img-fluid" />
                  </figure>
                  <figure className="floating-element d-none d-md-block" data-aos="fade-down">
                    <img alt="sm" src="/images/imok.png" />
                  </figure>
                  <div className="experience-badge text-center" data-aos="fade-up">
                    <h4>16+</h4>
                    <span>Years Experience</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h5 className="section-subtitle" data-aos="fade-down">About Astro Ava</h5>
                <h2 className="section-title text-white my-3" data-aos="fade-down">
                  Unlock a Brilliant Future with Astrology
                </h2>
                <p className="section-desc mt-3" data-aos="fade-up">
                  Discover Your True Potential with Expert Astrology Guidance!
                  Step into a life full of clarity, confidence, and success. Our professional astrology
                  consultants help you unlock the secrets of your future with accurate, personalized insights.
                </p>
                <a href="#" className="btn mystic-btn-outline mt-4" data-aos="fade-down">Read More</a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section w-100">
          <div className="container">
            <div className="text-center mb-5">
              <h5 className="section-subtitle" data-aos="fade-up">Our Expertise</h5>
              <h2 className="section-title text-white mt-2" data-aos="fade-up">Guiding You Through Life</h2>
              <p className="mx-auto text-muted mt-3" style={{maxWidth: '600px'}} data-aos="fade-down">
                Our Astrologers Are Dedicated to Providing Clarity and Direction
              </p>
            </div>
            
            <div className="row g-4 align-items-center mt-4">
              <div className="col-md-6 col-lg-4">
                <div className="service-card" data-aos="fade-up" data-aos-delay="100">
                  <div className="icon-wrapper"><img alt="horoscope" src="/images/3013143.png" /></div>
                  <h4 className="text-white mt-3">Personal Horoscope</h4>
                  <p className="mt-2 text-muted">Learn astrology from experienced and trusted mentors.</p>
                </div>
                <div className="service-card" data-aos="fade-up" data-aos-delay="200">
                  <div className="icon-wrapper"><img alt="marriage" src="/images/8596897.png" /></div>
                  <h4 className="text-white mt-3">Relationships</h4>
                  <p className="mt-2 text-muted">Gain practical knowledge with real-life case studies.</p>
                </div>
              </div>
              
              <div className="col-lg-4 d-none d-lg-block text-center" data-aos="zoom-in">
                <div className="service-center-img position-relative">
                  <div className="img-anim"><img alt="zodiac wheel" src="/images/service_img2.png" className="img-fluid" /></div>
                  <img alt="meditation" src="/images/sop.png" className="img-fluid center-overlay" />
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4">
                <div className="service-card" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon-wrapper"><img alt="career" src="/images/867780.png" /></div>
                  <h4 className="text-white mt-3">Career & Business</h4>
                  <p className="mt-2 text-muted">Understand career and financial predictions deeply.</p>
                </div>
                <div className="service-card" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon-wrapper"><img alt="muhurat" src="/images/9289285.png" /></div>
                  <h4 className="text-white mt-3">Muhurat Timing</h4>
                  <p className="mt-2 text-muted">Find the most auspicious time for your endeavors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="testimonial-section">
          <div className="container">
            <div className="text-center mb-5">
              <h5 className="section-subtitle">Real Stories</h5>
              <h2 className="section-title text-white">Client Testimonials</h2>
            </div>
            <div className="video-wrapper position-relative">
              <button className="nav-btn left-btn" onClick={() => scrollTestimonials('left')}><i className="fas fa-chevron-left"></i></button>
              
              <div className="video-track" ref={trackRef}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div className="video-card" key={i}>
                    <div className="video-inner">
                      <video src="/videohomefinal.mp4" autoPlay muted loop playsInline></video>
                      <div className="video-overlay"><i className="fas fa-play-circle text-white fs-1"></i></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="nav-btn right-btn" onClick={() => scrollTestimonials('right')}><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </section>

        {/* Popular Reports Section */}
        <section className="reports-section">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title text-white">Most Popular Reports</h2>
              <p className="text-muted mt-2">Trusted by 50,000+ seekers worldwide for clarity and life guidance.</p>
            </div>
            
            <div className="row justify-content-center g-4">
              {/* Report Card 1 */}
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="premium-report-card w-100 theme-emerald">
                  <div className="card-header-art">
                    <span className="badge-discount">Mega DISCOUNT</span>
                    <h3 className="report-title">Vedic Astrology</h3>
                    <p className="report-price-hero">₹699 Only</p>
                  </div>
                  <div className="card-body-content">
                    <h4>Vedic Astrology</h4>
                    <p className="text-muted">Discover your true purpose, karmic path & hidden strengths.</p>
                    <div className="card-footer-action">
                      <div className="price-tag">₹699 <del>₹4100</del></div>
                      <div className="action-btns">
                        <button className="btn-read">Read</button>
                        <button className="btn-buy">Buy</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Report Card 2 */}
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="premium-report-card w-100 theme-amethyst">
                  <div className="card-header-art">
                    <span className="badge-discount">Mega DISCOUNT</span>
                    <h3 className="report-title">Numerology</h3>
                    <p className="report-price-hero">₹999 Only</p>
                  </div>
                  <div className="card-body-content">
                    <h4>Numerology Report</h4>
                    <p className="text-muted">Navigate your career, health & finance with precise cosmic wisdom.</p>
                    <div className="card-footer-action">
                      <div className="price-tag">₹999 <del>₹5100</del></div>
                      <div className="action-btns">
                        <button className="btn-read">Read</button>
                        <button className="btn-buy">Buy</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Report Card 3 */}
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="premium-report-card w-100 theme-ruby">
                  <div className="card-header-art">
                    <span className="badge-discount">Mega DISCOUNT</span>
                    <h3 className="report-title">Face Reading</h3>
                    <p className="report-price-hero">₹599 Only</p>
                  </div>
                  <div className="card-body-content">
                    <h4>Face Reading</h4>
                    <p className="text-muted">Understand your emotional patterns, compatibility & life timing.</p>
                    <div className="card-footer-action">
                      <div className="price-tag">₹599 <del>₹3100</del></div>
                      <div className="action-btns">
                        <button className="btn-read">Read</button>
                        <button className="btn-buy">Buy</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-5">
              <button className="btn mystic-btn-primary px-5 py-3">Explore All Reports</button>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* Global & Utility */
        :root {
          --cosmic-dark: #070913;
          --cosmic-navy: #0b1220;
          --cosmic-accent: #ff6a00;
          --cosmic-glow: rgba(255, 106, 0, 0.4);
          --cosmic-purple: #8a2be2;
        }
        body { background-color: var(--cosmic-dark); color: #fff; }
        .section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; font-family: 'Merriweather Sans', serif; }
        .section-subtitle { color: var(--cosmic-accent); font-size: 1rem; text-transform: uppercase; letter-spacing: 3px; font-weight: 600; }
        .text-gradient { background: linear-gradient(135deg, #ff6a00, #ff0080); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        /* Buttons */
        .mystic-btn-primary { background: linear-gradient(135deg, #ff6a00, #ff0080); color: #fff; border: none; border-radius: 30px; padding: 12px 30px; font-weight: 700; letter-spacing: 1px; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(255, 106, 0, 0.3); }
        .mystic-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 10px 25px rgba(255, 106, 0, 0.5); color: #fff; }
        .mystic-btn-outline { background: transparent; color: var(--cosmic-accent); border: 2px solid var(--cosmic-accent); border-radius: 30px; padding: 10px 28px; font-weight: 600; transition: all 0.3s; }
        .mystic-btn-outline:hover { background: var(--cosmic-accent); color: #fff; box-shadow: 0 5px 15px var(--cosmic-glow); }

        /* Banner Section */
        .banner-section { position: relative; padding: 120px 0 100px; min-height: 80vh; display: flex; align-items: center; overflow: hidden; }
        .img-main-banner { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .img-main-banner img { width: 100%; height: 100%; object-fit: cover; }
        .banner-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(7,9,19,0.95) 0%, rgba(7,9,19,0.7) 50%, rgba(7,9,19,0.4) 100%); }
        .banner-title { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 800; line-height: 1.2; }
        .banner-desc { font-size: 1.1rem; color: #ddd; line-height: 1.8; max-width: 90%; }
        
        /* Cosmic Orbit Animation */
        .cosmic-orbit-container { position: relative; width: 400px; height: 400px; display: flex; align-items: center; justify-content: center; }
        .big-circle { position: absolute; width: 380px; height: 380px; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.2); animation: spinRight 40s linear infinite; }
        .small-circle { position: absolute; width: 240px; height: 240px; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.3); animation: spinLeft 25s linear infinite; }
        .icon-block { position: absolute; width: 50px; height: 50px; background: rgba(20,20,35,0.8); border: 1px solid rgba(255,106,0,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(255,106,0,0.2); backdrop-filter: blur(5px); }
        .icon-block img { width: 60%; object-fit: contain; }
        
        /* Positioning icons on orbits using CSS vars for clean math */
        .big-circle .icon-block:nth-child(1) { top: -25px; left: calc(50% - 25px); }
        .big-circle .icon-block:nth-child(2) { top: 20%; right: -10px; }
        .big-circle .icon-block:nth-child(3) { bottom: 20%; right: -10px; }
        .big-circle .icon-block:nth-child(4) { bottom: -25px; left: calc(50% - 25px); }
        .big-circle .icon-block:nth-child(5) { top: 40%; left: -20px; }
        
        .small-circle .icon-block:nth-child(1) { top: -25px; left: calc(50% - 25px); }
        .small-circle .icon-block:nth-child(2) { bottom: 10px; right: 0; }
        .small-circle .icon-block:nth-child(3) { bottom: 10px; left: 0; }
        
        .center-logo { position: absolute; z-index: 10; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; }
        .center-logo img { width: 100%; position: relative; z-index: 2; animation: float 4s ease-in-out infinite; }
        .glow-orb { position: absolute; width: 80%; height: 80%; background: var(--cosmic-accent); border-radius: 50%; filter: blur(30px); opacity: 0.6; animation: pulseGlow 3s infinite alternate; }

        @keyframes spinRight { 100% { transform: rotate(360deg); } }
        @keyframes spinLeft { 100% { transform: rotate(-360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes pulseGlow { 0% { opacity: 0.4; transform: scale(1); } 100% { opacity: 0.8; transform: scale(1.3); } }

        /* About Section */
        .about-part-section { padding: 100px 0; background: var(--cosmic-dark); }
        .moon-img { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.05); }
        .moon-img img { transition: transform 0.5s; width: 100%; display: block; }
        .moon-img:hover img { transform: scale(1.05); }
        .floating-element { position: absolute; top: -40px; right: -30px; z-index: 2; animation: float 5s ease-in-out infinite; }
        .floating-element img { width: 150px; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5)); }
        .experience-badge { position: absolute; bottom: 30px; left: -20px; background: linear-gradient(135deg, #ff6a00, #ff0080); padding: 25px 30px; border-radius: 20px; box-shadow: 0 15px 30px rgba(255,106,0,0.3); z-index: 3; }
        .experience-badge h4 { font-size: 2.5rem; font-weight: 800; margin: 0; line-height: 1; }
        .experience-badge span { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9; }

        /* Services Section */
        .services-section { padding: 100px 0; background: linear-gradient(180deg, var(--cosmic-dark) 0%, var(--cosmic-navy) 100%); }
        .service-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 30px; margin-bottom: 25px; transition: all 0.3s ease; text-align: center; backdrop-filter: blur(10px); }
        .service-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.06); border-color: rgba(255,106,0,0.3); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
        .icon-wrapper { width: 70px; height: 70px; margin: 0 auto; background: rgba(255,106,0,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,106,0,0.2); transition: all 0.3s; }
        .service-card:hover .icon-wrapper { background: var(--cosmic-accent); border-color: #fff; transform: scale(1.1); }
        .icon-wrapper img { width: 35px; object-fit: contain; filter: brightness(0) invert(1); transition: 0.3s; }
        
        .service-center-img .img-anim { position: relative; z-index: 1; }
        .service-center-img .img-anim img { width: 280px; animation: spinRight 60s linear infinite; opacity: 0.5; }
        .center-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; z-index: 2; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.8)); }

        /* Video Testimonials */
        .testimonial-section { padding: 80px 0; background: var(--cosmic-navy); overflow: hidden; }
        .video-wrapper { display: flex; align-items: center; position: relative; }
        .video-track { display: flex; gap: 24px; overflow-x: auto; padding: 20px 0; scroll-snap-type: x mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .video-track::-webkit-scrollbar { display: none; }
        .video-card { flex: 0 0 260px; scroll-snap-align: center; transition: transform 0.4s; }
        .video-card:hover { transform: scale(1.03) translateY(-2px); }
        .video-inner { position: relative; border-radius: 20px; overflow: hidden; border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.4); aspect-ratio: 9/16; }
        .video-inner video { width: 100%; height: 100%; object-fit: cover; }
        .video-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
        .video-inner:hover .video-overlay { opacity: 1; }
        .nav-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; border-radius: 50%; border: none; background: rgba(255,255,255,0.1); color: #fff; backdrop-filter: blur(5px); z-index: 10; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; transition: all 0.3s; }
        .nav-btn:hover { background: var(--cosmic-accent); box-shadow: 0 0 20px var(--cosmic-glow); }
        .left-btn { left: 10px; }
        .right-btn { right: 10px; }

        /* Premium Reports */
        .reports-section { padding: 100px 0; background: linear-gradient(180deg, var(--cosmic-navy) 0%, var(--cosmic-dark) 100%); }
        .premium-report-card { border-radius: 20px; overflow: hidden; background: rgba(20,20,30,0.8); border: 1px solid rgba(255,255,255,0.08); transition: all 0.4s ease; box-shadow: 0 20px 40px rgba(0,0,0,0.4); display: flex; flex-direction: column; }
        .premium-report-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.2); box-shadow: 0 30px 60px rgba(0,0,0,0.6); }
        
        .card-header-art { padding: 40px 20px 30px; text-align: center; position: relative; }
        .theme-emerald .card-header-art { background: linear-gradient(135deg, #0ba360 0%, #3cba92 100%); }
        .theme-amethyst .card-header-art { background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%); }
        .theme-ruby .card-header-art { background: linear-gradient(135deg, #ff0844 0%, #ffb199 100%); }
        
        .badge-discount { position: absolute; top: 15px; right: 15px; background: #fff; color: #333; padding: 6px 12px; font-size: 0.75rem; font-weight: 800; border-radius: 30px; text-transform: uppercase; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .report-title { font-family: 'Merriweather Sans', serif; font-weight: 700; font-size: 1.8rem; margin-bottom: 5px; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.3); }
        .report-price-hero { font-size: 1.5rem; font-weight: 800; margin: 0; color: rgba(255,255,255,0.9); }
        
        .card-body-content { padding: 30px 25px; flex-grow: 1; display: flex; flex-direction: column; }
        .card-body-content h4 { font-size: 1.3rem; font-weight: 700; margin-bottom: 15px; color: #fff; }
        .card-body-content p { font-size: 1rem; line-height: 1.6; flex-grow: 1; }
        
        .card-footer-action { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
        .price-tag { font-size: 1.4rem; font-weight: 800; color: #fff; display: flex; align-items: baseline; gap: 8px; }
        .price-tag del { font-size: 0.9rem; color: #888; font-weight: 400; }
        
        .action-btns { display: flex; gap: 10px; }
        .btn-read, .btn-buy { padding: 8px 18px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; transition: all 0.3s; border: none; cursor: pointer; }
        .btn-read { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; }
        .btn-read:hover { background: rgba(255,255,255,0.1); }
        .btn-buy { background: #fff; color: #333; }
        .btn-buy:hover { background: #f0f0f0; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255,255,255,0.2); }
        .theme-emerald .btn-buy { color: #0ba360; }
        .theme-amethyst .btn-buy { color: #6c5ce7; }
        .theme-ruby .btn-buy { color: #ff0844; }

        /* Media Queries */
        @media (max-width: 991px) {
          .banner-section { text-align: center; padding-top: 150px; }
          .banner-desc { margin: 0 auto 30px; }
          .experience-badge { left: 50%; transform: translateX(-50%); bottom: -20px; }
          .img-box01 { margin-bottom: 40px; }
        }
        @media (max-width: 767px) {
          .about-part-section { padding: 60px 0; text-align: center; }
          .services-section { padding: 60px 0; }
          .video-card { flex: 0 0 200px; }
        }
      `}</style>
    </>
  );
}

export default Home;
