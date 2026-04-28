import { useState } from 'react';
import PlaceAutocomplete from './PlaceAutocomplete';
import API_BASE from '../../utils/api.js';

const inp = { width:'100%', display:'block', background:'rgba(0,0,0,0.45)', border:'1px solid rgba(255,255,255,0.13)', color:'#fff', padding:'10px 14px', borderRadius:8, fontSize:14, outline:'none', boxSizing:'border-box' };
const lbl = { display:'block', fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'1px', marginBottom:6, fontWeight:500 };
const btn = { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,#ff6a00,#ee0979)', border:'none', color:'#fff', padding:'11px 24px', borderRadius:8, fontWeight:600, fontSize:14, cursor:'pointer', boxShadow:'0 4px 14px rgba(255,106,0,0.3)' };
const card = { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, backdropFilter:'blur(10px)' };
const backBtn = { background:'transparent', border:'1px solid rgba(255,106,0,0.4)', color:'#ff6a00', padding:'7px 16px', borderRadius:6, fontSize:13, cursor:'pointer', marginBottom:28 };
const infoRow = { display:'flex', alignItems:'center', gap:10, padding:'11px 14px', borderRadius:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' };

const emptyPartner = () => ({ name:'', dob:'', tob:'12:00', place:'', lat:'', lon:'' });

function PartnerCard({ label, data, onChange }) {
  return (
    <div style={{ ...card, padding:24, height:'100%' }}>
      <h5 style={{ color:'#ff6a00', fontWeight:700, marginBottom:20 }}>{label}</h5>
      <div style={{ marginBottom:14 }}>
        <label style={lbl}>Full Name</label>
        <input style={inp} type="text" placeholder="Enter full name"
          value={data.name} onChange={(e) => onChange({ ...data, name:e.target.value })} required />
      </div>
      <div className="row g-2" style={{ marginBottom:14 }}>
        <div className="col-7">
          <label style={lbl}>Date of Birth</label>
          <div className="position-relative">
            <input style={inp} type="date" className="custom-date-input" value={data.dob} onChange={(e) => onChange({ ...data, dob:e.target.value })} required />
            <i className="fas fa-calendar-alt position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
          </div>
        </div>
        <div className="col-5">
          <label style={lbl}>Birth Time</label>
          <div className="position-relative">
            <input style={inp} type="time" className="custom-time-input" value={data.tob} onChange={(e) => onChange({ ...data, tob:e.target.value })} />
            <i className="fas fa-clock position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
          </div>
        </div>
      </div>
      <div>
        <label style={lbl}>Birth Place</label>
        <PlaceAutocomplete
          value={data.place} placeholder="Search city or town…"
          onChange={(text) => onChange({ ...data, place:text, lat:'', lon:'' })}
          onSelect={({ lat, lon, label }) => onChange({ ...data, place:label, lat, lon })}
        />
        {data.lat && <div style={{ fontSize:12, color:'#4ade80', marginTop:4 }}>✓ {data.place}</div>}
        {!data.lat && data.place.length > 2 && <div style={{ fontSize:12, color:'#f59e0b', marginTop:4 }}>⚠ Select from dropdown</div>}
      </div>
    </div>
  );
}

function LoveCalculator({ onBack }) {
  const [partnerA, setPartnerA] = useState(emptyPartner());
  const [partnerB, setPartnerB] = useState(emptyPartner());
  const [result,   setResult]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const isValid = () => partnerA.lat && partnerA.lon && partnerB.lat && partnerB.lon && partnerA.dob && partnerB.dob && partnerA.name && partnerB.name;

  const calculate = async (e) => {
    e.preventDefault();
    if (!isValid()) { setError('Please select both birth places from the dropdown.'); return; }
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${API_BASE}/api/tools/love-compatibility`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          partnerA:{ name:partnerA.name, dob:partnerA.dob, tob:partnerA.tob, lat:partnerA.lat, lon:partnerA.lon },
          partnerB:{ name:partnerB.name, dob:partnerB.dob, tob:partnerB.tob, lat:partnerB.lat, lon:partnerB.lon },
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Calculation failed');
      setResult(data);
    } catch (err) { setError(err.message || 'Failed.'); }
    finally { setLoading(false); }
  };

  const score = result?.score || 0;
  const scoreColor = score > 80 ? '#4ade80' : score > 60 ? '#ffd700' : '#ff6a00';

  return (
    <div style={{ color:'#fff' }}>
      <button style={backBtn} onClick={onBack}>← Back to Tools</button>
      <div className="text-center mb-4">
        <h2 className="t-heading">💞 Vedic Love Synastry</h2>
        <p style={{ color:'#aaa', fontSize:15 }}>Ashtakoota matching based on Moon signs &amp; planetary alignments</p>
      </div>

      <form onSubmit={calculate}>
        <div className="row g-4 justify-content-center mb-4">
          <div className="col-md-5"><PartnerCard label="👤 Partner One" data={partnerA} onChange={setPartnerA} /></div>
          <div className="col-md-1 d-flex align-items-center justify-content-center">
            <span style={{ fontSize:32, filter:'drop-shadow(0 0 8px #ff6a00)', animation:'lovebeat 1.5s ease-in-out infinite' }}>💗</span>
          </div>
          <div className="col-md-5"><PartnerCard label="👤 Partner Two" data={partnerB} onChange={setPartnerB} /></div>
        </div>
        <div className="text-center">
          <button style={{ ...btn, width:'auto', paddingLeft:40, paddingRight:40 }} type="submit" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm" />  Analyzing…</> : 'Check Destiny Score'}
          </button>
          {error && <p style={{ color:'#f87171', fontSize:13, textAlign:'center', marginTop:10 }}>{error}</p>}
        </div>
      </form>

      {result && (
        <div style={{ marginTop:40, animation:'fadeUp 0.5s ease both' }}>
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div style={{ ...card, padding:'32px 28px', textAlign:'center' }}>
                <div style={{ fontSize:'clamp(48px,8vw,72px)', fontWeight:900, color:scoreColor, lineHeight:1, marginBottom:8 }}>{score}%</div>
                <div style={{ height:6, background:'rgba(255,255,255,0.08)', borderRadius:99, maxWidth:200, margin:'0 auto 8px' }}>
                  <div style={{ width:`${score}%`, height:'100%', background:`linear-gradient(90deg,#ff6a00,${scoreColor})`, borderRadius:99, transition:'width 1.2s ease' }} />
                </div>
                <div style={{ fontSize:11, color:'#666', textTransform:'uppercase', letterSpacing:2, marginBottom:20 }}>Compatibility Score</div>
                <h4 style={{ color:'#fff', fontWeight:800, marginBottom:4 }}>{result.partnerA?.name} &amp; {result.partnerB?.name}</h4>
                <div style={{ color:'#ff6a00', marginBottom:12 }}>{result.partnerA?.sign} Moon ♥ {result.partnerB?.sign} Moon</div>
                <p style={{ color:'#aaa', fontStyle:'italic', fontSize:14, marginBottom:24 }}>"{result.analysis}"</p>
                <div className="row g-2">
                  {result.traits?.map((t,i) => (
                    <div key={i} className="col-md-4">
                      <div style={infoRow}>
                        <div>
                          <div style={{ fontSize:10, color:'#777', textTransform:'uppercase', marginBottom:2 }}>{t.label}</div>
                          <div style={{ fontWeight:700, color:'#fff', fontSize:13 }}>{t.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes lovebeat{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .place-suggestions-dropdown{position:absolute;top:100%;left:0;right:0;background:#111827;border:1px solid rgba(255,106,0,0.3);border-radius:8px;list-style:none;margin:4px 0 0;padding:4px 0;z-index:9999;max-height:200px;overflow-y:auto;box-shadow:0 16px 32px rgba(0,0,0,0.6)}
        .suggestion-item{padding:9px 14px;cursor:pointer;font-size:13px;color:#ddd;border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.15s}
        .suggestion-item:hover{background:rgba(255,106,0,0.12)}
        .suggestion-primary{font-weight:600}
        .suggestion-secondary{color:#777;font-size:0.8em}
        
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

export default LoveCalculator;
