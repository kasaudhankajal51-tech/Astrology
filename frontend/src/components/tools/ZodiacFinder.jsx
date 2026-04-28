import { useState } from 'react';
import API_BASE from '../../utils/api.js';

const inp = { width:'100%', display:'block', background:'rgba(0,0,0,0.45)', border:'1px solid rgba(255,255,255,0.13)', color:'#fff', padding:'10px 14px', borderRadius:8, fontSize:14, outline:'none', boxSizing:'border-box' };
const lbl = { display:'block', fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'1px', marginBottom:6, fontWeight:500 };
const btn = { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,#ff6a00,#ee0979)', border:'none', color:'#fff', padding:'11px 24px', borderRadius:8, fontWeight:600, fontSize:14, cursor:'pointer', width:'100%', boxShadow:'0 4px 14px rgba(255,106,0,0.3)' };
const card = { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, backdropFilter:'blur(10px)' };
const backBtn = { background:'transparent', border:'1px solid rgba(255,106,0,0.4)', color:'#ff6a00', padding:'7px 16px', borderRadius:6, fontSize:13, cursor:'pointer', marginBottom:28 };

const elementColor = { Fire:'#ff6a00', Earth:'#84cc16', Air:'#38bdf8', Water:'#818cf8' };

function ZodiacFinder({ onBack }) {
  const [dob,     setDob]     = useState('');
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const accent = result ? (elementColor[result.element] || '#ff6a00') : '#ff6a00';

  const findSign = async (e) => {
    e.preventDefault(); setLoading(true); setError(''); setResult(null);
    try {
      const res  = await fetch(`${API_BASE}/api/tools/zodiac`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ dob }) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Calculation failed');
      setResult(data);
    } catch (err) { setError(err.message || 'Calculation failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ color:'#fff' }}>
      <button style={backBtn} onClick={onBack}>← Back to Tools</button>
      <div className="text-center mb-4">
        <h2 className="t-heading">♑ Sun Sign Finder</h2>
        <p style={{ color:'#aaa', fontSize:15 }}>High-precision solar ecliptic calculation via Vedic engine</p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-4 col-md-6">
          <div style={{ ...card, padding:24 }}>
            <form onSubmit={findSign}>
              <div style={{ marginBottom:18 }}>
                <label style={lbl}>Date of Birth</label>
                <div className="position-relative">
                  <input style={inp} type="date" className="custom-date-input" value={dob} onChange={(e) => setDob(e.target.value)} required />
                  <i className="fas fa-calendar-alt position-absolute text-white" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}></i>
                </div>
              </div>
              <button style={btn} type="submit" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm" />  Calculating…</> : 'Reveal My Sign'}
              </button>
            </form>
            {error && <p style={{ color:'#f87171', fontSize:13, textAlign:'center', marginTop:10 }}>{error}</p>}
          </div>
        </div>
      </div>

      {result && (
        <div style={{ animation:'fadeUp 0.5s ease both' }}>
          {/* Hero */}
          <div style={{ ...card, padding:'32px 24px', textAlign:'center', marginBottom:20 }}>
            <div style={{ fontSize:56, marginBottom:8 }}>{result.symbol}</div>
            <div style={{ color:accent, fontSize:12, textTransform:'uppercase', letterSpacing:'2px', marginBottom:4 }}>{result.element} · {result.quality}</div>
            <h2 style={{ color:'#fff', fontWeight:900, marginBottom:4 }}>{result.sign}</h2>
            <div style={{ color:'#777', fontSize:13, marginBottom:12 }}>{result.dates}</div>
            <p style={{ color:'#aaa', maxWidth:480, margin:'0 auto', fontSize:14, lineHeight:1.8 }}>"{result.description}"</p>
          </div>
          {/* Grid */}
          <div className="row g-3">
            <div className="col-md-4">
              <div style={{ ...card, padding:20, height:'100%' }}>
                <div style={{ fontSize:14, fontWeight:700, color:accent, borderLeft:`3px solid ${accent}`, paddingLeft:10, marginBottom:14 }}>Key Traits</div>
                {result.traits?.map((t,i) => <div key={i} style={{ color:'#ddd', fontSize:13, marginBottom:8, display:'flex', gap:8 }}><span style={{ color:accent }}>◈</span>{t}</div>)}
              </div>
            </div>
            <div className="col-md-4">
              <div style={{ ...card, padding:20, height:'100%' }}>
                <div style={{ fontSize:14, fontWeight:700, color:accent, borderLeft:`3px solid ${accent}`, paddingLeft:10, marginBottom:14 }}>Planetary Data</div>
                {[['Ruling Planet',result.ruler],['Lucky Color',result.color],['Lucky Numbers',result.lucky?.join(', ')]].map(([l,v]) => (
                  <div key={l} style={{ marginBottom:12 }}>
                    <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', marginBottom:2 }}>{l}</div>
                    <div style={{ fontWeight:700, color:'#fff', fontSize:14 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div style={{ ...card, padding:20, height:'100%' }}>
                <div style={{ fontSize:14, fontWeight:700, color:accent, borderLeft:`3px solid ${accent}`, paddingLeft:10, marginBottom:14 }}>Solar Position</div>
                {[['Ecliptic Longitude',`${result.longitude}°`],['Degree in Sign',`${result.degree}°`]].map(([l,v]) => (
                  <div key={l} style={{ marginBottom:12 }}>
                    <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', marginBottom:2 }}>{l}</div>
                    <div style={{ fontWeight:700, color:accent, fontSize:18 }}>{v}</div>
                  </div>
                ))}
                <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', marginBottom:6 }}>Compatible Signs</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {result.compatible?.map((s,i) => <span key={i} style={{ background:`rgba(255,106,0,0.1)`, border:`1px solid rgba(255,106,0,0.3)`, color:'#ff6a00', padding:'3px 10px', borderRadius:20, fontSize:12, fontWeight:600 }}>{s}</span>)}
                </div>
              </div>
            </div>
          </div>
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

export default ZodiacFinder;
