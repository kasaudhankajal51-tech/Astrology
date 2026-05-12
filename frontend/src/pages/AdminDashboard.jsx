import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLeads from './AdminLeads';
import AdminBlogs from './AdminBlogs';
import AdminJobs from './AdminJobs';
import AdminSettings from './AdminSettings';
import './Admin.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leadFilter, setLeadFilter] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLeads: { value: '0', delta: '0%' },
    activeBlogs: { value: '0', delta: '0%' },
    expertNetwork: { value: '0', delta: '0%' },
    globalReach: { value: '0', delta: '0%' },
    courseLeads: { value: '0', delta: '0%' },
    consultingLeads: { value: '0', delta: '0%' },
    webinarLeads: { value: '0', delta: '0%' }
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/stats', {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
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
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="lf-spinner"></div>
        <p>Verifying cosmic access...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

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
            <div className="sb-logo-orb">{stats?.siteName?.charAt(0) || 'A'}</div>
            <div className="sb-logo-text">{stats?.siteName || 'AstroAva'} <em>Pro</em></div>
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
              <div className="dash-greeting mb-4">
                <h2>Welcome AstroAva Admin</h2>
                <p>Real-time analytics and management for your cosmic ecosystem.</p>
              </div>

              <div className="stat-grid mb-4">
                {/* Course Leads */}
                <div className="stat-card stat-card--violet">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--violet"><i className="fas fa-graduation-cap"></i></div>
                    <div className="sc-delta">{stats.courseLeads.delta}</div>
                  </div>
                  <div className="sc-value">{stats.courseLeads.value}</div>
                  <div className="sc-label">Course Leads</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>

                {/* Consulting Leads */}
                <div className="stat-card stat-card--cyan">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--cyan"><i className="fas fa-user-md"></i></div>
                    <div className="sc-delta">{stats.consultingLeads.delta}</div>
                  </div>
                  <div className="sc-value">{stats.consultingLeads.value}</div>
                  <div className="sc-label">Consulting Leads</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>

                {/* Webinar Leads */}
                <div className="stat-card stat-card--amber">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--amber"><i className="fas fa-video"></i></div>
                    <div className="sc-delta">{stats.webinarLeads.delta}</div>
                  </div>
                  <div className="sc-value">{stats.webinarLeads.value}</div>
                  <div className="sc-label">Webinar Leads</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>

                {/* Total Leads */}
                <div className="stat-card stat-card--indigo">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--indigo"><i className="fas fa-users"></i></div>
                    <div className="sc-delta">{stats.totalLeads.delta}</div>
                  </div>
                  <div className="sc-value">{stats.totalLeads.value}</div>
                  <div className="sc-label">Total Leads</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>

                {/* Global Reach */}
                <div className="stat-card stat-card--emerald">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--emerald"><i className="fas fa-chart-line"></i></div>
                    <div className="sc-delta">{stats.globalReach.delta}</div>
                  </div>
                  <div className="sc-value">{stats.globalReach.value}</div>
                  <div className="sc-label">Global Reach</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>

                {/* Team Hiring */}
                <div className="stat-card stat-card--blue">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--blue"><i className="fas fa-briefcase"></i></div>
                    <div className="sc-delta">{stats.expertNetwork.delta}</div>
                  </div>
                  <div className="sc-value">{stats.expertNetwork.value}</div>
                  <div className="sc-label">Team Hiring</div>
                  <div className="sc-bar"><div className="sc-bar-fill"></div></div>
                </div>

                {/* Active Blogs */}
                <div className="stat-card stat-card--rose">
                  <div className="sc-top">
                    <div className="sc-icon sc-icon--rose"><i className="fas fa-newspaper"></i></div>
                    <div className="sc-delta">{stats.activeBlogs.delta}</div>
                  </div>
                  <div className="sc-value">{stats.activeBlogs.value}</div>
                  <div className="sc-label">Active Articles</div>
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
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
