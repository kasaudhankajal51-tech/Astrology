import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import ConsultationModal from './ConsultationModal';
import SuccessModal from './SuccessModal';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';

function Header() {
  const { settings } = useSettings();
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: 'General Consultation',
    dob: '',
    tob: '',
    pob: '',
    message: ''
  });

  const handleConsultChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          type: 'Consultation', 
          courseName: formData.consultationType 
        })
      });
      const data = await response.json();
      if (data.success) {
        setIsConsultModalOpen(false);
        setIsSuccessOpen(true);
        setFormData({ name: '', email: '', phone: '', consultationType: 'General Consultation', dob: '', tob: '', pob: '', message: '' });
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (err) {
      toast.error('Network Error');
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    // AOS Init
    if (window.AOS) {
      window.AOS.init();
    }

    // Scroll effect
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

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
    window.addEventListener('scroll', handleScroll);
    handleReportAnimation();
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleReportAnimation);
      window.removeEventListener('scroll', handleScroll);
    };
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
          font-size: clamp(14px, 2.8vw, 18px);
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
          font-size: clamp(14px, 2.8vw, 18px);
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

        @media (min-width: 1200px) {
          .navbar-collapse.collapse {
            visibility: visible !important;
            display: flex !important;
          }
        }

        @keyframes scrollLeftSmooth {
          0% { transform: translateX(0); }
          100% { transform: translateX(-48%); }
        }

        /* Navbar */
        header {
          background: rgba(253, 246, 238, 0.9) !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--glass-border);
          position: sticky;
          top: 0;
          z-index: 1020;
          width: 100%;
          min-height: 75px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        header.scrolled {
          background: rgba(253, 246, 238, 0.98) !important;
          box-shadow: 0 4px 20px rgba(139, 74, 30, 0.1);
          min-height: 65px;
        }

        .logo-icon-wrapper {
          width: clamp(28px, 3vw, 36px);
          height: clamp(28px, 3vw, 36px);
          background: var(--primary-color);
          color: #fff;
          border-radius: 8px;
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

        @media (min-width: 1200px) {
          .navbar-nav .nav-link {
            color: var(--text-main) !important;
            font-weight: 700;
            padding: 8px 3px !important;
            font-size: clamp(0.7rem, 0.85vw, 0.85rem);
            text-transform: uppercase;
            letter-spacing: 0.1px;
            transition: all 0.3s ease;
            position: relative;
            white-space: nowrap;
          }

          .navbar-nav .nav-link::after {
            content: '';
            position: absolute;
            bottom: 2px;
            left: 50%;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }

          .navbar-nav .nav-link:hover::after {
            width: 80%;
          }

          .navbar-nav .nav-link:hover {
            color: var(--primary-color) !important;
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
            border-radius: 12px;
            padding: 10px;
            min-width: 180px;
            box-shadow: 0 10px 30px rgba(139, 74, 30, 0.1) !important;
          }

          .btn-consult-header {
            background: var(--primary-color);
            color: #fff !important;
            padding: 8px 14px;
            border-radius: 40px;
            font-weight: 700;
            font-size: 0.8rem;
            box-shadow: 0 6px 14px rgba(139, 74, 47, 0.2);
            transition: all 0.25s ease;
            white-space: nowrap;
          }
        }

        @media (min-width: 1400px) {
          .navbar-nav .nav-link {
            padding: 10px 8px !important;
            font-size: 0.95rem;
            letter-spacing: 0.3px;
          }
          .btn-consult-header {
            padding: 12px 22px;
            font-size: 1rem;
          }
        }

        @media (min-width: 1600px) {
          .navbar-nav .nav-link {
            padding: 12px 14px !important;
            font-size: 1.1rem;
          }
          .btn-consult-header {
            padding: 14px 30px;
            font-size: 1.1rem;
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
          padding: 22px 25px;
          border-bottom: 1px solid var(--glass-border);
          font-size: 1.5rem;
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
          padding: 18px 45px;
          font-size: 1.3rem;
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
          border: 1px solid var(--glass-border) !important;
          padding: 10px 12px;
          color: #fff !important;
          background: var(--primary-color) !important;
          border-radius: 12px;
          font-size: 1.1rem;
          box-shadow: 0 4px 12px rgba(139, 74, 30, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .navbar-toggler i {
          color: #fff !important;
        }

        .navbar-toggler:focus {
          box-shadow: none !important;
        }

        .navbar-toggler:hover {
          transform: scale(1.05);
          background: var(--accent-color) !important;
        }

        @media (max-width: 1199px) {
          header, nav {
            width: 100% !important;
            flex-grow: 1 !important;
            display: flex !important;
            min-height: 70px !important;
          }
          .container-fluid {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
          .navbar-toggler {
            position: relative !important;
            top: 0 !important;
            right: 0 !important;
            margin: 0 !important;
            z-index: 10 !important;
            order: 2;
          }
          .navbar-brand {
            margin: 0 !important;
            max-width: 70%;
            order: 1;
          }
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
        <nav className="navbar navbar-expand-xl navbar-light py-2">
          <div className="container-fluid px-3 px-md-4 px-lg-5 d-flex align-items-center justify-content-between flex-nowrap">
            <Link className="navbar-brand d-flex align-items-center p-0 me-0" to="/" style={{ flexShrink: 0 }}>
              <div className="logo-icon-wrapper me-2">
                <svg viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L13.5 8.5H20L14.5 12.5L16.5 19L11 15L5.5 19L7.5 12.5L2 8.5H8.5L11 2Z" fill="currentColor" />
                </svg>
              </div>
              <div className="fb-logo-name" style={{ fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: '700', color: 'var(--text-heading)', fontFamily: 'var(--font-serif)' }}>
                {settings?.siteName?.split('Astro')[0] || 'Astro'}<em style={{ fontStyle: 'normal', color: 'var(--primary-color)' }}>{settings?.siteName?.includes('Astro') ? settings.siteName.split('Astro')[1] : 'Ava'}</em>
              </div>
            </Link>
             
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu">
              <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link" to="/">HOME</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/courses">COURSES</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/consultations">CONSULTATIONS</Link></li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="/astro-shop" role="button" data-bs-toggle="dropdown">ASTRO SHOP</Link>
                  <ul className="dropdown-menu border-0 shadow-sm">
                    <li><Link className="dropdown-item" to="/astro-shop/gemstones">Gemstones</Link></li>
                    <li><Link className="dropdown-item" to="/astro-shop/rudraksha">Rudraksha</Link></li>
                    <li><Link className="dropdown-item" to="/astro-shop/yantras">Yantras</Link></li>
                    <li><Link className="dropdown-item" to="/astro-shop/puja-kits">Puja Kits</Link></li>
                    <li><Link className="dropdown-item" to="/astro-shop/bracelets">Bracelets</Link></li>
                  </ul>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/astrologer">ASTROLOGERS</Link></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">FREE TOOLS</a>
                  <ul className="dropdown-menu border-0 shadow-sm">
                    <li><Link className="dropdown-item" to="/free-tools">All Free Tools</Link></li>
                    <li><Link className="dropdown-item" to="/numerology">Numerology</Link></li>
                    <li><Link className="dropdown-item" to="/tarot">Tarot Reading</Link></li>
                    <li><Link className="dropdown-item" to="/love">Love Calculator</Link></li>
                  </ul>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/about">ABOUT</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/blog">BLOG</Link></li>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-1" to="/careers">
                    CAREERS
                    <span className="bg-danger text-white px-1 rounded-pill" style={{ fontSize: '7px', padding: '0px 3px', lineHeight: '1.2', fontWeight: '800' }}>HIRING</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="d-none d-xl-block ms-auto" style={{ flexShrink: 0 }}>
              <button onClick={() => setIsConsultModalOpen(true)} className="btn btn-consult-header border-0">BOOK CONSULTATION</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="offcanvas offcanvas-end mobile-offcanvas" tabIndex="-1" id="mobile-menu">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-color)' }}>{settings?.siteName || 'AstroAva'}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/" data-bs-dismiss="offcanvas">HOME</Link></li>
            
            <li className="nav-item"><Link className="nav-link" to="/courses" data-bs-dismiss="offcanvas">COURSES</Link></li>

            <li className="nav-item"><Link className="nav-link" to="/consultations" data-bs-dismiss="offcanvas">CONSULTATIONS</Link></li>

            <li className="nav-item">
              <div className="d-flex justify-content-between align-items-center border-bottom">
                <span className="nav-link border-0 w-100">ASTRO SHOP</span>
                <div className="mob-drop-trigger" data-bs-toggle="collapse" data-bs-target="#mob-shop-collapse">
                  <i className="fas fa-chevron-down small text-muted"></i>
                </div>
              </div>
              <div className="collapse bg-light" id="mob-shop-collapse">
                <Link className="dropdown-item d-block" to="/astro-shop/gemstones" data-bs-dismiss="offcanvas">Gemstones</Link>
                <Link className="dropdown-item d-block" to="/astro-shop/rudraksha" data-bs-dismiss="offcanvas">Rudraksha</Link>
                <Link className="dropdown-item d-block" to="/astro-shop/yantras" data-bs-dismiss="offcanvas">Yantras</Link>
                <Link className="dropdown-item d-block" to="/astro-shop/puja-kits" data-bs-dismiss="offcanvas">Puja Kits</Link>
                <Link className="dropdown-item d-block" to="/astro-shop/bracelets" data-bs-dismiss="offcanvas">Bracelets</Link>
              </div>
            </li>

            <li className="nav-item"><Link className="nav-link" to="/astrologer" data-bs-dismiss="offcanvas">ASTROLOGERS</Link></li>

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

            <li className="nav-item"><Link className="nav-link" to="/about" data-bs-dismiss="offcanvas">ABOUT</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog" data-bs-dismiss="offcanvas">BLOG</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/careers" data-bs-dismiss="offcanvas">
                CAREERS
                <span className="badge bg-danger ms-2" style={{ fontSize: '0.7rem' }}>WE'RE HIRING</span>
              </Link>
            </li>
            
            <li className="nav-item p-4 d-grid gap-3">
              <button onClick={() => setIsConsultModalOpen(true)} className="btn btn-mobile-cta primary-cta">
                <i className="fas fa-calendar-check"></i> BOOK CONSULTATION
              </button>
              <Link to="/certification-courses" className="btn btn-mobile-cta secondary-cta" data-bs-dismiss="offcanvas">
                <i className="fas fa-graduation-cap"></i> ENROLL LIVE COURSE
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <ConsultationModal 
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        formData={formData}
        handleChange={handleConsultChange}
        handleSubmit={handleConsultSubmit}
        isSubmitting={isSubmitting}
      />

      <SuccessModal 
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Consultation Booked!"
        message="Your consultation request has been received. Our team will contact you shortly to confirm the schedule."
      />
    </>
  );
}

export default Header;