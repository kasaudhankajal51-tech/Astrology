import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const textReviews = [
  { id: 1, text: "This webinar completely changed my perspective on career. The remedies provided were so simple yet effective. Thank you Astro Arun Pandit!", author: "Siddharth Jain", role: "Software Engineer" },
  { id: 2, text: "I was skeptical at first, but the depth of knowledge shared in just 2 days was mind-blowing. Highly recommended for everyone.", author: "Megha Malhotra", role: "Business Owner" },
  { id: 3, text: "The way complex astrological concepts were explained made it so easy to understand. I finally know why certain patterns repeat in my life.", author: "Vikram Singh", role: "Creative Designer" },
  { id: 4, text: "Professional, insightful, and truly life-altering. Best investment of ₹99 I've ever made. The Q&A session was very helpful.", author: "Anjali Deshmukh", role: "Homemaker" },
  { id: 5, text: "Truly a cosmic experience! The practical tips on birth chart reading were the highlight for me. Already seeing positive changes.", author: "Rohan Khanna", role: "Marketing Head" },
  { id: 6, text: "A must-attend for anyone lost in their life path. The instructor is extremely knowledgeable and patient with all questions.", author: "Sanya Gupta", role: "Artist" },
];

const TextReviewCarousel = () => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const amount = containerRef.current.clientWidth * 0.7;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <section className="text-reviews-section">
      <div className="container">
        <div className="section-header-flex">
          <div className="header-left">
            <h5 className="section-subtitle">Wall of Love</h5>
            <h2 className="section-title">Words from our <span className="text-highlight">Community</span></h2>
          </div>
          <div className="carousel-nav">
            <button 
              className={`nav-btn prev ${!canScrollLeft ? 'disabled' : ''}`} 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <button 
              className={`nav-btn next ${!canScrollRight ? 'disabled' : ''}`} 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="text-slider-wrapper">
          <div className="text-slider-track" ref={containerRef}>
            {textReviews.map((review) => (
              <motion.div 
                key={review.id} 
                className="testimonial-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="quote-mark">“</div>
                <p className="testimonial-text">{review.text}</p>
                <div className="testimonial-footer">
                  <div className="avatar-circle">
                    {review.author[0]}
                  </div>
                  <div className="user-info">
                    <span className="user-name">{review.author}</span>
                    <span className="user-role">{review.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .text-reviews-section {
          padding: 100px 0;
          background: #070913;
          border-top: 1px solid rgba(255, 106, 0, 0.1);
        }
        .text-slider-wrapper {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          padding: 0 calc(50vw - 50% + 20px);
        }
        .text-slider-track {
          display: flex;
          gap: 25px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding: 20px 0 40px;
        }
        .text-slider-track::-webkit-scrollbar { display: none; }

        .testimonial-card {
          min-width: 400px;
          scroll-snap-align: start;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 40px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: 0.3s;
        }
        .testimonial-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: #ff6a00;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .quote-mark {
          position: absolute;
          top: 20px;
          right: 40px;
          font-size: 8rem;
          line-height: 1;
          font-family: serif;
          color: #ff6a00;
          opacity: 0.1;
        }
        .testimonial-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #ddd;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        .testimonial-footer {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .avatar-circle {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ff6a00, #ff0080);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 800;
          font-size: 1.4rem;
          box-shadow: 0 5px 15px rgba(255, 106, 0, 0.3);
        }
        .user-info {
          display: flex;
          flex-direction: column;
        }
        .user-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .user-role {
          color: #ff6a00;
          font-size: 0.85rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .testimonial-card { min-width: 300px; padding: 30px; }
          .testimonial-text { font-size: 1rem; }
        }
      `}</style>
    </section>
  );
};

export default TextReviewCarousel;
