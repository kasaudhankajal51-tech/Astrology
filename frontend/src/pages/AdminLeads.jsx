import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: '' });

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:5000/api/leads?${query}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      } else {
        toast.error('Failed to fetch leads');
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
    window.open(`http://localhost:5000/api/leads/export?${query}`, '_blank');
  };

  return (
    <div className="container py-5" style={{ minHeight: '100vh', color: '#fff' }}>
      <h2 className="mb-4">Admin: Lead Management</h2>
      
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
              <i className="fas fa-file-excel me-2"></i> Export to Excel
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
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="7" className="text-center">Loading...</td></tr>
            ) : leads.length === 0 ? (
              <tr><td colSpan="7" className="text-center text-muted">No leads found for selected criteria.</td></tr>
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
