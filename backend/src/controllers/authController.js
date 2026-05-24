import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('--- Login Attempt ---');
  
  // Clean environment variables (remove potential quotes and whitespace)
  const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@astroava.com')
    .replace(/['"]+/g, '')
    .trim()
    .toLowerCase();
    
  const ADMIN_PASS = (process.env.ADMIN_PASSWORD || 'DS Astro Institute@2026!')
    .replace(/['"]+/g, '')
    .trim();

  const inputEmail = (email || '').toLowerCase().trim();
  const inputPassword = (password || '').trim(); // Trimming input password to avoid accidental spaces

  const emailMatch = inputEmail === ADMIN_EMAIL;
  const passwordMatch = inputPassword === ADMIN_PASS;

  console.log('Email received:', inputEmail, `(Length: ${inputEmail.length})`);
  console.log('Expecting Email:', ADMIN_EMAIL, `(Length: ${ADMIN_EMAIL.length})`);
  console.log('Password Match:', passwordMatch);
  
  if (!passwordMatch) {
    console.log('Input Password Length:', inputPassword.length);
    console.log('Expected Password Length:', ADMIN_PASS.length);
  }

  const JWT_SECRET = process.env.JWT_SECRET || 'astro-admin-secret-2026';

  if (emailMatch && passwordMatch) {
    console.log('✅ Login SUCCESS');
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
