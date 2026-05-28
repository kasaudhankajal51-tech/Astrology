import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const studentName = localStorage.getItem('studentName') || 'Student';

  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem('studentToken');
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE}/api/student/courses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.success) {
          setEnrollments(data.enrollments);
        } else {
          toast.error(data.message || 'Session expired. Please log in again.');
          localStorage.removeItem('studentToken');
          navigate('/login');
        }
      } catch (err) {
        toast.error('Network Error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyCourses();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentName');
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center py-5 mt-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div style={{ background: '#FDF6EE', minHeight: '100vh', padding: '100px 0 60px' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2A0F02', fontWeight: 800 }}>
              Welcome back, {studentName}
            </h2>
            <p className="text-muted">Access your enrolled courses and upcoming sessions.</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-danger" style={{ borderRadius: '50px', padding: '8px 25px' }}>
            Logout <i className="fas fa-sign-out-alt ms-2"></i>
          </button>
        </div>

        <h4 className="mb-4" style={{ color: '#8B4A1E', fontWeight: 700 }}>My Learning Portal</h4>
        
        {enrollments.length === 0 ? (
          <div className="text-center py-5 bg-white" style={{ borderRadius: '20px', border: '1px dashed #C8832A' }}>
            <i className="fas fa-graduation-cap mb-3" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            <h5>You haven't enrolled in any courses yet.</h5>
            <Link to="/courses" className="btn mt-3" style={{ background: '#C8832A', color: '#FFF', borderRadius: '50px', padding: '10px 30px' }}>
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {enrollments.map(({ enrollmentId, course, validUntil }) => (
              <div key={enrollmentId} className="col-lg-4 col-md-6">
                <div style={{ background: '#FFF', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(200,131,42,0.1)' }}>
                  <img src={course.thumbnailUrl || '/images/vedic_thumbnail.png'} alt={course.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div className="p-4">
                    <h5 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#2A0F02' }}>{course.title}</h5>
                    <p className="small text-muted mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {course.description}
                    </p>
                    <div className="d-flex align-items-center gap-2 mb-4 text-danger small fw-bold">
                      <i className="fas fa-clock"></i> Access Valid Until: {new Date(validUntil).toLocaleDateString()}
                    </div>
                    <Link to={`/student/course/${course._id}`} className="btn w-100" style={{ background: '#2A0F02', color: '#FFF', borderRadius: '12px', padding: '12px', fontWeight: 600 }}>
                      Continue Learning <i className="fas fa-play ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
