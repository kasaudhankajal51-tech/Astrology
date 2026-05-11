import { useState, useEffect } from 'react';
import AdminLeads from './AdminLeads';
import AdminBlogs from './AdminBlogs';
import AdminJobs from './AdminJobs';
import './Admin.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leadFilter, setLeadFilter] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState({
    totalLeads: { value: '0', delta: '0%' },
    activeBlogs: { value: '0', delta: '0%' },
    expertNetwork: { value: '0', delta: '0%' },
    platformTraffic: { value: '0', delta: '0%' }
  });

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { 'x-admin-secret': 'admin123' } // Match middleware requirement
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  // Auto-login check (simulated)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', data.token);
      } else {
        setLoginError(data.message || 'Invalid Credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setLoginError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="login-root">
        <div className="login-bg-glow"></div>
        <div className="login-card">
          {/* Left Side - Form */}
          <div className="login-left">
            <div className="login-brand">
              <div className="login-brand-orb">A</div>
              <div className="login-brand-name">AstroAva <em>Pro</em></div>
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

              {loginError && (
                <div className="lf-error">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{loginError}</span>
                </div>
              )}

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
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="login-right">
            <div className="login-right-inner">
              <div className="lr-orb lr-orb--1"></div>
              <div className="lr-orb lr-orb--2"></div>
              <div className="lr-quote">
                <i className="fas fa-star lr-star"></i>
                <p>"The cosmos is within us. We are made of star-stuff."</p>
                <span>— Carl Sagan</span>
              </div>
              <img 
                src="/astroava_login.png" 
                alt="Visual" 
                className="lr-img"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const SidebarItem = ({ id, icon, label, filter = '' }) => {
    const isActive = activeTab === id && leadFilter === filter;
    return (
      <button 
        className={`sb-item ${isActive ? 'sb-item--active' : ''}`}
        onClick={() => { setActiveTab(id); setLeadFilter(filter); }}
      >
        <i className={`fas ${icon}`}></i>
        <span>{label}</span>
        {isActive && <div className="sb-active-bar"></div>}
      </button>
    );
  };

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar--collapsed' : ''} ${mobileMenuOpen ? 'sidebar--mobile-open' : ''}`}>
      {/* Sidebar Overlay for Mobile */}
      <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)}></div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sb-head">
          <div className="sb-logo">
            <div className="sb-logo-orb">A</div>
            <div className="sb-logo-text">AstroAva <em>Pro</em></div>
          </div>
          <button className="sb-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
        </div>

        <nav className="sb-nav" onClick={() => setMobileMenuOpen(false)}>
          <div className="sb-group">
            <span className="sb-section-label">Main</span>
            <SidebarItem id="dashboard" icon="fa-th-large" label="Dashboard" />
          </div>

          <div className="sb-group">
            <span className="sb-section-label">Global Leads</span>
            <SidebarItem id="leads" filter="Course" icon="fa-graduation-cap" label="Courses" />
            <SidebarItem id="leads" filter="Consultation" icon="fa-user-md" label="Consulting" />
            <SidebarItem id="leads" filter="Webinar" icon="fa-video" label="Webinars" />
          </div>

          <div className="sb-group">
            <span className="sb-section-label">Management</span>
            <SidebarItem id="blogs" icon="fa-newspaper" label="Blog Portal" />
            <SidebarItem id="jobs" icon="fa-briefcase" label="Recruiter" />
          </div>

          <div className="sb-group">
            <span className="sb-section-label">System</span>
            <SidebarItem id="settings" icon="fa-cog" label="Settings" />
          </div>
        </nav>

        <div className="sb-foot">
          <div className="sb-profile">
            <div className="sb-profile-avatar">AD</div>
            <div className="sb-profile-meta">
              <span className="sb-profile-name">Administrator</span>
              <span className="sb-profile-role">Super Admin</span>
            </div>
          </div>
          <button className="sb-logout" title="Logout" onClick={handleLogout}>
            <i className="fas fa-power-off"></i>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left d-flex align-items-center">
            <button className="mobile-nav-toggle" onClick={() => setMobileMenuOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
            <div>
              <div className="topbar-title">
                {activeTab === 'dashboard' && 'Admin Overview'}
                {activeTab === 'leads' && `${leadFilter} Analytics`}
                {activeTab === 'blogs' && 'Content Studio'}
                {activeTab === 'jobs' && 'Team Hiring'}
                {activeTab === 'settings' && 'Platform Settings'}
              </div>
              <div className="topbar-breadcrumb">
                <span>Admin</span>
                <i className="fas fa-chevron-right"></i>
                <span className="current">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
              </div>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Global search..." />
            </div>
            <button className="topbar-icon-btn">
              <i className="far fa-bell"></i>
              <div className="notif-dot"></div>
            </button>
            <button className="topbar-icon-btn">
              <i className="far fa-comment-alt"></i>
            </button>
          </div>
        </header>

        <main className="page-content">
          {activeTab === 'dashboard' && (
            <div className="dash-home">
              <div className="dash-greeting">
                <h2>Welcome back, Chief!</h2>
                <p>Here's what's happening with your astrology platform today.</p>
              </div>

              <div className="stat-grid">
                <div className="stat-card stat-card--violet">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--violet"><i className="fas fa-users"></i></div>
                    <div className="sc-delta">{stats.totalLeads.delta}</div>
                  </div>
                  <div className="sc-value">{stats.totalLeads.value}</div>
                  <div className="sc-label">Total Leads</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>
                <div className="stat-card stat-card--cyan">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--cyan"><i className="fas fa-newspaper"></i></div>
                    <div className="sc-delta">{stats.activeBlogs.delta}</div>
                  </div>
                  <div className="sc-value">{stats.activeBlogs.value}</div>
                  <div className="sc-label">Active Blogs</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>
                <div className="stat-card stat-card--amber">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--amber"><i className="fas fa-briefcase"></i></div>
                    <div className="sc-delta">{stats.expertNetwork.delta}</div>
                  </div>
                  <div className="sc-value">{stats.expertNetwork.value}</div>
                  <div className="sc-label">Team Hiring</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>
                <div className="stat-card stat-card--rose">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--rose"><i className="fas fa-chart-line"></i></div>
                    <div className="sc-delta">{stats.platformTraffic.delta}</div>
                  </div>
                  <div className="sc-value">{stats.platformTraffic.value}</div>
                  <div className="sc-label">Platform Traffic</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3 className="dash-section-title">Recent Activity</h3>
                  <button className="btn btn-sm btn-link text-decoration-none">View All</button>
                </div>
                <div className="leads-table-wrap">
                  <AdminLeads activeFilter={''} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="leads-view">
              <div className="leads-table-wrap">
                <AdminLeads activeFilter={leadFilter} />
              </div>
            </div>
          )}

          {activeTab === 'blogs' && <AdminBlogs />}
          {activeTab === 'jobs' && <AdminJobs />}
          {activeTab === 'settings' && (
            <div className="empty-state">
              <i className="fas fa-cog fa-4x"></i>
              <h3>Platform Settings</h3>
              <p>Configure your site preferences and security settings here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
