import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// PURE SVG 7-SEGMENT DISPLAY — DS-Digital exact replica
//
// Segment map (classic 7-seg layout):
//   ┌──a──┐
//   f     b
//   ├──g──┤
//   e     c
//   └──d──┘
//
// Each segment is a thin parallelogram with a slight rightward italic skew,
// exactly matching DS-Digital's characteristic italic style.
// ─────────────────────────────────────────────────────────────────────────────

const W  = 20;    // digit width (reduced from 30)
const H  = 38;    // digit height (reduced from 56)
const T  = 3;      // segment bar thickness (reduced from 4.5)
const G  = 1.5;    // gap between segment ends
const SK = 0;      // Removed skew (upright)

// Polygon points for each segment (a–g)
const SEG_POINTS = {
  // top horizontal
  a: [
    [G + SK,       G            ],
    [W - G + SK,   G            ],
    [W - G - T + SK, G + T      ],
    [G + T + SK,   G + T        ],
  ],
  // top-right vertical
  b: [
    [W - G + SK,   G * 2        ],
    [W - G,        H / 2 - G    ],
    [W - G - T,    H / 2 - G - T],
    [W - G - T + SK, G * 2 + T  ],
  ],
  // bottom-right vertical
  c: [
    [W - G,        H / 2 + G    ],
    [W - G - SK,   H - G * 2    ],
    [W - G - T - SK, H - G * 2 - T],
    [W - G - T,    H / 2 + G + T],
  ],
  // bottom horizontal
  d: [
    [G + T - SK,   H - G - T    ],
    [W - G - T - SK, H - G - T  ],
    [W - G - SK,   H - G        ],
    [G - SK,       H - G        ],
  ],
  // bottom-left vertical
  e: [
    [G,            H / 2 + G    ],
    [G + T,        H / 2 + G + T],
    [G + T - SK,   H - G * 2 - T],
    [G - SK,       H - G * 2    ],
  ],
  // top-left vertical
  f: [
    [G + SK,       G * 2        ],
    [G + T + SK,   G * 2 + T    ],
    [G + T,        H / 2 - G - T],
    [G,            H / 2 - G    ],
  ],
  // middle horizontal
  g: [
    [G + T,        H / 2 - T / 2],
    [W - G - T,    H / 2 - T / 2],
    [W - G - T,    H / 2 + T / 2],
    [G + T,        H / 2 + T / 2],
  ],
};

// Convert array of [x,y] to SVG points string
const pts = (arr) => arr.map(([x, y]) => `${x},${y}`).join(" ");

// Pre-compute segment strings
const SEGS = Object.fromEntries(
  Object.entries(SEG_POINTS).map(([k, v]) => [k, pts(v)])
);

// Which segments light up for digits 0–9
const DIGIT_MAP = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "1": ["b", "c"],
  "2": ["a", "b", "g", "e", "d"],
  "3": ["a", "b", "g", "c", "d"],
  "4": ["f", "g", "b", "c"],
  "5": ["a", "f", "g", "c", "d"],
  "6": ["a", "f", "g", "e", "c", "d"],
  "7": ["a", "b", "c"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
};

const ON_COLOR  = "#ffaa22";
const OFF_COLOR = "rgba(255, 90, 0, 0.09)";
const ON_FILTER =
  "drop-shadow(0 0 2px rgba(255,180,30,1)) " +
  "drop-shadow(0 0 7px rgba(255,130,0,0.85)) " +
  "drop-shadow(0 0 16px rgba(255,80,0,0.55)) " +
  "drop-shadow(0 0 30px rgba(255,50,0,0.3))";

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

// Blinking colon — two rounded rectangles like a real LED display
function SegColon({ visible }) {
  const DOT_W = 3;
  const DOT_H = 5;
  const CX    = 5;
  const color  = visible ? "#ff8c00"             : "rgba(255,90,0,0.09)";
  const glow   = visible
    ? "drop-shadow(0 0 3px rgba(255,160,0,0.95)) drop-shadow(0 0 10px rgba(255,90,0,0.7))"
    : "none";
  return (
    <svg width={16} height={H} viewBox={`0 0 16 ${H}`} style={{ overflow: "visible", display: "block" }}>
      <rect x={CX - DOT_W / 2} y={H * 0.28 - DOT_H / 2} width={DOT_W} height={DOT_H} rx={1.5}
        fill={color} style={{ filter: glow }} />
      <rect x={CX - DOT_W / 2} y={H * 0.72 - DOT_H / 2} width={DOT_W} height={DOT_H} rx={1.5}
        fill={color} style={{ filter: glow }} />
    </svg>
  );
}

