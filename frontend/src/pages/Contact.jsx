import { useState } from 'react';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';
import { useSettings } from '../context/SettingsContext';

function Contact() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Contact' })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Message sent! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Network Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Side */}
          <div className="contact-left">
            <h2>Contact Us</h2>
            <p><i className="fas fa-building"></i> {settings?.address || 'Varanasi, Uttar Pradesh, India'}</p>
            <p><i className="fas fa-phone"></i> {settings?.contactPhone || '+91 75709 72970'}</p>
            <p><i className="fas fa-envelope"></i> {settings?.contactEmail || 'support@astroava.com'}</p>
            <img src="/images/logo.png" alt="logo" className="contact-logo" />
          </div>

          {/* Right Side Form */}
          <div className="contact-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps?q=sector+66+noida&output=embed"
          width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy">
        </iframe>
      </div>

      <style>{`
        .contact-section { padding: 120px 20px; max-width: 1200px; margin: 0 auto; }
        .contact-container { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .contact-left h2 { font-size: 28px; margin-bottom: 20px; color: #fff; }
        .contact-left p { margin-bottom: 15px; font-size: 16px; color: #ccc; }
        .contact-left i { margin-right: 10px; color: #ff6a00; }
        .contact-logo { margin-top: 30px; width: 200px; opacity: 0.9; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: 500; color: #fff; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px; border-radius: 8px; border: 2px solid #222; background: #eee; }
        .submit-btn { background: #ff6a00; color: #000; padding: 10px 25px; border: none; border-radius: 8px; cursor: pointer; float: right; font-weight: 600; }
        .submit-btn:hover { background: #ff8533; }
        .map-section { margin-top: -70px; }
        @media(max-width:768px) {
          .contact-container { grid-template-columns: 1fr; }
          .contact-section { padding: 60px 15px; }
          .submit-btn { width: 100%; float: none; }
        }
      `}</style>
    </>
  );
}

export default Contact;
