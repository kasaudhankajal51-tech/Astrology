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

      <header className="w-100 mb-5 pb-3">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img alt="logo" src="/images/logo.png" />
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
              <button
                className="nav-link mobile-menu-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobile-consultations"
                aria-expanded="false"
                aria-controls="mobile-consultations"
              >
                CONSULTATIONS
              </button>
              <div className="collapse mobile-submenu" id="mobile-consultations">
                <ul className="navbar-nav">
                  <li className="nav-item"><Link className="nav-link" to="/consultations" data-bs-dismiss="offcanvas">Personal Horoscope</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/consultations" data-bs-dismiss="offcanvas">Marriage/Relationship</Link></li>
                  <li className="nav-item"><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Career & Bussiness</a></li>
                  <li className="nav-item"><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Muhurat</a></li>
                  <li className="nav-item"><a className="nav-link" href="#" data-bs-dismiss="offcanvas">Health Astrology</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" data-bs-dismiss="offcanvas">ABOUT</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog" data-bs-dismiss="offcanvas">BLOG</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/astrologer" data-bs-dismiss="offcanvas">ASTROLOGERS</Link>
            </li>

            <li className="nav-item">
              <button
                className="nav-link mobile-menu-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobile-courses"
                aria-expanded="false"
                aria-controls="mobile-courses"
              >
                COURSES
              </button>
              <div className="collapse mobile-submenu" id="mobile-courses">
                <ul className="navbar-nav">
                  <li className="nav-item"><Link className="nav-link" to="/vedic-course" data-bs-dismiss="offcanvas">Vedic Astrology Course</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/advanced-astrology" data-bs-dismiss="offcanvas">Advanced Astrology</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/predictive-astrology" data-bs-dismiss="offcanvas">Predictive Astrology</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/certification-courses" data-bs-dismiss="offcanvas">Certification Courses</Link></li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <button
                className="nav-link mobile-menu-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobile-astro-shop"
                aria-expanded="false"
                aria-controls="mobile-astro-shop"
              >
                ASTRO SHOP / STORE
              </button>
              <div className="collapse mobile-submenu" id="mobile-astro-shop">
                <ul className="navbar-nav">
                  <li className="nav-item"><a className="nav-link" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/" data-bs-dismiss="offcanvas">Gemstones</a></li>
                  <li className="nav-item"><a className="nav-link" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/" data-bs-dismiss="offcanvas">Rudraksha</a></li>
                  <li className="nav-item"><a className="nav-link" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/" data-bs-dismiss="offcanvas">Yantras</a></li>
                  <li className="nav-item"><a className="nav-link" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/" data-bs-dismiss="offcanvas">Puja Kits</a></li>
                  <li className="nav-item"><a className="nav-link" href="https://test-1111111111111111111111111111111111711111111111133095.myshopify.com/" data-bs-dismiss="offcanvas">Bracelets</a></li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <button
                className="nav-link mobile-menu-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobile-free-tools"
                aria-expanded="false"
                aria-controls="mobile-free-tools"
              >
                FREE TOOLS
              </button>
              <div className="collapse mobile-submenu" id="mobile-free-tools">
                <ul className="navbar-nav">
                  <li className="nav-item"><Link className="nav-link" to="/free-tools" data-bs-dismiss="offcanvas">All Free Tools</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/numerology" data-bs-dismiss="offcanvas">Numerology</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/tarot" data-bs-dismiss="offcanvas">Tarot Reading</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/love" data-bs-dismiss="offcanvas">Love Calculator</Link></li>
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
        .report-bar {
          display: flex;
          align-items: center;
          background: linear-gradient(90deg, rgb(9,12,52), rgb(25,11,26));
          padding: 10px 0;
          overflow: hidden;
        }

        .mobile-offcanvas {
          background: linear-gradient(180deg, rgb(9, 12, 52), rgb(25, 11, 26));
          color: #fff;
          width: 50vw;
          max-width: 420px;
          min-width: 280px;
        }

        .mobile-offcanvas .offcanvas-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding: 16px 16px;
        }

        .mobile-offcanvas .offcanvas-title {
          font-weight: 700;
          letter-spacing: 0.2px;
          margin: 0;
        }

        .mobile-offcanvas .btn-close {
          filter: invert(1) grayscale(100%);
          opacity: 0.9;
        }

        .mobile-offcanvas .offcanvas-body {
          padding: 10px 12px 16px;
        }

        .mobile-offcanvas .nav-link {
          color: rgba(255, 255, 255, 0.92);
          padding: 12px 12px;
          border-radius: 10px;
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        .mobile-offcanvas .mobile-menu-toggle {
          width: 100%;
          text-align: left;
          background: transparent;
          border: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-offcanvas .mobile-menu-toggle::after {
          content: '▾';
          font-weight: 700;
          opacity: 0.85;
        }

        .mobile-offcanvas .mobile-menu-toggle[aria-expanded="true"]::after {
          transform: rotate(180deg);
        }

        .mobile-offcanvas .mobile-submenu {
          padding-left: 10px;
          margin-top: 4px;
          margin-bottom: 8px;
          border-left: 1px solid rgba(255, 255, 255, 0.12);
        }

        .mobile-offcanvas .mobile-submenu .nav-link {
          padding: 10px 12px;
          font-weight: 500;
          opacity: 0.95;
        }

        .mobile-offcanvas .nav-link:hover,
        .mobile-offcanvas .nav-link:focus {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .mobile-offcanvas .nav-item + .nav-item {
          margin-top: 2px;
        }

        .mobile-offcanvas .consult-btn {
          background: #ff6a00;
          color: #fff;
          border: 0;
          padding: 12px 14px;
          border-radius: 12px;
          font-weight: 700;
        }

        .mobile-offcanvas .consult-btn:hover,
        .mobile-offcanvas .consult-btn:focus {
          background: #ff7a1a;
          color: #fff;
        }

        @media (min-width: 992px) {
          .navbar-brand {
            display: flex;
            align-items: center;
          }

          .navbar-brand img {
            height: 56px;
            width: auto !important;
            max-width: none;
            object-fit: contain;
            display: block;
            transition: all 0.3s ease;
          }
        }

        .btn-consult-header {
          background: linear-gradient(135deg, #ff6a00, #ff0080);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(255, 106, 0, 0.3);
          transition: all 0.3s ease;
        }
        
        .btn-consult-header:hover {
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 106, 0, 0.5);
        }

        /* Essential fix for laptop screens (992px - 1300px) to prevent wrapping */
        @media (min-width: 992px) and (max-width: 1300px) {
          .btn-consult-header {
            font-size: 11px !important;
            padding: 8px 12px !important;
            letter-spacing: 0px !important;
          }
          .navbar .navbar-nav .nav-link {
            font-size: 12px !important;
            padding-left: 6px !important;
            padding-right: 6px !important;
          }
          .navbar-brand img {
            height: 40px !important;
          }
        }

        @media (max-width: 576px) {
          .mobile-offcanvas {
            width: 70vw;
            min-width: 260px;
          }
          .navbar-brand img {
            height: 40px;
          }
        }
        
        /* Modals and Forms inside Header */
        .modal-content {
          border: 1px solid rgba(255, 106, 0, 0.2) !important;
          border-radius: 20px !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.8) !important;
          backdrop-filter: blur(15px);
        }
        .modal-header {
          border-bottom: 1px solid rgba(255, 106, 0, 0.15) !important;
        }
        
        /* Reports Bar Scroll */
        .label {
          background: rgb(249, 232, 1);
          color: #000;
          font-weight: bold;
          padding: 8px 20px;
          white-space: nowrap;
          z-index: 2;
          font-size: 14px;
        }
        .scroll-wrapper {
          overflow: hidden;
          flex: 1;
        }
        .scroll-content {
          display: inline-flex;
          gap: 40px;
          white-space: nowrap;
          animation: scrollLeft 25s linear infinite;
        }
        .item {
          color: #fff;
          font-size: 13px;
        }
        
        .consultation-banner-wrapper {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          border: 1px solid rgba(255, 106, 0, 0.2);
        }
        
        .consultation-banner-wrapper img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .consultation-banner-wrapper:hover img {
          transform: scale(1.05);
        }
        
        .banner-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(11, 12, 16, 0.95), transparent);
          color: #fff;
        }
        
        .banner-overlay h4 {
          font-size: 1.2rem;
          margin: 0;
          color: #ff6a00;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .banner-overlay p {
          font-size: 0.85rem;
          margin: 5px 0 0;
          opacity: 0.9;
          font-style: italic;
        }

        .new {
          background: #ffd43b;
          color: #000;
          padding: 2px 6px;
          margin-right: 6px;
          border-radius: 4px;
          font-size: 11px;
          text-transform: uppercase;
        }
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Book Consultation Modal */}
      <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ background: 'rgba(20, 15, 30, 0.95)', color: '#fff' }}>
            <div className="modal-header">
              <h5 className="modal-title" style={{ fontFamily: "'Merriweather Sans', serif", color: '#ff6a00' }}>Book Consultation</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
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
