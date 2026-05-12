export const login = async (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@astroava.com').toLowerCase();
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'AstroAva@2026!';

  if (email && email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASS) {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: 'dummy-jwt-token-for-now'
    });
  }

  // Debug log for failed attempts (useful for identifying casing or trailing space issues)
  console.warn(`[Auth] Failed login attempt for email: ${email}`);
  
  return res.status(401).json({
    success: false,
    message: 'Invalid email or password'
  });
};
