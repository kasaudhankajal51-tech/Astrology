import React, { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// PURE SVG 7-SEGMENT DISPLAY — DS-Digital replica
// ─────────────────────────────────────────────────────────────────────────────

const W = 15, H = 26, T = 3.2, G = 1.2, SK = 0;
const SEG_POINTS = {
  a: [[G+SK,G],[W-G+SK,G],[W-G-T+SK,G+T],[G+T+SK,G+T]],
  b: [[W-G+SK,G*2],[W-G,H/2-G],[W-G-T,H/2-G-T],[W-G-T+SK,G*2+T]],
  c: [[W-G,H/2+G],[W-G-SK,H-G*2],[W-G-T-SK,H-G*2-T],[W-G-T,H/2+G+T]],
  d: [[G+T-SK,H-G-T],[W-G-T-SK,H-G-T],[W-G-SK,H-G],[G-SK,H-G]],
  e: [[G,H/2+G],[G+T,H/2+G+T],[G+T-SK,H-G*2-T],[G-SK,H-G*2]],
  f: [[G+SK,G*2],[G+T+SK,G*2+T],[G+T,H/2-G-T],[G,H/2-G]],
  g: [[G+T,H/2-T/2],[W-G-T,H/2-T/2],[W-G-T,H/2+T/2],[G+T,H/2+T/2]],
};

const DIGIT_MAP = {
  "0":["a","b","c","d","e","f"],
  "1":["b","c"],
  "2":["a","b","g","e","d"],
  "3":["a","b","g","c","d"],
  "4":["f","g","b","c"],
  "5":["a","f","g","c","d"],
  "6":["a","f","g","e","c","d"],
  "7":["a","b","c"],
  "8":["a","b","c","d","e","f","g"],
  "9":["a","b","c","d","f","g"],
};

const pts = (arr) => arr.map(([x, y]) => `${x},${y}`).join(" ");
const SEGS = Object.fromEntries(Object.entries(SEG_POINTS).map(([k, v]) => [k, pts(v)]));

const ON_COLOR  = "#8B4A1E";
const OFF_COLOR = "rgba(139,74,30,0.12)";
const ON_FILTER =
  "drop-shadow(0 1px 1px rgba(42,15,2,0.18))";

function Digit({ char }) {
  const on = new Set(DIGIT_MAP[char] || []);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible", display: "block" }}>
      {Object.entries(SEGS).map(([key, points]) => {
        const lit = on.has(key);
        return (
          <polygon
            key={key}
            points={points}
            fill={lit ? ON_COLOR : OFF_COLOR}
            style={{ filter: lit ? ON_FILTER : "none" }}
          />
        );
      })}
    </svg>
  );
}

function SegColon({ visible }) {
  const DW = 3.2, DH = 7, CX = 6;
  const color = visible ? "#8B4A1E" : "rgba(139,74,30,0.12)";
  const glow  = visible
    ? "drop-shadow(0 1px 1px rgba(42,15,2,0.18))"
    : "none";
  return (
    <svg width={12} height={H} viewBox={`0 0 12 ${H}`} style={{ overflow: "visible", display: "block" }}>
      <rect x={CX-DW/2} y={H*0.28-DH/2} width={DW} height={DH} rx={1.5} fill={color} style={{ filter: glow }} />
      <rect x={CX-DW/2} y={H*0.72-DH/2} width={DW} height={DH} rx={1.5} fill={color} style={{ filter: glow }} />
    </svg>
  );
}

const ss = {
  timerRoot: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "2px 0", marginBottom: "14px", width: "100%" },
  timerLabel: {
    margin: 0, fontSize: 11, fontWeight: 900,
    color: "#FFFFFF", letterSpacing: "0.8px", textTransform: "uppercase",
    textShadow: "0 1px 3px rgba(0,0,0,0.55)",
  },
  timerBox: {
    width: "100%",
    background: "linear-gradient(180deg, #FFF8ED 0%, #F7E7D4 100%)", padding: "9px 12px",
    borderRadius: 12, border: "1.5px solid rgba(200,131,42,0.42)",
    boxShadow: "0 12px 24px rgba(42,15,2,0.22), inset 0 1px 0 rgba(255,255,255,0.8)",
    position: "relative", overflow: "hidden",
  },
  scanlines: {
    position: "absolute", inset: 0, borderRadius: 10,
    background: "linear-gradient(90deg, rgba(200,131,42,0.08), transparent 42%, rgba(139,74,30,0.08))",
    pointerEvents: "none", zIndex: 2,
  },
  timerInner: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, position: "relative", zIndex: 1 },
  segLabel: {
    fontSize: 11, fontWeight: 900,
    color: "#5C3D26", letterSpacing: "0.6px",
    textTransform: "uppercase", fontFamily: "var(--font-body, sans-serif)",
  },
};

function DigitPair({ value, label }) {
  const str = String(value).padStart(2, "0");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", gap: 4 }}>
        <Digit char={str[0]} />
        <Digit char={str[1]} />
      </div>
      <span style={ss.segLabel}>{label}</span>
    </div>
  );
}

export default function CourseTimer({ courseId }) {
  const [time, setTime]     = useState({ h: 5, m: 0, s: 0 });
  const [colonOn, setColon] = useState(true);

  useEffect(() => {
    const STORAGE_KEY = `course_timer_${courseId || "default"}`;
    
    function getOrCreateTarget(hours = 5) {
      try {
        const s = localStorage.getItem(STORAGE_KEY);
        if (s) {
          const stored = parseInt(s, 10);
          if (stored > Date.now()) return stored;
        }
      } catch (_) {}
      const t = Date.now() + hours * 3600 * 1000;
      try { localStorage.setItem(STORAGE_KEY, String(t)); } catch (_) {}
      return t;
    }

    let target = getOrCreateTarget(5);
    const tick = () => {
      const now = Date.now();
      if (target <= now) {
        // restart timer if it hits zero
        target = now + 5 * 3600 * 1000;
        try { localStorage.setItem(STORAGE_KEY, String(target)); } catch (_) {}
      }
      const diff = target - now;
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
      setColon((v) => !v);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [courseId]);

  return (
    <div style={ss.timerRoot}>
      <p style={ss.timerLabel}>OFFER EXPIRES IN</p>
      <div style={ss.timerBox}>
        <div style={ss.scanlines} />
        <div style={ss.timerInner}>
          <DigitPair value={time.h} label="HRS"  />
          <div style={{ marginTop: -15, margin: "0 5px" }}><SegColon visible={colonOn} /></div>
          <DigitPair value={time.m} label="MINS" />
          <div style={{ marginTop: -15, margin: "0 5px" }}><SegColon visible={colonOn} /></div>
          <DigitPair value={time.s} label="SECS" />
        </div>
      </div>
    </div>
  );
}
