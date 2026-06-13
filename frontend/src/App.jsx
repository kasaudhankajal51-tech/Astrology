import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import StandaloneLayout from './layouts/StandaloneLayout';
import { Suspense, lazy, useEffect } from 'react';
const Home = lazy(() => import('./pages/Home'));
const Consultations = lazy(() => import('./pages/Consultations'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Cancellation = lazy(() => import('./pages/Cancellation'));
const Astrologer = lazy(() => import('./pages/Astrologer'));
const VedicCourse = lazy(() => import('./pages/VedicCourse'));
const AdvancedAstrology = lazy(() => import('./pages/AdvancedAstrology'));
const PredictiveAstrology = lazy(() => import('./pages/PredictiveAstrology'));
const CertificationCourses = lazy(() => import('./pages/CertificationCourses'));
const FreeTools = lazy(() => import('./pages/FreeTools'));
const Numerology = lazy(() => import('./pages/Numerology'));
const Tarot = lazy(() => import('./pages/Tarot'));
const Love = lazy(() => import('./pages/Love'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Webinar = lazy(() => import('./pages/Webinar'));
const Payment = lazy(() => import('./pages/Payment'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentFailed = lazy(() => import('./pages/PaymentFailed'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AstroShop = lazy(() => import('./pages/AstroShop'));
const ShopCheckout = lazy(() => import('./pages/ShopCheckout'));
const ShopCategory = lazy(() => import('./pages/ShopCategory'));
const ConsultationDetail = lazy(() => import('./pages/ConsultationDetail'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const StudentLogin = lazy(() => import('./pages/StudentLogin'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboardTailwind'));
const NewStudentDashboard = lazy(() => import('./pages/newstudentdashboard'));
/* Legacy dashboards (unchanged): StudentDashboard.jsx, StudentDashboardNew.jsx */
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const NotFound = lazy(() => import('./pages/NotFound'));
const TailwindTest = lazy(() => import('./pages/TailwindTest'));
import { Toaster } from 'react-hot-toast';
import { SettingsProvider } from './context/SettingsContext';
import CookieConsent from './components/CookieConsent';
import FloatingChatAssistant from './components/FloatingChatAssistant';
import { HelmetProvider } from 'react-helmet-async';

function LazyImageLoader() {
  useEffect(() => {
    // Apply loading="lazy" to any image that doesn't already have an explicit loading attribute
    const applyLazy = () => {
      document.querySelectorAll('img:not([loading]):not([fetchpriority="high"])').forEach(img => {
        img.loading = 'lazy';
      });
    };
    applyLazy();
    const observer = new MutationObserver(applyLazy);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
        <ScrollToTop />
        <LazyImageLoader />
        <Toaster position="top-center" reverseOrder={false} />
        <CookieConsent />
        <FloatingChatAssistant />
        <Suspense fallback={
          <div style={{
            height: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#FDF6EE', gap: '1rem'
          }}>
            <img src="/newbg.webp" alt="DS Institute" style={{ height: '56px', width: 'auto', opacity: 0.85 }} />
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '3px solid rgba(139,74,30,0.15)',
              borderTopColor: '#8B4A1E',
              animation: 'spin 0.75s linear infinite'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        }>
          <Routes>
            <Route path="/test" element={<NewStudentDashboard />} />

            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="book-consultation" element={<Consultations />} />
              <Route path="book-consultation/:serviceId" element={<ConsultationDetail />} />
              <Route path="consultations" element={<Consultations />} />
              <Route path="consultations/:serviceId" element={<ConsultationDetail />} />
              <Route path="about" element={<About />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogDetail />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<Terms />} />
              <Route path="refund-policy" element={<Cancellation />} />
              <Route path="astrologer" element={<Astrologer />} />
              <Route path="vedic-course" element={<VedicCourse />} />
              <Route path="advanced-astrology" element={<AdvancedAstrology />} />
              <Route path="predictive-astrology" element={<PredictiveAstrology />} />
              <Route path="certification-courses" element={<CertificationCourses />} />
              <Route path="courses" element={<Courses />} />
              <Route path="live-courses" element={<Courses mode="live" />} />
              <Route path="recorded-courses" element={<Courses mode="recorded" />} />
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route path="free-tools" element={<FreeTools />} />
              <Route path="numerology" element={<Numerology />} />
              <Route path="tarot" element={<Tarot />} />
              <Route path="love" element={<Love />} />
              <Route path="shop" element={<AstroShop />} />
              <Route path="shop/checkout" element={<ShopCheckout />} />
              <Route path="shop/:category" element={<ShopCategory />} />
              <Route path="careers" element={<Careers />} />
              <Route path="tailwind" element={<TailwindTest />} />
              <Route path="login" element={<StudentLogin />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="student/course/:id" element={<CoursePlayer />} />
            </Route>
            
            {/* Standalone customer/student pages with contextual header/footer */}
            <Route element={<StandaloneLayout />}>
              <Route path="/webinar" element={<Webinar />} />
              <Route path="/course-inquiry" element={<LandingPage />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin remains app-only, without public site chrome */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
