import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LogoCarousel from '../components/webinar/LogoCarousel';
import NewsCarousel from '../components/webinar/NewsCarousel';
import PictureGallery from '../components/webinar/PictureGallery';
import VideoReviewCarousel from '../components/webinar/VideoReviewCarousel';
import TextReviewCarousel from '../components/webinar/TextReviewCarousel';
import CountdownTimer from '../components/webinar/CountdownTimer';

function Webinar() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true });
    }

    // Standardized Timer Logic (Sync with Hero Timer)
    const timerKey = 'webinar_timer_v4';
    let endTime = localStorage.getItem(timerKey);
    
    if (!endTime) {
      endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem(timerKey, endTime);
    } else {
      endTime = parseInt(endTime);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        const newEnd = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem(timerKey, newEnd);
      } else {
        const h = Math.floor(distance / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
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
        toast.success('Registration initiated. Redirecting to secure payment...');
        setIsModalOpen(false);
        navigate(`/payment?leadId=${data.leadId}&name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${data.phone}&amount=${data.amount}&orderId=${data.orderId}&keyId=${data.keyId}`);
      } else {
        toast.error(data.error || data.message || 'Failed to initiate registration. Please try again.');
      }
    } catch (err) {
      toast.error('Connection Error: Unable to reach server. ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="webinar-landing">
      {/* 1. Hero Section */}
      <section className="webinar-hero">
        <div className="container">
          <div className="hero-badge-wrapper" data-aos="fade-up">
            <div className="hero-badge">
              <span className="icon"><i className="fas fa-calendar-alt"></i></span>
              2-Days Mega Astrology Webinar
            </div>
          </div>
          
          <h1 className="hero-title" data-aos="fade-up">
            Remove <span className="text-highlight">Uncertainty</span> from Your <span className="text-highlight">Career, Relationships and Finances</span> using <span className="text-purple">Astrology</span>
          </h1>
          
          <div className="hero-main-grid mt-5">
            <div className="hero-video-box" data-aos="fade-right">
              <video src="/videohomefinal.mp4" controls poster="/images/bg-bannerpic.jpg" className="w-100 d-block"></video>
              <div className="video-label-tag">BY – ASTRO AVA</div>
            </div>

            <div className="hero-info-side" data-aos="fade-left">
              <div className="info-cards-grid">
                <div className="info-card">
                  <div className="info-icon"><i className="fas fa-calendar-day"></i></div>
                  <div className="info-text"><h4>Date</h4><p>25th – 26th April</p></div>
                </div>
                <div className="info-card">
                  <div className="info-icon"><i className="fas fa-clock"></i></div>
                  <div className="info-text"><h4>Time:</h4><p>1:00 PM</p></div>
                </div>
                <div className="info-card">
                  <div className="info-icon"><i className="fas fa-hourglass-half"></i></div>
                  <div className="info-text"><h4>Duration:</h4><p>4 Hours</p></div>
                </div>
                <div className="info-card">
                  <div className="info-icon"><i className="fas fa-laptop"></i></div>
                  <div className="info-text"><h4>Format:</h4><p>2 days Webinar</p></div>
                </div>
              </div>

              <div className="mentor-summary-card">
                <div className="featured-label-mini text-center mb-3"><span className="badge bg-danger">Your Instructor</span></div>
                <div className="mentor-header">
                  <img src="/images/mentor-ava.png" alt="Mentor" className="mentor-pic-small" />
                  <div className="mentor-title-box">
                    <h3>Astro Ava</h3>
                    <p>Expert in Vedic astrology and other disciplines of astrology, recognized as India's leading voice in astrology.</p>
                  </div>
                </div>
                <div className="mentor-stats-row">
                  <div className="m-stat"><h4>1 Lakh+</h4><p>Students taught</p></div>
                  <div className="m-stat"><h4>50 Million+</h4><p>Views across social media</p></div>
                  <div className="m-stat"><h4>50+ Years</h4><p>of legacy</p></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5" data-aos="zoom-in">
            <button onClick={() => setIsModalOpen(true)} className="cta-button">Uncover Life’s Secrets – Join Now</button>
            <p className="mt-3 fw-bold">Book Your Seat Now – Hurry Up! <span className="text-danger">Few Seats Left</span></p>
          </div>
        </div>
      </section>

      {/* Carousels Section */}
      <LogoCarousel />
      <NewsCarousel />

      {/* Why Section */}
      <section className="why-section">
        <div className="container">
          <h2 className="why-title" data-aos="fade-up">Kabhi socha hai <span className="text-highlight">“Why does this keep happening to me?”</span></h2>
          <div className="why-cards-flex" data-aos="fade-up">
            {[
              "You're working hard but promotions or recognition feel stuck",
              "You attract the same type of person again and again.",
              "You earn but somehow it doesn't stay or grow the way you want",
              "You feel like you're living someone else's script, not your own",
              "You feel misunderstood by people close to you."
            ].map((text, i) => (
              <div className="why-card-v2" key={i}>
                <span className="icon"><i className="fas fa-question-circle"></i></span>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-5 fw-bold fs-5">The answer lies in your kundli 👇</p>
          <div className="text-center mt-4">
            <button onClick={() => setIsModalOpen(true)} className="cta-button">Uncover Life’s Secrets – Join Now</button>
          </div>
        </div>
      </section>

      {/* Picture Gallery */}
      <PictureGallery />

      {/* Patterns Section */}
      <section className="patterns-section bg-light py-5">
        <div className="container">
          <h2 className="section-title mb-3">Astrology is not about predictions. It's about <span className="text-highlight">PATTERNS.</span></h2>
          <p className="text-muted mb-5">Planets ki positions, houses ka system, signs ka energy—ye sab ek framework hai jo explain karta hai:</p>
          
          <div className="patterns-grid">
            <div className="pattern-card" data-aos="fade-up">
              <div className="pattern-icon"><i className="fas fa-fingerprint"></i></div>
              <h4>Aapki personality ka blueprint</h4>
              <p>why you react the way you do</p>
            </div>
            <div className="pattern-card" data-aos="fade-up" data-aos-delay="100">
              <div className="pattern-icon"><i className="fas fa-coins"></i></div>
              <h4>Career aur money ka zone</h4>
              <p>kaunse areas naturally strong hain, kahan effort zyada lagega</p>
            </div>
            <div className="pattern-card" data-aos="fade-up" data-aos-delay="200">
              <div className="pattern-icon"><i className="fas fa-users"></i></div>
              <h4>Relationships ka dynamics</h4>
              <p>why you attract certain people, aur unke saath issues kyun repeat hote hain</p>
            </div>
            <div className="pattern-card" data-aos="fade-up">
              <div className="pattern-icon"><i className="fas fa-heartbeat"></i></div>
              <h4>Health aur energy cycles</h4>
              <p>kab body support karti hai, kab rest chahiye</p>
            </div>
            <div className="pattern-card" data-aos="fade-up" data-aos-delay="100">
              <div className="pattern-icon"><i className="fas fa-history"></i></div>
              <h4>Timing</h4>
              <p>kab push karna hai, kab wait karna hai</p>
            </div>
            <div className="text-center d-flex align-items-center justify-content-center">
               <button onClick={() => setIsModalOpen(true)} className="cta-button">Uncover Life’s Secrets – Join Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="learn-section">
        <div className="container">
          <h2 className="section-title text-center mb-5">What <span className="text-highlight">You Will Learn</span> In 2 Days</h2>
          <div className="learn-grid">
            {[
              { icon: "fa-sun", title: "Basics of Vedic Astrology:", desc: "Understand the simple rules that Vedic astrology is built on." },
              { icon: "fa-th", title: "Understanding Your Birth Chart/Kundali", desc: "Learn about the secrets in your birth chart." },
              { icon: "fa-star", title: "How Planets Affect Your Life:", desc: "See how planets influence important parts of your life like your job, love life, and money." },
              { icon: "fa-globe", title: "Effects of Planetary Movements:", desc: "Explore how the movement of planets can affect you." },
              { icon: "fa-gem", title: "Astrology Advice for Different Life Areas:", desc: "Get specific advice for bettering your career, relationships, and health." },
              { icon: "fa-book-open", title: "Practical Applications of Astrology:", desc: "How to read patterns in other people's charts" },
              { icon: "fa-comment-dots", title: "Case studies:", desc: "Real charts, real situations, real insights" },
              { icon: "fa-arrow-right", title: "Next steps:", desc: "How to start your own consultation as a highly-paid astrologer" }
            ].map((item, i) => (
              <div className="learn-card-v2" key={i} data-aos="fade-up">
                <div className="learn-icon-v2"><i className={`fas ${item.icon}`}></i></div>
                <div className="learn-content-v2">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button onClick={() => setIsModalOpen(true)} className="cta-button">Uncover Life’s Secrets – Join Now</button>
          </div>
        </div>
      </section>

      {/* Social Proof Carousels */}
      <VideoReviewCarousel />
      <TextReviewCarousel />

      {/* Meet Your Mentor */}
      <section className="mentor-v2-section">
        <div className="container">
          <h2 className="mentor-v2-title">Meet Your <span className="text-highlight">Mentor</span></h2>
          <div className="mentor-v2-grid">
            <div className="mentor-v2-info" data-aos="fade-right">
              <ul className="mentor-list">
                <li><i className="fas fa-chevron-right"></i> 51+ years of legacy</li>
                <li><i className="fas fa-chevron-right"></i> Thousands of successful consultations completed</li>
                <li><i className="fas fa-chevron-right"></i> Expert in Vedic Astrology, Numerology, and Vastu</li>
                <li><i className="fas fa-chevron-right"></i> Proven track record of training successful astrologers.</li>
                <li><i className="fas fa-chevron-right"></i> Global clientele from India, US, UK, & Middle East</li>
              </ul>
              <div className="mentor-bio-long">
                <p><strong>Award Winning Expert in Astrology & more</strong><br/>Astro Ava, an award-winning expert in astrology and various related disciplines, like numerology, vastu shastra, palmistry, tarot reading.</p>
                <p className="mt-4"><strong>Spiritual Speaker & Podcaster</strong><br/>Astro Ava, a profound spiritual luminary and TEDx speaker has graced prestigious platforms and takes Q&A series for seekers. His Podcast Show- Astro Ava invites famous celebrities to engage in enlightening conversations</p>
                <p className="mt-4"><strong>Occult Instructor</strong><br/>His expertise lies in Numerology, Astrology, Vastu Shastra, Palmistry and has taught 5K+ students. He is a renowned astrologer and numerologist taking forward a legacy of 49 years</p>
              </div>
              <div className="mt-5">
                <button onClick={() => setIsModalOpen(true)} className="cta-button">Uncover Life’s Secrets – Join Now</button>
              </div>
            </div>
            <div className="mentor-v2-img-side" data-aos="fade-left">
              <div className="mentor-image-v2">
                <img src="/images/mentor-ava.png" alt="Astro Ava" />
              </div>
              <div className="mentor-media-logos">
                 <div className="media-logo-item"><span>Aaj Tak</span></div>
                 <div className="media-logo-item"><span>Fox Interviewer</span></div>
                 <div className="media-logo-item"><span>Outlook</span></div>
                 <div className="media-logo-item"><span>LatestLY</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Section (Day 1 & 2) */}
      <section className="breakdown-section py-5 bg-white">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">2-Day <span className="text-highlight">Itinerary</span></h2>
          </div>
          <div className="days-grid">
            <div className="day-card" data-aos="fade-up">
              <div className="day-header">DAY 1</div>
              <h3 className="day-title">The Foundation</h3>
              <ul className="day-content text-dark">
                <li><i className="fas fa-play"></i> 12 Zodiac Signs & Houses Decode</li>
                <li><i className="fas fa-play"></i> Role of 9 Planets in Life</li>
                <li><i className="fas fa-play"></i> Basic Birth Chart Reading</li>
                <li><i className="fas fa-play"></i> Q&A Session</li>
              </ul>
            </div>
            <div className="day-card" data-aos="fade-up" data-aos-delay="200">
              <div className="day-header">DAY 2</div>
              <h3 className="day-title">Prediction & Remedies</h3>
              <ul className="day-content text-dark">
                <li><i className="fas fa-play"></i> Career & Wealth Indicators</li>
                <li><i className="fas fa-play"></i> Relationship Compatibility</li>
                <li><i className="fas fa-play"></i> Low-cost Daily Remedies</li>
                <li><i className="fas fa-play"></i> Live Chart Reading</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Image Match */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="faq-title-main">
              <span className="faq-title-highlight">FAQ’S:</span> <span className="faq-title-text">Here’s everything you may ask</span>
            </h2>
          </div>
          <div className="faq-grid">
            {[
              { q: "Where can I join the webinar?", a: "After a successful payment, you’ll be directed to a thank you page. There, you can click on the Join WhatsApp button to join the webinar’s group." },
              { q: "Where will the webinar take place?", a: "The webinar will be conducted online via Zoom. You can easily join from any where using a mobile device or laptop." },
              { q: "Will there be reminders sent out before the webinar begins?", a: "Absolutely! We’ll ensure you’re reminded about the webinar through emails, SMS, and WhatsApp notifications." },
              { q: "Is there a registration fee for the webinar?", a: "While this webinar’s content is valued at ₹1999, we are offering it for just ₹99 to make it accessible for everyone." },
              { q: "Who should attend this webinar?", a: "This webinar is ideal for anyone interested in gaining deeper insights into astrology—whether you’re a beginner curious about the basics or someone looking to understand advanced astrological concepts." },
              { q: "What should I have ready for the webinar?", a: "All you need is an open mind ready to explore the universe of astrology. Having a notebook handy to jot down important points would be beneficial." },
              { q: "Can I participate in this webinar with my family or partners?", a: "Yes, absolutely! We encourage you to join with your family or partners. Learning together can enhance understanding and application of the astrological insights shared." }
            ].map((faq, idx) => (
              <div className="faq-item" key={idx} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <i className={`fas fa-chevron-down faq-chevron ${activeFaq === idx ? 'rotate' : ''}`}></i>
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
        <div className="cta-inner">
          <div className="cta-content-wrapper">
            <div className="cta-left-side">
              <div className="premium-badge-v3">
                <i className="fas fa-bolt"></i> LIMITED TIME OFFER
              </div>
              <div className="cta-price-v3">
                <div className="price-main-v3">
                  <span className="price-amt-v3">₹99/- Only</span>
                  <span className="seats-tag-v3">(Few Seats Left)</span>
                </div>
                <p className="counting-text-v3">Empowering over 1 Lakh+ students and counting</p>
              </div>
            </div>

            <div className="cta-timer-v3">
               <CountdownTimer minimal={true} />
            </div>

            <div className="cta-action-v3">
              <button onClick={() => setIsModalOpen(true)} className="cta-reg-btn-v3 glow-popup">
                Register Now <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal (Premium Polished) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && setIsModalOpen(false)}>
          <div className="modal-container">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}><i className="fas fa-times"></i></button>
            <div className="modal-content-wrapper">
              <div className="modal-image-side">
                <h4>Join the <br/><span className="text-highlight">Masterclass</span></h4>
                <p>Unlock your cosmic potential with India's leading astrology mentor.</p>
                <ul className="modal-points">
                  <li><i className="fas fa-check-circle"></i> 2 Days Live Training</li>
                  <li><i className="fas fa-check-circle"></i> Practical Reading Skills</li>
                  <li><i className="fas fa-check-circle"></i> Q&A with Astro Ava</li>
                </ul>
              </div>
              <div className="modal-form-side">
                <div className="form-header-mini">
                  <h3>Reserve Your Seat</h3>
                  <p>Limited Seats Available at ₹99/-</p>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter Your Full Name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter Your Best Email" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-Digit Mobile Number" />
                  </div>
                  <button type="submit" className="cta-reg-btn w-100 justify-content-center" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                  </button>
                  <p className="secure-text"><i className="fas fa-lock me-2"></i> Secured by Razorpay</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --brand-purple: #3B2261;
          --brand-coral: #EE6662;
          --brand-coral-dark: #D9534F;
          --bg-light: #F8FAFC;
          --text-dark: #1E293B;
          --text-muted: #64748B;
          --card-bg: #FFFFFF;
          --gradient-coral: linear-gradient(135deg, #EE6662 0%, #D9534F 100%);
          --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .webinar-landing {
          font-family: 'Outfit', sans-serif;
          background-color: var(--bg-light);
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 24px 24px;
          color: var(--text-dark);
          padding-bottom: 120px;
          overflow-x: hidden;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .text-highlight { color: var(--brand-coral); }
        .text-purple { color: var(--brand-purple); }
        .section-header { margin-bottom: 50px; text-align: center; }
        .section-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; line-height: 1.2; color: var(--brand-purple); }
        .section-subtitle { color: var(--brand-coral); font-size: 1rem; text-transform: uppercase; letter-spacing: 3px; font-weight: 700; margin-bottom: 10px; display: block; }
        
        .cta-button {
          display: inline-block;
          background: var(--gradient-coral);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          padding: 16px 36px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(238, 102, 98, 0.3);
          text-transform: none;
        }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(238, 102, 98, 0.4); color: #fff; }

        /* Hero Section Redesign */
        .webinar-hero { padding: 100px 0 60px; position: relative; }
        .hero-badge-wrapper { display: flex; justify-content: center; margin-bottom: 30px; }
        .hero-badge { background: var(--brand-purple); color: #fff; padding: 8px 24px; border-radius: 40px; display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 0.9rem; }
        .hero-badge .icon { background: var(--brand-coral); padding: 5px; border-radius: 8px; font-size: 1rem; }
        
        .hero-title { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.1; text-align: center; color: var(--brand-purple); max-width: 1000px; margin: 0 auto 25px; }
        .hero-subtitle { font-size: 1.2rem; color: var(--text-muted); text-align: center; max-width: 800px; margin: 0 auto 50px; line-height: 1.6; }

        .hero-main-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: start; }
        
        .hero-video-box { position: relative; border-radius: 15px; overflow: hidden; box-shadow: var(--shadow-lg); border: 1px solid #e2e8f0; }
        .video-label-tag { position: absolute; bottom: 0; left: 0; width: 100%; background: var(--brand-purple); color: #fff; padding: 12px 20px; font-weight: 700; font-size: 0.9rem; z-index: 5; text-transform: uppercase; letter-spacing: 1px; }

        .info-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .info-card { background: var(--brand-purple); color: #fff; padding: 25px; border-radius: 20px; display: flex; align-items: center; gap: 20px; transition: 0.3s; }
        .info-icon { background: var(--brand-coral); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
        .info-text h4 { font-size: 0.85rem; color: #fff; opacity: 0.8; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
        .info-text p { font-size: 1.1rem; font-weight: 700; margin: 0; }

        .mentor-summary-card { background: var(--card-bg); border-radius: 20px; padding: 30px; margin-top: 30px; box-shadow: var(--shadow-md); border: 1px solid #e2e8f0; }
        .mentor-header { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
        .mentor-pic-small { width: 100px; height: 100px; border-radius: 10px; object-fit: cover; background: #e2e8f0; }
        .mentor-title-box h3 { font-size: 1.4rem; color: var(--brand-purple); font-weight: 800; margin-bottom: 5px; }
        .mentor-title-box p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.4; margin: 0; }
        
        .mentor-stats-row { display: flex; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 20px; gap: 10px; }
        .m-stat { text-align: center; flex: 1; }
        .m-stat h4 { font-size: 1.3rem; color: var(--brand-purple); font-weight: 900; margin-bottom: 3px; }
        .m-stat p { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin: 0; }

        /* Featured In */
        .featured-section { padding: 40px 0; background: #FAF9F6; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
        .featured-label { background: var(--brand-purple); color: #fff; padding: 8px 30px; border-radius: 10px; font-weight: 700; margin: -60px auto 30px; display: table; position: relative; z-index: 10; }
        .logos-flex { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 30px; opacity: 0.7; }
        .logos-flex img { height: 35px; filter: grayscale(1); }

        /* Why Section (Life Struggles) */
        .why-section { padding: 100px 0; background: #ffffff; }
        .why-title { font-size: 2.8rem; font-weight: 800; color: var(--brand-purple); text-align: center; margin-bottom: 60px; }
        .why-cards-flex { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        .why-card-v2 { background: var(--card-bg); padding: 25px; border-radius: 15px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 15px; width: calc(50% - 10px); border: 1px solid #f3e8ff; transition: 0.3s; }
        .why-card-v2:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: var(--brand-coral); }
        .why-card-v2 .icon { color: var(--brand-coral); font-size: 1.5rem; }
        .why-card-v2 p { margin: 0; font-size: 1rem; font-weight: 600; color: var(--text-dark); }

        /* Learn Section */
        .learn-section { padding: 100px 0; background: #ffffff; }
        .learn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 50px; }
        .learn-card-v2 { background: #FDF4FF; padding: 30px; border-radius: 15px; border: 1px solid #F3E8FF; display: flex; gap: 20px; align-items: flex-start; }
        .learn-icon-v2 { font-size: 2rem; color: var(--brand-purple); opacity: 0.8; }
        .learn-content-v2 h4 { font-size: 1.2rem; font-weight: 800; color: var(--brand-purple); margin-bottom: 8px; }
        .learn-content-v2 p { color: var(--text-muted); font-size: 0.95rem; margin: 0; line-height: 1.5; }

        /* Meet Your Mentor */
        .mentor-v2-section { padding: 100px 0; background: var(--brand-purple); color: #fff; position: relative; overflow: hidden; }
        .mentor-v2-title { font-size: 3rem; font-weight: 800; text-align: center; margin-bottom: 60px; }
        .mentor-v2-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .mentor-list { list-style: none; padding: 0; }
        .mentor-list li { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; font-size: 1.1rem; font-weight: 600; color: rgba(255,255,255,0.9); }
        .mentor-list li i { color: var(--brand-coral); margin-top: 5px; }
        .mentor-bio-long { margin-top: 30px; font-size: 1rem; line-height: 1.7; color: rgba(255,255,255,0.8); }
        
        .mentor-image-v2 { position: relative; border-radius: 30px; overflow: hidden; border: 10px solid rgba(255,255,255,0.05); }
        .mentor-image-v2 img { width: 100%; display: block; }
        .mentor-media-logos { 
          background: #fff; 
          padding: 20px 30px; 
          border-radius: 20px; 
          display: flex; 
          justify-content: space-around; 
          align-items: center; 
          margin-top: 30px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .media-logo-item {
          font-weight: 900;
          color: #1a1a1a;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
          transition: 0.3s;
        }
        .media-logo-item:hover {
          opacity: 1;
          transform: scale(1.05);
        }
        .media-logo-item span {
          display: block;
          border-left: 2px solid var(--brand-coral);
          padding-left: 10px;
        }

        /* Patterns Section */
        .patterns-section { padding: 100px 0; text-align: center; background: #FAF9F6; }
        .patterns-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 50px; }
        .pattern-card { background: #fff; padding: 40px 30px; border-radius: 20px; box-shadow: var(--shadow-md); border: 1px solid #f1f5f9; }
        .pattern-icon { font-size: 3rem; color: var(--brand-purple); margin-bottom: 20px; }
        .pattern-card h4 { font-size: 1.3rem; font-weight: 800; color: var(--brand-purple); margin-bottom: 10px; }
        .pattern-card p { font-size: 0.9rem; color: var(--text-muted); }

        /* Polished Itinerary Section */
        .breakdown-section { padding: 100px 0; background: #fff; }
        .days-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 50px; }
        .day-card { 
          background: #fff; 
          border: 1px solid #e2e8f0; 
          padding: 50px 40px; 
          border-radius: 30px; 
          position: relative; 
          transition: 0.4s; 
          box-shadow: var(--shadow-md);
        }
        .day-card:hover { transform: translateY(-10px); border-color: var(--brand-coral); box-shadow: var(--shadow-lg); }
        .day-header { 
          position: absolute; 
          top: -20px; 
          left: 40px; 
          background: var(--brand-coral); 
          color: #fff; 
          padding: 10px 30px; 
          border-radius: 12px; 
          font-weight: 900; 
          font-size: 1rem; 
          box-shadow: 0 10px 20px rgba(238, 102, 98, 0.3);
        }
        .day-title { font-size: 2rem; font-weight: 800; margin-bottom: 30px; color: var(--brand-purple); }
        .day-content { list-style: none; padding: 0; }
        .day-content li { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; font-size: 1.1rem; color: var(--text-dark); font-weight: 500; }
        .day-content i { color: var(--brand-coral); font-size: 0.9rem; background: #FFF1F2; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        /* Modern FAQ Section - Image Match */
        .faq-section { padding: 100px 0; background: #fff; }
        .faq-title-main { font-size: 2.8rem; font-weight: 800; text-align: center; margin-bottom: 50px; }
        .faq-title-highlight { color: var(--brand-coral); }
        .faq-title-text { color: var(--brand-purple); }

        .faq-grid { display: flex; flex-direction: column; gap: 15px; max-width: 900px; margin: 40px auto 0; }
        .faq-item { 
          background: var(--brand-purple); 
          border: none; 
          border-radius: 12px; 
          cursor: pointer; 
          transition: 0.3s; 
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .faq-item:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
        .faq-question { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          font-weight: 700; 
          font-size: 1.15rem; 
          padding: 22px 35px;
          color: #fff;
        }
        .faq-answer { 
          background: #fff;
          padding: 0 35px;
          max-height: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          color: var(--text-dark);
        }
        .faq-answer.active { 
          padding: 25px 35px;
          max-height: 400px; 
          opacity: 1; 
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .faq-answer p { color: var(--text-dark); line-height: 1.7; margin: 0; font-size: 1.05rem; }
        .faq-chevron { font-size: 1.2rem; transition: 0.3s; color: #fff; opacity: 0.9; }
        .faq-chevron.rotate { transform: rotate(180deg); }

        /* Multi-Color Animated Dark CTA */
        .fixed-bottom-cta {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(-45deg, #0f172a, #1e1b4b, #2d1b4e, #1e3a8a, #0f172a);
          background-size: 400% 400%;
          animation: multiGradient 10s ease infinite, slideUpBar 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          border-top: 2px solid rgba(255, 255, 255, 0.1);
          padding: 15px 0;
          z-index: 2000;
          box-shadow: 0 -10px 50px rgba(0,0,0,0.8);
        }

        @keyframes multiGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slideUpBar {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .cta-content-wrapper {
          display: grid;
          grid-template-columns: 1fr auto auto;
          align-items: center;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .cta-left-side { display: flex; flex-direction: column; gap: 5px; }
        .premium-badge-v3 {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 800;
          font-size: 0.65rem;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .cta-price-v3 { display: flex; flex-direction: column; gap: 2px; }
        .price-main-v3 { display: flex; align-items: baseline; gap: 10px; }
        .price-amt-v3 { font-size: 1.8rem; font-weight: 900; color: #fff; line-height: 1; text-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
        .seats-tag-v3 { color: #EE6662; font-size: 0.85rem; font-weight: 700; }
        .counting-text-v3 { color: rgba(255, 255, 255, 0.5); font-size: 0.75rem; margin: 0; font-weight: 500; }

        .cta-center-btn { display: flex; justify-content: center; }
        .cta-reg-btn-v3 {
          background: linear-gradient(135deg, #EE6662 0%, #D9534F 100%);
          color: #fff;
          padding: 14px 40px;
          border-radius: 12px;
          font-weight: 900;
          font-size: 1.2rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .glow-popup {
          animation: glowPopupPulse 2s infinite ease-in-out;
          box-shadow: 0 0 20px rgba(238, 102, 98, 0.6);
          position: relative;
        }

        @keyframes glowPopupPulse {
          0% { transform: scale(1); box-shadow: 0 0 10px rgba(238, 102, 98, 0.4); }
          50% { transform: scale(1.08); box-shadow: 0 0 40px rgba(238, 102, 98, 0.8), 0 0 60px rgba(238, 102, 98, 0.3); }
          100% { transform: scale(1); box-shadow: 0 0 10px rgba(238, 102, 98, 0.4); }
        }

        .cta-reg-btn-v3 i {
          background: rgba(255, 255, 255, 0.2);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .cta-right-timer { display: flex; justify-content: flex-end; }
        .cta-action-v3 { display: flex; justify-content: flex-end; }

        @media (max-width: 991px) {
          .fixed-bottom-cta { padding: 15px 0; }
          .cta-content-wrapper {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            padding: 0 15px;
          }
          .cta-left-side { grid-column: 1; }
          .cta-timer-v3 { grid-column: 2; display: flex; justify-content: flex-end; }
          .cta-action-v3 { grid-column: 1 / span 2; display: flex; justify-content: center; width: 100%; margin-top: 5px; }
          .cta-reg-btn-v3 { width: 100%; justify-content: center; padding: 12px; font-size: 1.1rem; }
          
          .price-amt-v3 { font-size: 1.5rem; }
          .seats-tag-v3 { font-size: 0.75rem; }
          .counting-text-v3 { font-size: 0.65rem; }
        }

        @media (max-width: 480px) {
          .cta-content-wrapper { gap: 10px; }
          .price-amt-v3 { font-size: 1.3rem; }
        }

        /* Premium Modal Upgrade */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(59, 34, 97, 0.4);
          backdrop-filter: blur(10px);
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-container {
          background: #fff;
          width: 100%;
          max-width: 900px;
          border-radius: 40px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,0.2);
          border: none;
        }

        .modal-close {
          position: absolute;
          top: 25px;
          right: 25px;
          background: rgba(0,0,0,0.05);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          color: #333;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .modal-close:hover { background: #fee2e2; color: #ef4444; }

        .modal-content-wrapper { display: grid; grid-template-columns: 1fr 1.2fr; min-height: 550px; }
        .modal-image-side { 
          position: relative; 
          background: var(--brand-purple);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
          color: #fff;
        }
        .modal-image-side h4 { font-size: 2.2rem; font-weight: 900; margin-bottom: 20px; line-height: 1.1; }
        .modal-image-side p { font-size: 1.1rem; opacity: 0.8; margin-bottom: 40px; }
        .modal-points { list-style: none; padding: 0; }
        .modal-points li { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; font-weight: 600; }
        .modal-points i { color: var(--brand-coral); font-size: 1.2rem; }

        .modal-form-side { padding: 60px; background: #fff; display: flex; flex-direction: column; justify-content: center; }
        .form-header-mini h3 { font-size: 2rem; font-weight: 900; color: var(--brand-purple); margin-bottom: 10px; }
        .form-header-mini p { color: var(--brand-coral); font-weight: 800; margin-bottom: 35px; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; }
        
        .modal-form .form-group { margin-bottom: 20px; }
        .modal-form label { font-size: 0.85rem; font-weight: 700; color: var(--text-dark); margin-bottom: 8px; display: block; text-transform: uppercase; }
        .modal-form input { 
          width: 100%; 
          padding: 15px 20px; 
          border-radius: 12px; 
          border: 1.5px solid #e2e8f0; 
          background: #f8fafc; 
          color: #1e293b; 
          font-size: 1rem;
          transition: 0.3s;
        }
        .modal-form input:focus { border-color: var(--brand-purple); background: #fff; outline: none; box-shadow: 0 0 0 4px rgba(59, 34, 151, 0.05); }
        .modal-form .secure-text { text-align: center; font-size: 0.8rem; color: var(--text-muted); margin-top: 20px; font-weight: 600; }

        @media (max-width: 991px) {
          .hero-main-grid, .mentor-v2-grid, .patterns-grid, .learn-grid, .days-grid { grid-template-columns: 1fr; }
          .why-card-v2 { width: 100%; }
          .cta-inner { flex-direction: column; padding: 12px 15px; gap: 12px; }
          .cta-mobile-row { width: 100%; gap: 10px; justify-content: center; }
          .cta-price-info h4 { font-size: 1.4rem; }
          .cta-price-info h4 small { display: inline; margin-left: 5px; }
          .cta-reg-btn { width: auto; align-self: center; padding: 10px 30px; font-size: 1rem; }
          .cta-timer-wrapper .minimal-timer { padding: 6px 12px; }
          .cta-timer-wrapper .timer-label { display: none; }
          .cta-timer-wrapper .timer-vals { font-size: 0.95rem; }
          .modal-content-wrapper { grid-template-columns: 1fr; }
          .modal-image-side { padding: 40px; text-align: center; }
          .modal-image-side h4 { font-size: 1.8rem; }
          .modal-form-side { padding: 40px; }
          .day-card { padding: 40px 25px; }
        }

        @media (max-width: 480px) {
          .cta-price-info h4 { font-size: 1.1rem; }
          .price-badge { font-size: 0.65rem; padding: 3px 8px; }
          .cta-timer-wrapper .timer-vals { font-size: 0.85rem; }
          .cta-reg-btn { padding: 8px 20px; font-size: 0.9rem; gap: 6px; }
          .cta-mobile-row { flex-wrap: wrap; gap: 5px; }
        }
      `}</style>
    </div>
  );
}

export default Webinar;
