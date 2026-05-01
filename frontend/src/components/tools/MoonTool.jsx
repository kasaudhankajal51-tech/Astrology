import { useState } from 'react';
import API_BASE from '../../utils/api.js';

const inp = {
  width: '100%',
  display: 'block',
  background: '#f8f9fc',
  border: '1px solid #e0e0e8',
  color: '#1a1a2e',
  padding: '12px 16px',
  borderRadius: 12,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'all 0.3s ease'
};

const lbl = {
  display: 'block',
  fontSize: 11,
  color: '#6b6b8a',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: 6,
  fontWeight: 600
};

const btn = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  background: 'linear-gradient(135deg, #ff6a00, #e31b7a)',
  border: 'none',
  color: '#fff',
  padding: '14px 28px',
  borderRadius: 50,
  fontWeight: 700,
  fontSize: 14,
  cursor: 'pointer',
  width: '100%',
  boxShadow: '0 4px 14px rgba(227,27,122,0.3)',
  transition: 'all 0.3s ease'
};

const card = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.06)',
  borderRadius: 20,
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease'
};

const backBtn = {
  background: 'transparent',
  border: '1px solid rgba(255,106,0,0.3)',
  color: '#ff6a00',
  padding: '8px 20px',
  borderRadius: 25,
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  marginBottom: 28,
  transition: 'all 0.3s ease'
};

const infoRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 18px',
  borderRadius: 14,
  background: '#f8f9fc',
  border: '1px solid #f0f0f0'
};

function MoonTool({ onBack }) {
  const [formData, setFormData] = useState({ name: '', dob: '', tob: '12:00' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/tools/moon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const resp = await res.json();
      if (!resp) throw new Error('Calculation failed');
      setResult(resp);
    } catch (err) {
      setError(err.message || 'Lunar calculation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fc 0%, #ffffff 50%, #f0f2f8 100%)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button
          style={backBtn}
          onClick={onBack}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#ff6a00'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff6a00'; }}
        >
          ← Back to Tools
        </button>

        <div className="text-center mb-5">
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #1a1a2e, #2d2d5e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            🌙 Moon Sign &amp; Phase
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(135deg, #ff6a00, #e31b7a)',
            borderRadius: '2px',
            margin: '15px auto 20px'
          }}></div>
          <p style={{ color: '#6b6b8a', fontSize: 15, maxWidth: '500px', margin: '0 auto' }}>
            Discover your Vedic moon sign, lunar phase &amp; emotional blueprint
          </p>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-lg-5 col-md-7">
            <div style={{ ...card, padding: '32px 28px' }}>
              <form onSubmit={calculate}>
                <div style={{ marginBottom: 20 }}>
                  <label style={lbl}>Full Name</label>
                  <input
                    style={inp}
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#ff6a00'; e.currentTarget.style.background = '#ffffff'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#e0e0e8'; e.currentTarget.style.background = '#f8f9fc'; }}
                  />
                </div>
                <div className="row g-3" style={{ marginBottom: 24 }}>
                  <div className="col-7">
                    <label style={lbl}>Date of Birth</label>
                    <div className="position-relative">
                      <input
                        style={inp}
                        type="date"
                        className="custom-date-input-light"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        required
                      />
                      <i className="fas fa-calendar-alt position-absolute" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5, color: '#6b6b8a' }}></i>
                    </div>
                  </div>
                  <div className="col-5">
                    <label style={lbl}>Birth Time</label>
                    <div className="position-relative">
                      <input
                        style={inp}
                        type="time"
                        className="custom-time-input-light"
                        value={formData.tob}
                        onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                      />
                      <i className="fas fa-clock position-absolute" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5, color: '#6b6b8a' }}></i>
                    </div>
                  </div>
                </div>
                <button
                  style={btn}
                  type="submit"
                  disabled={loading}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.transform = 'none'; }}
                >
                  {loading ? <><span className="spinner-border spinner-border-sm" style={{ marginRight: 8 }} /> Calculating…</> : 'Get Moon Report'}
                </button>
                {error && <p style={{ color: '#dc3545', fontSize: 13, textAlign: 'center', marginTop: 15 }}>{error}</p>}
              </form>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ animation: 'fadeUp 0.5s ease both' }}>
            <div className="row justify-content-center">
              <div className="col-lg-9">
                {/* Phase header */}
                <div style={{ ...card, padding: '32px 28px', textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: '#e31b7a', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 10, fontWeight: 600 }}>
                    {result.name}'s Moon Phase Report
                  </div>
                  <div style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#1a1a2e', letterSpacing: 2, marginBottom: 8 }}>
                    {result.phase?.name}
                  </div>
                  <div style={{ fontSize: 18, color: '#ff6a00', fontStyle: 'italic', fontWeight: 500 }}>
                    {result.phase?.title}
                  </div>
                </div>

                <div className="row g-4">
                  {/* Keywords */}
                  <div className="col-md-6">
                    <div style={{ ...card, padding: 28, height: '100%' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#ff6a00', borderLeft: '3px solid #ff6a00', paddingLeft: 14, marginBottom: 20 }}>
                        Key Characteristics
                      </div>
                      {result.phase?.keywords?.map((kw, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6a00, #e31b7a)', flexShrink: 0 }} />
                          <span style={{ color: '#4a4a6a', fontSize: 14 }}>{kw}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="col-md-6">
                    <div className="row g-4">
                      <div className="col-12">
                        <div style={{ ...card, padding: '20px 24px', textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#6b6b8a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>Phase Number</div>
                          <div style={{ fontSize: 52, fontWeight: 800, background: 'linear-gradient(135deg, #ff6a00, #e31b7a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                            #{result.phase?.number}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={infoRow}>
                          <div>
                            <div style={{ fontSize: 10, color: '#6b6b8a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Phase Start</div>
                            <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 15 }}>{result.phase?.startDeg}°</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={infoRow}>
                          <div>
                            <div style={{ fontSize: 10, color: '#6b6b8a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Phase End</div>
                            <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 15 }}>{result.phase?.endDeg}°</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div style={infoRow}>
                          <span style={{ fontSize: 24 }}>🌙</span>
                          <div>
                            <div style={{ fontSize: 10, color: '#6b6b8a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Vedic Moon Sign</div>
                            <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 18 }}>
                              {result.moonSign}
                              <span style={{ color: '#aaa', fontSize: 13, marginLeft: 6 }}>({result.moonDegree}°)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .custom-date-input-light,
        .custom-time-input-light {
          color-scheme: light;
          padding-right: 40px !important;
        }
        
        .custom-date-input-light::-webkit-calendar-picker-indicator,
        .custom-time-input-light::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }
        
        .container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .spinner-border {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: text-bottom;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spinner-border 0.75s linear infinite;
        }
        
        @keyframes spinner-border {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          [style*="padding: 32px 28px"] {
            padding: 24px 20px !important;
          }
          [style*="padding: 28px"] {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default MoonTool;