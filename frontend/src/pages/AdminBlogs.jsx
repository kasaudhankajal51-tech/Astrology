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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Blog Management</h3>
        <button 
          className="btn btn-primary" 
          style={{ background: '#ff6a00', border: 'none' }}
          onClick={() => { setIsEditing(!isEditing); if(!isEditing) setCurrentBlog({ title: '', slug: '', content: '', excerpt: '', category: 'Astrology', image: '', tags: '', isPublished: false }); }}
        >
          {isEditing ? 'Cancel' : 'Add New Blog'}
        </button>
      </div>

      {isEditing && (
        <div className="card mb-4" style={{ background: '#1a1a2e', border: '1px solid #ff6a00' }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="small text-muted">Title</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="small text-muted">Slug</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" value={currentBlog.slug} onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="small text-muted">Category</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" value={currentBlog.category} onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="small text-muted">Image URL</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" value={currentBlog.image} onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} />
                </div>
                <div className="col-12 mb-3">
                  <label className="small text-muted">Excerpt</label>
                  <textarea className="form-control bg-dark text-white border-secondary" rows="2" value={currentBlog.excerpt} onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})}></textarea>
                </div>
                <div className="col-12 mb-3">
                  <label className="small text-muted">Content (HTML allowed)</label>
                  <textarea className="form-control bg-dark text-white border-secondary" rows="10" value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} required></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="small text-muted">Tags (comma separated)</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" value={currentBlog.tags} onChange={e => setCurrentBlog({...currentBlog, tags: e.target.value})} />
                </div>
                <div className="col-md-6 mb-3 d-flex align-items-center">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" checked={currentBlog.isPublished} onChange={e => setCurrentBlog({...currentBlog, isPublished: e.target.checked})} id="isPublished" />
                    <label className="form-check-label ms-2" htmlFor="isPublished">Publish immediately</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 py-2">Save Blog</button>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td><span className={`badge ${blog.isPublished ? 'bg-success' : 'bg-warning'}`}>{blog.isPublished ? 'Published' : 'Draft'}</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleEdit(blog)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(blog._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBlogs;
