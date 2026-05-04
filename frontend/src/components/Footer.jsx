import React from 'react';
import { Link } from 'react-router-dom';

const ContactIcon = ({ children }) => (
  <div style={{
    width: 36, height: 36, borderRadius: 8,
    background: '#fff',
    border: '1px solid var(--glass-border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }}>
    {children}
  </div>
);

function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Cinzel:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');
        
        :root {
          --footer-bg: #fffbf5;
          --cosmic-accent-pink: #e31b7a;
          --cosmic-accent-orange: #ff6a00;
          --cosmic-text: #2d1506;
          --cosmic-text-muted: #6b4a32;
          --glass-border: #e8d5c0;
          --cosmic-gradient: linear-gradient(135deg, #e31b7a, #ff6a00);
        }

        @keyframes fb-shift { 0%{background-position:0%} 100%{background-position:200%} }

        .fb-root { 
          background: var(--footer-bg); 
          font-family: 'Jost', sans-serif; 
          position: relative; 
          overflow: hidden; 
          margin-top: 60px;
          border-top: 1px solid var(--glass-border);
        }

        .fb-top-bar {
          height: 3px;
          background: linear-gradient(90deg, #e31b7a, #ff6a00, #ffb347, #ff6a00, #e31b7a);
          background-size: 200% 100%;
          animation: fb-shift 6s linear infinite;
        }

        .fb-pattern {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden; opacity: 0.03;
        }

        .fb-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 70px 30px 50px; }

        .fb-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 40px; }
        @media(max-width: 1024px){ .fb-grid { grid-template-columns: 1.5fr 1fr 1fr; } .fb-grid > *:last-child { grid-column: span 3; } }
        @media(max-width: 768px){ 
          .fb-grid { grid-template-columns: 1fr 1fr; gap: 40px 20px; } 
          .fb-grid > *:first-child, .fb-grid > *:last-child { grid-column: span 2; }
          .fb-inner { padding: 50px 20px 40px; }
        }
        @media(max-width: 480px){ 
          .fb-grid { grid-template-columns: 1fr; text-align: center; gap: 35px; }
          .fb-grid > * { grid-column: span 1 !important; display: flex; flex-direction: column; align-items: center; }
          .fb-logo { justify-content: center; }
          .fb-desc { margin-left: auto; margin-right: auto; }
          .fb-nl-wrap { margin: 0 auto; }
          .fb-socials { justify-content: center; }
          .fb-head::after { margin-left: auto; margin-right: auto; }
          .fb-nav { align-items: center; }
          .fb-nav li a { justify-content: center; }
          .fb-clist { align-items: center; width: 100%; }
          .fb-citem { flex-direction: column; align-items: center; text-align: center; }
          .fb-badges { justify-content: center; }
        }

        .fb-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; margin-bottom: 20px; }
        .fb-logo-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--cosmic-gradient); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .fb-logo-name { font-family: 'Cinzel', serif; font-size: 28px; font-weight: 700; color: var(--cosmic-text); letter-spacing: 0.5px; line-height: 1; }
        .fb-logo-name em { font-style: normal; color: var(--cosmic-accent-pink); }

        .fb-desc { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; line-height: 1.6; color: var(--cosmic-text-muted); max-width: 320px; margin-bottom: 25px; font-weight: 500; }

        .fb-nl-label { font-size: 0.8rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--cosmic-accent-pink); margin-bottom: 12px; }
        .fb-nl-wrap { display: flex; border: 1px solid var(--glass-border); border-radius: 8px; overflow: hidden; background: #fff; max-width: 300px; width: 100%; }
        .fb-nl-inp { flex: 1; border: none; outline: none; padding: 10px 14px; font-family: 'Jost', sans-serif; font-size: 0.95rem; color: var(--cosmic-text); min-width: 0; }
        .fb-nl-btn { background: var(--cosmic-gradient); border: none; padding: 0 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: opacity 0.2s; }
        .fb-nl-btn:hover { opacity: 0.9; }

        .fb-socials { display: flex; gap: 12px; margin-top: 25px; }
        .fb-soc { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--glass-border); background: #fff; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: var(--cosmic-accent-pink); text-decoration: none; }
        .fb-soc:hover { background: var(--cosmic-accent-pink); color: #fff; transform: translateY(-3px); }

        .fb-head { font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--cosmic-text); margin-bottom: 20px; }
        .fb-head::after { content: ''; display: block; width: 30px; height: 2px; background: var(--cosmic-accent-pink); margin-top: 8px; opacity: 0.6; }

        .fb-nav { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .fb-nav li a { color: var(--cosmic-text-muted); text-decoration: none; font-size: 1.05rem; font-weight: 500; display: flex; align-items: center; gap: 10px; transition: color 0.2s; }
        .fb-nav li a:hover { color: var(--cosmic-accent-pink); }

        .fb-clist { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 18px; }
        .fb-citem { display: flex; align-items: center; gap: 14px; }
        .fb-ctxt { font-size: 1.15rem; font-weight: 500; color: var(--cosmic-text-muted); line-height: 1.3; }
        .fb-ctxt strong { display: block; font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--cosmic-accent-pink); margin-bottom: 2px; }

        .fb-badges { display: flex; gap: 10px; margin-top: 25px; flex-wrap: wrap; }
        .fb-badge { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 40px; border: 1px solid var(--glass-border); background: #fff; font-size: 0.95rem; font-weight: 600; color: var(--cosmic-text-muted); }

        .fb-bot-wrap { background: #1a1512; padding: 25px 20px; }
        .fb-bot { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        @media(max-width: 600px){ .fb-bot { justify-content: center; text-align: center; flex-direction: column; gap: 15px; } }
        .fb-copy { font-size: 0.95rem; font-weight: 400; color: rgba(255,255,255,0.7); margin: 0; font-family: 'Jost', sans-serif; }
        .fb-copy span { color: #fff; font-weight: 600; }
        .fb-legal { display: flex; gap: 20px; align-items: center; }
        @media(max-width: 480px){ .fb-legal { gap: 15px; flex-wrap: wrap; justify-content: center; } }
        .fb-legal a { font-size: 0.9rem; font-weight: 500; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
        .fb-legal a:hover { color: #fff; }
        .fb-legal-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.2); }


        .fb-wave { width:100%; overflow:hidden; line-height:0; margin-top:40px; }

        .fb-bot-wrap { background:var(--cosmic-gradient); padding:28px 40px; }
        .fb-bot { max-width:1280px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
        .fb-copy { font-size: 19px; font-weight: 500; color: rgba(255,255,255,0.95); margin: 0; font-family: 'Jost', sans-serif; }
        .fb-copy span { color: #fff; font-weight: 800; }
        .fb-legal { display: flex; gap: 28px; align-items: center; }
        .fb-legal a { font-size: 18px; font-weight: 600; color: rgba(255,255,255,0.9); text-decoration: none; transition: color 0.2s; }
        .fb-legal a:hover { color:#fff; text-decoration:underline; }
        .fb-legal-dot { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,0.5); }
      `}</style>

      <footer className="fb-root w-100">
        <div className="fb-top-bar" />

        <div className="fb-pattern" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="var(--cosmic-accent-pink)" opacity="0.15" />
                <path d="M40 10 L42 16 L48 16 L43 20 L45 26 L40 22 L35 26 L37 20 L32 16 L38 16Z" fill="var(--cosmic-accent)" opacity="0.1" />
                <circle cx="60" cy="55" r="1" fill="var(--cosmic-accent-pink)" opacity="0.1" />
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
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--cosmic-accent-pink)" strokeWidth="1.8">
                      <path d="M2 3h12l-6 5L2 3zM2 3v10h12V3" />
                    </svg>
                  </ContactIcon>
                  <div className="fb-ctxt"><strong>Email</strong>dsastro@gmail.com</div>
                </li>
                <li className="fb-citem">
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--cosmic-accent-pink)" strokeWidth="1.8">
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
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="var(--cosmic-accent-pink)">
                    <path d="M5 0L6.2 3.8H10L7 6.2 8.1 10 5 7.6 1.9 10 3 6.2 0 3.8H3.8L5 0Z" />
                  </svg>
                  Vedic Certified
                </span>
                <span className="fb-badge">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="var(--cosmic-accent-pink)" strokeWidth="1.5">
                    <circle cx="5" cy="5" r="4" />
                    <path d="M3 5l1.5 1.5L7 3.5" />
                  </svg>
                  100% Secure
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom bar */}
        <div className="fb-bot-wrap">
          <div className="fb-bot">
            <p className="fb-copy">© {new Date().getFullYear()} <span>Astro Ava</span>. All rights reserved.</p>
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