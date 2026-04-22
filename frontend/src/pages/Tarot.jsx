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
          background-color: #0b0c10;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .mystical-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at center, rgba(30,10,60,0.4) 0%, rgba(10,5,20,0.9) 70%, #050508 100%);
          z-index: 1;
        }
        .z-index-2 { z-index: 2; }
        
        .tarot-title {
          font-family: 'Merriweather Sans', serif;
          font-weight: 800;
          font-size: 3rem;
          background: linear-gradient(to right, #ffd700, #ff8c00, #ff0080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .tarot-subtitle { color: #aaa; font-size: 1.1rem; letter-spacing: 1px; }

        /* Input Arena */
        .ritual-input-box {
          background: rgba(20, 15, 35, 0.6);
          border: 1px solid rgba(255, 106, 0, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,106,0,0.05);
        }
        .tarot-icon-large { font-size: 3rem; color: #ff6a00; text-shadow: 0 0 20px #ff6a00; animation: pulseGlow 3s infinite; }
        
        .mystic-input {
          width: 100%;
          background: rgba(0,0,0,0.5);
          border: none;
          border-bottom: 2px solid #ff6a00;
          color: #fff;
          font-size: 1.2rem;
          padding: 15px;
          text-align: center;
          outline: none;
          transition: all 0.3s;
        }
        .mystic-input:focus { background: rgba(0,0,0,0.8); border-bottom-color: #ffd700; box-shadow: 0 10px 20px -10px rgba(255,215,0,0.3); }
        .mystic-input::placeholder { color: #666; font-style: italic; }

        .mystic-btn {
          background: linear-gradient(135deg, #ff6a00, #ee0979);
          border: none;
          color: white;
          padding: 15px 30px;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 5px 20px rgba(238, 9, 121, 0.4);
        }
        .mystic-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(238, 9, 121, 0.6); }

        .mystic-outline-btn {
          background: transparent;
          border: 1px solid #ff6a00;
          color: #ff6a00;
          padding: 10px 25px;
          border-radius: 25px;
          transition: all 0.3s;
        }
        .mystic-outline-btn:hover { background: rgba(255,106,0,0.1); box-shadow: 0 0 15px rgba(255,106,0,0.4); }

        /* Arena & Fan */
        .ritual-arena { margin-top: 80px; height: 400px; position: relative; }
        .ritual-prompt { font-family: 'Merriweather Sans', serif; color: #ffd700; text-shadow: 0 0 10px rgba(255,215,0,0.5); animation: fadePulse 2s infinite alternate; }

        .deck-fan-container {
          position: relative;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          margin-top: 100px;
          perspective: 1000px;
        }
        
        .ritual-card-back {
          position: absolute;
          width: 80px;
          height: 140px;
          background: linear-gradient(135deg, #2a0845, #100b20);
          border: 2px solid #ff6a00;
          border-radius: 8px;
          transform-origin: bottom center;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s, box-shadow 0.3s;
          cursor: pointer;
          box-shadow: -5px 0 15px rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .ritual-card-back .card-pattern {
          width: 90%; height: 92%;
          border: 1px dashed rgba(255,106,0,0.5);
          background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,106,0,0.05) 10px, rgba(255,106,0,0.05) 20px);
          border-radius: 4px;
        }
        .ritual-card-back::after {
          content: '✧'; position: absolute; font-size: 24px; color: #ff6a00; text-shadow: 0 0 10px #ff6a00;
        }

        .deck-fan-container:not(.is-shuffling) .ritual-card-back:hover {
          z-index: 50 !important;
          box-shadow: 0 0 30px rgba(255,106,0,0.8);
          /* The hover transform adds a slight pop up */
          margin-bottom: 20px;
          border-color: #ffd700;
        }
        .selected-card { box-shadow: 0 0 50px rgba(255,106,0,1); cursor: default; }

        /* Shuffling Animation overlay */
        .is-shuffling .ritual-card-back { animation: fastShuffle 0.2s infinite; }

        /* Reading Panel & Flip */
        .result-arena { margin-top: 40px; }
        .reading-panel {
          background: rgba(20, 15, 30, 0.8);
          border: 1px solid rgba(138, 43, 226, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(15px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .reading-heading { color: #ff6a00; font-family: 'Merriweather Sans', serif; border-bottom: 1px solid rgba(255,106,0,0.2); padding-bottom: 15px; }
        .reading-label { display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 8px; }
        .reading-text { font-size: 1.15rem; line-height: 1.8; color: #e0e0e0; }
        
        .wisdom-block {
          background: rgba(255, 106, 0, 0.05);
          border-left: 4px solid #ff6a00;
          border-radius: 0 10px 10px 0;
        }
        .wisdom-text { font-size: 1.1rem; color: #ffd700; font-style: italic; }

        /* 3D Card Flip */
        .result-card-container { width: 220px; height: 380px; perspective: 1000px; }
        .tarot-card-reveal { width: 100%; height: 100%; }
        .tarot-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-style: preserve-3d; }
        .tarot-card-reveal.flipped .tarot-card-inner { transform: rotateY(180deg); }
        .tarot-card-front-side, .tarot-card-back-side { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 12px; }
        
        .tarot-card-front-side .static-back { position: relative; width: 100%; height: 100%; transform: none !important; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
        
        .tarot-card-back-side { 
          background: linear-gradient(135deg, #1f1c2c, #928dab);
          transform: rotateY(180deg);
          border: 2px solid #ffd700;
          box-shadow: 0 0 40px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(0,0,0,0.8);
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: 20px;
        }
        .card-symbol { font-size: 4rem; color: #ffd700; text-shadow: 0 2px 10px rgba(0,0,0,0.5); margin-bottom: 20px; }
        .card-title { font-family: 'Merriweather Sans', serif; font-weight: bold; color: #fff; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 1px; }
        .card-badge { padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-top: 15px; }
        .bg-upright { background: rgba(40, 167, 69, 0.2); border: 1px solid #28a745; color: #28a745; }
        .bg-reversed { background: rgba(220, 53, 69, 0.2); border: 1px solid #dc3545; color: #dc3545; }

        /* Animations */
        .fade-in { animation: fadeIn 0.5s ease-in both; }
        .fade-in-slow { animation: fadeIn 1s ease-in both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadePulse { from { opacity: 0.7; } to { opacity: 1; } }
        @keyframes pulseGlow { 0% { text-shadow: 0 0 10px #ff6a00; transform: scale(1); } 50% { text-shadow: 0 0 30px #ff6a00, 0 0 50px #ff0080; transform: scale(1.1); } 100% { text-shadow: 0 0 10px #ff6a00; transform: scale(1); } }
        @keyframes fastShuffle { 0% { transform: translate(0,0); } 25% { transform: translate(2px,-2px); } 50% { transform: translate(-2px,0); } 75% { transform: translate(0,2px); } 100% { transform: translate(0,0); } }
      `}</style>
    </section>
  );
}

export default Tarot;
