import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import AdminLeads from './pages/AdminLeads';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cancellation" element={<Cancellation />} />
          <Route path="astrologer" element={<Astrologer />} />
          <Route path="vedic-course" element={<VedicCourse />} />
          <Route path="advanced-astrology" element={<AdvancedAstrology />} />
          <Route path="predictive-astrology" element={<PredictiveAstrology />} />
          <Route path="certification-courses" element={<CertificationCourses />} />
          <Route path="free-tools" element={<FreeTools />} />
          <Route path="numerology" element={<Numerology />} />
          <Route path="tarot" element={<Tarot />} />
          <Route path="love" element={<Love />} />
        </Route>
        
        {/* Standalone Landing Pages & Admin (No Header/Footer) */}
        <Route path="/webinar" element={<LandingPage />} />
        <Route path="/course-inquiry" element={<LandingPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
