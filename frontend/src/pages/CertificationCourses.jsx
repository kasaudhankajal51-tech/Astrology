import { useState } from 'react';

function CertificationCourses() {
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
    alert('Redirecting to secure payment gateway...\nProgram Fee: ₹2,499');
  };

  const highlights = [
    { num: '120+', label: 'Hours Content', icon: '⏱️' },
    { num: '6', label: 'Months Program', icon: '📅' },
    { num: '1K+', label: 'Graduates', icon: '👥' },
    { num: '4.9', label: 'Rating', icon: '⭐' }
  ];

  const courseSteps = [
    { icon: '📚', title: 'Foundation', desc: 'Complete basics mastery' },
    { icon: '🔮', title: 'Advanced', desc: 'Divisional charts' },
    { icon: '🔭', title: 'Predictive', desc: 'Timing techniques' },
    { icon: '💼', title: 'Practice', desc: 'Live consultations' },
    { icon: '✨', title: 'Remedies', desc: 'Practical solutions' },
    { icon: '🎓', title: 'Certified', desc: 'Professional astrologer' }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const reviews = [
    { name: 'Dr. Priya Malhotra', rating: 5, text: 'This certification transformed my career. Now practicing professionally with confidence!', avatar: '/images/10350949.png' },
    { name: 'Sanjay Verma', rating: 5, text: 'Comprehensive program covering everything. The certification added great value to my practice.', avatar: '/images/10350961.png' },
    { name: 'Kavita Joshi', rating: 5, text: 'Best investment for serious astrologers. 6 months of intensive learning worth every penny.', avatar: '/images/10350969.png' }
  ];

  const faqs = [
    { q: 'Is this suitable for beginners?', a: 'Yes, we cover everything from foundation to professional level.' },
    { q: 'How long is the program?', a: '6 months of intensive learning with live classes and practice sessions.' },
    { q: 'Will I get a certificate?', a: 'Yes, you receive a professional certificate upon successful completion.' }
  ];

  return (
    <section className="course-light-certification">
      {/* Full Width Hero */}
      <div className="hero-fullwidth-light">
        <div className="container hero-content-light">
          <div className="row align-items-center">
            <div className="col-lg-6 text-lg-start text-center">
              <div className="hero-infographic-light" data-aos="fade-up">
                <img src="/images/certification_info.png" alt="Certification Program" />
              </div>
              <div className="hero-badge-light" data-aos="fade-up" data-aos-delay="100">
                <span className="pulse-dot-light"></span>
                Enrollment Open - Next Batch Starting Soon
              </div>
              <h1 className="hero-title-light" data-aos="fade-up" data-aos-delay="200">
                <span>Professional</span>
                <span className="gradient-text-light">Certification Program</span>
              </h1>
              <p className="hero-desc-light" data-aos="fade-up" data-aos-delay="300">
                Complete 6-month certification program. From beginner basics to professional 
                practice - become a certified Vedic Astrologer.
              </p>
              
              <div className="hero-highlights-light" data-aos="fade-up" data-aos-delay="400">
                {highlights.map((h, i) => (
                  <div key={i} className="h-item-light">
                    <span className="h-icon-light">{h.icon}</span>
                    <div className="h-text-wrap-light">
                      <span className="h-num-light">{h.num}</span>
                      <span className="h-label-light">{h.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hero-cta-row-light mt-4" data-aos="fade-up" data-aos-delay="500">
                <button className="btn-primary-light" onClick={() => setShowModal(true)}>
                  <span>Join Now ₹2,499</span>
                  <small>was ₹9,999</small>
                </button>
                <div className="price-guarantee-light">
                  <i className="fas fa-shield-alt"></i>
                  <span>7-Day<br/>Refund</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-lg-0 mt-5">
              <div className="hero-visual-center-light" data-aos="zoom-in" data-aos-delay="600">
                <div className="main-image-wrapper-light">
                  <img src="/images/horocurty03.jpg" alt="Certification Course" />
                  <div className="play-overlay-light" onClick={() => setShowModal(true)}>
                    <div className="play-circle-light">
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
      <div className="timeline-section-light">
        <div className="container">
          <h2 className="section-title-center-light">Your Learning Journey</h2>
          <p className="section-sub-light">6 stages from beginner to professional astrologer</p>
          
          <div className="timeline-track-light">
            {courseSteps.map((step, idx) => (
              <div 
                key={idx} 
                className={`timeline-node-light ${currentStep === idx ? 'active' : ''}`}
                onClick={() => setCurrentStep(idx)}
              >
                <div className="node-circle-light">
                  <span className="node-icon-light">{step.icon}</span>
                  {currentStep === idx && <div className="node-ring-light"></div>}
                </div>
                <div className="node-info-light">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="timeline-content-light">
            <div className="tc-card-light">
              <span className="tc-icon-light">{courseSteps[currentStep].icon}</span>
              <h3>Stage {currentStep + 1}: {courseSteps[currentStep].title}</h3>
              <p>
                {currentStep === 0 && 'Build a rock-solid foundation with zodiac signs, planets, houses, and basic chart construction. Master the fundamental principles that everything else builds upon.'}
                {currentStep === 1 && 'Progress to advanced concepts including divisional charts (Vargas), Shadbala, complex yogas, and nuanced chart interpretation techniques.'}
                {currentStep === 2 && 'Learn professional prediction techniques including transit analysis, dasha interpretation, and timing of events for accurate forecasting.'}
                {currentStep === 3 && 'Gain hands-on experience with live case studies and supervised practice consultations. Build confidence in real-world chart reading scenarios.'}
                {currentStep === 4 && 'Master remedial astrology - learn to recommend gemstones, mantras, rituals, and lifestyle changes to help clients overcome challenges.'}
                {currentStep === 5 && 'Receive your professional certification and join our alumni network. Start your practice as a certified astrologer with full confidence and credibility.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included Grid */}
      <div className="includes-section-light">
        <div className="container">
          <h2 className="section-title-center-light">Everything You Get</h2>
          <div className="includes-grid-light">
            <div className="include-card-light premium">
              <div className="ic-icon-light"><i className="fas fa-video"></i></div>
              <h4>Live Classes</h4>
              <p>Interactive sessions with expert astrologers twice a week</p>
              <span className="ic-badge-light">50+ Sessions</span>
            </div>
            <div className="include-card-light">
              <div className="ic-icon-light"><i className="fas fa-book"></i></div>
              <h4>Study Materials</h4>
              <p>PDFs, charts, templates and reference guides</p>
            </div>
            <div className="include-card-light">
              <div className="ic-icon-light"><i className="fas fa-infinity"></i></div>
              <h4>Lifetime Access</h4>
              <p>All recordings and materials available forever</p>
            </div>
            <div className="include-card-light">
              <div className="ic-icon-light"><i className="fas fa-certificate"></i></div>
              <h4>Certificate</h4>
              <p>Professional certification upon completion</p>
            </div>
            <div className="include-card-light">
              <div className="ic-icon-light"><i className="fas fa-users"></i></div>
              <h4>Community</h4>
              <p>Private group for discussions and support</p>
            </div>
            <div className="include-card-light">
              <div className="ic-icon-light"><i className="fas fa-headset"></i></div>
              <h4>Doubt Support</h4>
              <p>Get your questions answered by instructors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Spotlight */}
      <div className="instructor-section-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="instructor-image-light">
                <img src="/images/depositphotos_81108858-stock-photo-casual-business-indian-boy-portrait.jpg" alt="Dr. Arjun Verma" />
                <div className="exp-badge-light">18+ Years Experience</div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="instructor-info-light">
                <span className="ii-label-light">Your Guide</span>
                <h2>Dr. Arjun Verma</h2>
                <p className="ii-desc-light">
                  PhD in Vedic Astrology with 18+ years of professional practice. 
                  Specializes in advanced predictive techniques and professional certification training. 
                  Author of 5 bestselling astrology books.
                </p>
                <div className="ii-stats-light">
                  <div><strong>8,000+</strong><span>Students Taught</span></div>
                  <div><strong>18+</strong><span>Years Experience</span></div>
                  <div><strong>5</strong><span>Books Authored</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div className="reviews-section-light">
        <div className="container">
          <h2 className="section-title-center-light">What Students Say</h2>
          <div className="reviews-carousel-light">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-box-light">
                <div className="rb-header-light">
                  <img src={review.avatar} alt={review.name} />
                  <div>
                    <h5>{review.name}</h5>
                    <div className="rb-stars-light">{'★'.repeat(review.rating)}</div>
                  </div>
                </div>
                <p>"{review.text}"</p>
              </div>
            ))}
          </div>
          <div className="rating-big-light">
            <span className="rb-num-light">4.9</span>
            <span className="rb-total-light">out of 5 stars</span>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="faq-section-light">
        <div className="container">
          <h2 className="section-title-center-light">Common Questions</h2>
          <div className="faq-list-light">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item-light">
                <div className="faq-q-light">
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-a-light">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="final-cta-light">
        <div className="container">
          <div className="cta-box-light">
            <h2>Become a Certified Professional Astrologer</h2>
            <p>Join 1,000+ certified graduates practicing worldwide</p>
            <div className="cta-price-row-light">
              <div className="cp-left-light">
                <span className="cp-current-light">₹2,499</span>
                <span className="cp-old-light">₹9,999</span>
                <span className="cp-save-light">Save 75%</span>
              </div>
              <button className="cp-btn-light" onClick={() => setShowModal(true)}>
                Enroll Now
              </button>
            </div>
            <div className="cta-trust-light">
              <span><i className="fas fa-lock"></i> Secure Payment</span>
              <span><i className="fas fa-undo"></i> 7-Day Refund</span>
              <span><i className="fas fa-check-circle"></i> Instant Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showModal && (
        <div className="modal-overlay-light" onClick={() => setShowModal(false)}>
          <div className="modal-content-light" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-light">
              <h4>Enroll in Certification Program</h4>
              <button className="close-btn-light" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body-light">
                <div className="form-group-light">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control-light"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group-light">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control-light"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group-light">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control-light"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group-light">
                  <label>City/Location *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control-light"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your city"
                  />
                </div>
                <div className="form-group-light">
                  <label>Experience Level</label>
                  <select
                    name="experience"
                    className="form-control-light"
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value="beginner">Beginner - No prior knowledge</option>
                    <option value="intermediate">Intermediate - Some basic knowledge</option>
                    <option value="advanced">Advanced - Looking to deepen skills</option>
                  </select>
                </div>
                <div className="fee-info-light">
                  <p><strong>Program Fee:</strong> <span className="fee-amount-light">₹2,499</span></p>
                  <p className="text-muted-light">Was ₹9,999 - Save 75% today</p>
                </div>
              </div>
              <div className="modal-footer-light">
                <button type="button" className="btn-secondary-light" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-payment-light" onClick={handlePayment}>
                  <i className="fas fa-lock"></i> Pay ₹2,499 & Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        /* ============================================
           LIGHT THEME - CERTIFICATION COURSES
           ============================================ */
        
        .course-light-certification {
          background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 50%, #f0f2f8 100%);
          min-height: 100vh;
          color: #1a1a2e;
          font-family: 'Be Vietnam Pro', sans-serif;
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero-fullwidth-light {
          position: relative;
          padding: 60px 0 40px;
          overflow: hidden;
          background: linear-gradient(135deg, #ffffff 0%, #f8f4e8 100%);
        }

        .hero-content-light {
          position: relative;
          z-index: 2;
        }

        .hero-badge-light {
          display: flex;
          width: fit-content;
          margin: 0 auto 25px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, rgba(255,106,0,0.1), rgba(227,27,122,0.08));
          border: 1px solid rgba(255,106,0,0.3);
          padding: 10px 24px;
          border-radius: 50px;
          font-size: clamp(11px, 2vw, 13px);
          font-weight: 600;
          color: #e31b7a;
          backdrop-filter: blur(10px);
        }

        .pulse-dot-light {
          width: 8px;
          height: 8px;
          background: #28a745;
          border-radius: 50%;
          animation: pulse-green-light 2s infinite;
        }

        @keyframes pulse-green-light {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .hero-infographic-light {
          text-align: center;
          margin-bottom: 15px;
        }

        .hero-infographic-light img {
          height: clamp(80px, 15vw, 140px);
          width: auto;
          filter: drop-shadow(0 0 20px rgba(255,106,0,0.3));
          animation: float-slow-light 4s ease-in-out infinite;
        }

        @keyframes float-slow-light {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hero-title-light {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 6vw, 3.8rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          color: #1a1a2e;
        }

        .hero-title-light span:first-child {
          background: linear-gradient(135deg, #1a1a2e, #2d2d5e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-text-light {
          display: block;
          background: linear-gradient(135deg, #ff6a00, #e31b7a, #ff8c00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc-light {
          font-size: clamp(1rem, 3vw, 1.3rem);
          color: #4a4a6a;
          line-height: 1.7;
          margin-bottom: 30px;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-highlights-light {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 30px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .h-item-light {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .h-item-light:hover {
          transform: translateY(-3px);
          border-color: #ff6a00;
          box-shadow: 0 8px 25px rgba(255,106,0,0.12);
        }

        .h-icon-light {
          font-size: clamp(20px, 4vw, 28px);
        }

        .h-text-wrap-light {
          text-align: left;
        }

        .h-num-light {
          display: block;
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          font-weight: 800;
          color: #ff6a00;
          line-height: 1;
        }

        .h-label-light {
          display: block;
          font-size: 11px;
          color: #6b6b8a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-cta-row-light {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn-primary-light {
          background: linear-gradient(135deg, #ff6a00, #e31b7a, #ff8c00);
          background-size: 200% 200%;
          color: #fff;
          border: none;
          padding: 14px 35px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(227,27,122,0.3);
          width: 100%;
          max-width: 320px;
        }

        .btn-primary-light:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(227,27,122,0.4);
          background-position: 100% 100%;
        }

        .btn-primary-light span {
          display: block;
          font-size: 1.1rem;
          font-weight: 800;
        }

        .btn-primary-light small {
          display: block;
          font-size: 11px;
          opacity: 0.85;
          text-decoration: line-through;
        }

        .price-guarantee-light {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #4a4a6a;
        }

        .price-guarantee-light i {
          font-size: 24px;
          color: #28a745;
        }

        .price-guarantee-light span {
          font-size: 11px;
          line-height: 1.3;
          font-weight: 500;
          text-align: left;
        }

        .hero-visual-center-light {
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .main-image-wrapper-light {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }

        .main-image-wrapper-light img {
          width: 100%;
          height: clamp(250px, 40vw, 380px);
          object-fit: cover;
        }

        .play-overlay-light {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .play-circle-light {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }

        .play-circle-light i {
          font-size: 20px;
          margin-left: 4px;
          color: white;
        }

        .play-overlay-light span {
          font-size: 13px;
          font-weight: 600;
          color: white;
        }

        /* Timeline Section */
        .timeline-section-light {
          padding: 60px 0;
          background: #ffffff;
        }

        .section-title-center-light {
          font-family: 'Playfair Display', serif;
          text-align: center;
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 800;
          margin-bottom: 12px;
          color: #1a1a2e;
        }

        .section-sub-light {
          text-align: center;
          color: #6b6b8a;
          margin-bottom: 40px;
          font-size: clamp(1rem, 2.5vw, 1.15rem);
        }

        .timeline-track-light {
          display: flex;
          justify-content: center;
          gap: clamp(10px, 3vw, 20px);
          margin-bottom: 30px;
          position: relative;
          flex-wrap: wrap;
        }

        .timeline-track-light::before {
          content: '';
          position: absolute;
          top: 25px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6a00, #e31b7a);
          z-index: 0;
        }

        .timeline-node-light {
          flex: 0 1 auto;
          text-align: center;
          cursor: pointer;
          position: relative;
          z-index: 1;
          width: clamp(80px, 15vw, 120px);
        }

        .node-circle-light {
          width: 50px;
          height: 50px;
          background: #ffffff;
          border: 2px solid #e0e0e8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          position: relative;
          transition: all 0.3s ease;
        }

        .timeline-node-light.active .node-circle-light,
        .timeline-node-light:hover .node-circle-light {
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          border-color: transparent;
        }

        .node-info-light h4 {
          font-size: clamp(10px, 2vw, 14px);
          font-weight: 700;
          margin-bottom: 0;
        }

        .node-info-light p {
          display: none;
        }

        .timeline-content-light {
          background: #f8f9fc;
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.05);
          max-width: 800px;
          margin: 0 auto;
        }

        .tc-card-light h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          color: #ff6a00;
        }

        /* Includes Grid */
        .includes-grid-light {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .include-card-light {
          background: #ffffff;
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .include-card-light:hover {
          transform: translateY(-5px);
          border-color: #ff6a00;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .ic-icon-light {
          font-size: 32px;
          color: #ff6a00;
          margin-bottom: 15px;
        }

        /* Instructor Section */
        .instructor-image-light {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 30px;
        }

        .instructor-image-light img {
          width: 100%;
          height: 450px;
          object-fit: cover;
        }

        .exp-badge-light {
          position: absolute;
          bottom: 20px; right: 20px;
          background: #ff6a00;
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
        }

        /* Responsive Overrides */
        @media (max-width: 991px) {
          .hero-fullwidth-light { padding: 40px 0; }
          .hero-title-light { text-align: center; }
          .hero-desc-light { text-align: center; }
          .hero-highlights-light { grid-template-columns: 1fr 1fr; }
          .instructor-image-light img { height: 350px; }
        }

        @media (max-width: 768px) {
          .hero-highlights-light { grid-template-columns: 1fr; max-width: 300px; }
          .timeline-track-light::before { display: none; }
          .timeline-node-light { width: 33.33%; margin-bottom: 20px; }
          .timeline-content-light { padding: 20px; }
          .tc-card-light h3 { font-size: 1.25rem; }
          .final-cta-light .cta-box-light { padding: 40px 20px; }
        }

        @media (max-width: 576px) {
          .hero-title-light { font-size: 2rem; }
          .timeline-node-light { width: 50%; }
          .includes-grid-light { grid-template-columns: 1fr; }
          .btn-primary-light { padding: 12px 25px; }
          .btn-primary-light span { font-size: 1rem; }
        }

        /* Modal Styles */
        .modal-overlay-light {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 15px;
        }

        .modal-content-light {
          background: white;
          width: 100%;
          max-width: 500px;
          border-radius: 24px;
          overflow: hidden;
          animation: modalSlideUp 0.4s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        @keyframes modalSlideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header-light {
          padding: 20px 25px;
          border-bottom: 1px solid #f0f0f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fcfcfe;
        }

        .modal-body-light {
          padding: 25px;
        }

        .form-group-light {
          margin-bottom: 15px;
        }

        .form-control-light {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e0e0f0;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s;
        }

        .form-control-light:focus {
          border-color: #ff6a00;
          outline: none;
          box-shadow: 0 0 0 4px rgba(255,106,0,0.1);
        }

        .modal-footer-light {
          padding: 20px 25px;
          border-top: 1px solid #f0f0f5;
          display: flex;
          gap: 15px;
        }

        .btn-payment-light {
          background: #1a1a2e;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 12px;
          font-weight: 700;
          flex: 1;
        }

        .btn-secondary-light {
          background: #f0f0f5;
          color: #4a4a6a;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}

export default CertificationCourses;