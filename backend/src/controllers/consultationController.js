import asyncHandler from 'express-async-handler';
import consultationService from '../services/consultationService.js';

export const submitConsultation = asyncHandler(async (req, res) => {
  const consultation = await consultationService.createConsultation(req.body);
  res.status(201).json({
    success: true,
    data: consultation,
    message: 'Consultation request received successfully'
  });
});

export const getConsultations = asyncHandler(async (req, res) => {
  const list = await consultationService.getAllConsultations();
  res.json({ success: true, data: list });
});

export const getStats = asyncHandler(async (req, res) => {
  const stats = await consultationService.getConsultationStats();
  res.json({ success: true, data: stats });
});
