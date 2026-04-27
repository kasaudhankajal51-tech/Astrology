import { useEffect } from 'react';

function Blog() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const posts = [
    { id: 1, title: 'Unlocking Your Wealth: 2026 Financial Horoscope', date: '25 May 2026', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800', category: 'Financial', excerpt: 'Discover how planetary alignments in 2026 will impact your financial growth and investment opportunities.' },
    { id: 2, title: 'The Secret of Compatibility in Marriage', date: '22 May 2026', image: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&q=80&w=800', category: 'Relationship', excerpt: 'Understand the role of Venus and Mars in determining long-term compatibility and marital bliss.' },
    { id: 3, title: 'Career Shifts: Navigating Retrogrades', date: '15 May 2026', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', category: 'Career', excerpt: 'How to maintain professional stability during Mercury and Saturn retrogrades this year.' },
    { id: 4, title: 'Personal Growth Through Solar Eclipses', date: '10 May 2026', image: 'https://images.unsplash.com/photo-1532983330958-4b32bc9bb07d?auto=format&fit=crop&q=80&w=800', category: 'Personal', excerpt: 'Solar eclipses are powerful times for transformation. Learn how to harness this cosmic energy.' },
    { id: 5, title: 'Auspicious Muhurats for New Beginnings', date: '05 May 2026', image: 'https://images.unsplash.com/photo-1515940175183-6798529cb860?auto=format&fit=crop&q=80&w=800', category: 'Muhurat', excerpt: 'Finding the right time to start a business or sign contracts based on lunar cycles.' },
    { id: 6, title: 'Health & Wellness: The Zodiac Way', date: '01 May 2026', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800', category: 'Health', excerpt: 'Align your wellness routine with your sun sign for maximum vitality and mental peace.' },
  ];

  const categories = [
    { name: 'Financial Astrology', count: 12 },
    { name: 'Relationship Advice', count: 8 },
    { name: 'Career Guidance', count: 15 },
    { name: 'Predictive Astrology', count: 20 },
    { name: 'Vedic Wisdom', count: 10 }
  ];

  const recentPosts = [
    { title: 'Mercury Retrograde 2026', date: '16 Jan, 2026', image: 'https://images.unsplash.com/photo-1614732414444-af9613f3d1a3?auto=format&fit=crop&q=80&w=200' },
    { title: 'Marriage Yoga Analysis', date: '12 Jan, 2026', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=200' },
    { title: 'Saturn Transit Impact', date: '05 Jan, 2026', image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=200' },
  ];

  const tags = ['Zodiac', 'Future', 'Horoscope', 'Planets', 'Vedic', 'Remedies'];

  return (
    <>
      {/* Hero Banner */}
      <section className="blog-hero">
        <div className="hero-overlay"></div>
        <div className="container position-relative z-2">
          <div className="text-center" data-aos="fade-down">
            <h5 className="section-subtitle">Wisdom & Insights</h5>
            <h1 className="display-4 fw-bold text-white mb-3">Cosmic <span className="text-gradient">Blog</span></h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item"><a href="/" className="text-white text-decoration-none opacity-75">Home</a></li>
                <li className="breadcrumb-item active text-white" aria-current="page">Blog</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content-section py-5">
        <div className="container">
          <div className="row g-5">
            {/* Left - Blog Posts */}
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-up">
                <div className="view-controls d-flex gap-3">
                  <button className="btn-icon active"><i className="fas fa-th-list"></i></button>
                  <button className="btn-icon"><i className="fas fa-th-large"></i></button>
                </div>
                <h6 className="text-muted m-0">Showing <b>1-6</b> of <b>24</b> results</h6>
              </div>

              <div className="blog-list">
                {posts.map((post, idx) => (
                  <div className="blog-card-horizontal glass-panel mb-4" key={post.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                    <div className="row g-0 h-100">
                      <div className="col-md-4">
                        <div className="blog-card-img-wrapper h-100">
                          <img src={post.image} alt={post.title} />
                          <div className="date-badge">
                            <span className="day">{post.date.split(' ')[0]}</span>
                            <span className="month">{post.date.split(' ')[1]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="blog-card-body p-4">
                          <div className="category-tag mb-2">
                            <i className="fas fa-tags me-2"></i>{post.category}
                          </div>
                          <h3 className="blog-card-title mb-3">{post.title}</h3>
                          <div className="blog-meta mb-3">
                            <span className="me-3"><i className="far fa-user me-2"></i>By Admin</span>
                            <span><i className="far fa-comments me-2"></i>12 Comments</span>
                          </div>
                          <p className="blog-excerpt text-muted mb-4">{post.excerpt}</p>
                          <a href="#" className="read-more-link">Read Full Article <i className="fas fa-arrow-right ms-2"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <nav className="mt-5" data-aos="fade-up">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled"><a className="page-link" href="#"><i className="fas fa-chevron-left"></i></a></li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#"><i className="fas fa-chevron-right"></i></a></li>
                </ul>
              </nav>
            </div>

            {/* Right Sidebar */}
            <div className="col-lg-4">
              <aside className="blog-sidebar">
                {/* Search */}
                <div className="sidebar-widget glass-panel mb-5" data-aos="fade-left">
                  <h4 className="widget-title mb-4">Search</h4>
                  <div className="search-box position-relative">
                    <input type="text" className="form-control-custom" placeholder="Search insights..." />
                    <button className="search-btn"><i className="fas fa-search"></i></button>
                  </div>
                </div>

                {/* Categories */}
                <div className="sidebar-widget glass-panel mb-5" data-aos="fade-left" data-aos-delay="100">
                  <h4 className="widget-title mb-4">Categories</h4>
                  <ul className="list-unstyled category-list">
                    {categories.map((cat, idx) => (
                      <li key={idx}>
                        <a href="#" className="d-flex justify-content-between align-items-center">
                          <span>{cat.name}</span>
                          <span className="count-badge">{cat.count}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="sidebar-widget glass-panel mb-5" data-aos="fade-left" data-aos-delay="200">
                  <h4 className="widget-title mb-4">Recent Posts</h4>
                  <div className="recent-posts-list">
                    {recentPosts.map((post, idx) => (
                      <a href="#" key={idx} className="recent-post-item d-flex gap-3 mb-4 text-decoration-none">
                        <div className="recent-post-img">
                          <img src={post.image} alt="post" />
                        </div>
                        <div className="recent-post-info">
                          <span className="post-date">{post.date}</span>
                          <h5 className="post-title m-0">{post.title}</h5>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="sidebar-widget glass-panel" data-aos="fade-left" data-aos-delay="300">
                  <h4 className="widget-title mb-4">Popular Tags</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <a href="#" key={idx} className="tag-link">{tag}</a>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .blog-hero {
          position: relative;
          padding: 60px 0 40px;
          background-image: url('https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=1600');
          background-size: cover;
          background-position: center;
          margin-top: 0;
          overflow: hidden;
        }

        /* Prevent AOS horizontal scroll */
        body {
          overflow-x: hidden;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(7,9,19,0.9), rgba(7,9,19,0.7));
        }

        .section-subtitle {
          color: var(--cosmic-accent);
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 15px;
          display: block;
        }

        .text-gradient {
          background: linear-gradient(135deg, #ff6a00, #ff0080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blog-content-section {
          background: var(--cosmic-dark);
          min-height: 100vh;
        }

        .view-controls .btn-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }

        .view-controls .btn-icon.active {
          background: var(--cosmic-accent);
          border-color: var(--cosmic-accent);
          box-shadow: 0 5px 15px var(--cosmic-glow);
        }

        /* Horizontal Blog Card */
        .blog-card-horizontal {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .blog-card-horizontal:hover {
          transform: translateX(10px);
          border-color: rgba(255,106,0,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          background: rgba(255,255,255,0.06);
        }

        .blog-card-img-wrapper {
          position: relative;
          overflow: hidden;
        }

        .blog-card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.6s;
        }

        .blog-card-horizontal:hover .blog-card-img-wrapper img {
          transform: scale(1.1);
        }

        .date-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--cosmic-accent);
          color: #fff;
          padding: 8px 15px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .date-badge .day { font-size: 1.2rem; font-weight: 800; display: block; line-height: 1; }
        .date-badge .month { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; opacity: 0.9; }

        .category-tag {
          color: var(--cosmic-accent);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .blog-card-title {
          font-family: 'Merriweather Sans', serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.3;
        }

        .blog-meta {
          font-size: 0.85rem;
          color: #888;
        }

        .blog-meta i { color: var(--cosmic-accent); }

        .blog-excerpt {
          font-size: 0.95rem;
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more-link {
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition: 0.3s;
          display: inline-flex;
          align-items: center;
        }

        .read-more-link:hover {
          color: var(--cosmic-accent);
          transform: translateX(5px);
        }

        /* Sidebar Styles */
        .widget-title {
          font-family: 'Merriweather Sans', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          position: relative;
          padding-bottom: 15px;
        }

        .widget-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: var(--cosmic-accent);
          border-radius: 2px;
        }

        .form-control-custom {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 15px;
          border-radius: 12px;
          color: #fff;
          transition: 0.3s;
        }

        .form-control-custom:focus {
          border-color: var(--cosmic-accent);
          outline: none;
          box-shadow: 0 0 15px var(--cosmic-glow);
        }

        .search-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--cosmic-accent);
          font-size: 1.1rem;
        }

        .category-list li {
          margin-bottom: 12px;
        }

        .category-list a {
          color: #ccc;
          text-decoration: none;
          transition: 0.3s;
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.02);
        }

        .category-list a:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
          padding-left: 20px;
        }

        .count-badge {
          background: rgba(255,255,255,0.1);
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .recent-post-img img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 12px;
        }

        .post-date {
          font-size: 0.75rem;
          color: var(--cosmic-accent);
          font-weight: 600;
          text-transform: uppercase;
        }

        .post-title {
          font-size: 1rem;
          color: #fff;
          font-weight: 700;
          line-height: 1.4;
          transition: 0.3s;
        }

        .recent-post-item:hover .post-title {
          color: var(--cosmic-accent);
        }

        .tag-link {
          padding: 6px 15px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #ccc;
          text-decoration: none;
          border-radius: 30px;
          font-size: 0.85rem;
          transition: 0.3s;
        }

        .tag-link:hover {
          background: var(--cosmic-accent);
          border-color: var(--cosmic-accent);
          color: #fff;
          box-shadow: 0 5px 15px var(--cosmic-glow);
        }

        /* Pagination Styles */
        .pagination .page-link {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          margin: 0 5px;
          border-radius: 10px !important;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }

        .pagination .page-item.active .page-link {
          background: var(--cosmic-accent);
          border-color: var(--cosmic-accent);
        }

        .pagination .page-link:hover {
          background: rgba(255,255,255,0.15);
        }

        @media (max-width: 991px) {
          .blog-hero { padding: 100px 0 60px; }
          .blog-card-horizontal { height: auto !important; }
        }

        @media (max-width: 768px) {
          .blog-card-img-wrapper { height: 250px; }
          .blog-card-title { font-size: 1.3rem; }
        }
      `}</style>
    </>
  );
}

export default Blog;
