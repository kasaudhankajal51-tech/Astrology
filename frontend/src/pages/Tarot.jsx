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
      {/* Mystical Background Overlay */}
      <div className="mystical-bg"></div>
      
      <div className="container position-relative z-index-2 py-5" style={{ minHeight: '85vh' }}>
        
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="tarot-title">The Mystic Tarot</h1>
          <p className="tarot-subtitle">Connect with the ancient energies of the Oracle</p>
        </div>

        {error && <div className="alert alert-danger text-center mx-auto" style={{maxWidth: '500px'}}>{error}</div>}

        {/* Stage 1: Input */}
        {stage === 'input' && (
          <div className="row justify-content-center mt-5">
            <div className="col-md-6 text-center">
              <div className="ritual-input-box p-5">
                <div className="tarot-icon-large mb-4">✧</div>
                <h3 className="text-white mb-3">What seeks your heart?</h3>
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
                // Spread from -50deg to +50deg
                const offset = idx - (totalCards - 1) / 2;
                const angle = offset * 4.5; 
                const yOffset = Math.abs(offset) * 3;
                const xOffset = offset * 12;
                
                let isSelected = selectedIdx === idx;
                
                // Style logic based on stage
                let style = {};
                let className = "ritual-card-back";
                
                if (stage === 'shuffling') {
                  // Cards stacked, slight random jitter
                  style = { transform: `translate(${Math.random()*10 - 5}px, ${Math.random()*10 - 5}px) rotate(${Math.random()*10 - 5}deg)` };
                } else if (stage === 'select') {
                  style = { transform: `translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)` };
                } else if (stage === 'drawing') {
                  if (isSelected) {
                    // Fly to center, grow, rotate to 0
                    style = { 
                      transform: `translate(0px, -150px) scale(1.6) rotate(0deg)`,
                      zIndex: 100,
                      opacity: 1 
                    };
                    className += " selected-card";
                  } else {
                    // Fade out other cards
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
                  <p className="text-white fs-5">{cardResult.meaning}</p>
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
        .tarot-ritual-container {
          background-color: var(--cosmic-bg);
          color: var(--cosmic-text);
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }

        .tarot-title {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 3.8rem);
          color: var(--cosmic-text);
          margin-bottom: 0.5rem;
        }

        .tarot-subtitle {
          color: var(--cosmic-accent-pink);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 800;
        }

        .ritual-input-box {
          background: var(--cosmic-white);
          border: 1px solid var(--glass-border);
          border-radius: 40px;
          padding: 60px !important;
          box-shadow: var(--premium-shadow);
        }

        .tarot-icon-large {
          font-size: 3rem;
          background: var(--cosmic-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }

        .mystic-input {
          width: 100%;
          background: var(--cosmic-bg);
          border: 1.5px solid var(--glass-border);
          border-radius: 20px;
          color: var(--cosmic-text);
          font-size: 1.1rem;
          padding: 18px;
          text-align: center;
          transition: 0.3s;
        }

        .mystic-input:focus {
          background: var(--cosmic-white);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 0 0 4px var(--cosmic-accent-soft);
        }

        .mystic-btn {
          background: var(--cosmic-gradient);
          color: #fff;
          border: none;
          padding: 18px;
          border-radius: 50px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          box-shadow: 0 10px 25px rgba(227, 27, 122, 0.3);
        }

        .mystic-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(227, 27, 122, 0.5);
        }

        .ritual-card-back {
          background: var(--cosmic-white);
          border: 2px solid var(--glass-border);
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }

        .ritual-card-back .card-pattern {
          border-color: var(--cosmic-accent-pink);
          opacity: 0.2;
        }

        .ritual-card-back::after {
          color: var(--cosmic-accent-pink);
          text-shadow: none;
        }

        .reading-panel {
          background: var(--cosmic-white);
          border: 1px solid var(--glass-border);
          border-radius: 40px;
          box-shadow: var(--premium-shadow);
        }

        .reading-heading {
          font-family: 'Playfair Display', serif;
          color: var(--cosmic-text);
          font-weight: 700;
          border-color: var(--glass-border);
        }

        .reading-text {
          color: var(--cosmic-text-muted);
          font-weight: 500;
        }

        .wisdom-block {
          background: var(--cosmic-accent-soft);
          border-left: 5px solid var(--cosmic-accent-pink);
        }

        .wisdom-text {
          color: var(--cosmic-text);
          font-weight: 600;
        }

        .tarot-card-back-side {
          background: var(--cosmic-white);
          border: 3px solid var(--cosmic-accent-pink);
          box-shadow: 0 15px 40px rgba(227, 27, 122, 0.2);
        }

        .card-title {
          color: var(--cosmic-text);
          font-family: 'Playfair Display', serif;
        }

        .text-gradient {
          background: var(--cosmic-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        @keyframes pulseGlow { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
      `}</style>
    </section>
  );
}

export default Tarot;
