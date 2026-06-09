import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BadgePercent,
  BookOpen,
  Download,
  FileArchive,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Package,
  PenLine,
  Rocket,
  Save,
  UserRound,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';
import { getContactValidationError, normalizeIndianMobile } from '../utils/validation';

function StudentDashboardNew() {
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

  const enrolledCourses = useMemo(() => courses.map(normalizeCourse).filter(Boolean), [courses]);

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
      // Validity data is optional; card dates still render without it.
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const loadDashboardData = async () => {
      try {
        const [profileData, courseData, bannerData, merchData, launchesData, offersData] = await Promise.all([
          fetchSection('/api/student/profile'),
          fetchSection('/api/student/courses'),
          fetchSection('/api/student/banners'),
          fetchSection('/api/student/merchandise'),
          fetchSection('/api/student/new-courses'),
          fetchSection('/api/student/offers')
        ]);

        const profilePayload = profileData.profile || profileData.student || profileData.user || profileData;
        const loadedCourses = courseData.enrollments || courseData.courses || courseData.data || [];

        setProfile(profilePayload);
        setProfileForm({ name: profilePayload.name || '', email: profilePayload.email || '', mobile: profilePayload.mobile || '' });
        setCourses(loadedCourses);
        setBanners(bannerData.banners || bannerData.data || []);
        setMerchandise(merchData.products || merchData.merchandise || merchData.data || []);
        setNewCourses(launchesData.courses || launchesData.newCourses || launchesData.data || []);
        setOffers(offersData.offers || offersData.data || []);

        const courseIds = loadedCourses.map((course) => normalizeCourse(course)?.id).filter(Boolean);
        await Promise.all(courseIds.map((courseId) => loadCourseValidity(courseId)));
      } catch (error) {
        const errorMessage = error.message || 'Unable to load student dashboard';
        toast.error(errorMessage);
        if (errorMessage.toLowerCase().includes('session') || errorMessage.toLowerCase().includes('token')) {
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
      // Clear local session regardless of server response.
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
    const validationError = getContactValidationError(profileForm);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setSavingProfile(true);
    const sanitizedProfile = {
      ...profileForm,
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      mobile: normalizeIndianMobile(profileForm.mobile)
    };

    try {
      const response = await fetch(`${API_BASE}/api/student/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitizedProfile)
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

  const stats = [
    { label: 'My Courses', value: enrolledCourses.length, icon: BookOpen, tone: 'student-stat-icon student-stat-icon--gold' },
    { label: 'Materials', value: materials.length, icon: FolderOpen, tone: 'student-stat-icon student-stat-icon--sage' },
    { label: 'Offers', value: offers.length, icon: BadgePercent, tone: 'student-stat-icon student-stat-icon--copper' },
    { label: 'Launches', value: newCourses.length, icon: Rocket, tone: 'student-stat-icon student-stat-icon--violet' }
  ];

  const completedCourses = enrolledCourses.filter((course) => Number(course.progress) >= 100).length;
  const activeCourses = enrolledCourses.filter((course) => computeDaysRemaining(course.validTill) !== 'Expired').length;
  const averageProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((total, course) => total + (Number(course.progress) || 0), 0) / enrolledCourses.length)
    : 0;

  const materialTabs = enrolledCourses.slice(0, 4);
  const primaryButton = 'student-btn student-btn-primary';
  const outlineButton = 'student-btn student-btn-outline';
  const panel = 'student-panel rounded-lg';

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6efe6] px-4 font-[var(--font-body)]">
        <div className="rounded-lg border border-[#e5d8c7] bg-white px-7 py-6 text-center shadow-lg">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#d8c9b7] border-t-[#006d67]" />
          <p className="mt-3 text-sm font-bold text-[#5c3d26]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard-preview student-portal min-h-screen font-[var(--font-body)]">
      <main className="student-main mx-auto grid max-w-[1600px] grid-cols-1 gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[minmax(260px,20%)_minmax(0,1fr)] xl:gap-6 2xl:gap-7">
        <aside className="student-left-rail space-y-4">
          <section className="student-rail-card rounded-lg">
            <div className="student-portal-user flex items-center gap-3">
              <div className="student-avatar flex h-11 w-11 items-center justify-center rounded-full">
                <UserRound size={21} />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="student-portal-brand text-base font-extrabold tracking-normal">Student Portal</div>
                <div className="student-header-label mt-2 text-[11px] font-semibold">Signed in as</div>
                <div className="student-header-value truncate text-sm font-bold">{studentName}</div>
              </div>
            </div>
            <div className="student-rail-divider" />
            <div className="flex items-center justify-between gap-3">
              <div className="leading-tight">
                <div className="student-header-label text-[11px] font-semibold">Learning Portal</div>
                <div className="student-header-title text-xl font-black tracking-normal">Dashboard</div>
              </div>
              <button onClick={handleLogout} className="student-btn student-btn-light student-logout-btn">
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </div>
          </section>

          <section className={`${panel} p-4`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-extrabold tracking-normal">My Account Status</div>
              <span className="student-status-pill inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold">Active</span>
            </div>
            <dl className="grid grid-cols-[82px_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm">
              <dt className="font-bold text-[#6f4b32]">Name</dt>
              <dd className="font-semibold">{profile?.name || '-'}</dd>
              <dt className="font-bold text-[#6f4b32]">Email</dt>
              <dd className="break-all font-semibold">{profile?.email || '-'}</dd>
              <dt className="font-bold text-[#6f4b32]">Mobile</dt>
              <dd className="font-semibold">{profile?.mobile || '-'}</dd>
            </dl>
            <button onClick={() => setProfileEditMode((value) => !value)} className={`${outlineButton} mt-4 w-full`}>
              <PenLine size={16} />
              Edit Profile
            </button>
          </section>

          {profileEditMode && (
            <form onSubmit={saveProfile} className={`${panel} student-profile-editor space-y-4 p-4`}>
              <div>
                <div className="text-lg font-extrabold tracking-normal">Edit Profile</div>
                <p className="mt-1 text-sm font-semibold text-[#6f4b32]">Update your account details.</p>
              </div>
              {['name', 'email', 'mobile'].map((field) => (
                <label key={field} className="block">
                  <span className="student-field-label text-xs font-bold uppercase text-[#8b4a1e]">{field}</span>
                  <input
                    type={field === 'email' ? 'email' : field === 'mobile' ? 'tel' : 'text'}
                    value={profileForm[field]}
                    onChange={handleProfileChange(field)}
                    className="student-input mt-1 w-full rounded-md px-3 py-2 font-semibold outline-none transition"
                    placeholder={field === 'mobile' ? '10-digit mobile number' : field.charAt(0).toUpperCase() + field.slice(1)}
                    inputMode={field === 'mobile' ? 'numeric' : undefined}
                    maxLength={field === 'mobile' ? 10 : undefined}
                    required
                  />
                  {field === 'mobile' && (
                    <span className="mt-1 block text-xs font-semibold text-[#7b6254]">
                      Used for course updates and consultation contact.
                    </span>
                  )}
                </label>
              ))}
              <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
                <button type="submit" disabled={savingProfile} className={primaryButton}>
                  <Save size={16} />
                  {savingProfile ? 'Saving' : 'Save'}
                </button>
                <button type="button" onClick={() => setProfileEditMode(false)} className={outlineButton}>
                  <X size={16} />
              Cancel
                </button>
              </div>
            </form>
          )}

          <section>
            <div className="mb-3 flex items-center gap-2">
              <LayoutDashboard size={18} className="text-[#8b4a1e]" />
              <div className="text-xl font-extrabold tracking-normal">Overview</div>
            </div>
            <div className="student-overview-list grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`${panel} student-overview-item flex items-center gap-3 p-3`}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.tone}`}>
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-[#6f4b32]">{stat.label}</div>
                      <div className="mt-0.5 text-2xl font-black leading-none tracking-normal">{stat.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>

        <div className="space-y-5">
          <section className={`${panel} student-progress-panel p-4`}>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-2xl font-black tracking-normal">Learning Progress</div>
                <p className="mt-1 text-base font-semibold text-[#6f4b32]">Your current course activity and access summary.</p>
              </div>
              <span className="student-mini-pill inline-flex w-fit rounded-md px-3 py-1.5 text-xs font-bold">
                {activeCourses} active / {completedCourses} completed
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)]">
              <div className="student-inner-card rounded-lg p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-extrabold">Average Progress</div>
                    <p className="mt-1 text-sm font-semibold text-[#6f4b32]">
                      Based on your enrolled courses.
                    </p>
                  </div>
                  <div className="text-3xl font-black text-[#8b4a1e]">{averageProgress}%</div>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#ead8c6]">
                  <div className="h-full rounded-full bg-[#8b4a1e]" style={{ width: `${Math.min(Math.max(averageProgress, 0), 100)}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="student-inner-card rounded-lg p-4">
                  <div className="text-sm font-bold text-[#6f4b32]">Enrolled</div>
                  <div className="mt-2 text-2xl font-black">{enrolledCourses.length}</div>
                </div>
                <div className="student-inner-card rounded-lg p-4">
                  <div className="text-sm font-bold text-[#6f4b32]">Materials</div>
                  <div className="mt-2 text-2xl font-black">{materials.length}</div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.3fr)_minmax(420px,0.7fr)]">
            <div>
              <div className="mb-3 text-lg font-extrabold tracking-normal">My Courses</div>
              <div className={`${panel} p-4`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-base font-extrabold">Purchased Courses</div>
                  <span className="rounded-full bg-[#eef8f6] px-2.5 py-1 text-xs font-bold text-[#00746f]">{enrolledCourses.length} total</span>
                </div>
                {enrolledCourses.length === 0 ? (
                    <div className="student-empty rounded-lg p-5 text-center">
                      <FolderOpen className="mx-auto text-[#8b4a1e]" size={44} />
                      <div className="mt-3 font-extrabold">No enrolled courses found</div>
                      <p className="mt-1 text-sm text-[#5c3d26]">Purchase a recorded course to start learning.</p>
                      <Link to="/courses" className={`${outlineButton} mt-4`}>
                        Explore Courses
                      </Link>
                    </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {enrolledCourses.map((course) => (
                      <article key={course.id} className="rounded-lg border border-[#e5d8c7] bg-[#fffaf4] p-3">
                        <div className="grid gap-3 sm:grid-cols-[138px_minmax(0,1fr)]">
                          <img src={course.thumbnail} alt={course.title} className="h-28 w-full rounded-md object-cover" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#8b4a1e]">{course.courseType}</p>
                            <div className="line-clamp-1 text-base font-extrabold">{course.title}</div>
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#5c3d26]">{course.description}</p>
                          </div>
                        </div>
                        <div className="mt-3 grid gap-2 text-xs font-semibold sm:grid-cols-2">
                          <span>Purchase Date: {formatDate(course.purchaseDate)}</span>
                          <span>Valid till: {formatDate(course.validTill)}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="font-bold text-[#b25518]">{courseValidity[course.id]?.daysRemaining ?? computeDaysRemaining(course.validTill)}</span>
                          <span className="font-bold">{course.progress}%</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e5d8c7]">
                          <div className="h-full rounded-full bg-[#006d67]" style={{ width: `${Math.min(Math.max(course.progress, 0), 100)}%` }} />
                        </div>
                        <Link to={`/student/course/${course.id}`} className={`${primaryButton} mt-3 w-full`}>
                          Continue Learning
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <section className={`${panel} p-4`}>
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-lg font-extrabold tracking-normal">My Materials</div>
                <div className="flex flex-wrap gap-2">
                  {materialTabs.length === 0 ? (
                    <span className="student-mini-pill rounded-md px-3 py-1.5 text-xs font-bold">No courses</span>
                  ) : (
                    materialTabs.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => loadMaterials(course.id)}
                        className={`student-course-tab rounded-md border px-3 py-1.5 text-xs font-bold transition ${
                          selectedCourseForMaterials === course.id
                            ? 'is-active'
                            : ''
                        }`}
                      >
                        {course.title.length > 10 ? `${course.title.slice(0, 10)}...` : course.title}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {materials.length > 0 ? (
                  materials.map((item) => {
                    const isZip = (item.fileType || '').toLowerCase().includes('zip');
                    const FileIcon = isZip ? FileArchive : FileText;
                    return (
                      <div key={item.materialId || item.id || item.title} className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-[#e5d8c7] bg-[#fffaf4] p-3">
                        <div className="min-w-0">
                          <p className="line-clamp-1 text-sm font-extrabold">{item.title || 'Course Material'}</p>
                          <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#8b4a1e]">
                            <FileIcon size={14} />
                            {item.fileType || 'PDF'}
                          </p>
                        </div>
                        {item.fileUrl && (
                          <a href={item.fileUrl} target="_blank" rel="noreferrer" className={primaryButton}>
                            <Download size={15} />
                            Download
                          </a>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="student-empty flex min-h-52 flex-col items-center justify-center rounded-lg text-center">
                    {loadingMaterials ? (
                      <>
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d8c9b7] border-t-[#006d67]" />
                        <p className="mt-3 text-sm font-bold">Loading...</p>
                      </>
                    ) : (
                      <>
                        <FileText className="text-[#b9a58d]" size={42} />
                        <p className="mt-3 text-sm font-bold">Select a course to see materials.</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </section>
          </section>

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)]">
            <div>
              <div className="mb-3 text-lg font-extrabold tracking-normal">Promotions</div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className={`${panel} p-4`}>
                  <div className="mb-3 text-base font-extrabold">Promotional Banners</div>
                  {banners.length === 0 ? (
                    <p className="student-empty rounded-lg p-5 text-center text-sm font-semibold">No banners available yet.</p>
                  ) : (
                    banners.slice(0, 2).map((banner) => (
                      <a key={banner.bannerId || banner.id || banner.title} href={banner.redirectLink || banner.link || '#'} target="_blank" rel="noreferrer" className="student-inner-card block rounded-lg p-3 text-[#2a0f02]">
                        <img src={banner.image || '/images/vedic_thumbnail.png'} alt={banner.title} className="h-32 w-full rounded-md object-cover" />
                        <p className="mt-2 font-extrabold">{banner.title || 'Promotion'}</p>
                        {(banner.description || banner.subtitle) && <p className="mt-1 line-clamp-2 text-sm text-[#5c3d26]">{banner.description || banner.subtitle}</p>}
                      </a>
                    ))
                  )}
                </div>

                <div className={`${panel} p-4`}>
                  <div className="mb-3 text-base font-extrabold">Merchandise & Launches</div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
                    {[...merchandise.slice(0, 2), ...newCourses.slice(0, 2)].map((item, index) => (
                      <div key={item.productId || item.courseId || item.id || item.title || index} className="student-inner-card flex gap-3 rounded-lg p-3">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="h-14 w-14 rounded-md object-cover" />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#e5d8c7] text-[#8b4a1e]">
                            {item.price ? <Package size={22} /> : <Rocket size={22} />}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="line-clamp-1 text-sm font-extrabold">{item.title || item.name || 'Untitled item'}</p>
                          {item.price ? (
                            <p className="text-xs font-semibold text-[#5c3d26]">Price: {item.price}</p>
                          ) : (
                            <p className="text-xs font-semibold text-[#5c3d26]">Launch: {formatDate(item.launchDate)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {merchandise.length === 0 && newCourses.length === 0 && (
                      <p className="student-empty rounded-lg p-5 text-center text-sm font-semibold sm:col-span-2 lg:col-span-1 2xl:col-span-2">No promotions found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <section>
              <div className="mb-3 text-lg font-extrabold tracking-normal">Offers & Discounts</div>
              <div className={`${panel} p-4`}>
                <div className="mb-3 text-base font-extrabold">Available Offers</div>
                {offers.length === 0 ? (
                  <p className="student-empty rounded-lg p-5 text-center text-sm font-semibold">There are no special offers at the moment.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                    {offers.map((offer) => (
                      <article key={offer.offerId || offer.id || offer.title} className="rounded-lg border border-[#e5d8c7] bg-[#fffaf4] p-3">
                        <div className="text-sm font-extrabold">{offer.title || offer.name || 'Offer'}</div>
                        {offer.discount && <p className="mt-1 text-xs font-bold text-[#2a0f02]">{offer.discount}</p>}
                        {(offer.code || offer.couponCode) && <p className="mt-1 text-xs font-bold text-[#8b4a1e]">Code: {offer.code || offer.couponCode}</p>}
                        <p className="mt-2 text-xs text-[#5c3d26]">Valid till: {formatDate(offer.validTill)}</p>
                        {(offer.description || offer.details) && <p className="mt-1 line-clamp-3 text-xs leading-4 text-[#5c3d26]">{offer.description || offer.details}</p>}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </main>
      <style>{`
        .student-portal {
          background:
            radial-gradient(circle at 8% 4%, rgba(200, 131, 42, 0.12), transparent 30%),
            linear-gradient(180deg, #fff8ef 0%, #f4eadc 48%, #efe4d5 100%);
          color: #2a0f02;
          font-size: 16px;
          line-height: 1.55;
        }

        .student-portal,
        .student-portal button,
        .student-portal input,
        .student-portal a,
        .student-portal p,
        .student-portal label,
        .student-portal dt,
        .student-portal dd,
        .student-portal span {
          font-family: var(--font-body) !important;
          letter-spacing: 0 !important;
        }

        .student-portal-brand {
          color: #8b4a1e !important;
        }

        .student-header-title,
        .student-header-value {
          color: #2a0f02 !important;
        }

        .student-header-label {
          color: #7b6254 !important;
          font-size: 0.82rem !important;
          letter-spacing: 0 !important;
        }

        .student-header-value {
          font-size: 0.98rem !important;
          line-height: 1.25 !important;
        }

        .student-header-title {
          font-size: 1.45rem !important;
          line-height: 1.15 !important;
        }

        .student-avatar {
          background: #ffffff !important;
          color: #8b4a1e !important;
          border: 1px solid rgba(139, 74, 30, 0.18);
          box-shadow: 0 8px 18px rgba(73, 39, 15, 0.1);
        }

        .student-header-divider {
          background: rgba(139, 74, 30, 0.18) !important;
        }

        .student-main {
          align-items: start;
        }

        .student-left-rail {
          min-width: 0;
        }

        .student-rail-card {
          background: linear-gradient(180deg, #fffaf4 0%, #f8ead8 100%);
          border: 1px solid rgba(139, 74, 30, 0.16);
          box-shadow: 0 14px 32px rgba(73, 39, 15, 0.08);
          padding: 18px;
        }

        .student-rail-divider {
          height: 1px;
          margin: 16px 0;
          background: rgba(139, 74, 30, 0.16);
        }

        .student-overview-item {
          min-height: 72px;
        }

        .student-panel {
          background: #ffffff !important;
          border: 1px solid rgba(139, 74, 30, 0.16) !important;
          box-shadow: 0 14px 32px rgba(73, 39, 15, 0.08) !important;
        }

        .student-panel,
        .student-rail-card,
        .student-inner-card,
        .student-empty {
          font-size: 1rem;
        }

        .student-portal dl {
          font-size: 0.98rem !important;
        }

        .student-portal dt,
        .student-portal dd {
          line-height: 1.45 !important;
        }

        .student-inner-card,
        .student-empty {
          background: #fffaf4 !important;
          border: 1px solid rgba(139, 74, 30, 0.18) !important;
        }

        .student-empty {
          color: #5b3219 !important;
        }

        .student-field-label {
          display: inline-flex;
          margin-bottom: 0.25rem;
          font-size: 0.78rem !important;
          letter-spacing: 0.08em !important;
        }

        .student-input {
          min-height: 42px;
          background: #fffaf4 !important;
          border: 1px solid rgba(139, 74, 30, 0.22) !important;
          color: #2a0f02 !important;
          font-size: 0.98rem !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .student-input:focus {
          border-color: #8b4a1e !important;
          box-shadow: 0 0 0 4px rgba(200, 131, 42, 0.14) !important;
        }

        .student-profile-editor {
          border-color: rgba(139, 74, 30, 0.24) !important;
        }

        .student-status-pill {
          background: #f2f7ea !important;
          color: #4f6b1f !important;
          border: 1px solid rgba(79, 107, 31, 0.14);
        }

        .student-mini-pill {
          background: #fff1df !important;
          color: #8b4a1e !important;
        }

        .student-stat-icon {
          border: 1px solid transparent;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
        }

        .student-stat-icon--gold {
          background: #fff0d6 !important;
          color: #8b4a1e !important;
          border-color: #f0d2a7;
        }

        .student-stat-icon--sage {
          background: #f0f4df !important;
          color: #5f6f23 !important;
          border-color: #d9dfb7;
        }

        .student-stat-icon--copper {
          background: #fde8d8 !important;
          color: #b25518 !important;
          border-color: #f4c3a1;
        }

        .student-stat-icon--violet {
          background: #f4e8dd !important;
          color: #7b3f2a !important;
          border-color: #e2c7b4;
        }

        .student-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          min-height: 42px !important;
          padding: 0.68rem 1.05rem !important;
          border-radius: 8px !important;
          font-size: 0.95rem !important;
          font-weight: 800 !important;
          line-height: 1.2 !important;
          text-decoration: none !important;
          transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease !important;
        }

        .student-btn:hover {
          transform: translateY(-1px);
        }

        .student-btn-primary {
          background: #8b4a1e !important;
          border: 1px solid #8b4a1e !important;
          color: #ffffff !important;
          box-shadow: 0 10px 20px rgba(139, 74, 30, 0.2) !important;
        }

        .student-btn-primary:hover {
          background: #6b3514 !important;
          border-color: #6b3514 !important;
          color: #ffffff !important;
        }

        .student-btn-outline {
          background: #ffffff !important;
          border: 1px solid rgba(139, 74, 30, 0.28) !important;
          color: #6b3514 !important;
        }

        .student-btn-outline:hover {
          background: #fff1df !important;
          border-color: #c8832a !important;
          color: #2a0f02 !important;
        }

        .student-btn-light {
          background: #8b4a1e !important;
          border: 1px solid #8b4a1e !important;
          color: #ffffff !important;
          box-shadow: 0 10px 22px rgba(139, 74, 30, 0.18) !important;
        }

        .student-btn-light:hover {
          background: #6b3514 !important;
          border-color: #6b3514 !important;
          color: #ffffff !important;
        }

        .student-logout-btn {
          min-height: 40px !important;
          padding-inline: 0.9rem !important;
          white-space: nowrap;
        }

        .student-portal .text-xs {
          font-size: 0.82rem !important;
        }

        .student-portal .text-sm {
          font-size: 0.96rem !important;
        }

        .student-portal .text-base {
          font-size: 1.06rem !important;
        }

        .student-portal .text-lg {
          font-size: 1.22rem !important;
        }

        .student-portal .text-xl {
          font-size: 1.45rem !important;
        }

        .student-portal .text-2xl {
          font-size: 1.75rem !important;
        }

        .student-portal .text-3xl {
          font-size: 2.15rem !important;
        }

        .student-course-tab {
          background: #ffffff !important;
          border-color: rgba(139, 74, 30, 0.22) !important;
          color: #6b3514 !important;
        }

        .student-course-tab:hover,
        .student-course-tab.is-active {
          background: #8b4a1e !important;
          border-color: #8b4a1e !important;
          color: #ffffff !important;
        }

        .student-portal h1,
        .student-portal h2,
        .student-portal h3,
        .student-portal h4,
        .student-portal h5,
        .student-portal h6,
        .student-portal p {
          color: inherit !important;
        }

        @media (min-width: 1024px) {
          .student-left-rail {
            position: sticky;
            top: 16px;
          }
        }

        @media (min-width: 1200px) {
          .student-logout-btn {
            display: none !important;
          }
        }

        @media (max-width: 1023px) {
          .student-overview-list {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .student-overview-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .student-rail-card {
            padding: 16px;
          }

          .student-header-title {
            font-size: 1.45rem !important;
          }

          .student-panel {
            box-shadow: 0 10px 24px rgba(38, 28, 18, 0.07) !important;
          }
        }

        @media (max-width: 480px) {
          .student-portal-user {
            align-items: flex-start;
          }

          .student-overview-list {
            grid-template-columns: 1fr;
          }

          .student-logout-btn {
            width: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default StudentDashboardNew;
