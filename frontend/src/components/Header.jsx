import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init();
    }
  }, []);

  return (
    <>
      <section className="report-bar">
        <div className="label" style={{ color: '#000' }}>Popular Reports</div>
        <div className="scroll-wrapper">
          <div className="scroll-content">
            <span className="item"><b className="new">New</b> 2026 Financial Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Career Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Marriage Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Financial Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Career Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Marriage Horoscope Based on Your Birth Chart</span>
          </div>
        </div>
      </section>

      <header className="w-100 font-xl mb-0" style={{ background: 'var(--cosmic-bg)' }}>
        <nav className="navbar navbar-expand-lg navbar-light py-0">
          <div className="container-fluid px-2 px-md-3 px-lg-4">
            <Link className="navbar-brand d-flex align-items-center p-0" to="/">
              <img alt="logo" src="/images/logo.png" className="logo-crop" />
              <div className="fb-logo-name ms-2">Astro<em>Ava</em></div>
            </Link>
             
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobile-menu"
              aria-controls="mobile-menu"
              aria-label="Toggle navigation"
            >
              <span><i className="fas fa-bars"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">HOME</Link>
                </li>
                <li className="nav-item dropdown">
                  <div className="d-flex align-items-center">
                    <Link className="nav-link" to="/consultations">CONSULTATIONS</Link>
                    <a className="nav-link dropdown-toggle dropdown-toggle-split" href="#" data-bs-toggle="dropdown"></a>
                  </div>
                  <ul className="dropdown-menu dropdown-menu1">
                    <li><Link className="dropdown-item" to="/consultations">Personal Horoscope</Link></li>
                    <li><Link className="dropdown-item" to="/consultations">Marriage/Relationship</Link></li>
                    <li><a className="dropdown-item" href="#">Career & Bussiness</a></li>
                    <li><a className="dropdown-item" href="#">Muhurat</a></li>
                    <li><a className="dropdown-item" href="#">Health Astrology</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">ABOUT</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blog">BLOG</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/astrologer">ASTROLOGERS</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">COURSES</a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/vedic-course">Vedic Astrology Course</Link></li>
                    <li><Link className="dropdown-item" to="/advanced-astrology">Advanced Astrology</Link></li>
                    <li><Link className="dropdown-item" to="/predictive-astrology">Predictive Astrology</Link></li>
                    <li><Link className="dropdown-item" to="/certification-courses">Certification Courses</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/" role="button" data-bs-toggle="dropdown" id="astroDropdown">ASTRO SHOP / STORE</a>
                  <ul className="dropdown-menu dropdown-menu1">
                    <li><a className="dropdown-item" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/">Gemstones</a></li>
                    <li><a className="dropdown-item" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/">Rudraksha</a></li>
                    <li><a className="dropdown-item" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/">Yantras</a></li>
                    <li><a className="dropdown-item" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/">Puja Kits</a></li>
                    <li><a className="dropdown-item" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/">Bracelets</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">FREE TOOLS</a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/free-tools">All Free Tools</Link></li>
                    <li><Link className="dropdown-item" to="/numerology">Numerology</Link></li>
                    <li><Link className="dropdown-item" to="/tarot">Tarot Reading</Link></li>
                    <li><Link className="dropdown-item" to="/love">Love Calculator</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="d-none d-lg-block">
              <div className="right-menui">
                <ul>
                  <li>
                    <a data-bs-toggle="modal" href="#registerModal" className="btn btn-consult-header">BOOK CONSULTATION</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="offcanvas offcanvas-end mobile-offcanvas" tabIndex="-1" id="mobile-menu" aria-labelledby="mobile-menu-label">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobile-menu-label">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" data-bs-dismiss="offcanvas">HOME</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link mobile-menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-consultations">
                CONSULTATIONS
              </button>
              <div className="collapse mobile-submenu" id="mobile-consultations">
                <ul className="navbar-nav">
                  <li><Link className="nav-link" to="/consultations" data-bs-dismiss="offcanvas">Personal Horoscope</Link></li>
                  <li><Link className="nav-link" to="/consultations" data-bs-dismiss="offcanvas">Marriage/Relationship</Link></li>
                  <li><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Career & Business</a></li>
                  <li><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Muhurat</a></li>
                  <li><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Health Astrology</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item"><Link className="nav-link" to="/about" data-bs-dismiss="offcanvas">ABOUT</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog" data-bs-dismiss="offcanvas">BLOG</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/astrologer" data-bs-dismiss="offcanvas">ASTROLOGERS</Link></li>
            <li className="nav-item">
              <button className="nav-link mobile-menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-courses">
                COURSES
              </button>
              <div className="collapse mobile-submenu" id="mobile-courses">
                <ul className="navbar-nav">
                  <li><Link className="nav-link" to="/vedic-course" data-bs-dismiss="offcanvas">Vedic Astrology Course</Link></li>
                  <li><Link className="nav-link" to="/advanced-astrology" data-bs-dismiss="offcanvas">Advanced Astrology</Link></li>
                  <li><Link className="nav-link" to="/predictive-astrology" data-bs-dismiss="offcanvas">Predictive Astrology</Link></li>
                  <li><Link className="nav-link" to="/certification-courses" data-bs-dismiss="offcanvas">Certification Courses</Link></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <button className="nav-link mobile-menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-astro-shop">
                ASTRO SHOP / STORE
              </button>
              <div className="collapse mobile-submenu" id="mobile-astro-shop">
                <ul className="navbar-nav">
                  <li><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Gemstones</a></li>
                  <li><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Rudraksha</a></li>
                  <li><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Yantras</a></li>
                  <li><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Puja Kits</a></li>
                  <li><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Bracelets</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <button className="nav-link mobile-menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#mobile-free-tools">
                FREE TOOLS
              </button>
              <div className="collapse mobile-submenu" id="mobile-free-tools">
                <ul className="navbar-nav">
                  <li><Link className="nav-link" to="/free-tools" data-bs-dismiss="offcanvas">All Free Tools</Link></li>
                  <li><Link className="nav-link" to="/numerology" data-bs-dismiss="offcanvas">Numerology</Link></li>
                  <li><Link className="nav-link" to="/tarot" data-bs-dismiss="offcanvas">Tarot Reading</Link></li>
                  <li><Link className="nav-link" to="/love" data-bs-dismiss="offcanvas">Love Calculator</Link></li>
                </ul>
              </div>
            </li>
            <li className="nav-item mt-2">
              <a data-bs-toggle="modal" href="#registerModal" className="btn btn-consult-header w-100" data-bs-dismiss="offcanvas">BOOK CONSULTATION</a>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
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
          --cosmic-bg: #fffbf5;
          --cosmic-white: #ffffff;
        }

        /* REPORT BAR - Fully Responsive */
        .report-bar {
          display: flex;
          align-items: center;
          background: var(--cosmic-bg);
          padding: 8px 0;
          overflow-x: hidden;
          border-bottom: 1px solid var(--glass-border);
          width: 100%;
        }
        
        .report-bar .label {
          background: var(--cosmic-gradient);
          color: #fff;
          font-weight: bold;
          padding: 8px 5%;
          white-space: nowrap;
          z-index: 2;
          font-size: clamp(11px, 2vw, 13px);
          text-transform: uppercase;
          letter-spacing: 1px;
          flex-shrink: 0;
        }
        
        .scroll-wrapper {
          overflow-x: hidden;
          flex: 1;
          width: 100%;
        }
        
        .scroll-content {
          display: inline-flex;
          gap: clamp(20px, 3vw, 40px);
          white-space: nowrap;
          animation: scrollLeft 25s linear infinite;
        }
        
        .item {
          color: var(--cosmic-text);
          font-size: clamp(11px, 2vw, 13px);
          font-weight: 500;
        }
        
        .new {
          background: var(--cosmic-gradient);
          color: #fff;
          padding: 2px 8px;
          margin-right: 8px;
          border-radius: 6px;
          font-size: clamp(9px, 1.8vw, 11px);
          text-transform: uppercase;
          font-weight: 800;
        }
        
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* NAVBAR - Fully Responsive with container-fluid */
        .container-fluid {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }
        
        /* Logo Crop Logic - Shows only icon, hides embedded white text */
        .logo-crop {
          height: clamp(40px, 5vw, 60px);
          width: clamp(40px, 5vw, 60px); /* Square crop to isolate icon */
          object-fit: cover;
          object-position: left;
          transition: all 0.3s ease;
        }
        
        .fb-logo-name {
          font-weight: 800;
          font-size: clamp(20px, 4vw, 38px);
          color: var(--cosmic-text);
          letter-spacing: -0.5px;
          white-space: nowrap;
        }
        
        .fb-logo-name em {
          font-style: italic;
          color: var(--cosmic-accent-pink);
        }

        /* Desktop Navigation - Responsive */
        @media (min-width: 992px) {
          .navbar .nav-link {
            color: var(--cosmic-text) !important;
            font-weight: 700;
            padding: 10px clamp(8px, 1vw, 15px) !important;
            font-size: clamp(11px, 1.2vw, 14px);
            white-space: nowrap;
            transition: all 0.3s;
          }
          
          .navbar .nav-link:hover {
            color: var(--cosmic-accent-pink) !important;
          }
          
          .btn-consult-header {
            background: var(--cosmic-gradient);
            color: #fff !important;
            border: none;
            padding: clamp(8px, 1.2vw, 12px) clamp(16px, 2vw, 24px);
            border-radius: 50px;
            font-weight: 800;
            font-size: clamp(10px, 1.1vw, 13px);
            letter-spacing: 0.8px;
            white-space: nowrap;
            box-shadow: var(--premium-shadow);
            transition: all 0.3s ease;
            display: inline-block;
            text-decoration: none;
          }
          
          .btn-consult-header:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(227, 27, 122, 0.3);
          }
          
          /* Critical Fix: Ensure button never overflows */
          .right-menui ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }
          
          .navbar-collapse {
            flex: 1;
          }
          
          .navbar-nav {
            flex-wrap: wrap;
          }
        }
        
        /* Tablet and Medium Screens (992px - 1400px) */
        @media (min-width: 992px) and (max-width: 1400px) {
          .container-fluid {
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
          
          .navbar .nav-link {
            font-size: 11px !important;
            padding-left: 6px !important;
            padding-right: 6px !important;
          }
          
          .btn-consult-header {
            font-size: 10px !important;
            padding: 8px 12px !important;
          }
          
          .fb-logo-name {
            font-size: 22px !important;
          }
          
          .logo-crop {
            height: 45px !important;
          }
        }
        
        /* Large Desktop (1400px+) */
        @media (min-width: 1400px) {
          .container-fluid {
            padding-left: 40px;
            padding-right: 40px;
          }
        }
        
        /* Extra Large Desktop */
        @media (min-width: 1800px) {
          .container-fluid {
            padding-left: 60px;
            padding-right: 60px;
          }
        }

        /* Mobile Styles */
        @media (max-width: 991px) {
          .navbar-brand {
            margin-right: 0;
          }
          
          .logo-crop {
            height: 40px;
          }
          
          .fb-logo-name {
            font-size: 20px;
          }
          
          .navbar-toggler {
            color: var(--cosmic-text) !important;
            border-color: var(--glass-border) !important;
          }
        }

        /* Mobile Offcanvas - Percentage Width */
        .mobile-offcanvas {
          background: var(--cosmic-white);
          color: var(--cosmic-text);
          width: 70% !important;
          max-width: 400px;
          min-width: 260px;
          box-shadow: -10px 0 30px rgba(0,0,0,0.05);
        }
        
        @media (max-width: 576px) {
          .mobile-offcanvas {
            width: 80% !important;
          }
        }
        
        .mobile-offcanvas .offcanvas-header {
          border-bottom: 1px solid #f1f5f9;
          padding: 16px;
        }
        
        .mobile-offcanvas .offcanvas-title {
          font-weight: 700;
          color: var(--cosmic-text);
        }
        
        .mobile-offcanvas .nav-link {
          color: var(--cosmic-text);
          padding: 12px;
          font-weight: 600;
        }
        
        .mobile-offcanvas .mobile-menu-toggle {
          width: 100%;
          text-align: left;
          background: transparent;
          border: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--cosmic-text);
        }
        
        .mobile-offcanvas .mobile-submenu {
          padding-left: 15px;
          border-left: 1px solid #f1f5f9;
        }
        
        .mobile-offcanvas .mobile-submenu .nav-link {
          font-weight: 500;
          opacity: 0.8;
          padding: 10px 12px;
        }
        
        .mobile-offcanvas .btn-consult-header {
          background: var(--cosmic-gradient);
          color: #fff !important;
          text-align: center;
          display: block;
        }

        /* Modal - Original Colors Maintained */
        .modal-content {
          background: var(--cosmic-white) !important;
          border: none !important;
          border-radius: 24px !important;
          box-shadow: 0 25px 60px rgba(0,0,0,0.1) !important;
        }
        
        .modal-header {
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 20px 25px !important;
        }
        
        .modal-title {
          font-weight: 800 !important;
          color: var(--cosmic-text) !important;
          font-family: 'Merriweather Sans', serif;
          color: #ff6a00 !important;
        }
        
        .modal-body {
          padding: 25px !important;
        }
        
        .consultation-banner-wrapper {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        
        .consultation-banner-wrapper img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        
        .banner-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(255,255,255,0.95), transparent);
        }
        
        .btn-primary {
          background: var(--cosmic-gradient);
          border: none;
          font-weight: 800;
          padding: 12px;
          border-radius: 50px;
          color: white;
        }
        
        .btn-primary:hover {
          background: var(--cosmic-gradient);
          opacity: 0.9;
        }
        
        /* Dropdown Styles - Original */
        .dropdown-menu {
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .dropdown-item {
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .dropdown-item:hover {
          background: linear-gradient(135deg, #fff0f5, #fff5eb);
          color: var(--cosmic-accent-pink);
        }

        /* Utility */
        .w-100 {
          width: 100% !important;
        }
      `}</style>

      {/* Book Consultation Modal */}
      <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Book Consultation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
              <div className="consultation-banner-wrapper mb-4">
                <img src="/images/consultation_banner.png" alt="Consultation" />
                <div className="banner-overlay">
                  <h4>Expert Private Consultation</h4>
                  <p>Gain deep insights and solutions from our master astrologers.</p>
                </div>
              </div>
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" placeholder="Enter your phone" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Consultation Type</label>
                  <select className="form-select">
                    <option>Select consultation type</option>
                    <option>Personal Horoscope</option>
                    <option>Marriage/Relationship</option>
                    <option>Career & Business</option>
                    <option>Muhurat Timing</option>
                    <option>Health Astrology</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label">Your Message</label>
                  <textarea className="form-control" rows="3" placeholder="Describe your concern briefly..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-3">CONFIRM BOOKING</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;