import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASS = 'admin123'; // In production, this should be handled via a proper auth system

  const fetchLeads = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:5000/api/leads?${query}`, {
        headers: {
          'x-admin-secret': ADMIN_PASS
        }
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      } else {
        toast.error(data.message || 'Failed to fetch leads');
      }
    } catch (err) {
      toast.error('Network Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [filters, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setIsAuthenticated(true);
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid Password');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    const query = new URLSearchParams(filters).toString();
    const exportUrl = `http://localhost:5000/api/leads/export?${query}&x-admin-secret=${ADMIN_PASS}`;
    // Note: Since we are using headers for auth, a simple window.open might not work for export unless we pass it as a query param or handle it differently.
    // For now, I'll update the backend to also check query param for export if header is missing.
    window.open(exportUrl, '_blank');
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
    <div className="container py-5" style={{ minHeight: '100vh', color: '#fff' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin: Lead Management</h2>
        <button className="btn btn-sm btn-outline-danger" onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>
      
      <div className="card mb-4" style={{ background: '#1a1a2e', border: '1px solid #ff6a00' }}>
        <div className="card-body d-flex flex-wrap gap-3 align-items-end">
          <div className="form-group mb-0">
            <label className="text-muted small">Start Date</label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="form-control bg-dark text-white border-secondary" />
          </div>
          <div className="form-group mb-0">
            <label className="text-muted small">End Date</label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="form-control bg-dark text-white border-secondary" />
          </div>
          <div className="form-group mb-0">
            <label className="text-muted small">Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange} className="form-control bg-dark text-white border-secondary">
              <option value="">All Types</option>
              <option value="Webinar">Webinar</option>
              <option value="Course">Course</option>
            </select>
          </div>
          <div className="ms-auto">
            <button onClick={handleExport} className="btn btn-success me-2">
              <i className="fas fa-file-excel me-2"></i> Export
            </button>
            <button onClick={fetchLeads} className="btn btn-primary" style={{ background: '#ff6a00', border: 'none' }}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover table-bordered" style={{ borderColor: '#333' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Item</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="7" className="text-center">Loading...</td></tr>
            ) : leads.length === 0 ? (
              <tr><td colSpan="7" className="text-center text-muted">No leads found.</td></tr>
            ) : (
              leads.map(lead => (
                <tr key={lead._id}>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td><span className={`badge ${lead.type === 'Webinar' ? 'bg-info' : 'bg-primary'}`}>{lead.type}</span></td>
                  <td>{lead.courseName || '-'}</td>
                  <td>
                    <span className={`badge ${lead.paymentStatus === 'Completed' ? 'bg-success' : lead.paymentStatus === 'Failed' ? 'bg-danger' : 'bg-warning'}`}>
                      {lead.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLeads;
