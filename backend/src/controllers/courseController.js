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

const formatInstructor = (instructor) => {
  if (!instructor) return '';
  if (typeof instructor === 'string') return instructor;
  return {
    name: instructor.name || '',
    bio: instructor.bio || '',
    image: instructor.image || '',
  };
};

const formatCourseListItem = (course, modulesCount, videoCount) => ({
  _id: course._id,
  title: course.title,
  description: course.description || '',
  thumbnailUrl: course.thumbnailUrl || '',
  price: course.price,
  courseType: course.courseType === 'Live' ? 'Live' : 'Recorded',
  validityDays: course.validityDays,
  level: course.level || 'Beginner',
  instructor: formatInstructor(course.instructor),
  duration: course.duration || '',
  modulesCount: modulesCount ?? course.modulesCount ?? 0,
  videoCount: videoCount ?? modulesCount ?? course.modulesCount ?? 0,
  isActive: course.isActive,
});

const formatCourseDetail = (course, modulesCount) => ({
  _id: course._id,
  title: course.title,
  description: course.description || '',
  thumbnailUrl: course.thumbnailUrl || '',
  price: course.price,
  courseType: course.courseType === 'Live' ? 'Live' : 'Recorded',
  validityDays: course.validityDays,
  level: course.level || 'Beginner',
  instructor: formatInstructor(course.instructor),
  duration: course.duration || '',
  modulesCount: modulesCount ?? course.modulesCount ?? 0,
  topics: course.topics || [],
  longDesc: course.longDesc || course.description || '',
  curriculum: course.curriculum || [],
  learningOutcomes: course.learningOutcomes || [],
  batchDetails: course.batchDetails || null,
  faqs: course.faqs || [],
  testimonials: course.testimonials || [],
  isActive: course.isActive,
});

