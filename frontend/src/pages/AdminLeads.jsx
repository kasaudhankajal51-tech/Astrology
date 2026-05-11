import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function AdminLeads({ activeFilter }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: activeFilter || '' });

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

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    (lead.courseName && lead.courseName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lead.consultationType && lead.consultationType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    setFilters(prev => ({ ...prev, type: activeFilter || '' }));
  }, [activeFilter]);

  useEffect(() => {
    fetchLeads();
  }, [activeFilter, filters.startDate, filters.endDate]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    const query = new URLSearchParams(filters).toString();
    const exportUrl = `http://localhost:5000/api/leads/export?${query}&x-admin-secret=${ADMIN_PASS}`;
    window.open(exportUrl, '_blank');
  };

  const handleRefresh = () => {
    setFilters({ startDate: '', endDate: '', type: activeFilter || '' });
    setSearchTerm('');
    fetchLeads();
  };

  return (
    <div className="admin-leads-content">
      {/* Search & Filters Row */}
      <div className="d-flex flex-column gap-3 mb-4">
        <div className="d-flex flex-column flex-xl-row justify-content-between gap-3">
          {/* Search Bar */}
          <div className="search-bar flex-grow-1" style={{ maxWidth: '400px', background: '#fff' }}>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap flex-sm-nowrap">
            <div className="lf-group mb-0" style={{ minWidth: '130px', flex: 1 }}>
              <div className="lf-input-wrap">
                <i className="fas fa-calendar-alt"></i>
                <input 
                  type="date" 
                  name="startDate" 
                  value={filters.startDate} 
                  onChange={handleFilterChange} 
                  className="bg-white border text-dark"
                  style={{ paddingLeft: '32px', height: '42px', fontSize: '12px' }}
                />
              </div>
            </div>
            <span className="text-muted small px-1 d-none d-sm-inline">to</span>
            <div className="lf-group mb-0" style={{ minWidth: '130px', flex: 1 }}>
              <div className="lf-input-wrap">
                <i className="fas fa-calendar-alt"></i>
                <input 
                  type="date" 
                  name="endDate" 
                  value={filters.endDate} 
                  onChange={handleFilterChange} 
                  className="bg-white border text-dark"
                  style={{ paddingLeft: '32px', height: '42px', fontSize: '12px' }}
                />
              </div>
            </div>
            <div className="d-flex gap-2 ms-sm-2">
              <button onClick={handleExport} className="topbar-icon-btn" title="Export CSV" style={{ height: '42px', width: '42px' }}>
                <i className="fas fa-file-export"></i>
              </button>
              <button onClick={handleRefresh} className="topbar-icon-btn" title="Reset & Refresh" style={{ height: '42px', width: '42px' }}>
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="leads-table-wrap">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Client Identity</th>
              <th>Contact</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">
                  <div className="dash-loading">
                    <div className="dash-spin"></div>
                    <span>Fetching data...</span>
                  </div>
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="table-empty">
                    <i className="fas fa-folder-open fa-2x mb-2 d-block opacity-25"></i>
                    No leads found for "{searchTerm}".
                  </div>
                </td>
              </tr>
            ) : (
              filteredLeads.map(lead => (
                <tr key={lead._id}>
                  <td>
                    <div className="td-value">{new Date(lead.createdAt).toLocaleDateString()}</div>
                    <div className="td-muted">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td>
                    <div className="lead-name-cell">
                      <div className="lead-avatar">{lead.name.charAt(0)}</div>
                      <div className="td-value">{lead.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="td-value">{lead.email}</div>
                    <div className="td-muted">{lead.phone}</div>
                  </td>
                  <td>
                    <span className={`tag ${
                      lead.type === 'Course' ? 'tag--violet' : 
                      lead.type === 'Consultation' ? 'tag--cyan' : 'tag--amber'
                    }`}>
                      {lead.type}
                    </span>
                    <div className="td-muted mt-1 small text-truncate" style={{ maxWidth: '120px' }}>
                      {lead.courseName || lead.consultationType || 'General'}
                    </div>
                  </td>
                  <td>
                    <div className="status-pill">
                      <div className={`dot ${lead.paymentStatus === 'Completed' ? 'dot--green' : lead.paymentStatus === 'Failed' ? 'dot--rose' : 'dot--amber'}`}></div>
                      <span>{lead.paymentStatus}</span>
                    </div>
                  </td>
                  <td>
                    <button className="topbar-icon-btn btn-sm" style={{ width: '30px', height: '30px' }}>
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
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
