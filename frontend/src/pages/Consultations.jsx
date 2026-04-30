import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ConsultationModal from '../components/ConsultationModal';

function Consultations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', desc: '', isOpen: false });

  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Consultation', courseName: formData.consultationType || 'General Consultation' })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Consultation booked successfully!');
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', consultationType: '', message: '' });
      } else {
        toast.error(data.error || 'Error submitting booking');
      }
    } catch (error) {
      toast.error('Connection Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (type = '') => {
    if (type) setFormData(prev => ({ ...prev, consultationType: type }));
    setIsModalOpen(true);
  };

  const openPopup = (title, desc) => {
    setPopupData({ title, desc, isOpen: true });
  };

  const closePopup = () => {
    setPopupData({ ...popupData, isOpen: false });
  };

  const consultationCategories = [
    {
      name: "Marriage & Relationship",
      icon: "fa-heart",
      cards: [
        {
          title: "Marriage Timing",
          desc: "Unveil the exact periods favored by planets for your union. Our expert analysis covers Dashas and Transits to predict the most auspicious time for your marriage.",
          badge: "Timing Analysis",
          badgeColor: "purple",
          img: "/images/consult_marriage.png",
          short: "Marriage Timing"
        },
        {
          title: "Love vs Arranged",
          desc: "Explore your natal chart to see if your stars favor a self-chosen or family-blessed union. Gain clarity on your marital path through Vedic insights.",
          badge: "Union Analysis",
          badgeColor: "pink",
          img: "/images/consult_marriage.png",
          short: "Love vs Arranged"
        },
        {
          title: "Marriage Delay Remedies",
          desc: "Identify planetary obstructions like Mangal Dosha or Shani's influence. Receive potent Vedic remedies to clear the path for a timely and happy marriage.",
          badge: "Remedial Expert",
          badgeColor: "orange",
          img: "/images/consult_marriage.png",
          short: "Delay Solutions"
        },
        {
          title: "Relationship Healing",
          desc: "Resolve conflicts and strengthen your bond. We analyze synastry and individual temperaments to provide guidance for a harmonious partnership.",
          badge: "Harmony Healing",
          badgeColor: "pink",
          img: "/images/consult_marriage.png",
          short: "Relationship Issues"
        }
      ]
    },
    {
      name: "Destiny & Career",
      icon: "fa-briefcase",
      cards: [
        {
          title: "Full Career Roadmap",
          desc: "Discover your professional calling and peak periods of success. Map out your career trajectory with precision based on your 10th house analysis.",
          badge: "Success Guide",
          badgeColor: "purple",
          img: "/images/consult_career.png",
          short: "Career Growth"
        },
        {
          title: "Financial Abundance",
          desc: "Identify your wealth-creating yogas and periods of financial prosperity. Learn how to manage challenges and maximize your earnings potential.",
          badge: "Wealth Insights",
          badgeColor: "orange",
          img: "/images/consult_finance.png",
          short: "Wealth & Finance"
        }
      ]
    },
    {
      name: "Premium Chart Readings",
      icon: "fa-star",
      cards: [
        {
          title: "Personal Life Purpose",
          desc: "Go beyond predictions to understand your soul's journey. A deep dive into your Navamsha and Moon chart for true spiritual and life clarity.",
          badge: "Life Purpose",
          badgeColor: "purple",
          img: "/images/consult_personal.png",
          short: "Personal Horoscope"
        },
        {
          title: "Mangal Dosha Analysis",
          desc: "Comprehensive check for Mangal Dosha with its intensity and cancellation (Nivaran) factors. Crucial for marital stability and peace.",
          badge: "Dosha Specialist",
          badgeColor: "pink",
          img: "/images/consult_personal.png",
          short: "Mangal Dosha"
        },
        {
          title: "Pre-Marriage Counselling",
          desc: "Align your futures before the big step. Our counselling focuses on emotional compatibility, family values, and spiritual synchronicity.",
          badge: "Alignment Check",
          badgeColor: "red",
          img: "/images/consult_personal.png",
          short: "Pre-Marriage"
        }
      ]
    }
  ];

  return (
    <>
      <section className="consultation-page">
        <div className="page-header-bg"></div>
        <div className="container position-relative">
          <div className="text-center mb-5 pb-4">
            <h5 className="section-subtitle" data-aos="fade-down">Divine Guidance for Every Path</h5>
            <h2 className="section-title mt-2" data-aos="fade-up">Personal Consultations</h2>
            <p className="header-desc mx-auto" data-aos="fade-up" data-aos-delay="100">
              Expert astrological insights tailored to your unique journey. Choose from our specialized categories below to book your session.
            </p>
            <div className="title-underline mx-auto"></div>
          </div>

          {consultationCategories.map((cat, idx) => (
            <div key={idx} className="category-section mb-5 pb-4">
              <div className="category-header d-flex align-items-center mb-5" data-aos="fade-right">
                <div className="category-icon-box">
                  <i className={`fas ${cat.icon}`}></i>
                </div>
                <h3 className="category-name ms-3 mb-0">{cat.name}</h3>
                <div className="category-line-flex ms-4"></div>
              </div>
              
              <div className="consult-grid">
                {cat.cards.map((card, cIdx) => (
                  <div className="consult-card-wrapper" key={cIdx} data-aos="fade-up" data-aos-delay={cIdx * 100}>
                    <div className="consult-card">
                      <div className="card-image-box">
                        <img src={card.img} alt={card.title} />
                        <div className="card-overlay-gradient"></div>
                        <div className={`status-badge ${card.badgeColor}`}>
                          {card.badge}
                        </div>
                      </div>
                      <div className="card-info">
                        <h4>{card.short}</h4>
                        <p className="card-preview-text">{card.desc.substring(0, 80)}...</p>
                        <div className="card-actions">
                          <button className="btn-action secondary" onClick={() => openPopup(card.title, card.desc)}>
                            <i className="fas fa-info-circle me-2"></i> Details
                          </button>
                          <button className="btn-action primary" onClick={() => openModal(card.title)}>
                            Book Now <i className="fas fa-arrow-right ms-2"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Info Popup */}
      {popupData.isOpen && (
        <div className="mystic-popup-overlay" onClick={closePopup}>
          <div className="mystic-popup-content-box" onClick={e => e.stopPropagation()}>
            <button className="close-trigger" onClick={closePopup}>
              <i className="fas fa-times"></i>
            </button>
            <div className="popup-art"></div>
            <div className="popup-body p-4 p-md-5">
              <h3 className="popup-heading mb-4">{popupData.title}</h3>
              <div className="popup-description-wrapper">
                <p>{popupData.desc}</p>
              </div>
              <div className="popup-benefits mt-4">
                <div className="benefit-item"><i className="fas fa-check-circle"></i> Private & Confidential</div>
                <div className="benefit-item"><i className="fas fa-check-circle"></i> Personalized Remedies</div>
                <div className="benefit-item"><i className="fas fa-check-circle"></i> Professional Guidance</div>
              </div>
              <button className="book-popup-btn mt-5 w-100" onClick={() => { closePopup(); openModal(popupData.title); }}>
                Book Consultation Now
              </button>
            </div>
          </div>
        </div>
      )}

      <ConsultationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <style jsx>{`
        .consultation-page {
          padding: 160px 0 120px;
          background: var(--cosmic-bg);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .page-header-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 600px;
          background: radial-gradient(circle at 50% 0%, var(--cosmic-accent-soft), transparent 70%);
          opacity: 0.5;
          pointer-events: none;
        }

        .section-subtitle {
          color: var(--cosmic-accent-pink);
          text-transform: uppercase;
          letter-spacing: 5px;
          font-weight: 800;
          font-size: 0.9rem;
          margin-bottom: 20px;
          display: block;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 800;
          color: var(--cosmic-text);
          margin-bottom: 25px;
        }

        .header-desc {
          max-width: 700px;
          color: var(--cosmic-text-muted);
          font-size: 1.15rem;
          line-height: 1.7;
          font-weight: 500;
        }

        .title-underline {
          width: 80px;
          height: 5px;
          background: var(--cosmic-gradient);
          border-radius: 10px;
          margin-top: 35px;
        }

        /* Category Header */
        .category-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          color: var(--cosmic-text);
          font-weight: 800;
        }

        .category-icon-box {
          width: 60px;
          height: 60px;
          background: var(--cosmic-white);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--cosmic-accent-pink);
          box-shadow: var(--premium-shadow);
          border: 1px solid var(--glass-border);
        }

        .category-line-flex {
          flex-grow: 1;
          height: 1px;
          background: linear-gradient(to right, var(--glass-border), transparent);
        }

        /* Consult Grid */
        .consult-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 35px;
        }

        .consult-card-wrapper {
          perspective: 1000px;
        }

        .consult-card {
          background: var(--cosmic-white);
          border: 1px solid var(--glass-border);
          border-radius: 35px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: var(--premium-shadow);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .consult-card:hover {
          transform: translateY(-15px) rotateX(2deg);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
        }

        .card-image-box {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .card-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .consult-card:hover .card-image-box img {
          transform: scale(1.1);
        }

        .card-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
        }

        .status-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #fff;
          backdrop-filter: blur(8px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .status-badge.purple { background: rgba(107, 33, 168, 0.8); }
        .status-badge.pink { background: rgba(227, 27, 122, 0.8); }
        .status-badge.orange { background: rgba(234, 88, 12, 0.8); }
        .status-badge.red { background: rgba(220, 38, 38, 0.8); }

        .card-info {
          padding: 30px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-info h4 {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--cosmic-text);
          margin-bottom: 15px;
        }

        .card-preview-text {
          color: var(--cosmic-text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 25px;
          flex-grow: 1;
        }

        .card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .btn-action {
          padding: 12px;
          border-radius: 15px;
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: 0.4s;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-action.secondary {
          background: #f1f5f9;
          color: var(--cosmic-text);
        }

        .btn-action.primary {
          background: var(--cosmic-gradient);
          color: #fff;
          box-shadow: 0 10px 20px rgba(227, 27, 122, 0.2);
        }

        .btn-action:hover {
          transform: translateY(-3px);
        }

        .btn-action.secondary:hover {
          background: var(--cosmic-accent-soft);
          color: var(--cosmic-accent-pink);
        }

        .btn-action.primary:hover {
          box-shadow: 0 15px 30px rgba(227, 27, 122, 0.4);
        }

        /* Popup Styles */
        .mystic-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .mystic-popup-content-box {
          background: var(--cosmic-white);
          width: 100%;
          max-width: 600px;
          border-radius: 40px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,0.2);
          border: 1px solid var(--glass-border);
          animation: popupFade 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        @keyframes popupFade {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .close-trigger {
          position: absolute;
          top: 25px;
          right: 25px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--cosmic-white);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: 0.3s;
        }

        .close-trigger:hover {
          background: var(--cosmic-accent-pink);
          color: #fff;
          transform: rotate(90deg);
        }

        .popup-art {
          height: 12px;
          background: var(--cosmic-gradient);
        }

        .popup-body p-4 p-md-5 {
        }

        .popup-heading {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--cosmic-text);
        }

        .popup-description-wrapper p {
          color: var(--cosmic-text-muted);
          font-size: 1.1rem;
          line-height: 1.8;
          font-weight: 500;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
          font-weight: 700;
          color: var(--cosmic-text);
        }

        .benefit-item i {
          color: var(--cosmic-accent-pink);
          font-size: 1.2rem;
        }

        .book-popup-btn {
          padding: 18px;
          border-radius: 20px;
          background: var(--cosmic-gradient);
          color: #fff;
          border: none;
          font-weight: 800;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 15px 30px rgba(227, 27, 122, 0.3);
          transition: 0.4s;
          cursor: pointer;
        }

        .book-popup-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(227, 27, 122, 0.5);
        }

        /* Mobile Breakpoints */
        @media (max-width: 1200px) {
          .consult-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 991px) {
          .consultation-page { padding-top: 140px; }
          .category-name { font-size: 1.8rem; }
          .category-icon-box { width: 50px; height: 50px; font-size: 1.2rem; }
        }

        @media (max-width: 767px) {
          .consult-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 2.5rem; }
          .card-actions { grid-template-columns: 1fr; }
          .mystic-popup-content-box { border-radius: 30px; }
          .popup-heading { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}

export default Consultations;
