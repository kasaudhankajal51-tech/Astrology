import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ConsultationModal from '../components/ConsultationModal';
import API_BASE from '../utils/api';
import { getContactValidationError, normalizeIndianMobile } from '../utils/validation';


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
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = getContactValidationError(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const sanitizedPhone = normalizeIndianMobile(formData.phone);
    setIsSubmitting(true);
    
    try {
      const amount = parseInt(service.price.replace('₹', ''), 10);
      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: sanitizedPhone,
        amount,
        type: 'Consultation',
        consultationType: service.title
      };

      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      
      if (!data.success) {
        toast.error(data.error || data.message || 'Failed to initiate booking');
        setIsSubmitting(false);
        return;
      }

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error('Razorpay SDK failed to load. Check your connection.');
        setIsSubmitting(false);
        return;
      }

      if (data.orderId) {
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: "DS Institute",
          description: `Consultation Booking: ${service.title}`,
          image: "/images/logo.png",
          order_id: data.orderId,
          handler: async function (response) {
            try {
              const verifyRes = await fetch(`${API_BASE}/api/leads/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  leadId: data.leadId
                })
              });
              const verifyData = await verifyRes.json();
              
              if (verifyData.success) {
                toast.success('Payment Successful! Your consultation is booked.');
                setIsModalOpen(false);
                window.location.href = '/payment-success';
              } else {
                toast.error('Payment verification failed.');
              }
            } catch (err) {
              toast.error('Error verifying payment.');
            } finally {
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: data.name,
            email: data.email,
            contact: data.phone
          },
          theme: {
            color: "#8B4A1E"
          },
          modal: {
            ondismiss: function() {
              setIsSubmitting(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          toast.error(`Payment Failed: ${response.error.description}`);
          setIsSubmitting(false);
        });
        rzp.open();
      } else {
        toast.error('Order ID not generated. Please try again.');
        setIsSubmitting(false);
      }

    } catch (err) {
      toast.error('Error: ' + err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-detail-page">
      <div className="detail-hero">
        <div className="container site-container">
          <Link to="/consultations" className="back-link mb-3 d-inline-flex align-items-center text-decoration-none">
            <i className="fas fa-arrow-left me-2"></i> Back to Consultations
          </Link>
          <div className="detail-hero-card">
            <div className="row g-4 align-items-center">
            <div className="col-lg-6 detail-copy">
              <div className="badge-premium mb-3">{service.category}</div>
              <h1 className="fw-bold mb-3">{service.title}</h1>
              <div className="price-tag-large mb-3">{service.price}</div>
              {service.duration && (
                <div className="meta-info-item mb-3">
                  <i className="far fa-clock me-2"></i> Duration: {service.duration}
                </div>
              )}
              <p className="lead opacity-75 mb-4">{service.desc}</p>
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
      </div>

      <section className="why-this-session">
        <div className="container site-container">
          <div className="glass-panel-detail">
            <h3 className="text-center fw-bold">What's Included in this Session?</h3>
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
        isFixedService={true}
      />

      <style jsx>{`
        .service-detail-page {
          background: var(--site-bg);
          min-height: 100vh;
          padding: clamp(1.5rem, 4vw, 2.5rem) 0 clamp(3rem, 6vw, 5rem);
          color: var(--site-text);
        }
        .detail-hero-card {
          background: var(--site-surface);
          border: 1px solid var(--site-border);
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-card);
          padding: clamp(1.25rem, 4vw, 2.25rem);
        }
        .detail-copy {
          max-width: 42rem;
        }
        .detail-hero h1 {
          color: var(--site-text);
          font-family: var(--font-heading);
          font-size: var(--h1-size);
          line-height: 1.12;
          letter-spacing: 0;
        }
        .badge-premium {
          background: var(--site-accent-soft);
          color: var(--site-accent-dark);
          padding: 0.42rem 0.75rem;
          border-radius: var(--radius-control);
          display: inline-block;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.76rem;
        }
        .price-tag-large {
          font-size: clamp(1.8rem, 4vw, 2.35rem);
          font-weight: 900;
          color: var(--site-accent-dark);
        }
        .meta-info-item,
        .detail-hero .lead {
          color: var(--site-text-muted);
          line-height: 1.65;
        }
        .btn-book-premium {
          background: var(--site-primary);
          color: white;
          border: none;
          padding: 0.82rem 1.2rem;
          border-radius: var(--radius-control);
          font-weight: 800;
          font-size: 0.98rem;
          box-shadow: var(--shadow-card);
          transition: 0.3s;
        }
        .btn-book-premium:hover {
          transform: translateY(-2px);
          background: var(--site-primary-hover);
        }
        .detail-image-wrapper {
          position: relative;
          max-width: 31rem;
          margin-left: auto;
        }
        .detail-image-wrapper img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          position: relative;
          z-index: 2;
          border-radius: var(--radius-card) !important;
          box-shadow: var(--shadow-card) !important;
        }
        .image-accent {
          position: absolute;
          top: 20px;
          right: -20px;
          width: 100%;
          height: 100%;
          background: var(--site-accent);
          border-radius: var(--radius-card);
          opacity: 0.1;
          z-index: 1;
        }
        .why-this-session {
          padding-top: clamp(2rem, 5vw, 3.5rem);
        }
        .glass-panel-detail {
          background: var(--site-surface);
          border-radius: var(--radius-card);
          border: 1px solid var(--site-border);
          box-shadow: var(--shadow-card);
          padding: clamp(1.25rem, 4vw, 2rem);
        }
        .glass-panel-detail h3 {
          color: var(--site-text);
          font-family: var(--font-heading);
          font-size: var(--h2-size);
          margin-bottom: clamp(1.25rem, 4vw, 2rem);
        }
        .benefit-icon {
          align-items: center;
          background: var(--site-accent-soft);
          border-radius: var(--radius-control);
          color: var(--site-accent-dark);
          display: inline-flex;
          font-size: 1.35rem;
          height: 3rem;
          justify-content: center;
          width: 3rem;
        }
        .benefit-card {
          border: 1px solid var(--site-border);
          border-radius: var(--radius-card);
          height: 100%;
          padding: 1.2rem;
        }
        .benefit-card h4 {
          color: var(--site-text);
          font-size: 1.05rem;
          font-weight: 800;
        }
        .benefit-card p {
          color: var(--site-text-muted) !important;
          line-height: 1.55;
          margin-bottom: 0;
        }
        .back-link {
          color: var(--site-accent-dark);
          font-weight: 700;
        }
        @media (max-width: 991px) {
          .service-detail-page {
            padding-top: 1.5rem;
          }
          .detail-image-wrapper {
            max-width: 32rem;
            margin: 0 auto;
          }
          .image-accent {
            right: -10px;
          }
        }
      `}</style>
    </div>
  );
}

export default ConsultationDetail;
