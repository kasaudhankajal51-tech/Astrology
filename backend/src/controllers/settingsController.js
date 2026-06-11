import Settings from '../models/Settings.js';
import { isPaymentEnabled, getRazorpayConfig } from '../utils/razorpayConfig.js';

const buildPublicSettings = (settings) => {
  const paymentEnabled = isPaymentEnabled();
  let razorpayKeyId = settings.razorpayKeyId || '';
  if (paymentEnabled) {
    try {
      razorpayKeyId = getRazorpayConfig().keyId;
    } catch {
      razorpayKeyId = '';
    }
  }

  return {
    siteName: settings.siteName,
    siteTitle: settings.siteTitle,
    siteDescription: settings.siteDescription,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    address: settings.address,
    facebookUrl: settings.facebookUrl || '',
    instagramUrl: settings.instagramUrl || '',
    youtubeUrl: settings.youtubeUrl || '',
    twitterUrl: settings.twitterUrl || '',
    whatsappNumber: settings.whatsappNumber || '',
    razorpayKeyId: paymentEnabled ? razorpayKeyId : '',
    shopifyStoreUrl: settings.shopifyStoreUrl || process.env.SHOPIFY_STORE_URL || '',
    googleAnalyticsId: settings.googleAnalyticsId || '',
    maintenanceMode: settings.maintenanceMode ?? false,
    paymentEnabled,
    paymentMode: paymentEnabled ? 'checkout' : 'lead_capture',
  };
};

// @desc    Get all settings
// @route   GET /api/settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    if (!req.headers.authorization) {
      return res.json({
        success: true,
        settings: buildPublicSettings(settings),
      });
    }

    res.json({
      success: true,
      settings: {
        ...buildPublicSettings(settings),
        updatedAt: settings.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.getSettings();

    const fieldsToUpdate = [
      'siteName', 'siteTitle', 'siteDescription', 'contactEmail',
      'contactPhone', 'address', 'facebookUrl', 'instagramUrl',
      'youtubeUrl', 'twitterUrl', 'whatsappNumber', 'razorpayKeyId',
      'shopifyStoreUrl', 'googleAnalyticsId', 'maintenanceMode',
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    settings.updatedAt = Date.now();
    await settings.save();

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
