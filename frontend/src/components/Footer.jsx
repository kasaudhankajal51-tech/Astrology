import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="float-start w-100 pt-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 align-content-center">
            <div className="col">
              <Link to="/">
                <img alt="logo" src="/images/logo.png" />
              </Link>
              <p className="text-white mt-3 col-lg-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard</p>
            </div>
            <div className="col">
              <div className="colm-footer">
                <h5>Contact Us</h5>
                <ul>
                  <li><i className="fab fa-whatsapp"></i> +91 8418-9039-66</li>
                  <li><i className="fas fa-paper-plane"></i> dsastro@gmail.com</li>
                  <li><i className="fas fa-phone-alt"></i> +91 8418-9039-66</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="colm-footer">
                <h5>Consultations</h5>
                <ul>
                  <li><a href="#">Personal Horoscope</a></li>
                  <li><a href="#">Marriage / Relationship</a></li>
                  <li><a href="#">Career & Bussiness</a></li>
                  <li><a href="#">Muhurat</a></li>
                  <li><a href="#">Health Astrology</a></li>
                  <li><a href="#">Student Login</a></li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="colm-footer">
                <h5>Quick Links</h5>
                <ul>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><a href="#">Astro Shop / Store</a></li>
                  <li><a href="#">Free Tools</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Payment Terms & Conditions</Link></li>
                  <li><Link to="/cancellation">Refund & Cancellation Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="d-flex align-items-center justify-content-between">
            <ul>
              <li>
                <a href="#"><i className="fab fa-facebook-f" style={{ fontSize: '34px' }}></i></a>
                <a href="#" className="mx-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </a>
                <a href="#"><i className="fab fa-instagram" style={{ fontSize: '34px' }}></i></a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <style>{`
        footer { background: #0b1220; }
        .colm-footer h5 { color: #fff; font-size: 18px; font-weight: 600; margin-bottom: 20px; text-align: left; }
        .colm-footer ul { list-style: none; padding: 0; margin: 0; }
        .colm-footer ul li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #ccc;
          font-size: 14px;
          text-align: left;
          justify-content: flex-start;
        }
        .colm-footer ul li i { color: #ff6a00; width: 20px; text-align: center; }
        .colm-footer ul li a { color: #ccc; text-decoration: none; font-size: 14px; transition: 0.3s; }
        .colm-footer ul li a:hover { color: #ff6a00; }
        footer .row { align-items: flex-start; }
        footer .col { padding: 0 15px; }
        footer .d-flex ul { list-style: none; padding: 0; display: flex; justify-content: center; gap: 20px; }
        footer .d-flex ul li a { font-size: 24px; color: #fff; transition: 0.3s; display: inline-block; }
        footer .d-flex ul li a:hover { color: #ff6a00; transform: scale(1.1); }
      `}</style>
    </>
  );
}

export default Footer;
