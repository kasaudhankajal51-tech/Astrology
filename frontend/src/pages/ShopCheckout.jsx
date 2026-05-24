import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ShopCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // If no product in state, redirect back to shop
  if (!product) {
    navigate('/shop');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate checkout process
    setTimeout(() => {
      toast.success('Order placed successfully! We will contact you soon.');
      setIsSubmitting(false);
      navigate('/shop');
    }, 1500);
  };

  return (
    <div className="checkout-page pb-5" style={{ background: '#FFFDFB', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container mt-5">
        <h2 className="mb-4" style={{ fontFamily: 'var(--font-serif)', color: '#2A0F02', fontWeight: 800 }}>Checkout</h2>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4" style={{ background: '#fff', border: '1px solid rgba(200, 131, 42, 0.08) !important' }}>
              <h4 className="mb-4" style={{ color: '#8B4A1E', fontWeight: 700 }}>Delivery Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold" style={{ color: '#5C3D26' }}>Full Name</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold" style={{ color: '#5C3D26' }}>Phone Number</label>
                    <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required placeholder="10-digit number" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold" style={{ color: '#5C3D26' }}>Email Address</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                  </div>
                  <div className="col-md-8">
                    <label className="form-label fw-bold" style={{ color: '#5C3D26' }}>Full Delivery Address</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required placeholder="House No, Street, Landmark, City" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold" style={{ color: '#5C3D26' }}>Pincode</label>
                    <input type="text" name="pincode" className="form-control" value={formData.pincode} onChange={handleChange} required placeholder="6-digit pincode" />
                  </div>
                </div>

                <div className="form-group consent-group mt-4 p-3 rounded" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#fcf8f2', border: '1px solid #f0e4d4' }}>
                  <input type="checkbox" id="consent-checkout" name="consent" required style={{ width: '18px', height: '18px', marginTop: '2px', cursor: 'pointer' }} />
                  <label htmlFor="consent-checkout" style={{ fontSize: '14px', color: '#444', lineHeight: '1.4', margin: 0, cursor: 'pointer' }}>
                    I agree to the <a href="/privacy-policy" style={{ color: '#ff6a00', textDecoration: 'underline' }}>Privacy Policy</a> and consent to DS Astro Institute LLP contacting me via phone, email, and WhatsApp.
                  </label>
                </div>

                <button type="submit" className="btn btn-premium mt-4 w-100 py-3 text-uppercase letter-spacing-1" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4" style={{ background: '#fff', border: '1px solid rgba(200, 131, 42, 0.08) !important' }}>
              <h4 className="mb-4" style={{ color: '#8B4A1E', fontWeight: 700 }}>Order Summary</h4>
              <div className="d-flex gap-3 mb-3 pb-3 border-bottom">
                <img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: '#2A0F02', lineHeight: '1.3' }}>{product.name}</h6>
                  <p className="text-muted small mb-0">{product.price}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">{product.price}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-muted">Shipping</span>
                <span className="text-success fw-bold">Free</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5 text-dark">Total</span>
                <span className="fw-bold fs-4" style={{ color: '#C8832A' }}>{product.price}</span>
              </div>
              <div className="mt-4 p-3 rounded" style={{ background: '#FDF6EE', border: '1px dashed rgba(200, 131, 42, 0.4)' }}>
                <p className="small mb-0 text-center fw-bold" style={{ color: '#8B4A1E' }}><i className="fas fa-shield-alt me-2"></i>100% Secure & Encrypted Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .form-control {
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #e2d9cf;
          background-color: #faf7f2;
          color: #2A0F02;
        }
        .form-control:focus {
          border-color: #C8832A;
          box-shadow: 0 0 0 0.2rem rgba(200, 131, 42, 0.15);
          background-color: #fff;
        }
        .btn-premium {
          background: linear-gradient(135deg, #C8832A 0%, #8B4A1E 100%);
          color: #fff;
          font-weight: 700;
          border-radius: 8px;
          border: none;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(200, 131, 42, 0.3);
        }
        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(200, 131, 42, 0.4);
          color: #fff;
        }
        .letter-spacing-1 {
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
};

export default ShopCheckout;
