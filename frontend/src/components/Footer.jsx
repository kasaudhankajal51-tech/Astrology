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

// SVG icons for payment methods
const PayPalIcon = () => (
  <svg viewBox="0 0 60 20" width="60" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="16" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#003087">Pay</text>
    <text x="22" y="16" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#009cde">Pal</text>
  </svg>
);

const VisaIcon = () => (
  <svg viewBox="0 0 50 16" width="50" height="16" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="14" fontFamily="Arial" fontWeight="900" fontSize="16" fill="#1a1f71" letterSpacing="-1">VISA</text>
  </svg>
);

function Footer() {
  const socials = [
    {
      label: 'Facebook',
      color: '#1877F2',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
          <path d="M7.5 1C4 1 1 4 1 7.5C1 10.7 3.3 13.3 6.4 13.9V9.3H4.9V7.5H6.4V6.2C6.4 4.7 7.3 3.9 8.7 3.9C9.3 3.9 10 4 10 4V5.5H9.3C8.5 5.5 8.3 6 8.3 6.5V7.5H10L9.7 9.3H8.3V13.9C11.4 13.3 13.7 10.7 13.7 7.5C13.7 4 10.7 1 7.5 1Z" />
        </svg>
      )
    },
    {
      label: 'X / Twitter',
      color: '#000',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
          <path d="M1.5 1.5L5.9 7.4L1.5 12.5H2.8L6.5 8.2L9.5 12.5H12.5L7.8 6.3L11.9 1.5H10.6L7.2 5.5L4.5 1.5H1.5Z" />
        </svg>
      )
    },
    {
      label: 'Instagram',
      color: '#E1306C',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1.5" y="1.5" width="11" height="11" rx="3" />
          <circle cx="7" cy="7" r="2.5" />
          <circle cx="10.2" cy="3.8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      color: '#0A66C2',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
          <path d="M2 2.5A1.5 1.5 0 103.5 1 1.5 1.5 0 002 2.5zM2.2 5H4.8V13H2.2V5zM5.5 5H8v1.1C8.5 5.4 9.4 4.9 10.5 4.9 12 4.9 13 5.9 13 7.7V13h-2.6V8.2c0-.9-.5-1.4-1.2-1.4S8 7.3 8 8.2V13H5.5V5z" />
        </svg>
      )
    },
    {
      label: 'YouTube',
      color: '#FF0000',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
          <path d="M12.2 3.6C12 2.8 11.4 2.2 10.6 2C9.2 1.7 7 1.7 7 1.7S4.8 1.7 3.4 2C2.6 2.2 2 2.8 1.8 3.6C1.5 5 1.5 7 1.5 7S1.5 9 1.8 10.4C2 11.2 2.6 11.8 3.4 12C4.8 12.3 7 12.3 7 12.3S9.2 12.3 10.6 12C11.4 11.8 12 11.2 12.2 10.4C12.5 9 12.5 7 12.5 7S12.5 5 12.2 3.6ZM5.8 9.2V4.8L9.2 7L5.8 9.2Z" />
        </svg>
      )
    },
  ];

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
          .fb-grid { grid-template-columns: 1fr; text-align: center; gap: 48px; }
          .fb-grid > * { 
            grid-column: span 1 !important; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            width: 100%;
          }
          .fb-logo { justify-content: center; width: 100%; }
          .fb-logo-name { font-size: 32px; }
          .fb-desc { margin-left: auto; margin-right: auto; max-width: 340px; margin-bottom: 25px; }
          .fb-nl-wrap { margin: 0 auto; max-width: 320px; }
          .fb-socials { justify-content: center; width: 100%; margin-top: 25px; }
          .fb-nav { align-items: center; }
          .fb-nav li a { justify-content: center; }
          .fb-clist { align-items: stretch; width: 100%; max-width: 320px; margin: 0 auto; }
          .fb-citem { 
            flex-direction: row; 
            align-items: center; 
            text-align: left; 
            gap: 15px; 
            background: rgba(255,255,255,0.4);
            padding: 12px 15px;
            border-radius: 12px;
            width: 100%;
          }
          .fb-ctxt { padding-top: 0; flex: 1; }
          .fb-ctxt strong { margin-bottom: 2px; }
          .fb-head::after { margin: 10px auto 0; }
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

        /* ---- SOCIAL PILLS (new unique style) ---- */
        .fb-socials { display: flex; gap: 10px; margin-top: 30px; flex-wrap: wrap; }
        .fb-soc {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 14px 7px 10px;
          border-radius: 50px;
          border: 1.5px solid var(--glass-border);
          background: #fff;
          font-size: 13px; font-weight: 600; font-family: var(--font-sans);
          color: var(--text-content);
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          white-space: nowrap;
        }
        .fb-soc-dot {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s;
        }
        .fb-soc:hover {
          transform: translateY(-3px);
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          color: #fff;
        }
        .fb-soc:hover .fb-soc-dot { background: rgba(255,255,255,0.2) !important; }
        .fb-soc[data-net="fb"]:hover  { background: #1877F2; }
        .fb-soc[data-net="tw"]:hover  { background: #000; }
        .fb-soc[data-net="ig"]:hover  { background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); }
        .fb-soc[data-net="li"]:hover  { background: #0A66C2; }
        .fb-soc[data-net="yt"]:hover  { background: #FF0000; }

        .fb-head { font-family: var(--font-serif); font-size: 22px; font-weight: 700; color: var(--text-heading); margin-bottom: 25px; }
        .fb-head::after { content: ''; display: block; width: 35px; height: 3px; background: var(--accent-color); margin-top: 10px; border-radius: 2px; }

        .fb-nav { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .fb-nav li a { color: var(--text-content); text-decoration: none; font-size: 15px; font-weight: 500; display: flex; align-items: center; gap: 10px; transition: all 0.2s; font-family: var(--font-sans); }
        .fb-nav li a:hover { color: var(--primary-color); transform: translateX(5px); }

        .fb-clist { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 24px; }
        .fb-citem { display: flex; align-items: flex-start; gap: 16px; }
        .fb-ctxt { font-size: 15px; font-weight: 500; color: var(--text-content); line-height: 1.5; padding-top: 2px; font-family: var(--font-sans); }
        .fb-ctxt strong { display: block; font-family: var(--font-sans); font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary-color); margin-bottom: 5px; line-height: 1; }

        .fb-connect-link { display: flex !important; align-items: center; gap: 12px; color: var(--text-content) !important; text-decoration: none; font-size: 15px; font-weight: 500; font-family: var(--font-sans); transition: all 0.2s ease; }
        .fb-connect-link:hover { color: var(--primary-color) !important; transform: translateX(5px) !important; }
        .fb-connect-icon { width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.2s; }
        .fb-connect-link:hover .fb-connect-icon { transform: scale(1.1); }

        .fb-badges { display: flex; gap: 12px; margin-top: 30px; flex-wrap: wrap; }
        .fb-badge { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 50px; border: 1px solid var(--glass-border); background: #fff; font-size: 14px; font-weight: 600; color: var(--text-muted); font-family: var(--font-sans); box-shadow: 0 2px 6px rgba(0,0,0,0.02); }

        /* ---- TRUST SECTION ---- */
        .fb-trust-wrap {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto 0;
          padding: 0 30px 50px;
        }
        .fb-trust-box {
          border: 1.5px solid var(--glass-border);
          border-radius: 18px;
          background: #fff;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
        }
        .fb-trust-title {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
          padding-right: 20px;
          border-right: 1.5px solid var(--glass-border);
          display: flex; align-items: center; gap: 8px;
        }
        .fb-trust-title svg { flex-shrink: 0; }
        .fb-trust-items {
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap; flex: 1;
        }
        .fb-trust-item {
          display: flex; align-items: center; justify-content: center;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid #eee;
          background: #fafafa;
          transition: box-shadow 0.2s, transform 0.2s;
          min-width: 64px; height: 42px;
        }
        .fb-trust-item:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .fb-trust-divider { width: 1px; height: 32px; background: var(--glass-border); flex-shrink: 0; }
        .fb-trust-secure-badges { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .fb-trust-secure-badge {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600; font-family: var(--font-sans);
          color: #555; padding: 7px 12px; border-radius: 8px;
          border: 1px solid #eee; background: #fafafa;
        }
        @media(max-width: 768px){
          .fb-trust-wrap { padding: 0 20px 40px; }
          .fb-trust-box { padding: 16px 18px; gap: 14px; }
          .fb-trust-title { border-right: none; padding-right: 0; border-bottom: 1.5px solid var(--glass-border); padding-bottom: 12px; width: 100%; }
          .fb-trust-divider { display: none; }
        }

        .fb-bot-wrap { background: var(--primary-color); padding: 30px 20px; }
        .fb-bot { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        @media(max-width: 600px){ .fb-bot { justify-content: center; text-align: center; flex-direction: column; gap: 15px; } }
        .fb-copy { font-size: 15px; font-weight: 400; color: #ffffff !important; margin: 0; font-family: var(--font-sans); }
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
                {[['About Us', '/about'], ['Free Tools', '/free-tools'], ['Blog', '/blog'], ['Astro Store', '/astro-shop'], ['Contact', '/contact']].map(([label, to]) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="300">
              <h5 className="fb-head">Connect</h5>
              <ul className="fb-nav">
                <li>
                  <a href="#" className="fb-connect-link" data-net="fb">
                    <span className="fb-connect-icon" style={{background:'#E8F0FE'}}>
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="#1877F2"><path d="M7.5 1C4 1 1 4 1 7.5C1 10.7 3.3 13.3 6.4 13.9V9.3H4.9V7.5H6.4V6.2C6.4 4.7 7.3 3.9 8.7 3.9C9.3 3.9 10 4 10 4V5.5H9.3C8.5 5.5 8.3 6 8.3 6.5V7.5H10L9.7 9.3H8.3V13.9C11.4 13.3 13.7 10.7 13.7 7.5C13.7 4 10.7 1 7.5 1Z"/></svg>
                    </span>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="fb-connect-link" data-net="tw">
                    <span className="fb-connect-icon" style={{background:'#f0f0f0'}}>
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="#000"><path d="M1.5 1.5L5.9 7.4L1.5 12.5H2.8L6.5 8.2L9.5 12.5H12.5L7.8 6.3L11.9 1.5H10.6L7.2 5.5L4.5 1.5H1.5Z"/></svg>
                    </span>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="fb-connect-link" data-net="ig">
                    <span className="fb-connect-icon" style={{background:'#FDE8F0'}}>
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="#E1306C" strokeWidth="1.5"><rect x="1.5" y="1.5" width="11" height="11" rx="3"/><circle cx="7" cy="7" r="2.5"/><circle cx="10.2" cy="3.8" r="0.6" fill="#E1306C" stroke="none"/></svg>
                    </span>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="fb-connect-link" data-net="li">
                    <span className="fb-connect-icon" style={{background:'#E8F3FB'}}>
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="#0A66C2"><path d="M2 2.5A1.5 1.5 0 103.5 1 1.5 1.5 0 002 2.5zM2.2 5H4.8V13H2.2V5zM5.5 5H8v1.1C8.5 5.4 9.4 4.9 10.5 4.9 12 4.9 13 5.9 13 7.7V13h-2.6V8.2c0-.9-.5-1.4-1.2-1.4S8 7.3 8 8.2V13H5.5V5z"/></svg>
                    </span>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="fb-connect-link" data-net="yt">
                    <span className="fb-connect-icon" style={{background:'#FFEBEB'}}>
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="#FF0000"><path d="M12.2 3.6C12 2.8 11.4 2.2 10.6 2C9.2 1.7 7 1.7 7 1.7S4.8 1.7 3.4 2C2.6 2.2 2 2.8 1.8 3.6C1.5 5 1.5 7 1.5 7S1.5 9 1.8 10.4C2 11.2 2.6 11.8 3.4 12C4.8 12.3 7 12.3 7 12.3S9.2 12.3 10.6 12C11.4 11.8 12 11.2 12.2 10.4C12.5 9 12.5 7 12.5 7S12.5 5 12.2 3.6ZM5.8 9.2V4.8L9.2 7L5.8 9.2Z"/></svg>
                    </span>
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ---- TRUST / SAFE CHECKOUT BAR ---- */}
        <div className="fb-trust-wrap">
          <div className="fb-trust-box" data-aos="fade-up" data-aos-duration="500">
            <div className="fb-trust-title">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 5v5c0 4.4 3 8.5 7 9.5C14 18.5 17 14.4 17 10V5L10 2z" fill="#22c55e" opacity="0.15" stroke="#22c55e" strokeWidth="1.5"/>
                <path d="M7 10l2 2 4-4" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Guaranteed<br/>Safe Checkout
            </div>

            <div className="fb-trust-items">
              {/* PayPal */}
              <div className="fb-trust-item" title="PayPal">
                <svg viewBox="0 0 80 24" width="72" height="24" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="19" fontFamily="Arial" fontWeight="900" fontSize="18" fill="#003087">Pay</text>
                  <text x="30" y="19" fontFamily="Arial" fontWeight="900" fontSize="18" fill="#009cde">Pal</text>
                </svg>
              </div>

              {/* Stripe */}
              <div className="fb-trust-item" title="Stripe">
                <svg viewBox="0 0 60 24" width="60" height="24" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="18" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="#635BFF">stripe</text>
                </svg>
              </div>

              <div className="fb-trust-divider" />

              {/* Visa */}
              <div className="fb-trust-item" title="Visa" style={{minWidth:52}}>
                <svg viewBox="0 0 60 20" width="56" height="20" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="17" fontFamily="Arial" fontWeight="900" fontSize="19" fill="#1a1f71" letterSpacing="-1">VISA</text>
                </svg>
              </div>

              {/* Mastercard */}
              <div className="fb-trust-item" title="Mastercard" style={{minWidth:46}}>
                <svg viewBox="0 0 46 30" width="46" height="30" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="17" cy="15" r="12" fill="#EB001B"/>
                  <circle cx="29" cy="15" r="12" fill="#F79E1B"/>
                  <path d="M23 6.3a12 12 0 010 17.4A12 12 0 0123 6.3z" fill="#FF5F00"/>
                </svg>
              </div>

              {/* Amex */}
              <div className="fb-trust-item" title="American Express" style={{background:'#2E77BC', borderColor:'#2E77BC', minWidth:52}}>
                <svg viewBox="0 0 68 20" width="60" height="18" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="15" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#fff" letterSpacing="0.5">AMERICAN</text>
                  <text x="0" y="26" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#fff" letterSpacing="0.5">EXPRESS</text>
                </svg>
              </div>

              {/* Discover */}
              <div className="fb-trust-item" title="Discover" style={{minWidth:72}}>
                <svg viewBox="0 0 90 22" width="80" height="20" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="17" fontFamily="Arial" fontWeight="bold" fontSize="15" fill="#231F20">DISC</text>
                  <ellipse cx="61" cy="11" rx="11" ry="11" fill="#F76F20"/>
                  <text x="72" y="17" fontFamily="Arial" fontWeight="bold" fontSize="15" fill="#231F20">VER</text>
                </svg>
              </div>

              <div className="fb-trust-divider" />

              {/* Security badges */}
              <div className="fb-trust-secure-badges">
                <div className="fb-trust-secure-badge" title="AES-256 Encrypted">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="8" rx="2" fill="#22c55e" opacity="0.2" stroke="#22c55e" strokeWidth="1.4"/>
                    <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="8" cy="11" r="1.2" fill="#22c55e"/>
                  </svg>
                  AES‑256
                </div>
                <div className="fb-trust-secure-badge" title="McAfee Secure">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L2 4v5c0 3.5 2.5 6.8 6 7.8 3.5-1 6-4.3 6-7.8V4L8 1z" fill="#C00" opacity="0.15" stroke="#C00" strokeWidth="1.3"/>
                    <text x="4.5" y="11" fontFamily="Arial" fontWeight="900" fontSize="7" fill="#C00">M</text>
                  </svg>
                  McAfee
                </div>
                <div className="fb-trust-secure-badge" title="Norton Secured">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L2 4v5c0 3.5 2.5 6.8 6 7.8 3.5-1 6-4.3 6-7.8V4L8 1z" fill="#FFC107" opacity="0.2" stroke="#FFC107" strokeWidth="1.3"/>
                    <path d="M5 8.5l2 2 4-4" stroke="#FFC107" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Norton
                </div>
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