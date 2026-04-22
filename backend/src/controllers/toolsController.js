import asyncHandler from 'express-async-handler';
import astrologyService from '../services/astrologyService.js';
import { DateTime } from 'luxon';
import logger from '../config/logger.js';

export const calculateMoon = asyncHandler(async (req, res) => {
  const data = await astrologyService.getMoonData(req.body);
  res.json({ success: true, ...data });
});

export const calculateNumerology = asyncHandler(async (req, res) => {
  const data = astrologyService.getNumerologyData(req.body);
  res.json({ success: true, ...data });
});

export const calculateKundali = asyncHandler(async (req, res) => {
  const data = await astrologyService.getKundaliData(req.body);
  res.json({ success: true, ...data });
});

export const calculateZodiac = asyncHandler(async (req, res) => {
  const data = await astrologyService.getZodiacData(req.body.dob);
  res.json({ success: true, ...data });
});

export const calculateLoveCompatibility = asyncHandler(async (req, res) => {
  const { partnerA, partnerB } = req.body;
  if (!partnerA || !partnerB) {
    res.status(400);
    throw new Error('Both partners birth data are required');
  }
  const data = await astrologyService.calculateLoveCompatibility(partnerA, partnerB);
  res.json({ success: true, ...data });
});

export const getHoroscope = asyncHandler(async (req, res) => {
  const { sign } = req.params;
  const today = DateTime.now().toFormat('MMM dd, yyyy');

  try {
    // Using a more reliable public endpoint or handling the current one better
    const response = await fetch(`https://freehoroscopeapi.com/api/v1/get-horoscope/daily?sign=${sign.toLowerCase()}`);
    const raw = await response.json();
    
    // Support multiple common API response formats
    const apiData = raw.data || raw;
    const predictionText = apiData.horoscope || apiData.prediction || apiData.horoscope_data;

    res.json({
      success: true,
      date: apiData.date || today,
      prediction: predictionText || `The stars suggest a day of significant personal growth and clarity for ${sign}. Focus on your core goals and maintain a positive outlook.`
    });
  } catch (error) {
    logger.error(`Horoscope API Error for ${sign}:`, error);
    res.json({
      success: true,
      date: today,
      prediction: `Jupiter's current alignment brings a wave of creative energy to ${sign} today. Trust your intuition and take proactive steps toward your long-term aspirations.`,
      status: "backup"
    });
  }
});
