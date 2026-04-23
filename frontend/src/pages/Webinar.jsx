import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Webinar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple Phone Validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Webinar', courseName: '2-Day Mega Astrology Webinar' }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Registration initiated. Redirecting to payment...');
        navigate(data.paymentUrl);
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="webinar-landing">
      {/* 1. Hero Section */}
      <section className="webinar-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="pulse-badge">Live Online Webinar</div>
              <h1 className="hero-title">
                Struggling to Find Direction in Life? <br/>
                <span className="text-highlight">Discover Your Cosmic Blueprint</span>
              </h1>
              
              <div className="hero-video-wrapper mt-4">
                {/* Placeholder for actual sales video */}
                <video src="/videohomefinal.mp4" controls poster="/images/bg-bannerpic.jpg" className="sales-video"></video>
              </div>

              <div className="webinar-meta mt-4">
                <div className="meta-item">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Upcoming Weekend</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-clock"></i>
                  <span>7:00 PM - 9:00 PM IST</span>
                </div>
              </div>
            </div>
            
            <div className="hero-form-wrapper">
              <div className="lead-form-card">
                <div className="form-header">
                  <h3>Reserve Your Seat</h3>
                  <p className="alert-text"><i className="fas fa-exclamation-circle"></i> Only 50 Seats Left!</p>
                </div>
                <form onSubmit={handleSubmit} className="lead-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your best email" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number" />
                  </div>
                  <button type="submit" className="cta-button primary-cta ripple-effect w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Book Your Free Seat Now'}
                  </button>
                  <p className="secure-text text-center mt-3"><i className="fas fa-lock"></i> Your data is 100% secure.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authority / Trust Section */}
      <section className="authority-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-number">100,000+</h3>
              <p className="stat-label">Students Mentored</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">4.9/5</h3>
              <p className="stat-label">Average Rating</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">10+</h3>
              <p className="stat-label">Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Who Should Attend */}
      <section className="audience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Who Is This Webinar For?</h2>
            <div className="header-underline"></div>
          </div>
          <div className="audience-grid">
            <div className="audience-card">
              <div className="check-icon"><i className="fas fa-check-circle"></i></div>
              <p>Individuals feeling lost in their career or personal life.</p>
            </div>
            <div className="audience-card">
              <div className="check-icon"><i className="fas fa-check-circle"></i></div>
              <p>Anyone curious about how planetary movements affect them.</p>
            </div>
            <div className="audience-card">
              <div className="check-icon"><i className="fas fa-check-circle"></i></div>
              <p>People looking to make confident, timing-based decisions.</p>
            </div>
            <div className="audience-card">
              <div className="check-icon"><i className="fas fa-check-circle"></i></div>
              <p>Aspiring astrologers wanting a professional foundation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What You Will Learn */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What You Will Discover</h2>
            <div className="header-underline"></div>
          </div>
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-number">01</div>
              <div className="benefit-text">
                <h4>Read Your Own Chart</h4>
                <p>Master the basics of identifying your ascendant, moon sign, and sun sign.</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">02</div>
              <div className="benefit-text">
                <h4>Unlock Wealth Yogas</h4>
                <p>Discover planetary combinations in your chart that indicate financial success.</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">03</div>
              <div className="benefit-text">
                <h4>Timing of Events</h4>
                <p>Learn how Dashas and Transits trigger major life events like marriage and career shifts.</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">04</div>
              <div className="benefit-text">
                <h4>Remedies That Work</h4>
                <p>Simple, practical astrological remedies to remove obstacles in your daily life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Instructor Section */}
      <section className="instructor-section">
        <div className="container">
          <div className="instructor-grid">
            <div className="instructor-image">
              <img src="/images/middle-img.png" alt="Instructor" />
            </div>
            <div className="instructor-info">
              <h5 className="sub-heading">MEET YOUR MENTOR</h5>
              <h2 className="instructor-name">Astro Ava</h2>
              <p className="instructor-bio">
                With over 16 years of deep astrological research and practice, Astro Ava has transformed the lives of over 100,000 individuals globally. Known for pinpoint accuracy and practical remedies, she bridges ancient Vedic wisdom with modern life challenges.
              </p>
              <ul className="instructor-achievements">
                <li><i className="fas fa-star"></i> Featured in Top Astrology Journals</li>
                <li><i className="fas fa-star"></i> Gold Medalist in Vedic Astrology</li>
                <li><i className="fas fa-star"></i> Consultant to Top Industry Leaders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Webinar Breakdown */}
      <section className="breakdown-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">2-Day Itinerary</h2>
            <div className="header-underline mx-auto"></div>
          </div>
          <div className="days-grid">
            <div className="day-card">
              <div className="day-header">DAY 1</div>
              <h3 className="day-title">The Foundation</h3>
              <ul className="day-content">
                <li><i className="fas fa-play"></i> Understanding the 12 Zodiac Signs & Houses</li>
                <li><i className="fas fa-play"></i> The role of 9 Planets in your life</li>
                <li><i className="fas fa-play"></i> Decoding your basic birth chart</li>
                <li><i className="fas fa-play"></i> Q&A Session</li>
              </ul>
            </div>
            <div className="day-card">
              <div className="day-header">DAY 2</div>
              <h3 className="day-title">Prediction & Remedies</h3>
              <ul className="day-content">
                <li><i className="fas fa-play"></i> Identifying career and wealth indicators</li>
                <li><i className="fas fa-play"></i> Relationship compatibility basics</li>
                <li><i className="fas fa-play"></i> Effective, low-cost daily remedies</li>
                <li><i className="fas fa-play"></i> Live Chart Reading Examples</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Video Testimonials */}
      <section className="video-testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">What Our Students Say</h2>
            <div className="header-underline mx-auto"></div>
          </div>
          <div className="video-testimonials-grid">
            {[1, 2, 3].map((i) => (
              <div className="video-testimonial-card" key={i}>
                <div className="video-container">
                  <video src="/videohomefinal.mp4" controls poster={`/images/bg-bannerpic.jpg`}></video>
                </div>
                <div className="video-info">
                  <h4>Success Story #{i}</h4>
                  <p>How I changed my life with Astrology.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Life-Changing Experiences</h2>
            <div className="header-underline mx-auto"></div>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"I was completely lost in my career. This webinar gave me exact timelines on when things would shift, and it was 100% accurate!"</p>
              <p className="reviewer-name">- Priya S.</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"Astro Ava breaks down complex concepts so easily. I learned more in 2 days than I did reading books for months."</p>
              <p className="reviewer-name">- Rahul M.</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"The remedies suggested actually work. My business started picking up just weeks after applying her guidance."</p>
              <p className="reviewer-name">- Sneha T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Urgency Section */}
      <section className="urgency-section">
        <div className="container text-center">
          <h2>Time is Running Out!</h2>
          <p>Registration closes soon. Secure your spot before we reach maximum capacity.</p>
          <div className="countdown-timer">
            <div className="time-block">
              <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="time-colon">:</div>
            <div className="time-block">
              <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="time-label">Minutes</span>
            </div>
            <div className="time-colon">:</div>
            <div className="time-block">
              <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="final-cta-section">
        <div className="container text-center">
          <h2 className="final-title">Ready to Take Control of Your Destiny?</h2>
          <p className="final-subtitle">Join thousands of others who have found clarity and success through astrology.</p>
          <button className="cta-button primary-cta pulse-anim">
            Yes! Claim My Free Spot Now
          </button>
          <p className="secure-text"><i className="fas fa-lock"></i> 100% Secure. No credit card required.</p>
        </div>
      </section>

      <style>{`
        :root {
          --brand-dark: #070913;
          --brand-navy: #0b1220;
          --brand-accent: #ff6a00;
          --brand-highlight: #ff0080;
          --brand-light: #ffffff;
          --brand-gray: #a0aec0;
          --gradient-bg: linear-gradient(135deg, #070913 0%, #1a0b2e 100%);
          --gradient-cta: linear-gradient(135deg, #ff6a00 0%, #ff9500 100%);
        }

        .webinar-landing {
          font-family: 'Inter', 'Merriweather Sans', sans-serif;
          background-color: var(--brand-dark);
          color: var(--brand-light);
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Typography & Utilities */
        .text-highlight {
          background: linear-gradient(135deg, var(--brand-accent), var(--brand-highlight));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-header { margin-bottom: 40px; }
        .section-title { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.2; margin-bottom: 10px; }
        .header-underline { height: 4px; width: 60px; background: var(--brand-accent); border-radius: 2px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-center { text-align: center; }
        .fw-bold { font-weight: 700; }

        /* Buttons */
        .cta-button {
          display: inline-block;
          background: var(--gradient-cta);
          color: #fff;
          font-size: 1.2rem;
          font-weight: 700;
          padding: 16px 40px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(255, 106, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .cta-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px rgba(255, 106, 0, 0.6);
        }

        /* 1. Hero Section */
        .webinar-hero {
          padding: 140px 0 80px;
          background: var(--gradient-bg);
          position: relative;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .pulse-badge {
          display: inline-block;
          background: rgba(255, 106, 0, 0.1);
          color: var(--brand-accent);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255, 106, 0, 0.3);
          font-weight: 600;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }
        .hero-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; line-height: 1.2; margin-bottom: 15px; }
        .hero-subtitle { font-size: 1.2rem; font-weight: 500; color: #e2e8f0; margin-bottom: 30px; }
        
        .hero-video-wrapper { width: 100%; max-width: 600px; border-radius: 16px; overflow: hidden; border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.5); }
        .sales-video { width: 100%; display: block; aspect-ratio: 16/9; object-fit: cover; }
        
        .hero-form-wrapper { position: relative; z-index: 10; }
        .lead-form-card { background: rgba(20,20,35,0.95); border: 1px solid rgba(255,106,0,0.3); padding: 35px 30px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); backdrop-filter: blur(10px); }
        .form-header h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 5px; color: #fff; text-align: center; }
        .form-header .alert-text { text-align: center; margin-bottom: 20px; }
        .form-group { margin-bottom: 20px; text-align: left; }
        .form-group label { display: block; font-size: 0.95rem; color: var(--brand-gray); margin-bottom: 8px; font-weight: 500; }
        .form-group input { width: 100%; padding: 14px 18px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.5); color: #fff; font-size: 1rem; transition: all 0.3s; }
        .form-group input:focus { border-color: var(--brand-accent); outline: none; box-shadow: 0 0 15px rgba(255,106,0,0.2); }
        .w-100 { width: 100%; }

        .webinar-meta {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 40px;
          background: rgba(255,255,255,0.03);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
        }
        .meta-item i { color: var(--brand-accent); font-size: 1.3rem; width: 24px; text-align: center; }
        .alert-text { color: #ff4757; font-weight: 700; }
        .alert-text i { color: #ff4757; }

        .hero-image-wrapper { position: relative; }
        .image-glow { position: absolute; width: 80%; height: 80%; background: var(--brand-highlight); filter: blur(80px); opacity: 0.3; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 0; }
        .hero-speaker-img { position: relative; width: 100%; max-width: 500px; z-index: 1; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5)); }
        .floating-badge { position: absolute; bottom: 40px; left: -20px; background: var(--brand-dark); border: 1px solid rgba(255,255,255,0.1); padding: 15px 25px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 2; display: flex; align-items: center; gap: 10px; font-size: 1.1rem; }
        .floating-badge span { color: var(--brand-accent); font-size: 1.5rem; }

        /* 2. Authority Section */
        .authority-section { padding: 40px 0; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; text-align: center; }
        .stat-number { font-size: 2.5rem; font-weight: 800; color: var(--brand-accent); margin-bottom: 5px; }
        .stat-label { font-size: 1.1rem; color: var(--brand-gray); text-transform: uppercase; letter-spacing: 1px; }

        /* 3. Who Should Attend */
        .audience-section { padding: 80px 0; background: var(--brand-dark); }
        .audience-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
        .audience-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 30px; border-radius: 16px; display: flex; align-items: flex-start; gap: 15px; transition: transform 0.3s; }
        .audience-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.04); }
        .check-icon { color: #00d2d3; font-size: 1.5rem; flex-shrink: 0; }
        .audience-card p { font-size: 1.1rem; line-height: 1.6; margin: 0; }

        /* 4. Benefits Section */
        .benefits-section { padding: 80px 0; background: var(--brand-navy); }
        .benefits-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px; }
        .benefit-item { display: flex; gap: 20px; align-items: flex-start; }
        .benefit-number { font-size: 3rem; font-weight: 900; color: rgba(255,106,0,0.2); line-height: 1; }
        .benefit-text h4 { font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; color: var(--brand-accent); }
        .benefit-text p { font-size: 1.1rem; color: var(--brand-gray); line-height: 1.6; }

        /* 5. Instructor Section */
        .instructor-section { padding: 100px 0; background: var(--brand-dark); }
        .instructor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .instructor-image img { width: 100%; max-width: 450px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .sub-heading { color: var(--brand-accent); letter-spacing: 3px; font-weight: 600; margin-bottom: 10px; }
        .instructor-name { font-size: 3rem; font-weight: 800; margin-bottom: 20px; }
        .instructor-bio { font-size: 1.1rem; color: var(--brand-gray); line-height: 1.8; margin-bottom: 30px; }
        .instructor-achievements { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px; }
        .instructor-achievements li { display: flex; align-items: center; gap: 10px; font-size: 1.1rem; font-weight: 500; }
        .instructor-achievements i { color: #feca57; }

        /* 6. Webinar Breakdown */
        .breakdown-section { padding: 100px 0; background: linear-gradient(180deg, var(--brand-navy) 0%, var(--brand-dark) 100%); }
        .days-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 50px; }
        .day-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,106,0,0.2); border-radius: 20px; padding: 40px; position: relative; overflow: hidden; }
        .day-header { position: absolute; top: 0; right: 0; background: var(--brand-accent); color: #fff; padding: 10px 20px; font-weight: 800; border-bottom-left-radius: 20px; }
        .day-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 25px; color: #fff; }
        .day-content { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px; }
        .day-content li { display: flex; align-items: flex-start; gap: 12px; font-size: 1.1rem; color: var(--brand-gray); line-height: 1.5; }
        .day-content i { color: var(--brand-highlight); font-size: 0.9rem; margin-top: 5px; }

        /* 7. Video Testimonials */
        .video-testimonials-section { padding: 80px 0; background: var(--brand-dark); }
        .video-testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
        .video-testimonial-card { background: rgba(255,255,255,0.03); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s; }
        .video-testimonial-card:hover { transform: translateY(-10px); }
        .video-container { width: 100%; aspect-ratio: 16/9; background: #000; }
        .video-container video { width: 100%; height: 100%; object-fit: cover; }
        .video-info { padding: 20px; }
        .video-info h4 { font-size: 1.2rem; margin-bottom: 5px; color: var(--brand-accent); }
        .video-info p { color: var(--brand-gray); font-size: 0.9rem; }

        /* 8. Testimonials */
        .testimonials-section { padding: 80px 0; background: var(--brand-dark); }
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 50px; }
        .testimonial-card { background: rgba(255,255,255,0.02); padding: 30px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
        .stars { color: #feca57; font-size: 1.2rem; margin-bottom: 15px; letter-spacing: 2px; }
        .review-text { font-size: 1.1rem; font-style: italic; color: var(--brand-gray); line-height: 1.6; margin-bottom: 20px; }
        .reviewer-name { font-weight: 700; color: #fff; }

        /* 8. Urgency Section */
        .urgency-section { padding: 60px 0; background: rgba(255,106,0,0.1); border-top: 1px solid rgba(255,106,0,0.2); border-bottom: 1px solid rgba(255,106,0,0.2); }
        .urgency-section h2 { font-size: 2.5rem; color: #fff; margin-bottom: 15px; }
        .countdown-timer { display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 30px; }
        .time-block { display: flex; flex-direction: column; align-items: center; background: rgba(0,0,0,0.4); padding: 15px 25px; border-radius: 12px; min-width: 100px; border: 1px solid rgba(255,255,255,0.1); }
        .time-value { font-size: 3rem; font-weight: 800; color: var(--brand-accent); line-height: 1; }
        .time-label { font-size: 0.9rem; text-transform: uppercase; color: var(--brand-gray); margin-top: 5px; }
        .time-colon { font-size: 3rem; font-weight: 800; color: rgba(255,255,255,0.3); padding-bottom: 25px; }

        /* 9. Final CTA */
        .final-cta-section { padding: 100px 0; background: var(--gradient-bg); position: relative; overflow: hidden; }
        .final-title { font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 20px; }
        .final-subtitle { font-size: 1.2rem; color: var(--brand-gray); margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .secure-text { margin-top: 20px; font-size: 0.9rem; color: var(--brand-gray); }
        
        .pulse-anim { animation: pulseBtn 2s infinite; }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 106, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0); }
        }
        @keyframes pulseBtn {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.7); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 15px rgba(255, 106, 0, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 106, 0, 0); }
        }

        /* Mobile Responsiveness */
        @media (max-width: 992px) {
          .hero-grid, .instructor-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .hero-video-wrapper { margin: 0 auto; }
          .hero-form-wrapper { margin-top: 20px; max-width: 500px; margin-left: auto; margin-right: auto; }
          .hero-image-wrapper { margin-top: 30px; }
          .floating-badge { left: 50%; transform: translateX(-50%); bottom: -20px; }
          .webinar-meta { align-items: center; }
          .days-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; gap: 40px; }
          .instructor-achievements li { justify-content: center; }
        }
        @media (max-width: 768px) {
          .countdown-timer { gap: 10px; }
          .time-block { min-width: 70px; padding: 10px 15px; }
          .time-value { font-size: 2rem; }
          .time-colon { font-size: 2rem; padding-bottom: 15px; }
          .benefits-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Webinar;
