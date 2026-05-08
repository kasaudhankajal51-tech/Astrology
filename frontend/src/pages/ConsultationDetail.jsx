import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ConsultationModal from '../components/ConsultationModal';

function ConsultationDetail() {
  const { serviceId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data mapping (Same as Consultations.jsx)
  const allServices = [
    {
      id: 'tarot',
      title: "Tarot Card Reading",
      desc: "Get clarity and intuitive guidance regarding love, relationships, career, marriage, and life decisions. In this session, cards are read intuitively to give accurate answers and practical guidance.",
      price: "₹5400",
      duration: "45 min",
      img: "/images/tarot_thumbnail.png",
      category: "Tarot Sessions"
    },
    {
      id: 'zoom-session',
      title: "45-minute Zoom Call Session",
      desc: "Tarot reading helps you understand the current energies around you and gives clear guidance regarding love, career, relationships, marriage, finances, and life decisions. In this session, cards are read intuitively to give accurate answers and practical guidance. This video session is ideal if you want quick clarity about a situation or decision with a face-to-face connection.",
      price: "₹7200",
      duration: "45 min",
      img: "/images/premium_tarot.png",
      category: "Tarot Sessions"
    },
    {
      id: 'phone-session',
      title: "45-minute Phone Call Session",
      desc: "Personalized guidance over a phone call. Cards are read intuitively to give accurate answers and practical guidance regarding your most pressing life questions. Ideal for those who prefer a private voice conversation.",
      price: "₹5400",
      duration: "45 min",
      img: "/images/tarot-card.webp",
      category: "Tarot Sessions"
    },
    {
      id: 'career',
      title: "Career Consultation",
      desc: "Vedic astrology provides deep and accurate analysis based on your birth chart (Kundali). Get guidance about job, promotion, business, career change, government job chances, foreign opportunities, and financial growth. Understand your destiny and upcoming opportunities.",
      price: "₹3600",
      duration: "30-40 min",
      img: "/images/consult_career.png",
      category: "Vedic Astrology"
    },
    {
      id: 'marriage',
      title: "Marriage Consultation",
      desc: "Get detailed prediction about marriage timing, love vs arranged marriage, delay in marriage, relationship problems, and married life stability. We analyze your birth chart to provide deep and accurate insights into your marital destiny.",
      price: "₹2700",
      duration: "30-40 min",
      img: "/images/consult_marriage.png",
      category: "Vedic Astrology"
    },
    {
      id: 'divorce',
      title: "Divorce Consultation",
      desc: "Understand separation possibilities, legal stress, emotional healing, and future relationship stability. We analyze your birth chart to provide clarity during difficult transitions.",
      price: "₹3400",
      duration: "30-40 min",
      img: "/images/consultations/health.png",
      category: "Vedic Astrology"
    },
    {
      id: 'relationship',
      title: "Affair & Relationship",
      desc: "Clarity regarding loyalty, hidden relationships, compatibility, love triangles, and future possibilities. Get deep insights into your emotional connections.",
      price: "₹3400",
      duration: "30-40 min",
      img: "/images/consultations/love.png",
      category: "Vedic Astrology"
    },
    {
      id: 'financial',
      title: "Financial Consultation",
      desc: "Understand your money flow, losses, gains, investments, and future financial stability through planetary analysis. Vedic astrology helps in understanding your financial destiny and planetary effects on wealth.",
      price: "₹3600",
      duration: "30 min",
      img: "/images/consult_finance.png",
      category: "Vedic Astrology"
    },
    {
      id: 'other',
      title: "Other Concern Consultation",
      desc: "You can ask about any specific issue such as health concerns, family problems, court cases, education, property matters, or personal life confusion. A comprehensive analysis of your birth chart to address your unique worries.",
      price: "₹3600",
      duration: "30 min",
      img: "/images/consult_personal.png",
      category: "Vedic Astrology"
    },
    {
      id: 'kundali-matching',
      title: "Kundali Matching",
      desc: "Detailed horoscope matching for marriage including Ashtkoot Milan, Guna Milan score, Mangal dosh analysis, Dasha compatibility, and long-term married life prediction. This is a complete compatibility analysis of bride & groom charts, not just basic matching.",
      price: "₹5100",
      img: "/images/vedic_info.png",
      category: "Premium Analysis"
    },
    {
      id: 'time-rectification',
      title: "Kundali Time Rectification",
      desc: "If your birth time is not accurate, predictions may not work properly. In this session: Birth time is corrected using life events, accurate chart is prepared, and future predictions become more precise.",
      price: "₹5100",
      img: "/images/cosmic_blueprint.png",
      category: "Premium Analysis"
    },
    {
      id: '1-day-spell',
      title: "1 Day Spell",
      desc: "Focused spiritual ritual to remove negative energy, obstacles, and delays. Used for removing negativity, love & relationship healing, career blockage removal, protection from evil eye, and success.",
      price: "₹4500",
      img: "/images/sop.png",
      category: "Spiritual Remedies"
    },
    {
      id: '3-day-spell',
      title: "3 Day Spell",
      desc: "Intensive spiritual ritual performed over three days to remove deep-rooted obstacles and attract positive energies for success and healing.",
      price: "₹7200",
      img: "/images/roadmap_bg2.png",
      category: "Spiritual Remedies"
    },
    {
      id: '5-day-spell',
      title: "5 Day Spell",
      desc: "Master level spiritual rituals performed for five days for complete protection, success, and removal of significant life blockages.",
      price: "₹11000",
      img: "/images/advanced_info.png",
      category: "Spiritual Remedies"
    }
  ];

  const service = allServices.find(s => s.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '120px' }}>
        <h2>Service Not Found</h2>
        <Link to="/consultations" className="btn btn-primary mt-3">Back to All Services</Link>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Consultation', courseName: service.title })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Booking request sent!');
        setIsModalOpen(false);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-detail-page">
      <div className="detail-hero">
        <div className="container">
          <Link to="/consultations" className="back-link mb-4 d-inline-block text-decoration-none">
            <i className="fas fa-arrow-left me-2"></i> Back to Consultations
          </Link>
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="badge-premium mb-3">{service.category}</div>
              <h1 className="display-4 fw-bold mb-4">{service.title}</h1>
              <div className="price-tag-large mb-4">{service.price}</div>
              {service.duration && (
                <div className="meta-info-item mb-4">
                  <i className="far fa-clock me-2"></i> Duration: {service.duration}
                </div>
              )}
              <p className="lead opacity-75 mb-5">{service.desc}</p>
              <button className="btn-book-premium" onClick={() => setIsModalOpen(true)}>
                Book This Session Now <i className="fas fa-paper-plane ms-2"></i>
              </button>
            </div>
            <div className="col-lg-6">
              <div className="detail-image-wrapper">
                <img src={service.img} alt={service.title} className="img-fluid rounded-4 shadow-lg" />
                <div className="image-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="why-this-session py-5 mt-5">
        <div className="container">
          <div className="glass-panel-detail p-5">
            <h3 className="mb-5 text-center fw-bold">What's Included in this Session?</h3>
            <div className="row g-4">
              {[
                { icon: 'fa-user-shield', title: '100% Private', desc: 'Your data and discussion remain strictly confidential.' },
                { icon: 'fa-file-alt', title: 'Detailed Analysis', desc: 'Comprehensive chart review and intuitive insights.' },
                { icon: 'fa-magic', title: 'Remedies', desc: 'Practical Vedic remedies to overcome life obstacles.' }
              ].map((item, i) => (
                <div key={i} className="col-md-4">
                  <div className="benefit-card text-center">
                    <div className="benefit-icon mb-3"><i className={`fas ${item.icon}`}></i></div>
                    <h4>{item.title}</h4>
                    <p className="text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={{...formData, consultationType: service.title}}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <style jsx>{`
        .service-detail-page {
          background: #FDF6EE;
          min-height: 100vh;
          padding: 140px 0 100px;
          color: #2A0F02;
        }
        .badge-premium {
          background: rgba(139, 74, 30, 0.1);
          color: #8B4A1E;
          padding: 6px 15px;
          border-radius: 50px;
          display: inline-block;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.8rem;
        }
        .price-tag-large {
          font-size: 2.5rem;
          font-weight: 900;
          color: #8B4A1E;
        }
        .btn-book-premium {
          background: #2A0F02;
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 15px;
          font-weight: 800;
          font-size: 1.2rem;
          box-shadow: 0 10px 30px rgba(42, 15, 2, 0.2);
          transition: 0.3s;
        }
        .btn-book-premium:hover {
          transform: translateY(-5px);
          background: #8B4A1E;
        }
        .detail-image-wrapper {
          position: relative;
        }
        .detail-image-wrapper img {
          width: 100%;
          height: auto;
          position: relative;
          z-index: 2;
        }
        .image-accent {
          position: absolute;
          top: 20px;
          right: -20px;
          width: 100%;
          height: 100%;
          background: #C8832A;
          border-radius: 20px;
          opacity: 0.1;
          z-index: 1;
        }
        .glass-panel-detail {
          background: white;
          border-radius: 30px;
          border: 1px solid rgba(139, 74, 30, 0.1);
          box-shadow: 0 20px 40px rgba(139, 74, 30, 0.05);
        }
        .benefit-icon {
          font-size: 2rem;
          color: #8B4A1E;
        }
        .back-link {
          color: #8B4A1E;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

export default ConsultationDetail;
