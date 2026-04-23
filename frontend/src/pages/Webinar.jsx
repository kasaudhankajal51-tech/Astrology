import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Webinar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true });
    }
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
            <div className="hero-content" data-aos="fade-right">
              <div className="pulse-badge">LIVE ONLINE WEBINAR</div>
              <h1 className="hero-title">
                Struggling to Find Direction in Life? <br/>
                <span className="text-highlight">Discover Your Cosmic Blueprint</span>
              </h1>
              
              <div className="hero-video-wrapper mt-4">
                <video src="/videohomefinal.mp4" controls poster="/images/bg-bannerpic.jpg" className="sales-video"></video>
                <div className="video-glow"></div>
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
            
            <div className="hero-form-wrapper" data-aos="fade-left">
              <div className="lead-form-card">
                <div className="form-header">
                  <h3>Reserve Your Seat</h3>
                  <p className="alert-text"><i className="fas fa-exclamation-circle"></i> Limited Spots: Only ₹99/-</p>
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
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your 10-digit phone" />
                  </div>
                  <button type="submit" className="cta-button primary-cta w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Book Your Seat Now'}
                  </button>
                  <p className="secure-text text-center mt-3"><i className="fas fa-lock"></i> 100% Secure Payment</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authority Section */}
      <section className="authority-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card" data-aos="fade-up">
              <div className="stat-icon"><i className="fas fa-user-graduate"></i></div>
              <h3 className="stat-number">100,000+</h3>
              <p className="stat-label">Students Mentored</p>
            </div>
            <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-icon"><i className="fas fa-star"></i></div>
              <h3 className="stat-number">4.9/5</h3>
              <p className="stat-label">Average Rating</p>
            </div>
            <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-icon"><i className="fas fa-award"></i></div>
              <h3 className="stat-number">10+</h3>
              <p className="stat-label">Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Section */}
      <section className="why-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="section-header">
                <h2 className="why-title">Kabhi socha hai <br/><span className="text-highlight">"Why does this keep happening to me?"</span></h2>
              </div>
              <div className="why-grid">
                {[
                  "You're working hard but promotions or recognition feel stuck",
                  "You attract the same type of person again and again.",
                  "You earn but somehow it doesn't stay or grow the way you want",
                  "You feel like you're living someone else's script, not your own",
                  "You feel misunderstood by people close to you."
                ].map((text, i) => (
                  <div className="why-card" key={i}>
                    <span className="why-icon"><i className="fas fa-question-circle"></i></span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
              <p className="why-footer mt-5">The answer lies in your kundli 👇</p>
              <div className="mt-4">
                <button className="cta-button primary-cta pulse-anim">Uncover Life's Secrets – Join Now</button>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block" data-aos="fade-left">
              <div className="why-image-wrapper">
                <img src="/images/life_struggles.png" alt="Life Struggles" className="img-fluid rounded-3 shadow-lg" />
                <div className="image-overlay-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Blueprint Section */}
      <section className="blueprint-deco-section">
        <div className="container">
          <div className="blueprint-banner" data-aos="zoom-in">
            <img src="/images/cosmic_blueprint.png" alt="Cosmic Blueprint" className="blueprint-img" />
            <div className="blueprint-content">
              <h3>Your Destiny is Written in the Stars</h3>
              <p>We help you read it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What You Will Learn */}
      <section className="learn-section">
        <div className="container">
          <div className="section-header text-center">
            <h5 className="section-subtitle">The Curriculum</h5>
            <h2 className="section-title">What You Will Learn In <span className="text-highlight">2 Days</span></h2>
            <div className="header-underline mx-auto"></div>
          </div>
          <div className="learn-grid">
            {[
              { icon: "/images/as1.png", title: "Basics of Vedic Astrology", desc: "Understand the simple rules that Vedic astrology is built on." },
              { icon: "/images/as2.png", title: "Birth Chart/Kundali", desc: "Learn about the secrets hidden in your birth chart." },
              { icon: "/images/as3.png", title: "Planetary Influences", desc: "See how planets influence your job, love life, and money." },
              { icon: "/images/as4.png", title: "Planetary Movements", desc: "Explore how the movement of planets affects your destiny." },
              { icon: "/images/as6.png", title: "Actionable Advice", desc: "Get specific advice for career, wealth, and relationships." }
            ].map((item, i) => (
              <div className="learn-card" key={i} data-aos="zoom-in" data-aos-delay={i*100}>
                <div className="learn-icon-img"><img src={item.icon} alt={item.title} /></div>
                <div className="learn-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Instructor Section */}
      <section className="instructor-section">
        <div className="container">
          <div className="instructor-grid">
            <div className="instructor-image" data-aos="fade-right">
              <div className="image-wrapper">
                <img src="/images/middle-img.png" alt="Astro Arun Pandit" />
                <div className="experience-badge-mini">16+ Years Experience</div>
              </div>
              <div className="logo-strip mt-4">
                <span className="media-tag">Aaj Tak</span>
                <span className="media-tag">Outlook</span>
                <span className="media-tag">LatestLy</span>
              </div>
            </div>
            <div className="instructor-info" data-aos="fade-left">
              <h5 className="section-subtitle">Meet Your Mentor</h5>
              <h2 className="instructor-name">Astro <span className="text-highlight">Arun Pandit</span></h2>
              <p className="instructor-bio">
                A legacy of 51+ years, guiding thousands towards clarity through the ancient wisdom of Vedic Astrology, Numerology, and Vastu.
              </p>
              <ul className="instructor-achievements">
                <li><i className="fas fa-check-circle"></i> 100,000+ Students Mentored</li>
                <li><i className="fas fa-check-circle"></i> Expert in Predictive Astrology</li>
                <li><i className="fas fa-check-circle"></i> Featured in Major Media Outlets</li>
                <li><i className="fas fa-check-circle"></i> Proven Remedies for Life Problems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Itinerary Section */}
      <section className="breakdown-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">2-Day <span className="text-highlight">Itinerary</span></h2>
            <div className="header-underline mx-auto"></div>
          </div>
          <div className="days-grid">
            <div className="day-card" data-aos="fade-up">
              <div className="day-header">DAY 1</div>
              <h3 className="day-title">The Foundation</h3>
              <ul className="day-content">
                <li><i className="fas fa-play"></i> 12 Zodiac Signs & Houses Decode</li>
                <li><i className="fas fa-play"></i> Role of 9 Planets in Life</li>
                <li><i className="fas fa-play"></i> Basic Birth Chart Reading</li>
                <li><i className="fas fa-play"></i> Q&A Session</li>
              </ul>
            </div>
            <div className="day-card" data-aos="fade-up" data-aos-delay="200">
              <div className="day-header">DAY 2</div>
              <h3 className="day-title">Prediction & Remedies</h3>
              <ul className="day-content">
                <li><i className="fas fa-play"></i> Career & Wealth Indicators</li>
                <li><i className="fas fa-play"></i> Relationship Compatibility</li>
                <li><i className="fas fa-play"></i> Low-cost Daily Remedies</li>
                <li><i className="fas fa-play"></i> Live Chart Reading</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Common <span className="text-highlight">Questions</span></h2>
          </div>
          <div className="faq-grid">
            {[
              { q: "Where can I join the webinar?", a: "The webinar will be held online via Zoom. You will receive the link in your email and WhatsApp after registration." },
              { q: "Where will the webinar take place?", a: "It is a 100% online live session. You can join from the comfort of your home." },
              { q: "Will there be reminders sent out?", a: "Yes, we send reminders 24 hours, 1 hour, and 15 minutes before the session starts." },
              { q: "Is there a registration fee?", a: "There is a nominal commitment fee of ₹99/- to ensure only serious learners join." },
              { q: "Who should attend this webinar?", a: "Anyone interested in learning astrology, whether you are a beginner or looking to deepen your knowledge." }
            ].map((faq, idx) => (
              <div className="faq-item" key={idx} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} data-aos="fade-up">
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <i className={`fas fa-chevron-${activeFaq === idx ? 'up' : 'down'}`}></i>
                </div>
                <div className={`faq-answer ${activeFaq === idx ? 'active' : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Bottom CTA */}
      <div className="fixed-bottom-cta">
        <div className="cta-container">
          <div className="cta-left">
            <div className="price-info">
              <span className="price-text">₹99/- <span className="small-text">Only</span></span>
              <span className="students-text">Few Seats Left</span>
            </div>
            <div className="cta-timer">
              <div className="timer-box">
                <span className="timer-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="timer-label">H</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-box">
                <span className="timer-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="timer-label">M</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-box">
                <span className="timer-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="timer-label">S</span>
              </div>
            </div>
          </div>
          <div className="cta-right">
            <button className="register-btn-fixed pop-effect">
              REGISTER NOW
            </button>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --brand-dark: #070913;
          --brand-navy: #0b1220;
          --brand-accent: #ff6a00;
          --brand-highlight: #ff0080;
          --brand-light: #ffffff;
          --brand-gray: #a0aec0;
          --gradient-bg: linear-gradient(135deg, #070913 0%, #1a0b2e 100%);
          --gradient-cta: linear-gradient(135deg, #ff6a00 0%, #ff0080 100%);
          --glass-bg: rgba(255, 255, 255, 0.03);
          --glass-border: rgba(255, 255, 255, 0.08);
        }

        .webinar-landing {
          font-family: 'Outfit', sans-serif;
          background-color: var(--brand-dark);
          color: var(--brand-light);
          padding-bottom: 100px;
          overflow-x: hidden;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .text-highlight { background: linear-gradient(135deg, var(--brand-accent), var(--brand-highlight)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .section-header { margin-bottom: 50px; }
        .section-title { font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 800; line-height: 1.2; font-family: 'Merriweather Sans', serif; }
        .section-subtitle { color: var(--brand-accent); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 3px; font-weight: 700; margin-bottom: 10px; display: block; }
        .header-underline { height: 4px; width: 60px; background: var(--brand-accent); border-radius: 2px; margin-top: 15px; }
        .text-center { text-align: center; }

        .cta-button {
          display: inline-block;
          background: var(--gradient-cta);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          padding: 16px 30px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(255, 106, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255, 106, 0, 0.6); }

        /* 1. Hero Section */
        .webinar-hero { padding: 120px 0 80px; background: var(--gradient-bg); position: relative; }
        .hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: center; }
        .pulse-badge { display: inline-block; background: rgba(255, 106, 0, 0.15); color: var(--brand-accent); padding: 8px 16px; border-radius: 50px; border: 1px solid var(--brand-accent); font-weight: 800; font-size: 0.8rem; margin-bottom: 25px; letter-spacing: 1px; }
        .hero-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 20px; font-family: 'Merriweather Sans', serif; }
        .hero-video-wrapper { position: relative; width: 100%; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 2px solid var(--glass-border); }
        .sales-video { width: 100%; display: block; aspect-ratio: 16/9; object-fit: cover; }
        .video-glow { position: absolute; inset: 0; background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%); pointer-events: none; }
        
        .lead-form-card { background: rgba(11, 18, 32, 0.95); border: 1px solid var(--brand-accent); padding: 40px; border-radius: 25px; box-shadow: 0 30px 60px rgba(0,0,0,0.6); backdrop-filter: blur(15px); }
        .form-header h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 10px; text-align: center; }
        .alert-text { color: var(--brand-accent); font-weight: 700; text-align: center; margin-bottom: 25px; font-size: 0.9rem; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 0.85rem; color: var(--brand-gray); margin-bottom: 8px; font-weight: 600; text-transform: uppercase; }
        .form-group input { width: 100%; padding: 15px; border-radius: 12px; border: 1px solid var(--glass-border); background: rgba(0,0,0,0.3); color: #fff; font-size: 1rem; transition: 0.3s; }
        .form-group input:focus { border-color: var(--brand-accent); outline: none; background: rgba(0,0,0,0.5); }

        /* 2. Authority Section */
        .authority-section { padding: 50px 0; background: rgba(0,0,0,0.3); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; text-align: center; }
        .stat-icon { font-size: 2rem; color: var(--brand-accent); margin-bottom: 15px; opacity: 0.8; }
        .stat-number { font-size: clamp(1.5rem, 4vw, 2.8rem); font-weight: 900; color: var(--brand-accent); line-height: 1; }
        .stat-label { font-size: 0.8rem; color: var(--brand-gray); text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-top: 10px; }

        /* 3. Why Section */
        .why-section { padding: 100px 0; background: var(--brand-dark); }
        .why-title { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; color: #fff; }
        .why-grid { display: grid; grid-template-columns: 1fr; gap: 15px; margin-top: 30px; }
        .why-card { background: var(--glass-bg); border: 1px solid var(--glass-border); padding: 20px; border-radius: 15px; display: flex; align-items: center; gap: 15px; transition: 0.3s; }
        .why-card:hover { transform: translateX(10px); border-color: var(--brand-accent); }
        .why-image-wrapper { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .image-overlay-glow { position: absolute; inset: 0; background: linear-gradient(45deg, rgba(255,106,0,0.2) 0%, transparent 100%); pointer-events: none; }

        .blueprint-deco-section { padding: 80px 0; background: var(--brand-navy); }
        .blueprint-banner { position: relative; border-radius: 30px; overflow: hidden; height: 300px; display: flex; align-items: center; justify-content: center; text-align: center; }
        .blueprint-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4; }
        .blueprint-content { position: relative; z-index: 2; padding: 0 20px; }
        .blueprint-content h3 { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; font-family: 'Merriweather Sans', serif; }
        .blueprint-content p { font-size: 1.2rem; color: var(--brand-accent); font-weight: 700; }

        /* 4. Learn Section */
        .learn-section { padding: 100px 0; background: var(--brand-navy); }
        .learn-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-top: 50px; }
        .learn-card { background: var(--glass-bg); padding: 30px; border-radius: 24px; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 20px; transition: 0.4s; }
        .learn-card:hover { transform: translateY(-10px); border-color: var(--brand-accent); }
        .learn-icon-img { width: 60px; height: 60px; background: rgba(255, 106, 0, 0.1); border-radius: 18px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255, 106, 0, 0.2); overflow: hidden; padding: 12px; }
        .learn-icon-img img { width: 100%; height: 100%; object-fit: contain; filter: brightness(0) invert(1); }
        .learn-content h4 { font-size: 1.3rem; margin-bottom: 10px; color: #fff; font-weight: 700; }
        .learn-content p { color: var(--brand-gray); font-size: 0.95rem; line-height: 1.6; margin: 0; }

        /* 5. Instructor Section */
        .instructor-section { padding: 100px 0; background: var(--brand-dark); }
        .instructor-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center; }
        .image-wrapper { position: relative; border-radius: 30px; overflow: hidden; border: 5px solid var(--glass-border); }
        .image-wrapper img { width: 100%; display: block; }
        .experience-badge-mini { position: absolute; bottom: 20px; right: 20px; background: var(--gradient-cta); padding: 10px 20px; border-radius: 15px; font-weight: 800; font-size: 0.8rem; box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        .instructor-name { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 800; margin-bottom: 20px; line-height: 1.1; }
        .instructor-bio { font-size: 1.1rem; color: var(--brand-gray); line-height: 1.8; margin-bottom: 30px; }
        .instructor-achievements { list-style: none; padding: 0; }
        .instructor-achievements li { display: flex; align-items: center; gap: 12px; font-size: 1.1rem; margin-bottom: 15px; font-weight: 500; }
        .instructor-achievements i { color: var(--brand-accent); font-size: 1.2rem; }
        .media-tag { background: rgba(255,255,255,0.05); padding: 6px 15px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; color: #fff; border: 1px solid var(--glass-border); }
        .logo-strip { display: flex; gap: 12px; flex-wrap: wrap; }

        /* 6. Itinerary Section */
        .breakdown-section { padding: 100px 0; background: var(--brand-navy); }
        .days-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 50px; }
        .day-card { background: var(--glass-bg); border: 1px solid var(--glass-border); padding: 40px; border-radius: 25px; position: relative; transition: 0.3s; }
        .day-card:hover { border-color: var(--brand-accent); transform: scale(1.02); }
        .day-header { position: absolute; top: 0; right: 0; background: var(--brand-accent); color: #fff; padding: 10px 25px; border-bottom-left-radius: 25px; font-weight: 900; font-size: 0.9rem; letter-spacing: 1px; }
        .day-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 25px; color: var(--brand-accent); }
        .day-content { list-style: none; padding: 0; }
        .day-content li { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 15px; font-size: 1rem; color: #ddd; }
        .day-content i { color: var(--brand-accent); margin-top: 5px; font-size: 0.8rem; }

        /* 9. FAQ Section */
        .faq-section { padding: 100px 0; background: var(--brand-dark); }
        .faq-grid { display: flex; flex-direction: column; gap: 15px; max-width: 800px; margin: 40px auto 0; }
        .faq-item { background: var(--glass-bg); border: 1px solid var(--glass-border); padding: 20px 25px; border-radius: 15px; cursor: pointer; transition: 0.3s; }
        .faq-item:hover { border-color: var(--brand-accent); }
        .faq-question { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 1.1rem; }
        .faq-answer { max-height: 0; overflow: hidden; transition: all 0.4s ease; opacity: 0; }
        .faq-answer.active { max-height: 200px; opacity: 1; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--glass-border); }
        .faq-answer p { color: var(--brand-gray); line-height: 1.6; margin: 0; }

        /* Fixed Bottom CTA */
        .fixed-bottom-cta {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 95%;
          max-width: 800px;
          background: rgba(11, 18, 32, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 50px;
          padding: 12px 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          z-index: 1000;
          border: 1px solid var(--brand-accent);
        }
        .cta-container { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .price-info { display: flex; flex-direction: column; }
        .price-text { font-size: 1.5rem; font-weight: 900; color: #fff; line-height: 1; }
        .price-text .small-text { font-size: 0.8rem; color: var(--brand-accent); }
        .students-text { font-size: 0.75rem; color: var(--brand-gray); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        
        .cta-left { display: flex; align-items: center; gap: 40px; }
        .cta-timer { display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.3); padding: 8px 15px; border-radius: 15px; border: 1px solid var(--glass-border); }
        .timer-box { display: flex; flex-direction: column; align-items: center; min-width: 30px; }
        .timer-val { font-size: 1.1rem; font-weight: 800; color: var(--brand-accent); line-height: 1; }
        .timer-label { font-size: 0.6rem; color: var(--brand-gray); font-weight: 700; }
        .timer-sep { font-weight: 800; color: #fff; opacity: 0.5; }

        .register-btn-fixed { background: var(--gradient-cta); color: #fff; border: none; padding: 12px 35px; border-radius: 50px; font-size: 1rem; font-weight: 900; cursor: pointer; box-shadow: 0 5px 15px rgba(255, 106, 0, 0.3); transition: 0.3s; }
        .register-btn-fixed:hover { transform: scale(1.05); box-shadow: 0 8px 20px rgba(255, 106, 0, 0.5); }

        .pop-effect { animation: slowPop 3s infinite ease-in-out; }
        @keyframes slowPop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .pulse-anim { animation: pulseBtn 2s infinite; }
        @keyframes pulseBtn { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.7); } 50% { transform: scale(1.02); box-shadow: 0 0 0 15px rgba(255, 106, 0, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 106, 0, 0); } }

        /* Media Queries */
        @media (max-width: 1200px) {
          .instructor-grid { gap: 40px; }
        }
        @media (max-width: 991px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 50px; }
          .hero-video-wrapper { max-width: 600px; margin: 0 auto; }
          .instructor-grid { grid-template-columns: 1fr; text-align: center; }
          .instructor-image { max-width: 400px; margin: 0 auto; }
          .logo-strip { justify-content: center; }
          .cta-left { gap: 20px; }
          .fixed-bottom-cta { width: 98%; padding: 10px 20px; }
        }
        @media (max-width: 767px) {
          .webinar-hero { padding-top: 80px; }
          .days-grid { grid-template-columns: 1fr; }
          .stats-grid { gap: 15px; }
          .cta-timer { display: none; }
          .price-text { font-size: 1.2rem; }
          .register-btn-fixed { padding: 10px 20px; font-size: 0.9rem; }
          .lead-form-card { padding: 30px 20px; }
        }
        @media (max-width: 480px) {
          .stat-number { font-size: 1.4rem; }
          .stat-label { font-size: 0.6rem; letter-spacing: 1px; }
          .section-title { font-size: 1.8rem; }
          .fixed-bottom-cta { bottom: 10px; border-radius: 20px; }
          .price-info { gap: 2px; }
        }
      `}</style>
    </div>
  );
}

export default Webinar;
