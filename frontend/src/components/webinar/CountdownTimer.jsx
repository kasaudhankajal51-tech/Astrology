import React, { useState, useEffect } from 'react';

// ─── PURE SVG 7-SEGMENT DISPLAY ───────────────────────────────────────────────
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

const ON_COLOR  = "#ffaa22";
const OFF_COLOR = "rgba(255,90,0,0.09)";
const ON_FILTER =
  "drop-shadow(0 0 2px rgba(255,180,30,1)) " +
  "drop-shadow(0 0 6px rgba(255,130,0,0.85)) " +
  "drop-shadow(0 0 14px rgba(255,80,0,0.55))";

function Digit({ char }) {
  const on = new Set(DIGIT_MAP[char] || []);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: "visible", display: "block" }}>
      {Object.entries(SEGS).map(([key, points]) => {
        const lit = on.has(key);
        return (
          <polygon
            key={key}
            points={points}
            fill={lit ? ON_COLOR : OFF_COLOR}
            style={{ filter: lit ? ON_FILTER : "none", transition: "fill 0.1s" }}
          />
        );
      })}
    </svg>
  );
}

function SegColon({ visible }) {
  const DW = 3.2, DH = 7, CX = 6;
  const color = visible ? "#ff8c00" : "rgba(255,90,0,0.09)";
  const glow  = visible
    ? "drop-shadow(0 0 3px rgba(255,160,0,0.95)) drop-shadow(0 0 8px rgba(255,90,0,0.7))"
    : "none";
  return (
    <svg viewBox={`0 0 12 ${H}`} className="w-full h-full" style={{ overflow: "visible", display: "block" }}>
      <rect x={CX-DW/2} y={H*0.28-DH/2} width={DW} height={DH} rx={1.5} fill={color} style={{ filter: glow, transition: "fill 0.1s" }} />
      <rect x={CX-DW/2} y={H*0.72-DH/2} width={DW} height={DH} rx={1.5} fill={color} style={{ filter: glow, transition: "fill 0.1s" }} />
    </svg>
  );
}

function DigitPair({ value, label }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1 h-8 sm:h-9 md:h-11 w-[2.2rem] sm:w-[2.4rem] md:w-[3.0rem]">
        <Digit char={str[0]} />
        <Digit char={str[1]} />
      </div>
      <span className="text-[8px] sm:text-[9px] font-bold text-white/40 tracking-[1.5px] uppercase font-['Poppins',sans-serif]">
        {label}
      </span>
    </div>
  );
}

// ─── Main Timer Component ─────────────────────────────────────────────────────

const CountdownTimer = ({ compactCard = false, hours = 24, storageKey = 'webinar_timer_v4' }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [colonOn, setColonOn] = useState(true);

  useEffect(() => {
    // Dynamic Hour Persistence Logic
    const getTargetTime = () => {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const target = parseInt(stored);
        if (target > Date.now()) return target;
      }
      
      const newTarget = Date.now() + hours * 60 * 60 * 1000;
      localStorage.setItem(storageKey, newTarget.toString());
      return newTarget;
    };

    let targetTime = getTargetTime();

    const tick = () => {
      const now = Date.now();
      let difference = targetTime - now;

      if (difference <= 0) {
        // Reset for another X hours
        targetTime = Date.now() + hours * 60 * 60 * 1000;
        localStorage.setItem(storageKey, targetTime.toString());
        difference = targetTime - Date.now();
      }

      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
      setColonOn(prev => !prev);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [hours, storageKey]);

  return (
    <div className={`flex flex-col items-center gap-2 p-1.5 w-full mx-auto max-w-[320px] ${compactCard ? 'my-0' : 'my-4'}`}>
      <p className={`m-0 text-[11px] font-black tracking-[3px] uppercase ${compactCard ? 'text-[#8b4a1e]' : 'text-white/80'}`}>
        OFFER ENDS IN
      </p>
      <div className="relative w-full overflow-hidden rounded-2xl border border-orange-500/30 bg-black/85 px-4 py-3 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8),0_0_20px_rgba(255,100,0,0.15)] backdrop-blur-md flex items-center justify-center">
        {/* Scanlines overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 opacity-30 mix-blend-overlay" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)" }} />
        
        <div className="relative z-20 flex items-center gap-2 sm:gap-3">
          <DigitPair value={timeLeft.hours} label="HRS" />
          <div className="h-6 sm:h-7 md:h-9 w-2.5 sm:w-3 -mt-3 sm:-mt-3.5">
            <SegColon visible={colonOn} />
          </div>
          <DigitPair value={timeLeft.minutes} label="MINS" />
          <div className="h-6 sm:h-7 md:h-9 w-2.5 sm:w-3 -mt-3 sm:-mt-3.5">
            <SegColon visible={colonOn} />
          </div>
          <DigitPair value={timeLeft.seconds} label="SECS" />
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
