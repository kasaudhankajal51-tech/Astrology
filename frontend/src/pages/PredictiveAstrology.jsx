import { useState } from 'react';

function PredictiveAstrology() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    experience: 'beginner'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Enrollment form submitted! Redirecting to payment...');
  };

  const handlePayment = () => {
    alert('Redirecting to secure payment gateway...\nCourse Fee: ₹999');
  };

  const courseStats = [
    { icon: '📅', value: '25-30', label: 'Classes' },
    { icon: '⏰', value: '2 Days', label: 'Per Week' },
    { icon: '💻', value: 'Live', label: 'Online Mode' },
    { icon: '📜', value: '100%', label: 'Certificate' }
  ];

  const learningTopics = [
    { icon: '♈', title: '12 Zodiac Signs', desc: 'Rashis characteristics & behaviors' },
    { icon: '🪐', title: '9 Planets', desc: 'Navagrahas effects & influences' },
    { icon: '🏠', title: '12 Houses', desc: 'Bhavas life areas & significations' },
    { icon: '🌙', title: '27 Nakshatras', desc: 'Lunar Mansions deep study' },
    { icon: '✨', title: 'Yogas', desc: 'Planetary combinations' },
    { icon: '⏳', title: 'Dasha Systems', desc: 'Timing events & predictions' }
  ];

  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'curriculum', label: 'Curriculum', icon: '📚' },
    { id: 'features', label: 'Features', icon: '⭐' },
    { id: 'reviews', label: 'Reviews', icon: '💬' }
  ];

  const curriculumItems = [
    { week: 'Week 1-2', title: 'Foundations of Vedic Astrology', topics: ['History & Philosophy', 'Zodiac Signs (Rashis)', 'Basic Chart Structure'] },
    { week: 'Week 3-4', title: 'Planetary Powers', topics: ['9 Navagrahas Deep Dive', 'Planetary Strengths', 'Aspects & Conjunctions'] },
    { week: 'Week 5-6', title: 'Houses & Life Areas', topics: ['12 Bhavas Explained', 'House Lords', 'Karakas (Significators)'] },
    { week: 'Week 7-8', title: 'Nakshatras & Timing', topics: ['27 Lunar Mansions', 'Dasha Systems', 'Transits Analysis'] },
    { week: 'Week 9-10', title: 'Predictive Techniques', topics: ['Yogas & Combinations', 'Marriage Matching', 'Career & Finance'] }
  ];

  const reviews = [
    { name: 'Rajesh Kumar', rating: 5, text: 'Now I can confidently predict timing of events. The transit section is gold!', avatar: '/images/10350949.png' },
    { name: 'Meera Patel', rating: 5, text: 'Best predictive astrology course online. Practical and accurate techniques.', avatar: '/images/10350961.png' },
    { name: 'Anil Sharma', rating: 4, text: 'Great focus on practical prediction. Changed how I read charts completely.', avatar: '/images/10350969.png' }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const courseSteps = [
    { icon: '🎯', title: 'Event Prediction', desc: 'Predict specific events' },
    { icon: '📅', title: 'Timing', desc: 'Master transit & dasha' },
    { icon: '💼', title: 'Career', desc: 'Professional predictions' },
    { icon: '💑', title: 'Marriage', desc: 'Relationship timing' },
    { icon: '🏥', title: 'Health', desc: 'Medical astrology' },
    { icon: '🌟', title: 'Yearly', desc: 'Annual forecasting' }
  ];

  const highlights = [
    { num: '35+', label: 'Hours Content', icon: '⏱️' },
    { num: '8', label: 'Weeks Duration', icon: '📅' },
    { num: '1.5K+', label: 'Students', icon: '👥' },
    { num: '4.9', label: 'Rating', icon: '⭐' }
  ];

  const faqs = [
    { q: 'Do I need prior astrology knowledge?', a: 'Yes, you should know basics of chart reading before taking this course.' },
    { q: 'Will I learn exact timing of events?', a: 'Yes, the course focuses on precise timing using multiple techniques.' },
    { q: 'Can I predict marriage after this?', a: 'Yes, you will learn specific techniques for marriage timing prediction.' }
  ];

  return (
    <section className="course-modern">
      {/* Full Width Hero */}
      <div className="hero-fullwidth">
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-6 text-lg-start text-center">
              <div className="hero-infographic" data-aos="fade-up">
                <img src="/images/predictive_info.png" alt="Predictive Astrology" />
              </div>
              <div className="hero-badge" data-aos="fade-up" data-aos-delay="100">
                <span className="pulse-dot"></span>
                Enrollment Open - Next Batch Starting Soon
              </div>
              <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">
                <span className="text-white">Professional</span>
                <span className="gradient-text">Predictive Astrology Course</span>
              </h1>
              <p className="hero-desc" data-aos="fade-up" data-aos-delay="300">
                Master the art of prediction. Learn timing of events using Vimshottari Dasha, 
                Transits, and advanced planetary combinations for accurate forecasting.
              </p>
              
              <div className="hero-highlights-modern" data-aos="fade-up" data-aos-delay="400">
                {highlights.map((h, i) => (
                  <div key={i} className="h-item-modern">
                    <span className="h-icon">{h.icon}</span>
                    <div className="h-text-wrap">
                      <span className="h-num">{h.num}</span>
                      <span className="h-label">{h.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hero-cta-row mt-4" data-aos="fade-up" data-aos-delay="500">
                <button className="btn-primary-hero" onClick={() => setShowModal(true)}>
                  <span>Join Now ₹1,499</span>
                  <small>was ₹5,999</small>
                </button>
                <div className="price-guarantee">
                  <i className="fas fa-shield-alt"></i>
                  <span>7-Day<br/>Refund</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-lg-0 mt-5">
              <div className="hero-visual-center" data-aos="zoom-in" data-aos-delay="600">
                <div className="main-image-wrapper">
                  <img src="/images/tengyart-VgijAV-e97Y-unsplash.jpg" alt="Predictive Course" />
                  <div className="play-overlay" onClick={() => setShowModal(true)}>
                    <div className="play-circle">
                      <i className="fas fa-play"></i>
                    </div>
                    <span>Watch Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Timeline */}
      <div className="timeline-section">
        <div className="container">
          <h2 className="section-title-center">Your Learning Journey</h2>
          <p className="section-sub">6 stages from beginner to professional astrologer</p>
          
          <div className="timeline-track">
            {courseSteps.map((step, idx) => (
              <div 
                key={idx} 
                className={`timeline-node ${currentStep === idx ? 'active' : ''}`}
                onClick={() => setCurrentStep(idx)}
              >
                <div className="node-circle">
                  <span className="node-icon">{step.icon}</span>
                  {currentStep === idx && <div className="node-ring"></div>}
                </div>
                <div className="node-info">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="timeline-content">
            <div className="tc-card">
              <span className="tc-icon">{courseSteps[currentStep].icon}</span>
              <h3>Stage {currentStep + 1}: {courseSteps[currentStep].title}</h3>
              <p>
                {currentStep === 0 && 'Learn to predict specific life events with remarkable accuracy. Master the techniques for identifying what events will manifest in a person\'s life and when they will occur.'}
                {currentStep === 1 && 'Master the art of timing using transits (Gochara), Dasha systems, and Ashtakavarga. Learn when planets will trigger specific events in a person\'s life.'}
                {currentStep === 2 && 'Predict career changes, promotions, job switches, and financial gains. Learn techniques for professional consultation and career guidance.'}
                {currentStep === 3 && 'Master marriage timing prediction using Navamsa, 7th house analysis, and Dasha of significators. Learn compatibility assessment techniques.'}
                {currentStep === 4 && 'Learn medical astrology techniques to predict health issues and their timing. Understand which planets cause which health problems and when.'}
                {currentStep === 5 && 'Create comprehensive yearly predictions using Tajaka, solar returns, and annual chart techniques. Master the art of yearly forecasting for clients.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included Grid */}
      <div className="includes-section">
        <div className="container">
          <h2 className="section-title-center">Everything You Get</h2>
          <div className="includes-grid">
            <div className="include-card premium">
              <div className="ic-icon"><i className="fas fa-video"></i></div>
              <h4>Live Classes</h4>
              <p>Interactive sessions with expert astrologers twice a week</p>
              <span className="ic-badge">20-24 Sessions</span>
            </div>
            <div className="include-card">
              <div className="ic-icon"><i className="fas fa-book"></i></div>
              <h4>Study Materials</h4>
              <p>PDFs, charts, templates and reference guides</p>
            </div>
            <div className="include-card">
              <div className="ic-icon"><i className="fas fa-infinity"></i></div>
              <h4>Lifetime Access</h4>
              <p>All recordings and materials available forever</p>
            </div>
            <div className="include-card">
              <div className="ic-icon"><i className="fas fa-certificate"></i></div>
              <h4>Certificate</h4>
              <p>Professional certification upon completion</p>
            </div>
            <div className="include-card">
              <div className="ic-icon"><i className="fas fa-users"></i></div>
              <h4>Community</h4>
              <p>Private group for discussions and support</p>
            </div>
            <div className="include-card">
              <div className="ic-icon"><i className="fas fa-headset"></i></div>
              <h4>Doubt Support</h4>
              <p>Get your questions answered by instructors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Spotlight */}
      <div className="instructor-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="instructor-image">
                <img src="/images/istockphoto-1200677760-612x612.jpg" alt="Sarah Mitchell" />
                <div className="exp-badge">15+ Years Experience</div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="instructor-info">
                <span className="ii-label">Your Guide</span>
                <h2>Sarah Mitchell</h2>
                <p className="ii-desc">
                  International astrologer with 10+ years of experience in predictive astrology. 
                  Expert in transit analysis and timing predictions. Known for accurate 
                  forecasting and practical teaching approach.
                </p>
                <div className="ii-stats">
                  <div><strong>2,500+</strong><span>Students Taught</span></div>
                  <div><strong>10+</strong><span>Years Experience</span></div>
                  <div><strong>1</strong><span>Book Authored</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div className="reviews-section">
        <div className="container">
          <h2 className="section-title-center">What Students Say</h2>
          <div className="reviews-carousel">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-box">
                <div className="rb-header">
                  <img src={review.avatar} alt={review.name} />
                  <div>
                    <h5>{review.name}</h5>
                    <div className="rb-stars">{'★'.repeat(review.rating)}</div>
                  </div>
                </div>
                <p>"{review.text}"</p>
              </div>
            ))}
          </div>
          <div className="rating-big">
            <span className="rb-num">4.9</span>
            <span className="rb-total">out of 5 stars</span>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="faq-section">
        <div className="container">
          <h2 className="section-title-center">Common Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <div className="faq-q">
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="final-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Master Predictive Astrology?</h2>
            <p>Join 1,500+ students on this transformative journey</p>
            <div className="cta-price-row">
              <div className="cp-left">
                <span className="cp-current">₹999</span>
                <span className="cp-old">₹3,999</span>
                <span className="cp-save">Save 75%</span>
              </div>
              <button className="cp-btn" onClick={() => setShowModal(true)}>
                Enroll Now
              </button>
            </div>
            <div className="cta-trust">
              <span><i className="fas fa-lock"></i> Secure Payment</span>
              <span><i className="fas fa-undo"></i> 7-Day Refund</span>
              <span><i className="fas fa-check-circle"></i> Instant Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Enroll in Predictive Astrology</h4>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label>City/Location *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your city"
                  />
                </div>
                <div className="form-group">
                  <label>Experience Level</label>
                  <select
                    name="experience"
                    className="form-control"
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value="intermediate">Intermediate - Know chart basics</option>
                    <option value="advanced">Advanced - Done some predictions</option>
                    <option value="expert">Expert - Want mastery</option>
                  </select>
                </div>
                <div className="fee-info">
                  <p><strong>Course Fee:</strong> <span className="fee-amount">₹999</span></p>
                  <p className="text-muted">Was ₹3,999 - Save 75% today</p>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-payment" onClick={handlePayment}>
                  <i className="fas fa-lock"></i> Pay ₹999 & Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .course-modern {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
          min-height: 100vh;
          color: #fff;
        }

        /* Full Width Hero */
        .hero-fullwidth {
          position: relative;
          padding: 80px 0 60px;
          overflow: hidden;
        }

        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(255,106,0,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(138,43,226,0.1) 0%, transparent 50%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,106,0,0.2);
          border: 1px solid rgba(255,106,0,0.4);
          padding: 10px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 500;
          margin: 0 auto 25px;
          width: fit-content;
        }

        .hero-infographic {
          text-align: center;
          margin-bottom: 15px;
        }

        .hero-infographic img {
          height: 140px;
          width: auto;
          filter: drop-shadow(0 0 15px rgba(255, 106, 0, 0.6));
          animation: float-slow 4s ease-in-out infinite;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #28a745;
          border-radius: 50%;
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          text-align: center;
        }

        .gradient-text {
          display: block;
          background: linear-gradient(135deg, #ff6a00, #ff8c00, #ffb700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin-bottom: 30px;
          max-width: 650px;
        }

        .hero-highlights-modern {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin: 0 0 30px;
        }

        .h-item-modern {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 12px 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: all 0.3s ease;
        }

        .h-item-modern:hover {
          transform: translateY(-5px);
          border-color: rgba(255,106,0,0.4);
          background: rgba(255,106,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .h-icon {
          font-size: 24px;
        }

        .h-text-wrap {
          text-align: left;
        }

        .h-num {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: #ff6a00;
          line-height: 1;
        }

        .h-label {
          display: block;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .btn-primary-hero {
          background: linear-gradient(135deg, #ff6a00, #ff8c00);
          color: #fff;
          border: none;
          padding: 18px 40px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255,106,0,0.3);
        }

        .btn-primary-hero span {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .btn-primary-hero small {
          display: block;
          font-size: 13px;
          opacity: 0.9;
          text-decoration: line-through;
        }

        .btn-primary-hero:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255,106,0,0.4);
        }

        .price-guarantee {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.7);
        }

        .price-guarantee i {
          font-size: 28px;
          color: #28a745;
        }

        .price-guarantee span {
          font-size: 13px;
          line-height: 1.3;
        }

        .hero-visual-center {
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .main-image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .main-image-wrapper img {
          width: 100%;
          height: 380px;
          object-fit: cover;
        }

        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .play-overlay:hover {
          background: rgba(0,0,0,0.3);
        }

        .play-circle {
          width: 70px;
          height: 70px;
          background: rgba(255,106,0,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .play-circle:hover {
          transform: scale(1.1);
        }

        .play-circle i {
          font-size: 24px;
          margin-left: 4px;
        }

        .play-overlay span {
          font-size: 14px;
          font-weight: 500;
        }

        .floating-card {
          position: absolute;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px;
          padding: 15px 20px;
          z-index: 10;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .price-float {
          top: -20px;
          right: -20px;
          text-align: center;
        }

        .f-head {
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .f-price {
          font-size: 2rem;
          font-weight: 700;
          color: #ff6a00;
        }

        .f-strike {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          text-decoration: line-through;
        }

        .reviews-float {
          bottom: 30px;
          left: -30px;
          animation-delay: 1.5s;
        }

        .stars-mini {
          color: #ffc107;
          font-size: 14px;
          letter-spacing: 2px;
        }

        .r-text {
          font-size: 12px;
          color: rgba(255,255,255,0.8);
          margin-top: 5px;
        }

        /* Timeline Section */
        .timeline-section {
          padding: 80px 0;
          background: rgba(0,0,0,0.2);
        }

        .section-title-center {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .section-sub {
          text-align: center;
          color: rgba(255,255,255,0.6);
          margin-bottom: 50px;
        }

        .timeline-track {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 40px;
          position: relative;
        }

        .timeline-track::before {
          content: '';
          position: absolute;
          top: 30px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, rgba(255,106,0,0.3), rgba(255,106,0,0.1));
          z-index: 0;
        }

        .timeline-node {
          flex: 1;
          text-align: center;
          cursor: pointer;
          position: relative;
          z-index: 1;
        }

        .node-circle {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          position: relative;
          transition: all 0.3s ease;
        }

        .timeline-node.active .node-circle,
        .timeline-node:hover .node-circle {
          background: rgba(255,106,0,0.2);
          border-color: #ff6a00;
          transform: scale(1.1);
        }

        .node-icon {
          font-size: 24px;
        }

        .node-ring {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 2px solid #ff6a00;
          border-radius: 50%;
          animation: ring-pulse 2s infinite;
        }

        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .node-info h4 {
          font-size: 15px;
          margin-bottom: 5px;
          color: #fff;
        }

        .node-info p {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        .timeline-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .tc-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
        }

        .tc-icon {
          font-size: 50px;
          display: block;
          margin-bottom: 20px;
        }

        .tc-card h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #ff6a00;
        }

        .tc-card p {
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          font-size: 15px;
        }

        /* Includes Section */
        .includes-section {
          padding: 80px 0;
        }

        .includes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .include-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .include-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,106,0,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .include-card.premium {
          background: linear-gradient(135deg, rgba(255,106,0,0.15), rgba(255,106,0,0.05));
          border-color: rgba(255,106,0,0.3);
        }

        .ic-icon {
          width: 60px;
          height: 60px;
          background: rgba(255,106,0,0.15);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .ic-icon i {
          font-size: 26px;
          color: #ff6a00;
        }

        .include-card h4 {
          font-size: 1.1rem;
          margin-bottom: 10px;
        }

        .include-card p {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 15px;
        }

        .ic-badge {
          display: inline-block;
          background: rgba(255,106,0,0.2);
          color: #ff6a00;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        /* Instructor Section */
        .instructor-section {
          padding: 80px 0;
          background: rgba(0,0,0,0.2);
        }

        .instructor-image {
          position: relative;
        }

        .instructor-image img {
          width: 100%;
          max-width: 350px;
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .exp-badge {
          position: absolute;
          bottom: 30px;
          right: 0;
          background: linear-gradient(135deg, #ff6a00, #ff8c00);
          color: #fff;
          padding: 12px 25px;
          border-radius: 30px;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(255,106,0,0.3);
        }

        .instructor-info {
          padding-left: 40px;
        }

        .ii-label {
          display: inline-block;
          background: rgba(255,106,0,0.15);
          color: #ff6a00;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .instructor-info h2 {
          font-size: 2.2rem;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .ii-desc {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .ii-stats {
          display: flex;
          gap: 40px;
        }

        .ii-stats div {
          text-align: center;
        }

        .ii-stats strong {
          display: block;
          font-size: 2rem;
          color: #ff6a00;
        }

        .ii-stats span {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
        }

        /* Reviews Section */
        .reviews-section {
          padding: 80px 0;
        }

        .reviews-carousel {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 40px;
        }

        .review-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 25px;
        }

        .rb-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .rb-header img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .rb-header h5 {
          margin: 0 0 5px 0;
          font-size: 15px;
        }

        .rb-stars {
          color: #ffc107;
          font-size: 14px;
        }

        .review-box > p {
          color: rgba(255,255,255,0.7);
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }

        .rating-big {
          text-align: center;
        }

        .rb-num {
          font-size: 4rem;
          font-weight: 700;
          color: #ff6a00;
        }

        .rb-total {
          display: block;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
        }

        /* FAQ Section */
        .faq-section {
          padding: 60px 0;
          background: rgba(0,0,0,0.2);
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          margin-bottom: 15px;
          overflow: hidden;
        }

        .faq-q {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          cursor: pointer;
          font-weight: 500;
        }

        .faq-q i {
          color: rgba(255,255,255,0.5);
          transition: transform 0.3s ease;
        }

        .faq-a {
          padding: 0 25px 20px;
          color: rgba(255,255,255,0.7);
          font-size: 15px;
          line-height: 1.6;
        }

        /* Final CTA */
        .final-cta {
          padding: 80px 0;
        }

        .cta-box {
          background: linear-gradient(135deg, rgba(255,106,0,0.15), rgba(138,43,226,0.1));
          border: 1px solid rgba(255,106,0,0.2);
          border-radius: 24px;
          padding: 60px;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .cta-box h2 {
          font-size: 2.2rem;
          margin-bottom: 15px;
        }

        .cta-box > p {
          color: rgba(255,255,255,0.7);
          font-size: 1.1rem;
          margin-bottom: 35px;
        }

        .cta-price-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-bottom: 30px;
        }

        .cp-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .cp-current {
          font-size: 3rem;
          font-weight: 700;
          color: #ff6a00;
        }

        .cp-old {
          font-size: 1.5rem;
          color: rgba(255,255,255,0.4);
          text-decoration: line-through;
        }

        .cp-save {
          background: rgba(40,167,69,0.2);
          color: #28a745;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .cp-btn {
          background: linear-gradient(135deg, #ff6a00, #ff8c00);
          color: #fff;
          border: none;
          padding: 18px 50px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255,106,0,0.3);
        }

        .cp-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255,106,0,0.4);
        }

        .cta-trust {
          display: flex;
          justify-content: center;
          gap: 30px;
        }

        .cta-trust span {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
        }

        .cta-trust i {
          color: #28a745;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border: 1px solid rgba(255,106,0,0.3);
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .modal-header h4 {
          color: #ff6a00;
          margin: 0;
          font-size: 1.3rem;
        }

        .close-btn {
          background: rgba(255,255,255,0.1);
          border: none;
          color: #fff;
          font-size: 22px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255,106,0,0.3);
        }

        .modal-body {
          padding: 25px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          color: rgba(255,255,255,0.8);
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .form-control {
          width: 100%;
          padding: 14px 18px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: #ff6a00;
          background: rgba(255,255,255,0.08);
        }

        select.form-control option {
          background: #1a1a2e;
          color: #fff;
        }

        .modal-footer {
          display: flex;
          gap: 15px;
          padding: 0 25px 25px;
        }

        .modal-footer .btn {
          flex: 1;
          padding: 15px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.8);
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.15);
        }

        .btn-payment {
          background: linear-gradient(135deg, #28a745, #34ce57);
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-payment:hover {
          opacity: 0.9;
        }

        .fee-info {
          background: rgba(255,106,0,0.1);
          border: 1px solid rgba(255,106,0,0.3);
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin-top: 25px;
        }

        .fee-amount {
          color: #ff6a00;
          font-size: 26px;
          font-weight: 700;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .hero-highlights-modern {
            grid-template-columns: repeat(2, 1fr);
          }
          .includes-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .reviews-carousel {
            grid-template-columns: 1fr;
          }
          .timeline-track {
            flex-wrap: wrap;
          }
          .instructor-info {
            padding-left: 0;
            margin-top: 40px;
          }
          .ii-stats {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 1.8rem;
          }
          .hero-highlights-modern {
            grid-template-columns: repeat(2, 1fr);
          }
          .floating-card {
            display: none;
          }
          .includes-grid {
            grid-template-columns: 1fr;
          }
          .cta-price-row {
            flex-direction: column;
          }
          .timeline-track::before {
            display: none;
          }
          .timeline-node {
            flex: 0 0 calc(50% - 10px);
          }
        }
      `}</style>
    </section>
  );
}

export default PredictiveAstrology;
