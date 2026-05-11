import { useState } from 'react';
import AdminLeads from './AdminLeads';
import AdminBlogs from './AdminBlogs';
import AdminJobs from './AdminJobs';
import './Admin.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', data.token); // Store token for sessions
      } else {
        alert(data.message || 'Invalid Credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page-v2 d-flex align-items-center justify-content-center">
        <div className="login-card-master shadow-2xl">
          {/* Left Side - Form */}
          <div className="login-side-left bg-white p-4 p-lg-5">
            <div className="login-form-content">
              <div className="mb-5">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="login-brand-dot"></div>
                  <h4 className="fw-bold mb-0 tracking-tighter" style={{ color: '#1e293b' }}>AstroAva <span className="text-primary">Admin</span></h4>
                </div>
                <h2 className="fw-bold text-dark h3">Welcome back</h2>
                <p className="text-muted small">Please enter your details to sign in.</p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="form-label small fw-semibold text-dark">Email Address</label>
                  <div className="input-group-modern">
                    <i className="fas fa-envelope"></i>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="admin@astroava.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-dark">Password</label>
                  <div className="input-group-modern">
                    <i className="fas fa-lock"></i>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label small text-muted" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <a href="#" className="small text-primary text-decoration-none fw-semibold">Forgot password?</a>
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-premium-login w-100 py-3 mb-3 d-flex align-items-center justify-content-center gap-2 ${isLoading ? 'disabled' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>
            </div>

            <div className="login-footer-mini mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
              <span className="text-muted extra-small">© 2026 AstroAva</span>
              <div className="d-flex gap-3">
                <a href="#" className="text-muted extra-small text-decoration-none">Privacy</a>
                <a href="#" className="text-muted extra-small text-decoration-none">Terms</a>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="login-side-right d-none d-md-block">
            <img 
              src="/astroava_login.png" 
              alt="AstroAva Unique Branding" 
              className="login-full-img"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Sidebar */}
          <div className="col-lg-2">
            <aside className="admin-sidebar">
              <div className="admin-logo-box text-center">
                <span className="admin-logo-text">AstroAva Admin</span>
              </div>
              
              <nav className="flex-grow-1">
                <button 
                  className={`admin-nav-link ${activeTab === 'leads' ? 'active' : ''}`}
                  onClick={() => setActiveTab('leads')}
                >
                  <i className="fas fa-chart-line"></i> Analytics & Leads
                </button>
                <button 
                  className={`admin-nav-link ${activeTab === 'blogs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('blogs')}
                >
                  <i className="fas fa-pen-nib"></i> Blog Portal
                </button>
                <button 
                  className={`admin-nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('jobs')}
                >
                  <i className="fas fa-user-tie"></i> Expert Hiring
                </button>
              </nav>

              <div className="mt-auto pt-4 border-top border-light">
                <button 
                  className="admin-nav-link text-danger w-100 border-0 bg-transparent"
                  onClick={() => setIsAuthenticated(false)}
                >
                  <i className="fas fa-power-off"></i> Secure Logout
                </button>
              </div>
            </aside>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-10">
            <header className="p-4 bg-white border-bottom border-light d-flex justify-content-between align-items-center sticky-top">
              <div>
                <h4 className="fw-bold mb-0">
                  {activeTab === 'leads' && 'Global Leads Dashboard'}
                  {activeTab === 'blogs' && 'Content Management System'}
                  {activeTab === 'jobs' && 'Expert Recruitment'}
                </h4>
                <p className="text-muted small mb-0">Overview of your astrology platform performance</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="text-end d-none d-md-block">
                  <span className="d-block fw-bold small">System Admin</span>
                  <span className="badge bg-success-subtle text-success small" style={{ fontSize: '10px' }}>ONLINE</span>
                </div>
                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm" style={{ width: '45px', height: '45px', border: '2px solid #fff' }}>
                  <i className="fas fa-user text-muted"></i>
                </div>
              </div>
            </header>

            <main className="admin-content-area">
              {activeTab === 'leads' && <AdminLeads />}
              {activeTab === 'blogs' && <AdminBlogs />}
              {activeTab === 'jobs' && <AdminJobs />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
