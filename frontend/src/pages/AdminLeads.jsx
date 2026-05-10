import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: '' });

  const ADMIN_PASS = 'admin123';

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:5000/api/leads?${query}`, {
        headers: { 'x-admin-secret': ADMIN_PASS }
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
    fetchLeads();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    const query = new URLSearchParams(filters).toString();
    const exportUrl = `http://localhost:5000/api/leads/export?${query}&x-admin-secret=${ADMIN_PASS}`;
    window.open(exportUrl, '_blank');
  };

  return (
    <div className="admin-leads-section animate__animated animate__fadeIn">
      <div className="row g-4 mb-4">
        {/* Quick Stats Summary */}
        <div className="col-md-3">
          <div className="admin-card p-4 text-center">
            <p className="text-muted small fw-bold mb-1">TOTAL LEADS</p>
            <h3 className="fw-bold mb-0">{leads.length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-card p-4 text-center">
            <p className="text-muted small fw-bold mb-1">COMPLETED</p>
            <h3 className="fw-bold mb-0 text-success">{leads.filter(l => l.paymentStatus === 'Completed').length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-card p-4 text-center">
            <p className="text-muted small fw-bold mb-1">COURSES</p>
            <h3 className="fw-bold mb-0 text-primary">{leads.filter(l => l.type === 'Course').length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-card p-4 text-center">
            <p className="text-muted small fw-bold mb-1">CONSULTATIONS</p>
            <h3 className="fw-bold mb-0 text-info">{leads.filter(l => l.type === 'Consultation').length}</h3>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div className="d-flex align-items-center gap-3">
            <div className="btn-group shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <button className={`btn btn-sm px-3 ${filters.type === '' ? 'btn-primary' : 'btn-white'}`} onClick={() => setFilters({...filters, type: ''})}>Global</button>
              <button className={`btn btn-sm px-3 ${filters.type === 'Course' ? 'btn-primary' : 'btn-white'}`} onClick={() => setFilters({...filters, type: 'Course'})}>Courses</button>
              <button className={`btn btn-sm px-3 ${filters.type === 'Consultation' ? 'btn-primary' : 'btn-white'}`} onClick={() => setFilters({...filters, type: 'Consultation'})}>Consulting</button>
              <button className={`btn btn-sm px-3 ${filters.type === 'Webinar' ? 'btn-primary' : 'btn-white'}`} onClick={() => setFilters({...filters, type: 'Webinar'})}>Webinars</button>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button onClick={handleExport} className="btn btn-premium-outline btn-sm">
              <i className="fas fa-download me-2"></i> Export Data
            </button>
            <button onClick={fetchLeads} className="btn btn-premium btn-sm">
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
        
        <div className="admin-card-body">
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="text-muted small mb-1 fw-bold">STARTING FROM</label>
              <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="form-control admin-input" />
            </div>
            <div className="col-md-4">
              <label className="text-muted small mb-1 fw-bold">ENDING AT</label>
              <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="form-control admin-input" />
            </div>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Time / Date</th>
                  <th>Client Identity</th>
                  <th>Contact Details</th>
                  <th>Category</th>
                  <th>Interest Item</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-5 text-muted">No data points matching these filters were found.</td></tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead._id}>
                      <td>
                        <div className="fw-bold text-dark">{new Date(lead.createdAt).toLocaleDateString()}</div>
                        <small className="text-muted">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                      </td>
                      <td>
                        <div className="fw-bold">{lead.name}</div>
                      </td>
                      <td>
                        <div className="small text-dark"><i className="fas fa-envelope text-muted me-2"></i>{lead.email}</div>
                        <div className="small text-dark"><i className="fas fa-phone text-muted me-2"></i>{lead.phone}</div>
                      </td>
                      <td>
                        <span className={`badge-premium ${
                          lead.type === 'Webinar' ? 'badge-webinar' : 
                          lead.type === 'Course' ? 'badge-course' : 
                          lead.type === 'Consultation' ? 'badge-consultation' : 'bg-light text-dark'
                        }`}>
                          {lead.type}
                        </span>
                      </td>
                      <td>
                        <div className="fw-bold small text-truncate" style={{ maxWidth: '150px' }}>{lead.courseName || lead.consultationType || 'N/A'}</div>
                      </td>
                      <td>
                        <span className={`badge-premium ${lead.paymentStatus === 'Completed' ? 'badge-completed' : lead.paymentStatus === 'Failed' ? 'bg-danger-subtle text-danger' : 'badge-pending'}`}>
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
      </div>
    </div>
  );
}

export default AdminLeads;
