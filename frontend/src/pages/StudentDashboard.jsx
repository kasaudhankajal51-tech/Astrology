import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';

function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', mobile: '' });
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseValidity, setCourseValidity] = useState({});
  const [banners, setBanners] = useState([]);
  const [merchandise, setMerchandise] = useState([]);
  const [newCourses, setNewCourses] = useState([]);
  const [offers, setOffers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedCourseForMaterials, setSelectedCourseForMaterials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('studentToken');
  const studentName = profile?.name || localStorage.getItem('studentName') || 'Student';

  const normalizeCourse = (entry) => {
    if (!entry) return null;

    if (entry.course) {
      return {
        id: entry.course._id || entry.course.courseId || entry._id || entry.course.id,
        title: entry.course.title || entry.course.courseTitle || 'Untitled Course',
        thumbnail: entry.course.thumbnailUrl || entry.course.thumbnail || entry.course.image || '/images/vedic_thumbnail.png',
        description: entry.course.description || entry.course.shortDescription || entry.courseTitle || 'Your enrolled course',
        purchaseDate: entry.purchaseDate || entry.course.purchaseDate || entry.purchase_date,
        validTill: entry.validTill || entry.course.validTill || entry.course.valid_until || entry.validUntil,
        courseType: entry.course.courseType || entry.courseType || 'Recorded',
        progress: entry.course.progress ?? entry.progress ?? 0
      };
    }

    return {
      id: entry.courseId || entry._id || entry.id,
      title: entry.courseTitle || entry.title || 'Untitled Course',
      thumbnail: entry.thumbnail || entry.courseThumbnail || '/images/vedic_thumbnail.png',
      description: entry.description || entry.summary || 'Your enrolled course',
      purchaseDate: entry.purchaseDate,
      validTill: entry.validTill || entry.valid_until || entry.validity,
      courseType: entry.courseType || 'Recorded',
      progress: entry.progress ?? 0
    };
  };

  const enrolledCourses = useMemo(() => courses.map(normalizeCourse), [courses]);

  const formatDate = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
  };

  const computeDaysRemaining = (validTill) => {
    if (!validTill) return 'N/A';
    const end = new Date(validTill);
    const diff = Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `${diff} day${diff === 1 ? '' : 's'}` : 'Expired';
  };

  const fetchSection = async (path) => {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to load');
    if (data.success === false) throw new Error(data.message || 'Failed to load');
    return data;
  };

  const loadCourseValidity = async (courseId) => {
    try {
      const response = await fetch(`${API_BASE}/api/student/course/${courseId}/validity`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok || data.success === false) return;
      const validity = data.validity || data.data || data;
      setCourseValidity((prev) => ({ ...prev, [courseId]: validity }));
    } catch (err) {
      // ignore validity failure; use available validTill data
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const loadDashboardData = async () => {
      try {
<<<<<<< Updated upstream
        const [profileData, courseData, bannerData, merchData, launchesData, offersData] = await Promise.all([
          fetchSection('/api/student/profile'),
          fetchSection('/api/student/courses'),
          fetchSection('/api/student/banners'),
          fetchSection('/api/student/merchandise'),
          fetchSection('/api/student/new-courses'),
          fetchSection('/api/student/offers')
        ]);

        const profilePayload = profileData.profile || profileData.student || profileData.user || profileData;
        setProfile(profilePayload);
        setProfileForm({ name: profilePayload.name || '', email: profilePayload.email || '', mobile: profilePayload.mobile || '' });

        const loadedCourses = courseData.enrollments || courseData.courses || courseData.data || [];
        setCourses(loadedCourses);

        setBanners(bannerData.banners || bannerData.data || []);
        setMerchandise(merchData.products || merchData.merchandise || merchData.data || []);
        setNewCourses(launchesData.courses || launchesData.newCourses || launchesData.data || []);
        setOffers(offersData.offers || offersData.data || []);

        const courseIds = (loadedCourses || []).map((course) => {
          const normalized = normalizeCourse(course);
          return normalized?.id;
        }).filter(Boolean);

        await Promise.all(courseIds.map((courseId) => loadCourseValidity(courseId)));
      } catch (error) {
        const errorMessage = error.message || 'Unable to load student dashboard';
        toast.error(errorMessage);
        if (errorMessage.toLowerCase().includes('session') || errorMessage.toLowerCase().includes('token')) {
=======
        const res = await fetch(`${API_BASE}/api/student/courses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.success) {
          setEnrollments(data.courses || data.enrollments || []);
        } else {
          toast.error(data.message || 'Session expired. Please log in again.');
>>>>>>> Stashed changes
          localStorage.removeItem('studentToken');
          localStorage.removeItem('studentName');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate, token]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/student/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      // ignore logout failure and clear client state anyway
    }
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentName');
    navigate('/login');
  };

  const handleProfileChange = (field) => (event) => {
    setProfileForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setSavingProfile(true);

    try {
      const response = await fetch(`${API_BASE}/api/student/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (!response.ok || data.success === false) throw new Error(data.message || 'Unable to update profile');
      const updatedProfile = data.profile || data.student || data.user || data;
      setProfile(updatedProfile);
      setProfileForm({ name: updatedProfile.name || '', email: updatedProfile.email || '', mobile: updatedProfile.mobile || '' });
      setProfileEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Profile update failed');
    } finally {
      setSavingProfile(false);
    }
  };

  const loadMaterials = async (courseId) => {
    if (!courseId) return;
    setLoadingMaterials(true);
    setSelectedCourseForMaterials(courseId);

    try {
      const response = await fetch(`${API_BASE}/api/student/course/${courseId}/materials`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!response.ok || data.success === false) throw new Error(data.message || 'Failed to load course materials');
      setMaterials(data.materials || data.data || []);
    } catch (error) {
      toast.error(error.message || 'Unable to fetch materials');
      setMaterials([]);
    } finally {
      setLoadingMaterials(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5 mt-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div style={{ background: '#FDF6EE', minHeight: '100vh', padding: '100px 0 60px' }}>
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-5">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2A0F02', fontWeight: 800, marginBottom: '0.35rem' }}>
              Welcome back, {studentName}
            </h2>
            <p className="text-muted mb-1">Your student dashboard brings courses, materials, offers and promotions together.</p>
            <small className="text-muted">Manage every learning asset from one place.</small>
          </div>

          <button onClick={handleLogout} className="btn btn-outline-danger" style={{ borderRadius: '50px', padding: '10px 30px' }}>
            Logout <i className="fas fa-sign-out-alt ms-2"></i>
          </button>
        </div>

        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="p-4 rounded-4" style={{ background: '#FFF', border: '1px solid rgba(200,131,42,0.12)', boxShadow: '0 16px 32px rgba(0,0,0,0.04)' }}>
              <h5 style={{ color: '#2A0F02', fontWeight: 700 }}>Profile</h5>
              <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>Student identity and contact details.</p>
              <div className="mb-3">
                <strong>Name:</strong> {profile?.name || '—'}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {profile?.email || '—'}
              </div>
              <div className="mb-3">
                <strong>Mobile:</strong> {profile?.mobile || '—'}
              </div>
              <div className="mb-3">
                <strong>Status:</strong> <span className="text-success">Active</span>
              </div>

              {profileEditMode ? (
                <form onSubmit={saveProfile} className="mt-4">
                  <div className="mb-3">
                    <label className="form-label small text-dark">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.name}
                      onChange={handleProfileChange('name')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-dark">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={profileForm.email}
                      onChange={handleProfileChange('email')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-dark">Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.mobile}
                      onChange={handleProfileChange('mobile')}
                      required
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary btn-sm" disabled={savingProfile} style={{ borderRadius: '50px' }}>
                      {savingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" style={{ borderRadius: '50px' }} onClick={() => setProfileEditMode(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button className="btn btn-sm btn-outline-primary mt-4" style={{ borderRadius: '50px' }} onClick={() => setProfileEditMode(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-8">
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="p-4 rounded-4" style={{ background: '#FFF', border: '1px solid rgba(200,131,42,0.12)' }}>
                  <h6 style={{ marginBottom: '0.75rem', color: '#8B4A1E' }}>My Courses</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h3 style={{ margin: 0, fontWeight: 700 }}>{enrolledCourses.length}</h3>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Purchased courses</p>
                    </div>
                    <i className="fas fa-book-reader fa-2x text-warning"></i>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-4 rounded-4" style={{ background: '#FFF', border: '1px solid rgba(200,131,42,0.12)' }}>
                  <h6 style={{ marginBottom: '0.75rem', color: '#8B4A1E' }}>Current Offers</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h3 style={{ margin: 0, fontWeight: 700 }}>{offers.length}</h3>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Active promotions</p>
                    </div>
                    <i className="fas fa-gift fa-2x text-danger"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 style={{ color: '#8B4A1E', fontWeight: 700 }}>My Courses</h4>
              <p className="text-muted mb-0">Track your purchased courses, progress, and access expiry.</p>
            </div>
            <button className="btn btn-sm btn-outline-primary" disabled>
              Student Dashboard
            </button>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 border border-dashed" style={{ borderColor: 'rgba(200,131,42,0.3)' }}>
              <i className="fas fa-graduation-cap mb-3" style={{ fontSize: '3rem', color: '#C8832A' }}></i>
              <h5>No enrolled courses found</h5>
              <p className="text-muted">Purchase a recorded course to start learning immediately.</p>
              <Link to="/courses" className="btn btn-primary mt-2" style={{ borderRadius: '50px' }}>
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="col-lg-4 col-md-6">
                  <div style={{ background: '#FFF', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(200,131,42,0.12)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <div style={{ minHeight: '180px', overflow: 'hidden' }}>
                      <img src={course.thumbnail || '/images/vedic_thumbnail.png'} alt={course.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    </div>
                    <div className="p-4">
                      <h5 style={{ fontFamily: "'Playfair Display', serif", color: '#2A0F02', fontWeight: 700 }}>{course.title}</h5>
                      <p className="text-muted small mb-3" style={{ minHeight: '3rem' }}>{course.description}</p>
                      <div className="d-flex flex-column gap-2 mb-3">
                        <span><strong>Type:</strong> {course.courseType}</span>
                        <span><strong>Purchased:</strong> {formatDate(course.purchaseDate)}</span>
                        <span><strong>Valid Till:</strong> {formatDate(course.validTill)}</span>
                        <span><strong>Remaining:</strong> {courseValidity[course.id]?.daysRemaining ?? computeDaysRemaining(course.validTill)}</span>
                      </div>
                      <div className="progress mb-3" style={{ height: '8px', borderRadius: '10px', overflow: 'hidden' }}>
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${Math.min(Math.max(course.progress, 0), 100)}%` }} aria-valuenow={course.progress} aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="small text-muted">Progress: {course.progress}%</span>
                        <Link to={`/student/course/${course.id}`} className="btn btn-sm btn-dark" style={{ borderRadius: '50px' }}>
                          Continue
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 style={{ color: '#8B4A1E', fontWeight: 700 }}>Course Materials</h4>
              <p className="text-muted mb-0">Download course guides, PDFs and assignment resources.</p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="bg-white rounded-4 p-4" style={{ border: '1px solid rgba(200,131,42,0.12)' }}>
                <h6 style={{ fontWeight: 700, color: '#2A0F02' }}>Select Course</h6>
                <p className="text-muted small">Choose a purchased course to fetch materials.</p>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  {enrolledCourses.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => loadMaterials(course.id)}
                      className={`btn btn-outline-secondary btn-sm${selectedCourseForMaterials === course.id ? ' active' : ''}`}
                      style={{ borderRadius: '50px', minWidth: '120px', textAlign: 'center' }}
                    >
                      {course.title.length > 18 ? `${course.title.slice(0, 18)}...` : course.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white rounded-4 p-4" style={{ border: '1px solid rgba(200,131,42,0.12)', minHeight: '250px' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 style={{ fontWeight: 700, color: '#2A0F02', margin: 0 }}>Materials</h6>
                  {loadingMaterials && <span className="text-muted small">Loading...</span>}
                </div>
                {materials.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <p className="mb-2">Select a course to see its materials.</p>
                    <small>Materials are loaded from the backend API.</small>
                  </div>
                ) : (
                  <ul className="list-unstyled mb-0">
                    {materials.map((item) => (
                      <li key={item.materialId || item.id || item.title} className="mb-3 p-3 rounded-4 border" style={{ borderColor: 'rgba(200,131,42,0.12)' }}>
                        <div className="d-flex justify-content-between align-items-start gap-3">
                          <div>
                            <strong>{item.title || 'Course Material'}</strong>
                            <div className="text-muted small">Type: {item.fileType || 'PDF'}</div>
                          </div>
                          {item.fileUrl ? (
                            <a href={item.fileUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary" style={{ borderRadius: '50px' }}>
                              Download
                            </a>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 style={{ color: '#8B4A1E', fontWeight: 700 }}>Promotions & New Launches</h4>
              <p className="text-muted mb-0">Banners, merchandise and new course launches curated for you.</p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="bg-white rounded-4 p-4 h-100" style={{ border: '1px solid rgba(200,131,42,0.12)' }}>
                <h6 style={{ fontWeight: 700, color: '#2A0F02' }}>Promotional Banners</h6>
                <p className="text-muted small">Click a banner to explore the offer.</p>
                {banners.length === 0 ? (
                  <div className="text-center py-5 text-muted">No banners available yet.</div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {banners.map((banner) => (
                      <a key={banner.bannerId || banner.id || banner.title} href={banner.redirectLink || banner.link || '#'} target="_blank" rel="noreferrer" className="d-flex align-items-center gap-3 p-3 rounded-4" style={{ border: '1px solid rgba(200,131,42,0.1)', textDecoration: 'none', color: 'inherit' }}>
                        <img src={banner.image || '/images/vedic_thumbnail.png'} alt={banner.title} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '18px' }} />
                        <div>
                          <strong>{banner.title || 'Special Offer'}</strong>
                          <div className="text-muted small">Tap to view details</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-4 p-4 h-100" style={{ border: '1px solid rgba(200,131,42,0.12)' }}>
                <h6 style={{ fontWeight: 700, color: '#2A0F02' }}>Merchandise Promotions</h6>
                <p className="text-muted small">Discover curated astrology merchandise available on the shop.</p>
                {merchandise.length === 0 ? (
                  <div className="text-center py-5 text-muted">No merchandise promotions found.</div>
                ) : (
                  <div className="row g-3">
                    {merchandise.slice(0, 4).map((item) => (
                      <div key={item.productId || item.id || item.title} className="col-12">
                        <div className="d-flex align-items-center gap-3 p-3 rounded-4" style={{ border: '1px solid rgba(200,131,42,0.1)' }}>
                          <img src={item.image || '/images/vedic_thumbnail.png'} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '16px' }} />
                          <div className="flex-grow-1">
                            <strong>{item.title || 'Astrology Product'}</strong>
                            <div className="text-muted small">Price: {item.price || '₹---'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-4 p-4 h-100" style={{ border: '1px solid rgba(200,131,42,0.12)' }}>
                <h6 style={{ fontWeight: 700, color: '#2A0F02' }}>New Course Launches</h6>
                <p className="text-muted small">Keep an eye on the latest courses coming soon.</p>
                {newCourses.length === 0 ? (
                  <div className="text-center py-5 text-muted">No new launches available.</div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {newCourses.slice(0, 4).map((item) => (
                      <div key={item.courseId || item.id || item.title} className="p-3 rounded-4" style={{ border: '1px solid rgba(200,131,42,0.1)' }}>
                        <strong>{item.title || 'Upcoming Course'}</strong>
                        <div className="text-muted small">Launch: {formatDate(item.launchDate)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 style={{ color: '#8B4A1E', fontWeight: 700 }}>Offers & Discounts</h4>
              <p className="text-muted mb-0">Available coupons and offers for your next purchase.</p>
            </div>
          </div>

          {offers.length === 0 ? (
            <div className="bg-white rounded-4 p-5 text-center" style={{ border: '1px solid rgba(200,131,42,0.12)' }}>
              <p className="text-muted mb-0">There are no special offers at the moment.</p>
            </div>
          ) : (
            <div className="row g-4">
              {offers.map((offer) => (
                <div key={offer.offerId || offer.id || offer.title} className="col-lg-4 col-md-6">
                  <div className="p-4 rounded-4 h-100" style={{ background: '#FFF', border: '1px solid rgba(200,131,42,0.12)' }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 style={{ margin: 0, color: '#2A0F02' }}>{offer.title || 'Special Offer'}</h5>
                      <span className="badge bg-warning text-dark" style={{ fontSize: '0.75rem' }}>{offer.discount || 'Save'}</span>
                    </div>
                    <p className="text-muted small">Valid till: {formatDate(offer.validTill)}</p>
                    <p className="text-muted mb-0">Use this offer on your next course or consultation purchase.</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default StudentDashboard;
