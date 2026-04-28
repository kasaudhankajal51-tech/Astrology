import { useState } from 'react';
import API_BASE from '../../utils/api.js';

const inp = { width:'100%', display:'block', background:'rgba(0,0,0,0.45)', border:'1px solid rgba(255,255,255,0.13)', color:'#fff', padding:'10px 14px', borderRadius:8, fontSize:14, outline:'none', boxSizing:'border-box' };
const lbl = { display:'block', fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'1px', marginBottom:6, fontWeight:500 };
const btn = { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,#ff6a00,#ee0979)', border:'none', color:'#fff', padding:'11px 24px', borderRadius:8, fontWeight:600, fontSize:14, cursor:'pointer', width:'100%', boxShadow:'0 4px 14px rgba(255,106,0,0.3)' };
const card = { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, backdropFilter:'blur(10px)' };
const backBtn = { background:'transparent', border:'1px solid rgba(255,106,0,0.4)', color:'#ff6a00', padding:'7px 16px', borderRadius:6, fontSize:13, cursor:'pointer', marginBottom:28 };
const infoRow = { display:'flex', alignItems:'center', gap:10, padding:'11px 14px', borderRadius:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' };

function MoonTool({ onBack }) {
  const [formData, setFormData] = useState({ name:'', dob:'', tob:'12:00' });
  const [result,   setResult]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const calculate = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res  = await fetch(`${API_BASE}/api/tools/moon`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(formData) });
      const resp = await res.json();
      if (!resp) throw new Error('Calculation failed');
      setResult(resp);
    } catch (err) { setError(err.message || 'Lunar calculation failed'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ color:'#fff' }}>
      <button style={backBtn} onClick={onBack}>← Back to Tools</button>
      <div className="text-center mb-4">
        <h2 className="t-heading">🌙 Moon Sign &amp; Phase</h2>
        <p style={{ color:'#aaa', fontSize:15 }}>Discover your Vedic moon sign, lunar phase &amp; emotional blueprint</p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-5 col-md-7">
          <div style={{ ...card, padding:28 }}>
            <form onSubmit={calculate}>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Full Name</label>
                <input style={inp} type="text" placeholder="Enter your name"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name:e.target.value })} required />
              </div>
              <div className="row g-2" style={{ marginBottom:22 }}>
                <div className="col-7">
                  <label style={lbl}>Date of Birth</label>
                  <div className="position-relative">
                    <input style={inp} type="date" className="custom-date-input" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob:e.target.value })} required />
                    <i className="fas fa-calendar-alt position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
                  </div>
                </div>
                <div className="col-5">
                  <label style={lbl}>Birth Time</label>
                  <div className="position-relative">
                    <input style={inp} type="time" className="custom-time-input" value={formData.tob} onChange={(e) => setFormData({ ...formData, tob:e.target.value })} />
                    <i className="fas fa-clock position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
                  </div>
                </div>
              </div>
              <button style={btn} type="submit" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm" />  Calculating…</> : 'Get Moon Report'}
              </button>
              {error && <p style={{ color:'#f87171', fontSize:13, textAlign:'center', marginTop:10 }}>{error}</p>}
            </form>
          </div>
        </div>
      </div>

      {result && (
        <div style={{ animation:'fadeUp 0.5s ease both' }}>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {/* Phase header */}
              <div style={{ ...card, padding:'28px 24px', textAlign:'center', marginBottom:20 }}>
                <div style={{ fontSize:13, color:'#aaa', textTransform:'uppercase', letterSpacing:'2px', marginBottom:8 }}>{result.name}'s Moon Phase Report</div>
                <div style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:900, color:'#fff', letterSpacing:2, marginBottom:4 }}>{result.phase?.name}</div>
                <div style={{ fontSize:18, color:'#ffd700', fontStyle:'italic' }}>{result.phase?.title}</div>
              </div>

              <div className="row g-3">
                {/* Keywords */}
                <div className="col-md-6">
                  <div style={{ ...card, padding:24, height:'100%' }}>
                    <div style={{ fontSize:14, fontWeight:700, color:'#ff6a00', borderLeft:'3px solid #ff6a00', paddingLeft:12, marginBottom:16 }}>Key Characteristics</div>
                    {result.phase?.keywords?.map((kw,i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                        <span style={{ width:8, height:8, borderRadius:'50%', background:'#ff6a00', flexShrink:0, display:'inline-block' }} />
                        <span style={{ color:'#ddd', fontSize:15 }}>{kw}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Details */}
                <div className="col-md-6">
                  <div className="row g-3">
                    <div className="col-12">
                      <div style={{ ...card, padding:'16px 20px', textAlign:'center' }}>
                        <div style={{ fontSize:11, color:'#777', textTransform:'uppercase', marginBottom:4 }}>Phase Number</div>
                        <div style={{ fontSize:48, fontWeight:900, color:'#ff6a00', lineHeight:1 }}>#{result.phase?.number}</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div style={infoRow}>
                        <div>
                          <div style={{ fontSize:10, color:'#777', textTransform:'uppercase', marginBottom:2 }}>Phase Start</div>
                          <div style={{ fontWeight:700, color:'#fff', fontSize:14 }}>{result.phase?.startDeg}°</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div style={infoRow}>
                        <div>
                          <div style={{ fontSize:10, color:'#777', textTransform:'uppercase', marginBottom:2 }}>Phase End</div>
                          <div style={{ fontWeight:700, color:'#fff', fontSize:14 }}>{result.phase?.endDeg}°</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div style={infoRow}>
                        <span style={{ fontSize:20 }}>🌙</span>
                        <div>
                          <div style={{ fontSize:10, color:'#777', textTransform:'uppercase', marginBottom:2 }}>Vedic Moon Sign</div>
                          <div style={{ fontWeight:700, color:'#fff', fontSize:16 }}>{result.moonSign} <span style={{ color:'#666', fontSize:12 }}>({result.moonDegree}°)</span></div>
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
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .custom-date-input, .custom-time-input {
          color-scheme: dark;
          padding-right: 40px !important;
        }
        .custom-date-input::-webkit-calendar-picker-indicator,
        .custom-time-input::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
          opacity: 0; cursor: pointer; z-index: 2;
        }
      `}</style>
    </div>
  );
}

export default MoonTool;
