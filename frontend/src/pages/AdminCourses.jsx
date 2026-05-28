import React, { useState, useEffect } from 'react';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    validityDays: '',
    thumbnailUrl: ''
  });

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/courses`);
      const data = await res.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editingCourse 
      ? `${API_BASE}/api/admin/courses/${editingCourse._id}`
      : `${API_BASE}/api/admin/courses`;
      
    const method = editingCourse ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          validityDays: Number(formData.validityDays)
        })
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success(editingCourse ? 'Course updated!' : 'Course created!');
        setShowModal(false);
        fetchCourses();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/api/admin/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Course deleted');
        fetchCourses();
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const openModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        validityDays: course.validityDays,
        thumbnailUrl: course.thumbnailUrl || ''
      });
    } else {
      setEditingCourse(null);
      setFormData({ title: '', description: '', price: '', validityDays: '', thumbnailUrl: '' });
    }
    setShowModal(true);
  };

  if (isLoading) {
    return <div className="text-center py-5"><div className="lf-spinner"></div></div>;
  }

  return (
    <div className="dash-home">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="dash-section-title mb-1">LMS Studio</h2>
          <p className="text-muted small">Manage your cosmic curriculum and live courses.</p>
        </div>
        <button className="lf-btn" onClick={() => openModal()} style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>
          <i className="fas fa-plus me-2"></i> New Course
        </button>
      </div>

      <div className="leads-table-wrap">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Price</th>
              <th>Validity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">No courses found in the database.</td>
              </tr>
            ) : (
              courses.map(course => (
                <tr key={course._id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={course.thumbnailUrl || '/images/vedic_thumbnail.png'} 
                        alt="" 
                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                      <span className="fw-bold" style={{ color: '#2A0F02' }}>{course.title}</span>
                    </div>
                  </td>
                  <td>₹{course.price}</td>
                  <td>{course.validityDays} Days</td>
                  <td>
                    <span className={`status-badge ${course.isActive ? 'status-new' : 'status-spam'}`}>
                      {course.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-light me-2" onClick={() => openModal(course)}>
                      <i className="fas fa-edit text-primary"></i>
                    </button>
                    <button className="btn btn-sm btn-light" onClick={() => handleDelete(course._id)}>
                      <i className="fas fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white p-4"
              style={{ borderRadius: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">{editingCourse ? 'Edit Course' : 'Create New Course'}</h4>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="lf-group">
                  <label>Course Title</label>
                  <div className="lf-input-wrap">
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                  </div>
                </div>
                
                <div className="lf-group">
                  <label>Description</label>
                  <div className="lf-input-wrap" style={{ height: 'auto' }}>
                    <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      required
                      style={{ width: '100%', border: 'none', background: 'transparent', padding: '15px', minHeight: '100px', outline: 'none' }}
                    ></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="lf-group">
                      <label>Price (₹)</label>
                      <div className="lf-input-wrap">
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="lf-group">
                      <label>Validity (Days)</label>
                      <div className="lf-input-wrap">
                        <input type="number" name="validityDays" value={formData.validityDays} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lf-group">
                  <label>Thumbnail Image URL (Optional)</label>
                  <div className="lf-input-wrap">
                    <input type="text" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleInputChange} placeholder="/images/your_image.png" />
                  </div>
                </div>

                <div className="d-flex gap-3 mt-4">
                  <button type="button" className="lf-btn" style={{ background: '#eee', color: '#333' }} onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="lf-btn">
                    {editingCourse ? 'Save Changes' : 'Create Course'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminCourses;
