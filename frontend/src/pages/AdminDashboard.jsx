import { useState } from 'react';
import AdminLeads from './AdminLeads';
import AdminBlogs from './AdminBlogs';
import AdminJobs from './AdminJobs';
import './Admin.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leadFilter, setLeadFilter] = useState(''); // Global, Course, Consultation, Webinar
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
    <div className="admin-app-wrapper">
      {/* Sidebar - Premium Navigation */}
      <aside className="admin-sidebar-modern">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon-glow"></div>
            <span className="logo-text">AstroAva <span className="text-accent">Pro</span></span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-group">
            <span className="group-title">MANAGEMENT</span>
            
            <div className="menu-item-nested">
              <button 
                className={`menu-link ${activeTab === 'leads' && leadFilter === '' ? 'active' : ''}`}
                onClick={() => { setActiveTab('leads'); setLeadFilter(''); }}
              >
                <i className="fas fa-layer-group"></i>
                <span>Global Leads</span>
                {activeTab === 'leads' && leadFilter === '' && <div className="active-indicator"></div>}
              </button>
              
              <div className="nested-links">
                <button 
                  className={`nested-link ${activeTab === 'leads' && leadFilter === 'Course' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('leads'); setLeadFilter('Course'); }}
                >
                  <i className="fas fa-graduation-cap"></i>
                  <span>Courses</span>
                </button>
                <button 
                  className={`nested-link ${activeTab === 'leads' && leadFilter === 'Consultation' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('leads'); setLeadFilter('Consultation'); }}
                >
                  <i className="fas fa-user-md"></i>
                  <span>Consulting</span>
                </button>
                <button 
                  className={`nested-link ${activeTab === 'leads' && leadFilter === 'Webinar' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('leads'); setLeadFilter('Webinar'); }}
                >
                  <i className="fas fa-video"></i>
                  <span>Webinars</span>
                </button>
              </div>
            </div>

            <button 
              className={`menu-link ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              <i className="fas fa-newspaper"></i>
              <span>Blog Portal</span>
              {activeTab === 'blogs' && <div className="active-indicator"></div>}
            </button>
            <button 
              className={`menu-link ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              <i className="fas fa-briefcase"></i>
              <span>Recruitment</span>
              {activeTab === 'jobs' && <div className="active-indicator"></div>}
            </button>
          </div>

          <div className="menu-group mt-4">
            <span className="group-title">SYSTEM</span>
            <button className="menu-link">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </button>
            <button className="menu-link">
              <i className="fas fa-shield-alt"></i>
              <span>Security</span>
            </button>
          </div>
        </nav>

        <div className="sidebar-profile">
          <div className="profile-card">
            <div className="profile-img">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="profile-meta">
              <span className="user-name">Administrator</span>
              <span className="user-role">Super Admin</span>
            </div>
          </div>
          <button 
            className="btn-logout-minimal"
            onClick={() => setIsAuthenticated(false)}
          >
            <i className="fas fa-power-off"></i>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-view">
        <header className="admin-glass-header">
          <div className="header-content">
            <div className="header-info">
              <h1 className="header-title">
                {activeTab === 'leads' && 'Global Analytics'}
                {activeTab === 'blogs' && 'Content Studio'}
                {activeTab === 'jobs' && 'Expert Network'}
              </h1>
              <div className="header-breadcrumb">
                <span>Admin</span>
                <i className="fas fa-chevron-right"></i>
                <span className="current">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
              </div>
            </div>

            <div className="header-tools">
              <div className="tool-box d-none d-md-flex">
                <div className="search-pill">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Global search..." />
                </div>
              </div>
              <div className="header-divider"></div>
              <div className="header-badges">
                <button className="badge-btn"><i className="far fa-bell"></i><span className="dot"></span></button>
                <button className="badge-btn"><i className="far fa-comment-alt"></i></button>
              </div>
            </div>
          </div>
        </header>

        <main className="admin-view-scroll">
          <div className="view-container">
            {activeTab === 'leads' && <AdminLeads activeFilter={leadFilter} />}
            {activeTab === 'blogs' && <AdminBlogs />}
            {activeTab === 'jobs' && <AdminJobs />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
