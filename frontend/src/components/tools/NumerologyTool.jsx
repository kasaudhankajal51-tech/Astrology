import { useState } from 'react';
import API_BASE from '../../utils/api.js';

/* ── shared inline constants ── */
const inp = {
  width:'100%', display:'block',
  background:'rgba(0,0,0,0.45)',
  border:'1px solid rgba(255,255,255,0.13)',
  color:'#fff', padding:'10px 14px',
  borderRadius:8, fontSize:14,
  outline:'none', boxSizing:'border-box',
};
const lbl = {
  display:'block', fontSize:11, color:'#999',
  textTransform:'uppercase', letterSpacing:'1px',
  marginBottom:6, fontWeight:500,
};
const btn = {
  display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
  background:'linear-gradient(135deg,#ff6a00,#ee0979)',
  border:'none', color:'#fff', padding:'11px 24px',
  borderRadius:8, fontWeight:600, fontSize:14,
  cursor:'pointer', width:'100%',
  boxShadow:'0 4px 14px rgba(255,106,0,0.3)',
};
const card = {
  background:'rgba(255,255,255,0.05)',
  border:'1px solid rgba(255,255,255,0.1)',
  borderRadius:14, backdropFilter:'blur(10px)',
};
const infoRow = {
  display:'flex', alignItems:'center', gap:10,
  padding:'11px 14px', borderRadius:10,
  background:'rgba(255,255,255,0.04)',
  border:'1px solid rgba(255,255,255,0.07)',
};

const ICONS = {
  planet:'🪐', sign:'♑', stones:'💎', days:'📅', color:'🎨',
  god:'🙏', fast:'🌙', dates:'🗓️', direction:'🧭', alphabets:'🔤', number:'✨',
};

function NumerologyTool({ onBack }) {
  const [formData, setFormData] = useState({ name:'', dob:'' });
  const [result,   setResult]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const calculate = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res  = await fetch(`${API_BASE}/api/tools/numerology`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) { setError(err.message || 'Calculation failed'); }
    finally { setLoading(false); }
  };

  const fav = result?.favourable || {};

  return (
    <div style={{ color:'#fff' }}>
      {/* Back */}
      <button onClick={onBack} style={{
        background:'transparent', border:'1px solid rgba(255,106,0,0.4)',
        color:'#ff6a00', padding:'7px 16px', borderRadius:6,
        fontSize:13, cursor:'pointer', marginBottom:28,
      }}>← Back to Tools</button>

      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="t-heading">🔢 Numerology Calculator</h2>
        <p style={{ color:'#aaa', fontSize:15 }}>Chaldean &amp; Vedic — radical, destiny &amp; name number analysis</p>
      </div>

      {/* Form */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-5 col-md-7">
          <div style={{ ...card, padding:28 }}>
            <form onSubmit={calculate}>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Full Name</label>
                <input style={inp} type="text" placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div style={{ marginBottom:22 }}>
                <label style={lbl}>Date of Birth</label>
                <div className="position-relative">
                  <input style={inp} type="date" className="custom-date-input"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })} required />
                  <i className="fas fa-calendar-alt position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
                </div>
              </div>
              <button style={btn} type="submit" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm" />  Calculating…</> : 'Calculate My Numbers'}
              </button>
              {error && <p style={{ color:'#f87171', fontSize:13, textAlign:'center', marginTop:10 }}>{error}</p>}
            </form>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div style={{ animation:'fadeUp 0.5s ease both' }}>
          {/* 3 Core Numbers */}
          <div className="row g-3 mb-4">
            {[
              { n: result.radical,    label:'Radical No.',  sub:'Birth day energy' },
              { n: result.destiny,    label:'Destiny No.',  sub:'Life path vibration' },
              { n: result.nameNumber, label:'Name No.',     sub:'Chaldean expression' },
            ].map(({ n, label, sub }) => (
              <div className="col-4" key={label}>
                <div style={{ ...card, padding:'18px 12px', textAlign:'center' }}>
                  <div style={{ fontSize:'clamp(34px,6vw,50px)', fontWeight:900, color:'#ff6a00', lineHeight:1, marginBottom:4 }}>{n}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#eee' }}>{label}</div>
                  <div style={{ fontSize:11, color:'#666', marginTop:2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile bar */}
          <div style={{ ...card, padding:'14px 20px', display:'flex', alignItems:'center', gap:14, marginBottom:24, flexWrap:'wrap' }}>
            <span style={{ fontSize:26 }}>🌟</span>
            <div>
              <div style={{ color:'#eee', fontSize:14 }}>Profile for <strong style={{ color:'#ff6a00' }}>{result.name}</strong></div>
              <div style={{ color:'#666', fontSize:12 }}>DOB: {result.dob}</div>
            </div>
            <div style={{ marginLeft:'auto', textAlign:'right' }}>
              <div style={{ fontSize:10, color:'#777', textTransform:'uppercase', letterSpacing:1 }}>Lucky Numbers</div>
              <div style={{ fontSize:20, fontWeight:800, color:'#ffd700' }}>{fav.number}</div>
            </div>
          </div>

          {/* Favourable */}
          {fav.planet && (
            <>
              <div style={{ fontSize:15, fontWeight:700, color:'#ff6a00', borderLeft:'3px solid #ff6a00', paddingLeft:12, marginBottom:16 }}>
                🪐 Auspicious Details — ruled by {fav.planet}
              </div>
              <div className="row g-3">
                {[
                  ['Planet',    ICONS.planet,    fav.planet],
                  ['Sign',      ICONS.sign,      fav.sign],
                  ['Stone',     ICONS.stones,    fav.stones],
                  ['Lucky Days',ICONS.days,      fav.days],
                  ['Colors',    ICONS.color,     fav.color],
                  ['Deity',     ICONS.god,       fav.god],
                  ['Fasting',   ICONS.fast,      fav.fast],
                  ['Dates',     ICONS.dates,     fav.dates],
                  ['Direction', ICONS.direction, fav.direction],
                  ['Letters',   ICONS.alphabets, fav.alphabets],
                  ['Numbers',   ICONS.number,    fav.number],
                ].map(([label, icon, value]) => (
                  <div className="col-6 col-md-4 col-lg-3" key={label}>
                    <div style={infoRow}>
                      <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
                      <div>
                        <div style={{ fontSize:10, color:'#777', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:2 }}>{label}</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>{value}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Mantra */}
                <div className="col-12">
                  <div style={{ background:'rgba(255,106,0,0.07)', border:'1px solid rgba(255,106,0,0.2)', borderRadius:12, padding:24, textAlign:'center' }}>
                    <div style={{ fontSize:26 }}>🕉️</div>
                    <div style={{ fontSize:10, color:'#777', textTransform:'uppercase', letterSpacing:1, marginTop:4 }}>Sacred Mantra</div>
                    <div style={{ fontSize:'clamp(18px,3vw,26px)', fontWeight:800, color:'#ffd700', letterSpacing:2, margin:'8px 0' }}>{fav.mantra}</div>
                    <div style={{ fontSize:12, color:'#888' }}>Chant 108 times every {fav.fast} morning for blessings of {fav.god}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .custom-date-input {
          color-scheme: dark;
          padding-right: 40px !important;
        }
        .custom-date-input::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
          opacity: 0; cursor: pointer; z-index: 2;
        }
      `}</style>
    </div>
  );
}

export default NumerologyTool;
