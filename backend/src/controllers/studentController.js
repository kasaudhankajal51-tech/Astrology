import Course from '../models/Course.js';
import CourseVideo from '../models/CourseVideo.js';
import Enrollment from '../models/Enrollment.js';
import Consultation from '../models/Consultation.js';
import { generateBunnyToken } from '../utils/bunnyHelper.js';

// Get all active courses the student is enrolled in
export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ 
      userId: req.user._id,
      isActive: true,
      validUntil: { $gte: new Date() } // Ensure it hasn't expired
    }).populate('courseId');

    // Filter out any enrollments where the course was deleted
    const validCourses = enrollments.filter(e => e.courseId).map(e => ({
      enrollmentId: e._id,
      validUntil: e.validUntil,
      course: e.courseId
    }));

    res.json({ success: true, enrollments: validCourses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a specific course and its secure videos (ONLY if enrolled and valid)
export const getCoursePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check enrollment
    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: id,
      isActive: true,
      validUntil: { $gte: new Date() }
    });

    if (!enrollment) {
      return res.status(403).json({ success: false, message: 'You do not have active access to this course.' });
    }

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const videos = await CourseVideo.find({ courseId: id }).sort('sortOrder');

    const libraryId = process.env.BUNNY_LIBRARY_ID || 'your_library_id';

    // Generate secure links for each video
    const secureVideos = videos.map(video => {
      // If we don't have a token key, just return standard URL
      const tokenQuery = generateBunnyToken(video.bunnyVideoId, 7200); // 2 hour validity per load
      return {
        _id: video._id,
        title: video.title,
        sortOrder: video.sortOrder,
        secureUrl: `https://iframe.mediadelivery.net/embed/${libraryId}/${video.bunnyVideoId}${tokenQuery}`
      };
    });

    res.json({
      success: true,
      course: {
        _id: course._id,
        title: course.title,
        description: course.description
      },
      validUntil: enrollment.validUntil,
      videos: secureVideos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Book a complimentary consultation for an enrolled course
export const bookCourseConsultation = async (req, res) => {
  try {
    const { courseId, preferredDatetime, notes, mobile } = req.body;

    // Check enrollment
    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: courseId,
      isActive: true
    });

    if (!enrollment) {
      return res.status(403).json({ success: false, message: 'Active enrollment required to book consultation.' });
    }

    // Check if they already booked one for this course
    const existing = await Consultation.findOne({ user: req.user._id, courseId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already booked a consultation for this course.' });
    }

    const consultation = await Consultation.create({
      name: req.user.name,
      email: req.user.email,
      mobile: mobile || 'N/A', // Assuming user profile has mobile, or they passed it
      userId: req.user._id,
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
