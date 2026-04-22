import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  return (
    <>
      {/* Banner Section */}
      <section className="banner-section float-start w-100">
        <div className="img-main-abnner d-inline-block w-100">
          <img alt="sm" src="/images/bg-bannerpic.jpg" />
        </div>
        <div className="main-bg-start"></div>
        <div className="container">
          <div className="banner-text-home">
            <div className="row row-cols-1 row-cols-lg-2 align-items-center g-lg-5">
              <div className="col">
                <span className="spm-smalll" data-aos="fade-up">Compleat Guide To Astrology</span>
                <h1 className="text-white my-3" data-aos="fade-down">
                  Let the Stars Shape
                  <span className="d-block">Your Journey</span>
                </h1>
                <p data-aos="fade-up">
                  Discover the cosmic narrative written in the stars! Learn astrology
                  online and gain the skills to understand planetary influences,
                  houses, and signs. Predict outcomes, guide life journeys, and explore the
                  mysteries of yourself and others.
                </p>
                <div className="mt-5">
                  <a href="#" className="btn btn-get-btn" data-aos="fade-up">ENROL NOW</a>
                </div>
              </div>
              <div className="col">
                <div className="main d-none d-lg-block">
                  <div className="big-circle">
                    <div className="icon-block"><img alt="web design icon" src="/images/as6.png" /></div>
                    <div className="icon-block"><img alt="game design icon" src="/images/as7.png" /></div>
                    <div className="icon-block"><img alt="game dev icon" src="/images/as8.png" /></div>
                    <div className="icon-block"><img alt="ui-ux icon" src="/images/as9.png" /></div>
                    <div className="icon-block"><img alt="ui-ux icon" src="/images/as10.png" /></div>
                    <div className="icon-block"><img alt="ui-ux icon" src="/images/as11.png" /></div>
                  </div>
                  <div className="circle">
                    <div className="icon-block"><img alt="app icon" src="/images/as1.png" /></div>
                    <div className="icon-block"><img alt="blockchain icon" src="/images/as2.png" /></div>
                    <div className="icon-block"><img alt="ar-vr icon" src="/images/as3.png" /></div>
                    <div className="icon-block"><img alt="artificial intelligence icon" src="/images/as4.png" /></div>
                    <div className="icon-block"><img alt="artificial intelligence icon" src="/images/as11.png" /></div>
                  </div>
                  <div className="center-logo">
                    <img alt="logo" src="/images/middle-img.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <main className="float-start w-100 body-main">
        <section className="about-part-section d-inline-block w-100">
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 g-5">
              <div className="col">
                <div className="img-box01 d-inline-block w-100 position-relative">
                  <figure className="moon-img">
                    <img alt="moon" src="/images/moon.jpg" />
                  </figure>
                  <figure className="big-imog" data-aos="fade-down">
                    <img alt="sm" src="/images/imok.png" />
                  </figure>
                  <div className="wt-yeras d-flex align-items-center text-center justify-content-center" data-aos="fade-up">
                    <h4 className="text-center">16 +
                      <span className="d-lg-block">Year Experience</span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col">
                <h5 data-aos="fade-down">About DS Astro</h5>
                <h2 className="text-white my-2" data-aos="fade-down">
                  Unlock a Brilliant Future with Astrology – Your Personal
                  <span className="d-lg-block" data-aos="fade-up">Expert Consultant Awaits!</span>
                </h2>
                <p className="mt-3" data-aos="fade-up">
                  Discover Your True Potential with Expert Astrology Guidance!
                  Step into a life full of clarity, confidence, and success. Our professional astrology
                  consultants help you unlock the secrets of your future with accurate, personalized insights.
                </p>
                <a href="#" className="read-btn btn mt-4" data-aos="fade-down"><span>Read more</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="horosocpe-div d-inline-block w-100">
          <div className="container">
            <div className="comon-heading text-center">
              <h5 className="sub-heading" data-aos="fade-up">Our Service</h5>
              <h2 className="text-white comon-heading mt-3 mb-3" data-aos="fade-up">Benefits of Learning from Us</h2>
            </div>
            <p className="col-lg-7 mx-auto d-block text-center subi-text" data-aos="fade-down">
              Our Astrologers Are Dedicated to Guiding You
            </p>
            <div className="row mt-5 gx-4">
              <div className="col-lg-3">
                <div className="comon-services02" data-aos="fade-down">
                  <figure><img alt="su" src="/images/3013143.png" /></figure>
                  <h4 className="text-white mt-3">Personal Horoscope</h4>
                  <p className="mt-2">Learn astrology from experienced and trusted mentors</p>
                  <span className="d-block"><i className="fas fa-ellipsis-h"></i></span>
                </div>
                <div className="comon-services02" data-aos="fade-up">
                  <figure><img alt="su" src="/images/8596897.png" /></figure>
                  <h4 className="text-white mt-3">Marriage/Relationship</h4>
                  <p className="mt-2">Gain practical knowledge with real-life case studies</p>
                  <span className="d-block"><i className="fas fa-ellipsis-h"></i></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="middle-io position-relative w-100 d-none d-lg-block" data-aos="fade-down">
                  <div className="img-anim">
                    <img alt="sui" src="/images/service_img2.png" />
                  </div>
                  <figure>
                    <img alt="sow" src="/images/sop.png" />
                  </figure>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="comon-services02" data-aos="fade-down">
                  <figure><img alt="su" src="/images/867780.png" /></figure>
                  <h4 className="text-white mt-3">Career & Business</h4>
                  <p className="mt-2">Understand career, relationships, and financial predictions deeply</p>
                  <span className="d-block"><i className="fas fa-ellipsis-h"></i></span>
                </div>
                <div className="comon-services02" data-aos="fade-up">
                  <figure><img alt="su" src="/images/9289285.png" /></figure>
                  <h4 className="text-white mt-3">Muhurat</h4>
                  <p className="mt-2">Opportunity to build your own career in astrology</p>
                  <span className="d-block"><i className="fas fa-ellipsis-h"></i></span>
                </div>
              </div>
            </div>
            <div className="tipsoft" data-aos="fade-up">
              <div className="d-md-flex justify-content-center align-items-center">
                <h2 className="text-white">Tips Of the day</h2>
                <p className="ms-md-5 col-lg-7">
                  <span className="me-3 text-white"><i className="fas fa-quote-left"></i></span>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="testimonial-video-section">
          <div className="headwrite">
            <h1>Testimonial</h1>
          </div>
          <div className="video-wrapper">
            <button className="nav-btn left">&#10094;</button>
            <div className="video-track">
              {[1, 2, 3, 4, 5].map((i) => (
                <div className="video-card" key={i}>
                  <video src="/videohomefinal.mp4" muted loop></video>
                </div>
              ))}
            </div>
            <button className="nav-btn right">&#10095;</button>
          </div>
        </section>

        {/* Courses Section */}
        <section className="reports-section" id="coursestart">
          <h2 className="title">Most Popular Reports</h2>
          <p className="subtitle">Trusted by 50,000+ seekers worldwide for clarity and life guidance.</p>
          <div className="report-container">
            <div className="report-card green">
              <div className="card-banner">
                <span className="discount">Mega DISCOUNT</span>
                <h3>Vedic Astrology</h3>
                <p className="price-big">₹699 Only</p>
              </div>
              <div className="card-content">
                <h4>Vedic Astrology</h4>
                <p>Discover your true purpose, karmic path & hidden strengths.</p>
                <div className="bottom">
                  <span className="price">₹699 <del>₹4100</del></span>
                  <div className="btn-group">
                    <button className="read-btn">Read</button>
                    <button className="buy-btn">Buy</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="report-card purple">
              <div className="card-banner">
                <span className="discount">Mega DISCOUNT</span>
                <h3>Numerology Astrology</h3>
                <p className="price-big">₹999 Only</p>
              </div>
              <div className="card-content">
                <h4>Numerology Astrology</h4>
                <p>Navigate your career, health & finance with precise cosmic wisdom.</p>
                <div className="bottom">
                  <span className="price">₹999 <del>₹5100</del></span>
                  <div className="btn-group">
                    <button className="read-btn">Read</button>
                    <button className="buy-btn">Buy</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="report-card red">
              <div className="card-banner">
                <span className="discount">Mega DISCOUNT</span>
                <h3>Face Reading</h3>
                <p className="price-big">₹599 Only</p>
              </div>
              <div className="card-content">
                <h4>Tarot Reading Course</h4>
                <p>Understand your emotional patterns, compatibility & marriage timing.</p>
                <div className="bottom">
                  <span className="price">₹599 <del>₹3100</del></span>
                  <div className="btn-group">
                    <button className="read-btn">Read</button>
                    <button className="buy-btn">Buy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="show-more-btn">Show More</button>
        </section>
      </main>

      <style>{`
        .banner-section { position: relative; padding: 100px 0; min-height: 600px; }
        .img-main-abnner { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .img-main-abnner img { width: 100%; height: 100%; object-fit: cover; }
        .banner-text-home { padding: 60px 0; position: relative; z-index: 1; }
        .spm-smalll { color: #f7c400; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; }
        .banner-text-home h1 { font-size: 48px; font-weight: 700; }
        .btn-get-btn { background: #ff6a00; color: #fff; padding: 12px 30px; border-radius: 30px; text-decoration: none; display: inline-block; }
        .main { position: relative; height: 400px; width: 100%; }
        .big-circle { width: 320px; height: 320px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; border: 2px dashed rgba(255,255,255,0.3); animation: rotate 30s linear infinite; }
        .circle { width: 220px; height: 220px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; border: 2px dashed rgba(255,255,255,0.3); animation: rotate 20s linear infinite reverse; }
        .icon-block { position: absolute; width: 45px; height: 45px; }
        .big-circle .icon-block:nth-child(1) { top: 10px; left: 50%; transform: translateX(-50%); }
        .big-circle .icon-block:nth-child(2) { top: 25%; right: 10px; }
        .big-circle .icon-block:nth-child(3) { bottom: 25%; right: 10px; }
        .big-circle .icon-block:nth-child(4) { bottom: 10px; left: 50%; transform: translateX(-50%); }
        .big-circle .icon-block:nth-child(5) { bottom: 25%; left: 10px; }
        .big-circle .icon-block:nth-child(6) { top: 25%; left: 10px; }
        .circle .icon-block:nth-child(1) { top: 5px; left: 50%; transform: translateX(-50%); }
        .circle .icon-block:nth-child(2) { top: 30%; right: 5px; }
        .circle .icon-block:nth-child(3) { bottom: 30%; right: 5px; }
        .circle .icon-block:nth-child(4) { bottom: 5px; left: 50%; transform: translateX(-50%); }
        .circle .icon-block:nth-child(5) { bottom: 30%; left: 5px; }
        .icon-block img { width: 100%; height: auto; }
        .center-logo { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; }
        .center-logo img { width: 100px; }
        @keyframes rotate { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }

        .about-part-section { padding: 80px 0; }
        .img-box01 { position: relative; display: flex; align-items: center; justify-content: center; }
        .moon-img { position: relative; z-index: 1; }
        .moon-img img { width: 100%; max-width: 450px; border-radius: 20px; }
        .big-imog { position: absolute; top: -30px; right: 0; z-index: 2; }
        .big-imog img { width: 180px; }
        .wt-yeras { position: absolute; bottom: 30px; left: 0; background: linear-gradient(135deg, #ff6a00, #ff0080); padding: 25px; border-radius: 15px; z-index: 3; }
        .wt-yeras h4 { color: #fff; font-size: 28px; margin: 0; font-weight: 700; }
        .wt-yeras span { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .read-btn { background: transparent; border: 2px solid #ff6a00; color: #ff6a00; padding: 10px 25px; border-radius: 25px; }
        .read-btn:hover { background: #ff6a00; color: #fff; }

        .horosocpe-div { padding: 80px 0; background: linear-gradient(180deg, #0b1220 0%, #1a1a2e 100%); }
        .sub-heading { color: #ff6a00; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; }
        .comon-heading { font-size: 36px; font-weight: 700; }
        .subi-text { color: #aaa; font-size: 16px; }
        .comon-services02 { text-align: center; padding: 30px; margin-bottom: 30px; }
        .comon-services02 figure img { width: 60px; height: 60px; object-fit: contain; }
        .comon-services02 h4 { font-size: 18px; margin-top: 15px; }
        .comon-services02 p { color: #aaa; font-size: 14px; }
        .comon-services02 span { color: #ff6a00; font-size: 24px; }
        .middle-io { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
        .middle-io .img-anim { margin-bottom: -50px; z-index: 2; }
        .middle-io .img-anim img { width: 200px; }
        .middle-io figure { margin: 0; }
        .middle-io figure img { width: 100%; max-width: 350px; }
        .img-anim { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .tipsoft { background: rgba(255,255,255,0.05); padding: 40px; border-radius: 20px; margin-top: 60px; }
        .tipsoft h2 { font-size: 28px; }

        .testimonial-video-section { padding: 60px 40px; overflow: hidden; background: #0b1220; }
        .headwrite { text-align: center; margin-bottom: 40px; }
        .headwrite h1 { color: #fff; font-size: 36px; font-weight: 600; }
        .video-wrapper { position: relative; width: 100%; max-width: 1400px; margin: 0 auto; }
        .video-track { display: flex; align-items: center; justify-content: center; gap: 20px; }
        .video-card { flex: 0 0 220px; transition: all 0.5s ease; }
        .video-card video { width: 100%; height: 320px; object-fit: cover; border-radius: 15px; }
        .nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: #fff; border: none; width: 50px; height: 50px; border-radius: 50%; font-size: 20px; cursor: pointer; z-index: 10; box-shadow: 0 5px 15px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; }
        .nav-btn.left { left: 20px; }
        .nav-btn.right { right: 20px; }
        .nav-btn:hover { background: #ff6a00; color: #fff; }

        .reports-section { text-align: center; padding: 80px 20px; background: #0b1220; }
        .reports-section .title { font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .reports-section .subtitle { color: #888; margin-bottom: 50px; font-size: 16px; }
        .report-container { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; max-width: 1200px; margin: 0 auto; }
        .report-card { width: 360px; border-radius: 15px; overflow: hidden; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s; }
        .report-card:hover { transform: translateY(-10px); }
        .card-banner { padding: 30px 25px; color: #fff; text-align: center; position: relative; min-height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .discount { position: absolute; top: 15px; left: 15px; background: #dc3545; padding: 5px 12px; font-size: 11px; border-radius: 5px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
        .card-banner h3 { font-size: 24px; margin: 0 0 10px 0; font-weight: 600; }
        .price-big { font-size: 28px; margin: 0; font-weight: 700; }
        .green .card-banner { background: linear-gradient(135deg, #198754 0%, #157347 100%); }
        .purple .card-banner { background: linear-gradient(135deg, #6c5ce7 0%, #5b4cdb 100%); }
        .red .card-banner { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); }
        .card-content { padding: 25px; text-align: left; }
        .card-content h4 { font-size: 20px; margin-bottom: 12px; color: #333; font-weight: 600; }
        .card-content p { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
        .bottom { display: flex; justify-content: space-between; align-items: center; }
        .price { font-size: 20px; font-weight: 700; color: #333; }
        .price del { color: #999; font-size: 14px; margin-left: 5px; }
        .btn-group { display: flex; gap: 8px; }
        .read-btn, .buy-btn { font-size: 13px; padding: 10px 20px; border-radius: 6px; cursor: pointer; border: none; font-weight: 500; }
        .read-btn { background: transparent; border: 1px solid #198754; color: #198754; }
        .buy-btn { background: #198754; color: #fff; }
        .purple .buy-btn { background: #6c5ce7; }
        .purple .read-btn { border-color: #6c5ce7; color: #6c5ce7; }
        .red .buy-btn { background: #dc3545; }
        .red .read-btn { border-color: #dc3545; color: #dc3545; }
        .show-more-btn { margin-top: 40px; padding: 14px 40px; background: #ff6a00; color: #fff; border: none; border-radius: 30px; cursor: pointer; font-weight: 600; font-size: 16px; transition: all 0.3s; }
        .show-more-btn:hover { background: #ff8533; transform: translateY(-2px); }
      `}</style>
    </>
  );
}

export default Home;
