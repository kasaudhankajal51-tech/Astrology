import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="footer-cosmic w-100 pt-5 pb-4">
        <div className="container">
          <div className="row g-5 align-content-center">
            <div className="col-12 col-lg-4 text-center text-lg-start">
              <Link to="/">
                <img alt="Astro Ava logo" src="/images/logo.png" className="footer-logo mb-3" />
              </Link>
              <p className="text-muted mt-3 pe-lg-4">
                Discover the cosmic narrative written in the stars. Let Astro Ava be your guide to understanding planetary influences, uncovering your true potential, and navigating life's journey.
              </p>
              <div className="social-links mt-4">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            
            <div className="col-12 col-md-4 col-lg-3 text-center text-md-start">
              <div className="colm-footer">
                <h5 className="footer-heading">Consultations</h5>
                <ul className="footer-links">
                  <li><a href="#">Personal Horoscope</a></li>
                  <li><a href="#">Marriage & Relationships</a></li>
                  <li><a href="#">Career & Business</a></li>
                  <li><a href="#">Muhurat Timing</a></li>
                  <li><a href="#">Health Astrology</a></li>
                </ul>
              </div>
            </div>
            
            <div className="col-12 col-md-4 col-lg-2 text-center text-md-start">
              <div className="colm-footer">
                <h5 className="footer-heading">Quick Links</h5>
                <ul className="footer-links">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/freetools">Free Tools</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><a href="#">Astro Store</a></li>
                </ul>
              </div>
            </div>
            
            <div className="col-12 col-md-4 col-lg-3 text-center text-md-start">
              <div className="colm-footer">
                <h5 className="footer-heading">Contact Us</h5>
                <ul className="footer-contact">
                  <li>
                    <i className="fab fa-whatsapp"></i>
                    <span>+91 8418-9039-66</span>
                  </li>
                  <li>
                    <i className="fas fa-paper-plane"></i>
                    <span>dsastro@gmail.com</span>
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>New Delhi, India</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <hr className="footer-divider my-5" />
          
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="copyright-text mb-0">&copy; {new Date().getFullYear()} Astro Ava. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="legal-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cancellation">Refund Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-cosmic { 
          background: #070913;
          border-top: 1px solid rgba(255, 106, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .footer-cosmic::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff6a00, transparent);
          opacity: 0.5;
        }
        
        .footer-logo {
          max-width: 150px;
          height: auto;
          filter: drop-shadow(0 0 10px rgba(255,106,0,0.3));
        }

        .footer-heading { 
          color: #fff; 
          font-family: 'Merriweather Sans', serif;
          font-size: 1.1rem; 
          font-weight: 700; 
          margin-bottom: 25px; 
          position: relative;
          display: inline-block;
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 30px;
          height: 2px;
          background: #ff6a00;
        }

        @media (max-width: 991px) {
          .footer-heading::after { left: 50%; transform: translateX(-50%); }
          .colm-footer { text-align: center; margin-bottom: 30px; }
          .footer-links, .footer-contact { align-items: center; justify-content: center; display: flex; flex-direction: column; }
          .footer-contact li { justify-content: center; width: 100%; align-items: center; text-align: center; }
        }

        .footer-links, .footer-contact { 
          list-style: none; 
          padding: 0; 
          margin: 0; 
        }
        
        .footer-links li, .footer-contact li {
          margin-bottom: 15px;
        }
        
        .footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          color: #aaa;
          font-size: 0.95rem;
        }
        
        .footer-contact li i { 
          color: #ff6a00; 
          font-size: 1.1rem;
          margin-top: 4px;
        }

        .footer-links li a { 
          color: #aaa; 
          text-decoration: none; 
          font-size: 0.95rem; 
          transition: all 0.3s ease; 
          display: inline-block;
        }
        
        .footer-links li a:hover { 
          color: #ff6a00; 
          transform: translateX(5px);
        }

        .social-links {
          display: flex;
          gap: 15px;
        }
        
        @media (max-width: 991px) {
          .social-links { justify-content: center; }
        }
        
        .social-links a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .social-links a:hover {
          background: #ff6a00;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(255,106,0,0.4);
          border-color: #ff6a00;
        }

        .footer-divider {
          border-color: rgba(255,255,255,0.1);
          opacity: 1;
        }
        
        .copyright-text {
          color: #888;
          font-size: 0.9rem;
        }
        
        .legal-links {
          display: flex;
          gap: 20px;
          justify-content: flex-end;
        }
        
        @media (max-width: 767px) {
          .legal-links { justify-content: center; }
        }
        
        .legal-links a {
          color: #888;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.3s;
        }
        
        .legal-links a:hover {
          color: #fff;
        }
      `}</style>
    </>
  );
}

export default Footer;
