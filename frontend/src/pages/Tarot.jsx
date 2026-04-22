function Tarot() {
  const cards = [
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
        <div className="col-md-8">
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
              {cards.map((card, idx) => (
                <div key={idx} className="col-md-4">
                  <div className="card-mini p-3 text-center">
                    <h5>{card.name}</h5>
                    <p className="small text-muted">{card.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="tarot-reading p-4">
            <h3>Free Tarot Reading</h3>
            <p className="mb-3">Ask a question and draw a card</p>
            <div className="form-group mb-3">
              <input type="text" className="form-control" placeholder="Your question..." />
            </div>
            <button className="btn btn-primary w-100 mb-3">Draw a Card</button>
            <div className="card-display text-center p-4">
              <div className="tarot-card-back"></div>
              <p className="mt-3 text-muted">Click to reveal your card</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tarot-intro, .major-arcana, .tarot-reading { background: rgba(255,255,255,0.05); border-radius: 15px; }
        .tarot-intro h3, .tarot-reading h3 { color: #ff6a00; margin-bottom: 20px; }
        .tarot-intro p, .tarot-intro li { color: #ccc; line-height: 1.8; }
        .card-mini { background: rgba(255,255,255,0.08); border-radius: 10px; transition: 0.3s; }
        .card-mini:hover { background: rgba(255,255,255,0.15); transform: translateY(-5px); }
        .card-mini h5 { color: #fff; font-size: 16px; }
        .tarot-card-back { width: 120px; height: 200px; background: linear-gradient(135deg, #2c2c54, #1a1a2e); border-radius: 10px; margin: 0 auto; border: 2px solid #ff6a00; position: relative; }
        .tarot-card-back::before { content: '✦'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 40px; color: #ff6a00; }
      `}</style>
    </section>
  );
}

export default Tarot;