// Two-digit block with label underneath
function DigitPair({ value, label }) {
  const str = String(value).padStart(2, "0");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
      <div style={{ display: "flex", gap: 3 }}>
        <Digit char={str[0]} />
        <Digit char={str[1]} />
      </div>
      <span style={styles.segLabel}>{label}</span>
    </div>
  );
}

// ─── Timer logic ──────────────────────────────────────────────────────────────
const STORAGE_KEY = "webinar_cta_timer_v24h";

function getOrCreateTarget(hours = 24) {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return parseInt(s, 10);
  } catch (_) {}
  const t = Date.now() + hours * 3600 * 1000;
  try { localStorage.setItem(STORAGE_KEY, String(t)); } catch (_) {}
  return t;
}

function DigitalTimer() {
  const [time, setTime]     = useState({ h: 24, m: 0, s: 0 });
  const [colonOn, setColon] = useState(true);

  useEffect(() => {
    const target = getOrCreateTarget(24);
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
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
  }, []);

  return (
    <div style={styles.timerRoot}>
      <p style={styles.timerLabel}>OFFER ENDS IN</p>
      <div style={styles.timerBox}>
        <div style={styles.scanlines} />
        <div style={styles.timerInner}>
          <DigitPair value={time.h} label="HRS"  />
          <div style={{ marginTop: -14 }}><SegColon visible={colonOn} /></div>
          <DigitPair value={time.m} label="MINS" />
          <div style={{ marginTop: -14 }}><SegColon visible={colonOn} /></div>
          <DigitPair value={time.s} label="SECS" />
        </div>
      </div>
    </div>
  );
}

