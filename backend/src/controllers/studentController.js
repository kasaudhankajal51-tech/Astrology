import Course from '../models/Course.js';
import CourseVideo from '../models/CourseVideo.js';
import Enrollment from '../models/Enrollment.js';
import Consultation from '../models/Consultation.js';
import User from '../models/User.js';
import CourseMaterial from '../models/CourseMaterial.js';
import Banner from '../models/Banner.js';
import Merchandise from '../models/Merchandise.js';
import Offer from '../models/Offer.js';
import { generateBunnyToken } from '../utils/bunnyHelper.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 1. Student Authentication
export const studentLogin = async (req, res) => {
  const { email, mobile, password } = req.body;
  try {
    let user;
    if (email) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    } else if (mobile) {
      user = await User.findOne({ mobile: mobile.trim() });
    }

    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'astro-admin-secret-2026',
      { expiresIn: '30d' }
    );

    res.status(200).json({ success: true, token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const studentLogout = async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// 2. Student Profile
export const getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    res.json({
      success: true,
      profile: {
        studentId: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile || '',
        profileImage: user.profileImage || ''
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const { name, mobile, profileImage } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (profileImage) user.profileImage = profileImage;
    
    await user.save();
    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      profile: {
        studentId: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile || '',
        profileImage: user.profileImage || ''
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Purchased Courses
export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ 
      userId: req.user.id,
      isActive: true,
      validUntil: { $gte: new Date() }
    }).populate('courseId');

    const mappedCourses = await Promise.all(enrollments.filter(e => e.courseId).map(async (e) => {
      // Calculate progress
      const totalVideos = await CourseVideo.countDocuments({ courseId: e.courseId._id });
      const completedCount = e.progress && e.progress.completedVideos ? e.progress.completedVideos.length : 0;
      const progressPercent = totalVideos === 0 ? 0 : Math.round((completedCount / totalVideos) * 100);

      return {
        courseId: e.courseId._id,
        courseTitle: e.courseId.title,
        thumbnail: e.courseId.thumbnailUrl || '',
        purchaseDate: e.purchasedAt,
        validTill: e.validUntil,
        courseType: e.courseId.courseType || 'Recorded',
        progress: progressPercent
      };
    }));

    res.json({ success: true, courses: mappedCourses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId,
      isActive: true,
      validUntil: { $gte: new Date() }
    }).populate('courseId');

    if (!enrollment || !enrollment.courseId) {
      return res.status(403).json({ success: false, message: 'You do not have active access to this course.' });
    }

    const totalVideos = await CourseVideo.countDocuments({ courseId });
    const completedCount = enrollment.progress && enrollment.progress.completedVideos ? enrollment.progress.completedVideos.length : 0;
    const progressPercent = totalVideos === 0 ? 0 : Math.round((completedCount / totalVideos) * 100);

    res.json({
      success: true,
      course: {
        courseId: enrollment.courseId._id,
        courseTitle: enrollment.courseId.title,
        thumbnail: enrollment.courseId.thumbnailUrl || '',
        purchaseDate: enrollment.purchasedAt,
        validTill: enrollment.validUntil,
        courseType: enrollment.courseId.courseType || 'Recorded',
        progress: progressPercent
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Course Videos
export const getCourseVideos = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId,
      isActive: true,
      validUntil: { $gte: new Date() }
    });

    if (!enrollment) {
      return res.status(403).json({ success: false, message: 'You do not have active access to this course.' });
    }

    const videos = await CourseVideo.find({ courseId }).sort('sortOrder');
    const libraryId = process.env.BUNNY_LIBRARY_ID || 'your_library_id';
    
    const completedIds = enrollment.progress && enrollment.progress.completedVideos 
      ? enrollment.progress.completedVideos.map(id => id.toString()) 
      : [];

    const mappedVideos = videos.map(video => {
      const tokenQuery = generateBunnyToken(video.bunnyVideoId, 7200);
      return {
        videoId: video._id,
        title: video.title,
        videoUrl: `https://iframe.mediadelivery.net/embed/${libraryId}/${video.bunnyVideoId}${tokenQuery}`,
        duration: '00:00', // Default if duration not available
        isCompleted: completedIds.includes(video._id.toString())
      };
    });

    res.json({ success: true, videos: mappedVideos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateVideoProgress = async (req, res) => {
  try {
    const { videoId, courseId } = req.body;
    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId,
      isActive: true
    });

    if (!enrollment) return res.status(403).json({ success: false, message: 'Not enrolled in this course.' });

    if (!enrollment.progress) enrollment.progress = { completedVideos: [] };
    if (!enrollment.progress.completedVideos) enrollment.progress.completedVideos = [];

    const isAlreadyCompleted = enrollment.progress.completedVideos.some(id => id.toString() === videoId);
    if (!isAlreadyCompleted) {
      enrollment.progress.completedVideos.push(videoId);
      await enrollment.save();
    }

    res.json({ success: true, message: 'Progress updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Course Validity
export const getCourseValidity = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId,
      isActive: true
    });

    if (!enrollment) return res.status(403).json({ success: false, message: 'Not enrolled.' });

    const now = new Date();
    const validTill = enrollment.validUntil;
    const timeDiff = validTill.getTime() - now.getTime();
    const daysRemaining = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 3600 * 24)) : 0;

    res.json({
      success: true,
      validity: {
        courseId,
        validFrom: enrollment.purchasedAt,
        validTill,
        daysRemaining
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. Course Materials
export const getCourseMaterials = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId,
      isActive: true,
      validUntil: { $gte: new Date() }
    });

    if (!enrollment) return res.status(403).json({ success: false, message: 'Not enrolled.' });

    const materials = await CourseMaterial.find({ courseId });
    const mapped = materials.map(m => ({
      materialId: m._id,
      title: m.title,
      fileType: m.fileType,
      fileUrl: m.fileUrl
    }));

    res.json({ success: true, materials: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7. Promotional Banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true });
    const mapped = banners.map(b => ({
      bannerId: b._id,
      title: b.title,
      image: b.image,
      redirectLink: b.redirectLink || ''
    }));
    res.json({ success: true, banners: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8. Merchandise Promotions
export const getMerchandise = async (req, res) => {
  try {
    const merch = await Merchandise.find({ isActive: true });
    const mapped = merch.map(m => ({
      productId: m._id,
      title: m.title,
      image: m.image,
      price: m.price
    }));
    res.json({ success: true, merchandise: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 9. New Course Launches
export const getNewCourses = async (req, res) => {
  try {
    const newCourses = await Course.find({ isActive: true }).sort({ launchDate: -1, createdAt: -1 }).limit(5);
    const mapped = newCourses.map(c => ({
      courseId: c._id,
      title: c.title,
      thumbnail: c.thumbnailUrl || '',
      launchDate: c.launchDate || c.createdAt
    }));
    res.json({ success: true, newCourses: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 10. Offers & Discounts
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true, validTill: { $gte: new Date() } });
    const mapped = offers.map(o => ({
      offerId: o._id,
      title: o.title,
      discount: o.discount,
      validTill: o.validTill
    }));
    res.json({ success: true, offers: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bookCourseConsultation = async (req, res) => {
  try {
    const { courseId, preferredDatetime, notes, mobile } = req.body;

    const enrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId: courseId,
      isActive: true
    });

    if (!enrollment) {
      return res.status(403).json({ success: false, message: 'Active enrollment required to book consultation.' });
    }

    const existing = await Consultation.findOne({ userId: req.user.id, courseId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already booked a consultation for this course.' });
    }

    const fetchedUser = await User.findById(req.user.id);
    if (!fetchedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const consultation = await Consultation.create({
      name: fetchedUser.name,
      email: fetchedUser.email,
      mobile: mobile || fetchedUser.mobile || 'N/A',
      userId: req.user.id,
      courseId: courseId,
      preferredDatetime,
      notes,
      status: 'pending'
    });

    res.status(201).json({ success: true, consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
