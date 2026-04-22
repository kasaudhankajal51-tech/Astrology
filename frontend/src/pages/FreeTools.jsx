function FreeTools() {
  const tools = [
    { name: 'Kundali / Birth Chart', desc: 'Generate your free birth chart', icon: 'fa-star' },
    { name: 'Daily Horoscope', desc: 'Read your daily predictions', icon: 'fa-sun' },
    { name: 'Love Calculator', desc: 'Check compatibility with your partner', icon: 'fa-heart' },
    { name: 'Numerology Calculator', desc: 'Calculate your life path number', icon: 'fa-calculator' },
    { name: 'Moonsign Calculator', desc: 'Find your moon sign', icon: 'fa-moon' },
    { name: 'Sun Sign Calculator', desc: 'Know your zodiac sign', icon: 'fa-sun' },
  ];

  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1>Free Astrology Tools</h1>
          <p className="lead">Explore our collection of free astrology calculators and tools</p>
        </div>
      </div>
      <div className="row g-4">
        {tools.map((tool, idx) => (
          <div key={idx} className="col-md-4">
            <div className="tool-card text-center p-4">
              <i className={`fas ${tool.icon} fa-3x mb-3`}></i>
              <h4>{tool.name}</h4>
              <p className="text-muted">{tool.desc}</p>
              <button className="btn btn-outline-primary">Use Tool</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .tool-card { background: rgba(255,255,255,0.05); border-radius: 15px; transition: 0.3s; }
        .tool-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.1); }
        .tool-card i { color: #ff6a00; }
        .tool-card h4 { color: #fff; margin: 15px 0; }
      `}</style>
    </section>
  );
}

export default FreeTools;
