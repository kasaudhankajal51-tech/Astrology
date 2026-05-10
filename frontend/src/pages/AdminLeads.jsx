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
    <div className="admin-leads">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Lead Management</h3>
        <div className="btn-group">
          <button className={`btn btn-sm ${filters.type === '' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilters({...filters, type: ''})}>All</button>
          <button className={`btn btn-sm ${filters.type === 'Course' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilters({...filters, type: 'Course'})}>Courses</button>
          <button className={`btn btn-sm ${filters.type === 'Consultation' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilters({...filters, type: 'Consultation'})}>Consulting</button>
          <button className={`btn btn-sm ${filters.type === 'Webinar' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilters({...filters, type: 'Webinar'})}>Webinars</button>
        </div>
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
                  <td>
                    <span className={`badge ${
                      lead.type === 'Webinar' ? 'bg-info' : 
                      lead.type === 'Course' ? 'bg-primary' : 
                      lead.type === 'Consultation' ? 'bg-success' : 'bg-secondary'
                    }`}>
                      {lead.type}
                    </span>
                  </td>
                  <td>{lead.courseName || lead.consultationType || '-'}</td>
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
