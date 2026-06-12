import asyncHandler from 'express-async-handler';
import {
  buildPublicCatalog,
  getActiveServiceBySlug,
  seedCatalogFromStaticIfEmpty,
} from '../services/consultationCatalogDb.js';
import { isPaymentEnabled, getRazorpayConfig } from '../utils/razorpayConfig.js';

/** @route GET /api/consultations/services */
export const getConsultationServices = asyncHandler(async (req, res) => {
  await seedCatalogFromStaticIfEmpty();
  const catalog = await buildPublicCatalog({ includeInactive: false });
  res.json({ success: true, ...catalog });
});

/** @route GET /api/consultations/services/:serviceId */
export const getConsultationService = asyncHandler(async (req, res) => {
  await seedCatalogFromStaticIfEmpty();
  const service = await getActiveServiceBySlug(req.params.serviceId);
  if (!service) {
    res.status(404);
    throw new Error('Consultation service not found');
  }
  res.json({ success: true, service });
});

/** @route GET /api/consultations/payment-config */
export const getConsultationPaymentConfig = asyncHandler(async (req, res) => {
  const enabled = isPaymentEnabled();
  let mode = 'mock';
  let keyId = '';

  if (enabled) {
    try {
      const config = getRazorpayConfig();
      keyId = config.keyId;
      mode = keyId.startsWith('rzp_live_') ? 'live' : 'test';
    } catch {
      mode = 'mock';
    }
  }

  res.json({
    success: true,
    paymentEnabled: enabled,
    mode,
    keyId: enabled ? keyId : '',
    message: enabled
      ? `Payment active (${mode} mode). Set live keys in RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET when ready.`
      : 'Mock payment mode — add Razorpay keys to backend .env to enable checkout.',
  });
});