// ─── Enroll Button ────────────────────────────────────────────────────────────
function EnrollButton({ onClick, isMobile }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ 
        ...styles.btn, 
        ...(hovered ? styles.btnHover : {}),
        padding: isMobile ? "6px 20px" : "5px 40px",
        fontSize: isMobile ? "1.8rem" : "4.5rem",
        height: "auto",
        width: isMobile ? "100%" : "auto", // Make it fit content on desktop to avoid stretching
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div style={styles.btnShine} />
      <span style={styles.btnText}>Enroll Now</span>
      <span style={{ ...styles.btnIcon, width: isMobile ? 24 : 30, height: isMobile ? 24 : 30 }}>
        <svg width={isMobile ? "10" : "12"} height={isMobile ? "10" : "12"} viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="#fff" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function FixedBottomCTA({ onEnrollNow }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dynamicStyles = {
    cta: {
      ...styles.cta,
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      maxWidth: "none",
      padding: isMobile ? "8px 15px" : "10px 60px",
      borderRadius: "15px 15px 0 0",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "none",
    },
    mainRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      position: "relative",
      zIndex: 1,
    },
    leftCol: {
      flex: isMobile ? "none" : 1,
      display: "flex",
      alignItems: "center",
      gap: isMobile ? 8 : 15,
    },
    centerCol: {
      flex: 1,
      display: isMobile ? "none" : "flex", // Hide on mobile if too crowded, or keep if room
      justifyContent: "center",
      alignItems: "center",
    },
    rightCol: {
      flex: isMobile ? "none" : 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: isMobile ? 10 : 25,
    },
    mobileTimer: {
       display: isMobile ? "flex" : "none",
       marginRight: 10
    }
  };

  return (
    <div style={dynamicStyles.cta} className="cta-animated-glow">
      <style>{`
        @keyframes ctaGlowPulse {
          0% { box-shadow: 0 0 15px rgba(255, 130, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
          50% { box-shadow: 0 0 50px rgba(255, 130, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15); }
          100% { box-shadow: 0 0 15px rgba(255, 130, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
        }
        .cta-animated-glow {
          animation: ctaGlowPulse 4s infinite ease-in-out;
        }
      `}</style>
      <div style={styles.ambientGlow} />

      <div style={dynamicStyles.mainRow}>
        {/* Left: Price Section */}
        <div style={dynamicStyles.leftCol}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
            <div style={{ 
              fontSize: isMobile ? 8 : 10, 
              fontWeight: 900, 
              color: "#ffaa00", 
              letterSpacing: "1.5px",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: isMobile ? "2px 6px" : "3px 10px",
              border: "1px solid #ff6a00",
              borderRadius: "4px",
              background: "rgba(255, 106, 0, 0.1)",
              textShadow: "0 0 10px rgba(255,170,0,0.3)"
            }}>
              <span>⚡ LIMITED TIME OFFER</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10 }}>
              <span style={{ ...styles.onlyText, fontSize: isMobile ? "1.2rem" : "2rem", lineHeight: 1 }}>Only</span>
              <span style={{ ...styles.amount, fontSize: isMobile ? "2.2rem" : "3.8rem", lineHeight: 1 }}>₹99</span>
            </div>
          </div>
        </div>

        {/* Center: Timer (Desktop) */}
        <div style={dynamicStyles.centerCol}>
          <DigitalTimer />
        </div>

        {/* Right: Timer (Mobile) + Button */}
        <div style={dynamicStyles.rightCol}>
          <div style={dynamicStyles.mobileTimer}>
            <DigitalTimer />
          </div>
          <EnrollButton onClick={onEnrollNow} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  cta: {
    width: "100%",
    maxWidth: 680,
    background: "linear-gradient(135deg, #1a1a1a 0%, #111 60%, #1c1410 100%)",
    borderRadius: 28,
    border: "1.5px solid rgba(255,160,30,0.18)",
    boxShadow:
      "0 0 40px rgba(255,130,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)",
    overflow: "hidden",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    zIndex: 9999,
  },
  ambientGlow: {
    position: "absolute", inset: 0, borderRadius: 28,
    background:
      "radial-gradient(ellipse at 20% 50%, rgba(255,140,0,0.07) 0%, transparent 60%)," +
      "radial-gradient(ellipse at 80% 50%, rgba(255,100,0,0.05) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  topRow: {
    display: "flex", 
    marginBottom: 14, position: "relative", zIndex: 1,
  },
  left: {
    flex: 1, display: "flex", flexDirection: "column",
    gap: 7,
  },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 5,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 100, padding: "4px 12px", width: "fit-content",
    fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)",
    letterSpacing: "1px", textTransform: "uppercase",
  },
  priceRow: { display: "flex", alignItems: "center", gap: 6 },
  onlyText: { fontSize: "1.1rem", fontWeight: 600, color: "rgba(255,255,255,0.9)" },
  amount: {
    fontSize: "2.9rem", fontWeight: 900,
    background: "linear-gradient(135deg, #ffcc44 0%, #ff8800 50%, #ff5500 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text", lineHeight: 1,
    filter: "drop-shadow(0 0 10px rgba(255,140,0,0.45))",
  },
  vDivider: {
    width: 1, height: 84,
    background: "linear-gradient(to bottom, transparent, rgba(255,150,0,0.3), transparent)",
    flexShrink: 0,
  },
  right: {
    flex: 1, display: "flex",
    alignItems: "center", justifyContent: "center",
  },

  // timer
  timerRoot: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
  timerLabel: {
    margin: 0, fontSize: 9, fontWeight: 700,
    color: "rgba(255,255,255,0.65)", letterSpacing: "2px", textTransform: "uppercase",
  },
  timerBox: {
    background: "#080808", padding: "10px 14px",
    borderRadius: 12, border: "1px solid rgba(255,140,0,0.22)",
    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.95), 0 0 18px rgba(255,100,0,0.07)",
    position: "relative", overflow: "hidden",
  },
  scanlines: {
    position: "absolute", inset: 0, borderRadius: 12,
    background:
      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
    pointerEvents: "none", zIndex: 2,
  },
  timerInner: {
    display: "flex", alignItems: "center", gap: 4,
    position: "relative", zIndex: 1,
  },
  segLabel: {
    fontSize: 8, fontWeight: 700,
    color: "rgba(255,255,255,0.38)", letterSpacing: "1px",
    textTransform: "uppercase", fontFamily: "'Poppins', sans-serif",
  },

  // button
  btn: {
    position: "relative", zIndex: 1, width: "100%",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
    padding: "15px 28px", border: "none", borderRadius: 12, cursor: "pointer",
    background: "linear-gradient(100deg, #ff9800 0%, #ff6200 45%, #ff4000 100%)",
    boxShadow:
      "0 6px 28px rgba(255,90,0,0.45), inset 0 1px 0 rgba(255,220,100,0.25)",
    transition: "transform 0.15s, box-shadow 0.15s",
    overflow: "hidden", fontFamily: "'Poppins', sans-serif",
  },
  btnHover: {
    transform: "translateY(-1px)",
    boxShadow:
      "0 10px 36px rgba(255,90,0,0.58), inset 0 1px 0 rgba(255,220,100,0.25)",
  },
  btnShine: {
    position: "absolute", inset: 0, borderRadius: 12,
    background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 55%)",
    pointerEvents: "none",
  },
  btnText: {
    fontSize: "1.15rem", fontWeight: 800,
    color: "#fff", letterSpacing: "0.2px",
  },
  btnIcon: {
    width: 34, height: 34,
    background: "rgba(255,255,255,0.18)", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
};