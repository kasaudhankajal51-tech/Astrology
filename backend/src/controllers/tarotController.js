import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Tarot from '../models/Tarot.js';
import logger from '../config/logger.js';

/**
 * Helper to generate a professional, practical tarot interpretation
 */
const generateInterpretation = (card, orientation, question, position = null) => {
  const isReversed = orientation === 'Reversed';
  const meaning = isReversed ? card.meaningReversed : card.meaningUpright;
  const qLower = question.toLowerCase();
  
  // Intent detection
  let context = 'General';
  if (qLower.includes('love') || qLower.includes('relationship') || qLower.includes('marriage') || qLower.includes('person') || qLower.includes('feel')) context = 'Love';
  if (qLower.includes('job') || qLower.includes('career') || qLower.includes('work') || qLower.includes('business') || qLower.includes('study')) context = 'Career';
  if (qLower.includes('money') || qLower.includes('finance') || qLower.includes('wealth')) context = 'Money';

  let contextInsight = '';
  switch(context) {
    case 'Love': contextInsight = `In relationships, this card points to ${meaning.toLowerCase()}.`; break;
    case 'Career': contextInsight = `For your professional life, expect ${meaning.toLowerCase()}.`; break;
    case 'Money': contextInsight = `Financially, this suggests ${meaning.toLowerCase()}.`; break;
    default: contextInsight = `This reflects ${meaning.toLowerCase()} in your current situation.`;
  }

  const interpretation = `The ${card.name} (${orientation}) ${position ? `as your ${position}` : ''} shows that ${contextInsight} ${isReversed ? 'There is a delay or internal hurdle here.' : 'The path is clearing up for you.'}`;

  const advice = isReversed 
    ? `Look for what you are avoiding. Resolve inner doubts before taking external action.`
    : `Move forward with confidence. Trust the momentum building around you right now.`;

  return {
    narrative: interpretation,
    wisdom: advice
  };
};

/**
 * @desc    Draw a random Tarot card
 * @route   POST /api/tarot/draw
 * @access  Public
 */
export const drawCard = asyncHandler(async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string') {
    res.status(400);
    throw new Error('Please focus on a question before drawing a card.');
  }

  if (mongoose.connection.readyState !== 1) {
    res.status(503);
    throw new Error('Oracle disconnected. Please check back later.');
  }

  const count = await Tarot.countDocuments();
  if (count === 0) {
    res.status(404);
    throw new Error('The Tarot deck is empty. Please contact the administrator to seed the cards.');
  }

  const random = Math.floor(Math.random() * count);
  const card = await Tarot.findOne().skip(random);

  if (!card) {
    res.status(404);
    throw new Error('Card not found in the cosmic archives.');
  }

  const isReversed = Math.random() < 0.3;
  const orientation = isReversed ? 'Reversed' : 'Upright';
  const interpretation = generateInterpretation(card, orientation, question);

  res.json({
    success: true,
    question,
    card: {
      name: card.name,
      arcana: card.arcana,
      suit: card.suit,
      symbol: card.symbol,
      orientation,
      meaning: isReversed ? card.meaningReversed : card.meaningUpright,
      interpretation: interpretation.narrative,
      wisdom: interpretation.wisdom
    },
    timestamp: new Date()
  });
});

/**
 * @desc    Draw a 3-card spread (Past, Present, Future)
 * @route   POST /api/tarot/spread
 * @access  Public
 */
export const drawSpread = asyncHandler(async (req, res) => {
  const { question } = req.body;
  
  if (!question || typeof question !== 'string') {
    res.status(400);
    throw new Error('A question is required for the Oracle.');
  }

  if (mongoose.connection.readyState !== 1) {
    res.status(503);
    throw new Error('Oracle disconnected. The spread cannot be read right now.');
  }

  const cards = await Tarot.aggregate([{ $sample: { size: 3 } }]);

  if (!cards || cards.length < 3) {
    res.status(404);
    throw new Error('Insufficient cards in the deck for a 3-card spread.');
  }

  const positions = [
    { name: 'Past', desc: 'Influences that shaped you.' },
    { name: 'Present', desc: 'Current energy.' },
    { name: 'Future', desc: 'Potential outcome.' }
  ];

  const spread = cards.map((card, idx) => {
    const isReversed = Math.random() < 0.3;
    const orientation = isReversed ? 'Reversed' : 'Upright';
    const interpretation = generateInterpretation(card, orientation, question, positions[idx].name);
    
    return {
      position: positions[idx].name,
      posDesc: positions[idx].desc,
      name: card.name,
      arcana: card.arcana,
      suit: card.suit,
      symbol: card.symbol,
      orientation,
      meaning: isReversed ? card.meaningReversed : card.meaningUpright,
      interpretation: interpretation.narrative,
      wisdom: interpretation.wisdom
    };
  });

  res.json({
    success: true,
    question,
    spread,
    summary: `Your spread reveals a complex journey starting with ${spread[0].name} influences, manifesting as ${spread[1].name} today, and guiding you toward ${spread[2].name} for the future.`,
    timestamp: new Date()
  });
});
