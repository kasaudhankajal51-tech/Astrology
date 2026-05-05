import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  useEffect(() => {
    // AOS Init
    if (window.AOS) {
      window.AOS.init();
    }

    // Report Bar Animation Logic
    const handleReportAnimation = () => {
      const content = document.getElementById('reportScrollContent');
      if (!content) return;
      
      if (window.innerWidth >= 768) {
        content.style.animation = 'scrollLeftSmooth 38s linear infinite';
        if (content.children.length < 10 && !content.hasAttribute('data-cloned')) {
          const originalHTML = content.innerHTML;
          content.innerHTML = originalHTML + originalHTML;
          content.setAttribute('data-cloned', 'true');
        }
      } else {
        content.style.animation = 'none';
      }
    };

    window.addEventListener('resize', handleReportAnimation);
    handleReportAnimation();

    return () => window.removeEventListener('resize', handleReportAnimation);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --primary-color: #8B4A1E;
          --accent-color: #C8832A;
          --glass-border: rgba(200, 131, 42, 0.18);
          --premium-shadow: 0 4px 24px rgba(139, 74, 30, 0.08);
        }

        /* Report Bar */
        .report-bar {
          display: flex;
          align-items: center;
          background: var(--bg-color);
          padding: 6px 0;
          overflow-x: hidden;
          border-bottom: 1px solid var(--glass-border);
          width: 100%;
          position: relative;
        }
        
        .report-bar .label {
          background: var(--primary-color);
          color: #fff;
          font-weight: 700;
          padding: 6px 4%;
          white-space: nowrap;
          z-index: 3;
          font-size: clamp(10px, 2.5vw, 13px);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          flex-shrink: 0;
          font-family: var(--font-sans);
          box-shadow: 2px 0 8px rgba(0,0,0,0.02);
        }
        
        .scroll-wrapper {
          overflow-x: auto;
          flex: 1;
          width: 100%;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        
        .scroll-wrapper::-webkit-scrollbar {
          display: none;
        }
        
        .scroll-content {
          display: inline-flex;
          gap: clamp(15px, 3vw, 40px);
          white-space: nowrap;
          padding: 0 16px 0 8px;
          align-items: center;
        }
        
        .item {
          color: var(--text-content);
          font-size: clamp(10px, 2.5vw, 13px);
          font-weight: 500;
          font-family: var(--font-sans);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        
        .new {
          background: var(--accent-color);
          color: #fff;
          padding: 2px 8px;
          border-radius: 30px;
          font-size: clamp(8px, 1.8vw, 10px);
          text-transform: uppercase;
          font-weight: 800;
          line-height: 1.3;
        }

        @keyframes scrollLeftSmooth {
          0% { transform: translateX(0); }
          100% { transform: translateX(-48%); }
        }

        /* Navbar */
        header {
          background: var(--bg-color) !important;
          border-bottom: 1px solid var(--glass-border);
          position: sticky;
          top: 0;
          z-index: 1020;
          width: 100%;
        }

        .logo-icon-wrapper {
          width: clamp(32px, 4vw, 42px);
          height: clamp(32px, 4vw, 42px);
          background: var(--primary-color);
          color: #fff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(139, 74, 47, 0.2);
          transition: transform 0.3s ease;
        }

        .logo-icon-wrapper svg {
          width: 60%;
          height: 60%;
        }

        .logo-icon-wrapper:hover {
          transform: rotate(15deg) scale(1.05);
        }

        @media (min-width: 992px) {
          .navbar-nav .nav-link {
            color: var(--text-main) !important;
            font-weight: 600;
            padding: 12px 6px !important;
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.1px;
            transition: color 0.3s ease;
          }

          /* Hover Dropdowns for Desktop */
          .nav-item.dropdown:hover > .dropdown-menu {
            display: block;
            margin-top: 0;
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .dropdown-menu {
            display: block;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
            margin-top: 0;
          }

          .dropdown-toggle::after {
            transition: transform 0.3s ease;
          }

          .nav-item.dropdown:hover .dropdown-toggle::after {
            transform: rotate(180deg);
          }
          
          .btn-consult-header {
            background: var(--primary-color);
            color: #fff !important;
            padding: 10px 18px;
            border-radius: 40px;
            font-weight: 700;
            font-size: 0.75rem;
            box-shadow: 0 6px 14px rgba(139, 74, 47, 0.2);
            transition: all 0.25s ease;
            white-space: nowrap;
          }
        }

        @media (min-width: 1100px) {
          .navbar-nav .nav-link {
            padding: 12px 10px !important;
            font-size: 0.78rem;
          }
          .btn-consult-header {
            padding: 10px 22px;
            font-size: 0.82rem;
          }
        }

        @media (min-width: 1300px) {
          .navbar-nav .nav-link {
            padding: 12px 15px !important;
            font-size: 0.85rem;
          }
          .btn-consult-header {
            padding: 11px 28px;
            font-size: 0.9rem;
          }
        }

        .mobile-offcanvas {
          background: var(--bg-color);
          width: 85% !important;
          max-width: 320px;
        }

        .mobile-offcanvas .nav-link {
          color: var(--text-main);
          font-weight: 800;
          padding: 18px 25px;
          border-bottom: 1px solid var(--glass-border);
          font-size: 1.25rem;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mob-drop-trigger {
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 1px solid var(--glass-border);
          background: rgba(139, 74, 30, 0.03);
        }

        .mob-drop-trigger[aria-expanded="true"] {
          background: var(--primary-color);
        }

        .mob-drop-trigger[aria-expanded="true"] i {
          transform: rotate(180deg);
          color: #fff !important;
        }

        .mobile-offcanvas .dropdown-item {
          padding: 15px 45px;
          font-size: 1.1rem;
          color: var(--text-content);
          border-bottom: 1px solid rgba(200, 131, 42, 0.08);
          font-weight: 600;
          background: #FFFDFB;
          display: block;
        }

        .mobile-offcanvas .dropdown-item:active {
          background: #FDF6EE;
        }

        .btn-mobile-cta {
          border-radius: 15px !important;
          font-weight: 800;
          padding: 16px 0;
          text-align: center;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: none;
        }
        
        .btn-mobile-cta.primary-cta {
          background: linear-gradient(135deg, var(--primary-color), #2A0F02);
          color: #fff !important;
          box-shadow: 0 8px 20px rgba(42, 15, 2, 0.3);
        }
        
        .btn-mobile-cta.secondary-cta {
          background: #fff;
          color: var(--primary-color) !important;
          border: 2px solid var(--primary-color) !important;
          box-shadow: 0 6px 15px rgba(139, 74, 30, 0.12);
        }

        .btn-mobile-cta:active {
          transform: scale(0.98);
        }

        .navbar-toggler {
          border: none !important;
          padding: 8px 12px;
          color: #fff !important;
          background: var(--primary-color) !important;
          border-radius: 12px;
          font-size: 1.2rem;
          box-shadow: 0 4px 12px rgba(139, 74, 30, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .navbar-toggler:focus {
          box-shadow: none !important;
        }

        .navbar-toggler:hover {
          transform: scale(1.05);
          background: var(--accent-color) !important;
        }
      `}</style>

      <section className="report-bar">
        <div className="label">Popular Reports</div>
        <div className="scroll-wrapper" id="reportScrollWrapper">
          <div className="scroll-content" id="reportScrollContent">
            <span className="item"><b className="new">New</b> 2026 Financial Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Career Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Marriage Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Wealth Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Career Horoscope Based on Your Birth Chart</span>
            <span className="item"><b className="new">New</b> 2026 Love Horoscope Based on Your Birth Chart</span>
          </div>
        </div>
      </section>

      <header className="w-100 mb-0">
        <nav className="navbar navbar-expand-lg navbar-light py-2">
          <div className="container-fluid px-3 px-md-4 px-lg-5 d-flex align-items-center">
            <Link className="navbar-brand d-flex align-items-center p-0 me-0" to="/" style={{ flexShrink: 0 }}>
              <div className="logo-icon-wrapper me-2">
                <svg viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L13.5 8.5H20L14.5 12.5L16.5 19L11 15L5.5 19L7.5 12.5L2 8.5H8.5L11 2Z" fill="currentColor" />
                </svg>
              </div>
              <div className="fb-logo-name" style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: '700', color: 'var(--text-heading)', fontFamily: 'var(--font-serif)' }}>
                Astro<em style={{ fontStyle: 'normal', color: 'var(--primary-color)' }}>Ava</em>
              </div>
            </Link>
             
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu">
              <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link" to="/">HOME</Link></li>
                <li className="nav-item dropdown">
                  <div className="d-flex align-items-center">
                    <Link className="nav-link pe-1" to="/consultations">CONSULTATIONS</Link>
                    <span className="nav-link dropdown-toggle dropdown-toggle-split ps-0" style={{ cursor: 'pointer' }} data-bs-toggle="dropdown"></span>
                  </div>
                  <ul className="dropdown-menu border-0 shadow-sm">
                    <li><Link className="dropdown-item" to="/consultations">Personal Horoscope</Link></li>
                    <li><Link className="dropdown-item" to="/consultations">Marriage/Relationship</Link></li>
                    <li><a className="dropdown-item" href="#">Career & Business</a></li>
                    <li><a className="dropdown-item" href="#">Muhurat</a></li>
                    <li><a className="dropdown-item" href="#">Health Astrology</a></li>
                  </ul>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/about">ABOUT</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/blog">BLOG</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/astrologer">ASTROLOGERS</Link></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">COURSES</a>
                  <ul className="dropdown-menu border-0 shadow-sm">
                    <li><Link className="dropdown-item" to="/vedic-course">Vedic Astrology Course</Link></li>
                    <li><Link className="dropdown-item" to="/advanced-astrology">Advanced Astrology</Link></li>
                    <li><Link className="dropdown-item" to="/predictive-astrology">Predictive Astrology</Link></li>
                    <li><Link className="dropdown-item" to="/certification-courses">Certification Courses</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">ASTRO SHOP</a>
                  <ul className="dropdown-menu border-0 shadow-sm">
                    <li><a className="dropdown-item" href="#">Gemstones</a></li>
                    <li><a className="dropdown-item" href="#">Rudraksha</a></li>
                    <li><a className="dropdown-item" href="#">Yantras</a></li>
                    <li><a className="dropdown-item" href="#">Puja Kits</a></li>
                    <li><a className="dropdown-item" href="#">Bracelets</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">FREE TOOLS</a>
                  <ul className="dropdown-menu border-0 shadow-sm">
                    <li><Link className="dropdown-item" to="/free-tools">All Free Tools</Link></li>
                    <li><Link className="dropdown-item" to="/numerology">Numerology</Link></li>
                    <li><Link className="dropdown-item" to="/tarot">Tarot Reading</Link></li>
                    <li><Link className="dropdown-item" to="/love">Love Calculator</Link></li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="d-none d-lg-block ms-auto" style={{ flexShrink: 0 }}>
              <a data-bs-toggle="modal" href="#registerModal" className="btn btn-consult-header">BOOK CONSULTATION</a>
            </div>
          </div>
        </nav>
      </header>

      <div className="offcanvas offcanvas-end mobile-offcanvas" tabIndex="-1" id="mobile-menu">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-color)' }}>AstroAva</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/" data-bs-dismiss="offcanvas">HOME</Link></li>
            
            <li className="nav-item">
              <div className="d-flex justify-content-between align-items-center border-bottom">
                <Link className="nav-link border-0 w-100" to="/consultations" data-bs-dismiss="offcanvas">CONSULTATIONS</Link>
                <div className="mob-drop-trigger" data-bs-toggle="collapse" data-bs-target="#mob-consult-collapse">
                  <i className="fas fa-chevron-down small text-muted"></i>
                </div>
              </div>
              <div className="collapse bg-light" id="mob-consult-collapse">
                <Link className="dropdown-item d-block" to="/consultations" data-bs-dismiss="offcanvas">Personal Horoscope</Link>
                <Link className="dropdown-item d-block" to="/consultations" data-bs-dismiss="offcanvas">Marriage/Relationship</Link>
                <Link className="dropdown-item d-block" to="/consultations" data-bs-dismiss="offcanvas">Career & Business</Link>
              </div>
            </li>

            <li className="nav-item"><Link className="nav-link" to="/about" data-bs-dismiss="offcanvas">ABOUT</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog" data-bs-dismiss="offcanvas">BLOG</Link></li>
            
            <li className="nav-item">
              <div className="d-flex justify-content-between align-items-center border-bottom">
                <span className="nav-link border-0 w-100">COURSES</span>
                <div className="mob-drop-trigger" data-bs-toggle="collapse" data-bs-target="#mob-courses-collapse">
                  <i className="fas fa-chevron-down small text-muted"></i>
                </div>
              </div>
              <div className="collapse bg-light" id="mob-courses-collapse">
                <Link className="dropdown-item d-block" to="/vedic-course" data-bs-dismiss="offcanvas">Vedic Astrology Course</Link>
                <Link className="dropdown-item d-block" to="/advanced-astrology" data-bs-dismiss="offcanvas">Advanced Astrology</Link>
                <Link className="dropdown-item d-block" to="/predictive-astrology" data-bs-dismiss="offcanvas">Predictive Astrology</Link>
                <Link className="dropdown-item d-block" to="/certification-courses" data-bs-dismiss="offcanvas">Certification Courses</Link>
              </div>
            </li>

            <li className="nav-item">
              <div className="d-flex justify-content-between align-items-center border-bottom">
                <Link className="nav-link border-0 w-100" to="/free-tools" data-bs-dismiss="offcanvas">FREE TOOLS</Link>
                <div className="mob-drop-trigger" data-bs-toggle="collapse" data-bs-target="#mob-tools-collapse">
                  <i className="fas fa-chevron-down small text-muted"></i>
                </div>
              </div>
              <div className="collapse bg-light" id="mob-tools-collapse">
                <Link className="dropdown-item d-block" to="/free-tools" data-bs-dismiss="offcanvas">All Free Tools</Link>
                <Link className="dropdown-item d-block" to="/numerology" data-bs-dismiss="offcanvas">Numerology</Link>
                <Link className="dropdown-item d-block" to="/tarot" data-bs-dismiss="offcanvas">Tarot Reading</Link>
                <Link className="dropdown-item d-block" to="/love" data-bs-dismiss="offcanvas">Love Calculator</Link>
              </div>
            </li>

            <li className="nav-item"><Link className="nav-link" to="/astrologer" data-bs-dismiss="offcanvas">ASTROLOGERS</Link></li>
            
            <li className="nav-item p-4 d-grid gap-3">
              <a data-bs-toggle="modal" href="#registerModal" className="btn btn-mobile-cta primary-cta" data-bs-dismiss="offcanvas">
                <i className="fas fa-calendar-check"></i> BOOK CONSULTATION
              </a>
              <Link to="/certification-courses" className="btn btn-mobile-cta secondary-cta" data-bs-dismiss="offcanvas">
                <i className="fas fa-graduation-cap"></i> ENROLL LIVE COURSE
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px' }}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">✨ Book Consultation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="px-4 pt-3 pb-1 text-center">
              <img src="/images/consultation_banner.png" alt="Consultation Booking" className="img-fluid rounded-3" style={{ maxHeight: '140px', width: '100%', objectFit: 'cover' }} />
            </div>
            <div className="modal-body p-4 pt-2">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Full Name</label>
                  <input type="text" className="form-control rounded-3" placeholder="Enter your name" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Email Address</label>
                  <input type="email" className="form-control rounded-3" placeholder="Enter your email" required />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold small">Consultation Type</label>
                  <select className="form-select rounded-3">
                    <option>Select type</option>
                    <option>Personal Horoscope</option>
                    <option>Marriage/Relationship</option>
                    <option>Career & Business</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold" style={{ background: 'var(--primary-color)' }}>CONFIRM BOOKING</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;