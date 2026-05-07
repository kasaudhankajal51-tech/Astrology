import React from 'react';
import { Link } from 'react-router-dom';

const AstroShop = () => {
  const categories = [
    { name: 'Premium Gemstones', icon: '💎', count: '120+ Items', color: '#8B4A1E' },
    { name: 'Sacred Rudraksha', icon: '📿', count: '45+ Items', color: '#C8832A' },
    { name: 'Vedic Yantras', icon: '📐', count: '30+ Items', color: '#5C2D12' },
    { name: 'Puja Essentials', icon: '🕯️', count: '85+ Items', color: '#8B4A1E' },
  ];

  const featuredProducts = [
    { id: 1, name: 'Natural Blue Sapphire', price: '₹15,000', rating: 5, image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=400', tag: 'Bestseller' },
    { id: 2, name: '7 Mukhi Rudraksha', price: '₹2,500', rating: 4, image: 'https://images.unsplash.com/photo-1605000797439-75a150088f44?auto=format&fit=crop&q=80&w=400', tag: 'Sacred' },
    { id: 3, name: 'Shree Yantra Gold Plated', price: '₹4,999', rating: 5, image: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400', tag: 'Powerful' },
    { id: 4, name: 'Crystal Quartz Mala', price: '₹1,200', rating: 5, image: 'https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=400', tag: 'Pure' },
  ];

  return (
    <div className="shop-page" style={{ background: '#FFFDFB', minHeight: '100vh', paddingTop: '80px' }}>
      <style>{`
        .shop-hero {
          background: linear-gradient(135deg, #2A0F02 0%, #5C2D12 100%);
          padding: 80px 0;
          color: #fff;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .shop-hero::after {
          content: '✨';
          position: absolute;
          top: 20%;
          right: 10%;
          font-size: 40px;
          opacity: 0.2;
        }
        .shop-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          margin-bottom: 20px;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 25px;
          margin-top: -60px;
          position: relative;
          z-index: 10;
        }
        .category-card {
          background: #fff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(139, 74, 30, 0.1);
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(200, 131, 42, 0.1);
        }
        .category-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-color);
        }
        .category-icon {
          font-size: 40px;
          margin-bottom: 15px;
          display: block;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }
        .product-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        .product-card:hover {
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }
        .product-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        .product-info {
          padding: 20px;
        }
        .product-tag {
          font-size: 10px;
          text-transform: uppercase;
          background: var(--primary-color);
          color: #fff;
          padding: 2px 8px;
          border-radius: 10px;
          display: inline-block;
          margin-bottom: 10px;
        }
        .product-name {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: #2A0F02;
        }
        .product-price {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--primary-color);
        }
        .btn-shop {
          background: var(--primary-color);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          width: 100%;
          margin-top: 15px;
          transition: 0.3s;
        }
        .btn-shop:hover {
          background: #2A0F02;
        }
      `}</style>

      <section className="shop-hero">
        <div className="container">
          <h1 className="shop-title">Divine Astro Shop</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Authentic Spiritual Remedies & Cosmic Essentials</p>
        </div>
      </section>

      <div className="container pb-5">
        <div className="category-grid">
          {categories.map((cat, i) => (
            <div key={i} className="category-card">
              <span className="category-icon">{cat.icon}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>{cat.name}</h3>
              <p style={{ color: '#8C6A4F', fontSize: '0.9rem' }}>{cat.count}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 text-center">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#2A0F02' }}>Featured Products</h2>
          <div style={{ width: '60px', height: '3px', background: 'var(--accent-color)', margin: '15px auto' }}></div>
        </div>

        <div className="product-grid">
          {featuredProducts.map((prod) => (
            <div key={prod.id} className="product-card">
              <div style={{ position: 'relative' }}>
                <img src={prod.image} alt={prod.name} className="product-img" />
                <span className="product-tag" style={{ position: 'absolute', top: '15px', left: '15px' }}>{prod.tag}</span>
              </div>
              <div className="product-info">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h4 className="product-name m-0">{prod.name}</h4>
                  <div style={{ color: '#F59E0B', fontSize: '0.8rem' }}>
                    {[...Array(prod.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                  </div>
                </div>
                <p className="product-price">{prod.price}</p>
                <button className="btn-shop">Add to cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-5 text-center bg-white rounded-4 shadow-sm">
          <h3 style={{ fontFamily: 'var(--font-serif)' }}>Looking for something specific?</h3>
          <p className="text-muted">Our full catalog of gemstones and customized remedies is being updated.</p>
          <Link to="/contact" className="btn btn-outline-primary rounded-pill px-4">Contact Our Experts</Link>
        </div>
      </div>
    </div>
  );
};

export default AstroShop;
