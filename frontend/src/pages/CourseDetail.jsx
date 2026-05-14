import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import SuccessModal from '../components/SuccessModal';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundCourse = coursesData.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      document.title = `${foundCourse.title} | Cosmic Light Astrology`;
      // Simulate small load for UI smoothness
      setTimeout(() => setLoading(false), 500);
    } else {
      navigate('/courses');
    }
  }, [courseId, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          type: 'Course-Inquiry', 
          courseName: course.title 
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowInquiryModal(false);
        setIsSuccessOpen(true);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (err) {
      toast.error('Network Error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF6EE' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <style>{`
        .course-detail-page {
          background: #FDF6EE;
          min-height: 100vh;
          padding-bottom: 100px;
        }

        .detail-hero {
          background: linear-gradient(135deg, #2A0F02 0%, #8B4A1E 100%);
          padding: 120px 0 140px;
          color: #FFF;
          position: relative;
          overflow: hidden;
        }

        .detail-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://www.transparenttextures.com/patterns/stardust.png');
          opacity: 0.3;
          animation: drift 60s linear infinite;
        }

        @keyframes drift {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }

        .hero-decoration {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(200, 131, 42, 0.15) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          border-radius: 50%;
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }

        .back-link {
          color: #FFFFFF !important;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          margin-bottom: 30px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 5;
        }

        .back-link:hover {
          color: #C8832A;
          transform: translateX(-5px);
        }

        .detail-hero h1 {
          font-family: 'Playfair Display', serif;
          color: #FFFFFF !important;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 25px;
          line-height: 1.2;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .hero-meta {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .hero-meta-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.08);
          padding: 12px 25px;
          border-radius: 50px;
          font-size: 1rem;
          color: #FFFFFF !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
        }

        .hero-meta-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
          border-color: #C8832A;
        }

        .hero-meta-item i {
          color: #C8832A;
          font-size: 1.1rem;
        }

        .detail-hero-img {
          width: 350px;
          height: 350px;
          object-fit: cover;
          border-radius: 40px;
          border: 6px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        .main-content {
          margin-top: -60px;
          position: relative;
          z-index: 10;
          padding-bottom: 20px;
        }

        .content-card {
          background: #FFF;
          border-radius: 35px;
          padding: 50px 45px;
          box-shadow: 0 30px 70px rgba(139, 74, 30, 0.08);
          border: 1px solid rgba(139, 74, 30, 0.05);
          transition: all 0.4s ease;
        }

        .content-card:hover {
          box-shadow: 0 40px 90px rgba(139, 74, 30, 0.12);
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          color: #2A0F02;
          margin-bottom: 35px;
          position: relative;
          padding-bottom: 20px;
          font-weight: 700;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #C8832A, transparent);
          border-radius: 2px;
        }

        .description-text {
          font-size: 1.2rem;
          line-height: 1.9;
          color: #4A3022;
          margin-bottom: 50px;
          position: relative;
          padding-left: 20px;
          border-left: 3px solid rgba(200, 131, 42, 0.2);
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }

        .topic-item {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #FFFBF5;
          padding: 18px 25px;
          border-radius: 20px;
          border: 1px solid rgba(200, 131, 42, 0.08);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .topic-item:hover {
          transform: translateX(10px) scale(1.02);
          border-color: #C8832A;
          background: #FDF6EE;
          box-shadow: 0 10px 20px rgba(200, 131, 42, 0.1);
        }

        .topic-item i {
          color: #C8832A;
          font-size: 1.2rem;
        }

        .topic-item span {
          font-weight: 600;
          color: #2A0F02;
          font-size: 1rem;
        }

        .enroll-sidebar {
          position: sticky;
          top: 130px;
          z-index: 5;
          margin-bottom: 30px;
          margin-left: 15px;
        }

        .enroll-card {
          background: linear-gradient(135deg, #2A0F02 0%, #1a0a01 100%);
          color: #FFF;
          padding: 40px 30px;
          border-radius: 40px;
          text-align: center;
          box-shadow: 0 30px 60px rgba(42, 15, 2, 0.25);
          border: 1px solid rgba(200, 131, 42, 0.15);
          position: relative;
          overflow: hidden;
        }

        .enroll-card::before {
          content: '✨';
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 2rem;
          opacity: 0.2;
        }

        .enroll-card h4 {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          margin-bottom: 25px;
          font-weight: 700;
        }

        .enroll-price {
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 12px;
          color: #C8832A;
          text-shadow: 0 0 20px rgba(200, 131, 42, 0.3);
        }

        .enroll-sub {
          font-size: 0.95rem;
          opacity: 0.8;
          margin-bottom: 30px;
          line-height: 1.4;
        }

        .enroll-badge {
          display: inline-block;
          background: #C8832A;
          color: #FFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .t-badge {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .t-badge i {
          color: #C8832A;
        }

        .sidebar-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 25px;
        }

        .feature-icon-circle {
          width: 80px;
          height: 80px;
          background: #FDF6EE;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #C8832A;
          margin: 0 auto 20px;
          box-shadow: 0 10px 20px rgba(200, 131, 42, 0.1);
          transition: all 0.3s ease;
        }

        .feature-icon-circle:hover {
          background: #C8832A;
          color: #FFF;
          transform: rotate(360deg);
        }

        .why-choose-box {
          background: #FDF6EE;
          padding: 40px;
          border-radius: 30px;
          border: 1px solid rgba(200, 131, 42, 0.1);
        }

        .why-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .why-icon {
          width: 40px;
          height: 40px;
          background: #FFF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C8832A;
          flex-shrink: 0;
          box-shadow: 0 5px 10px rgba(0,0,0,0.05);
        }

        .contact-small-card {
          background: #FFF;
          padding: 20px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          border: 1px solid rgba(139, 74, 30, 0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .contact-small-card i {
          font-size: 1.5rem;
          color: #C8832A;
        }

        .mobile-cta {
          position: fixed;
          bottom: 15px;
          left: 15px;
          right: 15px;
          background: rgba(42, 15, 2, 0.95);
          backdrop-filter: blur(15px);
          padding: 14px 22px;
          border-radius: 28px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          border: 1px solid rgba(200, 131, 42, 0.3);
          animation: mobileSlideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes mobileSlideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .mobile-cta p.small {
          color: #C8832A !important;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0;
        }

        .mobile-cta .btn-enquire {
          background: linear-gradient(135deg, #C8832A 0%, #8B4A1E 100%);
          color: #FFF;
          border: none;
          padding: 12px 28px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 0.95rem;
          box-shadow: 0 8px 20px rgba(200, 131, 42, 0.3);
          text-transform: uppercase;
          animation: ctaPulse 2s infinite;
        }

        @keyframes ctaPulse {
          0% { box-shadow: 0 0 0 0 rgba(200, 131, 42, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(200, 131, 42, 0); }
          100% { box-shadow: 0 0 0 0 rgba(200, 131, 42, 0); }
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: #C8832A;
          color: #FFF;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          z-index: 2000;
          transition: all 0.3s ease;
          opacity: 0.9;
        }

        .back-to-top:hover {
          opacity: 1;
          transform: translateY(-5px);
          background: #2A0F02;
        }

        .enroll-btn {
          display: block;
          width: 100%;
          background: #FFF;
          color: #2A0F02;
          padding: 15px;
          border-radius: 15px;
          font-weight: 700;
          text-decoration: none;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          border: none;
        }

        .enroll-btn:hover {
          background: #C8832A;
          color: #FFF;
          transform: translateY(-3px);
        }

        .features-list {
          text-align: left;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .features-list i {
          color: #C8832A;
        }

        /* Inquiry Modal */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          background: #FFFBF5;
          max-width: 500px;
          width: 100%;
          border-radius: 30px;
          padding: 40px;
          position: relative;
          border: 1px solid rgba(139, 74, 30, 0.2);
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #2A0F02;
        }

        .modal-content h3 {
          font-family: 'Playfair Display', serif;
          margin-bottom: 10px;
          color: #2A0F02;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #8B4A1E;
          font-size: 0.9rem;
        }

        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border-radius: 12px;
          border: 1.5px solid rgba(139, 74, 30, 0.1);
          background: #FFF;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          border-color: #C8832A;
          box-shadow: 0 0 0 4px rgba(200, 131, 42, 0.1);
        }

        .submit-btn {
          width: 100%;
          background: #2A0F02;
          color: #FFF;
          padding: 15px;
          border-radius: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: #8B4A1E;
          transform: translateY(-2px);
        }

        @media (max-width: 1200px) {
          .content-card {
            padding: 40px 30px;
          }
          .enroll-card {
            padding: 35px 20px;
          }
          .section-title {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .detail-hero {
            padding: 100px 0 80px;
            text-align: center;
          }
          .hero-meta {
            justify-content: center;
            gap: 10px;
          }
          .hero-meta-item {
            padding: 8px 15px;
            font-size: 0.85rem;
            background: rgba(255, 255, 255, 0.05);
          }
          .main-content {
            margin-top: -40px;
          }
          .section-title {
            font-size: 1.7rem;
            text-align: center;
            margin-bottom: 25px;
          }
          .section-title::after {
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
          }
          .description-text {
            font-size: 1.1rem;
            padding-left: 0;
            border-left: none;
            text-align: center;
            line-height: 1.7;
          }
          .topic-item {
            padding: 15px 20px;
            justify-content: center;
          }
        }

        @media (max-width: 992px) {
          .main-content {
            margin-top: -30px;
          }
          .enroll-sidebar {
            position: static;
            margin-top: 40px;
            margin-left: 0;
          }
          .content-card {
            padding: 30px;
            border-radius: 25px;
          }
          .back-to-top {
            right: 15px;
            bottom: 90px;
            width: 45px;
            height: 45px;
          }
        }
      `}</style>

      <section className="detail-hero">
        <div className="hero-decoration"></div>
        <div className="container">
          <Link to="/courses" className="back-link" data-aos="fade-right">
            <i className="fas fa-arrow-left"></i> Back to Courses
          </Link>
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-up">
              <h1>{course.title}</h1>
              <div className="hero-meta">
                <div className="hero-meta-item" data-aos="zoom-in" data-aos-delay="100">
                  <i className="fas fa-clock"></i>
                  {course.duration}
                </div>
                <div className="hero-meta-item" data-aos="zoom-in" data-aos-delay="200">
                  <i className="fas fa-calendar-alt"></i>
                  {course.schedule}
                </div>
                <div className="hero-meta-item" data-aos="zoom-in" data-aos-delay="300">
                  <i className="fas fa-layer-group"></i>
                  {course.level}
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center d-none d-lg-block" data-aos="zoom-in" data-aos-delay="400">
              <img src={course.image} alt={course.title} className="detail-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <div className="container main-content">
        <div className="row g-5">
          <div className="col-lg-8" data-aos="fade-up">
            <div className="content-card">
              <h2 className="section-title">Course Overview</h2>
              <div className="description-text">
                {course.longDesc}
              </div>

              <h2 className="section-title" data-aos="fade-up">What You Will Learn</h2>
              <div className="topics-grid">
                {course.topics.map((topic, i) => (
                  <div key={i} className="topic-item" data-aos="fade-up" data-aos-delay={i * 50}>
                    <i className="fas fa-check-circle"></i>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>

              <h2 className="section-title" data-aos="fade-up">Course Features</h2>
              <div className="row g-4 mb-5">
                {[
                  { icon: 'broadcast-tower', title: 'Live Interactive Classes', desc: 'Step-by-step teaching method' },
                  { icon: 'user-graduate', title: 'Practical Training', desc: 'Real-world prediction techniques' },
                  { icon: 'headset', title: 'Ongoing Support', desc: 'Guidance even after course completion' }
                ].map((f, i) => (
                  <div key={i} className="col-md-4 text-center" data-aos="zoom-in" data-aos-delay={i * 100}>
                    <div className="feature-icon-circle">
                      <i className={`fas fa-${f.icon}`}></i>
                    </div>
                    <h5 className="fw-bold">{f.title}</h5>
                    <p className="small text-muted">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Why Choose Us Section */}
              <div className="why-choose-box" data-aos="fade-up">
                <h3 className="mb-4">Why Study with Cosmic Light?</h3>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="why-item">
                      <div className="why-icon"><i className="fas fa-microchip"></i></div>
                      <div>
                        <h6>Scientific Approach</h6>
                        <p className="small mb-0">We combine ancient wisdom with modern logical explanations.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="why-item">
                      <div className="why-icon"><i className="fas fa-infinity"></i></div>
                      <div>
                        <h6>Lifetime Community</h6>
                        <p className="small mb-0">Join our alumni network for continuous learning and updates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-left" data-aos-delay="200">
            <div className="enroll-sidebar">
              <div className="enroll-card">
                <div className="enroll-badge">LIMITED SLOTS</div>
                <h4>Start Your Journey</h4>
                <div className="enroll-price">₹ Enquire Now</div>
                <p className="enroll-sub">Get personalized fee structure & syllabus PDF</p>
                
                <button className="enroll-btn" onClick={() => setShowInquiryModal(true)}>
                  Reserve Your Seat <i className="fas fa-chevron-right ms-2"></i>
                </button>

                <div className="trust-badges">
                  <div className="t-badge"><i className="fas fa-shield-alt"></i> Verified</div>
                  <div className="t-badge"><i className="fas fa-certificate"></i> Certified</div>
                  <div className="t-badge"><i className="fas fa-clock"></i> Lifetime</div>
                </div>

                <div className="sidebar-divider"></div>

                <ul className="features-list">
                  {[
                    { icon: 'certificate', text: 'Professional Certification' },
                    { icon: 'video', text: 'Live Recording Access' },
                    { icon: 'book-open', text: 'Exclusive Study Notes' },
                    { icon: 'whatsapp', text: 'Student Support Group', fab: true }
                  ].map((item, idx) => (
                    <li key={idx} data-aos="fade-left" data-aos-delay={300 + (idx * 100)}>
                      <i className={`${item.fab ? 'fab' : 'fas'} fa-${item.icon}`}></i> {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-small-card mt-4" data-aos="fade-up">
                <i className="fas fa-question-circle"></i>
                <div>
                  <p className="mb-0 fw-bold">Have Questions?</p>
                  <p className="mb-0 small text-muted">Call/WhatsApp: +91 91155 05353</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="mobile-cta d-lg-none">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            <p className="small">Upcoming Batch</p>
            <p className="mb-0 fw-bold text-white">Join Today</p>
          </div>
          <button className="btn-enquire" onClick={() => setShowInquiryModal(true)}>
            ENQUIRE
          </button>
        </div>
      </div>

      {/* Back to Top */}
      <button 
        className="back-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        id="backToTop"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {showInquiryModal && (
        <div className="modal-overlay" onClick={() => setShowInquiryModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} data-aos="zoom-in">
            <button className="modal-close" onClick={() => setShowInquiryModal(false)}>&times;</button>
            <h3>Course Inquiry</h3>
            <p className="text-muted mb-4">Please fill in your details and our team will get back to you with batch timings and fee structure.</p>
            
            <form onSubmit={handleInquirySubmit}>
              <div className="form-group">
                <label>Selected Course</label>
                <input type="text" value={course.title} disabled style={{ background: '#eee' }} />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10 Digit Phone Number" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required />
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </div>
      )}

      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
        title="Inquiry Received!"
        message={`Thank you for your interest in ${course?.title}. Our academic counselor will contact you shortly with the syllabus, batch timings, and special fee offers.`}
      />
    </div>
  );
}

export default CourseDetail;
