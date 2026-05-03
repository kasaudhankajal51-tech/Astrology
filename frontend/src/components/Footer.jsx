import React from 'react';
import { Link } from 'react-router-dom';

const ContactIcon = ({ children }) => (
  <div style={{
    width: 38, height: 38, borderRadius: 10,
    background: 'white',
    border: '2px solid var(--cosmic-accent-pink)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }}>
    {children}
  </div>
);

function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&family=Playfair+Display:wght@500;600;700&display=swap');

        :root {
          --cosmic-accent: #ff6a00;
          --cosmic-accent-orange: #ff8c00;
          --cosmic-accent-pink: #e31b7a;
          --cosmic-gradient: linear-gradient(135deg, #e31b7a, #ff6a00, #ffb347);
          --cosmic-accent-soft: #ffe4f0;
          --cosmic-text: #1a1a1a;
          --cosmic-text-muted: #4a4a4a;
          --glass-border: #e0c8b8;
          --premium-shadow: 0 6px 14px rgba(0,0,0,0.08);
        }

        @keyframes fb-shift { 0%{background-position:0%} 100%{background-position:200%} }

        .fb-root { background:#fffbf5; font-family:'Inter',sans-serif; position:relative; overflow:hidden; }

        .fb-top-bar {
          height:4px;
          background:linear-gradient(90deg, var(--cosmic-accent-pink), var(--cosmic-accent), var(--cosmic-accent-orange), #ffbb00, var(--cosmic-accent-pink));
          background-size:200% 100%;
          animation:fb-shift 4s linear infinite;
        }

        .fb-pattern {
          position:absolute; inset:0; pointer-events:none; overflow:hidden; opacity:0.04;
        }

        .fb-inner { position:relative; z-index:1; max-width:1280px; margin:0 auto; padding:64px 40px 48px; }

        .fb-grid { display:grid; grid-template-columns:1.9fr 1fr 1fr 1.4fr; gap:52px 40px; }
        @media(max-width:900px){ .fb-grid { grid-template-columns:1fr 1fr; gap:42px 28px; } }
        @media(max-width:520px){ .fb-grid { grid-template-columns:1fr; } }

        .fb-logo { display:flex; align-items:center; gap:12px; text-decoration:none; margin-bottom:20px; }
        .fb-logo-icon { width:52px; height:52px; border-radius:14px; background:var(--cosmic-gradient); display:flex; align-items:center; justify-content:center; box-shadow:var(--premium-shadow); flex-shrink:0; }
        .fb-logo-name { font-family:'Playfair Display',serif; font-size:38px; font-weight:700; color:var(--cosmic-text); letter-spacing:0.5px; line-height:1.2; }
        .fb-logo-name em { font-style:normal; background:var(--cosmic-gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }

        .fb-desc { font-size:18px; line-height:1.6; color:#3a2a22; max-width:300px; margin-bottom:28px; font-weight:500; }

        .fb-nl-label { font-size:15px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:var(--cosmic-accent-pink); margin-bottom:12px; }
        .fb-nl-wrap { display:flex; border:2px solid var(--glass-border); border-radius:12px; overflow:hidden; background:#fff; transition:all 0.2s; }
        .fb-nl-wrap:focus-within { border-color:var(--cosmic-accent-pink); box-shadow:var(--premium-shadow); }
        .fb-nl-inp { flex:1; border:none; outline:none; padding:14px 16px; font-family:'Inter',sans-serif; font-size:17px; font-weight:500; color:var(--cosmic-text); background:transparent; }
        .fb-nl-inp::placeholder { color:#c0a090; font-weight:400; }
        .fb-nl-btn { background:var(--cosmic-gradient); border:none; padding:12px 20px; cursor:pointer; display:flex; align-items:center; transition:opacity 0.2s; border-radius:0 10px 10px 0; }
        .fb-nl-btn:hover { opacity:0.9; }

        .fb-socials { display:flex; gap:12px; margin-top:28px; }
        .fb-soc { width:44px; height:44px; border-radius:12px; border:2px solid var(--glass-border); background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.22s; color:var(--cosmic-accent-pink); text-decoration:none; }
        .fb-soc:hover { background:var(--cosmic-gradient); color:#fff; border-color:transparent; transform:translateY(-3px); box-shadow:var(--premium-shadow); }

        .fb-head { font-size:18px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; background:var(--cosmic-gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:22px; }
        .fb-head::after { content:''; display:block; width:40px; height:3px; background:var(--cosmic-gradient); margin-top:10px; border-radius:3px; }

        .fb-nav { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:14px; }
        .fb-nav li a { color:#3a2a22; text-decoration:none; font-size:18px; font-weight:600; display:flex; align-items:center; gap:10px; transition:all 0.2s; }
        .fb-nav li a::before { content:''; width:8px; height:8px; border-radius:50%; background:var(--cosmic-accent-pink); flex-shrink:0; transition:transform 0.2s; }
        .fb-nav li a:hover { color:var(--cosmic-accent-pink); transform:translateX(6px); }
        .fb-nav li a:hover::before { transform:scale(1.2); background:var(--cosmic-accent-pink); }

        .fb-clist { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:18px; }
        .fb-citem { display:flex; align-items:flex-start; gap:14px; }
        .fb-ctxt { font-size:18px; font-weight:500; color:#3a2a22; line-height:1.5; }
        .fb-ctxt strong { display:block; font-size:15px; font-weight:800; letter-spacing:1px; text-transform:uppercase; background:var(--cosmic-gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:4px; }

        .fb-badges { display:flex; gap:12px; margin-top:24px; flex-wrap:wrap; }
        .fb-badge { display:flex; align-items:center; gap:8px; padding:8px 16px; border-radius:40px; border:2px solid var(--glass-border); background:#fff; font-size:15px; font-weight:700; color:var(--cosmic-accent-pink); }

        .fb-wave { width:100%; overflow:hidden; line-height:0; margin-top:40px; }

        .fb-bot-wrap { background:var(--cosmic-gradient); padding:28px 40px; }
        .fb-bot { max-width:1280px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
        .fb-copy { font-size:17px; font-weight:500; color:rgba(255,255,255,0.95); margin:0; font-family:'Inter',sans-serif; }
        .fb-copy span { color:#fff; font-weight:800; }
        .fb-legal { display:flex; gap:28px; align-items:center; }
        .fb-legal a { font-size:16px; font-weight:600; color:rgba(255,255,255,0.9); text-decoration:none; transition:color 0.2s; }
        .fb-legal a:hover { color:#fff; text-decoration:underline; }
        .fb-legal-dot { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,0.5); }
      `}</style>

      <footer className="fb-root w-100">
        <div className="fb-top-bar" />

        <div className="fb-pattern" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fp" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="#e31b7a" />
                <path d="M30 5 L32 11 L38 11 L33 15 L35 21 L30 17 L25 21 L27 15 L22 11 L28 11Z" fill="#ff6a00" opacity="0.5" />
                <circle cx="50" cy="45" r="1" fill="#e31b7a" />
                <circle cx="5" cy="50" r="1.2" fill="#ffb347" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fp)" />
          </svg>
        </div>

        <div className="fb-inner">
          <div className="fb-grid">

            {/* Brand */}
            <div>
              <Link to="/" className="fb-logo">
                <div className="fb-logo-icon">
                  <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2L13.5 8.5H20L14.5 12.5L16.5 19L11 15L5.5 19L7.5 12.5L2 8.5H8.5L11 2Z" fill="white" />
                  </svg>
                </div>
                <div className="fb-logo-name">Astro<em>Ava</em></div>
              </Link>
              <p className="fb-desc">
                Discover the cosmic narrative written in the stars. Let Astro Ava guide your path through planetary influences and celestial wisdom.
              </p>

              <div className="fb-nl-label">Stay Aligned</div>
              <div className="fb-nl-wrap">
                <input className="fb-nl-inp" type="email" placeholder="your@email.com" />
                <button className="fb-nl-btn" aria-label="Subscribe">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="fb-socials">
                <a href="#" className="fb-soc" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M7.5 1C4 1 1 4 1 7.5C1 10.7 3.3 13.3 6.4 13.9V9.3H4.9V7.5H6.4V6.2C6.4 4.7 7.3 3.9 8.7 3.9C9.3 3.9 10 4 10 4V5.5H9.3C8.5 5.5 8.3 6 8.3 6.5V7.5H10L9.7 9.3H8.3V13.9C11.4 13.3 13.7 10.7 13.7 7.5C13.7 4 10.7 1 7.5 1Z" />
                  </svg>
                </a>
                <a href="#" className="fb-soc" aria-label="X">
                  <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M1.5 1.5L5.9 7.4L1.5 12.5H2.8L6.5 8.2L9.5 12.5H12.5L7.8 6.3L11.9 1.5H10.6L7.2 5.5L4.5 1.5H1.5Z" />
                  </svg>
                </a>
                <a href="#" className="fb-soc" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1.5" y="1.5" width="11" height="11" rx="3" />
                    <circle cx="7" cy="7" r="2.5" />
                    <circle cx="10.2" cy="3.8" r="0.6" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" className="fb-soc" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M12.2 3.6C12 2.8 11.4 2.2 10.6 2C9.2 1.7 7 1.7 7 1.7S4.8 1.7 3.4 2C2.6 2.2 2 2.8 1.8 3.6C1.5 5 1.5 7 1.5 7S1.5 9 1.8 10.4C2 11.2 2.6 11.8 3.4 12C4.8 12.3 7 12.3 7 12.3S9.2 12.3 10.6 12C11.4 11.8 12 11.2 12.2 10.4C12.5 9 12.5 7 12.5 7S12.5 5 12.2 3.6ZM5.8 9.2V4.8L9.2 7L5.8 9.2Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Consultations */}
            <div>
              <h5 className="fb-head">Consultations</h5>
              <ul className="fb-nav">
                {['Personal Horoscope', 'Marriage & Relationships', 'Career & Business', 'Muhurat Timing', 'Health Astrology'].map(item => (
                  <li key={item}><Link to="#">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h5 className="fb-head">Explore</h5>
              <ul className="fb-nav">
                {[['About Us', '/about'], ['Free Tools', '/freetools'], ['Blog', '/blog'], ['Astro Store', '/store'], ['Contact', '/contact']].map(([label, to]) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="fb-head">Contact</h5>
              <ul className="fb-clist">
                <li className="fb-citem">
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#e31b7a" strokeWidth="1.8">
                      <path d="M2 3h12l-6 5L2 3zM2 3v10h12V3" />
                    </svg>
                  </ContactIcon>
                  <div className="fb-ctxt"><strong>Email</strong>dsastro@gmail.com</div>
                </li>
                <li className="fb-citem">
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#e31b7a" strokeWidth="1.8">
                      <path d="M3 1h3l1.5 4-2 1.2a9 9 0 004.3 4.3L11 8.5l4 1.5v3C12 14 2 10 3 1z" />
                    </svg>
                  </ContactIcon>
                  <div className="fb-ctxt"><strong>WhatsApp</strong>+91 8418-903-966</div>
                </li>
                <li className="fb-citem">
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#e31b7a" strokeWidth="1.8">
                      <path d="M8 1C5.8 1 4 2.8 4 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                    </svg>
                  </ContactIcon>
                  <div className="fb-ctxt"><strong>Location</strong>New Delhi, India</div>
                </li>
              </ul>

              <div className="fb-badges">
                <span className="fb-badge">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="#e31b7a">
                    <path d="M5 0L6.2 3.8H10L7 6.2 8.1 10 5 7.6 1.9 10 3 6.2 0 3.8H3.8L5 0Z" />
                  </svg>
                  Vedic Certified
                </span>
                <span className="fb-badge">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="#e31b7a" strokeWidth="1.5">
                    <circle cx="5" cy="5" r="4" />
                    <path d="M3 5l1.5 1.5L7 3.5" />
                  </svg>
                  100% Secure
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="fb-wave">
          <svg viewBox="0 0 1200 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 50 }}>
            <defs>
              <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e31b7a" />
                <stop offset="50%" stopColor="#ff6a00" />
                <stop offset="100%" stopColor="#e31b7a" />
              </linearGradient>
            </defs>
            <path d="M0 30 C200 0 400 50 600 25 C800 0 1000 40 1200 20 L1200 50 L0 50 Z" fill="url(#wg)" />
          </svg>
        </div>

        {/* Bottom bar */}
        <div className="fb-bot-wrap">
          <div className="fb-bot">
            <p className="fb-copy">© {new Date().getFullYear()} <span>Astro Ava</span>. All rights reserved. Crafted with cosmic care in India.</p>
            <div className="fb-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <div className="fb-legal-dot" />
              <Link to="/terms">Terms of Service</Link>
              <div className="fb-legal-dot" />
              <Link to="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;