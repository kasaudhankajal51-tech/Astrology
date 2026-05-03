import { useState } from 'react';
import KundaliChart from './KundaliChart';
import { DateTime } from 'luxon';
import toast from 'react-hot-toast';
import API_BASE from '../../utils/api.js';

function KundaliTool({ onBack }) {
  const [formData, setFormData] = useState({
    name: '', dob: '', tob: '', lat: '', lon: '', place: '', gender: 'Male'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleLocationSearch = async (val) => {
    setQuery(val);
    if (val.length < 3) {
      setSuggestions([]);
      return;
    }

    setSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&limit=5`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Geocoding Error:", err);
    } finally {
      setSearching(false);
    }
  };

  const selectLocation = (loc) => {
    const label = loc.display_name.split(',').slice(0, 3).join(', ');
    setFormData({ ...formData, lat: loc.lat, lon: loc.lon, place: label });
    setQuery(label);
    setSuggestions([]);
  };

  const calculate = async (e) => {
    e.preventDefault();
    if (!formData.lat || !formData.lon) {
      toast.error("Please select a valid birth place from the suggestions.");
      return;
    }
    const tId = toast.loading("Calculating birth charts...");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/tools/kundali`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Server error: ${res.status}`);
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error("Invalid response from server. Please try again.");
      }

      if (!data) {
        throw new Error("Server returned empty data");
      }

      setResult(data);
      setActiveTab('chart');
      toast.success("Kundali generated successfully!", { id: tId });
    } catch (err) {
      console.error("Calculation Error:", err);
      toast.error(err.message || "Failed to generate report", { id: tId });
    } finally {
      setLoading(false);
    }
  };

  const interpretations = {
    'Aries': { lord: 'Mars', text: 'Natural leaders, full of energy and courage. You approach life with enthusiasm and a pioneering spirit.' },
    'Taurus': { lord: 'Venus', text: 'Steady, reliable, and deeply connected to comfort and beauty. You value stability and loyalty above all.' },
    'Gemini': { lord: 'Mercury', text: 'Intellectual, communicative, and versatile. Your mind is always racing with new ideas and connections.' },
    'Cancer': { lord: 'Moon', text: 'Deeply intuitive and emotional. You are the nurturer of the zodiac, valuing home, family, and emotional security.' },
    'Leo': { lord: 'Sun', text: 'Confident, charismatic, and naturally creative. You enjoy being in the spotlight and inspiring others.' },
    'Virgo': { lord: 'Mercury', text: 'Practical, analytical, and detail-oriented. You find beauty in order and strive for perfection in all you do.' },
    'Libra': { lord: 'Venus', text: 'Diplomatic, artistic, and social. You are constantly seeking balance, harmony, and deeper connections.' },
    'Scorpio': { lord: 'Mars', text: 'Intense, mysterious, and profoundly emotional. You possess great willpower and a transformative spirit.' },
    'Sagittarius': { lord: 'Jupiter', text: 'Optimistic, adventurous, and philosophical. You are a seeker of truth and higher knowledge.' },
    'Capricorn': { lord: 'Saturn', text: 'Ambitious, disciplined, and traditional. You are the master builder, aiming for the summit of success.' },
    'Aquarius': { lord: 'Saturn', text: 'Progressive, independent, and humanitarian. You think outside the box and value intellectual freedom.' },
    'Pisces': { lord: 'Jupiter', text: 'Empathetic, artistic, and spiritual. You possess a vivid imagination and a deep connection to the unseen.' }
  };

  if (result) {
    return (
      <div className="kundali-results-container animated fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4 container py-4">
          <button className="btn-back-tool" onClick={onBack}>
            <i className="fas fa-arrow-left me-2"></i> Back
          </button>
          <h2 className="results-title mb-0">{result.name}'s Kundali</h2>
          <button className="btn-new-tool" onClick={() => setResult(null)}>Generate New</button>
        </div>

        <div className="container">
          {/* Tab Navigation */}
          <div className="results-tabs mb-4">
            {['Basic', 'Chart', 'Planets', 'Report'].map(tab => (
              <button 
                key={tab}
                className={`tab-item ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-pane">
            {activeTab === 'basic' && (
              <div className="row g-4 animated fadeInUp">
                <div className="col-md-6">
                  <div className="result-card p-4 h-100">
                    <h5 className="card-heading mb-4">Birth Information</h5>
                    <div className="info-row"><span>Date:</span> <strong>{result.dob ? DateTime.fromISO(result.dob).toLocaleString(DateTime.DATE_MED) : 'N/A'}</strong></div>
                    <div className="info-row"><span>Time:</span> <strong>{result.tob || 'N/A'}</strong></div>
                    <div className="info-row"><span>Place:</span> <strong>{result.place || 'Unknown'}</strong></div>
                    <div className="info-row"><span>Latitude:</span> <strong>{result.lat || '0'}° N</strong></div>
                    <div className="info-row"><span>Longitude:</span> <strong>{result.lon || '0'}° E</strong></div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="result-card p-4 h-100">
                    <h5 className="card-heading mb-4">Panchanga Details</h5>
                    <div className="info-row"><span>Nakshatra:</span> <strong>{result.nakshatra}{result.nakshatraPada ? ` (Pada ${result.nakshatraPada})` : ''}</strong></div>
                    <div className="info-row"><span>Tithi:</span> <strong>{result.tithi || 'N/A'}</strong></div>
                    <div className="info-row"><span>Yog:</span> <strong>{result.yoga || 'N/A'}</strong></div>
                    <div className="info-row"><span>Karan:</span> <strong>{result.karan || 'N/A'}</strong></div>
                    <div className="info-row"><span>Weekday:</span> <strong>{result.vara || 'N/A'}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chart' && (
              <div className="row justify-content-center animated zoomIn">
                <div className="col-md-8 col-lg-6">
                  <div className="result-card p-4 text-center">
                     <h4 className="card-heading mb-2">Lagna Chart (D1)</h4>
                     <p className="small text-muted mb-4">Vedic Birth Chart | Lahiri Ayanamsa</p>
                     <div className="chart-wrapper mx-auto" style={{ maxWidth: '450px' }}>
                        <KundaliChart planets={result.planetaryPositions} ascendantSign={result.ascendant} />
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'planets' && (
              <div className="result-card p-4 animated fadeInUp">
                <h5 className="card-heading mb-4">Planetary Positions</h5>
                <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Planet</th>
                        <th>Sign</th>
                        <th>Lord</th>
                        <th>Degree</th>
                        <th>House</th>
                        <th>Retro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.planetaryPositions.map(p => (
                        <tr key={p.name}>
                          <td className="fw-bold">{p.name}</td>
                          <td className="text-accent">{p.sign}</td>
                          <td>{p.signLord || interpretations[p.sign]?.lord || '-'}</td>
                          <td>{p.degree ? p.degree.toFixed(2) : '0.00'}°</td>
                          <td>{p.house}</td>
                          <td>{p.isRetrograde ? <span className="text-danger">Yes</span> : <span className="text-muted">No</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'report' && (
              <div className="result-card p-4 p-md-5 animated fadeInUp">
                <div className="text-center mb-5">
                   <h2 className="accent-text display-6 fw-bold">{result.ascendant} Ascendant</h2>
                   <p className="lead text-muted">Life Path & Personality Analysis</p>
                </div>
                <div className="row g-4 text-center mb-5">
                  <div className="col-md-4">
                    <div className="metric-box">
                      <span className="metric-label">Lucky Planet</span>
                      <div className="metric-value">{result.ascendantLord || 'Saturn'}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="metric-box">
                      <span className="metric-label">Moon Sign</span>
                      <div className="metric-value">{result.moonSign}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="metric-box">
                      <span className="metric-label">Nakshatra</span>
                      <div className="metric-value">{result.nakshatra}</div>
                    </div>
                  </div>
                </div>
                <div className="analysis-text">
                  <h5 className="mb-3 fw-bold">Your Core Personality:</h5>
                  <p>{interpretations[result.ascendant]?.text || interpretations['Aries'].text}</p>
                  <p className="mt-4">With your Moon in {result.moonSign}, your inner emotional world is governed by the qualities of {result.moonSign}, making you particularly sensitive to {result.moonSign.toLowerCase()} themes like stability, passion, or intellectual pursuits.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap');

          .kundali-results-container {
            background: #fdfaf5;
            min-height: 100vh;
            font-family: 'Outfit', sans-serif;
            color: #2d1a12;
            padding-bottom: 50px;
          }
          
          .btn-back-tool {
            background: transparent;
            border: 1px solid #d45d00;
            color: #d45d00;
            padding: 8px 20px;
            border-radius: 50px;
            font-weight: 600;
            transition: 0.3s;
          }
          .btn-back-tool:hover { background: #d45d00; color: #fff; }

          .btn-new-tool {
            background: linear-gradient(135deg, #ff9800, #ff5722);
            border: none;
            color: #fff;
            padding: 8px 20px;
            border-radius: 50px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3);
          }

          .results-title {
            font-family: 'Playfair Display', serif;
            color: #2d1a12;
          }

          .results-tabs {
            display: flex;
            gap: 10px;
            border-bottom: 2px solid #eee;
            overflow-x: auto;
            padding-bottom: 2px;
          }
          
          .tab-item {
            background: none;
            border: none;
            padding: 10px 25px;
            font-weight: 600;
            color: #8d6e63;
            cursor: pointer;
            transition: 0.3s;
            white-space: nowrap;
          }
          .tab-item.active {
            color: #d45d00;
            border-bottom: 3px solid #d45d00;
          }

          .result-card {
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            border: 1px solid #f1e4d8;
          }

          .card-heading {
            font-family: 'Playfair Display', serif;
            color: #d45d00;
            font-weight: 700;
            border-bottom: 1px solid #f1e4d8;
            padding-bottom: 10px;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f9f3f0;
          }
          .info-row:last-child { border-bottom: none; }
          .info-row span { color: #8d6e63; }

          .custom-table {
            width: 100%;
            border-collapse: collapse;
          }
          .custom-table th {
            text-align: left;
            padding: 15px;
            color: #8d6e63;
            font-weight: 600;
            background: #fdfaf5;
          }
          .custom-table td {
            padding: 15px;
            border-bottom: 1px solid #f1e4d8;
          }

          .metric-box {
            background: #fdfaf5;
            padding: 20px;
            border-radius: 15px;
            border: 1px solid #f1e4d8;
          }
          .metric-label { font-size: 13px; color: #8d6e63; text-transform: uppercase; letter-spacing: 1px; }
          .metric-value { font-size: 22px; font-weight: 700; color: #d45d00; margin-top: 5px; }

          .analysis-text { line-height: 1.8; color: #4a372d; }
          .accent-text { color: #d45d00; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="kundali-hero-section">
      <div className="container-fluid p-0">
        <div className="row g-0 min-vh-100">
          {/* Left Column: Content */}
          <div className="col-lg-6 d-flex flex-column justify-content-center p-4 p-md-5 bg-terracotta text-white">
            <div className="hero-content mx-auto" style={{ maxWidth: '550px' }}>
              <button className="btn-back-light mb-4" onClick={onBack}>
                <i className="fas fa-chevron-left me-2"></i> Back to Tools
              </button>
              <h1 className="hero-title display-4 fw-bold mb-4">Free Kundli <br/> <span className="highlight">Calculator Online</span></h1>
              <p className="hero-desc mb-5">
                Generate your detailed birth chart based on ancient Vedic Astrology. 
                Get insights into your personality, career, relationships, and destiny with our high-precision algorithm.
              </p>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-check-circle"></i></div>
                  <div className="feature-text">High-precision Vedic calculations</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-check-circle"></i></div>
                  <div className="feature-text">Detailed Planetary Positions & Dashas</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-check-circle"></i></div>
                  <div className="feature-text">In-depth Personality Analysis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-beige">
            <div className="form-card-wrapper">
              <div className="form-card">
                <div className="form-notch"></div>
                <h3 className="form-title text-center mb-4">Enter Birth Details</h3>
                
                <form onSubmit={calculate}>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="form-floating-custom">
                        <label>Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Your Name"
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})} 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-floating-custom">
                        <label>Gender</label>
                        <select 
                          value={formData.gender} 
                          onChange={e => setFormData({...formData, gender: e.target.value})}
                          required
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating-custom">
                        <label>Date of Birth</label>
                        <input 
                          type="date" 
                          value={formData.dob} 
                          onChange={e => setFormData({...formData, dob: e.target.value})} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating-custom">
                        <label>Time of Birth</label>
                        <input 
                          type="time" 
                          value={formData.tob} 
                          onChange={e => setFormData({...formData, tob: e.target.value})} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="col-12 position-relative">
                      <div className="form-floating-custom">
                        <label>Birth Place</label>
                        <input 
                          type="text" 
                          placeholder="Search city/town..."
                          value={query}
                          onChange={e => handleLocationSearch(e.target.value)}
                          required 
                        />
                      </div>
                      
                      {suggestions.length > 0 && (
                        <div className="suggestions-overlay shadow-lg">
                          {suggestions.map((loc, i) => (
                            <div key={i} className="suggestion-row" onClick={() => selectLocation(loc)}>
                              <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                              {loc.display_name}
                            </div>
                          ))}
                        </div>
                      )}
                      {searching && <div className="searching-text"><i className="fas fa-spinner fa-spin me-2"></i>Searching...</div>}
                    </div>
                  </div>

                  <button type="submit" className="btn-generate-kundli w-100 mt-5" disabled={loading}>
                    {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Generating...</> : 'GET MY KUNDLI'}
                  </button>
                </form>
              </div>
              
              <div className="text-center mt-4">
                <button 
                  className="btn-sample-data"
                  onClick={() => {
                    const sampleData = {
                      "name": "Kajal Kasaudhan",
                      "dob": "1997-04-18",
                      "tob": "19:22",
                      "lat": "26.7606",
                      "lon": "83.3731",
                      "place": "Gorakhpur, India",
                      "ascendant": "Capricorn",
                      "ascendantLord": "Saturn",
                      "moonSign": "Aries",
                      "nakshatra": "Bharani",
                      "tithi": "Ekadashi",
                      "yoga": "Vriddhi",
                      "karan": "Vishti",
                      "vara": "Friday",
                      "planetaryPositions": [
                        { "name": "Sun", "sign": "Aries", "degree": 4.14, "house": 4 },
                        { "name": "Moon", "sign": "Aries", "degree": 23.13, "house": 4 },
                        { "name": "Mercury", "sign": "Pisces", "degree": 10.77, "house": 3 },
                        { "name": "Venus", "sign": "Aries", "degree": 28.86, "house": 4 },
                        { "name": "Mars", "sign": "Pisces", "degree": 12.35, "house": 3 },
                        { "name": "Jupiter", "sign": "Gemini", "degree": 22.70, "house": 6 },
                        { "name": "Saturn", "sign": "Pisces", "degree": 13.06, "house": 3 },
                        { "name": "Rahu", "sign": "Aquarius", "degree": 12.14, "house": 2 },
                        { "name": "Ketu", "sign": "Leo", "degree": 12.14, "house": 8 }
                      ]
                    };
                    setResult(sampleData);
                    setActiveTab('chart');
                    toast.success("Loaded sample profile!");
                  }}
                >
                  <i className="fas fa-magic me-2"></i> Try with Sample Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');

        .kundali-hero-section {
          font-family: 'Be Vietnam Pro', sans-serif;
          overflow-x: hidden;
        }

        .bg-terracotta {
          background-color: #d45d00; /* Terracotta brownish-orange */
          background-image: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1) 0%, transparent 50%);
        }

        .bg-beige {
          background-color: #fcf8f3;
        }

        .btn-back-light {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          padding: 6px 16px;
          border-radius: 4px;
          font-size: 14px;
          transition: 0.3s;
        }
        .btn-back-light:hover { background: rgba(255,255,255,0.2); }

        .hero-title {
          font-family: 'Playfair Display', serif;
          line-height: 1.1;
        }
        .hero-title .highlight {
          color: #ffd700;
        }

        .hero-desc {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }
        .feature-icon { color: #ffd700; font-size: 1.2rem; }

        /* Form Card Styling */
        .form-card-wrapper {
          width: 100%;
          max-width: 500px;
        }

        .form-card {
          background: #f9f3e9;
          padding: 40px;
          border-radius: 8px;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border: 1px solid #e0d5c5;
        }
        .form-card::after {
          content: '';
          position: absolute;
          top: 5px; left: 5px; right: 5px; bottom: 5px;
          border: 1px solid #e0d5c5;
          pointer-events: none;
          border-radius: 4px;
        }

        .form-notch {
          position: absolute;
          left: -15px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 30px;
          height: 30px;
          background: #f9f3e9;
          border-left: 1px solid #e0d5c5;
          border-bottom: 1px solid #e0d5c5;
          display: none; /* Hide on mobile */
        }
        @media (min-width: 992px) { .form-notch { display: block; } }

        .form-title {
          font-family: 'Playfair Display', serif;
          color: #2d1a12;
          font-weight: 800;
        }

        .form-floating-custom {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .form-floating-custom label {
          font-size: 13px;
          font-weight: 600;
          color: #8d6e63;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .form-floating-custom input, 
        .form-floating-custom select {
          border: none;
          border-bottom: 1px solid #d1c4b9;
          background: transparent;
          padding: 8px 0;
          font-size: 16px;
          color: #2d1a12;
          outline: none;
          transition: 0.3s;
        }
        .form-floating-custom input:focus,
        .form-floating-custom select:focus {
          border-color: #d45d00;
        }

        .btn-generate-kundli {
          background: linear-gradient(to right, #ffb300, #ff6f00);
          border: none;
          color: #fff;
          padding: 15px;
          border-radius: 4px;
          font-weight: 700;
          letter-spacing: 1px;
          box-shadow: 0 10px 20px rgba(255, 111, 0, 0.2);
          transition: 0.3s;
        }
        .btn-generate-kundli:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 25px rgba(255, 111, 0, 0.3);
        }

        .suggestions-overlay {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fff;
          z-index: 100;
          max-height: 250px;
          overflow-y: auto;
          border-radius: 4px;
          margin-top: 5px;
        }
        .suggestion-row {
          padding: 12px 15px;
          cursor: pointer;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          color: #4a372d;
        }
        .suggestion-row:hover { background: #f9f3e9; color: #d45d00; }

        .searching-text { font-size: 12px; color: #8d6e63; margin-top: 5px; }

        .btn-sample-data {
          background: none;
          border: none;
          color: #8d6e63;
          font-size: 14px;
          text-decoration: underline;
          transition: 0.3s;
        }
        .btn-sample-data:hover { color: #d45d00; }

        @media (max-width: 991px) {
          .hero-title { font-size: 2.5rem; }
          .form-card { padding: 30px 20px; }
        }
      `}</style>
    </div>
  );
}

export default KundaliTool;