import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@astroava.com').toLowerCase();
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'AstroAva@2026!';
  const JWT_SECRET = process.env.JWT_SECRET || 'astro-admin-secret-2026';

  if (email && email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASS) {
    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password'
  });
};
