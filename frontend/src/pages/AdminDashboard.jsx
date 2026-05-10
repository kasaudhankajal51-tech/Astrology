import { useState } from 'react';
import AdminLeads from './AdminLeads';
import AdminBlogs from './AdminBlogs';
import AdminJobs from './AdminJobs';

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
      <div className="admin-login-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#070913' }}>
        <div className="login-card p-5 text-center" style={{ background: '#0b1220', border: '1px solid #ff6a00', borderRadius: '30px', maxWidth: '400px', width: '90%' }}>
          <i className="fas fa-user-shield mb-4" style={{ fontSize: '4rem', color: '#ff6a00' }}></i>
          <h2 className="mb-4 text-white">Admin Portal</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input 
                type="password" 
                className="form-control bg-dark text-white border-secondary" 
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-3" style={{ background: 'linear-gradient(135deg, #ff6a00, #ff0080)', border: 'none', borderRadius: '50px', fontWeight: '700' }}>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ minHeight: '100vh', background: '#070913', color: '#fff' }}>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 p-0" style={{ background: '#0b1220', minHeight: '100vh', borderRight: '1px solid #1a1a2e' }}>
            <div className="p-4 text-center border-bottom border-secondary mb-4">
              <h4 style={{ color: '#ff6a00' }}>Cosmic Admin</h4>
            </div>
            <nav className="nav flex-column px-2">
              <button 
                className={`nav-link text-start mb-2 btn ${activeTab === 'leads' ? 'btn-primary' : 'text-white'}`}
                style={{ background: activeTab === 'leads' ? 'linear-gradient(135deg, #ff6a00, #ff0080)' : 'transparent', border: 'none' }}
                onClick={() => setActiveTab('leads')}
              >
                <i className="fas fa-users me-2"></i> Leads
              </button>
              <button 
                className={`nav-link text-start mb-2 btn ${activeTab === 'blogs' ? 'btn-primary' : 'text-white'}`}
                style={{ background: activeTab === 'blogs' ? 'linear-gradient(135deg, #ff6a00, #ff0080)' : 'transparent', border: 'none' }}
                onClick={() => setActiveTab('blogs')}
              >
                <i className="fas fa-blog me-2"></i> Blogs
              </button>
              <button 
                className={`nav-link text-start mb-2 btn ${activeTab === 'jobs' ? 'btn-primary' : 'text-white'}`}
                style={{ background: activeTab === 'jobs' ? 'linear-gradient(135deg, #ff6a00, #ff0080)' : 'transparent', border: 'none' }}
                onClick={() => setActiveTab('jobs')}
              >
                <i className="fas fa-briefcase me-2"></i> Jobs
              </button>
              <button 
                className="nav-link text-start mt-5 btn text-danger"
                onClick={() => setIsAuthenticated(false)}
              >
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="col-md-10 p-4">
            {activeTab === 'leads' && <AdminLeads />}
            {activeTab === 'blogs' && <AdminBlogs />}
            {activeTab === 'jobs' && <AdminJobs />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
