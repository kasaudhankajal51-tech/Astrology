import { useState } from 'react';
import API_BASE from '../../utils/api.js';

const inp = { width:'100%', display:'block', background:'rgba(0,0,0,0.45)', border:'1px solid rgba(255,255,255,0.13)', color:'#fff', padding:'10px 14px', borderRadius:8, fontSize:14, outline:'none', boxSizing:'border-box' };
const lbl = { display:'block', fontSize:11, color:'#999', textTransform:'uppercase', letterSpacing:'1px', marginBottom:6, fontWeight:500 };
const btn = { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, background:'linear-gradient(135deg,#ff6a00,#ee0979)', border:'none', color:'#fff', padding:'11px 24px', borderRadius:8, fontWeight:600, fontSize:14, cursor:'pointer', width:'100%', boxShadow:'0 4px 14px rgba(255,106,0,0.3)' };
const card = { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, backdropFilter:'blur(10px)' };
const backBtn = { background:'transparent', border:'1px solid rgba(255,106,0,0.4)', color:'#ff6a00', padding:'7px 16px', borderRadius:6, fontSize:13, cursor:'pointer', marginBottom:28 };

const signs = [
  { name:'Aries',       sym:'♈', dates:'Mar 21 – Apr 19' },
  { name:'Taurus',      sym:'♉', dates:'Apr 20 – May 20' },
  { name:'Gemini',      sym:'♊', dates:'May 21 – Jun 20' },
  { name:'Cancer',      sym:'♋', dates:'Jun 21 – Jul 22' },
  { name:'Leo',         sym:'♌', dates:'Jul 23 – Aug 22' },
  { name:'Virgo',       sym:'♍', dates:'Aug 23 – Sep 22' },
  { name:'Libra',       sym:'♎', dates:'Sep 23 – Oct 22' },
  { name:'Scorpio',     sym:'♏', dates:'Oct 23 – Nov 21' },
  { name:'Sagittarius', sym:'♐', dates:'Nov 22 – Dec 21' },
  { name:'Capricorn',   sym:'♑', dates:'Dec 22 – Jan 19' },
  { name:'Aquarius',    sym:'♒', dates:'Jan 20 – Feb 18' },
  { name:'Pisces',      sym:'♓', dates:'Feb 19 – Mar 20' },
];

function HoroscopeTool({ onBack }) {
  const [selected,   setSelected]   = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading,    setLoading]    = useState(false);

  const fetchHoroscope = async (sign) => {
    setLoading(true); setSelected(sign); setPrediction(null);
    try {
      const res = await fetch(`${API_BASE}/api/tools/horoscope/${sign.name}`);
      const data = await res.json();
      if (data?.prediction) setPrediction(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ color:'#fff' }}>
      <button style={backBtn} onClick={onBack}>← Back to Tools</button>
      <div className="text-center mb-4">
        <h2 className="t-heading">☀️ Daily Horoscope</h2>
        <p style={{ color:'#aaa', fontSize:15 }}>Select your zodiac sign for today's planetary guidance</p>
      </div>

      {!selected ? (
        <div className="row g-3">
          {signs.map((sign) => (
            <div key={sign.name} className="col-6 col-md-4 col-lg-2">
              <div
                onClick={() => fetchHoroscope(sign)}
                style={{ ...card, padding:'14px 8px', textAlign:'center', cursor:'pointer', transition:'transform 0.25s, box-shadow 0.25s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor='rgba(255,106,0,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}
              >
                <div style={{ fontSize:28, marginBottom:6 }}>{sign.sym}</div>
                <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>{sign.name}</div>
                <div style={{ fontSize:10, color:'#666', marginTop:2 }}>{sign.dates}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {(loading || !prediction) ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color:'#ff6a00', width:40, height:40 }} />
              <p style={{ color:'#aaa', marginTop:12 }}>Consulting the stars for {selected.name}…</p>
            </div>
          ) : (
            <div style={{ ...card, padding:'28px 32px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:44 }}>{selected.sym}</span>
                  <div>
                    <h4 style={{ color:'#fff', fontWeight:700, margin:0 }}>{selected.name}</h4>
                    <div style={{ color:'#ff6a00', fontSize:13 }}>{prediction.date || 'Today'}</div>
                  </div>
                </div>
                <button
                  style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'#ccc', padding:'6px 16px', borderRadius:8, fontSize:13, cursor:'pointer' }}
                  onClick={() => { setSelected(null); setPrediction(null); }}
                >← Change Sign</button>
              </div>
              <p style={{ color:'#ccc', fontSize:15, lineHeight:1.9, margin:0 }}>{prediction.prediction}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HoroscopeTool;
