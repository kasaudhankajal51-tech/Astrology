import { useState } from 'react';
import toast from 'react-hot-toast';

function Careers() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', position: 'Astrologer', experience: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/jobs/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Application submitted successfully!');
        setFormData({ name: '', email: '', phone: '', position: 'Astrologer', experience: '', message: '' });
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="careers-page py-5" style={{ background: '#070913', minHeight: '100vh', color: '#fff' }}>
      <div className="container mt-5 pt-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3" style={{ background: 'linear-gradient(135deg, #ff6a00, #ff0080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Join Our Cosmic Team</h1>
          <p className="text-muted lead">Are you a professional Astrologer, Numerologist, or Tarot Reader? Let's grow together.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4 p-md-5" style={{ background: '#0b1220', border: '1px solid #1a1a2e', borderRadius: '30px' }}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label text-muted small uppercase fw-bold">Full Name</label>
                    <input type="text" className="form-control bg-dark text-white border-secondary py-3" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label text-muted small uppercase fw-bold">Email Address</label>
                    <input type="email" className="form-control bg-dark text-white border-secondary py-3" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label text-muted small uppercase fw-bold">Phone Number</label>
                    <input type="text" className="form-control bg-dark text-white border-secondary py-3" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label text-muted small uppercase fw-bold">Position Interested In</label>
                    <select className="form-select bg-dark text-white border-secondary py-3" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})}>
                      <option value="Astrologer">Astrologer</option>
                      <option value="Tarot Reader">Tarot Reader</option>
                      <option value="Numerologist">Numerologist</option>
                      <option value="Content Writer">Content Writer</option>
                      <option value="Customer Support">Customer Support</option>
                    </select>
                  </div>
                  <div className="col-12 mb-4">
                    <label className="form-label text-muted small uppercase fw-bold">Experience (in years)</label>
                    <input type="text" className="form-control bg-dark text-white border-secondary py-3" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} placeholder="e.g., 5+ years" required />
                  </div>
                  <div className="col-12 mb-4">
                    <label className="form-label text-muted small uppercase fw-bold">Briefly about yourself</label>
                    <textarea className="form-control bg-dark text-white border-secondary py-3" rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-3 mt-3 fw-bold" style={{ background: 'linear-gradient(135deg, #ff6a00, #ff0080)', border: 'none', borderRadius: '50px' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;
