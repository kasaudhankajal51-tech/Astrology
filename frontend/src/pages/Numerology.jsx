import { useState } from 'react';
import API_BASE from '../utils/api';

function Numerology() {
  const [formData, setFormData] = useState({ name: '', dob: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/tools/numerology`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || data.message || 'Calculation failed');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const fav = result?.favourable || {};

  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1>Numerology</h1>
          <p className="lead">Discover the power of numbers in your life</p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="numero-card p-4 h-100">
            <h3>What is Numerology?</h3>
            <p>Numerology is the study of numbers and their mystical significance in our lives. Each number carries a unique vibration and meaning that can reveal insights about your personality, destiny, and life path.</p>
            <h4 className="mt-4">Key Numbers in Your Life:</h4>
            <ul>
              <li><strong>Life Path Number:</strong> Your core personality and life purpose</li>
              <li><strong>Destiny Number:</strong> Your natural talents and abilities</li>
              <li><strong>Soul Urge Number:</strong> Your inner desires and motivations</li>
              <li><strong>Personality Number:</strong> How others perceive you</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="numero-calc p-4 h-100">
            <h3>Free Numerology Calculator</h3>
            <form onSubmit={calculate}>
              <div className="form-group mb-3">
                <label>Your Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Date of Birth</label>
                <div className="position-relative">
                  <input 
                    type="date" 
                    className="form-control custom-date-input" 
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                  />
                  <i className="fas fa-calendar-alt position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2" /> Calculating...</> : 'Calculate My Numbers'}
              </button>
              {error && <div className="alert alert-danger mt-3 py-2 text-center">{error}</div>}
            </form>
          </div>
        </div>
      </div>

      {result && (
        <div className="row mt-5 result-section fade-in">
          <div className="col-12 text-center mb-4">
            <h2 className="text-warning">Your Numerology Profile</h2>
            <p className="text-muted">Profile for <strong>{result.name}</strong> • DOB: {result.dob}</p>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="result-card p-4 text-center">
              <h1 className="display-3 text-primary mb-0">{result.radical}</h1>
              <h4 className="mt-2">Radical Number</h4>
              <p className="text-muted small">Birth day energy</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="result-card p-4 text-center">
              <h1 className="display-3 text-warning mb-0">{result.destiny}</h1>
              <h4 className="mt-2">Destiny Number</h4>
              <p className="text-muted small">Life path vibration</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="result-card p-4 text-center">
              <h1 className="display-3 text-info mb-0">{result.nameNumber}</h1>
              <h4 className="mt-2">Name Number</h4>
              <p className="text-muted small">Chaldean expression</p>
            </div>
          </div>

          {fav.planet && (
            <div className="col-12 mt-3">
              <div className="favourable-card p-4">
                <h4 className="text-warning mb-4">🪐 Auspicious Details</h4>
                <div className="row g-4">
                  {[
                    ['Planet', '🪐', fav.planet],
                    ['Sign', '♑', fav.sign],
                    ['Lucky Stones', '💎', fav.stones],
                    ['Lucky Days', '📅', fav.days],
                    ['Lucky Colors', '🎨', fav.color],
                    ['Deity', '🙏', fav.god],
                    ['Fasting Days', '🌙', fav.fast],
                    ['Lucky Dates', '🗓️', fav.dates],
                    ['Direction', '🧭', fav.direction],
                    ['Lucky Letters', '🔤', fav.alphabets],
                    ['Lucky Numbers', '✨', fav.number],
                  ].map(([label, icon, value]) => (
                    <div className="col-md-4 col-sm-6" key={label}>
                      <div className="d-flex align-items-center mb-2">
                        <span className="fs-4 me-3">{icon}</span>
                        <div>
                          <small className="text-muted d-block text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>{label}</small>
                          <strong>{value}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {fav.mantra && (
                  <div className="mt-4 p-4 text-center mantra-box rounded">
                    <h5 className="text-muted text-uppercase mb-2" style={{ fontSize: '12px', letterSpacing: '2px' }}>Sacred Mantra</h5>
                    <h4 className="text-warning my-3">{fav.mantra}</h4>
                    <p className="small text-muted mb-0">Chant 108 times every {fav.fast} morning for blessings of {fav.god}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .numero-card, .result-card, .favourable-card { background: rgba(255,255,255,0.05); border-radius: 15px; }
        .numero-card h3, .numero-calc h3 { color: #ff6a00; margin-bottom: 20px; }
        .numero-card p, .numero-card li { color: #ccc; line-height: 1.8; }
        .numero-calc { background: rgba(255,255,255,0.08); border-radius: 15px; }
        .numero-calc label { color: #fff; margin-bottom: 8px; display: block; }
        .numero-calc input { background: #222; border: 1px solid #444; color: #fff; }
        .numero-calc input:focus { background: #2a2a2a; border-color: #ff6a00; color: #fff; box-shadow: 0 0 0 0.25rem rgba(255, 106, 0, 0.25); }
        .mantra-box { background: rgba(255, 106, 0, 0.1); border: 1px solid rgba(255, 106, 0, 0.2); }
        .fade-in { animation: fadeIn 0.5s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .custom-date-input {
          color-scheme: dark;
          position: relative;
        }
        .custom-date-input::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
          opacity: 0; cursor: pointer; z-index: 2;
        }
      `}</style>
    </section>
  );
}

export default Numerology;
