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
           Same styling as all other course pages
           ============================================ */
        
        .course-light-certification {
          background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 50%, #f0f2f8 100%);
          min-height: 100vh;
          color: #1a1a2e;
          font-family: 'Be Vietnam Pro', sans-serif;
        }

        /* Hero Section */
        .hero-fullwidth-light {
          position: relative;
          padding: 80px 0 60px;
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
          gap: 10px;
          background: linear-gradient(135deg, rgba(255,106,0,0.1), rgba(227,27,122,0.08));
          border: 1px solid rgba(255,106,0,0.3);
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 13px;
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
          height: 140px;
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
          font-size: 3.8rem;
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
          font-size: 1.3rem;
          color: #4a4a6a;
          line-height: 1.7;
          margin-bottom: 30px;
          max-width: 650px;
        }

        .hero-highlights-light {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }

        .h-item-light {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .h-item-light:hover {
          transform: translateY(-3px);
          border-color: #ff6a00;
          box-shadow: 0 8px 25px rgba(255,106,0,0.12);
        }

        .h-icon-light {
          font-size: 28px;
        }

        .h-text-wrap-light {
          text-align: left;
        }

        .h-num-light {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: #ff6a00;
          line-height: 1;
        }

        .h-label-light {
          display: block;
          font-size: 12px;
          color: #6b6b8a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-cta-row-light {
          display: flex;
          align-items: center;
          gap: 25px;
          flex-wrap: wrap;
        }

        .btn-primary-light {
          background: linear-gradient(135deg, #ff6a00, #e31b7a, #ff8c00);
          background-size: 200% 200%;
          color: #fff;
          border: none;
          padding: 16px 40px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(227,27,122,0.3);
        }

        .btn-primary-light:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(227,27,122,0.4);
          background-position: 100% 100%;
        }

        .btn-primary-light span {
          display: block;
          font-size: 1.2rem;
          font-weight: 800;
        }

        .btn-primary-light small {
          display: block;
          font-size: 12px;
          opacity: 0.85;
          text-decoration: line-through;
        }

        .price-guarantee-light {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #4a4a6a;
        }

        .price-guarantee-light i {
          font-size: 28px;
          color: #28a745;
        }

        .price-guarantee-light span {
          font-size: 12px;
          line-height: 1.3;
          font-weight: 500;
        }

        .hero-visual-center-light {
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .main-image-wrapper-light {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }

        .main-image-wrapper-light img {
          width: 100%;
          height: 380px;
          object-fit: cover;
        }

        .play-overlay-light {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .play-overlay-light:hover {
          background: rgba(0,0,0,0.2);
        }

        .play-circle-light {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .play-circle-light:hover {
          transform: scale(1.1);
        }

        .play-circle-light i {
          font-size: 24px;
          margin-left: 4px;
          color: white;
        }

        .play-overlay-light span {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        /* Timeline Section */
        .timeline-section-light {
          padding: 80px 0;
          background: #ffffff;
        }

        .section-title-center-light {
          font-family: 'Playfair Display', serif;
          text-align: center;
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 12px;
          color: #1a1a2e;
        }

        .section-sub-light {
          text-align: center;
          color: #6b6b8a;
          margin-bottom: 50px;
          font-size: 1.15rem;
        }

        .timeline-track-light {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 40px;
          position: relative;
          flex-wrap: wrap;
        }

        .timeline-track-light::before {
          content: '';
          position: absolute;
          top: 28px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6a00, #e31b7a, #ff8c00);
          z-index: 0;
        }

        @media (max-width: 768px) {
          .timeline-track-light::before {
            display: none;
          }
        }

        .timeline-node-light {
          flex: 1;
          text-align: center;
          cursor: pointer;
          position: relative;
          z-index: 1;
          min-width: 100px;
        }

        .node-circle-light {
          width: 56px;
          height: 56px;
          background: #ffffff;
          border: 2px solid #e0e0e8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          position: relative;
          transition: all 0.3s ease;
        }

        .timeline-node-light.active .node-circle-light,
        .timeline-node-light:hover .node-circle-light {
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          border-color: transparent;
          transform: scale(1.1);
        }

        .timeline-node-light.active .node-icon-light,
        .timeline-node-light:hover .node-icon-light {
          filter: brightness(0) invert(1);
        }

        .node-icon-light {
          font-size: 24px;
          transition: all 0.3s ease;
        }

        .node-ring-light {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 2px solid #ff6a00;
          border-radius: 50%;
          animation: ring-pulse-light 2s infinite;
        }

        @keyframes ring-pulse-light {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .node-info-light h4 {
          font-size: 1.15rem;
          margin-bottom: 5px;
          color: #1a1a2e;
          font-weight: 700;
        }

        .node-info-light p {
          font-size: 0.95rem;
          color: #6b6b8a;
          margin: 0;
        }

        .timeline-content-light {
          max-width: 800px;
          margin: 0 auto;
        }

        .tc-card-light {
          background: linear-gradient(135deg, #f8f9fc, #ffffff);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .tc-icon-light {
          font-size: 50px;
          display: block;
          margin-bottom: 20px;
        }

        .tc-card-light h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.85rem;
          margin-bottom: 20px;
          color: #ff6a00;
        }

        .tc-card-light p {
          color: #4a4a6a;
          line-height: 1.8;
          font-size: 1.2rem;
        }

        /* Includes Section */
        .includes-section-light {
          padding: 80px 0;
          background: #f8f9fc;
        }

        .includes-grid-light {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        @media (max-width: 991px) {
          .includes-grid-light {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .includes-grid-light {
            grid-template-columns: 1fr;
          }
        }

        .include-card-light {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .include-card-light:hover {
          transform: translateY(-5px);
          border-color: rgba(255,106,0,0.3);
          box-shadow: 0 20px 35px rgba(0,0,0,0.1);
        }

        .include-card-light.premium {
          background: linear-gradient(135deg, #fff8f0, #ffffff);
          border-color: rgba(255,106,0,0.2);
        }

        .ic-icon-light {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(255,106,0,0.1), rgba(227,27,122,0.08));
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .ic-icon-light i {
          font-size: 26px;
          color: #ff6a00;
        }

        .include-card-light h4 {
          font-size: 1.45rem;
          margin-bottom: 10px;
          color: #1a1a2e;
        }

        .include-card-light p {
          font-size: 1.1rem;
          color: #6b6b8a;
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .ic-badge-light {
          display: inline-block;
          background: linear-gradient(135deg, rgba(255,106,0,0.15), rgba(227,27,122,0.1));
          color: #e31b7a;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
        }

        /* Instructor Section */
        .instructor-section-light {
          padding: 80px 0;
          background: #ffffff;
        }

        .instructor-image-light {
          position: relative;
        }

        .instructor-image-light img {
          width: 100%;
          max-width: 350px;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .exp-badge-light {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          color: #fff;
          padding: 10px 24px;
          border-radius: 40px;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 8px 20px rgba(227,27,122,0.3);
        }

        .instructor-info-light {
          padding-left: 40px;
        }

        @media (max-width: 991px) {
          .instructor-info-light {
            padding-left: 0;
            margin-top: 40px;
            text-align: center;
          }
        }

        .ii-label-light {
          display: inline-block;
          background: linear-gradient(135deg, rgba(255,106,0,0.1), rgba(227,27,122,0.08));
          color: #e31b7a;
          padding: 8px 24px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .instructor-info-light h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem;
          margin-bottom: 20px;
          color: #1a1a2e;
          font-weight: 800;
        }

        .ii-desc-light {
          font-size: 1.05rem;
          color: #4a4a6a;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .ii-stats-light {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        @media (max-width: 991px) {
          .ii-stats-light {
            justify-content: center;
          }
        }

        .ii-stats-light div {
          text-align: center;
        }

        .ii-stats-light strong {
          display: block;
          font-size: 2rem;
          color: #ff6a00;
          font-weight: 800;
        }

        .ii-stats-light span {
          font-size: 13px;
          color: #6b6b8a;
          font-weight: 500;
        }

        /* Reviews Section */
        .reviews-section-light {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8f9fc, #ffffff);
        }

        .reviews-carousel-light {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 40px;
        }

        @media (max-width: 991px) {
          .reviews-carousel-light {
            grid-template-columns: 1fr;
          }
        }

        .review-box-light {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 25px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .review-box-light:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          border-color: rgba(255,106,0,0.2);
        }

        .rb-header-light {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 18px;
        }

        .rb-header-light img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ff6a00;
        }

        .rb-header-light h5 {
          margin: 0 0 5px 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .rb-stars-light {
          color: #ffc107;
          font-size: 13px;
          letter-spacing: 2px;
        }

        .review-box-light > p {
          color: #4a4a6a;
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
          font-style: italic;
        }

        .rating-big-light {
          text-align: center;
        }

        .rb-num-light {
          font-size: 4rem;
          font-weight: 800;
          color: #ff6a00;
        }

        .rb-total-light {
          display: block;
          color: #6b6b8a;
          font-size: 14px;
        }

        /* FAQ Section */
        .faq-section-light {
          padding: 60px 0;
          background: #ffffff;
        }

        .faq-list-light {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item-light {
          background: #f8f9fc;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 16px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item-light:hover {
          border-color: rgba(255,106,0,0.3);
        }

        .faq-q-light {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          cursor: pointer;
          font-weight: 700;
          color: #1a1a2e;
          font-size: 1.15rem;
        }

        .faq-q-light i {
          color: #ff6a00;
          transition: transform 0.3s ease;
        }

        .faq-a-light {
          padding: 0 24px 20px;
          color: #4a4a6a;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        /* Final CTA */
        .final-cta-light {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8f9fc, #f0f2f8);
        }

        .cta-box-light {
          background: linear-gradient(135deg, #ffffff, #faf8ff);
          border: 1px solid rgba(255,106,0,0.15);
          border-radius: 32px;
          padding: 50px;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        @media (max-width: 768px) {
          .cta-box-light {
            padding: 35px 25px;
          }
        }

        .cta-box-light h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem;
          margin-bottom: 15px;
          color: #1a1a2e;
          font-weight: 800;
        }

        .cta-box-light > p {
          color: #6b6b8a;
          font-size: 1.25rem;
          margin-bottom: 35px;
        }

        .cta-price-row-light {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .cp-left-light {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .cp-current-light {
          font-size: 3rem;
          font-weight: 800;
          color: #ff6a00;
        }

        .cp-old-light {
          font-size: 1.3rem;
          color: #aaa;
          text-decoration: line-through;
        }

        .cp-save-light {
          background: linear-gradient(135deg, rgba(40,167,69,0.15), rgba(40,167,69,0.08));
          color: #28a745;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
        }

        .cp-btn-light {
          background: linear-gradient(135deg, #ff6a00, #e31b7a);
          color: #fff;
          border: none;
          padding: 16px 48px;
          font-size: 1.15rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(227,27,122,0.3);
        }

        .cp-btn-light:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(227,27,122,0.4);
        }

        .cta-trust-light {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .cta-trust-light span {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b6b8a;
          font-size: 13px;
        }

        .cta-trust-light i {
          color: #28a745;
        }

        /* Modal - Light Theme */
        .modal-overlay-light {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content-light {
          background: #ffffff;
          border-radius: 28px;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
        }

        .modal-header-light {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 28px;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .modal-header-light h4 {
          color: #ff6a00;
          margin: 0;
          font-size: 1.4rem;
          font-weight: 800;
        }

        .close-btn-light {
          background: #f0f0f0;
          border: none;
          color: #666;
          font-size: 20px;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-btn-light:hover {
          background: rgba(255,106,0,0.15);
          color: #ff6a00;
        }

        .modal-body-light {
          padding: 28px;
        }

        .form-group-light {
          margin-bottom: 20px;
        }

        .form-group-light label {
          color: #1a1a2e;
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .form-control-light {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 14px;
          background: #f8f9fc;
          color: #1a1a2e;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-control-light:focus {
          outline: none;
          border-color: #ff6a00;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(255,106,0,0.1);
        }

        select.form-control-light option {
          background: #ffffff;
          color: #1a1a2e;
        }

        .modal-footer-light {
          display: flex;
          gap: 15px;
          padding: 0 28px 28px;
        }

        .btn-secondary-light {
          flex: 1;
          padding: 14px;
          border-radius: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          background: #f0f0f0;
          border: none;
          color: #666;
        }

        .btn-secondary-light:hover {
          background: #e0e0e0;
        }

        .btn-payment-light {
          flex: 1;
          padding: 14px;
          border-radius: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          background: linear-gradient(135deg, #28a745, #34ce57);
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-payment-light:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .fee-info-light {
          background: linear-gradient(135deg, rgba(255,106,0,0.08), rgba(227,27,122,0.05));
          border: 1px solid rgba(255,106,0,0.15);
          padding: 18px;
          border-radius: 16px;
          text-align: center;
          margin-top: 25px;
        }

        .fee-amount-light {
          color: #ff6a00;
          font-size: 28px;
          font-weight: 800;
        }

        .text-muted-light {
          color: #6b6b8a;
          font-size: 12px;
        }

        /* Responsive Styles */
        @media (max-width: 991px) {
          .hero-title-light {
            font-size: 2.4rem;
          }
          .hero-highlights-light {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-title-light {
            font-size: 1.8rem;
          }
          .hero-highlights-light {
            grid-template-columns: 1fr;
          }
          .btn-primary-light {
            padding: 12px 30px;
          }
          .timeline-node-light {
            flex: 0 0 calc(50% - 10px);
          }
          .tc-card-light {
            padding: 25px;
          }
          .cp-current-light {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 576px) {
          .hero-title-light {
            font-size: 1.5rem;
          }
          .hero-infographic-light img {
            height: 100px;
          }
          .section-title-center-light {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
}

export default CertificationCourses;