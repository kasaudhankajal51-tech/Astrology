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
      <div className="kundali-container-light animated fadeIn">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-link text-orange p-0" onClick={onBack}>
            <i className="fas fa-arrow-left me-2"></i> Back
          </button>
          <h2 className="text-orange mb-0">{result.name}'s Horoscope</h2>
          <button className="btn btn-outline-orange btn-sm" onClick={() => setResult(null)}>New Detail</button>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-wrapper-light mb-4">
          <div className="d-flex gap-4">
            {['Basic', 'Chart', 'Planets', 'Report'].map(tab => (
              <button 
                key={tab}
                className={`tab-btn-light ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content-light">
          {activeTab === 'basic' && (
            <div className="row g-4 animated fadeInUp">
              <div className="col-md-6">
                <div className="info-card-light p-4 rounded">
                  <h5 className="text-orange mb-4 border-bottom pb-2">Birth Information</h5>
                  <div className="detail-row-light"><span>Date:</span> <strong>{result.dob ? DateTime.fromISO(result.dob).toLocaleString(DateTime.DATE_MED) : 'N/A'}</strong></div>
                  <div className="detail-row-light"><span>Time:</span> <strong>{result.tob || 'N/A'}</strong></div>
                  <div className="detail-row-light"><span>Place:</span> <strong>{result.place || 'Unknown'}</strong></div>
                  <div className="detail-row-light"><span>Latitude:</span> <strong>{result.lat || '0'}° N</strong></div>
                  <div className="detail-row-light"><span>Longitude:</span> <strong>{result.lon || '0'}° E</strong></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-card-light p-4 rounded">
                  <h5 className="text-orange mb-4 border-bottom pb-2">Panchanga Attributes</h5>
                  <div className="detail-row-light"><span>Nakshatra:</span> <strong>{result.nakshatra}{result.nakshatraPada ? ` (Pada ${result.nakshatraPada})` : ''}</strong></div>
                  <div className="detail-row-light"><span>Tithi:</span> <strong>{result.tithi || 'N/A'}</strong></div>
                  <div className="detail-row-light"><span>Yog:</span> <strong>{result.yoga || 'N/A'}</strong></div>
                  <div className="detail-row-light"><span>Karan:</span> <strong>{result.karan || 'N/A'}</strong></div>
                  <div className="detail-row-light"><span>Weekday:</span> <strong>{result.vara || 'N/A'}</strong></div>
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
            <div className="info-card-light p-4 rounded">
              <h5 className="text-orange mb-4">Planetary Details</h5>
              <div className="table-responsive">
                <table className="table-light-custom">
                  <thead>
                    <tr className="border-bottom">
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
            <div className="info-card-light p-4 rounded">
              <div className="text-center mb-5">
                 <h2 className="text-orange">{result.ascendant} Ascendant</h2>
                 <p className="lead">Personality & Life Path Analysis</p>
              </div>
              <div className="row g-4 text-center">
                <div className="col-md-4">
                  <div className="p-3 border-orange-light rounded">
                    <h6>Lucky Planet</h6>
                    <div className="h4 text-orange mb-0">{result.ascendantLord || 'Saturn'}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border-orange-light rounded">
                    <h6>Moon Sign</h6>
                    <div className="h4 text-orange mb-0">{result.moonSign}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border-orange-light rounded">
                    <h6>Nakshatra</h6>
                    <div className="h4 text-orange mb-0">{result.nakshatra}</div>
                  </div>
                </div>
              </div>
              <div className="mt-5" style={{ lineHeight: '1.8' }}>
                <h5 className="text-orange">Your Core Personality:</h5>
                <p>{interpretations[result.ascendant]?.text || interpretations['Aries'].text}</p>
                
                {(() => {
                  const houseCounts = {};
                  result.planetaryPositions.forEach(p => houseCounts[p.house] = (houseCounts[p.house] || 0) + 1);
                  const stelliumHouse = Object.keys(houseCounts).find(h => houseCounts[h] >= 3);
                  if (stelliumHouse) {
                    return (
                      <div className="mt-4 p-4 rounded bg-orange-light animated pulse infinite slower">
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
          .kundali-container-light {
            max-width: 1000px;
            margin: 0 auto;
            color: #1a1a2e;
          }
          
          .text-orange { color: #ff6a00; }
          .btn-outline-orange { border-color: #ff6a00; color: #ff6a00; background: transparent; }
          .btn-outline-orange:hover { background: #ff6a00; color: #fff; }
          
          .info-card-light {
            background: #ffffff;
            border: 1px solid rgba(0,0,0,0.06);
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }
          
          .tabs-wrapper-light {
            border-bottom: 1px solid #e0e0e8;
            margin-bottom: 25px;
          }
          
          .tab-btn-light {
            background: none;
            border: none;
            color: #6b6b8a;
            font-weight: 600;
            cursor: pointer;
            padding: 10px 0;
            transition: 0.3s;
          }
          
          .tab-btn-light:hover { color: #ff6a00; }
          .tab-btn-light.active { color: #ff6a00; border-bottom: 2px solid #ff6a00; }
          
          .detail-row-light {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
          }
          .detail-row-light:last-child { border-bottom: none; }
          .detail-row-light span { color: #6b6b8a; }
          .detail-row-light strong { color: #1a1a2e; }
          
          .table-light-custom {
            width: 100%;
            background: transparent;
            border-collapse: collapse;
          }
          .table-light-custom th {
            text-align: left;
            padding: 12px 8px;
            color: #6b6b8a;
            font-weight: 600;
            border-bottom: 2px solid #e0e0e8;
          }
          .table-light-custom td {
            padding: 10px 8px;
            color: #1a1a2e;
            border-bottom: 1px solid #f0f0f0;
          }
          .table-light-custom tr:hover td { background: #f8f9fc; }
          
          .border-orange-light { border: 1px solid rgba(255,106,0,0.2); background: #fff8f0; }
          .bg-orange-light { background: rgba(255,106,0,0.05); border: 1px solid rgba(255,106,0,0.15); }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .fadeInUp { animation: fadeInUp 0.6s both; }
          .zoomIn { animation: zoomIn 0.6s both; }
          .fadeIn { animation: fadeInUp 0.5s ease-out; }
          
          @media (max-width: 768px) {
            .kundali-container-light { padding: 15px; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="tool-container-light animated fadeIn py-5 mt-lg-4">
      <div className="container">
        <button className="btn btn-link text-orange mb-4 p-0 text-decoration-none" onClick={onBack}>
          <i className="fas fa-chevron-left me-2"></i> Back to Tools
        </button>

        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">
            <span style={{ background: 'linear-gradient(135deg, #1a1a2e, #2d2d5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Professional Janam Kundali</span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px', color: '#6b6b8a' }}>
            Unlock your destiny with high-precision Vedic algorithms. Generate your detailed birth chart and complete life analysis.
          </p>
          <div style={{ width: '60px', height: '4px', background: 'linear-gradient(135deg, #ff6a00, #e31b7a)', borderRadius: '2px', margin: '15px auto 0' }}></div>
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
            
            {/* Original Form Structure - Same as before, only light theme */}
            <div className="form-box p-4 p-md-5 rounded shadow-lg" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <form onSubmit={calculate}>
                <div className="row g-4">
                  <div className="col-12">
                    <h5 className="text-orange border-bottom pb-2 mb-3" style={{ borderColor: '#e0e0e8 !important' }}>1. Personal Information</h5>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="small text-muted mb-2" style={{ color: '#6b6b8a' }}>Full Name</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        id="name" 
                        placeholder="Enter full name"
                        style={{ background: '#f8f9fc', border: '1px solid #e0e0e8', color: '#1a1a2e', borderRadius: '12px', padding: '12px 16px' }}
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="col-12 mt-4">
                    <h5 className="text-orange border-bottom pb-2 mb-3" style={{ borderColor: '#e0e0e8 !important' }}>2. Birth Coordinates</h5>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="small text-muted mb-2" style={{ color: '#6b6b8a' }}>Date of Birth</label>
                      <div className="position-relative">
                        <input 
                          type="date" 
                          className="form-control form-control-lg custom-date-input" 
                          style={{ background: '#f8f9fc', border: '1px solid #e0e0e8', color: '#1a1a2e', borderRadius: '12px', padding: '12px 16px' }}
                          value={formData.dob} 
                          onChange={e => setFormData({...formData, dob: e.target.value})} 
                          required 
                        />
                        <i className="fas fa-calendar-alt position-absolute" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5, color: '#6b6b8a' }}></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="small text-muted mb-2" style={{ color: '#6b6b8a' }}>Time of Birth</label>
                      <div className="position-relative">
                        <input 
                          type="time" 
                          className="form-control form-control-lg custom-time-input" 
                          style={{ background: '#f8f9fc', border: '1px solid #e0e0e8', color: '#1a1a2e', borderRadius: '12px', padding: '12px 16px' }}
                          value={formData.tob} 
                          onChange={e => setFormData({...formData, tob: e.target.value})} 
                          required 
                        />
                        <i className="fas fa-clock position-absolute" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5, color: '#6b6b8a' }}></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 position-relative">
                    <div className="form-group mb-3">
                      <label htmlFor="place" className="small text-muted mb-2" style={{ color: '#6b6b8a' }}>Birth Place (Search City/Town)</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        id="place" 
                        placeholder="Search city, town or village..."
                        style={{ background: '#f8f9fc', border: '1px solid #e0e0e8', color: '#1a1a2e', borderRadius: '12px', padding: '12px 16px' }}
                        value={query}
                        onChange={e => handleLocationSearch(e.target.value)}
                        required 
                      />
                    </div>
                    
                    {suggestions.length > 0 && (
                      <div className="suggestions-dropdown position-absolute w-100 shadow-lg rounded p-2" style={{ zIndex: 1000, top: '100%', marginTop: '-10px', background: '#ffffff', border: '1px solid #e0e0e8' }}>
                        {suggestions.map((loc, i) => (
                          <div key={i} className="suggestion-item p-3 border-bottom" 
                             onClick={() => selectLocation(loc)} style={{ cursor: 'pointer', borderColor: '#f0f0f0', color: '#1a1a2e' }}>
                            <i className="fas fa-map-marker-alt me-3 text-orange"></i>
                            {loc.display_name}
                          </div>
                        ))}
                      </div>
                    )}
                    {searching && <div className="p-2 text-muted small"><i className="fas fa-spinner fa-spin me-2"></i>Searching locations...</div>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 mt-5 enroll-btn" disabled={loading} style={{ background: 'linear-gradient(135deg, #ff6a00, #e31b7a)', border: 'none', borderRadius: '50px', padding: '16px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 8px 20px rgba(227,27,122,0.3)' }}>
                  {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Calculating Charts...</> : 'Generate Kundali Report'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <style>{`
          .tool-container-light {
            background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 50%, #f0f2f8 100%);
            min-height: 100vh;
          }
          
          .text-orange { color: #ff6a00; }
          
          .btn-outline-orange {
            border: 1px solid #ff6a00;
            background: transparent;
            color: #ff6a00;
            padding: 6px 16px;
            border-radius: 25px;
            font-size: 13px;
            transition: all 0.3s ease;
          }
          
          .btn-outline-orange:hover {
            background: #ff6a00;
            color: #fff;
            transform: translateY(-2px);
          }
          
          .form-control:focus {
            background: #ffffff !important;
            border-color: #ff6a00 !important;
            box-shadow: 0 0 0 3px rgba(255,106,0,0.1) !important;
            outline: none;
          }
          
          .suggestion-item:hover {
            background: rgba(255,106,0,0.08);
          }
          
          .custom-date-input,
          .custom-time-input {
            color-scheme: light;
            padding-right: 40px !important;
          }
          
          .custom-date-input::-webkit-calendar-picker-indicator,
          .custom-time-input::-webkit-calendar-picker-indicator {
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
          
          .enroll-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(227,27,122,0.4);
          }
          
          .enroll-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          @media (max-width: 768px) {
            .form-box { padding: 1.5rem !important; }
            .display-4 { font-size: 2rem; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default KundaliTool;