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
  fontWeight: 500
};

const btn = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  background: 'linear-gradient(135deg, #ff6a00, #e31b7a)',
  border: 'none',
  color: '#fff',
  padding: '12px 28px',
  borderRadius: 50,
  fontWeight: 600,
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

const signs = [
  { name: 'Aries', sym: '♈', dates: 'Mar 21 – Apr 19' },
  { name: 'Taurus', sym: '♉', dates: 'Apr 20 – May 20' },
  { name: 'Gemini', sym: '♊', dates: 'May 21 – Jun 20' },
  { name: 'Cancer', sym: '♋', dates: 'Jun 21 – Jul 22' },
  { name: 'Leo', sym: '♌', dates: 'Jul 23 – Aug 22' },
  { name: 'Virgo', sym: '♍', dates: 'Aug 23 – Sep 22' },
  { name: 'Libra', sym: '♎', dates: 'Sep 23 – Oct 22' },
  { name: 'Scorpio', sym: '♏', dates: 'Oct 23 – Nov 21' },
  { name: 'Sagittarius', sym: '♐', dates: 'Nov 22 – Dec 21' },
  { name: 'Capricorn', sym: '♑', dates: 'Dec 22 – Jan 19' },
  { name: 'Aquarius', sym: '♒', dates: 'Jan 20 – Feb 18' },
  { name: 'Pisces', sym: '♓', dates: 'Feb 19 – Mar 20' },
];

function HoroscopeTool({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHoroscope = async (sign) => {
    setLoading(true);
    setSelected(sign);
    setPrediction(null);
    try {
      const res = await fetch(`${API_BASE}/api/tools/horoscope/${sign.name}`);
      const data = await res.json();
      if (data?.prediction) setPrediction(data);
    } catch (err) {
      console.error(err);
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
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            marginBottom: '12px'
          }}>
            ☀️ Daily Horoscope
          </h2>
          <div style={{ 
            width: '60px', 
            height: '4px', 
            background: 'linear-gradient(135deg, #ff6a00, #e31b7a)', 
            borderRadius: '2px', 
            margin: '15px auto 20px' 
          }}></div>
          <p style={{ color: '#6b6b8a', fontSize: 16, marginBottom: 0 }}>
            Select your zodiac sign for today's planetary guidance
          </p>
        </div>

        {!selected ? (
          <div className="row g-4">
            {signs.map((sign) => (
              <div key={sign.name} className="col-6 col-md-4 col-lg-3">
                <div
                  onClick={() => fetchHoroscope(sign)}
                  style={{ 
                    ...card, 
                    padding: '20px 12px', 
                    textAlign: 'center', 
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'translateY(-6px)'; 
                    e.currentTarget.style.borderColor = '#ff6a00';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(255,106,0,0.12)';
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'none'; 
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ fontSize: 42, marginBottom: 10 }}>{sign.sym}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>{sign.name}</div>
                  <div style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>{sign.dates}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {(loading || !prediction) ? (
                <div style={{ ...card, padding: '60px 32px', textAlign: 'center' }}>
                  <div className="spinner-border" style={{ color: '#ff6a00', width: 48, height: 48 }} />
                  <p style={{ color: '#6b6b8a', marginTop: 20, fontSize: 15 }}>
                    Consulting the stars for {selected.name}…
                  </p>
                </div>
              ) : (
                <div style={{ ...card, padding: '32px 36px', overflow: 'hidden' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    flexWrap: 'wrap', 
                    gap: 16, 
                    marginBottom: 28 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                      <span style={{ fontSize: 56 }}>{selected.sym}</span>
                      <div>
                        <h3 style={{ color: '#1a1a2e', fontWeight: 800, margin: 0, fontSize: 24 }}>{selected.name}</h3>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #ff6a00, #e31b7a)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: 13,
                          fontWeight: 600,
                          marginTop: 4
                        }}>
                          {prediction.date || 'Today'}
                        </div>
                      </div>
                    </div>
                    <button
                      style={{
                        background: 'transparent',
                        border: '1px solid #e0e0e8',
                        color: '#6b6b8a',
                        padding: '8px 20px',
                        borderRadius: 25,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => { 
                        e.currentTarget.style.borderColor = '#ff6a00'; 
                        e.currentTarget.style.color = '#ff6a00'; 
                      }}
                      onMouseLeave={(e) => { 
                        e.currentTarget.style.borderColor = '#e0e0e8'; 
                        e.currentTarget.style.color = '#6b6b8a'; 
                      }}
                      onClick={() => { setSelected(null); setPrediction(null); }}
                    >
                      ← Change Sign
                    </button>
                  </div>
                  
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f8f9fc, #ffffff)',
                    borderRadius: 16,
                    padding: '24px',
                    border: '1px solid rgba(255,106,0,0.1)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 10, 
                      marginBottom: 16,
                      paddingBottom: 12,
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <i className="fas fa-star" style={{ color: '#ff6a00' }}></i>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#ff6a00', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Cosmic Message
                      </span>
                    </div>
                    <p style={{ 
                      color: '#4a4a6a', 
                      fontSize: 16, 
                      lineHeight: 1.9, 
                      margin: 0,
                      textAlign: 'justify'
                    }}>
                      {prediction.prediction}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -12px;
        }
        
        .col-6 {
          width: 50%;
          padding: 0 12px;
          margin-bottom: 24px;
        }
        
        .col-md-4 {
          width: 33.333%;
        }
        
        .col-lg-3 {
          width: 25%;
        }
        
        .col-lg-8 {
          width: 66.666%;
          padding: 0 12px;
        }
        
        .spinner-border {
          display: inline-block;
          width: 48px;
          height: 48px;
          vertical-align: text-bottom;
          border: 4px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spinner-border 0.75s linear infinite;
        }
        
        @keyframes spinner-border {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .col-md-4 {
            width: 50%;
          }
          .col-lg-8 {
            width: 100%;
          }
          .container {
            padding: 0 16px;
          }
          [style*="padding: 32px 36px"] {
            padding: 24px !important;
          }
        }
        
        @media (max-width: 576px) {
          .col-6 {
            width: 50%;
          }
          .col-md-4 {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default HoroscopeTool;