import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgePercent,
  BookOpen,
  Calendar,
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
  Tag,
  TrendingUp,
  UserRound,
  X,
} from 'lucide-react';
import useStudentDashboard, {
  computeDaysRemaining,
  formatDashboardDate,
} from '../hooks/useStudentDashboard';

// ── Design tokens ──────────────────────────────────────────────────────────────
const PAD = 'px-4 sm:px-6 lg:px-8';
const CARD = 'rounded-2xl border border-[#e8d5c0] bg-white shadow-[0_2px_12px_rgba(42,15,2,0.06)]';

const inputCls = [
  'w-full rounded-xl border border-[#d9c3a8] bg-[#fffcf8] px-4 py-2.5',
  'text-sm font-semibold text-[#2a0f02] outline-none transition',
  'focus:border-[#c8832a] focus:bg-white focus:ring-2 focus:ring-[#c8832a]/20',
].join(' ');

// ── Tiny helpers ───────────────────────────────────────────────────────────────
function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function validityStyle(val) {
  if (val === 'Expired') return 'bg-red-50 text-red-600 border-red-200';
  const n = parseInt(val, 10);
  if (!Number.isNaN(n) && n <= 30) return 'bg-orange-50 text-orange-600 border-orange-200';
  return 'bg-green-50 text-green-700 border-green-200';
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skel({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-[#ead8c6]/60 ${className}`} />;
}

function DashboardLoading() {
  return (
    <div className="tw-surface min-h-screen w-full bg-[#fdf6ee]">
      <div className="px-4 py-10 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom right, #1e0c02, #3a1c0c, #7a3d16)' }}>
        <Skel className="mb-3 h-3 w-24 bg-white/10" />
        <Skel className="mb-2 h-9 w-72 max-w-full bg-white/10" />
        <Skel className="h-4 w-96 max-w-full bg-white/10" />
      </div>
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-[#ead8c6] bg-white p-5 shadow-sm">
              <Skel className="mb-3 h-10 w-10 rounded-xl" />
              <Skel className="mb-2 h-3 w-20" />
              <Skel className="h-7 w-10" />
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-36 rounded-2xl border border-[#ead8c6] bg-white p-5 shadow-sm" />
            ))}
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#ead8c6] bg-white p-6 shadow-sm">
              <Skel className="mb-4 h-6 w-48" />
              <Skel className="h-24 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <p className="flex items-center justify-center gap-2 py-6 text-sm font-semibold text-[#6f4b32]">
        <Loader2 size={16} className="animate-spin text-[#8b4a1e]" />
        Preparing your dashboard…
      </p>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, iconBg, cardBg = 'bg-white border-[#e8d5c0]' }) {
  return (
    <div className={`group rounded-2xl border p-4 sm:p-5 transition hover:shadow-md ${cardBg}`}>
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon size={18} />
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#6f4b32]">{label}</p>
      <p className="mt-1 text-2xl font-black leading-none text-[#2a0f02] sm:text-3xl">{value}</p>
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ value, thin = false }) {
  const pct = Math.min(Math.max(Number(value) || 0, 0), 100);
  return (
    <div className={`w-full overflow-hidden rounded-full bg-[#f0e4d4] ${thin ? 'h-1.5' : 'h-2.5'}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#8b4a1e] to-[#c8832a] transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHead({ icon: Icon, title, badge }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff0d6]">
          <Icon size={15} className="text-[#8b4a1e]" />
        </div>
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#2a0f02] sm:text-sm">
          {title}
        </h2>
      </div>
      {badge}
    </div>
  );
}

// ── Pill ──────────────────────────────────────────────────────────────────────
function Pill({ children, active }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${active
          ? 'border border-[#e8c98a] bg-[#fff0d6] text-[#8b4a1e]'
          : 'bg-[#f4eadc] text-[#5c3d26]'
        }`}
    >
      {children}
    </span>
  );
}

// ── Buttons ───────────────────────────────────────────────────────────────────
function BtnPrimary({ children, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl bg-[#2a0f02] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#3d1806] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

function BtnOutline({ children, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-[#d9c3a8] bg-white px-4 py-2 text-sm font-bold text-[#2a0f02] transition hover:border-[#8b4a1e] hover:bg-[#fffaf4] active:scale-95 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function StudentDashboardTailwind() {
  const {
    profile,
    profileForm,
    profileEditMode,
    setProfileEditMode,
    savingProfile,
    enrolledCourses,
    courseValidity,
    banners,
    merchandise,
    newCourses,
    offers,
    materials,
    selectedCourseForMaterials,
    loading,
    loadingMaterials,
    studentName,
    handleLogout,
    handleProfileChange,
    saveProfile,
    loadMaterials,
  } = useStudentDashboard();

  if (loading) return <DashboardLoading />;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const completedCourses = enrolledCourses.filter((c) => Number(c.progress) >= 100).length;
  const activeCourses = enrolledCourses.filter(
    (c) => computeDaysRemaining(c.validTill) !== 'Expired',
  ).length;
  const avgProgress = enrolledCourses.length
    ? Math.round(
      enrolledCourses.reduce((t, c) => t + (Number(c.progress) || 0), 0) /
      enrolledCourses.length,
    )
    : 0;

  const stats = [
    {
      label: 'My Courses',
      value: enrolledCourses.length,
      icon: BookOpen,
      iconBg: 'bg-[#fff0d6] text-[#8b4a1e]',
      cardBg: 'bg-white border-[#e8d5c0]',
    },
    {
      label: 'Active Offers',
      value: offers.length,
      icon: BadgePercent,
      iconBg: 'bg-[#fde8d8] text-[#b25518]',
      cardBg: 'bg-white border-[#f0d5c5]',
    },
    {
      label: 'Banners',
      value: banners.length,
      icon: Sparkles,
      iconBg: 'bg-[#f4e8dd] text-[#7b3f2a]',
      cardBg: 'bg-white border-[#e8d5c0]',
    },
    {
      label: 'New Launches',
      value: newCourses.length,
      icon: Rocket,
      iconBg: 'bg-[#f0f4df] text-[#5f6f23]',
      cardBg: 'bg-white border-[#dde8c0]',
    },
  ];

  const materialTabs = enrolledCourses.slice(0, 6);
  const promoItems = [...merchandise.slice(0, 3), ...newCourses.slice(0, 3)];

  return (
    <div className="tw-surface min-h-screen w-full bg-[#fdf6ee] font-body text-[#2a0f02]">

      {/* ── Hero header ─────────────────────────────────────────────────────── */}
      <header className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1e0c02, #3a1c0c, #7a3d16)' }}>
        {/* subtle dot pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div
          className={`relative z-10 flex flex-col gap-4 py-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between ${PAD}`}
        >
          <div className="min-w-0 flex-1">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#f5c98d] backdrop-blur-sm">
              <Sparkles size={11} />
              {greeting}
            </span>
            <h1 className="font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-[#f5c98d] to-[#e8a855] bg-clip-text text-transparent">
                {studentName}
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f5d9b8]/80 sm:text-base">
              {enrolledCourses.length > 0
                ? `${enrolledCourses.length} enrolled course${enrolledCourses.length !== 1 ? 's' : ''} · ${activeCourses} active · ${completedCourses} completed`
                : 'Explore recorded courses and begin your Vedic astrology journey.'}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              to="/recorded-courses"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Plus size={15} />
              Explore Courses
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-white/80 backdrop-blur-sm transition hover:bg-white/15 hover:text-white lg:hidden"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Stat strip ──────────────────────────────────────────────────────── */}
      <div className={`mt-16 pb-8 ${PAD}`}>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* ── Main body ───────────────────────────────────────────────────────── */}
      <main className={`pt-8 pb-12 ${PAD}`}>
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8 lg:items-start">

          {/* ── Sidebar ─────────────────────────────────────────────────────── */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-6">

            {/* Avatar */}
            <div className={`${CARD} p-5`}>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8b4a1e] to-[#c8832a] text-base font-black text-white shadow ring-4 ring-[#f4e8dc]">
                  {initials(studentName) || <UserRound size={22} />}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-extrabold text-[#2a0f02]">{studentName}</p>
                  <p className="text-xs font-semibold text-[#6f4b32]">Student Portal</p>
                </div>
              </div>
            </div>

            {/* Account info */}
            <div className={`${CARD} p-5`}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#2a0f02]">
                  My Account
                </h2>
                <Pill active>Active</Pill>
              </div>
              <dl className="mb-5 space-y-3">
                {[
                  ['Name', profile?.name || '—'],
                  ['Email', profile?.email || '—'],
                  ['Mobile', profile?.mobile || '—'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-[#8b4a1e]">
                      {k}
                    </dt>
                    <dd className="mt-0.5 break-all text-sm font-semibold text-[#2a0f02]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-2">
                <BtnOutline className="w-full" onClick={() => setProfileEditMode((o) => !o)}>
                  <PenLine size={14} />
                  {profileEditMode ? 'Cancel Edit' : 'Edit Profile'}
                </BtnOutline>
                <BtnPrimary className="hidden w-full lg:inline-flex" onClick={handleLogout}>
                  <LogOut size={14} />
                  Logout
                </BtnPrimary>
              </div>
            </div>

            {/* Edit form */}
            {profileEditMode && (
              <div className={`${CARD} p-5`}>
                <h3 className="mb-1 text-sm font-extrabold text-[#2a0f02]">Edit Profile</h3>
                <p className="mb-4 text-xs font-semibold text-[#6f4b32]">Update your account details.</p>
                <form onSubmit={saveProfile} className="space-y-3">
                  {['name', 'email', 'mobile'].map((field) => (
                    <label key={field} className="block">
                      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-[#8b4a1e]">
                        {field}
                      </span>
                      <input
                        type={
                          field === 'email' ? 'email' : field === 'mobile' ? 'tel' : 'text'
                        }
                        value={profileForm[field]}
                        onChange={handleProfileChange(field)}
                        className={inputCls}
                        placeholder={
                          field === 'mobile'
                            ? '10-digit number'
                            : field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        inputMode={field === 'mobile' ? 'numeric' : undefined}
                        maxLength={field === 'mobile' ? 10 : undefined}
                        required
                      />
                    </label>
                  ))}
                  <div className="flex gap-2 pt-1">
                    <BtnPrimary type="submit" disabled={savingProfile} className="flex-1">
                      {savingProfile ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Save size={14} />
                      )}
                      {savingProfile ? 'Saving…' : 'Save Changes'}
                    </BtnPrimary>
                    <BtnOutline type="button" onClick={() => setProfileEditMode(false)}>
                      <X size={14} />
                    </BtnOutline>
                  </div>
                </form>
              </div>
            )}

            {/* Progress summary */}
            <div className={`${CARD} p-5`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={15} className="text-[#8b4a1e]" />
                  <h3 className="text-sm font-extrabold text-[#2a0f02]">Overall Progress</h3>
                </div>
                <span className="text-2xl font-black text-[#8b4a1e]">{avgProgress}%</span>
              </div>
              <ProgressBar value={avgProgress} />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ['Enrolled', enrolledCourses.length],
                  ['Active', activeCourses],
                  ['Done', completedCourses],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-[#ead8c6] bg-[#faf5ee] py-3">
                    <p className="text-xl font-black leading-none text-[#2a0f02]">{v}</p>
                    <p className="mt-1 text-[10px] font-bold text-[#6f4b32]">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main content ─────────────────────────────────────────────────── */}
          <div className="flex min-w-0 flex-col gap-6">

            {/* My Courses */}
            <section>
              <SectionHead
                icon={BookOpen}
                title="My Courses"
                badge={<Pill>{enrolledCourses.length} total</Pill>}
              />
              <div className={CARD}>
                {enrolledCourses.length === 0 ? (
                  <div className="flex flex-col items-center px-6 py-14 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0d6]">
                      <FolderOpen size={30} className="text-[#8b4a1e]" />
                    </div>
                    <p className="text-base font-extrabold text-[#2a0f02]">No enrolled courses yet</p>
                    <p className="mt-2 max-w-xs text-sm text-[#5c3d26]">
                      Purchase a recorded course to unlock lessons and materials.
                    </p>
                    <Link
                      to="/recorded-courses"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2a0f02] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#3d1806]"
                    >
                      Browse Courses
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-[#f0e4d4]">
                    {enrolledCourses.map((course) => {
                      const validity =
                        courseValidity[course.id]?.daysRemaining ??
                        computeDaysRemaining(course.validTill);
                      return (
                        <div
                          key={course.id}
                          className="flex gap-4 p-4 transition hover:bg-[#fffcf8] sm:p-5"
                        >
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-24 sm:w-32"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b4a1e]">
                              {course.courseType}
                            </span>
                            <h3 className="mt-0.5 line-clamp-2 text-sm font-extrabold leading-snug text-[#2a0f02] sm:text-base">
                              {course.title}
                            </h3>
                            <p className="mt-1 line-clamp-1 text-xs text-[#5c3d26]">
                              {course.description}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                              <span className="flex items-center gap-1 text-[#6f4b32]">
                                <Calendar size={11} />
                                {formatDashboardDate(course.purchaseDate)}
                              </span>
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${validityStyle(validity)}`}
                              >
                                {validity}
                              </span>
                              <span className="ml-auto font-bold text-[#8b4a1e]">
                                {course.progress}%
                              </span>
                            </div>
                            <div className="mt-2">
                              <ProgressBar value={course.progress} thin />
                            </div>
                            <Link
                              to={`/student/course/${course.id}`}
                              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#2a0f02] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#3d1806]"
                            >
                              Continue Learning
                              <ChevronRight size={13} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* Materials + Offers row */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* Course Materials */}
              <section className="flex flex-col">
                <SectionHead icon={FolderOpen} title="Course Materials" />
                <div className={`flex flex-1 flex-col ${CARD} overflow-hidden`}>
                  {/* Scrollable tab bar */}
                  <div className="overflow-x-auto border-b border-[#f0e4d4]">
                    <div className="flex gap-2 p-3">
                      {materialTabs.length === 0 ? (
                        <Pill>No courses</Pill>
                      ) : (
                        materialTabs.map((course) => (
                          <button
                            key={course.id}
                            type="button"
                            onClick={() => loadMaterials(course.id)}
                            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition ${selectedCourseForMaterials === course.id
                                ? 'bg-[#2a0f02] text-white shadow-sm'
                                : 'bg-[#f4eadc] text-[#5c3d26] hover:bg-[#ead8c6]'
                              }`}
                          >
                            {course.title.length > 18
                              ? `${course.title.slice(0, 18)}…`
                              : course.title}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                  {/* File list */}
                  <div className="flex-1 p-4">
                    {materials.length > 0 ? (
                      <div className="space-y-2">
                        {materials.map((item) => {
                          const isZip = (item.fileType || '').toLowerCase().includes('zip');
                          const FIcon = isZip ? FileArchive : FileText;
                          return (
                            <div
                              key={item.materialId || item.id || item.title}
                              className="flex items-center gap-3 rounded-xl border border-[#e8d5c0] bg-[#faf5ee] p-3 transition hover:border-[#c8832a]/50"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff0d6]">
                                <FIcon size={15} className="text-[#8b4a1e]" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="line-clamp-1 text-sm font-extrabold text-[#2a0f02]">
                                  {item.title || 'Course Material'}
                                </p>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8b4a1e]">
                                  {item.fileType || 'PDF'}
                                </p>
                              </div>
                              {item.fileUrl && (
                                <a
                                  href={item.fileUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#2a0f02] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#3d1806]"
                                >
                                  <Download size={13} />
                                  <span className="hidden sm:inline">Download</span>
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex min-h-40 flex-col items-center justify-center text-center">
                        {loadingMaterials ? (
                          <>
                            <Loader2 size={28} className="animate-spin text-[#8b4a1e]" />
                            <p className="mt-3 text-xs font-bold text-[#6f4b32]">Loading…</p>
                          </>
                        ) : (
                          <>
                            <FileText size={30} className="mb-2 text-[#8b4a1e] opacity-30" />
                            <p className="text-xs font-semibold text-[#6f4b32]">
                              Select a course to view materials
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Available Offers */}
              <section className="flex flex-col">
                <SectionHead
                  icon={BadgePercent}
                  title="Available Offers"
                  badge={<Pill>{offers.length} offers</Pill>}
                />
                <div className={`flex flex-1 flex-col ${CARD} p-4`}>
                  {offers.length === 0 ? (
                    <div className="flex min-h-40 flex-col items-center justify-center text-center">
                      <Tag size={30} className="mb-2 text-[#8b4a1e] opacity-30" />
                      <p className="text-xs font-semibold text-[#6f4b32]">
                        No special offers at the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {offers.map((offer) => (
                        <article
                          key={offer.offerId || offer.id || offer.title}
                          className="rounded-xl border border-[#e8d5c0] bg-[#faf5ee] p-4 transition hover:border-[#c8832a]/50"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-extrabold text-[#2a0f02]">
                              {offer.title || 'Special Offer'}
                            </p>
                            {offer.discount && (
                              <span className="shrink-0 rounded-full bg-[#fff0d6] px-2 py-0.5 text-[10px] font-black text-[#8b4a1e] ring-1 ring-[#e8c98a]">
                                {offer.discount}
                              </span>
                            )}
                          </div>
                          {(offer.code || offer.couponCode) && (
                            <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#c8832a] bg-white px-2.5 py-1.5">
                              <Tag size={11} className="text-[#c8832a]" />
                              <code className="text-xs font-black tracking-wider text-[#8b4a1e]">
                                {offer.code || offer.couponCode}
                              </code>
                            </div>
                          )}
                          <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#6f4b32]">
                            <Calendar size={11} />
                            Valid till {formatDashboardDate(offer.validTill)}
                          </p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Promotions */}
            <section>
              <SectionHead icon={Rocket} title="Promotions & Launches" />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {/* Banners */}
                <div className={CARD}>
                  <div className="border-b border-[#f0e4d4] px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#8b4a1e]">
                      Promotional Banners
                    </p>
                  </div>
                  <div className="p-4">
                    {banners.length === 0 ? (
                      <p className="py-8 text-center text-xs font-semibold text-[#6f4b32]">
                        No banners yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {banners.map((banner) => (
                          <a
                            key={banner.bannerId || banner.id}
                            href={banner.redirectLink || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="block overflow-hidden rounded-xl border border-[#e8d5c0] transition hover:shadow-md"
                          >
                            <img
                              src={banner.image || '/images/vedic_thumbnail.png'}
                              alt={banner.title}
                              className="h-28 w-full object-cover"
                            />
                            <div className="p-3">
                              <p className="text-sm font-extrabold text-[#2a0f02]">
                                {banner.title || 'Special Offer'}
                              </p>
                              {(banner.description || banner.subtitle) && (
                                <p className="mt-0.5 line-clamp-1 text-xs text-[#5c3d26]">
                                  {banner.description || banner.subtitle}
                                </p>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Merchandise */}
                <div className={CARD}>
                  <div className="border-b border-[#f0e4d4] px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#8b4a1e]">
                      Merchandise &amp; Launches
                    </p>
                  </div>
                  <div className="p-4">
                    {promoItems.length === 0 ? (
                      <p className="py-8 text-center text-xs font-semibold text-[#6f4b32]">
                        Nothing new right now.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {promoItems.map((item, i) => (
                          <div
                            key={item.productId || item.courseId || item.id || i}
                            className="flex items-center gap-3 rounded-xl border border-[#e8d5c0] bg-[#faf5ee] p-3 transition hover:border-[#c8832a]/40"
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-12 w-12 shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ead8c6] text-[#8b4a1e]">
                                {item.price ? <Package size={20} /> : <Rocket size={20} />}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-1 text-sm font-extrabold text-[#2a0f02]">
                                {item.title || item.name || 'Untitled'}
                              </p>
                              <p className="mt-0.5 text-xs font-semibold text-[#5c3d26]">
                                {item.price
                                  ? `₹${item.price}`
                                  : `Launch: ${formatDashboardDate(item.launchDate)}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* New Courses */}
                <div className={`${CARD} sm:col-span-2 xl:col-span-1`}>
                  <div className="border-b border-[#f0e4d4] px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#8b4a1e]">
                      New Courses
                    </p>
                  </div>
                  <div className="p-4">
                    {newCourses.length === 0 ? (
                      <p className="py-8 text-center text-xs font-semibold text-[#6f4b32]">
                        No new courses yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {newCourses.slice(0, 5).map((c, i) => (
                          <div
                            key={c.courseId || c.id || i}
                            className="flex items-center gap-3 rounded-xl border border-[#e8d5c0] bg-[#faf5ee] p-3"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0f4df]">
                              <GraduationCap size={17} className="text-[#5f6f23]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-1 text-sm font-extrabold text-[#2a0f02]">
                                {c.title || 'New Course'}
                              </p>
                              <p className="text-[10px] font-bold text-[#8b4a1e]">
                                {c.price ? `₹${c.price}` : 'View Details'}
                              </p>
                            </div>
                            <ChevronRight size={14} className="shrink-0 text-[#6f4b32]" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
