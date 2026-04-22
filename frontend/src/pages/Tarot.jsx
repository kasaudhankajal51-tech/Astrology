import { useState } from 'react';
import API_BASE from '../utils/api';

function Tarot() {
  const [question, setQuestion] = useState('');
  const [cardResult, setCardResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flipped, setFlipped] = useState(false);

  const drawCard = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question to focus your energy.');
      return;
    }
    setLoading(true);
    setError('');
    setFlipped(false);
    setCardResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/tarot/draw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || data.message || 'The cosmic connection was lost.');
      setCardResult(data.card);
      // Automatically flip the card after a short delay for effect
      setTimeout(() => setFlipped(true), 100);
    } catch (err) {
      setError(err.message || 'Failed to draw a card.');
    } finally {
      setLoading(false);
    }
  };

  const majorCards = [
    { name: 'The Fool', meaning: 'New beginnings, innocence, spontaneity' },
    { name: 'The Magician', meaning: 'Manifestation, resourcefulness, power' },
    { name: 'The High Priestess', meaning: 'Intuition, sacred knowledge, divine feminine' },
    { name: 'The Empress', meaning: 'Femininity, beauty, nature, abundance' },
    { name: 'The Emperor', meaning: 'Authority, structure, father figure' },
    { name: 'The Hierophant', meaning: 'Spiritual wisdom, tradition, conformity' },
  ];

  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1>Tarot Reading</h1>
          <p className="lead">Discover insights through the ancient art of Tarot</p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-7 col-lg-8">
          <div className="tarot-intro p-4 mb-4">
            <h3>About Tarot</h3>
            <p>Tarot cards are a powerful tool for divination and self-discovery. Each of the 78 cards in a Tarot deck carries deep symbolic meanings that can provide guidance on your life journey.</p>
            <h4 className="mt-4">Types of Readings:</h4>
            <ul>
              <li><strong>Single Card Reading:</strong> Quick guidance for daily situations</li>
              <li><strong>Three Card Spread:</strong> Past, Present, Future</li>
              <li><strong>Celtic Cross:</strong> In-depth life analysis</li>
              <li><strong>Relationship Spread:</strong> Love and compatibility insights</li>
            </ul>
          </div>
          <div className="major-arcana p-4">
            <h4>Major Arcana Cards</h4>
            <div className="row g-3 mt-3">
              {majorCards.map((card, idx) => (
                <div key={idx} className="col-md-6 col-lg-4">
                  <div className="card-mini p-3 text-center h-100 d-flex flex-column justify-content-center">
                    <h5>{card.name}</h5>
                    <p className="small text-muted mb-0">{card.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-5 col-lg-4">
          <div className="tarot-reading p-4 h-100 d-flex flex-column">
            <h3>Free Tarot Reading</h3>
            <p className="mb-3">Ask a question and draw a card</p>
            <form onSubmit={drawCard} className="mb-4">
              <div className="form-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Your question..." 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2" /> Drawing...</> : 'Draw a Card'}
              </button>
            </form>
            
            {error && <div className="alert alert-danger py-2 text-center mb-4">{error}</div>}

            <div className="card-display text-center p-3 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
              {!cardResult ? (
                <>
                  <div className="tarot-card-back pulse-animation"></div>
                  <p className="mt-3 text-muted">Focus on your intent and draw</p>
                </>
              ) : (
                <div className={`tarot-card-reveal ${flipped ? 'flipped' : ''}`}>
                  <div className="tarot-card-inner">
                    <div className="tarot-card-front">
                      <div className="tarot-card-back"></div>
                    </div>
                    <div className="tarot-card-back-revealed">
                      <div className="card-content">
                        <h4 className="text-warning mb-1">{cardResult.name}</h4>
                        <span className={`badge ${cardResult.orientation === 'Upright' ? 'bg-success' : 'bg-danger'} mb-3`}>
                          {cardResult.orientation}
                        </span>
                        <div className="card-meaning">
                          <p className="small mb-2 text-white"><strong>Meaning:</strong> {cardResult.meaning}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cardResult && flipped && (
        <div className="row mt-4 fade-in">
          <div className="col-12">
            <div className="interpretation-box p-4 text-center">
              <h3 className="text-warning mb-3">Oracle&apos;s Interpretation</h3>
              <p className="lead text-white mb-4">"{cardResult.interpretation}"</p>
              <div className="wisdom-box mx-auto p-3" style={{ maxWidth: '600px' }}>
                <h6 className="text-muted text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Wisdom</h6>
                <p className="mb-0 text-info">{cardResult.wisdom}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .tarot-intro, .major-arcana, .tarot-reading, .interpretation-box { background: rgba(255,255,255,0.05); border-radius: 15px; }
        .tarot-intro h3, .tarot-reading h3 { color: #ff6a00; margin-bottom: 20px; }
        .tarot-intro p, .tarot-intro li { color: #ccc; line-height: 1.8; }
        .card-mini { background: rgba(255,255,255,0.08); border-radius: 10px; transition: 0.3s; }
        .card-mini:hover { background: rgba(255,255,255,0.15); transform: translateY(-5px); }
        .card-mini h5 { color: #fff; font-size: 16px; }
        .tarot-reading input { background: #222; border: 1px solid #444; color: #fff; }
        .tarot-reading input:focus { background: #2a2a2a; border-color: #ff6a00; color: #fff; box-shadow: 0 0 0 0.25rem rgba(255, 106, 0, 0.25); }
        
        /* Tarot Card Flip Animation */
        .tarot-card-reveal { width: 180px; height: 300px; perspective: 1000px; margin: 0 auto; }
        .tarot-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s; transform-style: preserve-3d; }
        .tarot-card-reveal.flipped .tarot-card-inner { transform: rotateY(180deg); }
        .tarot-card-front, .tarot-card-back-revealed { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 10px; }
        .tarot-card-back-revealed { background: linear-gradient(135deg, #2a0845, #6441A5); transform: rotateY(180deg); display: flex; align-items: center; justify-content: center; border: 2px solid #ff6a00; box-shadow: 0 0 20px rgba(255, 106, 0, 0.3); padding: 15px; }
        
        .tarot-card-back { width: 120px; height: 200px; background: linear-gradient(135deg, #2c2c54, #1a1a2e); border-radius: 10px; margin: 0 auto; border: 2px solid #ff6a00; position: relative; }
        .tarot-card-front .tarot-card-back { width: 100%; height: 100%; }
        .tarot-card-back::before { content: '✦'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 40px; color: #ff6a00; }
        .pulse-animation { animation: pulse 2s infinite; }
        
        .wisdom-box { background: rgba(0,0,0,0.2); border-left: 3px solid #0dcaf0; border-radius: 4px; }
        .fade-in { animation: fadeIn 0.8s ease-in; }
        
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(255, 106, 0, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

export default Tarot;
