function Astrologer() {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mb-4">Our Astrologers</h1>
          <p className="lead mb-5">Meet our team of expert astrologers dedicated to guiding you</p>
        </div>
      </div>
      <div className="row g-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-md-3">
            <div className="astrologer-card text-center">
              <div className="astro-image mb-3">
                <img src="/images/avatar.png" alt="Astrologer" className="rounded-circle" />
              </div>
              <h4>Damini Ma&apos;am</h4>
              <p className="text-muted">Vedic Astrology Expert</p>
              <p className="small">16+ years experience in Vedic Astrology, Numerology, and Tarot Reading</p>
              <div className="rating mb-2">
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
              </div>
              <button className="btn btn-primary btn-sm">Book Consultation</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .astrologer-card { background: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; transition: 0.3s; }
        .astrologer-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.1); }
        .astro-image img { width: 120px; height: 120px; object-fit: cover; border: 3px solid #ff6a00; }
        .astrologer-card h4 { color: #fff; margin-top: 15px; }
        .astrologer-card p { color: #aaa; }
        .rating i { margin: 0 2px; }
      `}</style>
    </section>
  );
}

export default Astrologer;
