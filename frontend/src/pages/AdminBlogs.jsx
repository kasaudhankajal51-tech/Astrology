import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: '', slug: '', content: '', excerpt: '', category: 'Astrology', image: '', tags: '', isPublished: false
  });

  const ADMIN_PASS = 'admin123';

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/blogs/admin', {
        headers: { 'x-admin-secret': ADMIN_PASS }
      });
      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
    } catch (err) {
      toast.error('Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = currentBlog._id ? 'PUT' : 'POST';
    const url = currentBlog._id 
      ? `http://localhost:5000/api/blogs/${currentBlog._id}` 
      : 'http://localhost:5000/api/blogs';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-secret': ADMIN_PASS 
        },
        body: JSON.stringify({
          ...currentBlog,
          tags: typeof currentBlog.tags === 'string' ? currentBlog.tags.split(',').map(t => t.trim()) : currentBlog.tags
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(currentBlog._id ? 'Blog Updated' : 'Blog Created');
        setIsEditing(false);
        setCurrentBlog({ title: '', slug: '', content: '', excerpt: '', category: 'Astrology', image: '', tags: '', isPublished: false });
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Error saving blog');
    }
  };

  const handleEdit = (blog) => {
    setCurrentBlog({
      ...blog,
      tags: blog.tags.join(', ')
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': ADMIN_PASS }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Blog deleted');
        fetchBlogs();
      }
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Content Management</h3>
          <p className="text-muted small">Manage your platform's articles and news</p>
        </div>
        <button 
          className="btn-premium px-4" 
          onClick={() => { setIsEditing(!isEditing); if(!isEditing) setCurrentBlog({ title: '', slug: '', content: '', excerpt: '', category: 'Astrology', image: '', tags: '', isPublished: false }); }}
        >
          {isEditing ? (
            <><i className="fas fa-times"></i> Cancel Edit</>
          ) : (
            <><i className="fas fa-plus"></i> Write New Article</>
          )}
        </button>
      </div>

      {isEditing && (
        <div className="admin-card blog-editor-card mb-5">
          <div className="admin-card-header">
            <h5 className="mb-0 fw-bold">{currentBlog._id ? 'Edit Article' : 'Compose New Article'}</h5>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="small fw-bold text-muted mb-2">ARTICLE TITLE</label>
                  <input type="text" className="form-control admin-input" value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} required placeholder="Enter a catchy title..." />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold text-muted mb-2">URL SLUG</label>
                  <input type="text" className="form-control admin-input" value={currentBlog.slug} onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})} required placeholder="e.g. astrology-trends-2024" />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold text-muted mb-2">CATEGORY</label>
                  <select className="form-select admin-input" value={currentBlog.category} onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})}>
                    <option value="Vedic Astrology">Vedic Astrology</option>
                    <option value="Numerology">Numerology</option>
                    <option value="Tarot Reading">Tarot Reading</option>
                    <option value="Palmistry">Palmistry</option>
                    <option value="Vastu Shastra">Vastu Shastra</option>
                    <option value="Zodiac Insights">Zodiac Insights</option>
                    <option value="Relationship Advice">Relationship Advice</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Spiritual Healing">Spiritual Healing</option>
                    <option value="Festivals & Muhurat">Festivals & Muhurat</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold text-muted mb-2">FEATURED IMAGE URL</label>
                  <input type="text" className="form-control admin-input" value={currentBlog.image} onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} placeholder="https://..." />
                </div>
                <div className="col-12">
                  <label className="small fw-bold text-muted mb-2">EXCERPT (Short Summary)</label>
                  <textarea className="form-control admin-input" rows="2" value={currentBlog.excerpt} onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} placeholder="Write a brief summary..."></textarea>
                </div>
                <div className="col-12">
                  <label className="small fw-bold text-muted mb-2">MAIN CONTENT</label>
                  <textarea className="form-control admin-input" rows="12" value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} required placeholder="Start writing your cosmic wisdom here..."></textarea>
                </div>
                <div className="col-md-12">
                  <label className="small fw-bold text-muted mb-2">TAGS (Type or select from below)</label>
                  <input type="text" className="form-control admin-input mb-2" value={currentBlog.tags} onChange={e => setCurrentBlog({...currentBlog, tags: e.target.value})} placeholder="zodiac, stars, planets" />
                  <div className="d-flex flex-wrap gap-2">
                    {['Horoscope', 'Planets', 'Remedies', 'Future', 'Zodiac', 'Meditation', 'Karma', 'Spirituality', 'Success', 'Predictions'].map(tag => (
                      <span 
                        key={tag} 
                        className="badge-trending" 
                        style={{ cursor: 'pointer', background: currentBlog.tags.includes(tag) ? '#ff6a00' : 'rgba(255,106,0,0.1)', color: currentBlog.tags.includes(tag) ? 'white' : '#ff6a00' }}
                        onClick={() => {
                          const currentTags = currentBlog.tags ? currentBlog.tags.split(',').map(t => t.trim()) : [];
                          if (currentTags.includes(tag)) {
                            setCurrentBlog({...currentBlog, tags: currentTags.filter(t => t !== tag).join(', ')});
                          } else {
                            setCurrentBlog({...currentBlog, tags: [...currentTags, tag].filter(t => t).join(', ')});
                          }
                        }}
                      >
                        + {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" role="switch" id="isPublished" checked={currentBlog.isPublished} onChange={e => setCurrentBlog({...currentBlog, isPublished: e.target.checked})} />
                    <label className="form-check-label fw-bold small ms-2" htmlFor="isPublished">VISIBLE TO PUBLIC</label>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-top d-flex gap-3">
                <button type="submit" className="btn-premium px-5 py-3 shadow">
                  <i className="fas fa-save me-2"></i> {currentBlog._id ? 'Update Article' : 'Publish Article'}
                </button>
                <button type="button" className="btn btn-premium-outline px-4" onClick={() => setIsEditing(false)}>Save to Drafts</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-header">
          <h5 className="mb-0 fw-bold">Live Content Catalog</h5>
          <span className="badge-premium badge-course">{blogs.length} Articles</span>
        </div>
        <div className="admin-card-body">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cover / Title</th>
                  <th>Topic</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="4" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                ) : (
                  blogs.map(blog => (
                    <tr key={blog._id}>
                      <td style={{ minWidth: '300px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <img src={blog.image || 'https://via.placeholder.com/60'} alt="cover" className="rounded shadow-sm" style={{ width: '60px', height: '45px', objectFit: 'cover' }} />
                          <div className="fw-bold text-dark">{blog.title}</div>
                        </div>
                      </td>
                      <td>
                        <span className="badge-premium badge-webinar">{blog.category}</span>
                      </td>
                      <td>
                        <span className={`badge-premium ${blog.isPublished ? 'badge-completed' : 'badge-pending'}`}>
                          {blog.isPublished ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-premium-outline" onClick={() => handleEdit(blog)} title="Edit"><i className="fas fa-edit"></i></button>
                          <button className="btn btn-sm btn-outline-danger border-light" onClick={() => handleDelete(blog._id)} title="Delete"><i className="fas fa-trash-alt"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogs;
