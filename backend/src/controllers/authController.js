import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('--- Login Attempt ---');
  console.log('Email received:', email);

  // Clean environment variables (remove potential quotes and whitespace)
  const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@astroava.com')
    .replace(/['"]+/g, '')
    .trim()
    .toLowerCase();
    
  const ADMIN_PASS = (process.env.ADMIN_PASSWORD || 'AstroAva@2026!')
    .replace(/['"]+/g, '')
    .trim();

  console.log('Expecting Email (from .env):', ADMIN_EMAIL);

  const JWT_SECRET = process.env.JWT_SECRET || 'astro-admin-secret-2026';

  if (email && email.toLowerCase().trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
    console.log('✅ Login SUCCESS: Credentials matched');
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

  console.log('❌ Login FAIL: Credentials did not match');

  // DEBUG LOG: Check PM2 logs on server to see this
  console.warn(`[Auth Fail] IP: ${req.ip} | Input Email: "${email}" | Expecting Email: "${ADMIN_EMAIL}"`);

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password'
  });
};
