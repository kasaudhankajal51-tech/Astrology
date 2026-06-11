import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';
import { isValidIndianMobile, normalizeIndianMobile } from '../utils/validation';

function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [validity, setValidity] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState(null);
  const [securityNotice, setSecurityNotice] = useState('');
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  const [showConsultForm, setShowConsultForm] = useState(false);
  const [consultData, setConsultData] = useState({
    preferredDatetime: '',
    notes: '',
    mobile: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const token = localStorage.getItem('studentToken');
  const protectedIdentity = studentProfile?.email || studentProfile?.mobile || localStorage.getItem('studentName') || 'Protected student access';

  const getVideoProvider = (video) => video?.videoProvider || video?.provider || (video?.otp && video?.playbackInfo ? 'vdocipher' : (video?.videoUrl ? 'supabase' : 'bunny'));

  const getPlayerSrc = (video) => {
    if (!video) return '';

    if (getVideoProvider(video) === 'supabase') {
      return video.videoUrl || video.playbackUrl || video.signedEmbedUrl || video.embedUrl || '';
    }

    if (getVideoProvider(video) === 'vdocipher') {
      if (video.otp && video.playbackInfo) {
        return `https://player.vdocipher.com/v2/?otp=${encodeURIComponent(video.otp)}&playbackInfo=${encodeURIComponent(video.playbackInfo)}`;
      }
      return video.signedEmbedUrl || video.drmEmbedUrl || video.secureEmbedUrl || video.embedUrl || video.videoUrl || video.secureUrl || '';
    }

    return video.signedEmbedUrl || video.drmEmbedUrl || video.secureEmbedUrl || video.embedUrl || video.videoUrl || video.secureUrl || '';
  };

  const updateVideoProgress = async (videoId, isCompleted = false) => {
    if (!videoId) return;

    try {
      await fetch(`${API_BASE}/api/student/video/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: id,
          videoId,
          isCompleted
        })
      });
    } catch (err) {
      // ignore progress update errors
    }
  };

  const handleSelectVideo = (video) => {
    setActiveVideo(video);
    const videoId = video.videoId || video._id || video.id;
    updateVideoProgress(videoId, false);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [courseRes, videosRes, validityRes] = await Promise.all([
          fetch(`${API_BASE}/api/student/course/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/student/course/${id}/videos`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/api/student/course/${id}/validity`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const courseData = await courseRes.json();
        const videosData = await videosRes.json();
        const validityData = await validityRes.json();

        if (!courseRes.ok || courseData.success === false) {
          throw new Error(courseData.message || 'Unable to load course details');
        }

        if (!videosRes.ok || videosData.success === false) {
          throw new Error(videosData.message || 'Unable to load course videos');
        }

        const rawCoursePayload = courseData.course || courseData.data || courseData;
        const coursePayload = {
          ...rawCoursePayload,
          id: rawCoursePayload.id || rawCoursePayload._id || rawCoursePayload.courseId,
          title: rawCoursePayload.title || rawCoursePayload.courseTitle || 'Course',
          description: rawCoursePayload.description || rawCoursePayload.shortDescription || 'Continue your enrolled course lessons.'
        };
        const videosPayload = videosData.videos || videosData.data || videosData || [];
        const validityPayload = validityData.validity || validityData.data || validityData;

        setCourse(coursePayload);
        setVideos(videosPayload);
        setValidity(validityPayload);
        setActiveVideo(videosPayload.length > 0 ? videosPayload[0] : null);

        fetch(`${API_BASE}/api/student/profile`, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => res.json())
          .then((profileData) => {
            if (profileData.success) setStudentProfile(profileData.profile);
          })
          .catch(() => {});
      } catch (err) {
        toast.error(err.message || 'Network Error loading course');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, navigate, token]);

  useEffect(() => {
    const blockedKeys = new Set(['PrintScreen']);

    const showNotice = (message) => {
      setSecurityNotice(message);
      window.clearTimeout(window.__courseSecurityNoticeTimer);
      window.__courseSecurityNoticeTimer = window.setTimeout(() => setSecurityNotice(''), 2200);
    };

    const blockEvent = (event, message) => {
      event.preventDefault();
      event.stopPropagation();
      showNotice(message);
      return false;
    };

    const handleKeyDown = (event) => {
      const key = event.key;
      const lowerKey = key.toLowerCase();
      const isSave = (event.ctrlKey || event.metaKey) && lowerKey === 's';
      const isPrint = (event.ctrlKey || event.metaKey) && lowerKey === 'p';
      const isDevTools = key === 'F12' || ((event.ctrlKey || event.metaKey) && event.shiftKey && ['i', 'j', 'c'].includes(lowerKey));
      const isScreenClip = (event.metaKey && event.shiftKey && ['3', '4', '5', 's'].includes(lowerKey)) || (event.ctrlKey && event.shiftKey && lowerKey === 's');

      if (blockedKeys.has(key) || isSave || isPrint || isDevTools || isScreenClip) {
        blockEvent(event, 'Screen capture and download shortcuts are restricted for course videos.');
      }
    };

    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);
    const handleVisibility = () => setIsWindowFocused(!document.hidden);

    const handleContextMenu = (event) => blockEvent(event, 'Right click is disabled for protected videos.');
    const handleCopy = (event) => blockEvent(event, 'Copy is disabled on protected course pages.');
    const handleDragStart = (event) => blockEvent(event, 'Dragging content is disabled on protected course pages.');

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('copy', handleCopy, true);
    document.addEventListener('dragstart', handleDragStart, true);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('copy', handleCopy, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.clearTimeout(window.__courseSecurityNoticeTimer);
    };
  }, []);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    if (!isValidIndianMobile(consultData.mobile)) {
      toast.error('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setBookingLoading(true);
    const sanitizedMobile = normalizeIndianMobile(consultData.mobile);

    try {
      const res = await fetch(`${API_BASE}/api/student/consultations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: id,
          preferredDatetime: consultData.preferredDatetime,
          notes: consultData.notes,
          mobile: sanitizedMobile
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
  if (!course) return null;

  return (
    <div onContextMenu={(e) => e.preventDefault()} style={{ background: '#FDF6EE', minHeight: '100vh', paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)', paddingBottom: '60px', userSelect: 'none' }}>
      {securityNotice && (
        <div
          style={{
            position: 'fixed',
            top: 96,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            padding: '10px 16px',
            borderRadius: '999px',
            background: '#2A0F02',
            color: '#fff',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
            fontWeight: 700,
            fontSize: '0.88rem'
          }}
        >
          <i className="fas fa-shield-alt me-2"></i>
          {securityNotice}
        </div>
      )}
      <div className="container-fluid px-4 mt-4 course-player-shell">
        <button className="btn btn-link text-decoration-none text-dark mb-3 px-0" onClick={() => navigate('/dashboard')}>
          <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
        </button>

        <div className="row g-4">
          <div className="col-lg-8">
            <div
              onContextMenu={(e) => e.preventDefault()}
              style={{ background: '#000', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}
            >
              {activeVideo ? (
                <>
                  {getVideoProvider(activeVideo) === 'supabase' ? (
                    <video
                      key={activeVideo.videoId || activeVideo._id}
                      src={getPlayerSrc(activeVideo)}
                      title={activeVideo.title || 'Course video'}
                      controls
                      controlsList="nodownload"
                      playsInline
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ width: '100%', height: '100%', filter: isWindowFocused ? 'none' : 'blur(12px)', transition: 'filter 0.2s ease', background: '#000' }}
                    />
                  ) : (
                    <iframe
                      src={getPlayerSrc(activeVideo)}
                      title={activeVideo.title || 'Course video'}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ border: 0, width: '100%', height: '100%', filter: isWindowFocused ? 'none' : 'blur(12px)', transition: 'filter 0.2s ease' }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media;"
                      allowFullScreen={false}
                    ></iframe>
                  )}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      zIndex: 2,
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '18%',
                        left: '8%',
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '13px',
                        fontWeight: 700,
                        textShadow: '0 1px 3px rgba(0,0,0,0.55)',
                        animation: 'studentWatermarkMove 34s linear infinite'
                      }}
                    >
                      {protectedIdentity}
                    </div>
                    <div className="student-watermark-grid">
                      {Array.from({ length: 18 }).map((_, index) => (
                        <span key={index}>{protectedIdentity}</span>
                      ))}
                    </div>
                    {!isWindowFocused && (
                      <div className="student-focus-shield">
                        <i className="fas fa-eye-slash"></i>
                        <strong>Video hidden while this window is not active</strong>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 text-white">
                  <h5>No videos uploaded for this course yet.</h5>
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-white" style={{ borderRadius: '16px', border: '1px solid rgba(200,131,42,0.1)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#2A0F02', fontWeight: 700 }}>
                {activeVideo ? activeVideo.title : course.title}
              </h3>
              <p className="text-muted mt-2">{course.description}</p>
              {validity && (
                <div className="mt-3 p-3 rounded-4" style={{ background: '#F7F2EA', border: '1px solid rgba(200,131,42,0.18)' }}>
                  <strong>Course Validity:</strong>
                  <div className="text-muted small mt-1">Valid From: {validity.validFrom || 'N/A'}</div>
                  <div className="text-muted small">Valid Till: {validity.validTill || 'N/A'}</div>
                  <div className="text-muted small">Days Remaining: {validity.daysRemaining ?? 'N/A'}</div>
                </div>
              )}
            </div>

            <div className="mt-4 p-4" style={{ background: 'linear-gradient(135deg, #2A0F02, #1a0a01)', borderRadius: '16px', color: '#FFF' }}>
              <div className="course-consult-head d-flex justify-content-between align-items-center">
                <div>
                  <h4 style={{ fontFamily: "var(--font-heading, 'Playfair Display', serif)", fontWeight: 800, color: '#F5C98D' }}>
                    <i className="fas fa-gem me-2"></i> BOOK YOUR 1 FREE CONSULTATION
                  </h4>
                  <p className="mb-0" style={{ color: '#FFF7ED', opacity: 0.92, fontSize: '0.95rem', lineHeight: 1.55 }}>
                    Please book this only after completing the course, otherwise discussion quality may suffer.
                  </p>
                </div>
                {!showConsultForm && (
                  <button onClick={() => setShowConsultForm(true)} className="btn course-consult-btn" style={{ background: '#C8832A', color: '#FFF', padding: '10px 25px', borderRadius: '9px', fontWeight: 700, flexShrink: 0 }}>
                    Book Free Consultation
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
                        onChange={(e) => setConsultData({ ...consultData, mobile: e.target.value })}
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
                        onChange={(e) => setConsultData({ ...consultData, preferredDatetime: e.target.value })}
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF', colorScheme: 'dark' }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="small text-muted mb-1">Questions / Focus Areas (Optional)</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={consultData.notes}
                        onChange={(e) => setConsultData({ ...consultData, notes: e.target.value })}
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF' }}
                      ></textarea>
                    </div>
                    <div className="col-12 text-end mt-3 course-consult-actions">
                      <button type="button" onClick={() => setShowConsultForm(false)} className="btn btn-link text-white text-decoration-none me-3">Cancel</button>
                      <button type="submit" className="btn" disabled={bookingLoading} style={{ background: '#C8832A', color: '#FFF', padding: '8px 30px', borderRadius: '9px' }}>
                        {bookingLoading ? 'Submitting...' : 'Confirm Request'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bg-white" style={{ borderRadius: '16px', border: '1px solid rgba(200,131,42,0.1)', height: '100%', maxHeight: '800px', display: 'flex', flexDirection: 'column' }}>
              <div className="p-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <h5 style={{ fontWeight: 700, margin: 0, color: '#2A0F02' }}>Course Curriculum</h5>
                <p className="small text-muted m-0 mt-1">{videos.length} Video Lessons</p>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }} className="p-3">
                {videos.map((vid, index) => (
                  <button
                    key={vid._id || vid.videoId || vid.id}
                    onClick={() => handleSelectVideo(vid)}
                    className="w-100 text-start mb-2 p-3"
                    style={{
                      background: activeVideo?._id === vid._id || activeVideo?.videoId === vid.videoId || activeVideo?.id === vid.id ? '#FDF6EE' : 'transparent',
                      border: activeVideo?._id === vid._id || activeVideo?.videoId === vid.videoId || activeVideo?.id === vid.id ? '1px solid #C8832A' : '1px solid transparent',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}
                  >
                    <div style={{
                      width: '30px', height: '30px',
                      background: activeVideo?._id === vid._id || activeVideo?.videoId === vid.videoId || activeVideo?.id === vid.id ? '#C8832A' : '#f0f0f0',
                      color: activeVideo?._id === vid._id || activeVideo?.videoId === vid.videoId || activeVideo?.id === vid.id ? '#FFF' : '#666',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.85rem', fontWeight: 'bold', flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ color: '#2A0F02', fontWeight: activeVideo?._id === vid._id || activeVideo?.videoId === vid.videoId || activeVideo?.id === vid.id ? 700 : 500 }}>
                      {vid.title}
                    </div>
                    {activeVideo?._id === vid._id || activeVideo?.videoId === vid.videoId || activeVideo?.id === vid.id ? (
                      <i className="fas fa-play text-muted ms-auto small"></i>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes studentWatermarkMove {
          0% { transform: translate(0, 0); }
          25% { transform: translate(55vw, 8vh); }
          50% { transform: translate(35vw, 35vh); }
          75% { transform: translate(8vw, 22vh); }
          100% { transform: translate(0, 0); }
        }

        .student-watermark-grid {
          position: absolute;
          inset: -12%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 42px 28px;
          transform: rotate(-18deg);
          opacity: 0.2;
          color: #fff;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.2;
          text-transform: lowercase;
        }

        .student-watermark-grid span {
          white-space: nowrap;
          text-shadow: 0 1px 3px rgba(0,0,0,0.7);
        }

        .student-focus-shield {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(0,0,0,0.78);
          color: #fff;
          text-align: center;
          padding: 24px;
        }

        .student-focus-shield i {
          color: #C8832A;
          font-size: 28px;
        }

        .course-player-shell {
          max-width: 1500px;
          margin-left: auto;
          margin-right: auto;
        }

        .course-player-shell,
        .course-player-shell * {
          min-width: 0;
        }

        .course-consult-btn {
          min-height: 42px;
        }

        @media (max-width: 768px) {
          .course-player-shell {
            padding-left: 14px !important;
            padding-right: 14px !important;
            margin-top: 0.75rem !important;
          }

          .course-consult-head {
            align-items: stretch !important;
            flex-direction: column;
            gap: 16px;
          }

          .course-consult-btn {
            width: 100%;
          }

          .course-consult-actions {
            display: grid;
            gap: 10px;
            text-align: stretch !important;
          }

          .course-consult-actions .btn,
          .course-consult-actions .btn-link {
            width: 100%;
            margin: 0 !important;
          }

          .student-watermark-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 28px 18px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default CoursePlayer;
