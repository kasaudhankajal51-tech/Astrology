import { useState } from 'react';
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
      name: "Marriage/Relationship",
      cards: [
        {
          title: "Marriage Timing",
          desc: "Detailed consultation about your marriage timing based on birth chart analysis.",
          badge: "Consultation for Married Life issues",
          badgeColor: "purple",
          img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
          short: "Marriage timing"
        },
        {
          title: "Love vs Arranged Marriage",
          desc: "Understanding your marriage prospects and compatibility through ancient Vedic methods.",
          badge: "Love Marriage Analysis",
          badgeColor: "pink",
          img: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&q=80&w=800",
          short: "Love vs Arranged"
        },
        {
          title: "Delay in Marriage",
          desc: "Astrological reasons and effective Vedic remedies for overcoming marriage delays.",
          badge: "Remedial Consultation",
          badgeColor: "orange",
          img: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&q=80&w=800",
          short: "Delay in Marriage"
        },
        {
          title: "Relationship Problems",
          desc: "Heal your relationship and find harmony through deep astrological insight.",
          badge: "Relationship Healing",
          badgeColor: "pink",
          img: "https://images.unsplash.com/photo-1534533983688-c7b8e13fd3b6?auto=format&fit=crop&q=80&w=800",
          short: "Relationship Issues"
        }
      ]
    },
    {
      name: "Personal Horoscope",
      cards: [
        {
          title: "Personal Horoscope",
          desc: "Complete personal horoscope analysis for clarity in all life aspects and future roadmap.",
          badge: "Premium Chart Reading",
          badgeColor: "purple",
          img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
          short: "Full Horoscope"
        },
        {
          title: "Mangal Dosha",
          desc: "Deep analysis and proven remedies for Mangal Dosha and its impact on your life path.",
          badge: "Manglik Dosh Expert",
          badgeColor: "pink",
          img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800",
          short: "Mangal Dosha"
        },
        {
          title: "Pre-Marriage Counselling",
          desc: "Counselling before marriage for better understanding, compatibility and spiritual alignment.",
          badge: "Compatibility Check",
          badgeColor: "red",
          img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
          short: "Pre-Marriage Info"
        }
      ]
    }
  ];

  return (
    <>
      <section className="consultation-page">
        <div className="container">
          <div className="text-center mb-5">
            <h5 className="section-subtitle" data-aos="fade-up">Professional Guidance</h5>
            <h2 className="section-title text-white mt-2" data-aos="fade-up">CONSULTATION</h2>
            <div className="title-underline mx-auto"></div>
          </div>

          {consultationCategories.map((cat, idx) => (
            <div key={idx} className="category-group mb-5">
              <div className="category-header mb-4" data-aos="fade-right">
                <span className="category-line"></span>
                <h3 className="category-title">{cat.name}</h3>
                <span className="category-line"></span>
              </div>
              
              <div className="card-grid">
                {cat.cards.map((card, cIdx) => (
                  <div className="consult-card" key={cIdx} data-aos="zoom-in" data-aos-delay={cIdx * 100}>
                    <div className="card-media">
                      <img src={card.img} alt={card.title} />
                      <div className="card-overlay"></div>
                      <div className={`premium-badge ${card.badgeColor}`}>
                        <span>{card.badge}</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <h4>{card.short}</h4>
                      <div className="card-btns">
                        <button className="btn-mystic-sm outline" onClick={() => openPopup(card.title, card.desc)}>
                          Details
                        </button>
                        <button className="btn-mystic-sm primary" onClick={() => openModal(card.title)}>
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Popup */}
      {popupData.isOpen && (
        <div className="mystic-popup-overlay" onClick={closePopup}>
          <div className="mystic-popup-content glass-panel" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>&times;</button>
            <h3 className="text-gradient mb-3">{popupData.title}</h3>
            <p className="text-light opacity-75">{popupData.desc}</p>
            <button className="btn-mystic-sm primary mt-4 w-100" onClick={() => { closePopup(); openModal(popupData.title); }}>
              Book This Consultation
            </button>
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

      <style>{`
        .consultation-page {
          padding: 60px 0 100px;
          background: var(--cosmic-dark);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Prevent AOS horizontal scroll */
        body {
          overflow-x: hidden;
        }

        .title-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #ff6a00, #ff0080);
          border-radius: 2px;
          margin-top: 15px;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 20px;
          justify-content: center;
        }

        .category-line {
          flex: 0 1 100px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .category-title {
          font-family: 'Merriweather Sans', serif;
          font-size: 1.5rem;
          color: var(--cosmic-accent);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          margin: 0;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        .consult-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(10px);
        }

        .consult-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 106, 0, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          background: rgba(255, 255, 255, 0.06);
        }

        .card-media {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s;
        }

        .consult-card:hover .card-media img {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7, 9, 19, 0.8), transparent);
        }

        .premium-badge {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 15px;
          text-align: center;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #fff;
          backdrop-filter: blur(5px);
        }

        .premium-badge.purple { background: linear-gradient(90deg, rgba(138, 43, 226, 0.8), rgba(75, 0, 130, 0.8)); }
        .premium-badge.pink { background: linear-gradient(90deg, rgba(255, 0, 128, 0.8), rgba(200, 0, 100, 0.8)); }
        .premium-badge.orange { background: linear-gradient(90deg, rgba(255, 106, 0, 0.8), rgba(255, 69, 0, 0.8)); }
        .premium-badge.red { background: linear-gradient(90deg, rgba(212, 20, 90, 0.8), rgba(150, 0, 50, 0.8)); }

        .card-content {
          padding: 25px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-content h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 20px;
          line-height: 1.4;
        }

        .card-btns {
          display: flex;
          gap: 12px;
        }

        .btn-mystic-sm {
          flex: 1;
          padding: 10px 5px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          cursor: pointer;
          transition: 0.3s;
          border: none;
          text-align: center;
        }

        .btn-mystic-sm.outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .btn-mystic-sm.outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #fff;
        }

        .btn-mystic-sm.primary {
          background: linear-gradient(135deg, #ff6a00, #ff0080);
          color: #fff;
          box-shadow: 0 4px 15px rgba(255, 106, 0, 0.3);
        }

        .btn-mystic-sm.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 106, 0, 0.5);
        }

        /* Popup Styles */
        .mystic-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .mystic-popup-content {
          max-width: 500px;
          width: 100%;
          padding: 40px;
          position: relative;
          animation: popupSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popupSlideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .popup-close {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 2rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: 0.3s;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 1200px) {
          .card-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .consultation-page { padding: 40px 15px; }
          .category-title { font-size: 1.2rem; }
          .card-grid { 
            grid-template-columns: 1fr; 
            max-width: 450px;
            margin: 0 auto;
          }
          .consult-card { margin-bottom: 20px; }
        }
      `}</style>
    </>
  );
}

export default Consultations;
