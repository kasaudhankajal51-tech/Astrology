import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';


function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${slug}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.blog);
        } else {
          toast.error('Blog not found');
        }
      } catch (err) {
        toast.error('Error fetching blog');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Unfolding celestial wisdom...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h2>404 - Cosmic Insight Not Found</h2>
        <p>The stars are silent about this page.</p>
        <Link to="/blog" className="btn btn-primary mt-3">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <article className="blog-detail-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/blog">Blog</Link></li>
                <li className="breadcrumb-item active">{blog.title}</li>
              </ol>
            </nav>

            <header className="mb-5">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">{blog.category}</span>
              <h1 className="display-4 fw-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>{blog.title}</h1>
              <div className="d-flex align-items-center gap-3 text-muted">
                <div className="d-flex align-items-center">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
                    <i className="fas fa-user"></i>
                  </div>
                  <span>Astro Expert</span>
                </div>
                <span>•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </header>

            {blog.image && (
              <figure className="mb-5 shadow-sm" style={{ borderRadius: '30px', overflow: 'hidden' }}>
                <img src={blog.image} alt={blog.title} className="w-100" style={{ maxHeight: '500px', objectFit: 'cover' }} />
              </figure>
            )}

            <div 
              className="blog-rich-content lh-lg" 
              style={{ fontSize: '1.2rem', color: '#333' }}
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />

            <footer className="mt-5 pt-5 border-top">
              <div className="tags mb-4">
                <span className="me-2 fw-bold">Tags:</span>
                {blog.tags && blog.tags.map(tag => (
                  <span key={tag} className="badge bg-light text-muted me-2 p-2">#{tag}</span>
                ))}
              </div>
              <div className="bg-light p-4 rounded-4 d-flex align-items-center gap-4">
                <div className="bg-white p-3 rounded-circle shadow-sm">
                  <i className="fas fa-user-tie fa-2x text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-1">About the Author</h5>
                  <p className="mb-0 text-muted">Our Astro Experts have decades of experience in Vedic sciences, helping thousands navigate their celestial paths.</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogDetail;
