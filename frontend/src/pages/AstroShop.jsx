import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const AstroShop = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
      window.AOS.init({
        duration: 1000,
        once: true
      });
    }
  }, []);

  const navigate = useNavigate();

  const handleAddToCart = (name) => {
    toast.success(`${name} added to cart!`);
  };

  const handleBuyNow = (prod) => {
    navigate('/shop/checkout', { state: { product: prod } });
  };

  const categories = [
    { 
      name: 'Premium Gemstones', 
      desc: 'Certified & Authentic Gems',
      image: '/images/shop-gemstones.png', 
      count: '120+ Items', 
      path: 'gemstones',
      accent: '#8B4A1E'
    },
    { 
      name: 'Sacred Rudraksha', 
      desc: 'Energized Himalayan Beads',
      image: '/images/shop-rudraksha.png', 
      count: '45+ Items', 
      path: 'rudraksha',
      accent: '#C8832A'
    },
    { 
      name: 'Vedic Yantras', 
      desc: 'Geometric Energy Shields',
      image: '/images/shop-yantras.png', 
      count: '30+ Items', 
      path: 'yantras',
      accent: '#5C2D12'
    },
    { 
      name: 'Puja Essentials', 
      desc: 'Pure Ritual Components',
      image: '/images/shop-puja.png', 
      count: '85+ Items', 
      path: 'puja-kits',
      accent: '#8B4A1E'
    },
  ];

  const featuredProducts = [
    { id: 1, name: 'Natural Blue Sapphire (Neelam)', price: '₹15,000', rating: 5, image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=400', tag: 'Top Choice' },
    { id: 2, name: '7 Mukhi Rudraksha Bead', price: '₹2,500', rating: 4, image: 'https://images.unsplash.com/photo-1605000797439-75a150088f44?auto=format&fit=crop&q=80&w=400', tag: 'Energized' },
    { id: 3, name: 'Shree Yantra Gold Plated', price: '₹4,999', rating: 5, image: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400', tag: 'Powerful' },
    { id: 4, name: 'Crystal Quartz Healing Mala', price: '₹1,200', rating: 5, image: 'https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=400', tag: 'Pure' },
  ];

  return (
    <div className="shop-page-v2">
      {/* Premium Hero */}
      <section className="shop-hero-v2">
        <div className="hero-overlay"></div>
        <div className="container position-relative z-2 text-center" data-aos="fade-down">
          <div className="premium-label">Authentic & Certified</div>
          <h1 className="display-3 fw-bold mb-3 text-white">Divine <span className="text-accent">Astro Shop</span></h1>
          <p className="lead text-white opacity-75 mb-0">Your Gateway to Genuine Spiritual Remedies & Celestial Enhancements</p>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="container">
        <div className="trust-row shadow-sm" data-aos="fade-up">
          <div className="trust-col">
            <i className="fas fa-certificate"></i>
            <div>
              <h6>100% Certified</h6>
              <small>Lab-Tested Authenticity</small>
            </div>
          </div>
          <div className="trust-col">
            <i className="fas fa-shuttle-van"></i>
            <div>
              <h6>Global Shipping</h6>
              <small>Safe & Insured Delivery</small>
            </div>
          </div>
          <div className="trust-col">
            <i className="fas fa-lock"></i>
            <div>
              <h6>Secure Payment</h6>
              <small>Encrypted Checkout</small>
            </div>
          </div>
          <div className="trust-col">
            <i className="fas fa-sync-alt"></i>
            <div>
              <h6>Easy Returns</h6>
              <small>7-Day Satisfaction Guarantee</small>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {/* Category Section */}
        <div className="section-head mt-5 mb-4">
          <h2 className="fw-bold">Browse by <span className="text-accent">Category</span></h2>
          <p className="text-muted">Find the perfect remedy for your planetary needs</p>
        </div>

        <div className="category-grid-v2">
          {categories.map((cat, i) => (
            <Link key={i} to={`/astro-shop/${cat.path}`} className="cat-card-v2" data-aos="zoom-in" data-aos-delay={i * 100}>
              <div className="cat-img-box">
                <img src={cat.image} alt={cat.name} />
                <div className="cat-overlay" style={{ background: `linear-gradient(to top, ${cat.accent}, transparent)` }}></div>
                <div className="cat-content">
                  <span className="item-count">{cat.count}</span>
                  <h3>{cat.name}</h3>
                  <p>{cat.desc}</p>
                  <div className="explore-link">Explore Collection <i className="fas fa-arrow-right"></i></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        <div className="section-head mt-5 pt-5 mb-4 text-center">
          <h2 className="fw-bold">Top <span className="text-accent">Recommendations</span></h2>
          <div className="h-line"></div>
        </div>

        <div className="product-grid-v2">
          {featuredProducts.map((prod, i) => (
            <div key={prod.id} className="prod-card-v2" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="prod-img-wrapper">
                <img src={prod.image} alt={prod.name} />
                <span className="prod-badge">{prod.tag}</span>
                <div className="prod-actions">
                  <button className="icon-btn" onClick={() => toast.success('Added to Wishlist!')}><i className="far fa-heart"></i></button>
                  <button className="icon-btn" onClick={() => handleAddToCart(prod.name)}><i className="fas fa-shopping-cart"></i></button>
                </div>
              </div>
              <div className="prod-info-v2">
                <div className="rating-row">
                  {[...Array(prod.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <h4 className="prod-name-v2">{prod.name}</h4>
                <div className="price-row">
                  <span className="price-v2">{prod.price}</span>
                  <button className="btn-buy-v2" onClick={() => handleBuyNow(prod)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="support-banner-v2 mt-5 p-5" data-aos="flip-up">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-3">Not Sure What You Need?</h3>
              <p className="mb-0 opacity-75">Our expert astrologers can recommend the perfect gemstone or remedy 
              based on your unique birth chart analysis.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link to="/contact" className="btn btn-premium-v2">Get Free Recommendation</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shop-page-v2 {
          background-color: #FDF6EE;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #2A0F02;
          padding-top: 0;
        }

        .shop-hero-v2 {
          background: linear-gradient(rgba(42, 15, 2, 0.8), rgba(42, 15, 2, 0.8)), url('https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=1200');
          background-size: cover;
          background-position: center;
          padding: 180px 0 140px;
          position: relative;
        }

        .premium-label {
          color: #C8832A;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 800;
          font-size: 1.1rem;
          margin-bottom: 10px;
        }

        .text-accent { color: #C8832A; }

        .trust-row {
          background: #fff;
          margin-top: -50px;
          border-radius: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          padding: 30px;
          position: relative;
          z-index: 10;
          border: 1px solid rgba(200, 131, 42, 0.1);
        }

        .trust-col {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 10px 20px;
          border-right: 1px solid rgba(0,0,0,0.05);
        }
        .trust-col:last-child { border-right: none; }

        .trust-col i {
          font-size: 2.2rem;
          color: #8B4A1E;
        }
        .trust-col h6 { margin: 0; font-weight: 700; font-size: 1.2rem; }
        .trust-col small { color: #6c757d; font-size: 0.95rem; }

        .section-head { margin-bottom: 40px; }
        .h-line { width: 60px; height: 3px; background: #C8832A; margin: 15px auto; }

        /* Category Grid */
        .category-grid-v2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .cat-card-v2 {
          text-decoration: none;
          color: #fff;
          border-radius: 25px;
          overflow: hidden;
          position: relative;
          height: 380px;
          transition: all 0.4s ease;
        }

        .cat-card-v2:hover { transform: translateY(-10px); }

        .cat-img-box {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .cat-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .cat-card-v2:hover img { transform: scale(1.1); }

        .cat-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.85;
        }

        .cat-content {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 30px;
          width: 100%;
          z-index: 5;
        }

        .item-count {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(5px);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .cat-content h3 { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 2rem; margin-bottom: 5px; }
        .cat-content p { font-size: 1.1rem; opacity: 0.9; margin-bottom: 20px; }

        .explore-link { font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }

        /* Product Grid */
        .product-grid-v2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
        }

        .prod-card-v2 {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s;
          border: 1px solid rgba(200, 131, 42, 0.08);
        }

        .prod-card-v2:hover { box-shadow: 0 20px 40px rgba(139, 74, 30, 0.08); }

        .prod-img-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .prod-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }

        .prod-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #2A0F02;
          color: #fff;
          padding: 6px 15px;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .prod-actions {
          position: absolute;
          right: -50px;
          top: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: 0.3s;
        }

        .prod-card-v2:hover .prod-actions { right: 15px; }

        .icon-btn {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #fff;
          border: none;
          color: #2A0F02;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: 0.2s;
        }
        .icon-btn:hover { background: #8B4A1E; color: #fff; }

        .prod-info-v2 { padding: 20px; }
        .rating-row { color: #F59E0B; font-size: 0.9rem; margin-bottom: 8px; }
        .prod-name-v2 { font-weight: 700; font-size: 1.3rem; margin-bottom: 15px; height: 3.2rem; overflow: hidden; }
        
        .price-row { display: flex; justify-content: space-between; align-items: center; }
        .price-v2 { font-weight: 800; color: #8B4A1E; font-size: 1.5rem; }
        
        .btn-buy-v2 {
          background: transparent;
          border: 1.5px solid #2A0F02;
          color: #2A0F02;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: 0.3s;
        }
        .btn-buy-v2:hover { background: #2A0F02; color: #fff; }

        .support-banner-v2 {
          background: linear-gradient(135deg, #2A0F02 0%, #5C2D12 100%);
          border-radius: 30px;
          color: #fff;
        }

        .btn-premium-v2 {
          background: #C8832A;
          color: #fff;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 700;
          transition: 0.3s;
          border: none;
          text-decoration: none;
          display: inline-block;
        }
        .btn-premium-v2:hover { background: #fff; color: #2A0F02; transform: translateY(-3px); }

        @media (max-width: 991px) {
          .trust-col { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.05); }
          .trust-col:last-child { border-bottom: none; }
          .shop-hero-v2 { padding: 140px 0 100px; }
        }
      `}</style>
    </div>
  );
};

export default AstroShop;
