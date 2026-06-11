import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { openShopifyStore } from '../utils/shopify';
import { useSettings } from '../context/SettingsContext';

const AstroShop = () => {
  const { settings } = useSettings();
  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
      window.AOS.init({
        duration: 1000,
        once: true
      });
    }
  }, []);

  const handleAddToCart = (name) => {
    openShopifyStore({ storeUrl: settings?.shopifyStoreUrl, toast: toast.error, message: `Shopify URL is pending. ${name} will be managed from Shopify checkout.` });
  };

  const handleBuyNow = (prod) => {
    openShopifyStore({ path: 'collections/all', storeUrl: settings?.shopifyStoreUrl, toast: toast.error, message: `Shopify URL is pending. ${prod.name} checkout will open from Shopify.` });
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
    <div className="shop-page-v2 relative z-0 min-h-screen bg-[#FDF6EE] font-body text-[#2A0F02]">
      {/* Premium Hero */}
      <section className="shop-hero-v2 relative overflow-hidden pb-16 md:pb-20">
        <div className="hero-overlay"></div>
        <div className="container relative z-[1] text-center" data-aos="fade-down">
          <div className="premium-label text-kicker font-extrabold uppercase tracking-[0.2em] text-[#C8832A] mb-2">Authentic & Certified</div>
          <h1 className="type-display fw-bold mb-3 text-white">Divine <span className="text-[#C8832A]">Astro Shop</span></h1>
          <p className="text-body text-white/80 mb-0 max-w-2xl mx-auto">Your Gateway to Genuine Spiritual Remedies & Celestial Enhancements</p>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="container relative z-0 -mt-10 md:-mt-12 mb-2">
        <div className="trust-row shadow-sm">
          <div className="trust-col">
            <i className="fas fa-certificate text-xl text-[#8B4A1E]"></i>
            <div>
              <h6 className="text-body-sm font-bold m-0">100% Certified</h6>
              <small className="text-caption text-[#6c757d]">Lab-Tested Authenticity</small>
            </div>
          </div>
          <div className="trust-col">
            <i className="fas fa-shuttle-van text-xl text-[#8B4A1E]"></i>
            <div>
              <h6 className="text-body-sm font-bold m-0">Global Shipping</h6>
              <small className="text-caption text-[#6c757d]">Safe & Insured Delivery</small>
            </div>
          </div>
          <div className="trust-col">
            <i className="fas fa-lock text-xl text-[#8B4A1E]"></i>
            <div>
              <h6 className="text-body-sm font-bold m-0">Secure Payment</h6>
              <small className="text-caption text-[#6c757d]">Encrypted Checkout</small>
            </div>
          </div>
          <div className="trust-col">
            <i className="fas fa-sync-alt text-xl text-[#8B4A1E]"></i>
            <div>
              <h6 className="text-body-sm font-bold m-0">Easy Returns</h6>
              <small className="text-caption text-[#6c757d]">7-Day Satisfaction Guarantee</small>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-0 pb-5">
        {/* Category Section */}
        <div className="section-head mt-8 md:mt-10 mb-6">
          <h2 className="type-heading fw-bold mb-2">Browse by <span className="text-[#C8832A]">Category</span></h2>
          <p className="text-body text-[#5c3d26] mb-0">Find the perfect remedy for your planetary needs</p>
        </div>

        <div className="category-grid-v2">
          {categories.map((cat, i) => (
            <button key={i} type="button" onClick={() => openShopifyStore({ path: `collections/${cat.path}`, storeUrl: settings?.shopifyStoreUrl, toast: toast.error, message: `Shopify URL is pending. ${cat.name} collection will open from Shopify.` })} className="cat-card-v2" data-aos="zoom-in" data-aos-delay={i * 100}>
              <div className="cat-img-box">
                <img src={cat.image} alt={cat.name} />
                <div className="cat-overlay" style={{ background: `linear-gradient(to top, ${cat.accent}, transparent)` }}></div>
                <div className="cat-content">
                  <span className="item-count text-caption font-bold">{cat.count}</span>
                  <h3 className="font-heading text-xl md:text-2xl font-extrabold mb-1">{cat.name}</h3>
                  <p className="text-body-sm opacity-90 mb-3">{cat.desc}</p>
                  <div className="explore-link text-caption font-bold uppercase tracking-wide">Explore Collection <i className="fas fa-arrow-right"></i></div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Featured Products */}
        <div className="section-head mt-10 pt-6 mb-6 text-center">
          <h2 className="type-heading fw-bold mb-3">Top <span className="text-[#C8832A]">Recommendations</span></h2>
          <div className="h-line"></div>
        </div>

        <div className="product-grid-v2">
          {featuredProducts.map((prod, i) => (
            <div key={prod.id} className="prod-card-v2" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="prod-img-wrapper">
                <img src={prod.image} alt={prod.name} />
                <span className="prod-badge text-caption font-bold uppercase">{prod.tag}</span>
                <div className="prod-actions">
                  <button className="icon-btn" onClick={() => toast.success('Added to Wishlist!')}><i className="far fa-heart"></i></button>
                  <button className="icon-btn" onClick={() => handleAddToCart(prod.name)}><i className="fas fa-shopping-cart"></i></button>
                </div>
              </div>
              <div className="prod-info-v2">
                <div className="rating-row">
                  {[...Array(prod.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <h4 className="prod-name-v2 text-body font-bold">{prod.name}</h4>
                <div className="price-row">
                  <span className="price-v2 text-lg font-extrabold">{prod.price}</span>
              <button className="btn-buy-v2 text-btn font-bold" onClick={() => handleBuyNow(prod)}>Open in Shopify</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="support-banner-v2 mt-5 p-5" data-aos="flip-up">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="type-subheading fw-bold text-white mb-3">Not Sure What You Need?</h3>
              <p className="text-body text-white/90 mb-0">Our expert astrologers can recommend the perfect gemstone or remedy 
              based on your unique birth chart analysis.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link to="/contact" className="btn btn-premium-v2 text-btn font-bold">Get Free Recommendation</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shop-hero-v2 {
          background: linear-gradient(rgba(42, 15, 2, 0.8), rgba(42, 15, 2, 0.8)), url('https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=1200');
          background-size: cover;
          background-position: center;
          padding: clamp(4rem, 8vw, 6.5rem) 0 clamp(3rem, 6vw, 4rem);
        }

        .trust-row {
          background: #fff;
          border-radius: var(--radius-card);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          padding: clamp(1rem, 2vw, 1.5rem);
          position: relative;
          z-index: 0;
          border: 1px solid rgba(200, 131, 42, 0.1);
        }

        .trust-col {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.65rem 1rem;
          border-right: 1px solid rgba(0,0,0,0.05);
        }
        .trust-col:last-child { border-right: none; }

        .h-line { width: 60px; height: 3px; background: #C8832A; margin: 0 auto; }

        /* Category Grid */
        .category-grid-v2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .cat-card-v2 {
          text-decoration: none;
          color: #fff;
          border-radius: var(--radius-card);
          overflow: hidden;
          position: relative;
          height: clamp(17rem, 28vw, 21rem);
          transition: all 0.4s ease;
          border: 0;
          display: block;
          padding: 0;
          text-align: left;
          width: 100%;
          cursor: pointer;
        }

        .cat-card-v2:hover { transform: translateY(-5px); }

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
          padding: 1.35rem;
          width: 100%;
          z-index: 5;
        }

        .item-count {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(5px);
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 15px;
        }

        /* Product Grid */
        .product-grid-v2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .prod-card-v2 {
          background: #fff;
          border-radius: var(--radius-card);
          overflow: hidden;
          transition: all 0.3s;
          border: 1px solid rgba(200, 131, 42, 0.08);
        }

        .prod-card-v2:hover { box-shadow: 0 20px 40px rgba(139, 74, 30, 0.08); }

        .prod-img-wrapper {
          position: relative;
          height: 13.5rem;
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

        .prod-info-v2 { padding: 1rem; }
        .rating-row { color: #F59E0B; font-size: 1rem; margin-bottom: 8px; }
        .prod-name-v2 { margin-bottom: 0.9rem; height: 2.8rem; overflow: hidden; }
        
        .price-row { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; }
        .price-v2 { color: #8B4A1E; }
        
        .btn-buy-v2 {
          background: transparent;
          border: 1.5px solid #2A0F02;
          color: #2A0F02;
          padding: 8px 20px;
          border-radius: 8px;
          transition: 0.3s;
        }
        .btn-buy-v2:hover { background: #2A0F02; color: #fff; }

        .support-banner-v2 {
          background: linear-gradient(135deg, #2A0F02 0%, #5C2D12 100%);
          border-radius: var(--radius-card);
          color: #fff;
        }

        .support-banner-v2 h3,
        .support-banner-v2 p {
          color: #fff !important;
        }

        .btn-premium-v2 {
          background: #C8832A;
          color: #fff;
          padding: 12px 30px;
          border-radius: 50px;
          transition: 0.3s;
          border: none;
          text-decoration: none;
          display: inline-block;
        }
        .btn-premium-v2:hover { background: #fff; color: #2A0F02; transform: translateY(-3px); }

        @media (max-width: 991px) {
          .trust-col { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.05); }
          .trust-col:last-child { border-bottom: none; }
          .shop-hero-v2 { padding: 3.5rem 0 3.5rem; }
        }
      `}</style>
    </div>
  );
};

export default AstroShop;
