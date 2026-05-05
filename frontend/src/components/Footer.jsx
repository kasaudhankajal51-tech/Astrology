import React from 'react';
import { Link } from 'react-router-dom';

const ContactIcon = ({ children }) => (
  <div style={{
    width: 36, height: 36, borderRadius: 10,
    background: '#fff',
    border: '1px solid var(--glass-border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
  }}>
    {children}
  </div>
);

function Footer() {
  return (
    <>
      <style>{`
        .fb-root { 
          background: var(--bg-color); 
          font-family: var(--font-sans); 
          position: relative; 
          overflow: hidden; 
          margin-top: 80px;
          border-top: 1px solid var(--glass-border);
        }

        .fb-top-bar {
          height: 5px;
          background: linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--primary-color));
          background-size: 200% 100%;
          animation: fb-shift 6s linear infinite;
        }
        
        @keyframes fb-shift { 0%{background-position:0%} 100%{background-position:200%} }

        .fb-pattern {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden; opacity: 0.04;
        }

        .fb-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 80px 30px 60px; }

        .fb-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 50px; }
        @media(max-width: 1024px){ .fb-grid { grid-template-columns: 1.5fr 1fr 1fr; } .fb-grid > *:last-child { grid-column: span 3; } }
        @media(max-width: 768px){ 
          .fb-grid { grid-template-columns: 1fr 1fr; gap: 40px 20px; } 
          .fb-grid > *:first-child, .fb-grid > *:last-child { grid-column: span 2; }
          .fb-inner { padding: 60px 20px 40px; }
        }
        @media(max-width: 480px){ 
          .fb-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .fb-grid > * { grid-column: span 1 !important; display: flex; flex-direction: column; align-items: center; }
          .fb-logo { justify-content: center; }
          .fb-logo-name { font-size: 32px; }
          .fb-desc { margin-left: auto; margin-right: auto; max-width: 320px; }
          .fb-nl-wrap { margin: 0 auto; max-width: 340px; }
          .fb-socials { justify-content: center; }
        }

        .fb-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; margin-bottom: 25px; }
        .fb-logo-icon { width: 48px; height: 48px; border-radius: 14px; background: var(--primary-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(139, 74, 30, 0.2); }
        .fb-logo-name { font-family: var(--font-serif); font-size: 30px; font-weight: 700; color: var(--text-heading); letter-spacing: -0.5px; line-height: 1; }
        .fb-logo-name em { font-style: normal; color: var(--primary-color); }

        .fb-desc { font-family: var(--font-sans); font-size: 15px; line-height: 1.7; color: var(--text-content); max-width: 320px; margin-bottom: 30px; font-weight: 400; }

        .fb-nl-label { font-size: 14px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary-color); margin-bottom: 15px; font-family: var(--font-sans); }
        .fb-nl-wrap { display: flex; border: 1px solid var(--glass-border); border-radius: 12px; overflow: hidden; background: #fff; max-width: 320px; width: 100%; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .fb-nl-inp { flex: 1; border: none; outline: none; padding: 14px 18px; font-family: var(--font-sans); font-size: 15px; color: var(--text-main); min-width: 0; }
        .fb-nl-btn { background: var(--primary-color); border: none; padding: 0 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        .fb-nl-btn:hover { background: #723c18; }

        .fb-socials { display: flex; gap: 15px; margin-top: 30px; }
        .fb-soc { width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--glass-border); background: #fff; display: flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); color: var(--primary-color); text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .fb-soc:hover { background: var(--primary-color); color: #fff; transform: translateY(-4px); box-shadow: 0 10px 20px rgba(139, 74, 30, 0.2); }

        .fb-head { font-family: var(--font-serif); font-size: 22px; font-weight: 700; color: var(--text-heading); margin-bottom: 25px; }
        .fb-head::after { content: ''; display: block; width: 35px; height: 3px; background: var(--accent-color); margin-top: 10px; border-radius: 2px; }

        .fb-nav { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .fb-nav li a { color: var(--text-content); text-decoration: none; font-size: 15px; font-weight: 500; display: flex; align-items: center; gap: 10px; transition: all 0.2s; font-family: var(--font-sans); }
        .fb-nav li a:hover { color: var(--primary-color); transform: translateX(5px); }

        .fb-clist { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 24px; }
        .fb-citem { display: flex; align-items: flex-start; gap: 16px; }
        .fb-ctxt { font-size: 15px; font-weight: 500; color: var(--text-content); line-height: 1.5; padding-top: 2px; font-family: var(--font-sans); }
        .fb-ctxt strong { display: block; font-family: var(--font-sans); font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary-color); margin-bottom: 5px; line-height: 1; }

        .fb-badges { display: flex; gap: 12px; margin-top: 30px; flex-wrap: wrap; }
        .fb-badge { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 50px; border: 1px solid var(--glass-border); background: #fff; font-size: 14px; font-weight: 600; color: var(--text-muted); font-family: var(--font-sans); box-shadow: 0 2px 6px rgba(0,0,0,0.02); }

        .fb-bot-wrap { background: var(--primary-color); padding: 30px 20px; margin-top: 20px; }
        .fb-bot { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        @media(max-width: 600px){ .fb-bot { justify-content: center; text-align: center; flex-direction: column; gap: 15px; } }
        .fb-copy { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.9); margin: 0; font-family: var(--font-sans); }
        .fb-copy span { color: #fff; font-weight: 700; }
        .fb-legal { display: flex; gap: 25px; align-items: center; }
        @media(max-width: 480px){ .fb-legal { gap: 15px; flex-wrap: wrap; justify-content: center; } }
        .fb-legal a { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; font-family: var(--font-sans); }
        .fb-legal a:hover { color: #fff; text-decoration: underline; }
        .fb-legal-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.3); }
      `}</style>

      <footer className="fb-root w-100">
        <div className="fb-top-bar" />

        <div className="fb-pattern" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="var(--primary-color)" opacity="0.12" />
                <path d="M40 10 L42 16 L48 16 L43 20 L45 26 L40 22 L35 26 L37 20 L32 16 L38 16Z" fill="var(--accent-color)" opacity="0.08" />
                <circle cx="60" cy="55" r="1" fill="var(--primary-color)" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fp)" />
          </svg>
        </div>

        <div className="fb-inner">
          <div className="fb-grid">

            {/* Brand */}
            <div data-aos="fade-up" data-aos-duration="600">
              <Link to="/" className="fb-logo">
                <div className="fb-logo-icon">
                  <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2L13.5 8.5H20L14.5 12.5L16.5 19L11 15L5.5 19L7.5 12.5L2 8.5H8.5L11 2Z" fill="white" />
                  </svg>
                </div>
                <div className="fb-logo-name">Astro<em>Ava</em></div>
              </Link>
              <p className="fb-desc">
                Discover the cosmic narrative written in the stars. Let Astro Ava guide your path through planetary influences and celestial wisdom with expert Vedic insights.
              </p>

              <div className="fb-nl-label">Stay Aligned</div>
              <div className="fb-nl-wrap">
                <input className="fb-nl-inp" type="email" placeholder="your@email.com" />
                <button className="fb-nl-btn" aria-label="Subscribe">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
              <h5 className="fb-head">Consultations</h5>
              <ul className="fb-nav">
                {['Personal Horoscope', 'Marriage & Relationships', 'Career & Business', 'Muhurat Timing', 'Health Astrology'].map(item => (
                  <li key={item}><Link to="#">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
              <h5 className="fb-head">Explore</h5>
              <ul className="fb-nav">
                {[['About Us', '/about'], ['Free Tools', '/freetools'], ['Blog', '/blog'], ['Astro Store', '/store'], ['Contact', '/contact']].map(([label, to]) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="300">
              <h5 className="fb-head">Contact</h5>
              <ul className="fb-clist">
                <li className="fb-citem">
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--primary-color)" strokeWidth="1.8">
                      <path d="M2 3h12l-6 5L2 3zM2 3v10h12V3" />
                    </svg>
                  </ContactIcon>
                  <div className="fb-ctxt"><strong>Email</strong>dsastro@gmail.com</div>
                </li>
                <li className="fb-citem">
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--primary-color)" strokeWidth="1.8">
                      <path d="M3 1h3l1.5 4-2 1.2a9 9 0 004.3 4.3L11 8.5l4 1.5v3C12 14 2 10 3 1z" />
                    </svg>
                  </ContactIcon>
                  <div className="fb-ctxt"><strong>WhatsApp</strong>+91 8418-903-966</div>
                </li>
                <li className="fb-citem">
                  <ContactIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--primary-color)" strokeWidth="1.8">
                      <path d="M8 1C5.8 1 4 2.8 4 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                    </svg>
                  </ContactIcon>
                  <div className="fb-ctxt"><strong>Location</strong>New Delhi, India</div>
                </li>
              </ul>

              <div className="fb-badges">
                <span className="fb-badge">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="var(--primary-color)">
                    <path d="M5 0L6.2 3.8H10L7 6.2 8.1 10 5 7.6 1.9 10 3 6.2 0 3.8H3.8L5 0Z" />
                  </svg>
                  Vedic Certified
                </span>
                <span className="fb-badge">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="var(--primary-color)" strokeWidth="1.5">
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
            <p className="fb-copy">© {new Date().getFullYear()}. All rights reserved.</p>
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