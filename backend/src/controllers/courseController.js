import Course from '../models/Course.js';
import CourseVideo from '../models/CourseVideo.js';

// @desc    Get all active courses (Public)
// @route   GET /api/courses
export const getActiveCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get course by ID (Public)
// @route   GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    const videos = await CourseVideo.find({ courseId: course._id }).sort({ sortOrder: 1 });
    res.json({ success: true, course, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a new course (Admin)
// @route   POST /api/admin/courses
export const createCourse = async (req, res) => {
  try {
    const { title, description, price, validityDays, thumbnailUrl } = req.body;
    const course = await Course.create({ title, description, price, validityDays, thumbnailUrl });
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update a course (Admin)
// @route   PUT /api/admin/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Soft delete a course (Admin)
// @route   DELETE /api/admin/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Add video to course (Admin)
// @route   POST /api/admin/courses/:id/videos
export const addCourseVideo = async (req, res) => {
  try {
    const { title, bunnyVideoId, sortOrder } = req.body;
    const courseId = req.params.id;
    const video = await CourseVideo.create({ courseId, title, bunnyVideoId, sortOrder });
    res.status(201).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Reorder course videos (Admin)
// @route   PUT /api/admin/courses/:id/videos/reorder
export const reorderVideos = async (req, res) => {
  try {
    const { videoOrders } = req.body; // Array of { videoId, sortOrder }
    if (!Array.isArray(videoOrders)) {
      return res.status(400).json({ success: false, message: 'videoOrders must be an array' });
    }

    const updatePromises = videoOrders.map(item =>
      CourseVideo.findByIdAndUpdate(item.videoId, { sortOrder: item.sortOrder })
    );
    await Promise.all(updatePromises);
    res.json({ success: true, message: 'Videos reordered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete video from course (Admin)
// @route   DELETE /api/admin/courses/:id/videos/:vid
export const deleteCourseVideo = async (req, res) => {
  try {
    const video = await CourseVideo.findByIdAndDelete(req.params.vid);
    if (!video) return res.status(404).json({ success: false, message: 'Video not found' });
    res.json({ success: true, message: 'Video removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
