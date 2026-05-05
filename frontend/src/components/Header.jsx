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
          font-size: clamp(11px, 3vw, 14px);
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
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
          -webkit-overflow-scrolling: touch;
        }
        
        .scroll-wrapper::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        .scroll-content {
          display: inline-flex;
          gap: clamp(20px, 4vw, 48px);
          white-space: nowrap;
          padding: 0 16px 0 8px;
          align-items: center;
        }
        
        .item {
          color: var(--text-content);
          font-size: clamp(11px, 3vw, 14px);
          font-weight: 500;
          font-family: var(--font-sans);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        
        .new {
          background: var(--accent-color);
          color: #fff;
          padding: 2px 10px;
          border-radius: 30px;
          font-size: clamp(9px, 2vw, 11px);
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
          width: 42px;
          height: 42px;
          background: var(--primary-color);
          color: #fff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(139, 74, 47, 0.2);
          transition: transform 0.3s ease;
        }

        .logo-icon-wrapper:hover {
          transform: rotate(15deg) scale(1.05);
        }

        @media (min-width: 992px) {
          .navbar-nav .nav-link {
            color: var(--text-main) !important;
            font-weight: 600;
            padding: 12px 6px !important;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1px;
          }
          
          .btn-consult-header {
            background: var(--primary-color);
            color: #fff !important;
            padding: 10px 20px;
            border-radius: 40px;
            font-weight: 700;
            font-size: 0.8rem;
            box-shadow: 0 6px 14px rgba(139, 74, 47, 0.2);
            transition: all 0.25s ease;
            white-space: nowrap;
          }
        }

        @media (min-width: 1100px) {
          .navbar-nav .nav-link {
            padding: 12px 10px !important;
            font-size: 0.8rem;
          }
          .btn-consult-header {
            padding: 10px 22px;
            font-size: 0.85rem;
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
          max-width: 360px;
        }

        .mobile-offcanvas .nav-link {
          color: var(--text-main);
          font-weight: 600;
          padding: 14px 20px;
          border-bottom: 1px solid var(--glass-border);
        }

        .btn-mobile-cta {
          border-radius: 60px !important;
          font-weight: 700;
          padding: 14px 0;
          text-align: center;
        }
        
        .btn-mobile-cta.primary-cta {
          background: #2C2C2C;
          color: #fff !important;
        }
        
        .btn-mobile-cta.secondary-cta {
          color: var(--primary-color) !important;
          border: 1.6px solid var(--primary-color);
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

      <header className="w-100 font-xl mb-0">
        <nav className="navbar navbar-expand-lg navbar-light py-0">
          <div className="container-fluid px-2 px-md-3 px-lg-4 d-flex align-items-center">
            <Link className="navbar-brand d-flex align-items-center p-0 me-0" to="/" style={{ flexShrink: 0 }}>
              <div className="logo-icon-wrapper me-2">
                <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L13.5 8.5H20L14.5 12.5L16.5 19L11 15L5.5 19L7.5 12.5L2 8.5H8.5L11 2Z" fill="currentColor" />
                </svg>
              </div>
              <div className="fb-logo-name" style={{ fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: '700', color: 'var(--text-heading)' }}>
                Astro<em style={{ fontStyle: 'normal', color: 'var(--primary-color)' }}>Ava</em>
              </div>
            </Link>
             
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu">
              <span><i className="fas fa-bars"></i></span>
            </button>

            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link" to="/">HOME</Link></li>
                <li className="nav-item dropdown">
                  <div className="d-flex align-items-center">
                    <Link className="nav-link" to="/consultations">CONSULTATIONS</Link>
                    <a className="nav-link dropdown-toggle dropdown-toggle-split" href="#" data-bs-toggle="dropdown"></a>
                  </div>
                  <ul className="dropdown-menu">
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
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/vedic-course">Vedic Astrology Course</Link></li>
                    <li><Link className="dropdown-item" to="/advanced-astrology">Advanced Astrology</Link></li>
                    <li><Link className="dropdown-item" to="/predictive-astrology">Predictive Astrology</Link></li>
                    <li><Link className="dropdown-item" to="/certification-courses">Certification Courses</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">ASTRO SHOP</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Gemstones</a></li>
                    <li><a className="dropdown-item" href="#">Rudraksha</a></li>
                    <li><a className="dropdown-item" href="#">Yantras</a></li>
                    <li><a className="dropdown-item" href="#">Puja Kits</a></li>
                    <li><a className="dropdown-item" href="#">Bracelets</a></li>
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

            <div className="d-none d-lg-block ms-auto" style={{ flexShrink: 0 }}>
              <a data-bs-toggle="modal" href="#registerModal" className="btn btn-consult-header">BOOK CONSULTATION</a>
            </div>
          </div>
        </nav>
      </header>

      <div className="offcanvas offcanvas-end mobile-offcanvas" tabIndex="-1" id="mobile-menu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">AstroAva</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/" data-bs-dismiss="offcanvas">HOME</Link></li>
            <li className="nav-item">
              <button className="nav-link w-100 border-0 bg-transparent text-start" data-bs-toggle="collapse" data-bs-target="#mobile-consultations">CONSULTATIONS</button>
              <div className="collapse px-3" id="mobile-consultations">
                <Link className="nav-link" to="/consultations" data-bs-dismiss="offcanvas">Personal Horoscope</Link>
                <Link className="nav-link" to="/consultations" data-bs-dismiss="offcanvas">Marriage/Relationship</Link>
              </div>
            </li>
            <li className="nav-item"><Link className="nav-link" to="/about" data-bs-dismiss="offcanvas">ABOUT</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog" data-bs-dismiss="offcanvas">BLOG</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/astrologer" data-bs-dismiss="offcanvas">ASTROLOGERS</Link></li>
            <li className="nav-item mt-4 d-grid gap-2">
              <a data-bs-toggle="modal" href="#registerModal" className="btn btn-mobile-cta primary-cta" data-bs-dismiss="offcanvas">BOOK CONSULTATION</a>
              <Link to="/certification-courses" className="btn btn-mobile-cta secondary-cta" data-bs-dismiss="offcanvas">ENROLL LIVE COURSE</Link>
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