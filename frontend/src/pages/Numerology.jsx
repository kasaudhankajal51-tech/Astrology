function Numerology() {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1>Numerology</h1>
          <p className="lead">Discover the power of numbers in your life</p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="numero-card p-4">
            <h3>What is Numerology?</h3>
            <p>Numerology is the study of numbers and their mystical significance in our lives. Each number carries a unique vibration and meaning that can reveal insights about your personality, destiny, and life path.</p>
            <h4 className="mt-4">Key Numbers in Your Life:</h4>
            <ul>
              <li><strong>Life Path Number:</strong> Your core personality and life purpose</li>
              <li><strong>Destiny Number:</strong> Your natural talents and abilities</li>
              <li><strong>Soul Urge Number:</strong> Your inner desires and motivations</li>
              <li><strong>Personality Number:</strong> How others perceive you</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="numero-calc p-4">
            <h3>Free Numerology Calculator</h3>
            <div className="form-group mb-3">
              <label>Your Name</label>
              <input type="text" className="form-control" placeholder="Enter your full name" />
            </div>
            <div className="form-group mb-3">
              <label>Date of Birth</label>
              <input type="date" className="form-control" />
            </div>
            <button className="btn btn-primary w-100">Calculate My Numbers</button>
          </div>
        </div>
      </div>

      <style>{`
        .numero-card { background: rgba(255,255,255,0.05); border-radius: 15px; }
        .numero-card h3, .numero-calc h3 { color: #ff6a00; margin-bottom: 20px; }
        .numero-card p, .numero-card li { color: #ccc; line-height: 1.8; }
        .numero-calc { background: rgba(255,255,255,0.08); border-radius: 15px; }
        .numero-calc label { color: #fff; margin-bottom: 8px; display: block; }
        .numero-calc input { background: #222; border: 1px solid #444; color: #fff; }
      `}</style>
    </section>
  );
}

export default Numerology;
