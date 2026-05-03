import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConsultationModal from '../components/ConsultationModal';

function Home() {
  const trackRef = useRef(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    consultationType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Proper Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!formData.name || formData.name.length < 3) {
      toast.error('Please enter a valid name (min 3 chars).');
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.consultationType) {
      toast.error('Please select a consultation type.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Consultation', courseName: 'Professional Consultation' }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Consultation booked successfully!');
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', consultationType: '', message: '' });
      } else {
        toast.error(data.error || data.message || 'Failed to book. Please try again.');
      }
    } catch (err) {
      toast.error('Connection Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

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
                  <button onClick={handleOpenModal} className="btn mystic-btn-primary">ENROLL NOW <i className="fas fa-arrow-right ms-2"></i></button>
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
                  <figure className="moon-img" data-aos="fade-right">
                    <img alt="moon" src="/images/moon.jpg" />
                  </figure>
                  <figure className="floating-element" data-aos="fade-left">
                    <img alt="woman" src="/images/bg-bannerpic.jpg" />
                  </figure>
                  <figure className="bottom-img" data-aos="fade-up">
                    <img alt="tarot" src="/images/premium_tarot.png" />
                  </figure>
                  <div className="experience-badge text-center" data-aos="zoom-in">
                    <h4>16+</h4>
                    <span>Years Experience</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h5 className="section-subtitle" data-aos="fade-down">About Astro Ava</h5>
                <h2 className="section-title my-3" data-aos="fade-down">
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
        {/* Services Section */}
        <section className="services-section w-100">
          <div className="container">
            <div className="text-center mb-5">
              <h5 className="section-subtitle expertise-subtitle" data-aos="fade-up">⭐ Our Expertise ⭐</h5>
              <h2 className="section-title mt-2" data-aos="fade-up">Guiding You Through Life</h2>
              <p className="mx-auto mt-3" style={{maxWidth: '650px', fontSize: '1.2rem', fontWeight: '500', color: '#2c3e50'}} data-aos="fade-down">
                Our Astrologers Are Dedicated to Providing Clarity and Direction
              </p>
            </div>
            
            <div className="row g-4 align-items-center mt-4">
              <div className="col-md-6 col-lg-4">
                <div className="service-card" data-aos="fade-up" data-aos-delay="100">
                  <div className="service-card-header">
                    <div className="icon-wrapper"><img alt="horoscope" src="/images/3013143.png" /></div>
                    <h4 className="">Personal Horoscope</h4>
                  </div>
                  <p className="mt-3">Learn astrology from experienced and trusted mentors for life clarity.</p>
                </div>
                <div className="service-card mt-4" data-aos="fade-up" data-aos-delay="200">
                  <div className="service-card-header">
                    <div className="icon-wrapper"><img alt="marriage" src="/images/8596897.png" /></div>
                    <h4 className="">Relationships</h4>
                  </div>
                  <p className="mt-3">Gain practical knowledge with real-life case studies and guidance.</p>
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
                  <div className="service-card-header">
                    <div className="icon-wrapper"><img alt="career" src="/images/867780.png" /></div>
                    <h4 className="">Career & Business</h4>
                  </div>
                  <p className="mt-3">Understand career and financial predictions deeply with experts.</p>
                </div>
                <div className="service-card mt-4" data-aos="fade-up" data-aos-delay="400">
                  <div className="service-card-header">
                    <div className="icon-wrapper"><img alt="muhurat" src="/images/9289285.png" /></div>
                    <h4 className="">Muhurat Timing</h4>
                  </div>
                  <p className="mt-3">Find the most auspicious time for your life's important endeavors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Video Testimonials - Professional Production Level */}
    {/* Video Testimonials */}
<section className="testimonial-section">
  <div className="container">
    <div className="section-header text-center mb-5">
      <span className="section-badge" data-aos="fade-up">
        Real Stories
      </span>
      {/* Heading with gradient color on "Clients Say" only */}
      <h2 className="section-title mt-3">
        What Our <span className="text-gradient">Clients Say</span>
      </h2>
      <p className="section-description mx-auto mt-3">
        Trusted by thousands of satisfied clients worldwide
      </p>
    </div>
    
    <div className="testimonial-slider-wrapper position-relative">
      <button className="nav-btn left-btn" onClick={() => scrollTestimonials('left')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="testimonial-track" ref={trackRef}>
        {/* Testimonial Card 1 */}
        <div className="testimonial-card">
          <div className="card-inner">
            <div className="quote-icon">“</div>
            <div className="video-container">
              <video src="/videohomefinal.mp4" poster="/images/bg-bannerpic.jpg" preload="auto" muted loop playsInline></video>
              <div className="play-btn-overlay">
                <div className="play-circle">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "The astrological guidance I received completely transformed my perspective. Highly recommended!"
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img src="/images/avatar1.jpg" alt="client" onError={(e) => e.target.src = 'https://randomuser.me/api/portraits/women/1.jpg'} />
                </div>
                <div className="client-details">
                  <h4>Priya Sharma</h4>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        {/* Testimonial Card 3 */}
        <div className="testimonial-card">
          <div className="card-inner">
            <div className="quote-icon">“</div>
            <div className="video-container">
              <video src="/videohomefinal.mp4" poster="/images/bg-bannerpic.jpg" preload="auto" muted loop playsInline></video>
              <div className="play-btn-overlay">
                <div className="play-circle">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "The career guidance helped me make the right decisions. I'm now in a much better place professionally."
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img src="/images/avatar3.jpg" alt="client" onError={(e) => e.target.src = 'https://randomuser.me/api/portraits/women/3.jpg'} />
                </div>
                <div className="client-details">
                  <h4>Anjali Patel</h4>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Card 4 */}
        <div className="testimonial-card">
          <div className="card-inner">
            <div className="quote-icon">“</div>
            <div className="video-container">
              <video src="/videohomefinal.mp4" poster="/images/bg-bannerpic.jpg" preload="auto" muted loop playsInline></video>
              <div className="play-btn-overlay">
                <div className="play-circle">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "Amazing experience! The remedies suggested were simple yet effective. Feeling blessed."
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img src="/images/avatar4.jpg" alt="client" onError={(e) => e.target.src = 'https://randomuser.me/api/portraits/men/4.jpg'} />
                </div>
                <div className="client-details">
                  <h4>Vikram Singh</h4>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Card 5 */}
        <div className="testimonial-card">
          <div className="card-inner">
            <div className="quote-icon">“</div>
            <div className="video-container">
              <video src="/videohomefinal.mp4" poster="/images/bg-bannerpic.jpg" preload="auto" muted loop playsInline></video>
              <div className="play-btn-overlay">
                <div className="play-circle">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "The relationship compatibility analysis was spot on! Truly grateful for this service."
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img src="/images/avatar5.jpg" alt="client" onError={(e) => e.target.src = 'https://randomuser.me/api/portraits/women/5.jpg'} />
                </div>
                <div className="client-details">
                  <h4>Neha Gupta</h4>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button className="nav-btn right-btn" onClick={() => scrollTestimonials('right')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
    
    {/* Navigation Dots */}
    <div className="slider-dots">
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  </div>
</section>



        {/* Popular Reports Section */}
        <section className="reports-section">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title">Most Popular Reports</h2>
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

      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <style jsx>{`
        body {
          background-color: var(--cosmic-bg);
          color: var(--cosmic-text);
          font-family: 'Inter', sans-serif;
        }

        .section-title {
          font-size: clamp(2.5rem, 6vw, 3.8rem);
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: var(--cosmic-text);
          line-height: 1.1;
        }

        .section-subtitle {
          color: #000;
          font-size: 1.4rem;
          text-transform: none;
          letter-spacing: 1px;
          font-weight: 900;
          font-style: italic;
          margin-bottom: 20px;
          display: block;
          font-family: 'Playfair Display', serif;
        }

        .expertise-subtitle {
          color: var(--cosmic-accent-pink) !important;
          font-size: clamp(1.4rem, 4vw, 2rem) !important;
          font-weight: 800 !important;
          letter-spacing: 3px !important;
          text-transform: uppercase !important;
          font-style: normal !important;
          font-family: 'Inter', sans-serif !important;
        }

        .section-desc {
          color: #000 !important;
          font-size: 1.2rem;
          line-height: 1.8;
          font-weight: 500;
        }

        .text-gradient {
          background: var(--cosmic-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mystic-btn-primary {
          background: var(--cosmic-gradient);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 16px 40px;
          font-weight: 800;
          letter-spacing: 1.5px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 10px 25px rgba(227, 27, 122, 0.3);
          text-transform: uppercase;
          font-size: 1rem;
        }

        .mystic-btn-primary:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(227, 27, 122, 0.5);
          color: #fff;
        }

        .mystic-btn-outline {
          background: var(--cosmic-white);
          color: var(--cosmic-text);
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          padding: 12px 35px;
          font-weight: 800;
          font-size: 1.15rem;
          transition: 0.3s;
          box-shadow: var(--premium-shadow);
          display: inline-block;
        }

        .mystic-btn-outline:hover {
          background: var(--cosmic-accent-soft);
          border-color: var(--cosmic-accent-pink);
          color: var(--cosmic-accent-pink);
          transform: translateY(-3px);
        }

        /* Banner Section */
        .banner-section {
          position: relative;
          padding: 180px 0 120px;
          min-height: 95vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--cosmic-bg);
        }

        .img-main-banner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .img-main-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.15;
          filter: saturate(0.5);
        }

        .banner-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, var(--cosmic-accent-soft), transparent 60%);
        }

        .banner-title {
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1;
          color: var(--cosmic-text);
          font-family: 'Playfair Display', serif;
        }

        .banner-desc {
          font-size: 1.35rem;
          color: var(--cosmic-text-muted) !important;
          line-height: 1.8;
          max-width: 90%;
          font-weight: 500;
        }

        .spm-small {
          color: #000;
          font-weight: 900;
          font-style: italic;
          text-transform: none;
          letter-spacing: 1px;
          font-size: 1.2rem;
          margin-bottom: 25px;
          display: block;
          font-family: 'Playfair Display', serif;
        }

        /* Cosmic Orbit */
        .cosmic-orbit-container {
          position: relative;
          width: 500px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .big-circle {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          border: 1px dashed var(--glass-border);
          animation: spinRight 40s linear infinite;
        }

        .small-circle {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1px dashed var(--cosmic-accent-pink);
          opacity: 0.3;
          animation: spinLeft 25s linear infinite;
        }

        .icon-block {
          position: absolute;
          width: 65px;
          height: 65px;
          background: var(--cosmic-white);
          border: 1.5px solid var(--glass-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--premium-shadow);
          transition: all 0.4s;
        }

        .icon-block img {
          width: 50%;
          filter: grayscale(1) brightness(0.2);
          opacity: 0.7;
        }

        .icon-block:hover {
          transform: scale(1.2) rotate(10deg);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 15px 30px rgba(227, 27, 122, 0.2);
        }

        .icon-block:hover img {
          filter: none;
          opacity: 1;
        }

        .center-logo {
          position: absolute;
          z-index: 10;
          width: 180px;
          height: 180px;
        }

        .center-logo img {
          width: 100%;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
          animation: float 5s ease-in-out infinite;
        }

        .glow-orb {
          position: absolute;
          width: 120%;
          height: 120%;
          background: var(--cosmic-gradient);
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.2;
          top: -10%;
          left: -10%;
        }

        @keyframes spinRight { 100% { transform: rotate(360deg); } }
        @keyframes spinLeft { 100% { transform: rotate(-360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

        /* About Section Staggered Layout */
        .img-box01 {
          position: relative;
          height: 550px;
          width: 100%;
        }

        .moon-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 85%;
          height: 220px;
          border-radius: 40px;
          border: 12px solid var(--cosmic-bg);
          box-shadow: var(--premium-shadow);
          overflow: hidden;
          z-index: 1;
          margin: 0;
        }

        .moon-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .floating-element {
          position: absolute;
          top: 120px;
          right: 0;
          width: 60%;
          height: 350px;
          z-index: 2;
          margin: 0;
        }

        .floating-element img {
          width: 100%;
          height: 100%;
          border-radius: 30px;
          object-fit: cover;
          box-shadow: var(--premium-shadow);
          transform: perspective(1000px) rotateY(-5deg);
        }

        .bottom-img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 55%;
          height: 280px;
          z-index: 3;
          margin: 0;
        }

        .bottom-img img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          object-fit: cover;
          box-shadow: var(--premium-shadow);
          transform: perspective(1000px) rotateY(5deg);
        }

        .experience-badge {
          background: var(--cosmic-white);
          padding: 20px 30px;
          border-radius: 30px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          position: absolute;
          bottom: -20px;
          right: 20px;
          z-index: 10;
        }

        .experience-badge h4 { 
          font-size: 2.8rem; 
          font-weight: 800; 
          background: var(--cosmic-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0; 
        }
        .experience-badge span { 
          font-size: 0.9rem; 
          font-weight: 800; 
          text-transform: uppercase; 
          letter-spacing: 1px; 
          color: var(--cosmic-text-muted); 
        }

        @media (max-width: 991px) {
          .img-box01 {
            height: 450px;
            margin-bottom: 50px;
          }
          .moon-img { height: 180px; width: 90%; }
          .floating-element { height: 280px; top: 100px; width: 65%; }
          .bottom-img { height: 220px; width: 60%; }
        }

        @media (max-width: 576px) {
          .img-box01 {
            height: 380px;
          }
          .moon-img { height: 140px; border-width: 6px; border-radius: 20px; }
          .floating-element { height: 220px; top: 80px; border-radius: 20px; }
          .bottom-img { height: 180px; border-radius: 15px; }
          .experience-badge {
            padding: 12px 20px;
            bottom: -10px;
            right: 10px;
          }
          .experience-badge h4 { font-size: 1.8rem; }
          .experience-badge span { font-size: 0.6rem; }
        }

        /* Services */
        .services-section {
          padding: 120px 0;
          background: var(--cosmic-bg);
        }

        .service-card {
          background: var(--cosmic-white);
          padding: 25px 20px;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: auto;
          min-height: 140px;
          margin-bottom: 10px;
          position: relative;
        }

        @media (min-width: 768px) {
          .service-card {
            padding: 35px;
            margin-bottom: 20px;
            min-height: 160px;
          }
        }

        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 0;
          background: var(--cosmic-accent-pink);
          transition: 0.3s;
        }

        .service-card:hover::after {
          height: 100%;
        }

        @media (min-width: 992px) {
          .service-card {
            height: calc(50% - 12px);
            margin-bottom: 0;
          }
        }

        .service-card:hover {
          transform: translateY(-12px);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 25px 50px rgba(0,0,0,0.06);
        }

        .service-card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 10px;
        }

        .icon-wrapper {
          width: 55px;
          height: 55px;
          background: #fdf5f2;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(93, 64, 55, 0.1);
        }

        .icon-wrapper img {
          width: 35px;
          height: 35px;
          object-fit: contain;
          /* Forced Dark Brown Filter */
          filter: brightness(0) saturate(100%) invert(18%) sepia(13%) saturate(2258%) hue-rotate(318deg) brightness(91%) contrast(93%) !important;
          transition: 0.4s;
        }

        .service-card:hover .icon-wrapper img {
          transform: scale(1.1);
        }

        .service-card h4 {
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
        }

        .service-card p {
          font-size: clamp(1.15rem, 2vw, 1.35rem);
          font-weight: 500;
          color: var(--cosmic-text-muted);
          line-height: 1.6;
          margin-bottom: 0;
        }

        /* Testimonials Section - Professional */
        .testimonial-section {
          padding: 100px 0;
          background: #fff;
          overflow: hidden;
          border-top: 1px solid #f1f5f9;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 25px;
          background: rgba(108,60,225,0.1);
          border-radius: 50px;
          color: #6C3CE1;
          font-weight: 800;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .badge-icon {
          font-size: 1.1rem;
        }

        .section-description {
          max-width: 500px;
          font-size: 1.2rem;
          color: #6B7280;
        }

        .testimonial-slider-wrapper {
          position: relative;
          padding: 20px 0;
          max-width: 1400px;
          margin: 0 auto;
        }

        .testimonial-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 10px 40px;
        }

        .testimonial-track::-webkit-scrollbar {
          display: none;
        }

        .testimonial-card {
          flex: 0 0 320px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
        }

        .card-inner {
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(108,60,225,0.08);
          position: relative;
        }

        .testimonial-card:hover .card-inner {
          box-shadow: 0 20px 40px rgba(108,60,225,0.12);
          border-color: rgba(108,60,225,0.2);
        }

        .quote-icon {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 4rem;
          font-family: Georgia, serif;
          color: rgba(108,60,225,0.1);
          line-height: 1;
          z-index: 1;
        }

        .video-container {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
          cursor: pointer;
        }

        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .testimonial-card:hover .video-container video {
          transform: scale(1.05);
        }

        .play-btn-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-container:hover .play-btn-overlay {
          opacity: 1;
        }

        .play-circle {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .play-circle i {
          color: #6C3CE1;
          font-size: 1.2rem;
          margin-left: 3px;
        }

        .play-circle:hover {
          transform: scale(1.1);
          background: #6C3CE1;
        }

        .play-circle:hover i {
          color: white;
        }

        .testimonial-content {
          padding: 20px;
        }

        .testimonial-text {
          font-size: 1.3rem;
          line-height: 1.7;
          color: #1a1a1a;
          margin-bottom: 20px;
          font-style: italic;
          min-height: 80px;
          font-weight: 500;
        }

        .client-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(108,60,225,0.1);
        }

        .client-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #6C3CE1;
        }

        .client-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .client-details h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 4px;
        }

        .rating {
          display: flex;
          gap: 3px;
        }

        .rating i {
          font-size: 0.7rem;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 1px solid rgba(108,60,225,0.2);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .nav-btn:hover {
          background: #6C3CE1;
          border-color: #6C3CE1;
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn:hover svg {
          stroke: white;
        }

        .nav-btn svg {
          stroke: #6C3CE1;
          transition: stroke 0.3s ease;
        }

        .left-btn {
          left: -20px;
        }

        .right-btn {
          right: -20px;
        }

        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(108,60,225,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          width: 25px;
          border-radius: 10px;
          background: #6C3CE1;
        }

        .dot:hover {
          background: #6C3CE1;
          transform: scale(1.2);
        }

        /* Reports Section */
        .reports-section {
          padding: 120px 0;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
        }

        .premium-report-card {
          border-radius: 24px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #f1f5f9;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          box-shadow: 0 15px 40px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
        }

        .premium-report-card:hover {
          transform: translateY(-12px);
          border-color: var(--cosmic-accent);
          box-shadow: 0 40px 80px rgba(0,0,0,0.08);
        }

        .card-header-art {
          padding: 50px 25px 40px;
          text-align: center;
          position: relative;
        }

        .theme-emerald .card-header-art {
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
        }

        .theme-amethyst .card-header-art {
          background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
        }

        .theme-ruby .card-header-art {
          background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
        }

        .badge-discount {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #fff;
          color: #1e293b;
          padding: 7px 14px;
          font-size: 1rem;
          font-weight: 800;
          border-radius: 50px;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .report-title {
          font-family: 'Merriweather Sans', serif;
          font-weight: 800;
          font-size: 2rem;
          margin-bottom: 8px;
          color: #1e293b;
        }

        .report-price-hero {
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0;
          color: #334155;
        }

        .card-body-content {
          padding: 35px 30px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-body-content h4 {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 15px;
          color: var(--cosmic-text);
        }

        .card-body-content p {
          font-size: 1.2rem;
          line-height: 1.6;
          flex-grow: 1;
          color: var(--cosmic-text-muted);
        }

        .card-footer-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 25px;
          padding-top: 25px;
          border-top: 1px solid #f1f5f9;
        }

        .price-tag {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--cosmic-text);
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .price-tag del {
          font-size: 1rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .action-btns {
          display: flex;
          gap: 12px;
        }

        .btn-read, .btn-buy {
          padding: 10px 22px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
        }

        .btn-read {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: var(--cosmic-text);
        }

        .btn-read:hover {
          background: #e2e8f0;
        }

        .btn-buy {
          background: var(--cosmic-text);
          color: #fff;
        }

        .btn-buy:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        .theme-emerald .btn-buy { background: #10b981; }
        .theme-amethyst .btn-buy { background: #8b5cf6; }
        .theme-ruby .btn-buy { background: #ef4444; }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .banner-title { font-size: 3.5rem; }
          .cosmic-orbit-container { width: 400px; height: 400px; }
          .big-circle { width: 380px; height: 380px; }
          .small-circle { width: 250px; height: 250px; }
        }

        @media (max-width: 991px) {
          .banner-section { text-align: center; padding: 120px 0 80px; }
          .banner-desc { margin: 0 auto 30px; }
          .img-box01 { margin-bottom: 80px; }
          .experience-badge { left: 50%; transform: translateX(-50%); bottom: -30px; }
          .cosmic-orbit-container { width: 350px; height: 350px; margin: 40px auto 0; }
          .big-circle { width: 320px; height: 320px; }
          .small-circle { width: 220px; height: 220px; }
          .icon-block { width: 45px; height: 45px; }
          .section-title { font-size: 2.8rem; }
        }

        @media (max-width: 767px) {
          .banner-section { padding-top: 100px; }
          .banner-title { font-size: 2.5rem; }
          .banner-desc { font-size: 1.1rem; }
          .about-part-section, .services-section, .testimonial-section, .reports-section { padding: 80px 0; }
          .section-title { font-size: 2.2rem; }
          .testimonial-card { flex: 0 0 280px; }
          .video-container { height: 160px; }
          .testimonial-text { font-size: 1.15rem; min-height: 80px; }
          .section-badge { font-size: 1.1rem; padding: 8px 20px; }
          .section-description { font-size: 1.3rem !important; max-width: 100%; color: #4B5563; }
          .nav-btn { width: 32px; height: 32px; }
          .left-btn { left: -10px; }
          .right-btn { right: -10px; }
          .cosmic-orbit-container { width: 280px; height: 280px; }
          .big-circle { width: 260px; height: 260px; }
          .small-circle { width: 180px; height: 180px; }
          .icon-block { width: 40px; height: 40px; }
          .experience-badge { padding: 20px 25px; border-radius: 18px; }
          .experience-badge h4 { font-size: 2rem; }
        }

        @media (max-width: 576px) {
          .banner-title { font-size: 2.2rem; }
          .testimonial-card { flex: 0 0 260px; }
          .video-container { height: 140px; }
          .testimonial-content { padding: 16px; }
          .client-avatar { width: 38px; height: 38px; }
          .client-details h4 { font-size: 1.1rem; }
          .rating i { font-size: 0.9rem; }
          .cosmic-orbit-container { width: 240px; height: 240px; }
          .big-circle { width: 220px; height: 220px; }
          .small-circle { width: 150px; height: 150px; }
          .icon-block { width: 35px; height: 35px; }
          .action-btns { flex-direction: column; width: 100%; max-width: 300px; margin: 0 auto; }
          .mystic-btn-primary { width: 100%; text-align: center; }
          .mystic-btn-outline { 
            width: auto !important; 
            padding: 10px 25px !important; 
            font-size: 0.95rem !important;
            margin: 0 auto;
            display: inline-block;
          }
          .experience-badge { width: 160px; padding: 15px; }
          .experience-badge h4 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}

export default Home;