import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConsultationModal from '../components/ConsultationModal';

function Consultations() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
        toast.success('Consultation booking request sent! We will contact you soon.');
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

  const goToDetails = (slug) => {
    navigate(`/consultations/${slug}`);
  };

  const consultationCategories = [
    {
      id: 'tarot',
      name: "Tarot Card Sessions",
      icon: "fa-magic",
      description: "Intuitive guidance for love, career, and life decisions using spiritual energies.",
      cards: [
        {
          id: 'zoom-session',
          title: "45-minute Zoom Call Session",
          desc: "Face-to-face video consultation providing deep clarity about your current situation or upcoming life decisions. Ideal for those seeking visual connection and detailed card spreads.",
          price: "₹7200",
          duration: "45 min",
          badge: "Video Call",
          badgeColor: "purple",
          img: "/images/premium_tarot.png",
          short: "Zoom Session"
        },
        {
          id: 'phone-session',
          title: "45-minute Phone Call Session",
          desc: "Personalized guidance over a phone call. Perfect for quick clarity and immediate answers about love, career, or any specific life situation you're facing.",
          price: "₹5400",
          duration: "45 min",
          badge: "Voice Call",
          badgeColor: "pink",
          img: "/images/tarot-card.webp",
          short: "Phone Session"
        }
      ]
    },
    {
      id: 'vedic',
      name: "Vedic Astrology",
      icon: "fa-om",
      description: "Birth chart analysis to understand destiny, planetary effects, and future opportunities.",
      cards: [
        {
          id: 'career',
          title: "Career Consultation",
          desc: "Get guidance about job, promotion, business, career change, government job chances, foreign opportunities, and financial growth.",
          price: "₹3600",
          duration: "30-40 min",
          badge: "Professional Path",
          badgeColor: "purple",
          img: "/images/consult_career.png",
          short: "Career"
        },
        {
          id: 'marriage',
          title: "Marriage Consultation",
          desc: "Get detailed prediction about marriage timing, love vs arranged marriage, delay in marriage, relationship problems, and married life stability.",
          price: "₹2700",
          duration: "30-40 min",
          badge: "Relationship Expert",
          badgeColor: "pink",
          img: "/images/consult_marriage.png",
          short: "Marriage"
        },
        {
          id: 'financial',
          title: "Financial Consultation",
          desc: "Understand your money flow, losses, gains, investments, and future financial stability through planetary analysis.",
          price: "₹3600",
          duration: "30 min",
          badge: "Wealth Insights",
          badgeColor: "orange",
          img: "/images/consult_finance.png",
          short: "Financial"
        },
        {
          id: 'other',
          title: "Other Concern Consultation",
          desc: "Ask about specific issues such as health concerns, family problems, court cases, education, property matters, or personal life confusion.",
          price: "₹3600",
          duration: "30 min",
          badge: "Specialized Help",
          badgeColor: "red",
          img: "/images/consult_personal.png",
          short: "Other Concerns"
        }
      ]
    },
    {
      id: 'kundali',
      name: "Premium Chart Analysis",
      icon: "fa-star",
      description: "Advanced compatibility checks and precise birth time rectification.",
      cards: [
        {
          id: 'kundali-matching',
          title: "Kundali Matching",
          desc: "Detailed horoscope matching for marriage including Ashtkoot Milan, Guna Milan score, Mangal dosh analysis, Dasha compatibility, and long-term married life prediction.",
          price: "₹5100",
          badge: "Full Compatibility",
          badgeColor: "purple",
          img: "/images/vedic_info.png",
          short: "Kundali Matching"
        },
        {
          id: 'time-rectification',
          title: "Kundali Time Rectification",
          desc: "If your birth time is not accurate, predictions may not work. We correct your birth time using life events to ensure your future predictions become more precise.",
          price: "₹5100",
          badge: "Precision Expert",
          badgeColor: "orange",
          img: "/images/cosmic_blueprint.png",
          short: "Time Rectification"
        }
      ]
    },
    {
      id: 'spiritual',
      name: "Spiritual Remedies",
      icon: "fa-fire",
      description: "Mantra-based rituals to remove negative energy and life obstacles.",
      cards: [
        {
          id: '1-day-spell',
          title: "1 Day Spell",
          desc: "Focused spiritual ritual for removing negativity, addressing immediate love/relationship blocks, or clearing minor career obstacles.",
          price: "₹4500",
          badge: "Quick Remedy",
          badgeColor: "pink",
          img: "/images/sop.png",
          short: "1 Day Spell"
        },
        {
          id: '3-day-spell',
          title: "3 Day Spell",
          desc: "Intensive spiritual healing rituals designed for relationship healing, significant career blockage removal, and attracting success.",
          price: "₹7200",
          badge: "Intensive Ritual",
          badgeColor: "orange",
          img: "/images/roadmap_bg2.png",
          short: "3 Day Spell"
        },
        {
          id: '5-day-spell',
          title: "5 Day Spell",
          desc: "Master level spiritual rituals for complete protection from evil eye, deep success attraction, and total removal of life delays.",
          price: "₹11000",
          badge: "Master Transformation",
          badgeColor: "red",
          img: "/images/advanced_info.png",
          short: "5 Day Spell"
        }
      ]
    }
  ];

  const filteredCategories = consultationCategories.map(cat => ({
    ...cat,
    cards: cat.cards.filter(card => 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.cards.length > 0);

  return (
    <>
      <section className="consultation-page">
        <div className="page-header-bg"></div>
        <div className="container position-relative">
          <div className="text-center mb-5 pb-4">
            <h5 className="section-subtitle" data-aos="fade-down">Divine Guidance & Transformation</h5>
            <h2 className="section-title mt-2" data-aos="fade-up">Consultation Services</h2>
            <p className="header-desc mx-auto" data-aos="fade-up" data-aos-delay="100">
              Understand your life path, remove confusion, and make decisions with confidence. Every session is conducted with complete dedication and confidentiality.
            </p>
            
            <div className="search-container-v2 mt-5 mx-auto" data-aos="zoom-in" data-aos-delay="200">
              <div className="search-box-v2">
                <i className="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  placeholder="Search for services (e.g., Career, Tarot, Marriage...)" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery('')}>
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              <div className="search-badges mt-3">
                <span className="search-hint">Try searching:</span>
                <button className="badge-hint" onClick={() => setSearchQuery('Tarot')}>Tarot</button>
                <button className="badge-hint" onClick={() => setSearchQuery('Marriage')}>Marriage</button>
                <button className="badge-hint" onClick={() => setSearchQuery('Career')}>Career</button>
                <button className="badge-hint" onClick={() => setSearchQuery('Spell')}>Remedies</button>
              </div>
            </div>
            
            <div className="title-underline mx-auto"></div>
          </div>

          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <div key={idx} className="category-section mb-5 pb-5">
                <div className="category-header d-flex flex-column mb-5" data-aos="fade-right">
                  <div className="d-flex align-items-center mb-3">
                    <div className="category-icon-box">
                      <i className={`fas ${cat.icon}`}></i>
                    </div>
                    <h3 className="category-name ms-3 mb-0">{cat.name}</h3>
                    <div className="category-line-flex ms-4"></div>
                  </div>
                  <p className="category-description">{cat.description}</p>
                </div>
                
                <div className="consult-grid">
                  {cat.cards.map((card, cIdx) => (
                    <div className="consult-card-wrapper" key={cIdx} data-aos="fade-up" data-aos-delay={cIdx * 50}>
                      <div className="consult-card">
                        <div className="card-image-box" onClick={() => goToDetails(card.id)} style={{ cursor: 'pointer' }}>
                          <img src={card.img} alt={card.title} />
                          <div className="card-overlay-gradient"></div>
                          <div className={`status-badge ${card.badgeColor}`}>
                            {card.badge}
                          </div>
                          <div className="card-price-tag">{card.price}</div>
                        </div>
                        <div className="card-info">
                          <h4 onClick={() => goToDetails(card.id)} style={{ cursor: 'pointer' }}>{card.short}</h4>
                          <p className="card-preview-text">{card.desc.substring(0, 100)}...</p>
                          {card.duration && (
                            <div className="duration-info mb-3">
                              <i className="far fa-clock me-2"></i> {card.duration}
                            </div>
                          )}
                          <div className="card-actions mt-auto">
                            <button className="btn-action secondary" onClick={() => goToDetails(card.id)}>
                              <i className="fas fa-eye me-2"></i> View Page
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
            ))
          ) : (
            <div className="text-center py-5 no-results" data-aos="fade-up">
              <div className="no-results-icon mb-4">
                <i className="fas fa-search-minus"></i>
              </div>
              <h3>No services found for "{searchQuery}"</h3>
              <p>Try different keywords or browse our categories below.</p>
              <button className="btn-action primary mx-auto mt-4" style={{ maxWidth: '200px' }} onClick={() => setSearchQuery('')}>
                Show All Services
              </button>
            </div>
          )}

          {!searchQuery && (
            <>
              <div className="guidelines-section mt-5" data-aos="fade-up">
                <div className="glass-panel p-4 p-md-5">
                  <h3 className="category-name small mb-4"><i className="fas fa-star-of-david me-3"></i> Important Guidelines</h3>
                  <div className="guidelines-grid">
                    <div className="guideline-item">
                      <div className="guide-icon"><i className="fas fa-lock"></i></div>
                      <div className="guide-text">
                        <strong>Confidentiality</strong>
                        <span>All sessions are private & confidential</span>
                      </div>
                    </div>
                    <div className="guideline-item">
                      <div className="guide-icon"><i className="fas fa-calendar-check"></i></div>
                      <div className="guide-text">
                        <strong>Prior Booking</strong>
                        <span>Mandatory for all consultation types</span>
                      </div>
                    </div>
                    <div className="guideline-item">
                      <div className="guide-icon"><i className="fas fa-ban"></i></div>
                      <div className="guide-text">
                        <strong>Refund Policy</strong>
                        <span>No refund after booking completion</span>
                      </div>
                    </div>
                    <div className="guideline-item">
                      <div className="guide-icon"><i className="fas fa-balance-scale"></i></div>
                      <div className="guide-text">
                        <strong>Divine Balance</strong>
                        <span>Results depend on karma & planetary timing</span>
                      </div>
                    </div>
                    <div className="guideline-item">
                      <div className="guide-icon"><i className="fas fa-vial"></i></div>
                      <div className="guide-text">
                        <strong>Remedies</strong>
                        <span>Suggested only after proper analysis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="booking-cta-section mt-5 pt-4 mb-5" data-aos="zoom-in">
                <div className="booking-card-new p-4 p-md-5">
                  <div className="row align-items-center">
                    <div className="col-lg-8">
                      <h3 className="cta-title">Ready to start your journey?</h3>
                      <p className="cta-desc">Contact us with your Name, Date, Time, and Place of Birth to book your session.</p>
                      <div className="detail-tags-container mt-4">
                        <span className="detail-pill">Name</span>
                        <span className="detail-pill">DOB</span>
                        <span className="detail-pill">Time of Birth</span>
                        <span className="detail-pill">Place of Birth</span>
                        <span className="detail-pill">Consultation Type</span>
                      </div>
                    </div>
                    <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                      <button className="premium-booking-btn" onClick={() => openModal()}>
                        Book Your Session <i className="fas fa-paper-plane ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <ConsultationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap');

        :root {
          --cosmic-bg: #FDF6EE;
          --cosmic-text: #2A0F02;
          --cosmic-text-muted: #5C3D26;
          --cosmic-white: #ffffff;
          --cosmic-accent-pink: #8B4A1E;
          --cosmic-accent-soft: rgba(139, 74, 30, 0.08);
          --cosmic-gradient: linear-gradient(135deg, #8B4A1E, #C8832A);
          --glass-border: rgba(139, 74, 30, 0.15);
          --premium-shadow: 0 15px 40px rgba(139, 74, 30, 0.1);
        }

        .consultation-page {
          padding: 160px 0 100px;
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
          opacity: 0.6;
          pointer-events: none;
        }

        .section-subtitle {
          color: var(--cosmic-accent-pink);
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 800;
          font-size: 1rem;
          margin-bottom: 15px;
          display: block;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--cosmic-text);
          margin-bottom: 20px;
        }

        .header-desc {
          max-width: 800px;
          color: var(--cosmic-text-muted);
          font-size: 1.4rem;
          line-height: 1.7;
          font-weight: 500;
          font-family: var(--font-sans);
        }

        .search-container-v2 {
          max-width: 700px;
          position: relative;
          z-index: 10;
        }

        .search-box-v2 {
          background: var(--cosmic-white);
          border: 2px solid var(--glass-border);
          border-radius: 50px;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 10px 30px rgba(139, 74, 30, 0.08);
          transition: all 0.3s ease;
        }

        .search-box-v2:focus-within {
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 15px 40px rgba(139, 74, 30, 0.15);
          transform: translateY(-2px);
        }

        .search-icon {
          color: var(--cosmic-accent-pink);
          font-size: 1.2rem;
        }

        .search-box-v2 input {
          border: none;
          outline: none;
          flex-grow: 1;
          font-size: 1.25rem;
          font-weight: 500;
          background: transparent;
          color: var(--cosmic-text);
        }

        .clear-search {
          background: var(--cosmic-accent-soft);
          border: none;
          color: var(--cosmic-accent-pink);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .search-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .search-hint {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--cosmic-text-muted);
        }

        .badge-hint {
          background: var(--cosmic-white);
          border: 1px solid var(--glass-border);
          padding: 6px 18px;
          border-radius: 50px;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--cosmic-accent-pink);
          cursor: pointer;
          transition: 0.2s;
        }

        .badge-hint:hover {
          background: var(--cosmic-accent-pink);
          color: #fff;
          border-color: var(--cosmic-accent-pink);
        }

        .title-underline {
          width: 70px;
          height: 4px;
          background: var(--cosmic-gradient);
          border-radius: 10px;
          margin-top: 40px;
        }

        .category-name {
          font-family: var(--font-serif);
          font-size: 3.2rem;
          color: var(--cosmic-text);
          font-weight: 800;
        }
        
        .category-name.small { font-size: 2rem; }

        .category-icon-box {
          width: 55px;
          height: 55px;
          background: var(--cosmic-white);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          color: var(--cosmic-accent-pink);
          box-shadow: var(--premium-shadow);
          border: 1px solid var(--glass-border);
        }

        .category-line-flex {
          flex-grow: 1;
          height: 1px;
          background: linear-gradient(to right, var(--glass-border), transparent);
        }
        
        .category-description {
          max-width: 900px;
          color: var(--cosmic-text-muted);
          font-size: 1.2rem;
          font-weight: 500;
          margin-top: 10px;
          font-family: 'Be Vietnam Pro', sans-serif;
        }

        .consult-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .consult-card {
          background: var(--cosmic-white);
          border: 1px solid var(--glass-border);
          border-radius: 30px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: var(--premium-shadow);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .consult-card:hover {
          transform: translateY(-10px);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 25px 50px rgba(139, 74, 30, 0.15);
        }

        .card-image-box {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .card-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .consult-card:hover .card-image-box img {
          transform: scale(1.08);
        }

        .card-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%);
        }

        .status-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #fff;
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        
        .card-price-tag {
          position: absolute;
          bottom: 15px;
          left: 15px;
          background: var(--cosmic-white);
          color: var(--cosmic-text);
          padding: 6px 16px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 1.1rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .status-badge.purple { background: rgba(107, 33, 168, 0.85); }
        .status-badge.pink { background: rgba(227, 27, 122, 0.85); }
        .status-badge.orange { background: rgba(234, 88, 12, 0.85); }
        .status-badge.red { background: rgba(220, 38, 38, 0.85); }

        .card-info {
          padding: 25px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-info h4 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 800;
          color: var(--cosmic-text);
          margin-bottom: 12px;
        }

        .card-preview-text {
          color: var(--cosmic-text-muted);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 15px;
          font-family: var(--font-sans);
        }
        
        .duration-info {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--cosmic-accent-pink);
          background: var(--cosmic-accent-soft);
          padding: 5px 12px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          width: fit-content;
        }

        .card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .btn-action {
          padding: 10px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: 0.3s;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-action.secondary {
          background: #FDF6EE;
          color: var(--cosmic-text);
          border: 1px solid var(--cosmic-text);
        }

        .btn-action.primary {
          background: var(--cosmic-text);
          color: #fff;
        }

        .btn-action:hover {
          transform: translateY(-2px);
        }

        .btn-action.primary:hover {
          background: var(--cosmic-accent-pink);
          box-shadow: 0 5px 15px rgba(139, 74, 30, 0.2);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(15px);
          border-radius: 35px;
          border: 1px solid var(--glass-border);
          box-shadow: var(--premium-shadow);
        }
        
        .guidelines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 25px;
        }
        
        .guideline-item {
          display: flex;
          gap: 15px;
        }
        
        .guide-icon {
          width: 40px;
          height: 40px;
          background: var(--cosmic-accent-soft);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cosmic-accent-pink);
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .guide-text strong {
          display: block;
          font-size: 1.1rem;
          color: var(--cosmic-text);
          margin-bottom: 2px;
        }
        
        .guide-text span {
          font-size: 0.95rem;
          color: var(--cosmic-text-muted);
          font-weight: 500;
        }

        .booking-card-new {
          background: var(--cosmic-gradient);
          border-radius: 40px;
          color: white;
          box-shadow: 0 20px 50px rgba(139, 74, 30, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .booking-card-new::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }
        
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 10px;
        }
        
        .cta-desc {
          font-size: 1.2rem;
          opacity: 0.9;
          font-weight: 400;
        }
        
        .detail-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .detail-pill {
          background: rgba(255,255,255,0.15);
          padding: 6px 18px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(5px);
        }
        
        .premium-booking-btn {
          background: white;
          color: var(--cosmic-accent-pink);
          border: none;
          padding: 18px 35px;
          border-radius: 15px;
          font-weight: 800;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transition: 0.3s;
          cursor: pointer;
          white-space: nowrap;
        }
        
        .premium-booking-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }

        @media (max-width: 1200px) {
          .consult-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 991px) {
          .consultation-page { padding-top: 130px; }
          .category-name { font-size: 2.2rem; }
          .category-icon-box { width: 45px; height: 45px; font-size: 1.2rem; }
          .cta-title { font-size: 2rem; }
        }

        @media (max-width: 767px) {
          .consult-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 2.2rem; }
          .card-info h4 { font-size: 1.5rem; }
          .category-name { font-size: 1.8rem; }
          .guidelines-grid { grid-template-columns: 1fr; }
          .premium-booking-btn { width: 100%; padding: 15px; }
        }
      `}</style>
    </>
  );
}

export default Consultations;