const formatPublicVideo = (video) => ({
  _id: video._id,
  title: video.title,
  sortOrder: video.sortOrder ?? 0,
  videoProvider: video.videoProvider || (video.bunnyVideoId ? 'bunny' : video.vdoCipherVideoId ? 'vdocipher' : 'supabase'),
  bunnyVideoId: video.bunnyVideoId || undefined,
  vdocipherVideoId: video.vdoCipherVideoId || undefined,
});

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
    const coursesWithVideoCounts = courses.map((course) => {
      const count = videoCountByCourseId.get(String(course._id)) || course.modulesCount || 0;
      return formatCourseListItem(course, count, count);
    });

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
    const course = await Course.findById(req.params.id).lean();
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    const videoCount = await CourseVideo.countDocuments({ courseId: course._id });
    const videos = await CourseVideo.find({ courseId: course._id }).sort({ sortOrder: 1 });
    res.json({
      success: true,
      course: formatCourseDetail(course, videoCount || course.modulesCount || 0),
      videos: videos.map(formatPublicVideo),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create a new course (Admin)
// @route   POST /api/admin/courses
export const createCourse = async (req, res) => {
  try {
    const {
      title, description, price, validityDays, thumbnailUrl, courseType,
      level, instructor, duration, modulesCount, curriculum,
      learningOutcomes, batchDetails, faqs, testimonials, topics, longDesc,
    } = req.body;
    const normalizedCourseType = courseType === 'Live' ? 'Live' : 'Recorded';
    const course = await Course.create({
      title,
      description,
      longDesc,
      topics,
      price,
      validityDays,
      thumbnailUrl,
      courseType: normalizedCourseType,
      level,
      instructor,
      duration,
      modulesCount,
      curriculum,
      learningOutcomes,
      batchDetails,
      faqs,
      testimonials,
    });
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

const isSupabaseProvider = (provider) => provider === 'supabase';

// @desc    Add video to course (Admin)
// @route   POST /api/admin/courses/:id/videos
export const addCourseVideo = async (req, res) => {
  try {
    const {
      title,
      bunnyVideoId,
      vdocipherVideoId,
      videoProvider = 'bunny',
      videoUrl,
      storagePath,
      storageBucket,
      sortOrder,
    } = req.body;
    const courseId = req.params.id;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Video title is required' });
    }

    if (isSupabaseProvider(videoProvider)) {
      if (!videoUrl) {
        return res.status(400).json({ success: false, message: 'Video URL is required after Supabase upload' });
      }

      const video = await CourseVideo.create({
        courseId,
        title,
        videoProvider: 'supabase',
        videoUrl,
        storagePath: storagePath || '',
        storageBucket: storageBucket || '',
        sourceType: 'supabase',
        status: 'ready',
        sortOrder: Number(sortOrder) || 0,
      });

      return res.status(201).json({ success: true, video });
    }

    if (videoProvider === 'vdocipher') {
      if (!vdocipherVideoId) {
        return res.status(400).json({ success: false, message: 'VdoCipher video ID is required' });
      }

      const video = await CourseVideo.create({
        courseId,
        title,
        vdoCipherVideoId: vdocipherVideoId,
        videoProvider: 'vdocipher',
        sourceType: 'bunny-id',
        status: 'ready',
        sortOrder: Number(sortOrder) || 0,
      });

      return res.status(201).json({ success: true, video });
    }

    if (!bunnyVideoId) {
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
      status: 'ready',
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
    const {
      title,
      bunnyVideoId,
      vdocipherVideoId,
      videoProvider,
      videoUrl,
      storagePath,
      storageBucket,
      sortOrder,
    } = req.body;
    const courseId = req.params.id;
    const video = await CourseVideo.findOne({ _id: req.params.vid, courseId });

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    if (title) video.title = title;
    if (sortOrder !== undefined) video.sortOrder = Number(sortOrder) || 0;

    const nextProvider = videoProvider || video.videoProvider || 'supabase';

    if (isSupabaseProvider(nextProvider)) {
      if (!videoUrl && !video.videoUrl) {
        return res.status(400).json({ success: false, message: 'Supabase video URL is required' });
      }

      video.videoProvider = 'supabase';
      video.sourceType = 'supabase';
      video.status = 'ready';
      if (videoUrl) video.videoUrl = videoUrl;
      if (storagePath) video.storagePath = storagePath;
      if (storageBucket) video.storageBucket = storageBucket;
      video.bunnyVideoId = undefined;
      video.vdoCipherVideoId = undefined;
      await video.save();

      return res.json({ success: true, message: 'Video updated successfully', video });
    }

    if (nextProvider === 'vdocipher') {
      const nextVdoId = vdocipherVideoId || video.vdoCipherVideoId;
      if (!nextVdoId) {
        return res.status(400).json({ success: false, message: 'VdoCipher video ID is required' });
      }

      video.videoProvider = 'vdocipher';
      video.vdoCipherVideoId = nextVdoId;
      video.sourceType = 'bunny-id';
      video.status = 'ready';
      await video.save();

      return res.json({ success: true, message: 'Video updated successfully', video });
    }

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
    video.status = 'ready';
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

    if (isSupabaseProvider(video.videoProvider)) {
      if (!video.videoUrl) {
        return res.status(400).json({ success: false, message: 'No Supabase video URL saved for this video' });
      }

      return res.json({
        success: true,
        video: {
          _id: video._id,
          title: video.title,
          videoUrl: video.videoUrl,
          videoProvider: 'supabase',
          embedUrl: video.videoUrl,
        }
      });
    }

    if (video.vdoCipherVideoId) {
      return res.json({
        success: true,
        video: {
          _id: video._id,
          title: video.title,
          vdoCipherVideoId: video.vdoCipherVideoId,
          videoProvider: 'vdocipher',
          embedUrl: '',
        }
      });
    }

    if (!video.bunnyVideoId) {
      return res.status(400).json({ success: false, message: 'No playable video reference saved for this video' });
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
