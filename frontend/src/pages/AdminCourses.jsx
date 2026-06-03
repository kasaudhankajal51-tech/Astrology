import React, { useState, useEffect } from 'react';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoCourse, setVideoCourse] = useState(null);
  const [courseVideos, setCourseVideos] = useState([]);
  const [videoForm, setVideoForm] = useState({ title: '', bunnyVideoId: '', sortOrder: '', videoProvider: 'bunny' });
  const [videoFile, setVideoFile] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoModalLoading, setVideoModalLoading] = useState(false);
  const [editingCourseVideos, setEditingCourseVideos] = useState([]);
  const [editingCourseVideosLoading, setEditingCourseVideosLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [previewLoadingId, setPreviewLoadingId] = useState(null);
  const [courseSubmitting, setCourseSubmitting] = useState(false);
  const [courseSubmitMessage, setCourseSubmitMessage] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    validityDays: '',
    thumbnailUrl: ''
  });
  
  const [initialVideoForm, setInitialVideoForm] = useState({ title: '', bunnyVideoId: '' });
  const [initialVideoFile, setInitialVideoFile] = useState(null);

  const getVideoProvider = (video) => {
    return video?.videoProvider || 'bunny';
  };

  const getVideoValue = (video) => {
    return (
      video?.bunnyVideoId ||
      video?.videoUrl ||
      video?.url ||
      video?.playbackUrl ||
      video?.embedUrl ||
      video?.videoId ||
      video?.id ||
      ''
    );
  };

  const getSavedVideoFromResponse = (data) => data?.video || data?.courseVideo || data?.bunny || null;

  const copyVideoValue = async (video) => {
    const value = getVideoValue(video);
    if (!value) {
      toast.error('No Bunny video ID saved yet');
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      toast.success('Bunny video ID copied');
    } catch {
      toast.error('Could not copy video ID');
    }
  };

  const openVideoPreview = async (video, courseId = videoCourse?._id || editingCourse?._id) => {
    const videoId = video?._id || video?.id || video?.videoId;
    const token = localStorage.getItem('adminToken');

    if (!token) {
      toast.error('Admin login required');
      return;
    }

    if (!courseId || !videoId) {
      toast.error('Video preview is not available yet');
      return;
    }

    setPreviewLoadingId(videoId);
    try {
      const res = await fetch(`${API_BASE}/api/admin/courses/${courseId}/videos/${videoId}/preview`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await parseApiResponse(res);

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to load video preview');
        return;
      }

      setPreviewVideo(data.video);
    } catch (err) {
      console.error('Failed to load video preview:', err);
      toast.error('Network error while loading video preview');
    } finally {
      setPreviewLoadingId(null);
    }
  };

  const closeVideoPreview = () => {
    setPreviewVideo(null);
  };

  const getCourseVideoCount = (course) => (
    course?.videoCount ??
    course?.videosCount ??
    course?.videos?.length ??
    0
  );

  const syncCourseVideoCount = (courseId, videos) => {
    const count = videos?.length || 0;
    setCourses((currentCourses) => currentCourses.map((course) => (
      course._id === courseId ? { ...course, videoCount: count, videosCount: count } : course
    )));
    setVideoCourse((currentCourse) => (
      currentCourse?._id === courseId ? { ...currentCourse, videoCount: count, videosCount: count } : currentCourse
    ));
    setEditingCourse((currentCourse) => (
      currentCourse?._id === courseId ? { ...currentCourse, videoCount: count, videosCount: count } : currentCourse
    ));
  };

  const totalVideos = courses.reduce((count, course) => count + getCourseVideoCount(course), 0);
  const activeCourses = courses.filter((course) => course.isActive).length;

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/courses`);
      const data = await parseApiResponse(res);
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

  const handleVideoInputChange = (e) => {
    setVideoForm({ ...videoForm, [e.target.name]: e.target.value });
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files?.[0] || null);
  };

  const resetVideoForm = () => {
    setVideoForm({ title: '', bunnyVideoId: '', sortOrder: '', videoProvider: 'bunny' });
    setVideoFile(null);
    setEditingVideoId(null);
  };

  const startEditingVideo = (video) => {
    setEditingVideoId(video._id || video.id || video.videoId);
    setVideoForm({
      title: video.title || '',
      bunnyVideoId: getVideoValue(video),
      sortOrder: video.sortOrder ?? '',
      videoProvider: 'bunny'
    });
    setVideoFile(null);
  };

  const parseApiResponse = async (res) => {
    const text = await res.text();
    if (!text) return {};

    try {
      return JSON.parse(text);
    } catch {
      return {
        success: false,
        message: text.length > 180 ? `${text.slice(0, 180)}...` : text
      };
    }
  };

  const fetchCourseVideos = async (courseId) => {
    setVideoModalLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/courses/${courseId}`);
      const data = await parseApiResponse(res);
      if (data.success) {
        const videos = data.videos || [];
        setCourseVideos(videos);
        syncCourseVideoCount(courseId, videos);
      } else {
        toast.error(data.message || 'Failed to load course videos');
      }
    } catch (err) {
      console.error('Failed to load course videos:', err);
      toast.error('Failed to load course videos');
    } finally {
      setVideoModalLoading(false);
    }
  };

  const openVideoModal = async (course) => {
    setVideoCourse(course);
    setShowVideoModal(true);
    resetVideoForm();
    await fetchCourseVideos(course._id);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setVideoCourse(null);
    setCourseVideos([]);
    resetVideoForm();
  };

  const submitCourseVideo = async (courseId, onSuccess, videoId = editingVideoId) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Admin login required');
      return false;
    }

    if (!videoForm.title) {
      toast.error('Video title is required');
      return false;
    }

    // Check if either file or video ID is provided
    const hasVideoFile = !!videoFile;
    const hasVideoId = !!videoForm.bunnyVideoId;

    if (!hasVideoFile && !hasVideoId) {
      toast.error('Please provide a Bunny.net Video ID or select a file to upload.');
      return false;
    }

    setVideoLoading(true);

    try {
      let res;
      if (videoFile) {
        const formData = new FormData();
        formData.append('title', videoForm.title);
        formData.append('sortOrder', Number(videoForm.sortOrder) || 0);
        formData.append('videoProvider', videoForm.videoProvider);
        if (videoForm.bunnyVideoId) formData.append('bunnyVideoId', videoForm.bunnyVideoId);
        formData.append('videoFile', videoFile);

        res = await fetch(`${API_BASE}/api/admin/courses/${courseId}/videos${videoId ? `/${videoId}` : '/upload'}`, {
          method: videoId ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });
      } else {
        const payload = {
          title: videoForm.title,
          videoProvider: videoForm.videoProvider,
          sortOrder: Number(videoForm.sortOrder) || 0
        };

        payload.bunnyVideoId = videoForm.bunnyVideoId;

        res = await fetch(`${API_BASE}/api/admin/courses/${courseId}/videos${videoId ? `/${videoId}` : ''}`, {
          method: videoId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await parseApiResponse(res);
      if (data.success) {
        const savedVideoId = getVideoValue(getSavedVideoFromResponse(data));
        toast.success(savedVideoId ? `${videoId ? 'Video updated' : 'Video added'}: ${savedVideoId}` : (videoId ? 'Video updated' : 'Video added to course'));
        resetVideoForm();
        if (onSuccess) await onSuccess();
        return true;
      } else {
        toast.error(data.message || (videoId ? 'Failed to update video' : 'Failed to add video'));
        return false;
      }
    } catch (err) {
      console.error('Failed to add course video:', err);
      toast.error(videoId ? 'Network error while updating video' : 'Network error while adding video');
      return false;
    } finally {
      setVideoLoading(false);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!videoCourse) return;
    await submitCourseVideo(videoCourse._id, () => fetchCourseVideos(videoCourse._id));
  };

  const handleAddVideoFromEditModal = async () => {
    if (!editingCourse?._id) return;
    await submitCourseVideo(editingCourse._id, async () => {
      const res = await fetch(`${API_BASE}/api/courses/${editingCourse._id}`);
      const data = await parseApiResponse(res);
      if (data.success) {
        const videos = data.videos || [];
        setEditingCourseVideos(videos);
        syncCourseVideoCount(editingCourse._id, videos);
      }
    });
  };

  const requestConfirm = (config) => {
    setConfirmDialog(config);
  };

  const closeConfirm = () => {
    setConfirmDialog(null);
  };

  const runConfirmedAction = async () => {
    const action = confirmDialog?.onConfirm;
    closeConfirm();
    if (action) await action();
  };

  const handleDeleteVideo = async (videoId, courseId = videoCourse?._id, onSuccess) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Admin login required');
      return;
    }

    if (!courseId) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/courses/${courseId}/videos/${videoId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await parseApiResponse(res);
      if (data.success) {
        toast.success('Video removed successfully');
        resetVideoForm();
        if (onSuccess) {
          await onSuccess();
        } else {
          await fetchCourseVideos(courseId);
        }
      } else {
        toast.error(data.message || 'Failed to remove video');
      }
    } catch (err) {
      console.error('Failed to delete video:', err);
      toast.error('Network error while deleting video');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCourseSubmitting(true);
    setCourseSubmitMessage(editingCourse ? 'Saving course...' : 'Creating course...');
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
      const data = await parseApiResponse(res);
      
      if (data.success) {
        let initialVideoFailed = false;
        // If creating new course and has initial video, add it
        if (!editingCourse && (initialVideoForm.title && (initialVideoForm.bunnyVideoId || initialVideoFile))) {
          const courseId = data.course._id;
          const token = localStorage.getItem('adminToken');
          setCourseSubmitMessage(initialVideoFile ? 'Uploading video to Bunny.net...' : 'Attaching Bunny.net video...');
          
          try {
            let videoRes;
            if (initialVideoFile) {
              const videoData = new FormData();
              videoData.append('title', initialVideoForm.title);
              videoData.append('sortOrder', 0);
              videoData.append('videoFile', initialVideoFile);

              videoRes = await fetch(`${API_BASE}/api/admin/courses/${courseId}/videos/upload`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`
                },
                body: videoData
              });
            } else {
              videoRes = await fetch(`${API_BASE}/api/admin/courses/${courseId}/videos`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  title: initialVideoForm.title,
                  bunnyVideoId: initialVideoForm.bunnyVideoId,
                  sortOrder: 0
                })
              });
            }
            const videoData = await parseApiResponse(videoRes);
            if (!videoRes.ok || !videoData.success) {
              initialVideoFailed = true;
              toast.error(videoData.message || `Course created, but Bunny video save failed (${videoRes.status}).`);
            } else {
              toast.success('Course created and video attached.');
            }
          } catch (err) {
            initialVideoFailed = true;
            console.error('Failed to add initial video:', err);
            toast.error(`Course created, but Bunny video save failed: ${err.message || 'Network error'}`);
          }
        }

        if (initialVideoFailed) {
          setEditingCourse(data.course);
          setVideoForm({
            title: initialVideoForm.title,
            bunnyVideoId: initialVideoForm.bunnyVideoId,
            sortOrder: 0,
            videoProvider: 'bunny'
          });
          setVideoFile(initialVideoFile);
          setEditingCourseVideos([]);
          setEditingCourseVideosLoading(false);
          fetchCourses();
          return;
        }
        
        if (editingCourse || !(initialVideoForm.title && (initialVideoForm.bunnyVideoId || initialVideoFile))) {
          toast.success(editingCourse ? 'Course updated!' : 'Course created!');
        }
        setShowModal(false);
        fetchCourses();
      } else {
        toast.error(data.message || `Operation failed (${res.status})`);
      }
    } catch (err) {
      toast.error(err.message || 'Network error');
    } finally {
      setCourseSubmitting(false);
      setCourseSubmitMessage('');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/api/admin/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await parseApiResponse(res);
      if (data.success) {
        toast.success('Course deleted');
        fetchCourses();
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const confirmDeleteCourse = (course) => {
    requestConfirm({
      title: 'Delete course?',
      message: `This will deactivate "${course.title}". Students will no longer see it as an active course.`,
      confirmLabel: 'Delete Course',
      danger: true,
      onConfirm: () => handleDelete(course._id)
    });
  };

  const confirmDeleteVideo = (video, courseId = videoCourse?._id, onSuccess) => {
    requestConfirm({
      title: 'Remove video?',
      message: `Remove "${video.title || 'this video'}" from this course?`,
      confirmLabel: 'Remove Video',
      danger: true,
      onConfirm: () => handleDeleteVideo(video._id, courseId, onSuccess)
    });
  };

  const openModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setVideoForm({ title: '', bunnyVideoId: '', sortOrder: '', videoProvider: 'bunny' });
      setVideoFile(null);
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        validityDays: course.validityDays,
        thumbnailUrl: course.thumbnailUrl || ''
      });
      // Fetch videos for this course
      setEditingCourseVideosLoading(true);
      fetch(`${API_BASE}/api/courses/${course._id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const videos = data.videos || [];
            setEditingCourseVideos(videos);
            syncCourseVideoCount(course._id, videos);
          }
          setEditingCourseVideosLoading(false);
        })
        .catch(() => {
          setEditingCourseVideos([]);
          setEditingCourseVideosLoading(false);
        });
    } else {
      setEditingCourse(null);
      setFormData({ title: '', description: '', price: '', validityDays: '', thumbnailUrl: '' });
      setInitialVideoForm({ title: '', bunnyVideoId: '' });
      setInitialVideoFile(null);
      setEditingCourseVideos([]);
    }
    setShowModal(true);
  };

  if (isLoading) {
    return <div className="text-center py-5"><div className="lf-spinner"></div></div>;
  }

  return (
    <div className="lms-studio">
      <div className="lms-hero">
        <div className="lms-hero-copy">
          <span className="lms-eyebrow">Course Operations</span>
          <h2>LMS Studio</h2>
          <p>Manage course details, pricing, access validity, and attached class videos from one clean workspace.</p>
        </div>
        <button className="lms-primary-action" onClick={() => openModal()}>
          <i className="fas fa-plus"></i>
          <span>New Course</span>
        </button>
      </div>

      <div className="lms-metrics">
        <div className="lms-metric">
          <span className="lms-metric-label">Total Courses</span>
          <strong>{courses.length}</strong>
        </div>
        <div className="lms-metric">
          <span className="lms-metric-label">Active Courses</span>
          <strong>{activeCourses}</strong>
        </div>
        <div className="lms-metric">
          <span className="lms-metric-label">Attached Videos</span>
          <strong>{totalVideos}</strong>
        </div>
      </div>

      <div className="lms-table-card">
        <div className="lms-table-head">
          <div>
            <h3>Course Library</h3>
            <p>Review content inventory and jump straight into video management.</p>
          </div>
        </div>
        <table className="lms-table">
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Price</th>
              <th>Validity</th>
              <th>Videos</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="lms-empty-row">No courses found in the database.</div>
                </td>
              </tr>
            ) : (
              courses.map(course => (
                <tr key={course._id}>
                  <td>
                    <div className="lms-course-cell">
                      <img 
                        src={course.thumbnailUrl || '/images/vedic_thumbnail.png'} 
                        alt={course.title}
                      />
                      <div>
                        <strong>{course.title}</strong>
                        <span>{course.description || 'No description added yet'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="lms-price">Rs. {course.price}</td>
                  <td>{course.validityDays} days</td>
                  <td>
                    <span className="lms-video-count">
                      <i className="fas fa-play-circle"></i>
                      {getCourseVideoCount(course)}
                    </span>
                  </td>
                  <td>
                    <span className={`lms-status ${course.isActive ? 'lms-status--active' : 'lms-status--inactive'}`}>
                      {course.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="lms-actions">
                      <button className="lms-icon-btn" title="Manage videos" onClick={() => openVideoModal(course)}>
                        <i className="fas fa-video"></i>
                      </button>
                      <button className="lms-icon-btn" title="Edit course" onClick={() => openModal(course)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="lms-icon-btn lms-icon-btn--danger" title="Delete course" onClick={() => confirmDeleteCourse(course)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay lms-modal-overlay">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="course-modal lms-course-modal"
            >
              {courseSubmitting && (
                <div className="lms-operation-overlay">
                  <div className="lf-spinner"></div>
                  <p>{courseSubmitMessage || 'Saving...'}</p>
                </div>
              )}
              <div className="course-modal-header">
                <div>
                  <h3 className="course-modal-title">{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
                  <p className="course-modal-subtitle">Update course details below</p>
                </div>
                <button type="button" className="modal-close-btn" disabled={courseSubmitting} onClick={() => setShowModal(false)}>&times;</button>
              </div>
              
              <form onSubmit={handleSubmit} className="course-form">
                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">Course Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="form-input" required />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      className="form-textarea"
                      required
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-group">
                        <label className="form-label">Price (Rs.)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="form-input" required />
                      </div>
                    </div>
                    <div className="form-col">
                      <div className="form-group">
                        <label className="form-label">Validity (Days)</label>
                        <input type="number" name="validityDays" value={formData.validityDays} onChange={handleInputChange} className="form-input" required />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Thumbnail Image URL <span className="optional">(Optional)</span></label>
                    <input type="text" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleInputChange} className="form-input" placeholder="/images/your_image.png" />
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">Video Management</h4>
                  {editingCourse ? (
                    <>
                      <p className="section-hint">Videos attached to this course</p>
                      {editingCourseVideosLoading ? (
                        <div className="text-center py-3"><div className="lf-spinner"></div></div>
                      ) : editingCourseVideos && editingCourseVideos.length > 0 ? (
                        <div className="videos-preview">
                          {editingCourseVideos.map((video) => (
                            <div key={video._id} className="video-preview-item">
                              <div className="video-preview-info">
                                <div className="video-preview-title">{video.title}</div>
                                <div className="video-preview-provider">{getVideoProvider(video) === 'bunny' ? 'Bunny.net' : getVideoProvider(video)}</div>
                                <div className="video-saved-id">
                                  <span>Bunny ID</span>
                                  <code>{getVideoValue(video) || 'No video ID saved'}</code>
                                </div>
                              </div>
                              <div className="video-preview-actions">
                                <button type="button" className="lms-mini-btn" onClick={() => openVideoPreview(video, editingCourse._id)} disabled={previewLoadingId === (video._id || video.id || video.videoId)}>
                                  {previewLoadingId === (video._id || video.id || video.videoId) ? 'Loading...' : 'Preview'}
                                </button>
                                <button type="button" className="lms-mini-btn" onClick={() => copyVideoValue(video)}>
                                  Copy ID
                                </button>
                                <button type="button" className="lms-mini-btn" onClick={() => startEditingVideo(video)}>
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="lms-mini-btn lms-mini-btn--danger"
                                  onClick={() => confirmDeleteVideo(video, editingCourse._id, async () => {
                                    const res = await fetch(`${API_BASE}/api/courses/${editingCourse._id}`);
                                    const data = await parseApiResponse(res);
                                    if (data.success) {
                                      const videos = data.videos || [];
                                      setEditingCourseVideos(videos);
                                      syncCourseVideoCount(editingCourse._id, videos);
                                    }
                                  })}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-state">No videos attached. Click the video icon from the courses table to add videos.</div>
                      )}
                      <div className="initial-video-grid edit-video-grid">
                        <div className="form-group">
                          <label className="form-label">Video Title</label>
                          <input
                            type="text"
                            name="title"
                            value={videoForm.title}
                            onChange={handleVideoInputChange}
                            className="form-input"
                            placeholder="e.g., Lesson 2"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Bunny.net Video ID or URL</label>
                          <input
                            type="text"
                            name="bunnyVideoId"
                            value={videoForm.bunnyVideoId}
                            onChange={handleVideoInputChange}
                            className="form-input"
                            placeholder="Paste URL or video ID here"
                          />
                          <p className="form-hint">Paste a Bunny video URL/ID, or upload a file.</p>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Upload Video File</label>
                          <div className="file-input-wrap">
                            <input
                              type="file"
                              accept="video/*"
                              onChange={handleVideoFileChange}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Sort Order</label>
                          <input
                            type="number"
                            name="sortOrder"
                            value={videoForm.sortOrder}
                            onChange={handleVideoInputChange}
                            className="form-input"
                            placeholder="0"
                          />
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary add-video-inline-btn"
                          disabled={videoLoading}
                          onClick={handleAddVideoFromEditModal}
                        >
                          {videoLoading ? (editingVideoId ? 'Updating...' : 'Adding...') : (editingVideoId ? 'Update Video' : 'Add Video')}
                        </button>
                        {editingVideoId && (
                          <button type="button" className="btn btn-secondary add-video-inline-btn" onClick={resetVideoForm}>
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="initial-video-grid">
                      <p className="section-hint">Optionally add a video when creating this course</p>

                      <div className="form-group">
                        <label className="form-label">Video Title <span className="optional">(Optional)</span></label>
                        <input 
                          type="text" 
                          value={initialVideoForm.title} 
                          onChange={(e) => setInitialVideoForm({ ...initialVideoForm, title: e.target.value })}
                          className="form-input"
                          placeholder="e.g., Introduction to Astrology"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Bunny.net Video ID or URL <span className="optional">(Optional)</span></label>
                        <input 
                          type="text" 
                          value={initialVideoForm.bunnyVideoId} 
                          onChange={(e) => setInitialVideoForm({ ...initialVideoForm, bunnyVideoId: e.target.value })}
                          className="form-input"
                          placeholder="e.g., https://vod.bunnycdn.com/... or video-id-12345"
                        />
                        <p className="form-hint">Paste your Bunny.net video URL or ID here, OR upload a file below.</p>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Or Upload Video File <span className="optional">(Optional)</span></label>
                        <div className="file-input-wrap">
                          <input 
                            type="file" 
                            accept="video/*" 
                            onChange={(e) => setInitialVideoFile(e.target.files?.[0] || null)}
                          />
                        </div>
                        <p className="form-hint">If a file is selected, it will be uploaded to Bunny.net automatically.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" disabled={courseSubmitting} onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={courseSubmitting}>
                    {courseSubmitting ? 'Please wait...' : (editingCourse ? 'Save Changes' : 'Create Course')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVideoModal && (
          <div className="modal-overlay lms-modal-overlay">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="video-modal lms-video-modal"
            >
              <div className="video-modal-header">
                <div>
                  <span className="lms-eyebrow">Course Videos</span>
                  <h3 className="video-modal-title">Manage Videos</h3>
                  <p className="video-modal-subtitle">{videoCourse?.title}</p>
                </div>
                <button type="button" className="modal-close-btn" onClick={closeVideoModal}>&times;</button>
              </div>

              {videoModalLoading ? (
                <div className="text-center py-4"><div className="lf-spinner"></div></div>
              ) : (
                <div className="video-modal-content">
                  <div className="video-list-panel">
                    <div className="video-panel-title">
                      <h4>Posted Videos</h4>
                      <span>{courseVideos.length}</span>
                    </div>
                    {courseVideos.length === 0 ? (
                      <div className="video-empty-state">
                        <i className="fas fa-film"></i>
                        <p>No videos attached yet.</p>
                      </div>
                    ) : (
                      <div className="video-list">
                        {courseVideos.map((video, index) => (
                          <div key={video._id || video.id || `${video.title || 'video'}-${index}`} className="video-item">
                            <div className="video-item-index">{index + 1}</div>
                            <div className="video-item-info">
                              <div className="video-item-title">{video.title || `Video ${index + 1}`}</div>
                              <div className="video-item-provider">{getVideoProvider(video) === 'bunny' ? 'Bunny.net' : getVideoProvider(video)}</div>
                              <div className="video-saved-id">
                                <span>Bunny ID</span>
                                <code>{getVideoValue(video) || 'No video ID saved'}</code>
                              </div>
                            </div>
                            <button type="button" className="lms-mini-btn" onClick={() => openVideoPreview(video, videoCourse?._id)} disabled={previewLoadingId === (video._id || video.id || video.videoId)}>
                              {previewLoadingId === (video._id || video.id || video.videoId) ? 'Loading...' : 'Preview'}
                            </button>
                            <button type="button" className="lms-mini-btn" onClick={() => copyVideoValue(video)}>
                              Copy ID
                            </button>
                            <button type="button" className="lms-mini-btn" onClick={() => startEditingVideo(video)}>
                              Edit
                            </button>
                            <button type="button" className="btn-remove" title="Remove video" onClick={() => confirmDeleteVideo(video)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleAddVideo} className="video-form">
                <div className="video-form-head">
                  <h4 className="video-form-title">{editingVideoId ? 'Update Video' : 'Add New Video'}</h4>
                  <p>{editingVideoId ? 'Change title, sort order, Bunny URL/ID, or choose a file to replace the video.' : 'Paste a provider URL or ID, or choose a local file for upload.'}</p>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Video Title</label>
                  <input type="text" name="title" value={videoForm.title} onChange={handleVideoInputChange} className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Video Provider</label>
                  <div className="form-input lms-provider-lock">
                    <i className="fas fa-shield-alt"></i>
                    Bunny.net Stream
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Bunny.net Video ID or URL</label>
                  <input
                    type="text"
                    name="bunnyVideoId"
                    value={videoForm.bunnyVideoId}
                    onChange={handleVideoInputChange}
                    className="form-input"
                    placeholder="Paste URL or video ID here"
                  />
                  <p className="form-hint">Or upload a file below instead</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Or Upload Video File</label>
                  <div className="file-input-wrap">
                    <input type="file" accept="video/*" onChange={handleVideoFileChange} />
                  </div>
                  <p className="form-hint">File will be uploaded to Bunny.net automatically</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Sort Order</label>
                  <input type="number" name="sortOrder" value={videoForm.sortOrder} onChange={handleVideoInputChange} className="form-input" placeholder="0" />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={closeVideoModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={videoLoading}>
                    {videoLoading ? (editingVideoId ? 'Updating...' : 'Adding...') : (editingVideoId ? 'Update Video' : 'Add Video')}
                  </button>
                </div>
                {editingVideoId && (
                  <button type="button" className="btn btn-secondary video-cancel-edit-btn" onClick={resetVideoForm}>
                    Cancel Video Edit
                  </button>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDialog && (
          <div className="modal-overlay lms-confirm-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="lms-confirm-modal"
            >
              <div className={`lms-confirm-icon ${confirmDialog.danger ? 'lms-confirm-icon--danger' : ''}`}>
                <i className={`fas ${confirmDialog.danger ? 'fa-trash' : 'fa-check'}`}></i>
              </div>
              <div>
                <h3>{confirmDialog.title}</h3>
                <p>{confirmDialog.message}</p>
              </div>
              <div className="lms-confirm-actions">
                <button type="button" className="btn btn-secondary" onClick={closeConfirm}>
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn ${confirmDialog.danger ? 'lms-danger-action' : 'btn-primary'}`}
                  onClick={runConfirmedAction}
                >
                  {confirmDialog.confirmLabel || 'Confirm'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewVideo && (
          <div className="modal-overlay lms-preview-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="lms-preview-modal"
            >
              <div className="lms-preview-header">
                <div>
                  <span className="lms-eyebrow">Video Preview</span>
                  <h3>{previewVideo.title || 'Course video'}</h3>
                  <p>{previewVideo.bunnyVideoId}</p>
                </div>
                <button type="button" className="modal-close-btn" onClick={closeVideoPreview}>&times;</button>
              </div>
              <div className="lms-preview-frame">
                <iframe
                  src={previewVideo.embedUrl}
                  title={previewVideo.title || 'Video preview'}
                  loading="lazy"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminCourses;
