import Settings from '../models/Settings.js';

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public (some fields should be hidden for public, but for now we'll use it for admin)
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private (Admin only)
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.getSettings();
    
    // Update fields
    const fieldsToUpdate = [
      'siteName', 'siteTitle', 'siteDescription', 'contactEmail', 
      'contactPhone', 'address', 'facebookUrl', 'instagramUrl', 
      'youtubeUrl', 'twitterUrl', 'whatsappNumber', 'razorpayKeyId', 
      'googleAnalyticsId', 'maintenanceMode'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    settings.updatedAt = Date.now();
    await settings.save();

    res.json({ success: true, message: 'Settings updated successfully', settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
