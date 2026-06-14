import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageMeta = [
  {
    match: (path) => path === '/login',
    eyebrow: 'Student Access',
    title: 'Student Portal',
    description: 'Sign in and continue your enrolled courses.',
    primary: { label: 'View Courses', to: '/courses' },
    secondary: { label: 'Home', to: '/' }
  },
  {
    match: (path) => path === '/dashboard',
    eyebrow: 'Learning Area',
    title: 'My Dashboard',
    description: 'Track enrolled courses, materials, offers, and progress.',
    primary: { label: 'Courses', to: '/courses' },
    secondary: { label: 'Home', to: '/' }
  },
  {
    match: (path) => path.startsWith('/student/course/'),
    eyebrow: 'Course Player',
    title: 'Class Videos',
    description: 'Watch your protected lessons and continue learning.',
    primary: { label: 'Dashboard', to: '/dashboard' },
    secondary: { label: 'Courses', to: '/courses' }
  },
  {
    match: (path) => path === '/webinar',
    eyebrow: 'Live Session',
    title: 'Webinar Registration',
    description: 'Reserve your seat for the upcoming astrology session.',
    primary: { label: 'Consultation', to: '/consultations' },
    secondary: { label: 'Home', to: '/' }
  },
  {
    match: (path) => path === '/course-inquiry',
    eyebrow: 'Course Inquiry',
    title: 'Astrology Course',
    description: 'Ask questions and start your guided learning journey.',
    primary: { label: 'All Courses', to: '/courses' },
    secondary: { label: 'Contact', to: '/contact' }
  },
  {
    match: (path) => path.startsWith('/payment-success'),
    eyebrow: 'Payment Complete',
    title: 'Booking Confirmed',
    description: 'Your transaction was completed successfully.',
    primary: { label: 'Dashboard', to: '/dashboard' },
    secondary: { label: 'Home', to: '/' }
  },
  {
    match: (path) => path.startsWith('/payment-failed'),
    eyebrow: 'Payment Status',
    title: 'Payment Failed',
    description: 'Review the payment status and try again securely.',
    primary: { label: 'Try Again', to: '/webinar' },
    secondary: { label: 'Contact', to: '/contact' }
  },
  {
    match: (path) => path.startsWith('/payment'),
    eyebrow: 'Secure Checkout',
    title: 'Payment',
    description: 'Complete your registration with a secure checkout.',
    primary: { label: 'Need Help?', to: '/contact' },
    secondary: { label: 'Home', to: '/' }
  },
  {
    match: () => true,
    eyebrow: 'Cosmic Light',
    title: 'Astrology Guidance',
    description: 'Navigate courses, consultations, tools, and shop pages.',
    primary: { label: 'Home', to: '/' },
    secondary: { label: 'Courses', to: '/courses' }
  }
];

function getPageMeta(pathname) {
  return pageMeta.find((item) => item.match(pathname)) || pageMeta[pageMeta.length - 1];
}

function StandaloneLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const meta = getPageMeta(pathname);
  const [authState, setAuthState] = useState({ isStudent: false, isAdmin: false });

  const syncAuthState = () => {
    setAuthState({
      isStudent: Boolean(localStorage.getItem('studentToken')),
      isAdmin: Boolean(localStorage.getItem('adminToken'))
    });
  };

  const handleStudentLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentName');
    syncAuthState();
    navigate('/login');
  };

  useEffect(() => {
    syncAuthState();
    window.addEventListener('storage', syncAuthState);
    window.addEventListener('focus', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('focus', syncAuthState);
    };
  }, [pathname]);

  return (
    <div className="contextual-shell min-h-screen bg-[#fff7ed] text-[#2a0f02]">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-[1030] bg-[#fffaf3]/80 backdrop-blur-2xl border-b border-[#3D1A08]/5 transition-all duration-300"
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-4 !no-underline group outline-none">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3D1A08] text-[#FDF6EE] shadow-md shadow-[#3D1A08]/20 transition-transform duration-300 group-hover:scale-[1.03]">
              <i className="fas fa-moon text-lg"></i>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] !text-[#C8832A] mb-1">
                {meta.eyebrow}
              </span>
              <span className="font-serif text-[22px] font-bold !text-[#3D1A08] leading-none tracking-tight">
                {meta.title}
              </span>
            </div>
          </Link>

          {/* Center Navigation - Minimalist */}
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-[14px] font-semibold tracking-wide !text-[#5C2D12]/80 !no-underline transition-colors duration-200 hover:!text-[#C8832A]" to="/">
              Home
            </Link>
            <Link className="text-[14px] font-semibold tracking-wide !text-[#5C2D12]/80 !no-underline transition-colors duration-200 hover:!text-[#C8832A]" to="/courses">
              Courses
            </Link>
            <Link className="text-[14px] font-semibold tracking-wide !text-[#5C2D12]/80 !no-underline transition-colors duration-200 hover:!text-[#C8832A]" to="/consultations">
              Consultation
            </Link>
            {authState.isStudent ? (
              <Link className="text-[14px] font-semibold tracking-wide !text-[#5C2D12]/80 !no-underline transition-colors duration-200 hover:!text-[#C8832A]" to="/dashboard">
                Dashboard
              </Link>
            ) : (
              <Link className="text-[14px] font-semibold tracking-wide !text-[#5C2D12]/80 !no-underline transition-colors duration-200 hover:!text-[#C8832A]" to="/login">
                Student Login
              </Link>
            )}
            {authState.isAdmin && (
              <Link className="text-[14px] font-semibold tracking-wide !text-[#5C2D12]/80 !no-underline transition-colors duration-200 hover:!text-[#C8832A]" to="/admin">
                Admin
              </Link>
            )}
          </nav>

          {/* Right Action Buttons - High Contrast */}
          <div className="flex shrink-0 items-center gap-4">
            <Link
              to={meta.secondary.to}
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#8B4A1E]/30 bg-transparent px-6 py-2.5 text-[14px] font-bold !text-[#8B4A1E] !no-underline transition-all duration-300 hover:border-[#8B4A1E] hover:bg-[#8B4A1E]/5 outline-none"
            >
              {meta.secondary.label}
            </Link>
            <Link
              to={meta.primary.to}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#3D1A08] px-7 py-2.5 text-[14px] font-bold tracking-wide !text-white !no-underline shadow-md shadow-[#3D1A08]/10 transition-all duration-300 hover:bg-[#2A0F02] hover:shadow-lg hover:shadow-[#3D1A08]/20 hover:-translate-y-[1px] outline-none"
            >
              {meta.primary.label}
              <i className="fas fa-arrow-right text-[11px] opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"></i>
            </Link>
            {authState.isStudent && pathname !== '/login' && (
              <button
                type="button"
                onClick={handleStudentLogout}
                className="hidden sm:flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#8B4A1E]/20 bg-transparent !text-[#8B4A1E] transition-all duration-300 hover:bg-[#8B4A1E]/10 outline-none"
                aria-label="Logout"
                title="Logout"
              >
                <i className="fas fa-sign-out-alt text-sm"></i>
              </button>
            )}
          </div>
        </div>
      </motion.header>

      <main className="contextual-main min-h-[calc(100vh-174px)]">
        <Outlet />
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="border-t border-[#ead8c6] bg-[#2a0f02] text-[#fff7ed]"
      >
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 md:grid-cols-[1.3fr_1fr_auto] md:items-center lg:px-8">
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.24em] text-[#f5c98d]">{meta.eyebrow}</p>
            <p className="mb-0 max-w-xl text-sm leading-6 text-[#f8ead8]">{meta.description}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm font-bold">
            <Link className="text-[#fff7ed] no-underline opacity-85 transition hover:opacity-100" to="/privacy-policy">Privacy</Link>
            <Link className="text-[#fff7ed] no-underline opacity-85 transition hover:opacity-100" to="/terms-and-conditions">Terms</Link>
            <Link className="text-[#fff7ed] no-underline opacity-85 transition hover:opacity-100" to="/contact">Support</Link>
          </div>

          <p className="mb-0 text-xs font-bold text-[#d8b894]">&copy; 2026 Cosmic Light Astrology</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default StandaloneLayout;
