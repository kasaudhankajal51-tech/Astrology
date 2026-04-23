import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function LandingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Robust type detection
  const isCourse = location.pathname.includes('course-inquiry') || searchParams.get('type') === 'course';
  const type = isCourse ? 'Course' : 'Webinar';
  
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 1000, once: true });
    
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

  const content = {
    Webinar: {
      title: "Unlock the Secrets of Your Future",
      subtitle: "Join the 2-Day Mega Astrology Workshop & Transform Your Life",
      badge: "FREE LIVE MASTERCLASS",
      courseName: "2-Day Mega Astrology Webinar",
      accent: "#ff6a00", 
      accentSecondary: "#ff0080",
      heroImage: "/images/bg-bannerpic.jpg",
      heroVideo: "/videohomefinal.mp4",
      layout: "split",
      stats: [
        { label: "Students", val: "1L+" },
        { label: "Rating", val: "4.9/5" },
        { label: "Experience", val: "16y+" }
      ],
      cta: "CLAIM MY FREE SEAT"
    },
    Course: {
      title: "Master Vedic Astrology",
      subtitle: "From Beginner to Professional Certified Astrologer in 12 Weeks",
      badge: "ISO 9001:2015 CERTIFIED",
      courseName: "Advanced Vedic Astrology Certification",
      accent: "#8a2be2", 
      accentSecondary: "#4b0082",
      heroImage: "/images/moon.jpg",
      heroVideo: "/videohomefinal.mp4",
      layout: "centered",
      stats: [
        { label: "Duration", val: "12 Weeks" },
        { label: "Modules", val: "24+" },
        { label: "Level", val: "Beginner to Pro" }
      ],
      curriculum: [
        { title: "The Foundation", desc: "Planetary strengths, houses, and zodiac signs mastery." },
        { title: "Predictive Mastery", desc: "Timing events using Dasha and Gochar (Transit) systems." },
        { title: "Remedial Science", desc: "Gemstones, Mantras, and modern Vedic remedies." },
        { title: "Professional Practice", desc: "How to handle clients and build a consultation career." }
      ],
      cta: "ENROLL IN MASTERCLASS"
    }
  }[type];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error('Enter a valid 10-digit phone.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type, courseName: content.courseName }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Registration Success!');
        navigate(data.paymentUrl);
      } else toast.error('Error submitting form.');
    } catch (err) { toast.error('Network Error.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className={`lp-container lp-${type.toLowerCase()}`}>
      {/* 1. Global Theme Styles */}
      <style>{`
        :root {
          --lp-accent: ${content.accent};
          --lp-accent-sec: ${content.accentSecondary};
          --cosmic-dark: #070913;
          --cosmic-navy: #0b1220;
        }
        .lp-container { background: var(--cosmic-dark); color: #fff; font-family: 'Outfit', sans-serif; overflow-x: hidden; }
        .text-gradient { background: linear-gradient(135deg, var(--lp-accent), var(--lp-accent-sec)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .mystic-btn { background: linear-gradient(135deg, var(--lp-accent), var(--lp-accent-sec)); color: #fff; border: none; border-radius: 50px; padding: 12px 32px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; box-shadow: 0 10px 25px rgba(0,0,0,0.5); cursor: pointer; font-size: 0.95rem; }
        .mystic-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 35px var(--lp-accent); }

        /* Minimal Nav */
        .lp-nav { position: fixed; top: 0; width: 100%; padding: 20px 0; z-index: 100; background: rgba(7,9,19,0.8); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .logo-text { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 800; }

        /* Hero */
        .lp-hero { position: relative; padding: 160px 0 100px; min-height: 100vh; display: flex; align-items: center; }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.2; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, var(--cosmic-dark)); }
        
        .hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 20px; width: 100%; }
        .split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .centered-layout { text-align: center; max-width: 900px; margin: 0 auto; }

        .badge-premium { display: inline-block; padding: 8px 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--lp-accent); border-radius: 50px; color: var(--lp-accent); font-weight: 700; font-size: 0.75rem; letter-spacing: 2px; margin-bottom: 25px; }
        .hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; line-height: 1.1; margin-bottom: 25px; }
        .hero-p { font-size: 1.3rem; color: #94a3b8; margin-bottom: 45px; }

        /* Video Card */
        .video-box { border-radius: 24px; overflow: hidden; border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.8); max-width: 550px; margin: 0 auto 50px; position: relative; }
        .video-box video { width: 100%; display: block; }
        .play-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); }
        .play-overlay i { font-size: 4rem; opacity: 0.6; }

        /* Form Card */
        .form-card-glass { background: rgba(15, 15, 25, 0.9); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-top: 2px solid var(--lp-accent); border-radius: 24px; padding: 45px; box-shadow: 0 40px 100px rgba(0,0,0,0.8); }
        .form-card-glass h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 30px; }
        .input-box { margin-bottom: 25px; text-align: left; }
        .input-box label { display: block; margin-bottom: 10px; color: #94a3b8; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .input-box input { width: 100%; padding: 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; transition: 0.3s; font-size: 1rem; }
        .input-box input:focus { border-color: var(--lp-accent); background: rgba(255,255,255,0.05); outline: none; }

        /* Curriculum Section */
        .curr-section { padding: 100px 0; background: var(--cosmic-navy); }
        .curr-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 60px; }
        .curr-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 40px; border-radius: 20px; transition: 0.4s; }
        .curr-card:hover { border-color: var(--lp-accent); transform: translateY(-10px); background: rgba(255,255,255,0.04); }
        .curr-card i { font-size: 2rem; color: var(--lp-accent); margin-bottom: 20px; display: block; }
        .curr-card h4 { font-size: 1.4rem; margin-bottom: 15px; }
        .curr-card p { color: #94a3b8; line-height: 1.6; }

        /* Instructor */
        .inst-section { padding: 100px 0; }
        .inst-flex { display: flex; align-items: center; gap: 60px; max-width: 1000px; margin: 0 auto; }
        .inst-img { flex: 0 0 350px; border-radius: 30px; overflow: hidden; border: 5px solid rgba(255,255,255,0.05); }
        .inst-img img { width: 100%; display: block; }
        .inst-text h2 { font-size: 2.5rem; margin-bottom: 20px; }
        .inst-text p { font-size: 1.1rem; color: #94a3b8; line-height: 1.8; }

        /* Stats Bar */
        .stats-bar { padding: 60px 0; background: linear-gradient(to bottom, var(--cosmic-dark), var(--cosmic-navy)); }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; max-width: 1000px; margin: 0 auto; }
        .stat-val { font-size: 2.8rem; font-weight: 900; color: var(--lp-accent); line-height: 1; margin-bottom: 10px; }
        .stat-label { color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; }

        /* Countdown */
        .countdown-strip { padding: 100px 0; text-align: center; background: var(--cosmic-dark); }
        .timer-row { display: flex; justify-content: center; gap: 40px; margin: 50px 0; }
        .t-box { background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; min-width: 110px; border: 1px solid rgba(255,255,255,0.05); }
        .t-box h4 { font-size: 2.8rem; font-weight: 900; color: var(--lp-accent); margin: 0; }
        .t-box p { margin-top: 10px; color: #94a3b8; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }

        @media (max-width: 991px) {
          .split-layout { grid-template-columns: 1fr; text-align: center; }
          .inst-flex { flex-direction: column; text-align: center; }
          .inst-img { flex: 0 0 auto; width: 250px; margin: 0 auto; }
          .stats-grid { grid-template-columns: 1fr; gap: 50px; }
          .timer-row { gap: 15px; }
          .t-box { min-width: 90px; padding: 20px; }
          .t-box h4 { font-size: 2.2rem; }
        }
      `}</style>

      {/* Minimal Navigation */}
      <nav className="lp-nav">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo-text">Astro <span className="text-gradient">Ava</span></div>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="btn mystic-btn-outline d-none d-md-block" style={{padding: '8px 25px'}}>Register Now</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="hero-bg">
          <img src={content.heroImage} alt="cosmos" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          {content.layout === 'split' ? (
            <div className="split-layout">
              <div data-aos="fade-right">
                <span className="badge-premium">{content.badge}</span>
                <h1 className="hero-h1">Let the Stars Shape<br/><span className="text-gradient">Your Journey</span></h1>
                <p className="hero-p">{content.subtitle}</p>
                <div className="video-box">
                  <video src={content.heroVideo} autoPlay muted loop playsInline></video>
                  <div className="play-overlay"><i className="fas fa-play-circle"></i></div>
                </div>
              </div>
              <div data-aos="fade-left">
                <div className="form-card-glass">
                  <h3 className="text-center">Secure Your Spot</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="input-box">
                      <label>Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter Your Name" />
                    </div>
                    <div className="input-box">
                      <label>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter Your Email" />
                    </div>
                    <div className="input-box">
                      <label>Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10 Digit Number" />
                    </div>
                    <button type="submit" className="mystic-btn w-100" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : content.cta}
                    </button>
                  </form>
                  <p className="text-center mt-3 text-muted small"><i className="fas fa-lock me-2"></i> Your data is safe and secure.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="centered-layout" data-aos="zoom-in">
              <span className="badge-premium">{content.badge}</span>
              <h1 className="hero-h1">{content.title}</h1>
              <p className="hero-p">{content.subtitle}</p>
              
              <div className="video-box" style={{maxWidth: '700px'}}>
                <video src={content.heroVideo} autoPlay muted loop playsInline></video>
                <div className="play-overlay"><i className="fas fa-play-circle"></i></div>
              </div>

              <div className="form-card-glass" style={{maxWidth: '550px', margin: '0 auto'}}>
                <h3 className="text-center">Download Curriculum & Register</h3>
                <form onSubmit={handleSubmit}>
                  <div className="input-box">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="input-box">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="input-box">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <button type="submit" className="mystic-btn w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Enrolling...' : content.cta}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {content.stats.map((s, i) => (
              <div className="stat-item" key={i} data-aos="fade-up" data-aos-delay={i*100}>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Curriculum Section (Only for Course) */}
      {type === 'Course' && content.curriculum && (
        <section className="curr-section">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h5 className="badge-premium">The Curriculum</h5>
              <h2 className="hero-h1">What You Will <span className="text-gradient">Learn</span></h2>
            </div>
            <div className="curr-grid">
              {content.curriculum.map((item, i) => (
                <div className="curr-card" key={i} data-aos="fade-up" data-aos-delay={i*100}>
                  <i className="fas fa-book-open"></i>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instructor Section */}
      <section className="inst-section">
        <div className="container">
          <div className="inst-flex" data-aos="fade-right">
            <div className="inst-img">
              <img src="/images/bg-bannerpic.jpg" alt="Instructor" />
            </div>
            <div className="inst-text">
              <h5 className="badge-premium">The Mentor</h5>
              <h2>Master the Art with <span className="text-gradient">Expert Guidance</span></h2>
              <p>
                With over 16 years of experience in Vedic Astrology, our lead instructor has helped thousands 
                of students unlock their true potential. This course is designed to take you from a curious 
                beginner to a professional consultant with practical, real-world case studies.
              </p>
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="mystic-btn mt-4">Join The Journey</button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Strip */}
      <section className="countdown-strip">
        <div className="container" data-aos="flip-up">
          <h2 className="hero-h1">Registration <span className="text-gradient">Closing Soon</span></h2>
          <p className="hero-p">Don't miss the chance to start your professional career.</p>
          <div className="timer-row">
            <div className="t-box"><h4>{String(timeLeft.hours).padStart(2, '0')}</h4><p>Hours</p></div>
            <div className="t-box"><h4>{String(timeLeft.minutes).padStart(2, '0')}</h4><p>Mins</p></div>
            <div className="t-box"><h4>{String(timeLeft.seconds).padStart(2, '0')}</h4><p>Secs</p></div>
          </div>
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="mystic-btn big-btn">
            Reserve Your Seat Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
