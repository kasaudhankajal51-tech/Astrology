import Course from '../models/Course.js';
import CourseVideo from '../models/CourseVideo.js';
import mongoose from 'mongoose';
import {
  createBunnyVideo,
  extractBunnyVideoId,
  getBunnyEmbedUrl,
  getBunnyLibraryId,
  uploadBunnyVideoFile
} from '../utils/bunnyHelper.js';

// @desc    Get all active courses (Public)
// @route   GET /api/courses
export const getActiveCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    const videoCounts = await CourseVideo.aggregate([
      { $match: { courseId: { $in: courses.map((course) => course._id) } } },
      { $group: { _id: '$courseId', count: { $sum: 1 } } }
    ]);
    const videoCountByCourseId = new Map(videoCounts.map((item) => [String(item._id), item.count]));
    const coursesWithVideoCounts = courses.map((course) => ({
      ...course,
      videoCount: videoCountByCourseId.get(String(course._id)) || 0
    }));

    res.json({ success: true, courses: coursesWithVideoCounts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get course by ID (Public)
// @route   GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Course not found (Invalid ID)' });
    }
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

    if (!title || !bunnyVideoId) {
      return res.status(400).json({ success: false, message: 'Video title and Bunny.net video ID or URL are required' });
    }

    const cleanBunnyVideoId = extractBunnyVideoId(bunnyVideoId);
    const bunnyLibraryId = getBunnyLibraryId();
    const video = await CourseVideo.create({
      courseId,
      title,
      bunnyVideoId: cleanBunnyVideoId,
      videoProvider: 'bunny',
      bunnyLibraryId,
      sourceType: 'bunny-id',
      sortOrder: Number(sortOrder) || 0
    });

    res.status(201).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Upload video to Bunny Stream and add it to a course (Admin)
// @route   POST /api/admin/courses/:id/videos/upload
export const uploadCourseVideo = async (req, res) => {
  try {
    const { title, sortOrder } = req.body;
    const courseId = req.params.id;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Video title is required' });
    }

    if (!req.file?.buffer) {
      return res.status(400).json({ success: false, message: 'Video file is required' });
    }

    const bunnyVideo = await createBunnyVideo(title);
    const uploadResult = await uploadBunnyVideoFile(bunnyVideo.guid, req.file.buffer);

    const video = await CourseVideo.create({
      courseId,
      title,
      bunnyVideoId: bunnyVideo.guid,
      videoProvider: 'bunny',
      bunnyLibraryId: getBunnyLibraryId(),
      bunnyStatus: bunnyVideo.status ?? null,
      bunnyEncodeProgress: bunnyVideo.encodeProgress ?? null,
      sourceType: 'upload',
      sortOrder: Number(sortOrder) || 0
    });

    res.status(201).json({
      success: true,
      message: uploadResult.message || 'Video uploaded to Bunny.net',
      video,
      bunny: {
        guid: bunnyVideo.guid,
        status: bunnyVideo.status,
        encodeProgress: bunnyVideo.encodeProgress
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Bunny upload failed' });
  }
};

// @desc    Update or replace a course video (Admin)
// @route   PUT /api/admin/courses/:id/videos/:vid
export const updateCourseVideo = async (req, res) => {
  try {
    const { title, bunnyVideoId, sortOrder } = req.body;
    const courseId = req.params.id;
    const video = await CourseVideo.findOne({ _id: req.params.vid, courseId });

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    if (title) video.title = title;
    if (sortOrder !== undefined) video.sortOrder = Number(sortOrder) || 0;

    let cleanBunnyVideoId = bunnyVideoId ? extractBunnyVideoId(bunnyVideoId) : video.bunnyVideoId;
    if (!cleanBunnyVideoId && !req.file?.buffer) {
      return res.status(400).json({ success: false, message: 'Bunny.net video ID or URL is required' });
    }

    if (req.file?.buffer) {
      if (!cleanBunnyVideoId) {
        const bunnyVideo = await createBunnyVideo(title || video.title);
        cleanBunnyVideoId = bunnyVideo.guid;
        video.bunnyStatus = bunnyVideo.status ?? null;
        video.bunnyEncodeProgress = bunnyVideo.encodeProgress ?? null;
      }
      await uploadBunnyVideoFile(cleanBunnyVideoId, req.file.buffer);
      video.sourceType = 'upload';
    } else if (bunnyVideoId) {
      video.sourceType = 'bunny-id';
    }

    video.bunnyVideoId = cleanBunnyVideoId;
    video.videoProvider = 'bunny';
    video.bunnyLibraryId = getBunnyLibraryId();
    await video.save();

    res.json({ success: true, message: 'Video updated successfully', video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Video update failed' });
  }
};

// @desc    Get signed admin preview URL for a course video
// @route   GET /api/admin/courses/:id/videos/:vid/preview
export const getAdminCourseVideoPreview = async (req, res) => {
  try {
    const courseId = req.params.id;
    const video = await CourseVideo.findOne({ _id: req.params.vid, courseId });

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    if (!video.bunnyVideoId) {
      return res.status(400).json({ success: false, message: 'No Bunny video ID saved for this video' });
    }

    const embedUrl = getBunnyEmbedUrl(video.bunnyVideoId, 3600);
    res.json({
      success: true,
      video: {
        _id: video._id,
        title: video.title,
        bunnyVideoId: video.bunnyVideoId,
        videoProvider: video.videoProvider || 'bunny',
        embedUrl
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to create video preview' });
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
