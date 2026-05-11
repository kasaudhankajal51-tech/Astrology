import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import './Admin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        toast.success('Welcome back, Admin!');
        navigate('/admin');
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

  return (
    <div className="login-root">
      <div className="login-bg-glow"></div>
      
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
            <div className="login-brand-name">AstroAva <em>Adminimga</em></div>
          </div>

          <div className="login-headline">
            <h1>Welcome Back</h1>
            <p>Sign in to your administrative dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="lf-group">
              <label>Email Address</label>
              <div className="lf-input-wrap">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="admin@astroava.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="lf-group">
              <label>Password</label>
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

            <div className="lf-row">
              <label className="lf-check">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="lf-forgot">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className={`lf-btn ${isLoading ? 'lf-btn--loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <div className="lf-spinner"></div> : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <span>&copy; 2026 AstroAva</span>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
            </div>
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
                src="/astroava_login.png" 
                alt="Visual" 
                className="lr-img"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
