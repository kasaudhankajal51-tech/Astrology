import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('--- Login Attempt ---');
  
  // Clean environment variables (remove potential quotes and whitespace)
  const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@astroava.com')
    .replace(/['"]+/g, '')
    .trim()
    .toLowerCase();
    
  const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

  const inputEmail = (email || '').toLowerCase().trim();
  const inputPassword = (password || '').trim();

  const emailMatch = inputEmail === ADMIN_EMAIL;
  
  let passwordMatch = false;
  if (emailMatch && ADMIN_PASSWORD_HASH) {
    try {
      passwordMatch = bcrypt.compareSync(inputPassword, ADMIN_PASSWORD_HASH);
    } catch(err) {
      console.error('Bcrypt compare error', err);
    }
  } else if (emailMatch && !ADMIN_PASSWORD_HASH) {
    // Fallback for safety if hash isn't set yet
    const ADMIN_PASS = (process.env.ADMIN_PASSWORD || 'DS Astro Institute@2026!')
      .replace(/['"]+/g, '')
      .trim();
    passwordMatch = inputPassword === ADMIN_PASS;
  }

  const JWT_SECRET = process.env.JWT_SECRET || 'astro-admin-secret-2026';

  if (emailMatch && passwordMatch) {
    console.log('Login SUCCESS');
    // Session token expires in 2 hours to satisfy the idle timeout requirement
    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  }

  console.warn(`[Auth Fail] IP: ${req.ip} | Email Match: ${emailMatch} | Password Match: ${passwordMatch}`);

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password'
  });
};
