import { useState } from 'react';
import KundaliChart from './KundaliChart';
import { DateTime } from 'luxon';
import toast from 'react-hot-toast';
import API_BASE from '../../utils/api.js';

function KundaliTool({ onBack }) {
  const [formData, setFormData] = useState({
    name: '', dob: '', tob: '', lat: '', lon: '', place: ''
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
      const data = await res.json();
      console.log(data)
      if (!data) {
        throw new Error(data.error || "Server returned incomplete data");
      }

      setResult(data);
      setActiveTab('chart');
      toast.success("Kundali generated successfully!", { id: tId });
    } catch (err) {
      console.error(err);
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
    if (!result.planetaryPositions) {
       return (
         <div className="alert alert-danger mt-4 container">
            <h4>Incomplete Data</h4>
            <p>The server returned a response, but it's missing planetary positions. Please check your backend.</p>
            <button className="btn btn-outline-danger" onClick={() => setResult(null)}>Try Again</button>
         </div>
       );
    }
    return (
      <div className="kundali-container animated fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-link text-white p-0" onClick={onBack}>
            <i className="fas fa-arrow-left me-2"></i> Back
          </button>
          <h2 className="text-orange mb-0">{result.name}'s Horoscope</h2>
          <button className="btn btn-outline-orange btn-sm" onClick={() => setResult(null)}>New Detail</button>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-wrapper mb-4 border-bottom border-secondary">
          <div className="d-flex gap-4">
            {['Basic', 'Chart', 'Planets', 'Report'].map(tab => (
              <button 
                key={tab}
                className={`tab-btn pb-2 ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'basic' && (
            <div className="row g-4 animated fadeInUp">
              <div className="col-md-6">
                <div className="info-card p-4 rounded bg-dark-glass">
                  <h5 className="text-orange mb-4 border-bottom border-secondary pb-2">Birth Information</h5>
                  <div className="detail-row"><span>Date:</span> <strong>{result.dob ? DateTime.fromISO(result.dob).toLocaleString(DateTime.DATE_MED) : 'N/A'}</strong></div>
                  <div className="detail-row"><span>Time:</span> <strong>{result.tob || 'N/A'}</strong></div>
                  <div className="detail-row"><span>Place:</span> <strong>{result.place || 'Unknown'}</strong></div>
                  <div className="detail-row"><span>Latitude:</span> <strong>{result.lat || '0'}° N</strong></div>
                  <div className="detail-row"><span>Longitude:</span> <strong>{result.lon || '0'}° E</strong></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-card p-4 rounded bg-dark-glass">
                  <h5 className="text-orange mb-4 border-bottom border-secondary pb-2">Panchanga Attributes</h5>
                  <div className="detail-row"><span>Nakshatra:</span> <strong>{result.nakshatra}{result.nakshatraPada ? ` (Pada ${result.nakshatraPada})` : ''}</strong></div>
                  <div className="detail-row"><span>Tithi:</span> <strong>{result.tithi || 'N/A'}</strong></div>
                  <div className="detail-row"><span>Yog:</span> <strong>{result.yoga || 'N/A'}</strong></div>
                  <div className="detail-row"><span>Karan:</span> <strong>{result.karan || 'N/A'}</strong></div>
                  <div className="detail-row"><span>Weekday:</span> <strong>{result.vara || 'N/A'}</strong></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="row justify-content-center animated zoomIn">
              <div className="col-md-6">
                <div className="text-center mb-3">
                   <h4 className="text-orange">Lagna Chart (D1)</h4>
                   <p className="small text-muted">Fixed House - Rotating Signs | Lahiri Ayanamsa</p>
                </div>
                <KundaliChart planets={result.planetaryPositions} ascendantSign={result.ascendant} />
              </div>
            </div>
          )}

          {activeTab === 'planets' && (
            <div className="info-card p-4 rounded bg-dark-glass animated fadeInUp">
              <h5 className="text-orange mb-4">Planetary Details</h5>
              <div className="table-responsive">
                <table className="table table-dark table-hover table-borderless">
                  <thead>
                    <tr className="border-bottom border-secondary">
                      <th>Planet</th>
                      <th>Sign</th>
                      <th>Sign Lord</th>
                      <th>Degree</th>
                      <th>House</th>
                      <th>Retro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.planetaryPositions.map(p => (
                      <tr key={p.name}>
                        <td className="fw-bold">{p.name}</td>
                        <td className="text-orange">{p.sign}</td>
                        <td>{p.signLord || interpretations[p.sign]?.lord || '-'}</td>
                        <td>{p.degree ? p.degree.toFixed(2) : '0.00'}°</td>
                        <td>{p.house}</td>
                        <td>{p.isRetrograde ? <span className="text-danger">R</span> : <span className="text-muted">-</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="info-card p-4 rounded bg-dark-glass animated fadeInUp">
              <div className="text-center mb-5">
                 <h2 className="text-orange">{result.ascendant} Ascendant</h2>
                 <p className="lead">Personality & Life Path Analysis</p>
              </div>
              <div className="row g-4 text-center">
                <div className="col-md-4">
                  <div className="p-3 border border-orange rounded">
                    <h6>Lucky Planet</h6>
                    <div className="h4 text-orange mb-0">{result.ascendantLord || 'Saturn'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border border-orange rounded">
                    <h6>Moon Sign</h6>
                    <div className="h4 text-orange mb-0">{result.moonSign}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border border-orange rounded">
                    <h6>Nakshatra</h6>
                    <div className="h4 text-orange mb-0">{result.nakshatra}</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 lead" style={{ lineHeight: '1.8' }}>
                <h5 className="text-orange">Your Core Personality:</h5>
                <p>{interpretations[result.ascendant]?.text || interpretations['Aries'].text}</p>
                
                {(() => {
                  const houseCounts = {};
                  result.planetaryPositions.forEach(p => houseCounts[p.house] = (houseCounts[p.house] || 0) + 1);
                  const stelliumHouse = Object.keys(houseCounts).find(h => houseCounts[h] >= 3);
                  if (stelliumHouse) {
                    return (
                      <div className="mt-4 p-4 rounded bg-dark-glass border border-orange animated pulse infinite slower">
                         <h5 className="text-orange d-flex align-items-center">
                            <i className="fas fa-star-and-crescent me-3"></i> 
                            Powerful Stellium (Conjunction)
                         </h5>
                         <p className="mb-0 small opacity-75">
                            Our system detected a rare concentration of <strong>{houseCounts[stelliumHouse]} </strong> 
                            planets in your House {stelliumHouse}. This indicates a primary life focus and intense 
                            energy in these specific areas of your life!
                         </p>
                      </div>
                    );
                  }
                  return null;
                })()}

                <p className="mt-4">With your Moon in {result.moonSign}, your inner emotional world is governed by the qualities of {result.moonSign}, making you particularly sensitive to {result.moonSign.toLowerCase()} themes like stability, passion, or intellectual pursuits.</p>
              </div>
            </div>
          )}
        </div>

        <style>{`
          .kundali-container { max-width: 1000px; margin: 0 auto; color: #fff; }
          .text-orange { color: #ff6a00; }
          .btn-outline-orange { border-color: #ff6a00; color: #ff6a00; }
          .btn-outline-orange:hover { background: #ff6a00; color: #fff; }
          .bg-dark-glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
          
          .tab-btn { background: none; border: none; color: #888; font-weight: 600; cursor: pointer; transition: 0.3s; }
          .tab-btn:hover { color: #ff6a00; }
          .tab-btn.active { color: #ff6a00; border-bottom: 2px solid #ff6a00; }
          
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .border-orange { border-color: rgba(255, 106, 0, 0.3) !important; }
          .table-dark { background: transparent; }
          
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          .fadeInUp { animation: fadeInUp 0.6s both; }
          .zoomIn { animation: zoomIn 0.6s both; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="tool-container animated fadeIn py-5 mt-lg-4">
      <div className="container">
        <button className="btn btn-link text-white-50 mb-4 p-0 text-decoration-none" onClick={onBack}>
          <i className="fas fa-chevron-left me-2"></i> Back to Tools
        </button>

        <div className="text-center mb-5 section-title">
          <h1 className="display-4 text-gradient fw-bold mb-3">Professional Janam Kundali</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Unlock your destiny with high-precision Vedic algorithms. Generate your 10/10 detailed birth chart and complete life analysis.
          </p>
          <div className="title-separator mx-auto"></div>
        </div>

      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          <div className="d-flex justify-content-end mb-3">
            <button 
              className="btn btn-sm btn-outline-orange"
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
              <i className="fas fa-magic me-2"></i> Load Sample Profile
            </button>
          </div>
          <div className="form-box p-4 p-md-5 rounded bg-dark-glass shadow-lg border border-secondary border-opacity-25">
            <form onSubmit={calculate}>
              <div className="row g-4">
                <div className="col-12">
                   <h5 className="text-orange border-bottom border-secondary border-opacity-50 pb-2 mb-3">1. Personal Information</h5>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="small text-muted mb-2">Full Name</label>
                    <input type="text" className="form-control form-control-lg bg-dark-glass text-white border-secondary" id="name" placeholder="Enter full name"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                  </div>
                </div>
                
                <div className="col-12 mt-4">
                   <h5 className="text-orange border-bottom border-secondary border-opacity-50 pb-2 mb-3">2. Birth Coordinates</h5>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="small text-muted mb-2">Date of Birth</label>
                    <input type="date" className="form-control form-control-lg bg-dark-glass text-white border-secondary" 
                      value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="small text-muted mb-2">Time of Birth</label>
                    <input type="time" className="form-control form-control-lg bg-dark-glass text-white border-secondary" 
                      value={formData.tob} onChange={e => setFormData({...formData, tob: e.target.value})} required />
                  </div>
                </div>
                <div className="col-md-12 position-relative">
                   <div className="form-group mb-3">
                    <label htmlFor="place" className="small text-muted mb-2">Birth Place (Search City/Town)</label>
                    <input type="text" className="form-control form-control-lg bg-dark-glass text-white border-secondary" id="place" 
                      placeholder="Search city, town or village..."
                      value={query}
                      onChange={e => handleLocationSearch(e.target.value)}
                      required />
                  </div>
                  
                  {suggestions.length > 0 && (
                    <div className="suggestions-dropdown position-absolute w-100 bg-dark shadow-lg rounded p-2" style={{ zIndex: 1000, top: '100%', marginTop: '-10px' }}>
                      {suggestions.map((loc, i) => (
                        <div key={i} className="suggestion-item p-3 text-white border-bottom border-secondary border-opacity-25" 
                           onClick={() => selectLocation(loc)} style={{ cursor: 'pointer' }}>
                          <i className="fas fa-map-marker-alt me-3 text-orange"></i>
                          {loc.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                  {searching && <div className="p-2 text-muted small"><i className="fas fa-spinner fa-spin me-2"></i>Searching locations...</div>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 mt-5 enroll-btn" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Calculating Charts...</> : 'Generate 10/10 Kundali Report'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, #ff6a00, #ffb300);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .title-separator {
          width: 60px;
          height: 4px;
          background: #ff6a00;
          border-radius: 2px;
          margin-top: 15px;
        }
        .bg-dark-glass { background: rgba(0,0,0,0.6); backdrop-filter: blur(15px); border: 1px solid rgba(255,106,0,0.15); }
        .form-control.bg-dark-glass { background: rgba(255,255,255,0.05); }
        .text-orange { color: #ff6a00; }
        .enroll-btn { 
          background: linear-gradient(135deg, #ff6a00, #ff8c00); 
          border: none; 
          height: 60px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 0 10px 20px rgba(255, 106, 0, 0.3);
          transition: 0.3s;
        }
        .enroll-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(255, 106, 0, 0.4);
        }
        .form-control:focus { background: rgba(255,255,255,0.1) !important; color: white !important; border-color: #ff6a00 !important; box-shadow: 0 0 0 0.25rem rgba(255, 106, 0, 0.25); }
        .suggestion-item:hover { background: rgba(255,106,0,0.2); }
        
        @media (max-width: 768px) {
          .form-box { padding: 1.5rem !important; }
          .display-4 { font-size: 2.2rem; }
        }
      `}</style>

      </div>
    </div>
  );
}

export default KundaliTool;
