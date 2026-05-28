import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const inputEmail = (email || '').toLowerCase().trim();
    const inputPassword = (password || '').trim();

    const user = await User.findOne({ email: inputEmail });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(inputPassword, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'astro-admin-secret-2026';
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email }, // included email for backwards compatibility with adminAuth if needed
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
