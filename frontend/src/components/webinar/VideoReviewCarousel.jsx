import { motion } from 'framer-motion';

const videoReviews = [
  { id: 1, poster: '/images/bg-bannerpic.jpg', title: 'Life Changing Experience', name: 'Rahul Sharma' },
  { id: 2, poster: '/images/horocurty.jpg', title: 'Amazing Vedic Insights', name: 'Priya Verma' },
  { id: 3, poster: '/images/ruiy-img01.jpg', title: 'Highly Recommend for Clarity', name: 'Anil Kapoor' },
  { id: 4, poster: '/images/middle-img.png', title: 'Best Astrology Session', name: 'Sneha Gupta' },
];

const VideoReviewCarousel = () => {
  return (
    <section className="video-reviews-section">
      <div className="container">
        <div className="section-header text-center">
          <h5 className="section-subtitle">Testimonials</h5>
          <h2 className="section-title">What Students <span className="text-highlight">Say on Video</span></h2>
          <div className="header-underline mx-auto"></div>
        </div>
        
        <div className="video-carousel-container">
          <motion.div 
            className="video-track"
            drag="x"
            dragConstraints={{ right: 0, left: -400 }}
          >
            {videoReviews.map((review) => (
              <div key={review.id} className="video-review-card">
                <div className="video-thumbnail">
                  <img src={review.poster} alt={review.title} />
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="video-info">
                  <h4>{review.title}</h4>
                  <p className="reviewer-name">{review.name}</p>
                  <div className="review-stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <p className="swipe-hint text-center"><i className="fas fa-arrows-alt-h"></i> Swipe to see more</p>
      </div>
      <style>{`
        .video-reviews-section {
          padding: 100px 0;
          background: #0b1220;
          overflow: hidden;
        }
        .video-carousel-container {
          margin-top: 50px;
          cursor: grab;
        }
        .video-carousel-container:active {
          cursor: grabbing;
        }
        .video-track {
          display: flex;
          gap: 30px;
          padding: 20px 0;
          width: max-content;
        }
        .video-review-card {
          width: 320px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          transition: 0.3s;
        }
        .video-review-card:hover {
          transform: translateY(-10px);
          border-color: #ff6a00;
          background: rgba(255, 255, 255, 0.05);
        }
        .video-thumbnail {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s;
        }
        .play-button {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          transition: 0.3s;
        }
        .play-button i {
          width: 60px;
          height: 60px;
          background: #ff6a00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.2rem;
          box-shadow: 0 0 20px rgba(255, 106, 0, 0.4);
        }
        .video-info {
          padding: 25px;
        }
        .video-info h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #fff;
        }
        .reviewer-name {
          color: #ff6a00;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }
        .review-stars {
          color: #ffc107;
          font-size: 0.8rem;
          display: flex;
          gap: 4px;
        }
        .swipe-hint {
          margin-top: 30px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.9rem;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .video-review-card { width: 280px; }
        }
      `}</style>
    </section>
  );
};

export default VideoReviewCarousel;
