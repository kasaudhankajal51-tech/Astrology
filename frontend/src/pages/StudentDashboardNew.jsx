import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BadgePercent,
  BookOpen,
  ChevronRight,
  Download,
  FileArchive,
  FileText,
  FolderOpen,
  GraduationCap,
  Loader2,
  LogOut,
  Package,
  PenLine,
  Plus,
  Rocket,
  Save,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';
import { getContactValidationError, normalizeIndianMobile } from '../utils/validation';

function SectionTitle({ icon: Icon, title, badge }) {
  return (
    <div className="sd-section-title">
      <Icon size={18} className="text-[#8b4a1e]" />
      <h2 className="text-base font-extrabold sm:text-lg">{title}</h2>
      {badge}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="student-dashboard sd-loader">
      <section className="sd-hero">
        <div className="sd-page-pad flex flex-col gap-5 py-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3">
            <div className="sd-skeleton sd-skeleton--dark h-3.5 w-28" />
            <div className="sd-skeleton sd-skeleton--dark h-9 w-full max-w-md" />
            <div className="sd-skeleton sd-skeleton--dark h-4 w-full max-w-xl" />
          </div>
          <div className="sd-skeleton sd-skeleton--dark h-11 w-44 shrink-0 rounded-xl" />
        </div>
        <div className="sd-page-pad mt-4 flex items-center gap-2 pb-1">
          <span className="sd-loader-pulse">
            <span className="sd-loader-dot" />
            <span className="sd-loader-dot" />
            <span className="sd-loader-dot" />
            Preparing your dashboard
          </span>
        </div>
      </section>

      <div className="sd-page-pad py-6">
        <div className="sd-stats-row mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="sd-stat-card sd-card">
              <div className="sd-skeleton h-11 w-11 shrink-0 rounded-xl" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="sd-skeleton h-3 w-20" />
                <div className="sd-skeleton h-7 w-10" />
              </div>
            </div>
          ))}
        </div>

        <div className="sd-body">
          <aside className="sd-aside">
            <div className="sd-card p-5">
              <div className="flex items-center gap-3">
                <div className="sd-skeleton h-12 w-12 shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="sd-skeleton h-3 w-24" />
                  <div className="sd-skeleton h-4 w-32" />
                </div>
              </div>
              <div className="sd-skeleton mt-4 h-10 w-full rounded-xl" />
            </div>
            <div className="sd-card p-5">
              <div className="sd-skeleton mb-4 h-5 w-28" />
              <div className="flex flex-col gap-3">
                <div className="sd-skeleton h-4 w-full" />
                <div className="sd-skeleton h-4 w-full" />
                <div className="sd-skeleton h-4 w-3/4" />
              </div>
            </div>
          </aside>

          <div className="sd-content">
            <div className="sd-card p-6">
              <div className="sd-skeleton mb-5 h-6 w-48" />
              <div className="sd-progress-row">
                <div className="sd-progress-main sd-card-muted p-5">
                  <div className="sd-skeleton h-4 w-36" />
                  <div className="sd-skeleton mt-4 h-3 w-full rounded-full" />
                </div>
                <div className="sd-progress-side">
                  <div className="sd-card-muted p-4">
                    <div className="sd-skeleton h-4 w-16" />
                    <div className="sd-skeleton mt-3 h-8 w-10" />
                  </div>
                  <div className="sd-card-muted p-4">
                    <div className="sd-skeleton h-4 w-16" />
                    <div className="sd-skeleton mt-3 h-8 w-10" />
                  </div>
                </div>
              </div>
            </div>

            <div className="sd-flex-2">
              <div className="sd-card p-5">
                <div className="sd-skeleton mb-4 h-5 w-40" />
                <div className="sd-skeleton h-44 w-full rounded-xl" />
              </div>
              <div className="sd-card p-5">
                <div className="sd-skeleton mb-4 h-5 w-32" />
                <div className="sd-skeleton h-36 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        progress: entry.course.progress ?? entry.progress ?? 0,
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
      progress: entry.progress ?? 0,
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
        'Content-Type': 'application/json',
      },
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
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok || data.success === false) return;
      const validity = data.validity || data.data || data;
      setCourseValidity((prev) => ({ ...prev, [courseId]: validity }));
    } catch {
      // Validity is optional.
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
          fetchSection('/api/student/offers'),
        ]);

        const profilePayload = profileData.profile || profileData.student || profileData.user || profileData;
        const loadedCourses = courseData.enrollments || courseData.courses || courseData.data || [];

        setProfile(profilePayload);
        setProfileForm({
          name: profilePayload.name || '',
          email: profilePayload.email || '',
          mobile: profilePayload.mobile || '',
        });
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
          'Content-Type': 'application/json',
        },
      });
    } catch {
      // Clear local session regardless.
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
      mobile: normalizeIndianMobile(profileForm.mobile),
    };

    try {
      const response = await fetch(`${API_BASE}/api/student/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedProfile),
      });
      const data = await response.json();
      if (!response.ok || data.success === false) throw new Error(data.message || 'Unable to update profile');
      const updatedProfile = data.profile || data.student || data.user || data;
      setProfile(updatedProfile);
      setProfileForm({
        name: updatedProfile.name || '',
        email: updatedProfile.email || '',
        mobile: updatedProfile.mobile || '',
      });
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
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
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
    { label: 'My Courses', value: enrolledCourses.length, icon: BookOpen, tone: 'bg-[#fff0d6] text-[#8b4a1e]' },
    { label: 'Materials', value: materials.length, icon: FolderOpen, tone: 'bg-[#f0f4df] text-[#5f6f23]' },
    { label: 'Offers', value: offers.length, icon: BadgePercent, tone: 'bg-[#fde8d8] text-[#b25518]' },
    { label: 'Launches', value: newCourses.length, icon: Rocket, tone: 'bg-[#f4e8dd] text-[#7b3f2a]' },
  ];

  const completedCourses = enrolledCourses.filter((course) => Number(course.progress) >= 100).length;
  const activeCourses = enrolledCourses.filter((course) => computeDaysRemaining(course.validTill) !== 'Expired').length;
  const averageProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((total, course) => total + (Number(course.progress) || 0), 0) / enrolledCourses.length)
    : 0;

  const materialTabs = enrolledCourses.slice(0, 4);
  const promoItems = [...merchandise.slice(0, 3), ...newCourses.slice(0, 3)];

  if (loading) {
    return <DashboardSkeleton />;
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="student-dashboard min-h-screen w-full pb-10">
      <section className="sd-hero w-full">
        <div className="sd-page-pad flex flex-col gap-4 py-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5c98d]">
              <Sparkles size={14} />
              {greeting}
            </p>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Welcome back, {studentName}</h1>
            <p className="mt-2 max-w-3xl text-sm text-[#f5d9b8] sm:text-base">
              {enrolledCourses.length > 0
                ? `You have ${enrolledCourses.length} enrolled course${enrolledCourses.length > 1 ? 's' : ''}. Pick up where you left off.`
                : 'Explore recorded courses and begin your Vedic astrology journey with DS Institute.'}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link to="/recorded-courses" className="sd-btn sd-btn-ghost">
              <Plus size={16} />
              Explore Courses
            </Link>
            <button type="button" onClick={handleLogout} className="sd-btn sd-btn-ghost lg:hidden">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </section>

      <div className="sd-page-pad py-6 sm:py-8">
        <div className="sd-stats-row mb-6 sm:mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="sd-stat-card sd-card">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.tone}`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#6f4b32]">{stat.label}</p>
                  <p className="mt-0.5 text-2xl font-black leading-none text-[#2a0f02]">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sd-body">
          <aside className="sd-aside">
            <section className="sd-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e5d8c7] bg-[#fffaf4] text-[#8b4a1e]">
                  <UserRound size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#8b4a1e]">Student Portal</p>
                  <p className="truncate text-sm font-bold text-[#2a0f02]">{studentName}</p>
                </div>
              </div>
            </section>

            <section className="sd-card p-5">
              <div className="sd-section-head !mb-3">
                <h2 className="text-base font-extrabold">My Account</h2>
                <span className="sd-pill sd-pill--active">Active</span>
              </div>
              <dl className="flex flex-col gap-2.5 text-sm">
                {[
                  ['Name', profile?.name || '-'],
                  ['Email', profile?.email || '-'],
                  ['Mobile', profile?.mobile || '-'],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                    <dt className="w-16 shrink-0 font-bold text-[#6f4b32]">{label}</dt>
                    <dd className="min-w-0 flex-1 break-words font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-col gap-2">
                <button type="button" onClick={() => setProfileEditMode((open) => !open)} className="sd-btn sd-btn-outline w-full">
                  <PenLine size={16} />
                  Edit Profile
                </button>
                <button type="button" onClick={handleLogout} className="sd-btn sd-btn-primary hidden w-full lg:inline-flex">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </section>

            {profileEditMode && (
              <form onSubmit={saveProfile} className="sd-card flex flex-col gap-4 p-5">
                <div>
                  <h3 className="text-base font-extrabold">Edit Profile</h3>
                  <p className="mt-1 text-sm font-semibold text-[#6f4b32]">Update your account details.</p>
                </div>
                {['name', 'email', 'mobile'].map((field) => (
                  <label key={field} className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#8b4a1e]">{field}</span>
                    <input
                      type={field === 'email' ? 'email' : field === 'mobile' ? 'tel' : 'text'}
                      value={profileForm[field]}
                      onChange={handleProfileChange(field)}
                      className="sd-input"
                      placeholder={field === 'mobile' ? '10-digit mobile number' : field.charAt(0).toUpperCase() + field.slice(1)}
                      inputMode={field === 'mobile' ? 'numeric' : undefined}
                      maxLength={field === 'mobile' ? 10 : undefined}
                      required
                    />
                  </label>
                ))}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button type="submit" disabled={savingProfile} className="sd-btn sd-btn-primary flex-1">
                    {savingProfile ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {savingProfile ? 'Saving…' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setProfileEditMode(false)} className="sd-btn sd-btn-outline flex-1">
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </aside>

          <div className="sd-content">
            <section className="sd-card p-5 sm:p-6">
              <div className="sd-section-head">
                <SectionTitle icon={GraduationCap} title="Learning Progress" />
                <span className="sd-pill sd-pill--count !rounded-lg !px-3 !py-1.5 !text-xs">
                  {activeCourses} active · {completedCourses} completed
                </span>
              </div>
              <div className="sd-progress-row">
                <div className="sd-progress-main sd-card-muted p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-extrabold">Average Progress</p>
                      <p className="mt-1 text-xs font-semibold text-[#6f4b32]">Across all enrolled courses</p>
                    </div>
                    <p className="text-3xl font-black text-[#8b4a1e]">{averageProgress}%</p>
                  </div>
                  <div className="sd-progress-track mt-4">
                    <div className="sd-progress-fill" style={{ width: `${Math.min(Math.max(averageProgress, 0), 100)}%` }} />
                  </div>
                </div>
                <div className="sd-progress-side">
                  <div className="sd-card-muted p-4">
                    <p className="text-xs font-bold text-[#6f4b32]">Enrolled</p>
                    <p className="mt-2 text-2xl font-black">{enrolledCourses.length}</p>
                  </div>
                  <div className="sd-card-muted p-4">
                    <p className="text-xs font-bold text-[#6f4b32]">Materials</p>
                    <p className="mt-2 text-2xl font-black">{materials.length}</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="sd-flex-2">
              <section className="w-full">
                <div className="sd-section-head">
                  <SectionTitle icon={BookOpen} title="My Courses" badge={<span className="sd-pill sd-pill--count">{enrolledCourses.length} total</span>} />
                </div>
                <div className="sd-card p-5">
                  {enrolledCourses.length === 0 ? (
                    <div className="sd-card-muted flex flex-col items-center px-6 py-12 text-center">
                      <FolderOpen className="text-[#8b4a1e]" size={48} />
                      <p className="mt-4 text-lg font-extrabold">No enrolled courses yet</p>
                      <p className="mt-2 max-w-sm text-sm text-[#5c3d26]">Purchase a recorded course to unlock lessons and materials.</p>
                      <Link to="/recorded-courses" className="sd-btn sd-btn-primary mt-6">
                        Browse Courses
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  ) : (
                    <div className={`sd-courses-wrap ${enrolledCourses.length > 1 ? 'sd-courses-wrap--multi' : ''}`}>
                      {enrolledCourses.map((course) => (
                        <article key={course.id} className="sd-card-muted sd-course-card p-4 transition hover:shadow-md">
                          <div className="sd-course-card__top">
                            <img src={course.thumbnail} alt={course.title} className="sd-course-card__thumb" />
                            <div className="sd-course-card__body">
                              <p className="text-[11px] font-bold uppercase tracking-wide text-[#8b4a1e]">{course.courseType}</p>
                              <h3 className="mt-1 text-base font-extrabold leading-snug">{course.title}</h3>
                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#5c3d26]">{course.description}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-[#6f4b32]">
                            <span>Purchased: {formatDate(course.purchaseDate)}</span>
                            <span>Valid till: {formatDate(course.validTill)}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="font-bold text-[#b25518]">
                              {courseValidity[course.id]?.daysRemaining ?? computeDaysRemaining(course.validTill)}
                            </span>
                            <span className="font-bold text-[#8b4a1e]">{course.progress}% complete</span>
                          </div>
                          <div className="sd-progress-track mt-2">
                            <div className="sd-progress-fill" style={{ width: `${Math.min(Math.max(course.progress, 0), 100)}%` }} />
                          </div>
                          <Link to={`/student/course/${course.id}`} className="sd-btn sd-btn-primary mt-4 w-full">
                            Continue Learning
                            <ChevronRight size={16} />
                          </Link>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              <section className="w-full">
                <div className="sd-section-head">
                  <SectionTitle icon={FolderOpen} title="My Materials" />
                </div>
                <div className="sd-card p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {materialTabs.length === 0 ? (
                      <span className="sd-pill sd-pill--count">No courses</span>
                    ) : (
                      materialTabs.map((course) => (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => loadMaterials(course.id)}
                          className={`sd-tab ${selectedCourseForMaterials === course.id ? 'is-active' : ''}`}
                        >
                          {course.title.length > 18 ? `${course.title.slice(0, 18)}…` : course.title}
                        </button>
                      ))
                    )}
                  </div>

                  {materials.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {materials.map((item) => {
                        const isZip = (item.fileType || '').toLowerCase().includes('zip');
                        const FileIcon = isZip ? FileArchive : FileText;
                        return (
                          <div key={item.materialId || item.id || item.title} className="sd-card-muted sd-material-item p-3">
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-1 text-sm font-extrabold">{item.title || 'Course Material'}</p>
                              <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#8b4a1e]">
                                <FileIcon size={14} />
                                {item.fileType || 'PDF'}
                              </p>
                            </div>
                            {item.fileUrl && (
                              <a href={item.fileUrl} target="_blank" rel="noreferrer" className="sd-btn sd-btn-primary !min-h-[36px] !px-3 !text-xs shrink-0">
                                <Download size={14} />
                                Download
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="sd-card-muted flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
                      {loadingMaterials ? (
                        <>
                          <Loader2 size={36} className="animate-spin text-[#8b4a1e]" />
                          <p className="mt-4 text-sm font-bold text-[#6f4b32]">Loading materials…</p>
                        </>
                      ) : (
                        <>
                          <FileText className="text-[#c4a88a]" size={44} />
                          <p className="mt-4 text-sm font-bold text-[#6f4b32]">Select a course above to view downloadable materials.</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </div>

            <section className="w-full">
              <div className="sd-section-head">
                <SectionTitle icon={Rocket} title="Promotions & Offers" />
              </div>
              <div className="sd-promo-row">
                <div className="sd-card p-5">
                  <p className="mb-4 text-sm font-extrabold">Promotional Banners</p>
                  {banners.length === 0 ? (
                    <p className="sd-card-muted px-4 py-10 text-center text-sm font-semibold text-[#6f4b32]">No banners available yet.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {banners.slice(0, 3).map((banner) => (
                        <a
                          key={banner.bannerId || banner.id || banner.title}
                          href={banner.redirectLink || banner.link || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="sd-card-muted block overflow-hidden p-3 transition hover:shadow-md"
                        >
                          <img src={banner.image || '/images/vedic_thumbnail.png'} alt={banner.title} className="h-32 w-full rounded-lg object-cover" />
                          <p className="mt-2 text-sm font-extrabold">{banner.title || 'Promotion'}</p>
                          {(banner.description || banner.subtitle) && (
                            <p className="mt-1 line-clamp-2 text-xs text-[#5c3d26]">{banner.description || banner.subtitle}</p>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sd-card p-5">
                  <p className="mb-4 text-sm font-extrabold">Merchandise & Launches</p>
                  {promoItems.length === 0 ? (
                    <p className="sd-card-muted px-4 py-10 text-center text-sm font-semibold text-[#6f4b32]">Nothing new right now.</p>
                  ) : (
                    <div className="sd-merch-list">
                      {promoItems.map((item, index) => (
                        <div key={item.productId || item.courseId || item.id || item.title || index} className="sd-card-muted flex items-center gap-3 p-3">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                          ) : (
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#ead8c6] text-[#8b4a1e]">
                              {item.price ? <Package size={22} /> : <Rocket size={22} />}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-1 text-sm font-extrabold">{item.title || item.name || 'Untitled item'}</p>
                            <p className="mt-1 text-xs font-semibold text-[#5c3d26]">
                              {item.price ? `Price: ${item.price}` : `Launch: ${formatDate(item.launchDate)}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sd-card p-5">
                  <p className="mb-4 text-sm font-extrabold">Available Offers</p>
                  {offers.length === 0 ? (
                    <p className="sd-card-muted px-4 py-10 text-center text-sm font-semibold text-[#6f4b32]">No special offers at the moment.</p>
                  ) : (
                    <div className="sd-offers-wrap">
                      {offers.map((offer) => (
                        <article key={offer.offerId || offer.id || offer.title} className="sd-card-muted p-4">
                          <p className="text-sm font-extrabold">{offer.title || offer.name || 'Offer'}</p>
                          {offer.discount && <p className="mt-1 text-xs font-bold">{offer.discount}</p>}
                          {(offer.code || offer.couponCode) && (
                            <p className="mt-1 text-xs font-bold text-[#8b4a1e]">Code: {offer.code || offer.couponCode}</p>
                          )}
                          <p className="mt-2 text-xs text-[#5c3d26]">Valid till: {formatDate(offer.validTill)}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardNew;
