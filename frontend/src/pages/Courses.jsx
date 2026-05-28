import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import SEO from '../components/SEO';

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dbCourses, setDbCourses] = useState(coursesData);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        
        if (data.success) {
          // Map DB fields to UI fields
          const mappedCourses = data.courses.map(course => ({
            id: course._id,
            title: course.title,
            shortDesc: course.description,
            image: course.thumbnailUrl || '/images/vedic_thumbnail.png',
            duration: `${course.validityDays} Days`,
            schedule: 'Self-Paced',
            level: 'Professional',
            category: 'Astrology', // Defaulting since we didn't add category to DB yet
            price: course.price,
            isPremium: true
          }));
          setDbCourses([...coursesData, ...mappedCourses]);
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', ...new Set(dbCourses.map(course => course.category))];

  useEffect(() => {
    window.scrollTo(0, 0);
    const filtered = dbCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, dbCourses]);

  const premiumCourses = filteredCourses.filter(c => c.isPremium);
  const freeCourses = filteredCourses.filter(c => !c.isPremium);

  const renderCourseCard = (course, i) => (
    <div key={course.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
      <div className="course-card">
        {course.isPremium && (
          <div className="premium-badge">
            <i className="fas fa-crown"></i> Premium
          </div>
        )}
        <div className="course-badge">{course.level}</div>
        <div className="course-icon-wrapper">
          <img src={course.image} alt={course.title} className="course-img" />
        </div>
        <div className="course-info">
          <h3>{course.title}</h3>
          <p>{course.shortDesc}</p>
          <div className="course-meta">
            <div className="meta-item">
              <i className="fas fa-clock"></i>
              {course.duration}
            </div>
            <div className="meta-item">
              <i className="fas fa-calendar-alt"></i>
              {course.schedule}
            </div>
          </div>
          <div className="course-footer">
            {course.price ? (
              <div className="price-tag">
                ₹{course.price}
              </div>
            ) : null}
            <Link to={`/courses/${course.id}`} className="view-btn">
              Learn More <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="courses-page">
      <SEO title="Professional Astrology Courses" description="Explore our comprehensive range of professional astrology and occult science courses." url="/courses" />
      <style>{`
        .courses-page {
          background: #FDF6EE;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .hero-section {
          background: linear-gradient(135deg, #2A0F02 0%, #8B4A1E 100%);
          padding: 100px 0 160px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://www.transparenttextures.com/patterns/stardust.png');
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-section h1 {
          font-family: 'Playfair Display', serif;
          color: #FFFFFF !important;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          margin-bottom: 20px;
          animation: fadeInUp 1s ease-out;
        }

        .hero-section p {
          color: #FFFFFF !important;
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto 40px;
          animation: fadeInUp 1.2s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .search-box {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 15px 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .search-box:focus-within {
          background: rgba(255, 255, 255, 0.15);
          border-color: #C8832A;
          transform: translateY(-2px);
        }

        .search-box i {
          color: #C8832A;
          font-size: 1.2rem;
        }

        .search-box input {
          background: none;
          border: none;
          color: #FFF;
          font-size: 1.1rem;
          width: 100%;
          outline: none;
        }

        .search-box input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 60px;
          color: #FFF;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: #C8832A;
          font-family: 'Playfair Display', serif;
        }

        .stat-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          align-self: center;
        }

        .filter-container {
          margin-top: -60px;
          position: relative;
          z-index: 20;
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
          padding: 0 20px;
        }

        .filter-btn {
          background: #FFF;
          border: 1px solid rgba(139, 74, 30, 0.1);
          color: #8B4A1E;
          padding: 10px 25px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .filter-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(139, 74, 30, 0.1);
        }

        .filter-btn.active {
          background: #C8832A;
          color: #FFF;
          border-color: #C8832A;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #2A0F02;
          margin-bottom: 40px;
          text-align: center;
          position: relative;
        }
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: #C8832A;
        }

        .course-section {
          margin-bottom: 80px;
        }

        .courses-grid {
          padding: 80px 0;
        }

        .course-card {
          background: #FFF;
          border-radius: 24px;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(139, 74, 30, 0.08);
          position: relative;
        }

        .course-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(139, 74, 30, 0.12);
          border-color: #C8832A;
        }

        .course-icon-wrapper {
          height: 200px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .course-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .course-card:hover .course-img {
          transform: scale(1.1);
        }

        .course-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(139, 74, 30, 0.1);
          color: #8B4A1E;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          z-index: 2;
        }

        .premium-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: linear-gradient(135deg, #FFD700 0%, #F5A623 100%);
          color: #2A0F02;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(255, 215, 0, 0.4);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .price-tag {
          font-size: 1.3rem;
          font-weight: 800;
          color: #2A0F02;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .course-info {
          padding: 30px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .course-info h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2A0F02;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .course-info p {
          color: #6b6b8a;
          font-size: 1rem;
          margin-bottom: 25px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
          padding-top: 20px;
          border-top: 1px solid rgba(139, 74, 30, 0.05);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #8B4A1E;
          font-weight: 600;
        }

        .course-footer {
          margin-top: auto;
        }

        .view-btn {
          display: block;
          width: 100%;
          text-align: center;
          background: #2A0F02;
          color: #FFF;
          padding: 12px;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: #8B4A1E;
          color: #FFF;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(42, 15, 2, 0.2);
        }

        .no-results {
          text-align: center;
          padding: 60px 0;
          color: #8B4A1E;
        }

        .no-results i {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 20px 120px;
          }
          .filter-container {
            margin-top: -40px;
          }
          .course-icon-wrapper {
            height: 160px;
            font-size: 4rem;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="container hero-content">
          <h1 data-aos="fade-down">Master Ancient Wisdom</h1>
          <p data-aos="fade-up" data-aos-delay="100">
            Explore our comprehensive range of professional astrology and occult science courses. 
            From beginner fundamentals to advanced prediction techniques.
          </p>
          <div className="search-container" data-aos="zoom-in" data-aos-delay="200">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search courses (e.g. Vedic, Tarot, Palmistry...)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="hero-stats d-none d-md-flex" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-item">
              <span className="stat-num">5000+</span>
              <span className="stat-label">Students Trained</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">15+</span>
              <span className="stat-label">Specialized Courses</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">4.9/5</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </section>

      <div className="filter-container">
        {categories.map((cat, i) => (
          <button 
            key={i}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            data-aos="fade-up"
            data-aos-delay={i * 50}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="container courses-grid">
        {premiumCourses.length > 0 && (
          <div className="course-section">
            <h2 className="section-title">Live & Premium Courses</h2>
            <div className="row g-4">
              {premiumCourses.map(renderCourseCard)}
            </div>
          </div>
        )}

        {freeCourses.length > 0 && (
          <div className="course-section">
            <h2 className="section-title">Free & Pre-recorded Courses</h2>
            <div className="row g-4">
              {freeCourses.map(renderCourseCard)}
            </div>
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="col-12">
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No courses found</h3>
              <p>Try searching with different keywords or category.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
