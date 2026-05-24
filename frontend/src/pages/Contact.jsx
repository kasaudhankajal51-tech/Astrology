import { useState } from 'react';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';

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
      <SEO title="Contact Us" description="Get in touch with DS Astro Institute for astrology consultations and courses." url="/contact" />
      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Side */}
          <div className="contact-left">
            <h2>Contact Us</h2>
            <p><i className="fas fa-building"></i> {settings?.address || 'Varanasi, Uttar Pradesh, India'}</p>
            <p><i className="fas fa-phone"></i> {settings?.contactPhone || '+91 75709 72970'}</p>
            <p><i className="fas fa-envelope"></i> {settings?.contactEmail || 'info@dsastroinstitute.com'}</p>
            
            <div className="grievance-officer mt-4 p-4" style={{ background: 'rgba(139, 74, 30, 0.05)', borderRadius: '12px', borderLeft: '4px solid #8B4A1E' }}>
              <h5 style={{ color: '#8B4A1E', marginBottom: '12px', fontWeight: 'bold' }}>Grievance Officer</h5>
              <p style={{ margin: '0 0 8px', color: '#5C3D26' }}><strong>Name:</strong> Ananya Singh</p>
              <p style={{ margin: '0 0 8px', color: '#5C3D26' }}><strong>Email:</strong> help@dsastroinstitute.com</p>
              <p style={{ margin: '0 0 8px', color: '#5C3D26' }}><strong>Phone:</strong> +91 7570972970</p>
              <p style={{ margin: '0 0 8px', color: '#5C3D26' }}><strong>Address:</strong> D321, Vibhuti Khand, Lucknow, Uttar Pradesh - 226010</p>
              <p style={{ margin: '0', color: '#5C3D26' }}><strong>Response time:</strong> Within 7 working days</p>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="contact-right">
            <form onSubmit={handleSubmit} className="contact-form-box">
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
              <div className="form-group consent-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '20px' }}>
                <input type="checkbox" id="consent" name="consent" required style={{ width: 'auto', marginTop: '4px' }} />
                <label htmlFor="consent" style={{ fontSize: '13px', color: '#5C3D26', lineHeight: '1.4', fontWeight: '400', marginBottom: 0 }}>
                  I agree to the <a href="/privacy-policy" style={{ color: '#8B4A1E', fontWeight: '600' }}>Privacy Policy</a> and consent to DS Astro Institute LLP contacting me via phone, email, and WhatsApp.
                </label>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>



      <style>{`
        .contact-section { padding: 100px 20px 80px; max-width: 1200px; margin: 0 auto; background: #FDF6EE; }
        .contact-container { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .contact-left h2 { font-size: 36px; margin-bottom: 25px; color: #2A0F02; font-family: 'Playfair Display', serif; font-weight: 700; }
        .contact-left p { margin-bottom: 15px; font-size: 16px; color: #5C3D26; }
        .contact-left i { margin-right: 12px; color: #8B4A1E; width: 20px; text-align: center; }
        
        .contact-form-box { background: #fff; padding: 40px; border-radius: 24px; box-shadow: 0 15px 40px rgba(139, 74, 30, 0.08); border: 1px solid rgba(139, 74, 30, 0.1); }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #2A0F02; font-size: 15px; }
        .form-group input, .form-group textarea { width: 100%; padding: 14px; border-radius: 10px; border: 1px solid rgba(139, 74, 30, 0.2); background: #fafafa; color: #2A0F02; font-family: inherit; font-size: 15px; transition: all 0.3s; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #8B4A1E; box-shadow: 0 0 0 4px rgba(139, 74, 30, 0.1); background: #fff; }
        
        .submit-btn { background: #2A0F02; color: #fff; padding: 14px 30px; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 16px; width: 100%; transition: all 0.3s; margin-top: 10px; }
        .submit-btn:hover { background: #8B4A1E; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(139, 74, 30, 0.15); }
        
        @media(max-width:768px) {
          .contact-container { grid-template-columns: 1fr; gap: 40px; }
          .contact-section { padding: 60px 20px; }
          .contact-form-box { padding: 25px; }
        }
      `}</style>
    </>
  );
}

export default Contact;
