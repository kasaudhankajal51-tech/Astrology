export const login = async (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@astroava.com').toLowerCase();
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'AstroAva@2026!';

  // --- SAFE DEBUG LOGS ---
  console.log('--- Login Debug ---');
  console.log(`Received Email: ${email}`);
  console.log(`Received Pass Length: ${password ? password.length : 0}`);
  console.log(`Env ADMIN_EMAIL Loaded: ${!!process.env.ADMIN_EMAIL}`);
  console.log(`Env ADMIN_PASS Loaded: ${!!process.env.ADMIN_PASSWORD}`);
  console.log(`Env ADMIN_PASS Length: ${ADMIN_PASS.length}`);
  console.log('-------------------');

  if (email && email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASS) {
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
