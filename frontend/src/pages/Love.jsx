import { useState } from 'react';
import API_BASE from '../utils/api';

function Love() {
  const [formData, setFormData] = useState({
    name1: '', dob1: '',
    name2: '', dob2: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_BASE}/api/love/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || data.message || 'Calculation failed');
      setResult(data.result);
    } catch (err) {
      setError(err.message || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1>Love & Relationship Astrology</h1>
          <p className="lead">Find your cosmic compatibility and relationship guidance</p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="love-content p-4 h-100">
            <h3>Love Compatibility Analysis</h3>
            <p>Discover how your stars align with your partner. Our love compatibility analysis examines:</p>
            <ul>
              <li>Sun Sign Compatibility</li>
              <li>Moon Sign Emotional Connection</li>
              <li>Venus-Mars Attraction Analysis</li>
              <li>7th House Marriage Prospects</li>
              <li>Long-term Relationship Potential</li>
            </ul>
            <h4 className="mt-4">Services We Offer:</h4>
            <div className="row g-3 mt-2">
              <div className="col-6">
                <div className="service-box p-3 text-center">
                  <i className="fas fa-heart text-danger fa-2x mb-2"></i>
                  <p className="mb-0">Marriage Matching</p>
                </div>
              </div>
              <div className="col-6">
                <div className="service-box p-3 text-center">
                  <i className="fas fa-ring text-warning fa-2x mb-2"></i>
                  <p className="mb-0">Engagement Muhurat</p>
                </div>
              </div>
              <div className="col-6">
                <div className="service-box p-3 text-center">
                  <i className="fas fa-user-friends text-info fa-2x mb-2"></i>
                  <p className="mb-0">Relationship Issues</p>
                </div>
              </div>
              <div className="col-6">
                <div className="service-box p-3 text-center">
                  <i className="fas fa-search text-success fa-2x mb-2"></i>
                  <p className="mb-0">Finding Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="love-calc p-4 h-100">
            <h3>Free Love Calculator</h3>
            <p>Check your compatibility percentage</p>
            <form onSubmit={calculate}>
              <div className="form-group mb-3">
                <label>Your Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter your name" 
                  value={formData.name1}
                  onChange={(e) => setFormData({ ...formData, name1: e.target.value })}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Your Date of Birth</label>
                <div className="position-relative">
                  <input 
                    type="date" 
                    className="form-control custom-date-input" 
                    value={formData.dob1}
                    onChange={(e) => setFormData({ ...formData, dob1: e.target.value })}
                    required
                  />
                  <i className="fas fa-calendar-alt position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
                </div>
              </div>
              <hr className="my-4" style={{ borderColor: 'rgba(255,106,0,0.3)' }}/>
              <div className="form-group mb-3">
                <label>Partner&apos;s Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter partner's name" 
                  value={formData.name2}
                  onChange={(e) => setFormData({ ...formData, name2: e.target.value })}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Partner&apos;s Date of Birth</label>
                <div className="position-relative">
                  <input 
                    type="date" 
                    className="form-control custom-date-input" 
                    value={formData.dob2}
                    onChange={(e) => setFormData({ ...formData, dob2: e.target.value })}
                    required
                  />
                  <i className="fas fa-calendar-alt position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
                </div>
              </div>
              <button type="submit" className="btn btn-danger w-100 py-2" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2" /> Calculating...</> : 'Calculate Love %'}
              </button>
              {error && <div className="alert alert-danger mt-3 py-2 text-center">{error}</div>}
            </form>
          </div>
        </div>
      </div>

      {result && (
        <div className="row mt-5 result-section fade-in justify-content-center">
          <div className="col-lg-8">
            <div className="love-result-card p-4 text-center text-white">
              <h2 className="text-danger mb-4">Cosmic Compatibility</h2>
              
              <div className="d-flex justify-content-center align-items-center mb-4 flex-wrap">
                <div className="text-center px-4">
                  <h4 className="mb-1">{formData.name1 || 'Partner 1'}</h4>
                  <span className="badge bg-primary">{result.signs?.p1}</span>
                  <div className="small text-muted mt-1">{result.elements?.p1} Element</div>
                </div>
                
                <div className="px-4">
                  <div className="display-4 text-danger fw-bold">{Math.round(result.score)}%</div>
                  <i className="fas fa-heart text-danger fs-4 mt-2 pulse"></i>
                </div>
                
                <div className="text-center px-4">
                  <h4 className="mb-1">{formData.name2 || 'Partner 2'}</h4>
                  <span className="badge bg-primary">{result.signs?.p2}</span>
                  <div className="small text-muted mt-1">{result.elements?.p2} Element</div>
                </div>
              </div>

              <div className="interpretation-box p-3 mb-4 mx-auto" style={{ maxWidth: '600px', backgroundColor: 'rgba(220, 53, 69, 0.1)', border: '1px solid rgba(220, 53, 69, 0.3)', borderRadius: '8px' }}>
                <p className="lead mb-0 text-light">"{result.interpretation}"</p>
              </div>

              <div className="row g-3 mt-3">
                <div className="col-4">
                  <div className="metric-box p-2" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <div className="small text-muted text-uppercase mb-1" style={{ fontSize: '10px' }}>Emotional</div>
                    <div className="fs-5 text-info fw-bold">{Math.round(result.metrics?.emotional || 0)}%</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="metric-box p-2" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <div className="small text-muted text-uppercase mb-1" style={{ fontSize: '10px' }}>Physical</div>
                    <div className="fs-5 text-danger fw-bold">{Math.round(result.metrics?.physical || 0)}%</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="metric-box p-2" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <div className="small text-muted text-uppercase mb-1" style={{ fontSize: '10px' }}>Spiritual</div>
                    <div className="fs-5 text-warning fw-bold">{Math.round(result.metrics?.spiritual || 0)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .love-content, .love-calc, .love-result-card { background: rgba(255,255,255,0.05); border-radius: 15px; }
        .love-content h3, .love-calc h3 { color: #ff6a00; margin-bottom: 20px; }
        .love-content p, .love-content li { color: #ccc; line-height: 1.8; }
        .service-box { background: rgba(255,255,255,0.08); border-radius: 10px; transition: 0.3s; }
        .service-box:hover { background: rgba(255,255,255,0.15); transform: translateY(-5px); }
        .service-box p { color: #fff; font-size: 14px; }
        .love-calc label { color: #fff; margin-bottom: 8px; display: block; }
        .love-calc input { background: #222; border: 1px solid #444; color: #fff; }
        .love-calc input:focus { background: #2a2a2a; border-color: #dc3545; color: #fff; box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25); }
        .pulse { animation: heartPulse 1.5s infinite; }
        .fade-in { animation: fadeIn 0.6s ease-in; }
        @keyframes heartPulse { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
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

export default Love;
