import { useState } from 'react';
import AdminLeads from './AdminLeads';
import AdminBlogs from './AdminBlogs';
import AdminJobs from './AdminJobs';
import './Admin.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASS = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)' }}>
        <div className="login-card p-5 text-center glass-login" style={{ borderRadius: '40px', maxWidth: '450px', width: '90%' }}>
          <div className="mb-4 d-inline-block p-4" style={{ background: 'rgba(255,106,0,0.1)', borderRadius: '30px' }}>
            <i className="fas fa-shield-alt" style={{ fontSize: '3rem', color: '#ff6a00' }}></i>
          </div>
          <h2 className="mb-2 fw-bold text-dark">Welcome Back</h2>
          <p className="text-muted mb-4">Please enter your credentials to access the cosmic dashboard.</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4 text-start">
              <label className="small fw-bold text-muted mb-2 ms-1">ADMIN PASSWORD</label>
              <input 
                type="password" 
                className="form-control admin-input py-3" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn-premium w-100 py-3 shadow-sm">
              Unlock Dashboard <i className="fas fa-arrow-right ms-2"></i>
            </button>
          </form>
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
                <span className="admin-logo-text">Cosmic Admin</span>
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
