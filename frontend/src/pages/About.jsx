function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1>100k+</h1>
            <p>Consultation Done</p>
          </div>
          <div className="hero-right">
            <h2>Dr. Lorem, ipsum dolor.</h2>
            <div className="cta-box">
              🏆 Get Your Star Blessing Back
            </div>
          </div>
        </div>
        <img src="/manimage.png" className="hero-img" alt="doctor" />
        <div className="about-box">
          <h3>About us</h3>
          <p>Home / About us</p>
        </div>
      </section>

      {/* About Our Astrologer */}
      <section className="about-section">
        <h2 className="about-title">About Our Astrologer</h2>
        <div className="about-container">
          <div className="about-text">
            <p>At our platform, astrology is not just a service—it is a sacred science rooted in deep knowledge, intuition, and spiritual wisdom.</p>
            <p>Our expert astrologer, <b>Damini Ma&apos;am</b>, is a highly respected and experienced practitioner who combines the timeless principles of Vedic astrology with modern-day insights to offer guidance that is both practical and transformative.</p>
            <p>With extensive experience in <b>Vedic Astrology, Tarot Reading, Numerology, and Spiritual Healing</b>, Damini has guided countless individuals toward clarity, confidence, and purpose.</p>
            <p>Her approach is compassionate, insightful, and result-oriented, helping people overcome life&apos;s challenges and align with their true path.</p>
          </div>
          <div className="about-video">
            <div className="scroll-box">
              <img src="/Parchmen.png" className="scroll-img" alt="scroll" />
              <div className="video-box">
                <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Unique */}
      <div className="unique-section">
        <h3 className="unique-title">What Makes Our Astrologer Unique?</h3>
        <p className="unique-text">Profound understanding of planetary movements and their real-life impact</p>
        <p className="unique-text">Personalized consultations tailored to each individual&apos;s situation</p>
        <p className="unique-text">Honest, confidential, and ethically grounded guidance</p>
        <p className="unique-text">A powerful blend of intuitive insight and scientific astrological methods</p>
      </div>

      {/* Aims and Objectives */}
      <section className="aims-section">
        <div className="container">
          <h2 className="aims-title">Our Aims and Objectives</h2>
          <p className="aims-desc">In today&apos;s fast-moving world, astrology is a powerful tool that connects ancient wisdom with modern life. When used correctly, it helps individuals gain clarity, make better decisions, and move forward with confidence and purpose.</p>
          <p className="aims-desc">Under the expert guidance of Damini Ma&apos;am, our mission is to simplify astrology and make it practical, accessible, and result-oriented for everyone.</p>
          <p className="aims-subtitle">The basic objective of the Institute is to:</p>
          <ul className="aims-list">
            <li><span className="tick">✔</span>To remove doubts and superstitions and prepare astrologers in a methodical manner.</li>
            <li><span className="tick">✔</span>To provide the highest quality education in astrology and promote its study for human welfare.</li>
            <li><span className="tick">✔</span>To combine traditional Vedic knowledge with modern techniques for accurate and reliable predictions.</li>
            <li><span className="tick">✔</span>To provide advanced astrology learning supported by modern tools and computer-based analysis.</li>
            <li><span className="tick">✔</span>To offer clear and practical guidance to overcome life&apos;s challenges.</li>
            <li><span className="tick">✔</span>To help individuals gain clarity in career, relationships, and financial decisions.</li>
            <li><span className="tick">✔</span>To solve life problems scientifically while preserving Vedic principles.</li>
            <li><span className="tick">✔</span>To empower individuals to become confident, independent, and spiritually aware.</li>
          </ul>
          <p className="aims-extra-text">Our mission is to guide individuals toward a brighter future through accurate insights, practical solutions, and meaningful spiritual growth.</p>
          <p className="aims-extra-text"><strong>Guiding Principle:</strong> Guided by knowledge, driven by purpose, and focused on your growth.</p>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="expertise-section">
        <div className="container">
          <h2 className="expertise-title">Areas of Expertise</h2>
          <div className="expertise-list">
            <div className="expertise-item">Kundali (Birth Chart) Analysis – Gain deep insights into your past, present, and future</div>
            <div className="expertise-item">Love & Relationship Guidance – Find clarity and balance in matters of the heart</div>
            <div className="expertise-item">Career & Business Predictions – Make confident and informed decisions</div>
            <div className="expertise-item">Marriage & Compatibility – Discover meaningful and harmonious connections</div>
            <div className="expertise-item">Health & Life Path Insights – Achieve overall well-being and direction</div>
            <div className="expertise-item">Spiritual Remedies & Healing – Attract positivity and inner peace</div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section { position: relative; height: 300px; margin-top: 100px; background: linear-gradient(90deg, #f7c400 40%, #f57c00 60%); overflow: hidden; }
        .hero-content { display: flex; justify-content: space-between; align-items: center; height: 100%; padding: 0 60px; }
        .hero-left h1 { font-size: 70px; color: #b30000; font-weight: 700; }
        .hero-left p { font-size: 22px; color: #b30000; }
        .hero-right { text-align: right; }
        .hero-right h2 { font-size: 32px; color: #fff; font-family: cursive; }
        .cta-box { margin-top: 10px; display: inline-block; background: #ffcc00; padding: 10px 20px; border-radius: 10px; font-weight: 600; }
        .hero-img { position: absolute; bottom: 0; left: 45%; transform: translateX(-50%); height: 100%; object-fit: contain; }
        .about-box { position: absolute; bottom: -30px; left: 60px; background: #fff; padding: 20px 30px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .about-box h3 { color: #b30000; margin: 0; }
        .about-box p { margin: 5px 0 0; font-size: 14px; }
        @media(max-width:768px) {
          .hero-section { height: auto; padding: 30px 15px; }
          .hero-content { flex-direction: column; text-align: center; padding: 0; }
          .hero-left h1 { font-size: 40px; }
          .hero-right { text-align: center; margin-top: 10px; }
          .hero-img { position: static; transform: none; height: 200px; margin-top: 10px; }
          .about-box { position: static; margin-top: 20px; }
        }

        .about-section { padding: 60px; }
        .about-title { text-align: center; font-size: 32px; margin-bottom: 40px; font-weight: 700; color: #fff; }
        .about-title::before { content: "☀"; display: block; color: orange; font-size: 24px; margin-bottom: 5px; }
        .about-container { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .about-text p { margin-bottom: 20px; line-height: 1.8; color: #fff; }
        .scroll-box { position: relative; max-width: 600px; margin: auto; }
        .scroll-img { width: 100%; display: block; }
        .video-box { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 70%; }
        .video-box iframe { width: 100%; height: 220px; border-radius: 6px; }
        @media(max-width:768px) {
          .about-container { grid-template-columns: 1fr; }
          .about-section { padding: 30px 15px; }
          .video-box iframe { height: 180px; }
        }

        .unique-section { margin-top: 60px; text-align: center; padding: 40px 20px; }
        .unique-title { font-size: 38px; font-weight: 800; margin-bottom: 35px; background: linear-gradient(90deg, #ff6a00, #ff0080, #6a00ff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientMove 4s linear infinite; }
        .unique-text { max-width: 600px; margin: 12px auto; padding: 14px 18px; border-radius: 14px; background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); color: #eee; font-size: 15.5px; line-height: 1.7; transition: 0.4s; position: relative; overflow: hidden; }
        .unique-text::before { content: ""; position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: linear-gradient(#ff6a00, #ff0080); opacity: 0.7; transition: 0.4s; }
        .unique-text:hover { transform: translateY(-5px) scale(1.02); background: rgba(255,255,255,0.12); box-shadow: 0 15px 40px rgba(255,0,128,0.2); color: #fff; }
        .unique-text:hover::before { width: 6px; opacity: 1; }
        @keyframes gradientMove { 0% { background-position: 0% } 100% { background-position: 200% } }

        .aims-section { padding: 60px 20px; text-align: center; }
        .aims-title { font-size: 36px; font-weight: 800; margin-bottom: 25px; background: linear-gradient(90deg, #ff6a00, #ff0080, #6a00ff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientMove 4s linear infinite; }
        .aims-desc { max-width: 750px; margin: 0 auto 15px; color: #ddd; line-height: 1.8; font-size: 15px; }
        .aims-subtitle { margin: 30px 0 20px; font-size: 18px; font-weight: 600; color: #fff; }
        .aims-list { list-style: none; padding: 0; max-width: 800px; margin: auto; }
        .aims-list li { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 15px; padding: 14px 18px; border-radius: 14px; background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); color: #eee; font-size: 15px; line-height: 1.7; transition: 0.4s; position: relative; overflow: hidden; }
        .aims-list li::before { content: ""; position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: linear-gradient(#ff6a00, #ff0080); opacity: 0.7; transition: 0.4s; }
        .aims-list li:hover { transform: translateY(-5px) scale(1.02); background: rgba(255,255,255,0.12); box-shadow: 0 15px 40px rgba(255,0,128,0.2); color: #fff; }
        .aims-list li:hover::before { width: 6px; opacity: 1; }
        .tick { min-width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, #ff6a00, #ff0080); display: flex; align-items: center; justify-content: center; font-size: 13px; margin-top: 3px; }
        .aims-extra-text { max-width: 700px; margin: 20px auto 0; color: #ccc; line-height: 1.7; font-size: 14.5px; }
        @media(max-width:768px) { .aims-title { font-size: 26px; } .aims-list li { padding: 12px; } }

        .expertise-section { padding: 60px 20px; text-align: center; }
        .expertise-title { font-size: 36px; font-weight: 800; margin-bottom: 35px; background: linear-gradient(90deg, #ff6a00, #ff0080, #6a00ff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientMove 4s linear infinite; }
        .expertise-list { max-width: 800px; margin: auto; }
        .expertise-item { margin-bottom: 15px; padding: 15px 20px; border-radius: 14px; background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); color: #eee; font-size: 15.5px; line-height: 1.7; transition: 0.4s; position: relative; overflow: hidden; }
        .expertise-item::before { content: ""; position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: linear-gradient(#ff6a00, #ff0080); opacity: 0.7; transition: 0.4s; }
        .expertise-item:hover { transform: translateY(-5px) scale(1.02); background: rgba(255,255,255,0.12); box-shadow: 0 15px 40px rgba(255,0,128,0.2); color: #fff; }
      `}</style>
    </>
  );
}

export default About;
