export const login = async (req, res) => {
  const { email, password } = req.body;

  // Simple hardcoded check for now, can be expanded to DB later
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@astroava.com';
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: 'dummy-jwt-token-for-now'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password'
  });
};
