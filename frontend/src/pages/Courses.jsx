import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import SEO from '../components/SEO';
import API_BASE from '../utils/api';

function Courses({ mode = 'all' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dbCourses, setDbCourses] = useState(coursesData.map((course) => ({ ...course, courseType: 'Live', isPremium: false })));
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/courses`);
        const data = await response.json();
        
        if (data.success) {
          // Map DB fields to UI fields
          const mappedCourses = data.courses.map(course => {
            const courseType = course.courseType || 'Live';
            const instructorName = typeof course.instructor === 'string'
              ? course.instructor
              : course.instructor?.name || '';
            return ({
            id: course._id,
            title: course.title,
            shortDesc: course.description,
            image: course.thumbnailUrl || '/images/vedic_thumbnail.png',
            duration: course.duration || `${course.validityDays} Days`,
            schedule: courseType === 'Recorded' ? 'Self-Paced' : 'Upcoming Batch',
            level: course.level || 'Beginner',
            instructor: instructorName,
            modulesCount: course.modulesCount || course.videoCount || 0,
            category: 'Astrology',
            price: course.price,
            courseType,
            isPremium: courseType !== 'Live' && Number(course.price) > 0
          });
          });
          const staticCourses = coursesData.map((course) => ({ ...course, courseType: 'Recorded', isPremium: false }));
          setDbCourses([...staticCourses, ...mappedCourses]);
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setDbCourses(coursesData.map((course) => ({ ...course, courseType: 'Live', isPremium: false })));
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
      const matchesMode = mode === 'all'
        || (mode === 'live' && course.courseType === 'Live')
        || (mode === 'recorded' && course.courseType !== 'Live');
      return matchesSearch && matchesCategory && matchesMode;
    });
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, dbCourses, mode]);

  const recordedCourses = filteredCourses.filter(c => c.courseType !== 'Live');
  const liveCourses = filteredCourses.filter(c => c.courseType === 'Live');
  const pageCopy = {
    all: {
      title: 'Master Ancient Wisdom',
      subtitle: 'Explore live classes and recorded learning programs from beginner fundamentals to advanced prediction techniques.'
    },
    live: {
      title: 'Live Astrology Courses',
      subtitle: 'Browse instructor-led batches and submit an enquiry. Our team will share timing, pricing and batch details.'
    },
    recorded: {
      title: 'Recorded Courses',
      subtitle: 'Buy self-paced recorded courses, unlock student access and continue learning from your dashboard.'
    }
  }[mode] || {};

  const renderCourseCard = (course, i) => (
    <div key={course.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
      <div className="course-card">
        {course.courseType === 'Recorded' && (
          <div className="premium-badge">
            <i className="fas fa-play-circle"></i> Recorded
          </div>
        )}
        {course.courseType === 'Live' && (
          <div className="premium-badge live-badge">
            <i className="fas fa-video"></i> Live Batch
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
            {course.instructor && (
              <div className="meta-item">
                <i className="fas fa-chalkboard-teacher"></i>
                {course.instructor}
              </div>
            )}
            {course.courseType === 'Recorded' && course.modulesCount > 0 && (
              <div className="meta-item">
                <i className="fas fa-book"></i>
                {course.modulesCount} Modules
              </div>
            )}
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
            <Link to={course.customUrl || `/courses/${course.id}`} className="view-btn">
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
          padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
        }

        .hero-section {
          background: linear-gradient(135deg, #2A0F02 0%, #8B4A1E 100%);
          padding: clamp(2.75rem, 5vw, 4.25rem) clamp(1rem, 3vw, 2rem) clamp(2.5rem, 5vw, 3.5rem);
          text-align: center;
          position: relative;
          overflow: visible;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 20% 15%, rgba(255,255,255,0.12), transparent 28%),
                      radial-gradient(circle at 80% 30%, rgba(200,131,42,0.18), transparent 30%);
          opacity: 0.8;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-section h1 {
          font-family: 'Playfair Display', serif;
          color: #FFFFFF !important;
          font-size: clamp(2.15rem, 5vw, 3.45rem);
          font-weight: 700;
          margin-bottom: 16px;
          animation: fadeInUp 1s ease-out;
        }

        .hero-section p {
          color: #FFFFFF !important;
          font-size: clamp(1rem, 1.6vw, 1.12rem);
          line-height: 1.65;
          max-width: 660px;
          margin: 0 auto 24px;
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
          max-width: 560px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .search-box {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 14px;
          padding: 0.76rem 1rem;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 10px 24px rgba(0,0,0,0.16);
          transition: all 0.3s ease;
        }

        .search-box:focus-within {
          background: rgba(255, 255, 255, 0.15);
          border-color: #C8832A;
          transform: none;
        }

        .search-box i {
          color: #C8832A;
          font-size: 1.2rem;
        }

        .search-box input {
          background: none;
          border: none;
          color: #FFF;
          font-size: 1rem;
          width: 100%;
          outline: none;
        }

        .search-box input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin-top: 34px;
          color: #FFF;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-num {
          font-size: 1.55rem;
          font-weight: 800;
          color: #C8832A;
          font-family: 'Playfair Display', serif;
        }

        .stat-label {
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
        }

        .stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          align-self: center;
        }

        .filter-container {
          margin-top: clamp(1.25rem, 3vw, 2rem);
          margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          padding: 0 var(--page-pad-x);
        }

        .filter-btn {
          background: #FFF;
          border: 1px solid rgba(139, 74, 30, 0.1);
          color: #8B4A1E;
          padding: 0.5rem 0.95rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .filter-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(139, 74, 30, 0.1);
        }

        .filter-btn.active {
          background: #C8832A;
          color: #FFF;
          border-color: #C8832A;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 2.45rem);
          color: #2A0F02;
          margin-bottom: 30px;
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
          height: 2px;
          background: #C8832A;
        }

        .course-section {
          margin-bottom: clamp(2rem, 4vw, 3rem);
        }

        .course-section:last-child {
          margin-bottom: 0;
        }

        .courses-grid {
          position: relative;
          z-index: 0;
          padding: clamp(1.75rem, 4vw, 2.75rem) var(--page-pad-x) clamp(1rem, 2.5vw, 1.75rem);
          max-width: var(--container-public);
        }

        .course-card {
          background: #FFF;
          border-radius: 14px;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          border: 1px solid rgba(139, 74, 30, 0.08);
          position: relative;
          box-shadow: 0 10px 24px rgba(42, 15, 2, 0.06);
        }

        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 36px rgba(139, 74, 30, 0.12);
          border-color: #C8832A;
        }

        .course-icon-wrapper {
          height: 168px;
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
          transform: scale(1.04);
        }

        .course-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(139, 74, 30, 0.1);
          color: #8B4A1E;
          padding: 0.32rem 0.7rem;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 700;
          z-index: 2;
        }

        .premium-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: linear-gradient(135deg, #FFD700 0%, #F5A623 100%);
          color: #2A0F02;
          padding: 0.32rem 0.7rem;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 700;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(42, 15, 2, 0.12);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .premium-badge.live-badge {
          background: linear-gradient(135deg, #8B4A1E 0%, #C8832A 100%);
          color: #fff;
        }

        .price-tag {
          font-size: 1rem;
          font-weight: 800;
          color: #2A0F02;
          margin-bottom: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(200, 131, 42, 0.08);
          border: 1px solid rgba(200, 131, 42, 0.16);
          border-radius: 9px;
          padding: 0.4rem 0.65rem;
        }

        .course-info {
          padding: clamp(1rem, 2vw, 1.2rem);
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .course-info h3 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.16rem, 2vw, 1.28rem);
          font-weight: 700;
          color: #2A0F02;
          margin-bottom: 10px;
          line-height: 1.32;
        }

        .course-info p {
          color: #6b6b8a;
          font-size: 0.9rem;
          margin-bottom: 14px;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .course-meta {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(139, 74, 30, 0.05);
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #8B4A1E;
          font-weight: 600;
        }

        .course-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .view-btn {
          display: inline-flex;
          width: auto;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #2A0F02;
          color: #FFF;
          padding: 0.58rem 0.85rem;
          border-radius: 9px;
          font-weight: 700;
          font-size: 0.84rem;
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
            padding: clamp(2rem, 4vw, 3rem) 1rem clamp(2rem, 4vw, 2.75rem);
          }
          .filter-container {
            margin-top: clamp(1rem, 2vw, 1.5rem);
            margin-bottom: clamp(1.5rem, 3vw, 2rem);
            gap: 10px;
          }
          .course-icon-wrapper {
            height: 150px;
            font-size: 4rem;
          }
          .filter-btn {
            padding: 8px 18px;
            font-size: 0.9rem;
          }
          .course-info {
            padding: 1rem;
          }
          .course-info h3 {
            font-size: 1.2rem;
          }
          .course-info p {
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }

          .courses-grid {
            padding-left: var(--page-pad-x);
            padding-right: var(--page-pad-x);
          }

          .course-card {
            max-width: 390px;
            margin-left: auto;
            margin-right: auto;
          }

          .course-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 0.65rem;
          }

          .view-btn {
            width: auto;
          }
        }

        @media (max-width: 480px) {
          .hero-section h1 {
            font-size: clamp(1.9rem, 9vw, 2.4rem);
          }

          .search-box {
            gap: 0.65rem;
            padding: 0.7rem 0.85rem;
          }

          .filter-container {
            justify-content: flex-start;
          }

          .course-icon-wrapper {
            height: 142px;
          }

          .course-footer {
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
          }
        }

        /* Consistent page rhythm */
        .hero-section h1,
        .section-title,
        .course-info h3 {
          letter-spacing: 0;
        }

        .hero-section h1 {
          font-size: clamp(2.2rem, 5vw, 3.25rem) !important;
          line-height: 1.12;
          margin-bottom: 0.75rem !important;
        }

        .hero-section p {
          font-size: clamp(0.98rem, 1.5vw, 1.08rem) !important;
          line-height: 1.58 !important;
          margin-bottom: 1.35rem !important;
        }

        .section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.25rem) !important;
          line-height: 1.18;
          margin-bottom: 2.1rem !important;
        }

        .section-title::after {
          bottom: -0.65rem !important;
          width: 3.5rem !important;
        }

        .courses-grid {
          padding-top: clamp(1.75rem, 4vw, 2.75rem) !important;
          padding-bottom: clamp(1rem, 2.5vw, 1.75rem) !important;
        }

        .course-section {
          margin-bottom: clamp(2rem, 4vw, 3rem) !important;
        }

        .course-section:last-child {
          margin-bottom: 0 !important;
        }

        .row.g-4 {
          --bs-gutter-x: 1.15rem;
          --bs-gutter-y: 1.15rem;
        }

        .course-info h3 {
          font-size: clamp(1.18rem, 1.9vw, 1.3rem) !important;
          line-height: 1.28 !important;
          margin-bottom: 0.55rem !important;
        }

        .course-info p {
          color: #5f5149 !important;
          font-size: 0.9rem !important;
          line-height: 1.5 !important;
          margin-bottom: 0.9rem !important;
        }

        .filter-btn,
        .meta-item,
        .view-btn,
        .price-tag,
        .course-badge,
        .premium-badge {
          font-family: inherit;
          line-height: 1.2;
        }

        .filter-btn {
          font-size: 0.88rem !important;
        }

        .course-meta {
          gap: 0.55rem !important;
          margin-bottom: 0.9rem !important;
          padding-top: 0.75rem !important;
        }

        .price-tag,
        .view-btn {
          min-height: 2.35rem;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: clamp(1.9rem, 8vw, 2.5rem) !important;
          }

          .hero-section p {
            font-size: 0.98rem !important;
          }

          .section-title {
            font-size: clamp(1.6rem, 7vw, 2rem) !important;
          }

          .filter-container {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .course-info h3 {
            font-size: 1.18rem !important;
          }

          .course-footer {
            gap: 0.55rem !important;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="container hero-content">
          <h1 data-aos="fade-down">{pageCopy.title}</h1>
          <p data-aos="fade-up" data-aos-delay="100">
            {pageCopy.subtitle}
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
        {liveCourses.length > 0 && (
          <div className="course-section">
            <h2 className="section-title">Live Courses</h2>
            <div className="row g-4">
              {liveCourses.map(renderCourseCard)}
            </div>
          </div>
        )}

        {recordedCourses.length > 0 && (
          <div className="course-section">
            <h2 className="section-title">Recorded Courses</h2>
            <div className="row g-4">
              {recordedCourses.map(renderCourseCard)}
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
