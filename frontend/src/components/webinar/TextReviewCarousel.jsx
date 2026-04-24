import { motion } from 'framer-motion';

const textReviews = [
  { id: 1, text: "This webinar completely changed my perspective on career. The remedies provided were so simple yet effective. Thank you Astro Arun Pandit!", author: "Siddharth Jain", role: "Software Engineer" },
  { id: 2, text: "I was skeptical at first, but the depth of knowledge shared in just 2 days was mind-blowing. Highly recommended for everyone.", author: "Megha Malhotra", role: "Business Owner" },
  { id: 3, text: "The way complex astrological concepts were explained made it so easy to understand. I finally know why certain patterns repeat in my life.", author: "Vikram Singh", role: "Creative Designer" },
  { id: 4, text: "Professional, insightful, and truly life-altering. Best investment of ₹99 I've ever made. The Q&A session was very helpful.", author: "Anjali Deshmukh", role: "Homemaker" },
];

const TextReviewCarousel = () => {
  return (
    <section className="text-reviews-section">
      <div className="container">
        <div className="reviews-grid">
          {textReviews.map((review, idx) => (
            <motion.div 
              key={review.id} 
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div className="author-avatar">
                  {review.author[0]}
                </div>
                <div className="author-details">
                  <h4>{review.author}</h4>
                  <p>{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .text-reviews-section {
          padding: 80px 0;
          background: #070913;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }
        .review-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 30px;
          position: relative;
          transition: 0.3s;
        }
        .review-card:hover {
          background: rgba(255, 106, 0, 0.03);
          border-color: rgba(255, 106, 0, 0.3);
          transform: scale(1.02);
        }
        .quote-icon {
          color: #ff6a00;
          font-size: 2rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }
        .review-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #ddd;
          margin-bottom: 30px;
          font-style: italic;
        }
        .review-author {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .author-avatar {
          width: 50px;
          height: 50px;
          background: var(--gradient-cta, linear-gradient(135deg, #ff6a00, #ff0080));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 800;
          font-size: 1.2rem;
        }
        .author-details h4 {
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
        }
        .author-details p {
          color: #ff6a00;
          font-size: 0.8rem;
          font-weight: 600;
          margin: 0;
        }
      `}</style>
    </section>
  );
};

export default TextReviewCarousel;
