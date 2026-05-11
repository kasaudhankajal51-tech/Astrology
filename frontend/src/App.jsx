import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Consultations from './pages/Consultations';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Cancellation from './pages/Cancellation';
import Astrologer from './pages/Astrologer';
import VedicCourse from './pages/VedicCourse';
import AdvancedAstrology from './pages/AdvancedAstrology';
import PredictiveAstrology from './pages/PredictiveAstrology';
import CertificationCourses from './pages/CertificationCourses';
import FreeTools from './pages/FreeTools';
import Numerology from './pages/Numerology';
import Tarot from './pages/Tarot';
import Love from './pages/Love';
import LandingPage from './pages/LandingPage';
import Webinar from './pages/Webinar';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import AdminDashboard from './pages/AdminDashboard';
import AstroShop from './pages/AstroShop';
import ShopCategory from './pages/ShopCategory';
import ConsultationDetail from './pages/ConsultationDetail';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Careers from './pages/Careers';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/AdminLogin';
import { Toaster } from 'react-hot-toast';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="consultations/:serviceId" element={<ConsultationDetail />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cancellation" element={<Cancellation />} />
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
          <Route path="astro-shop" element={<AstroShop />} />
          <Route path="astro-shop/:category" element={<ShopCategory />} />
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
      </Routes>
    </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
