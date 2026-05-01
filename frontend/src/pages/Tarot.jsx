import { useState, useEffect } from 'react';
import API_BASE from '../utils/api';

function Tarot() {
  const [stage, setStage] = useState('input'); // 'input', 'shuffling', 'select', 'drawing', 'result'
  const [question, setQuestion] = useState('');
  const [cardResult, setCardResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const startRitual = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please focus your mind and enter a question.');
      return;
    }
    setError('');
    setStage('shuffling');
    
    // Simulate shuffle duration
    setTimeout(() => {
      setStage('select');
    }, 2800);
  };

  const drawCard = async (idx) => {
    if (stage !== 'select') return;
    setSelectedIdx(idx);
    setStage('drawing');
    setCardResult(null);
    setFlipped(false);
    
    try {
      const res = await fetch(`${API_BASE}/api/tarot/draw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'The cosmic connection was lost.');
      
      setCardResult(data.card);
      
      // Wait for card to animate to center, then flip
      setTimeout(() => {
        setFlipped(true);
        setTimeout(() => setStage('result'), 600);
      }, 1000);
      
    } catch (err) {
      setError(err.message || 'Failed to draw a card.');
      setStage('input');
    }
  };

  const reset = () => {
    setStage('input');
    setCardResult(null);
    setSelectedIdx(null);
    setFlipped(false);
    setQuestion('');
  };

  // Generate 22 Major Arcana cards for the fan
  const totalCards = 22;
  const cards = Array.from({ length: totalCards }, (_, i) => i);

  return (
    <section className="tarot-ritual-container fade-in">
      {/* Mystical Background Overlay - Light Theme */}
      <div className="mystical-bg-light"></div>
      
      <div className="container position-relative z-index-2 py-5" style={{ minHeight: '85vh' }}>
        
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="tarot-title">The Mystic Tarot</h1>
          <div className="title-separator mx-auto"></div>
          <p className="tarot-subtitle">Connect with the ancient energies of the Oracle</p>
        </div>

        {error && <div className="alert alert-danger text-center mx-auto" style={{maxWidth: '500px', borderRadius: '12px'}}>{error}</div>}

        {/* Stage 1: Input */}
        {stage === 'input' && (
          <div className="row justify-content-center mt-5">
            <div className="col-md-6 text-center">
              <div className="ritual-input-box p-5">
                <div className="tarot-icon-large mb-4">✧</div>
                <h3 className="mb-3" style={{ color: '#1a1a2e', fontWeight: 700 }}>What seeks your heart?</h3>
                <form onSubmit={startRitual}>
                  <input 
                    type="text" 
                    className="mystic-input mb-4" 
                    placeholder="Enter your question here..." 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="mystic-btn w-100">
                    Focus &amp; Shuffle Deck
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2, 3, 4: Shuffling, Select, Drawing */}
        {(stage === 'shuffling' || stage === 'select' || stage === 'drawing') && (
          <div className="ritual-arena text-center">
            <h3 className="ritual-prompt mb-5">
              {stage === 'shuffling' && "Channeling your energy..."}
              {stage === 'select' && "The deck is ready. Choose your card."}
              {stage === 'drawing' && "Revealing your destiny..."}
            </h3>
            
            <div className={`deck-fan-container ${stage === 'shuffling' ? 'is-shuffling' : ''}`}>
              {cards.map((idx) => {
                // Calculate fan spread
                const offset = idx - (totalCards - 1) / 2;
                const angle = offset * 4.5; 
                const yOffset = Math.abs(offset) * 3;
                const xOffset = offset * 12;
                
                let isSelected = selectedIdx === idx;
                
                let style = {};
                let className = "ritual-card-back";
                
                if (stage === 'shuffling') {
                  style = { transform: `translate(${Math.random()*10 - 5}px, ${Math.random()*10 - 5}px) rotate(${Math.random()*10 - 5}deg)` };
                } else if (stage === 'select') {
                  style = { transform: `translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)` };
                } else if (stage === 'drawing') {
                  if (isSelected) {
                    style = { 
                      transform: `translate(0px, -150px) scale(1.6) rotate(0deg)`,
                      zIndex: 100,
                      opacity: 1 
                    };
                    className += " selected-card";
                  } else {
                    style = { 
                      transform: `translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`,
                      opacity: 0,
                      pointerEvents: 'none'
                    };
                  }
                }

                return (
                  <div 
                    key={idx} 
                    className={className} 
                    style={style}
                    onClick={() => drawCard(idx)}
                  >
                    <div className="card-pattern"></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stage 5: Result */}
        {stage === 'result' && cardResult && (
          <div className="row justify-content-center result-arena fade-in-slow">
            <div className="col-md-5 col-lg-4 text-center mb-4 mb-md-0">
              <div className="result-card-container mx-auto">
                <div className={`tarot-card-reveal ${flipped ? 'flipped' : ''}`}>
                  <div className="tarot-card-inner">
                    <div className="tarot-card-front-side">
                      <div className="ritual-card-back selected-card static-back">
                        <div className="card-pattern"></div>
                      </div>
                    </div>
                    <div className="tarot-card-back-side">
                      <div className="card-content">
                        <div className="card-symbol">{cardResult.symbol}</div>
                        <h4 className="card-title">{cardResult.name}</h4>
                        <div className={`card-badge ${cardResult.orientation === 'Upright' ? 'bg-upright' : 'bg-reversed'}`}>
                          {cardResult.orientation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={reset} className="mystic-outline-btn mt-5">
                Draw Another Card
              </button>
            </div>
            
            <div className="col-md-7 col-lg-6">
              <div className="reading-panel p-4 p-md-5">
                <h2 className="reading-heading mb-4">Oracle's Revelation</h2>
                
                <div className="meaning-block mb-4">
                  <span className="reading-label">Core Energy</span>
                  <p className="fs-5" style={{ color: '#4a4a6a', marginBottom: 0 }}>{cardResult.meaning}</p>
                </div>
                
                <div className="interpretation-block mb-4">
                  <span className="reading-label">Your Reading</span>
                  <p className="reading-text">{cardResult.interpretation}</p>
                </div>
                
                <div className="wisdom-block p-4 mt-4">
                  <span className="reading-label text-warning">Divine Guidance</span>
                  <p className="wisdom-text mb-0">{cardResult.wisdom}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        :root {
          --cosmic-accent: #ff6a00;
          --cosmic-accent-orange: #ff8c00;
          --cosmic-accent-pink: #e31b7a;
          --cosmic-gradient: linear-gradient(135deg, #e31b7a, #ff6a00, #ffb347);
          --cosmic-accent-soft: #ffe4f0;
          --cosmic-text: #1a1a2e;
          --cosmic-text-muted: #4a4a6a;
          --glass-border: #e0c8b8;
          --premium-shadow: 0 6px 20px rgba(0,0,0,0.08);
          --cosmic-bg: #f8f9fc;
          --cosmic-white: #ffffff;
        }

        .tarot-ritual-container {
          background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 50%, #f0f2f8 100%);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          padding: 60px 0 80px;
        }

        .mystical-bg-light {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
          background: 
            radial-gradient(ellipse at 20% 30%, rgba(255,106,0,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(227,27,122,0.02) 0%, transparent 50%);
        }

        .tarot-title {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: #1a1a2e;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #1a1a2e, #2d2d5e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .title-separator {
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          border-radius: 2px;
          margin: 15px auto;
        }

        .tarot-subtitle {
          color: #e31b7a;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 700;
          margin-top: 10px;
        }

        .ritual-input-box {
          background: var(--cosmic-white);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 28px;
          padding: 50px 40px !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .tarot-icon-large {
          font-size: 3.5rem;
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }

        .mystic-input {
          width: 100%;
          background: #f8f9fc;
          border: 1.5px solid #e0e0e8;
          border-radius: 16px;
          color: #1a1a2e;
          font-size: 1rem;
          padding: 16px 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .mystic-input:focus {
          outline: none;
          border-color: #ff6a00;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(255,106,0,0.1);
        }

        .mystic-input::placeholder {
          color: #aaa;
        }

        .mystic-btn {
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          color: #fff;
          border: none;
          padding: 16px;
          border-radius: 50px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .mystic-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(227,27,122,0.4);
        }

        .ritual-prompt {
          color: #1a1a2e;
          font-weight: 600;
          font-size: 1.3rem;
          letter-spacing: 1px;
        }

        .deck-fan-container {
          position: relative;
          height: 420px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .ritual-card-back {
          position: absolute;
          width: 140px;
          height: 210px;
          background: #ffffff;
          border: 2px solid #e0e0e8;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          will-change: transform;
          transform-origin: center center;
        }

        .ritual-card-back:hover {
          border-color: #ff6a00;
          box-shadow: 0 12px 28px rgba(255,106,0,0.2);
          transform: translateY(-8px) rotate(0deg) scale(1.05) !important;
        }

        .card-pattern {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border: 2px solid #e31b7a;
          border-radius: 50%;
          opacity: 0.15;
        }

        .ritual-card-back::after {
          content: '?';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          font-weight: 800;
          color: #e31b7a;
          opacity: 0.3;
        }

        .selected-card {
          transition: all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }

        .static-back {
          position: relative !important;
          transform: none !important;
          margin: 0 auto;
        }

        /* Result Card Styling */
        .result-card-container {
          width: 240px;
          height: 360px;
          perspective: 1000px;
        }

        .tarot-card-reveal {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .tarot-card-reveal.flipped {
          transform: rotateY(180deg);
        }

        .tarot-card-front-side, .tarot-card-back-side {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
        }

        .tarot-card-front-side {
          transform: rotateY(0deg);
        }

        .tarot-card-back-side {
          background: #ffffff;
          border: 3px solid #e31b7a;
          border-radius: 16px;
          transform: rotateY(180deg);
          box-shadow: 0 15px 40px rgba(227,27,122,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .card-content {
          text-align: center;
        }

        .card-symbol {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 800;
          color: #1a1a2e;
          margin-bottom: 10px;
          font-family: 'Playfair Display', serif;
        }

        .card-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .bg-upright {
          background: linear-gradient(135deg, rgba(40,167,69,0.15), rgba(40,167,69,0.05));
          color: #28a745;
          border: 1px solid rgba(40,167,69,0.3);
        }

        .bg-reversed {
          background: linear-gradient(135deg, rgba(220,53,69,0.15), rgba(220,53,69,0.05));
          color: #dc3545;
          border: 1px solid rgba(220,53,69,0.3);
        }

        .reading-panel {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          height: 100%;
        }

        .reading-heading {
          font-family: 'Playfair Display', serif;
          color: #1a1a2e;
          font-weight: 800;
          font-size: 1.8rem;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 15px;
        }

        .reading-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #e31b7a;
          margin-bottom: 12px;
        }

        .reading-text {
          color: #4a4a6a;
          font-weight: 500;
          line-height: 1.8;
          font-size: 1rem;
        }

        .wisdom-block {
          background: linear-gradient(135deg, #fff8f0, #ffffff);
          border-left: 4px solid #e31b7a;
          border-radius: 16px;
        }

        .wisdom-text {
          color: #1a1a2e;
          font-weight: 600;
          font-style: italic;
          line-height: 1.7;
        }

        .text-warning {
          color: #ff6a00 !important;
        }

        .mystic-outline-btn {
          background: transparent;
          border: 2px solid #ff6a00;
          color: #ff6a00;
          padding: 12px 28px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .mystic-outline-btn:hover {
          background: #ff6a00;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,106,0,0.3);
        }

        /* Animations */
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .fade-in-slow {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .ritual-input-box {
            padding: 30px 25px !important;
          }
          .deck-fan-container {
            height: 350px;
          }
          .ritual-card-back {
            width: 100px;
            height: 150px;
          }
          .result-card-container {
            width: 200px;
            height: 300px;
            margin-bottom: 30px;
          }
          .card-symbol {
            font-size: 32px;
          }
          .reading-panel {
            padding: 25px !important;
          }
          .reading-heading {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 576px) {
          .ritual-card-back {
            width: 80px;
            height: 120px;
          }
          .card-pattern {
            width: 35px;
            height: 35px;
          }
          .ritual-card-back::after {
            font-size: 16px;
          }
          .result-card-container {
            width: 170px;
            height: 255px;
          }
        }

        .z-index-2 {
          z-index: 2;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
      `}</style>
    </section>
  );
}

export default Tarot;