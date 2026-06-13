import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Tag, Percent } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import CourseTimer from '../components/CourseTimer';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';
import { getContactValidationError, normalizeIndianMobile } from '../utils/validation';
import { reportPaymentFailure, buildPaymentSuccessPath } from '../utils/paymentUtils';

/** Recorded-course Razorpay checkout — uses test/mock mode until live keys are added */
const RECORDED_PAYMENT_ENABLED = true;

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    age: '',
    interest: '',
    message: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  const isLiveCourse = course?.courseType === 'Live';
  const isRecordedCourse = course?.courseType === 'Recorded';
  const canPayOnline = RECORDED_PAYMENT_ENABLED
    && isRecordedCourse
    && paymentEnabled
    && Number(course?.price) > 0;
  const hasAvailableCoupons = availableCoupons.length > 0;
  /* Payment gateway status — kept for when RECORDED_PAYMENT_ENABLED is turned on */
  useEffect(() => {
    if (!RECORDED_PAYMENT_ENABLED) return;
    fetch(`${API_BASE}/api/payment/status`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPaymentEnabled(!!data.paymentEnabled);
      })
      .catch(() => setPaymentEnabled(false));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/courses/${courseId}`);
        const data = await response.json();
        
        if (data.success && data.course) {
          const dbCourse = data.course;
          const courseType = dbCourse.courseType || 'Live';
          const instructorName = typeof dbCourse.instructor === 'string'
            ? dbCourse.instructor
            : dbCourse.instructor?.name || '';
          const mappedCourse = {
            id: dbCourse._id,
            title: dbCourse.title,
            shortDesc: dbCourse.description,
            longDesc: dbCourse.longDesc || dbCourse.description,
            image: dbCourse.thumbnailUrl || '/images/vedic_thumbnail.png',
            duration: dbCourse.duration || `${dbCourse.validityDays} Days`,
            schedule: courseType === 'Recorded' ? 'Self-Paced' : (dbCourse.batchDetails?.startDate ? `Starts ${dbCourse.batchDetails.startDate}` : 'Upcoming Batch'),
            level: dbCourse.level || 'Beginner',
            category: 'Astrology',
            price: dbCourse.price,
            courseType,
            modulesCount: dbCourse.modulesCount || 0,
            instructor: instructorName,
            instructorBio: typeof dbCourse.instructor === 'object' ? dbCourse.instructor?.bio : '',
            instructorImage: typeof dbCourse.instructor === 'object' ? dbCourse.instructor?.image : '',
            topics: dbCourse.learningOutcomes?.length ? dbCourse.learningOutcomes : (dbCourse.topics?.length ? dbCourse.topics : ['Fundamentals', 'Advanced Techniques', 'Practical Application']),
            curriculum: dbCourse.curriculum || [],
            batchDetails: dbCourse.batchDetails || null,
            faqs: dbCourse.faqs || [],
            testimonials: dbCourse.testimonials || [],
          };
          setCourse(mappedCourse);
          document.title = `${mappedCourse.title} | DS Institute`;
        } else {
          const staticCourse = coursesData.find(c => c.id === courseId);
          if (staticCourse) {
            setCourse({ ...staticCourse, courseType: 'Recorded' });
            document.title = `${staticCourse.title} | DS Institute`;
          } else {
            navigate('/courses');
          }
        }
      } catch (err) {
        const staticCourse = coursesData.find(c => c.id === courseId);
        if (staticCourse) {
          setCourse({ ...staticCourse, courseType: 'Recorded' });
          document.title = `${staticCourse.title} | Cosmic Light Astrology`;
        } else {
          console.error('Failed to fetch course details:', err);
          navigate('/courses');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId, navigate]);

  useEffect(() => {
    if (!course?.id || !isRecordedCourse || !paymentEnabled) {
      setAvailableCoupons([]);
      return;
    }
    fetch(`${API_BASE}/api/coupons/available/${course.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.coupons)) {
          setAvailableCoupons(data.coupons);
        }
      })
      .catch(() => setAvailableCoupons([]));
  }, [course?.id, isRecordedCourse, paymentEnabled]);

  const openCheckoutModal = async () => {
    const token = localStorage.getItem('studentToken');
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/student/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const profile = data.profile || data.user || data.student;
        if (profile) {
          setFormData({
            name: profile.name || '',
            email: profile.email || '',
            phone: (profile.mobile || profile.phone || '').replace(/\D/g, '').slice(0, 10),
          });
        }
      } catch {
        // Guest checkout still works with manual entry.
      }
    }

    setShowCheckoutModal(true);

    if (hasAvailableCoupons && !appliedCoupon) {
      toast('Apply your coupon code first, then proceed to payment.', {
        icon: '🏷️',
        duration: 4500,
      });
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'phone') {
      setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnquiryChange = (e) => {
    if (e.target.name === 'phone') {
      setEnquiryData({ ...enquiryData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) });
      return;
    }
    setEnquiryData({ ...enquiryData, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    const validationError = getContactValidationError(enquiryData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const sanitizedPhone = normalizeIndianMobile(enquiryData.phone);
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryData.name.trim(),
          phone: sanitizedPhone,
          email: enquiryData.email.trim(),
          type: isLiveCourse ? 'Course' : 'Recorded-Course',
          leadType: isLiveCourse ? 'LIVE COURSE LEAD' : 'RECORDED COURSE LEAD',
          status: 'ENQUIRY RECEIVED',
          paymentStatus: 'NOT REQUIRED',
          courseName: course.title,
          courseId: course.id,
          courseType: course.courseType,
          city: enquiryData.city,
          age: enquiryData.age,
          interest: enquiryData.interest,
          message: enquiryData.message
            ? enquiryData.message
            : `Interest: ${enquiryData.interest || 'Not specified'}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Enquiry submitted successfully! Our team will contact you soon.');
        setShowEnquiryModal(false);
        setEnquiryData({ name: '', phone: '', email: '', city: '', age: '', interest: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to submit enquiry');
      }
    } catch (err) {
      toast.error('Network Error. Please try again.');
    }
  };

  const openEnquiryModal = () => setShowEnquiryModal(true);

  const initiateCheckout = () => {
    if (!RECORDED_PAYMENT_ENABLED || !canPayOnline) {
      openEnquiryModal();
      return;
    }
    openCheckoutModal();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    if (e) e.preventDefault();
    if (!RECORDED_PAYMENT_ENABLED) {
      openEnquiryModal();
      return;
    }

    try {
      // Create Order & get Payment Link
      const token = localStorage.getItem('studentToken');
      if (!token) {
        const validationError = getContactValidationError(formData);
        if (validationError) {
          toast.error(validationError);
          return;
        }
      }

      const sanitizedPhone = normalizeIndianMobile(formData.phone);
      setIsProcessingPayment(true);
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const orderResponse = await fetch(`${API_BASE}/api/payment/create-order`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          courseId: course.id,
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: sanitizedPhone,
          couponCode: appliedCoupon?.code || ''
        })
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        if (orderData.code === 'PAYMENT_DISABLED' || orderResponse.status === 503) {
          toast.error('Online payment is not live yet. Please submit an enquiry — our team will call you.');
          setShowCheckoutModal(false);
          setShowEnquiryModal(true);
        } else {
          toast.error(orderData.message || 'Failed to create order');
        }
        setIsProcessingPayment(false);
        if (orderResponse.status === 400 || orderResponse.status === 401) {
          localStorage.removeItem('studentToken');
          setShowCheckoutModal(true);
        }
        return;
      }

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error('Razorpay SDK failed to load. Check your connection.');
        setIsProcessingPayment(false);
        return;
      }

      if (orderData.orderId) {
        const options = {
          key: orderData.keyId,
          amount: Number(orderData.amount),
          currency: orderData.currency || 'INR',
          name: 'DS Institute',
          description: `Course Purchase: ${course.title}`,
          image: "/images/logo.png",
          order_id: orderData.orderId,
          handler: async function (response) {
            try {
              const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  email: orderData.email,
                  name: orderData.name
                })
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                setShowCheckoutModal(false);
                navigate(buildPaymentSuccessPath({
                  type: 'course',
                  txn: response.razorpay_payment_id,
                  courseName: course.title,
                }));
              } else {
                toast.error('Payment verification failed.');
                reportPaymentFailure({
                  leadId: orderData.leadId,
                  orderId: orderData.orderId,
                  courseId: course.id,
                  courseName: course.title,
                  paymentFor: 'Recorded Course',
                  error: { description: 'Payment verification failed' },
                  navigate,
                  type: 'course',
                });
              }
            } catch (err) {
              toast.error('Error verifying payment.');
            } finally {
              setIsProcessingPayment(false);
            }
          },
          prefill: {
            name: orderData.name,
            email: orderData.email,
            contact: orderData.phone
          },
          theme: {
            color: "#8B4A1E"
          },
          modal: {
            ondismiss: function() {
              setIsProcessingPayment(false);
            }
          }
        };

        if (orderData.isMock) {
          toast.success("Test Mode: Simulating Payment Success...");
          options.handler({
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_order_id: orderData.orderId,
            razorpay_signature: "mock_signature"
          });
        } else {
          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', function (response) {
            reportPaymentFailure({
              leadId: orderData.leadId,
              orderId: orderData.orderId,
              courseId: course.id,
              courseName: course.title,
              paymentFor: 'Recorded Course',
              error: response.error,
              navigate,
              type: 'course',
            });
            setIsProcessingPayment(false);
          });
          rzp.open();
        }
      } else {
        toast.error('Order ID not generated. Please try again.');
        setIsProcessingPayment(false);
      }

    } catch (err) {
      console.error(err);
      toast.error('Network Error. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  const handleCouponApply = async (overrideCode) => {
    const codeToApply = String(overrideCode || couponCode).trim();
    if (!codeToApply) {
      toast.error('Enter a coupon code to apply.');
      return;
    }
    if (overrideCode) setCouponCode(String(overrideCode).toUpperCase());
    setCouponLoading(true);
    setCouponStatus(null);

    try {
      const res = await fetch(`${API_BASE}/api/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToApply, courseId: course?.id, purchaseAmount: getCoursePrice() }),
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setAppliedCoupon({ ...data.coupon, code: data.coupon.code || codeToApply.toUpperCase() });
        setCouponStatus({ type: 'success', message: `Applied ${data.coupon.discountType === 'fixed' ? `₹${data.coupon.discountValue}` : `${data.coupon.discountValue}%`} discount` });
        toast.success('Coupon applied! Proceed to payment when ready.');
      } else {
        setAppliedCoupon(null);
        setCouponStatus({ type: 'error', message: data.message || 'Invalid coupon code' });
      }
    } catch (err) {
      setCouponStatus({ type: 'error', message: 'Coupon validation failed. Try again.' });
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setCouponStatus(null);
  };

  const getCoursePrice = () => Number(course?.price) || 0;

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;

    const price = getCoursePrice();
    const discountValue = Number(appliedCoupon.discountValue) || 0;
    const discount = appliedCoupon.discountType === 'fixed'
      ? discountValue
      : Math.round((price * discountValue) / 100);

    return Math.max(0, Math.min(discount, price));
  };

  const getPayableAmount = () => Math.max(getCoursePrice() - getDiscountAmount(), 1);

  const formatCouponOffer = (coupon) =>
    coupon.discountType === 'fixed'
      ? `₹${coupon.discountValue} off`
      : `${coupon.discountValue}% off`;

  const renderCouponControls = (variant = 'sidebar') => {
    const isSidebar = variant === 'sidebar';
    return (
      <div className={isSidebar ? 'coupon-box' : 'ce-modal-coupon'}>
        <div className={isSidebar ? 'coupon-box-head' : 'ce-modal-coupon-head'}>
          <Tag size={18} />
          <span>{isSidebar ? 'Apply Coupon' : 'Step 1 — Apply coupon'}</span>
        </div>

        {!isSidebar && hasAvailableCoupons && !appliedCoupon && (
          <p className="ce-coupon-available-note">
            {availableCoupons.length} active coupon{availableCoupons.length !== 1 ? 's' : ''} available
            {availableCoupons[0]?.code ? ` — try ${availableCoupons.slice(0, 2).map((c) => c.code).join(' or ')}` : ''}
          </p>
        )}

        <div className={isSidebar ? 'coupon-input-row' : 'ce-modal-coupon-row'}>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder={appliedCoupon ? 'Coupon applied' : 'Enter coupon code'}
            disabled={Boolean(appliedCoupon)}
          />
          <button
            type="button"
            className={isSidebar ? 'coupon-apply-btn' : 'ce-modal-coupon-btn'}
            onClick={() => (appliedCoupon ? removeCoupon() : handleCouponApply())}
            disabled={couponLoading}
          >
            {couponLoading ? 'Checking...' : appliedCoupon ? 'Remove' : 'Apply'}
          </button>
        </div>

        {couponStatus && (
          <div className={`${isSidebar ? 'coupon-status' : 'ce-modal-coupon-status'} ${couponStatus.type}`}>
            <CheckCircle2 size={16} />
            <span>{couponStatus.message}</span>
          </div>
        )}

        {appliedCoupon && (
          <div className={isSidebar ? 'coupon-chip' : 'ce-modal-coupon-chip'}>
            <Percent size={16} />
            <span>Coupon {appliedCoupon.code} applied — you pay ₹{getPayableAmount()}</span>
          </div>
        )}

        {!appliedCoupon && isSidebar && hasAvailableCoupons && (
          <p className="ce-coupon-sidebar-hint">
            Apply a coupon here, then click Buy Now to checkout.
          </p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF6EE' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <style>{`
        .course-detail-page {
          background: var(--site-bg);
          min-height: 100vh;
          padding-bottom: clamp(1rem, 2vw, 1.5rem);
        }

        .course-detail-page + .fb-root {
          margin-top: clamp(1.25rem, 2.5vw, 2rem);
        }

        .detail-hero {
          background: linear-gradient(135deg, #2A0F02 0%, #8B4A1E 100%);
          padding: clamp(2.75rem, 5vw, 4.25rem) 0 clamp(3rem, 5vw, 4.5rem);
          color: #FFF;
          position: relative;
          overflow: hidden;
        }

        .detail-hero::before {
          content: none;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://www.transparenttextures.com/patterns/stardust.png');
          opacity: 0.3;
          animation: drift 60s linear infinite;
        }

        @keyframes drift {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }

        .hero-decoration {
          display: none;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }

        .back-link {
          color: #FFFFFF !important;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          transition: all 0.3s ease;
          position: relative;
          z-index: 5;
        }

        .back-link:hover {
          color: #C8832A;
          transform: translateX(-5px);
        }

        .detail-hero h1 {
          font-family: var(--font-heading);
          color: #FFFFFF !important;
          font-size: clamp(2.4rem, 4.5vw, 4.25rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
          text-shadow: 0 2px 12px rgba(0,0,0,0.28);
        }

        .hero-meta {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .hero-meta-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.62rem 0.95rem;
          border-radius: var(--radius-control);
          font-size: 0.9rem;
          color: #FFFFFF !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
        }

        .hero-meta-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          border-color: #C8832A;
        }

        .hero-meta-item i {
          color: #C8832A;
          font-size: 1.1rem;
        }

        .detail-hero-img {
          width: min(100%, 18rem);
          height: min(50vw, 18rem);
          object-fit: cover;
          border-radius: var(--radius-card);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 18px 38px rgba(0,0,0,0.32);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        .main-content {
          margin-top: clamp(1.5rem, 3vw, 2.5rem);
          position: relative;
          z-index: 1;
          padding-bottom: clamp(1rem, 2.5vw, 1.75rem);
        }

        .course-detail-layout {
          align-items: flex-start;
        }

        .content-card {
          background: var(--site-surface);
          border-radius: var(--radius-card);
          padding: clamp(1.35rem, 3vw, 2.15rem);
          box-shadow: var(--shadow-card);
          border: 1px solid var(--site-border);
          position: relative;
          z-index: 0;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }

        .content-card:hover {
          box-shadow: var(--shadow-card-hover);
        }

        .section-title {
          font-family: var(--font-heading) !important;
          font-size: var(--h2-size) !important;
          color: var(--site-text) !important;
          margin-bottom: 1.15rem;
          position: relative;
          padding-bottom: 0.75rem;
          font-weight: 700 !important;
        }

        .content-card .section-title:not(:first-child) {
          margin-top: clamp(1.75rem, 3vw, 2.35rem);
        }

        .text-gradient {
          background: linear-gradient(135deg, #8B4A1E, #C8832A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 4.5rem;
          height: 3px;
          background: linear-gradient(90deg, #C8832A, transparent);
          border-radius: 2px;
        }

        .description-text {
          font-size: var(--body-size);
          line-height: 1.65;
          color: var(--site-muted);
          margin-bottom: 0;
          position: relative;
          padding-left: 20px;
          border-left: 3px solid rgba(200, 131, 42, 0.2);
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 0.9rem;
          margin-bottom: 0;
        }

        .topic-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: #FFFBF5;
          padding: 0.9rem 1rem;
          border-radius: var(--radius-control);
          border: 1px solid var(--site-border);
          transition: all 0.25s ease;
        }

        .topic-item:hover {
          transform: translateY(-2px);
          border-color: #C8832A;
          background: #FDF6EE;
          box-shadow: 0 10px 20px rgba(200, 131, 42, 0.08);
        }

        .topic-item i {
          color: #C8832A;
          font-size: 1.2rem;
        }

        .topic-item span {
          font-weight: 600;
          color: #2A0F02;
          font-size: 1rem;
        }

        .enroll-sidebar {
          position: sticky;
          top: 6rem;
          z-index: 5;
          margin-bottom: 1.5rem;
          margin-left: 0;
        }

        .enroll-card {
          background: linear-gradient(135deg, #2A0F02 0%, #1a0a01 100%);
          color: #FFF;
          padding: clamp(1.25rem, 3vw, 1.8rem);
          border-radius: var(--radius-card);
          text-align: center;
          box-shadow: 0 18px 42px rgba(42, 15, 2, 0.22);
          border: 1px solid rgba(200, 131, 42, 0.15);
          position: relative;
          overflow: hidden;
        }

        .enroll-card::before {
          content: '✨';
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 2rem;
          opacity: 0.2;
        }

        .enroll-card h4 {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .enroll-card::before {
          display: none;
        }

        .coupon-box {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: var(--radius-control);
          padding: 0.9rem;
          margin-bottom: 1rem;
          text-align: left;
          color: #FFFFFF;
          backdrop-filter: blur(10px);
        }

        .coupon-box-head {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.7rem;
          font-weight: 700;
          color: #fff;
        }

        .coupon-input-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.55rem;
          margin-bottom: 0.7rem;
        }

        .coupon-input-row input {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: var(--radius-control);
          padding: 0.7rem 0.8rem;
          background: rgba(255,255,255,0.12);
          color: #fff;
          outline: none;
        }

        .coupon-input-row input::placeholder {
          color: rgba(255,255,255,0.65);
        }

        .coupon-apply-btn {
          background: #C8832A;
          color: #fff;
          border: none;
          border-radius: var(--radius-control);
          padding: 0.7rem 0.9rem;
          font-weight: 700;
          cursor: pointer;
        }

        .coupon-apply-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .coupon-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-size: 0.9rem;
          padding: 0.65rem 0.8rem;
          border-radius: var(--radius-control);
          background: rgba(255,255,255,0.08);
        }

        .coupon-status.success {
          border: 1px solid rgba(82, 196, 26, 0.35);
          background: rgba(82, 196, 26, 0.15);
        }

        .coupon-status.error {
          border: 1px solid rgba(255, 80, 80, 0.35);
          background: rgba(255, 80, 80, 0.15);
        }

        .coupon-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          color: #fff;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.18);
        }

        .enroll-price {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
          color: #C8832A;
          text-shadow: 0 0 20px rgba(200, 131, 42, 0.3);
        }

        .coupon-price-note {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 0.8rem;
        }

        .coupon-price-note span {
          color: rgba(255, 255, 255, 0.62);
          font-size: 0.82rem;
          text-decoration: line-through;
        }

        .coupon-price-note strong {
          background: rgba(200, 131, 42, 0.16);
          border: 1px solid rgba(200, 131, 42, 0.28);
          border-radius: 999px;
          color: #ffd9a1;
          font-size: 0.8rem;
          padding: 0.2rem 0.55rem;
        }

        .enroll-sub {
          font-size: 0.95rem;
          color: #F9E6C8 !important;
          opacity: 1;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .enroll-badge {
          display: inline-block;
          background: #C8832A;
          color: #FFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 0.8rem;
          letter-spacing: 1px;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .t-badge {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .t-badge i {
          color: #C8832A;
        }

        .sidebar-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 1rem;
        }

        .feature-icon-circle {
          width: 3.5rem;
          height: 3.5rem;
          background: #FDF6EE;
          border-radius: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          color: #C8832A;
          margin: 0 auto 0.9rem;
          box-shadow: 0 8px 18px rgba(200, 131, 42, 0.1);
          transition: all 0.3s ease;
        }

        .feature-icon-circle:hover {
          background: #C8832A;
          color: #FFF;
          transform: translateY(-2px);
        }

        .why-choose-box {
          background: #FDF6EE;
          padding: clamp(1.25rem, 4vw, 2rem);
          border-radius: var(--radius-card);
          border: 1px solid var(--site-border);
        }

        .why-item {
          display: flex;
          gap: 0.9rem;
          align-items: flex-start;
        }

        .why-icon {
          width: 40px;
          height: 40px;
          background: #FFF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C8832A;
          flex-shrink: 0;
          box-shadow: 0 5px 10px rgba(0,0,0,0.05);
        }

        .contact-small-card {
          background: var(--site-surface);
          padding: 1rem;
          border-radius: var(--radius-card);
          display: flex;
          align-items: center;
          gap: 0.9rem;
          border: 1px solid var(--site-border);
          box-shadow: var(--shadow-card);
        }

        .contact-small-card i {
          font-size: 1.5rem;
          color: #C8832A;
        }

        .mobile-cta {
          position: fixed;
          bottom: 15px;
          left: 15px;
          right: 15px;
          background: rgba(42, 15, 2, 0.95);
          backdrop-filter: blur(15px);
          padding: 0.8rem 1rem;
          border-radius: var(--radius-card);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          border: 1px solid rgba(200, 131, 42, 0.3);
          animation: none;
        }

        @keyframes mobileSlideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .mobile-cta p.small {
          color: #C8832A !important;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0;
        }

        .mobile-cta .btn-enquire {
          background: linear-gradient(135deg, #C8832A 0%, #8B4A1E 100%);
          color: #FFF;
          border: none;
          padding: 12px 28px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 0.95rem;
          box-shadow: 0 8px 20px rgba(200, 131, 42, 0.3);
          text-transform: uppercase;
          animation: none;
        }

        @keyframes ctaPulse {
          0% { box-shadow: 0 0 0 0 rgba(200, 131, 42, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(200, 131, 42, 0); }
          100% { box-shadow: 0 0 0 0 rgba(200, 131, 42, 0); }
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: #C8832A;
          color: #FFF;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          z-index: 2000;
          transition: all 0.3s ease;
          opacity: 0.9;
        }

        .back-to-top:hover {
          opacity: 1;
          transform: translateY(-5px);
          background: #2A0F02;
        }

        .enroll-btn {
          display: block;
          width: 100%;
          background: #FFF;
          color: #2A0F02;
          padding: 15px;
          border-radius: 15px;
          font-weight: 700;
          text-decoration: none;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          border: none;
        }

        .enroll-btn:hover {
          background: #C8832A;
          color: #FFF;
          transform: translateY(-3px);
        }

        .features-list {
          text-align: left;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .features-list i {
          color: #C8832A;
        }

        /* Course enquiry & checkout modals */
        .ce-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(42, 15, 2, 0.55);
          backdrop-filter: blur(10px);
          z-index: 100001;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .ce-modal-panel {
          background: #fff;
          max-width: 520px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 20px;
          padding: 1.75rem 1.5rem 1.5rem;
          position: relative;
          border: 1px solid rgba(139, 74, 30, 0.18);
          box-shadow: 0 24px 64px rgba(42, 15, 2, 0.22);
          scrollbar-width: thin;
        }

        .ce-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.25);
          background: #8B4A1E;
          color: #fff;
          font-size: 15px;
          line-height: 1;
          cursor: pointer;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 14px rgba(42, 15, 2, 0.25);
        }

        .ce-modal-close:hover {
          background: #C8832A;
          transform: rotate(90deg);
        }

        .ce-modal-header {
          padding-right: 2.75rem;
          margin-bottom: 1.25rem;
        }

        .ce-modal-header h3 {
          font-family: var(--font-heading, 'Bricolage Grotesque', serif);
          font-size: 1.5rem !important;
          font-weight: 800 !important;
          line-height: 1.2 !important;
          color: #2A0F02 !important;
          margin: 0 0 0.5rem !important;
          letter-spacing: -0.02em;
        }

        .ce-modal-header p {
          font-size: 0.9rem !important;
          line-height: 1.55 !important;
          color: #9B6640 !important;
          margin: 0 !important;
        }

        .ce-modal-form .form-group {
          margin-bottom: 0.95rem;
        }

        .ce-modal-form .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 700;
          color: #8B4A1E;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .ce-modal-form .form-group input,
        .ce-modal-form .form-group select,
        .ce-modal-form .form-group textarea {
          width: 100%;
          padding: 0.72rem 0.85rem;
          border-radius: 10px;
          border: 1.5px solid rgba(139, 74, 30, 0.14);
          background: #fff;
          outline: none;
          font-size: 0.95rem;
          color: #2A0F02;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .ce-modal-form .form-group input:disabled {
          background: #f5f0ea;
          color: #6f4a32;
        }

        .ce-modal-form .form-group input:focus,
        .ce-modal-form .form-group textarea:focus {
          border-color: #C8832A;
          box-shadow: 0 0 0 3px rgba(200, 131, 42, 0.12);
        }

        .ce-modal-form .form-group textarea {
          resize: vertical;
          min-height: 88px;
        }

        .ce-modal-form .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #2A0F02 0%, #8B4A1E 100%);
          color: #fff;
          padding: 0.9rem 1rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          margin-top: 0.35rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ce-modal-form .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(42, 15, 2, 0.18);
        }

        .ce-modal-form .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ce-modal-form .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ce-checkout-steps {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .ce-checkout-step {
          flex: 1;
          min-width: 8.5rem;
          text-align: center;
          padding: 0.55rem 0.65rem;
          border-radius: 10px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border: 1.5px solid rgba(139, 74, 30, 0.12);
          color: #9B6640;
          background: #fffbf5;
        }

        .ce-checkout-step.is-active {
          border-color: #C8832A;
          background: rgba(200, 131, 42, 0.12);
          color: #8B4A1E;
        }

        .ce-checkout-step.is-done {
          border-color: rgba(16, 185, 129, 0.35);
          background: #ecfdf5;
          color: #047857;
        }

        .ce-modal-coupon {
          background: #fffbf5;
          border: 1.5px dashed rgba(200, 131, 42, 0.35);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.1rem;
        }

        .ce-modal-coupon-head {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 0.65rem;
          font-weight: 800;
          color: #8B4A1E;
          font-size: 0.85rem;
        }

        .ce-coupon-available-note,
        .ce-coupon-sidebar-hint {
          margin: 0 0 0.65rem;
          font-size: 0.82rem;
          line-height: 1.45;
          color: #9B6640;
        }

        .ce-coupon-sidebar-hint {
          margin-top: 0.65rem;
          margin-bottom: 0;
        }

        .ce-modal-coupon-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.55rem;
          margin-bottom: 0.65rem;
        }

        .ce-modal-coupon-row input {
          width: 100%;
          border: 1.5px solid rgba(139, 74, 30, 0.14);
          border-radius: 10px;
          padding: 0.72rem 0.85rem;
          background: #fff;
          outline: none;
          font-size: 0.95rem;
          color: #2A0F02;
          text-transform: uppercase;
        }

        .ce-modal-coupon-btn {
          background: #C8832A;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.72rem 0.95rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .ce-modal-coupon-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .ce-modal-coupon-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          padding: 0.6rem 0.75rem;
          border-radius: 10px;
          margin-bottom: 0.5rem;
        }

        .ce-modal-coupon-status.success {
          color: #047857;
          background: #ecfdf5;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .ce-modal-coupon-status.error {
          color: #b91c1c;
          background: #fef2f2;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .ce-modal-coupon-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.55rem 0.75rem;
          border-radius: 999px;
          background: rgba(200, 131, 42, 0.12);
          color: #8B4A1E;
          font-weight: 700;
          font-size: 0.82rem;
          border: 1px solid rgba(200, 131, 42, 0.25);
        }

        .ce-order-summary {
          background: #f8f0e6;
          border: 1px solid rgba(139, 74, 30, 0.12);
          border-radius: 12px;
          padding: 0.95rem 1rem;
          margin-bottom: 1.1rem;
        }

        .ce-order-summary-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.9rem;
          color: #5C3D26;
          padding: 0.35rem 0;
        }

        .ce-order-summary-row.is-discount {
          color: #047857;
          font-weight: 700;
        }

        .ce-order-summary-row.is-total {
          border-top: 1px dashed rgba(139, 74, 30, 0.2);
          margin-top: 0.35rem;
          padding-top: 0.65rem;
          font-weight: 800;
          color: #2A0F02;
          font-size: 1rem;
        }

        .ce-coupon-promo-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 1rem;
        }

        .ce-coupon-promo-pill {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-radius: 999px;
          padding: 0.35rem 0.65rem;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .ce-coupon-promo-pill:hover:not(:disabled) {
          background: rgba(200, 131, 42, 0.35);
        }

        .ce-coupon-promo-pill:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        @media (max-width: 576px) {
          .ce-modal-panel {
            padding: 1.5rem 1.1rem 1.25rem;
            border-radius: 16px;
          }
          .ce-modal-header h3 {
            font-size: 1.3rem !important;
          }
          .ce-modal-form .row .col-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        @media (max-width: 1200px) {
          .content-card {
            padding: 1.5rem;
          }
          .enroll-card {
            padding: 1.35rem;
          }
          .section-title {
            font-size: var(--h2-size) !important;
          }
        }

        @media (max-width: 768px) {
          .detail-hero {
            padding: 2.5rem 0 2.75rem;
            text-align: center;
          }
          .hero-meta {
            justify-content: center;
            gap: 10px;
          }
          .hero-meta-item {
            padding: 0.5rem 0.72rem;
            font-size: 0.82rem;
            background: rgba(255, 255, 255, 0.05);
          }
          .main-content {
            margin-top: 1rem;
          }
          .section-title {
            font-size: clamp(1.8rem, 6vw, 2.2rem) !important;
            text-align: center;
            margin-bottom: 1.1rem;
          }
          .section-title::after {
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
          }
          .description-text {
            font-size: 1rem;
            padding-left: 0;
            border-left: none;
            text-align: center;
            line-height: 1.7;
          }
          .topic-item {
            padding: 0.82rem 0.9rem;
            justify-content: center;
          }
        }

        @media (max-width: 992px) {
          .main-content {
            margin-top: 1.25rem;
          }
          .enroll-sidebar {
            position: static;
            margin-top: 0;
            margin-left: 0;
          }
          .content-card {
            padding: 1.25rem;
            border-radius: var(--radius-card);
          }
          .back-to-top {
            right: 15px;
            bottom: 90px;
            width: 45px;
            height: 45px;
          }
        }
      `}</style>

      <section className="detail-hero">
        <div className="hero-decoration"></div>
        <div className="container site-container">
          <Link to="/courses" className="back-link" data-aos="fade-right">
            <i className="fas fa-arrow-left"></i> Back to Courses
          </Link>
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-up">
              <h1>{course.title}</h1>
              <div className="hero-meta">
                <div className="hero-meta-item" data-aos="zoom-in" data-aos-delay="100">
                  <i className="fas fa-clock"></i>
                  {course.duration}
                </div>
                <div className="hero-meta-item" data-aos="zoom-in" data-aos-delay="200">
                  <i className="fas fa-calendar-alt"></i>
                  {course.schedule}
                </div>
                <div className="hero-meta-item" data-aos="zoom-in" data-aos-delay="300">
                  <i className="fas fa-layer-group"></i>
                  {course.level}
                </div>
                {course.instructor && (
                  <div className="hero-meta-item" data-aos="zoom-in" data-aos-delay="350">
                    <i className="fas fa-chalkboard-teacher"></i>
                    {course.instructor}
                  </div>
                )}
                {isRecordedCourse && course.modulesCount > 0 && (
                  <div className="hero-meta-item" data-aos="zoom-in" data-aos-delay="400">
                    <i className="fas fa-book"></i>
                    {course.modulesCount} Modules
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 text-center d-none d-lg-block" data-aos="zoom-in" data-aos-delay="400">
              <img src={course.image} alt={course.title} className="detail-hero-img" />
            </div>
          </div>
        </div>
      </section>

      <div className="container site-container main-content">
        <div className="row g-4 course-detail-layout">
          <div className="col-lg-8" data-aos="fade-up">
            <div className="content-card">
              <h2 className="section-title">Course <span className="text-gradient">Overview</span></h2>
              <div className="description-text">
                {course.longDesc}
              </div>

              <h2 className="section-title" data-aos="fade-up">What You <span className="text-gradient">Will Learn</span></h2>
              <div className="topics-grid">
                {course.topics.map((topic, i) => (
                  <div key={i} className="topic-item" data-aos="fade-up" data-aos-delay={i * 50}>
                    <i className="fas fa-check-circle"></i>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>

              {course.curriculum?.length > 0 && (
                <>
                  <h2 className="section-title" data-aos="fade-up">Course <span className="text-gradient">Curriculum</span></h2>
                  <div className="topics-grid mb-4">
                    {course.curriculum.map((module, i) => (
                      <div key={i} className="topic-item" data-aos="fade-up" data-aos-delay={i * 50} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: 800, color: '#8B4A1E' }}>{module.title}</span>
                        {module.lessons?.length > 0 && (
                          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', fontSize: '0.9rem', color: '#5C3D26' }}>
                            {module.lessons.map((lesson, j) => (
                              <li key={j}>{lesson}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {isLiveCourse && course.batchDetails && (
                <>
                  <h2 className="section-title" data-aos="fade-up">Batch <span className="text-gradient">Details</span></h2>
                  <div className="why-choose-box mb-4" data-aos="fade-up">
                    <div className="row g-3">
                      {course.batchDetails.startDate && (
                        <div className="col-md-6"><strong>Start Date:</strong> {course.batchDetails.startDate}</div>
                      )}
                      {course.batchDetails.classCount && (
                        <div className="col-md-6"><strong>Classes:</strong> {course.batchDetails.classCount}</div>
                      )}
                      {course.batchDetails.classDuration && (
                        <div className="col-md-6"><strong>Duration:</strong> {course.batchDetails.classDuration}</div>
                      )}
                      {course.batchDetails.platform && (
                        <div className="col-md-6"><strong>Platform:</strong> {course.batchDetails.platform}</div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {course.instructor && (
                <>
                  <h2 className="section-title" data-aos="fade-up">Meet Your <span className="text-gradient">Instructor</span></h2>
                  <div className="why-choose-box mb-4" data-aos="fade-up">
                    <div className="d-flex gap-3 align-items-start flex-wrap">
                      {course.instructorImage && (
                        <img src={course.instructorImage} alt={course.instructor} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
                      )}
                      <div>
                        <h5 className="fw-bold mb-2">{course.instructor}</h5>
                        <p className="small mb-0 text-muted">{course.instructorBio || 'Expert astrologer and mentor at DS Institute.'}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <h2 className="section-title" data-aos="fade-up">Course <span className="text-gradient">Features</span></h2>
              <div className="row g-4 mb-4 course-features-row">
                {(isRecordedCourse
                  ? [
                      { icon: 'video', title: 'Secure Video Access', desc: 'Watch anytime from your dashboard' },
                      { icon: 'certificate', title: 'Certification', desc: 'Professional course completion certificate' },
                      { icon: 'headset', title: 'Student Support', desc: 'Guidance throughout your learning journey' },
                    ]
                  : [
                      { icon: 'broadcast-tower', title: 'Live Interactive Classes', desc: 'Step-by-step teaching method' },
                      { icon: 'user-graduate', title: 'Practical Training', desc: 'Real-world prediction techniques' },
                      { icon: 'headset', title: 'Ongoing Support', desc: 'Guidance even after course completion' },
                    ]
                ).map((f, i) => (
                  <div key={i} className="col-md-4 text-center" data-aos="zoom-in" data-aos-delay={i * 100}>
                    <div className="feature-icon-circle">
                      <i className={`fas fa-${f.icon}`}></i>
                    </div>
                    <h5 className="fw-bold">{f.title}</h5>
                    <p className="small text-muted">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Why Choose Us Section */}
              <div className="why-choose-box" data-aos="fade-up">
                <h3 className="mb-4">Why Study with DS Institute?</h3>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="why-item">
                      <div className="why-icon"><i className="fas fa-microchip"></i></div>
                      <div>
                        <h6>Scientific Approach</h6>
                        <p className="small mb-0">We combine ancient wisdom with modern logical explanations.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="why-item">
                      <div className="why-icon"><i className="fas fa-infinity"></i></div>
                      <div>
                        <h6>Lifetime Community</h6>
                        <p className="small mb-0">Join our alumni network for continuous learning and updates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {course.faqs?.length > 0 && (
                <>
                  <h2 className="section-title" data-aos="fade-up">Frequently Asked <span className="text-gradient">Questions</span></h2>
                  <div className="why-choose-box mb-4" data-aos="fade-up">
                    {course.faqs.map((faq, i) => (
                      <div key={i} className="mb-3 pb-3" style={{ borderBottom: i < course.faqs.length - 1 ? '1px solid rgba(200,131,42,0.15)' : 'none' }}>
                        <h6 className="fw-bold">{faq.question}</h6>
                        <p className="small mb-0 text-muted">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {course.testimonials?.length > 0 && (
                <>
                  <h2 className="section-title" data-aos="fade-up">Student <span className="text-gradient">Testimonials</span></h2>
                  <div className="row g-3 mb-4">
                    {course.testimonials.map((t, i) => (
                      <div key={i} className="col-md-6" data-aos="fade-up" data-aos-delay={i * 80}>
                        <div className="why-choose-box h-100">
                          <p className="small mb-2 fst-italic">&ldquo;{t.quote || t.text || t.message}&rdquo;</p>
                          <p className="small fw-bold mb-0">{t.name || t.author || 'Student'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-left" data-aos-delay="200">
            <div className="enroll-sidebar">
              <div className="enroll-card">
                <div className="enroll-badge">{canPayOnline ? 'LIMITED OFFER' : 'ENQUIRY ONLY'}</div>
                <h4>{canPayOnline ? 'Start Your Journey' : (isLiveCourse ? 'Request Batch Details' : 'Talk to Our Counsellor')}</h4>
                <div className="enroll-price">{canPayOnline ? `₹ ${getPayableAmount()}` : (course.price ? `From ₹ ${course.price}` : 'Enquiry Only')}</div>
                {canPayOnline && appliedCoupon && (
                  <div className="coupon-price-note">
                    <span>Original ₹{getCoursePrice()}</span>
                    <strong>Saved ₹{getDiscountAmount()}</strong>
                  </div>
                )}
                <p className="enroll-sub">
                  {canPayOnline
                    ? hasAvailableCoupons && !appliedCoupon
                      ? 'Apply your coupon below, then proceed to secure checkout.'
                      : appliedCoupon
                        ? `Coupon applied — checkout at ₹${getPayableAmount()}.`
                        : 'Full access to course contents after payment.'
                    : isLiveCourse
                      ? 'No online payment. Submit enquiry — sales team shares batch timing and fees.'
                      : paymentEnabled
                        ? 'Buy now for instant access. Login credentials will be emailed after payment.'
                        : 'Online checkout loading… submit enquiry if payment is unavailable.'}
                </p>

                {(isRecordedCourse || canPayOnline) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CourseTimer
                      courseId={courseId}
                      label={canPayOnline ? 'Offer closes in' : 'Enrolment window closes in'}
                    />
                  </motion.div>
                )}

                {canPayOnline && renderCouponControls('sidebar')}

                {canPayOnline && hasAvailableCoupons && (
                  <div className="ce-coupon-promo-pills">
                    {availableCoupons.slice(0, 3).map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        className="ce-coupon-promo-pill"
                        onClick={() => handleCouponApply(c.code)}
                        disabled={couponLoading || Boolean(appliedCoupon)}
                      >
                        {c.code} · {formatCouponOffer(c)}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  className="enroll-btn"
                  onClick={() => (canPayOnline ? initiateCheckout() : openEnquiryModal())}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment
                    ? 'WAIT...'
                    : (canPayOnline ? (appliedCoupon ? 'Checkout & Pay' : 'Buy Now') : 'Enquire Now')}
                  <i className="fas fa-chevron-right ms-2" />
                </button>

                <div className="trust-badges">
                  <div className="t-badge"><i className="fas fa-shield-alt"></i> Verified</div>
                  <div className="t-badge"><i className="fas fa-certificate"></i> Certified</div>
                  <div className="t-badge"><i className="fas fa-clock"></i> Lifetime</div>
                </div>

                <div className="sidebar-divider"></div>

                <ul className="features-list">
                  {[
                    ...(canPayOnline
                      ? [
                          { icon: 'certificate', text: 'Professional Certification' },
                          { icon: 'video', text: 'Secure Video Access' },
                          { icon: 'book-open', text: 'Exclusive Study Notes' },
                          { icon: 'whatsapp', text: 'Student Support Group', fab: true }
                        ]
                      : [
                          { icon: 'calendar-alt', text: isLiveCourse ? 'Live Batch Schedule Shared' : 'Counsellor Callback' },
                          { icon: 'book-open', text: 'Syllabus & Pricing Explained' },
                          { icon: 'phone-alt', text: 'Sales Team Follow-up Call' },
                          { icon: 'whatsapp', text: 'WhatsApp Support', fab: true }
                        ])
                  ].map((item, idx) => (
                    <li key={idx} data-aos="fade-left" data-aos-delay={300 + (idx * 100)}>
                      <i className={`${item.fab ? 'fab' : 'fas'} fa-${item.icon}`}></i> {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-small-card mt-4" data-aos="fade-up">
                <i className="fas fa-question-circle"></i>
                <div>
                  <p className="mb-0 fw-bold">Have Questions?</p>
                  <p className="mb-0 small text-muted">Call/WhatsApp: +91 75709 72970</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="mobile-cta d-lg-none">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            <p className="small">{isLiveCourse ? 'Live Course' : 'Recorded Course'}</p>
            <p className="mb-0 fw-bold text-white">{canPayOnline ? 'Buy Online' : 'Enquiry Only'}</p>
          </div>
          <button className="btn-enquire" onClick={() => (canPayOnline ? initiateCheckout() : openEnquiryModal())} disabled={isProcessingPayment}>
            {isProcessingPayment ? 'WAIT...' : (canPayOnline ? 'BUY NOW' : 'ENQUIRE NOW')}
          </button>
        </div>
      </div>

      {/* Back to Top */}
      <button 
        className="back-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        id="backToTop"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* Checkout / Razorpay — re-enable when RECORDED_PAYMENT_ENABLED is true */}
      {RECORDED_PAYMENT_ENABLED && showCheckoutModal && (
        <div className="ce-modal-overlay" onClick={() => setShowCheckoutModal(false)} role="dialog" aria-modal="true">
          <div className="ce-modal-panel" onClick={(e) => e.stopPropagation()} data-aos="zoom-in">
            <button type="button" className="ce-modal-close" onClick={() => setShowCheckoutModal(false)} aria-label="Close checkout">
              <i className="fas fa-times" aria-hidden="true" />
            </button>
            <div className="ce-modal-header">
              <h3>Secure Checkout</h3>
              <p>Apply your coupon first, review the total, then proceed to payment.</p>
            </div>

            <div className="ce-checkout-steps">
              <div className={`ce-checkout-step ${appliedCoupon || !hasAvailableCoupons ? 'is-done' : 'is-active'}`}>
                1. Apply coupon
              </div>
              <div className="ce-checkout-step is-active">
                2. Pay securely
              </div>
            </div>

            {renderCouponControls('modal')}

            <div className="ce-order-summary">
              <div className="ce-order-summary-row">
                <span>Course price</span>
                <span>₹{getCoursePrice()}</span>
              </div>
              {appliedCoupon && (
                <div className="ce-order-summary-row is-discount">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>- ₹{getDiscountAmount()}</span>
                </div>
              )}
              <div className="ce-order-summary-row is-total">
                <span>Amount to pay</span>
                <span>₹{getPayableAmount()}</span>
              </div>
            </div>

            <form className="ce-modal-form" onSubmit={handlePayment}>
              <div className="form-group">
                <label>Selected Course</label>
                <input type="text" value={course.title} disabled readOnly />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  maxLength="10"
                  pattern="[6-9][0-9]{9}"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required />
              </div>
              <button type="submit" className="submit-btn" disabled={isProcessingPayment}>
                {isProcessingPayment ? 'Initializing...' : `Proceed to Pay ₹${getPayableAmount()}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {showEnquiryModal && (
        <div className="ce-modal-overlay" onClick={() => setShowEnquiryModal(false)} role="dialog" aria-modal="true">
          <div className="ce-modal-panel" onClick={(e) => e.stopPropagation()} data-aos="zoom-in">
            <button type="button" className="ce-modal-close" onClick={() => setShowEnquiryModal(false)} aria-label="Close enquiry form">
              <i className="fas fa-times" aria-hidden="true" />
            </button>
            <div className="ce-modal-header">
              <h3>Course Enquiry</h3>
              <p>Fill out this form and our team will get in touch with you.</p>
            </div>

            <form className="ce-modal-form" onSubmit={handleEnquirySubmit}>
              <div className="form-group">
                <label>Selected Course</label>
                <input type="text" value={course.title} disabled readOnly />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={enquiryData.name} onChange={handleEnquiryChange} placeholder="Your Name" required />
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={enquiryData.phone} onChange={handleEnquiryChange} placeholder="10 Digit Phone" inputMode="numeric" maxLength="10" pattern="[6-9][0-9]{9}" required />
                </div>
                <div className="col-6 form-group">
                  <label>Age</label>
                  <input type="number" name="age" value={enquiryData.age} onChange={handleEnquiryChange} placeholder="Age" required />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={enquiryData.email} onChange={handleEnquiryChange} placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={enquiryData.city} onChange={handleEnquiryChange} placeholder="Your City" required />
              </div>
              <div className="form-group">
                <label>Interest</label>
                <input type="text" name="interest" value={enquiryData.interest} onChange={handleEnquiryChange} placeholder="e.g. prediction, career, marriage, professional practice" required />
              </div>
              <div className="form-group">
                <label>Notes <span className="text-muted">(Optional)</span></label>
                <textarea name="message" value={enquiryData.message} onChange={handleEnquiryChange} placeholder="Any preferred timing or question for our team?" rows="3"></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default CourseDetail;
