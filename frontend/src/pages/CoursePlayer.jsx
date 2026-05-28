import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';

function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consultation Form State
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [consultData, setConsultData] = useState({
    preferredDatetime: '',
    notes: '',
    mobile: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      const token = localStorage.getItem('studentToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/student/courses/${id}/player`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.success) {
          setCourseData(data);
          if (data.videos && data.videos.length > 0) {
            setActiveVideo(data.videos[0]);
          }
        } else {
          toast.error(data.message || 'Access Denied');
          navigate('/dashboard');
        }
      } catch (err) {
        toast.error('Network Error loading course');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [id, navigate]);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    const token = localStorage.getItem('studentToken');

    try {
      const res = await fetch(`${API_BASE}/api/student/consultations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: id,
          preferredDatetime: consultData.preferredDatetime,
          notes: consultData.notes,
          mobile: consultData.mobile
        })
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Consultation Request Submitted! We will contact you soon.');
        setShowConsultForm(false);
      } else {
        toast.error(data.message || 'Failed to book consultation');
      }
    } catch (err) {
      toast.error('Network error while booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center py-5 mt-5"><div className="spinner-border text-primary"></div></div>;
  if (!courseData) return null;

  return (
    <div style={{ background: '#FDF6EE', minHeight: '100vh', paddingTop: '80px', paddingBottom: '60px' }}>
      <div className="container-fluid px-4 mt-4">
        <button className="btn btn-link text-decoration-none text-dark mb-3 px-0" onClick={() => navigate('/dashboard')}>
          <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
        </button>

        <div className="row g-4">
          {/* Main Video Area */}
          <div className="col-lg-8">
            <div style={{ background: '#000', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              {activeVideo ? (
                <iframe 
                  src={activeVideo.secureUrl} 
                  loading="lazy" 
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                  allowFullScreen={true}
                  onContextMenu={(e) => e.preventDefault()} // Disable right click
                ></iframe>
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 text-white">
                  <h5>No videos uploaded for this course yet.</h5>
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-white" style={{ borderRadius: '16px', border: '1px solid rgba(200,131,42,0.1)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#2A0F02', fontWeight: 700 }}>
                {activeVideo ? activeVideo.title : courseData.course.title}
              </h3>
              <p className="text-muted mt-2">{courseData.course.description}</p>
            </div>

            {/* Consultation Booking Section */}
            <div className="mt-4 p-4" style={{ background: 'linear-gradient(135deg, #2A0F02, #1a0a01)', borderRadius: '16px', color: '#FFF' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#C8832A' }}>
                    <i className="fas fa-gem me-2"></i> Complimentary Expert Consultation
                  </h4>
                  <p className="mb-0" style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                    Included in your purchase! We recommend completing all course videos before booking to maximize your session.
                  </p>
                </div>
                {!showConsultForm && (
                  <button onClick={() => setShowConsultForm(true)} className="btn" style={{ background: '#C8832A', color: '#FFF', padding: '10px 25px', borderRadius: '50px', fontWeight: 700, flexShrink: 0 }}>
                    Book Now
                  </button>
                )}
              </div>

              {showConsultForm && (
                <form onSubmit={handleConsultSubmit} className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="small text-muted mb-1">Mobile Number for WhatsApp</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        value={consultData.mobile}
                        onChange={(e) => setConsultData({...consultData, mobile: e.target.value})}
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small text-muted mb-1">Preferred Date & Time</label>
                      <input 
                        type="datetime-local" 
                        className="form-control" 
                        required 
                        value={consultData.preferredDatetime}
                        onChange={(e) => setConsultData({...consultData, preferredDatetime: e.target.value})}
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF', colorScheme: 'dark' }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="small text-muted mb-1">Questions / Focus Areas (Optional)</label>
                      <textarea 
                        className="form-control" 
                        rows="2"
                        value={consultData.notes}
                        onChange={(e) => setConsultData({...consultData, notes: e.target.value})}
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF' }}
                      ></textarea>
                    </div>
                    <div className="col-12 text-end mt-3">
                      <button type="button" onClick={() => setShowConsultForm(false)} className="btn btn-link text-white text-decoration-none me-3">Cancel</button>
                      <button type="submit" className="btn" disabled={bookingLoading} style={{ background: '#C8832A', color: '#FFF', padding: '8px 30px', borderRadius: '50px' }}>
                        {bookingLoading ? 'Submitting...' : 'Confirm Request'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Playlist */}
          <div className="col-lg-4">
            <div className="bg-white" style={{ borderRadius: '16px', border: '1px solid rgba(200,131,42,0.1)', height: '100%', maxHeight: '800px', display: 'flex', flexDirection: 'column' }}>
              <div className="p-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <h5 style={{ fontWeight: 700, margin: 0, color: '#2A0F02' }}>Course Curriculum</h5>
                <p className="small text-muted m-0 mt-1">{courseData.videos.length} Video Lessons</p>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto' }} className="p-3">
                {courseData.videos.map((vid, index) => (
                  <button 
                    key={vid._id} 
                    onClick={() => setActiveVideo(vid)}
                    className="w-100 text-start mb-2 p-3"
                    style={{ 
                      background: activeVideo?._id === vid._id ? '#FDF6EE' : 'transparent',
                      border: activeVideo?._id === vid._id ? '1px solid #C8832A' : '1px solid transparent',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}
                  >
                    <div style={{ 
                      width: '30px', height: '30px', 
                      background: activeVideo?._id === vid._id ? '#C8832A' : '#f0f0f0', 
                      color: activeVideo?._id === vid._id ? '#FFF' : '#666',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.85rem', fontWeight: 'bold', flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ color: '#2A0F02', fontWeight: activeVideo?._id === vid._id ? 700 : 500 }}>
                      {vid.title}
                    </div>
                    {activeVideo?._id === vid._id && (
                      <i className="fas fa-play text-muted ms-auto small"></i>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePlayer;
