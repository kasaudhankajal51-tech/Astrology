import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ShopCategory = () => {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const navigate = useNavigate();

  const shopData = {
    gemstones: {
      title: 'Premium Gemstones',
      desc: 'Authentic and certified gemstones for planetary balance and prosperity.',
      banner: '/images/shop-gemstones.png',
      products: [
        { id: 1, name: 'Natural Blue Sapphire (Neelam)', price: '₹12,500', rating: 5, image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=400' },
        { id: 2, name: 'Panna (Emerald) - Zambian', price: '₹8,400', rating: 4, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400' },
        { id: 3, name: 'Red Coral (Moonga)', price: '₹4,200', rating: 5, image: 'https://images.unsplash.com/photo-1588444839799-eb00f490a6d8?auto=format&fit=crop&q=80&w=400' },
        { id: 4, name: 'Yellow Sapphire (Pukhraj)', price: '₹15,000', rating: 5, image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    rudraksha: {
      title: 'Sacred Rudraksha',
      desc: 'Divine beads from the Himalayas for protection and spiritual growth.',
      banner: '/images/shop-rudraksha.png',
      products: [
        { id: 1, name: '5 Mukhi Rudraksha Mala', price: '₹450', rating: 5, image: 'https://images.unsplash.com/photo-1605000797439-75a150088f44?auto=format&fit=crop&q=80&w=400' },
        { id: 2, name: '7 Mukhi Rudraksha Bead', price: '₹2,500', rating: 5, image: 'https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=400' },
        { id: 3, name: '12 Mukhi Surya Rudraksha', price: '₹5,500', rating: 5, image: 'https://images.unsplash.com/photo-1605000797439-75a150088f44?auto=format&fit=crop&q=80&w=400' },
        { id: 4, name: "Gauri Shankar Rudraksha", price: "₹8,000", rating: 5, image: "https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=400" },
      ]
    },
    yantras: {
      title: 'Vedic Yantras',
      desc: 'Sacred geometrical diagrams for attracting positive cosmic energy.',
      banner: '/images/shop-yantras.png',
      products: [
        { id: 1, name: 'Shree Yantra - 24k Gold Plated', price: '₹3,999', rating: 5, image: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400' },
        { id: 2, name: 'Kuber Yantra for Wealth', price: '₹1,500', rating: 4, image: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400' },
        { id: 3, name: 'Mahamrityunjay Yantra', price: '₹2,100', rating: 5, image: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400' },
        { id: 4, name: "Vyapar Vriddhi Yantra", price: "₹2,500", rating: 5, image: "https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400" },
      ]
    },
    'puja-kits': {
      title: 'Premium Puja Kits',
      desc: 'Complete ceremonial sets for rituals, festivals, and spiritual practices.',
      banner: '/images/shop-puja.png',
      products: [
        { id: 1, name: 'Diwali Maha Puja Kit', price: '₹4,500', rating: 5, image: 'https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=400' },
        { id: 2, name: 'Navratri Durga Puja Set', price: '₹3,200', rating: 5, image: 'https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=400' },
        { id: 3, name: 'Daily Morning Puja Box', price: '₹1,200', rating: 4, image: 'https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=400' },
        { id: 4, name: "Havan Samagri Premium", price: "₹850", rating: 5, image: "https://images.unsplash.com/photo-1596944229581-7951ef4957ad?auto=format&fit=crop&q=80&w=400" },
      ]
    },
    bracelets: {
      title: 'Cosmic Bracelets',
      desc: 'Fashionable healing jewelry energized with planetary vibrations.',
      banner: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=1200',
      products: [
        { id: 1, name: 'Amethyst Healing Bracelet', price: '₹899', rating: 5, image: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400' },
        { id: 2, name: 'Rose Quartz Love Bracelet', price: '₹750', rating: 5, image: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400' },
        { id: 3, name: 'Evil Eye Protection Bracelet', price: '₹650', rating: 5, image: 'https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400' },
        { id: 4, name: "7 Chakra Balance Bracelet", price: "₹1,100", rating: 5, image: "https://images.unsplash.com/photo-1590736962100-36940a08e16a?auto=format&fit=crop&q=80&w=400" },
      ]
    }
  };

  useEffect(() => {
    if (category && shopData[category]) {
      setCategoryData(shopData[category]);
    } else {
      setCategoryData(shopData.gemstones); // Fallback
    }
    window.scrollTo(0, 0);
  }, [category]);

  if (!categoryData) return null;

  return (
    <div className="category-page" style={{ background: '#FFFDFB', minHeight: '100vh', paddingTop: '80px' }}>
      <style>{`
        .cat-hero {
          background: linear-gradient(rgba(42, 15, 2, 0.7), rgba(42, 15, 2, 0.7)), url(${categoryData.banner});
          background-size: cover;
          background-position: center;
          padding: 100px 0;
          color: #fff;
          text-align: center;
        }
        .cat-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          margin-bottom: 15px;
          color: #fff !important;
        }
        .cat-desc {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.1rem;
          opacity: 0.9;
          color: #fff !important;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        .product-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(200, 131, 42, 0.08);
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(139, 74, 30, 0.1);
        }
        .product-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        .product-info {
          padding: 20px;
        }
        .product-name {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: #2A0F02;
          height: 3rem;
          overflow: hidden;
        }
        .product-price {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--primary-color);
        }
        .btn-add {
          background: var(--primary-color);
          color: #fff;
          border: none;
          padding: 12px;
          border-radius: 10px;
          font-weight: 700;
          width: 100%;
          margin-top: 15px;
          transition: 0.3s;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        .btn-add:hover {
          background: #2A0F02;
          transform: scale(1.02);
        }
        .rating i {
          color: #F59E0B;
          font-size: 0.8rem;
          margin-right: 2px;
        }
      `}</style>

      <section className="cat-hero">
        <div className="container">
          <h1 className="cat-title">{categoryData.title}</h1>
          <p className="cat-desc">{categoryData.desc}</p>
        </div>
      </section>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#2A0F02' }}>Explore Products</h2>
          <div className="text-muted small">Showing {categoryData.products.length} Items</div>
        </div>

        <div className="product-grid">
          {categoryData.products.map((prod) => (
            <div key={prod.id} className="product-card">
              <img src={prod.image} alt={prod.name} className="product-img" />
              <div className="product-info">
                <div className="rating mb-2">
                  {[...Array(prod.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <h4 className="product-name">{prod.name}</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="product-price m-0">{prod.price}</p>
                  <span className="text-success small fw-bold">In Stock</span>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn-add" style={{ flex: 1, background: '#f8f9fa', color: '#2A0F02', border: '1px solid #2A0F02' }} onClick={() => toast.success(`${prod.name} added to cart!`)}>Add to cart</button>
                  <button className="btn-add" style={{ flex: 1 }} onClick={() => navigate('/shop/checkout', { state: { product: prod } })}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-4 bg-light text-center border">
          <p className="m-0 text-muted">All products are certified for authenticity and purity. <b>Free shipping</b> on orders above ₹2000.</p>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
