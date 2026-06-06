import Banner from '../models/Banner.js';
import Course from '../models/Course.js';
import CourseMaterial from '../models/CourseMaterial.js';

export const getAdminBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load banners' });
  }
};

export const createBanner = async (req, res) => {
  try {
    const { title, image, redirectLink, isActive = true } = req.body;
    if (!title || !image) {
      return res.status(400).json({ success: false, message: 'Banner title and image URL are required' });
    }

    const banner = await Banner.create({ title, image, redirectLink, isActive });
    res.status(201).json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create banner' });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update banner' });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.json({ success: true, message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete banner' });
  }
};

export const getAdminMaterials = async (req, res) => {
  try {
    const filter = req.query.courseId ? { courseId: req.query.courseId } : {};
    const materials = await CourseMaterial.find(filter)
      .populate('courseId', 'title')
      .sort({ createdAt: -1 });
    res.json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load course materials' });
  }
};

export const createMaterial = async (req, res) => {
  try {
    const { courseId, title, fileType = 'PDF', fileUrl } = req.body;
    if (!courseId || !title || !fileUrl) {
      return res.status(400).json({ success: false, message: 'Course, material title and file URL are required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const material = await CourseMaterial.create({ courseId, title, fileType, fileUrl });
    res.status(201).json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create course material' });
  }
};

export const updateMaterial = async (req, res) => {
  try {
    const material = await CourseMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!material) {
      return res.status(404).json({ success: false, message: 'Course material not found' });
    }

    res.json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update course material' });
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const material = await CourseMaterial.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Course material not found' });
    }

    res.json({ success: true, message: 'Course material deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete course material' });
  }
};
