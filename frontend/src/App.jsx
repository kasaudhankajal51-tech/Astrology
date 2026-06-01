import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import { Suspense, lazy } from 'react';
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
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const NotFound = lazy(() => import('./pages/NotFound'));
import { Toaster } from 'react-hot-toast';
import { SettingsProvider } from './context/SettingsContext';
import CookieConsent from './components/CookieConsent';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
        <CookieConsent />
        <Suspense fallback={<div className="d-flex justify-content-center align-items-center" style={{height: '100vh', background: 'var(--bg-color)'}}><div className="spinner-border" style={{color: 'var(--primary-color)'}}></div></div>}>
          <Routes>
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
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route path="free-tools" element={<FreeTools />} />
              <Route path="numerology" element={<Numerology />} />
              <Route path="tarot" element={<Tarot />} />
              <Route path="love" element={<Love />} />
              <Route path="shop" element={<AstroShop />} />
              <Route path="shop/checkout" element={<ShopCheckout />} />
              <Route path="shop/:category" element={<ShopCategory />} />
              <Route path="careers" element={<Careers />} />
            </Route>
            
            {/* Standalone Landing Pages & Admin (No Header/Footer) */}
            <Route path="/webinar" element={<Webinar />} />
            <Route path="/course-inquiry" element={<LandingPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Student Portal Routes */}
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/student/course/:id" element={<CoursePlayer />} />
            
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
