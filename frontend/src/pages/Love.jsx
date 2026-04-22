function Love() {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1>Love & Relationship Astrology</h1>
          <p className="lead">Find your cosmic compatibility and relationship guidance</p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="love-content p-4">
            <h3>Love Compatibility Analysis</h3>
            <p>Discover how your stars align with your partner. Our love compatibility analysis examines:</p>
            <ul>
              <li>Sun Sign Compatibility</li>
              <li>Moon Sign Emotional Connection</li>
              <li>Venus-Mars Attraction Analysis</li>
              <li>7th House Marriage Prospects</li>
              <li>Long-term Relationship Potential</li>
            </ul>
            <h4 className="mt-4">Services We Offer:</h4>
            <div className="row g-3 mt-2">
              <div className="col-6">
                <div className="service-box p-3 text-center">
                  <i className="fas fa-heart text-danger fa-2x mb-2"></i>
                  <p className="mb-0">Marriage Matching</p>
                </div>
              </div>
              <div className="col-6">
                <div className="service-box p-3 text-center">
                  <i className="fas fa-ring text-warning fa-2x mb-2"></i>
                  <p className="mb-0">Engagement Muhurat</p>
                </div>
              </div>
              <div className="col-6">
                <div className="service-box p-3 text-center">
                  <i className="fas fa-user-friends text-info fa-2x mb-2"></i>
                  <p className="mb-0">Relationship Issues</p>
                </div>
              </div>
              <div className="col-6">
                <div className="service-box p-3 text-center">
                  <i className="fas fa-search text-success fa-2x mb-2"></i>
                  <p className="mb-0">Finding Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="love-calc p-4">
            <h3>Free Love Calculator</h3>
            <p>Check your compatibility percentage</p>
            <div className="form-group mb-3">
              <label>Your Name</label>
              <input type="text" className="form-control" placeholder="Enter your name" />
            </div>
            <div className="form-group mb-3">
              <label>Your Date of Birth</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Partner&apos;s Name</label>
              <input type="text" className="form-control" placeholder="Enter partner's name" />
            </div>
            <div className="form-group mb-3">
              <label>Partner&apos;s Date of Birth</label>
              <input type="date" className="form-control" />
            </div>
            <button className="btn btn-danger w-100">Calculate Love %</button>
          </div>
        </div>
      </div>

      <style>{`
        .love-content, .love-calc { background: rgba(255,255,255,0.05); border-radius: 15px; }
        .love-content h3, .love-calc h3 { color: #ff6a00; margin-bottom: 20px; }
        .love-content p, .love-content li { color: #ccc; line-height: 1.8; }
        .service-box { background: rgba(255,255,255,0.08); border-radius: 10px; transition: 0.3s; }
        .service-box:hover { background: rgba(255,255,255,0.15); transform: translateY(-5px); }
        .service-box p { color: #fff; font-size: 14px; }
        .love-calc label { color: #fff; margin-bottom: 8px; display: block; }
        .love-calc input { background: #222; border: 1px solid #444; color: #fff; }
      `}</style>
    </section>
  );
}

export default Love;
