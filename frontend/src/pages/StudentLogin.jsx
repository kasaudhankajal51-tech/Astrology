import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import API_BASE from '../utils/api';
import './Admin.css'; // Reusing the premium CSS from admin

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Forgot Password States
  const [viewState, setViewState] = useState('LOGIN'); // 'LOGIN' | 'FORGOT' | 'RESET'
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    try {
      const response = await fetch(`${API_BASE}/api/student/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const user = data.user || data.student || {};

      if (data.success) {
        localStorage.setItem('studentToken', data.token);
        localStorage.setItem('studentName', user.name || user.email || 'Student');
        toast.success('Welcome to your learning portal!');
        navigate('/dashboard');
      } else {
        const errorMsg = data.message || 'Invalid Credentials';
        setLoginError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Login Error:', error);
      const connError = 'Connection failed. Please try again.';
      setLoginError(connError);
      toast.error(connError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your registered email address');
      return;
    }
    
    setIsLoading(true);
    setLoginError('');
    setStatusMessage('');

    try {
      const response = await fetch(`${API_BASE}/api/student/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('OTP sent to your email (if registered)');
        setStatusMessage('OTP sent to your email.');
        setViewState('RESET');
      } else {
        toast.error(data.message || 'Failed to process request');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast.error('Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/student/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Password reset successful! You can now login.');
        setViewState('LOGIN');
        setPassword('');
        setOtp('');
        setNewPassword('');
        setStatusMessage('');
      } else {
        toast.error(data.message || 'Invalid OTP or expired');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-bg-glow" style={{ background: 'radial-gradient(circle at top right, rgba(200, 131, 42, 0.2), transparent 40%)' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="login-card"
      >
        {/* Left Side - Form */}
        <div className="login-left">
          <div className="login-brand">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="login-brand-orb"
            >
              A
            </motion.div>
            <div className="login-brand-name">Cosmic Light <em>Academy</em></div>
          </div>

          {viewState === 'LOGIN' && (
          <>

            <div className="login-headline">
              <h1>Student Portal</h1>
              <p>Sign in to access your enrolled courses</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="lf-group">
                <label>Email Address</label>
                <div className="lf-input-wrap">
                  <i className="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="lf-group">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="mb-0">Password</label>
                  <button 
                    type="button" 
                    className="btn btn-link text-decoration-none p-0" 
                    style={{ fontSize: '0.8rem', color: '#C8832A' }}
                    onClick={() => { setViewState('FORGOT'); setLoginError(''); }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="lf-input-wrap">
                  <i className="fas fa-lock"></i>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="lf-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {loginError && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lf-error"
                  >
                    <i className="fas fa-exclamation-circle"></i>
                    <span>{loginError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                className={`lf-btn ${isLoading ? 'lf-btn--loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? <div className="lf-spinner"></div> : 'Enter Portal'}
              </button>
            </form>
          </>
          )}

          {viewState === 'FORGOT' && (
            <>
              <div className="login-headline">
                <h1>Reset Password</h1>
                <p>Enter your email to receive an OTP</p>
              </div>
              <form className="login-form" onSubmit={handleForgotPassword}>
                <div className="lf-group">
                  <label>Registered Email</label>
                  <div className="lf-input-wrap">
                    <i className="fas fa-envelope"></i>
                    <input 
                      type="email" 
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>
                
                <div className="d-flex gap-3 mt-4">
                  <button 
                    type="button" 
                    className="lf-btn" 
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF' }}
                    onClick={() => setViewState('LOGIN')}
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className={`lf-btn ${isLoading ? 'lf-btn--loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? <div className="lf-spinner"></div> : 'Send OTP'}
                  </button>
                </div>
              </form>
            </>
          )}

          {viewState === 'RESET' && (
            <>
              <div className="login-headline">
                <h1>Set New Password</h1>
                <p>Enter the 6-digit OTP sent to {email}</p>
              </div>
              <form className="login-form" onSubmit={handleResetPassword}>
                <div className="lf-group">
                  <label>6-Digit OTP</label>
                  <div className="lf-input-wrap">
                    <i className="fas fa-key"></i>
                    <input 
                      type="text" 
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength="6"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="lf-group">
                  <label>New Password</label>
                  <div className="lf-input-wrap">
                    <i className="fas fa-lock"></i>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="lf-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                
                <div className="d-flex gap-3 mt-4">
                  <button 
                    type="button" 
                    className="lf-btn" 
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#FFF' }}
                    onClick={() => setViewState('LOGIN')}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={`lf-btn ${isLoading ? 'lf-btn--loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? <div className="lf-spinner"></div> : 'Reset Password'}
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="login-footer">
            <span>&copy; 2026 Cosmic Light Astrology</span>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="login-right">
          <div className="login-right-inner">
            <div className="lr-orb lr-orb--1"></div>
            <div className="lr-orb lr-orb--2"></div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="lr-img-container"
            >
              <img 
                src="/images/student_login_visual.png" 
                alt="Student Portal Visual" 
                className="lr-img"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default StudentLogin;
