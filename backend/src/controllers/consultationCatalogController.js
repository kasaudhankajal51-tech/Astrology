import asyncHandler from 'express-async-handler';
import {
  buildPublicCatalog,
  getActiveServiceBySlug,
  seedCatalogFromStaticIfEmpty,
} from '../services/consultationCatalogDb.js';
import { isPaymentEnabled, getRazorpayConfig, getPaymentMode } from '../utils/razorpayConfig.js';

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
  const mode = getPaymentMode();
  let keyId = '';

  if (mode === 'live' || mode === 'test') {
    try {
      keyId = getRazorpayConfig().keyId;
    } catch {
      // ignore
    }
  }

  res.json({
    success: true,
    paymentEnabled: enabled,
    mode,
    keyId: keyId || (mode === 'mock' ? 'rzp_test_mock' : ''),
    message: enabled
      ? mode === 'mock'
        ? 'Test payment mode — mock checkout active until live Razorpay keys are added.'
        : `Payment active (${mode} mode). Set live keys in RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET when ready.`
      : 'Payment disabled — add Razorpay keys to backend .env to enable checkout.',
  });
});
