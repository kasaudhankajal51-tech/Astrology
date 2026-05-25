import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';

function AdminLeads({ activeFilter }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ startDate: '', endDate: '', type: activeFilter || '' });

  const fetchLeads = async (currentFilters = filters) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const query = new URLSearchParams(currentFilters).toString();
      const res = await fetch(`${API_BASE}/api/leads?${query}&_t=${Date.now()}`, {
        headers: { 
          'Authorization': `Bearer ${token}`
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

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    (lead.courseName && lead.courseName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lead.consultationType && lead.consultationType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    // Sync filters and trigger immediate fetch
    setFilters(prev => {
      const newFilters = { ...prev, type: activeFilter || '' };
      fetchLeads(newFilters); // Fetch with fresh filters immediately
      return newFilters;
    });

    const interval = setInterval(() => fetchLeads(filters), 60000);
    return () => clearInterval(interval);
  }, [activeFilter]);

  // Handle date filter changes separately
  useEffect(() => {
    if (filters.startDate || filters.endDate) {
      fetchLeads(filters);
    }
  }, [filters.startDate, filters.endDate]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    if (leads.length === 0) {
      toast.error('No leads to export');
      return;
    }
    
    // Generate CSV data directly on frontend (no backend dependency)
    const headers = ['Name', 'Phone', 'Email', 'Service', 'Category', 'Date', 'Payment Status', 'Booking Status', 'Submitted On'];
    
    const csvRows = leads.map(lead => {
      const service = lead.type;
      const category = lead.courseName || lead.consultationType || 'General';
      const date = lead.preferredDate || lead.dob || '';
      const submitted = new Date(lead.createdAt).toLocaleDateString() + ' ' + new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Escape commas and quotes for CSV
      const escape = (text) => `"${(text || '').toString().replace(/"/g, '""')}"`;
      
      return [
        escape(lead.name),
        escape(lead.phone),
        escape(lead.email),
        escape(service),
        escape(category),
        escape(date),
        escape(lead.paymentStatus),
        escape(lead.status || 'Pending'),
        escape(submitted)
      ].join(',');
    });
    
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Status updated to ${newStatus}`);
        // Optimistically update the UI instantly
        setLeads(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
        setTimeout(fetchLeads, 500); // Secondary sync
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/api/leads/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Lead deleted');
        fetchLeads();
      }
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const [activeMenu, setActiveMenu] = useState(null);

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
          <div className="search-bar flex-grow-1" style={{ maxWidth: '400px', background: 'var(--surface)' }}>
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
              <button onClick={handleExport} className="topbar-icon-btn" title="Download CSV" style={{ height: '42px', width: '42px' }}>
                <i className="fas fa-download"></i>
              </button>
              <button onClick={handleRefresh} className="topbar-icon-btn" title="Reset & Refresh" style={{ height: '42px', width: '42px' }}>
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="leads-table-wrap border-0 shadow-sm" style={{ minHeight: '400px', background: 'var(--surface)' }}>
        <table className="leads-table w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Submitted on</th>
              <th className="text-end px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7">
                  <div className="dash-loading py-5">
                    <div className="dash-spin"></div>
                    <span className="ms-2">Fetching records...</span>
                  </div>
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="text-center py-5 text-muted">
                    <i className="fas fa-inbox fa-3x mb-3 opacity-25"></i>
                    <p>No leads found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead._id}>
                  <td>
                    <div className="td-value fw-bold">{lead.name}</div>
                    <div className="td-muted small text-truncate" style={{ maxWidth: '180px' }}>{lead.email}</div>
                  </td>
                  <td>
                    <div className="td-value">{lead.phone}</div>
                  </td>
                  <td>
                    <span className={`tag ${
                      lead.type === 'Course' || lead.type === 'Course-Inquiry' ? 'tag--violet' : 
                      lead.type === 'Consultation' ? 'tag--cyan' : 'tag--amber'
                    }`}>
                      {lead.type}
                    </span>
                    <div className="td-muted mt-1 small text-truncate" style={{ maxWidth: '150px' }}>
                      {lead.courseName || lead.consultationType || 'General'}
                    </div>
                  </td>
                  <td>
                    <div className="td-value small">{lead.preferredDate || lead.dob || '-'}</div>
                  </td>
                  <td>
                    <div className="status-pill mb-1" style={{ padding: '2px 8px', minWidth: '110px', justifyContent: 'flex-start' }}>
                      <span className="small text-muted me-1" style={{ fontSize: '0.65rem' }}>PAY:</span>
                      <div className={`dot ${lead.paymentStatus === 'Completed' ? 'dot--green' : lead.paymentStatus === 'Failed' ? 'dot--rose' : 'dot--amber'}`}></div>
                      <span style={{ fontSize: '0.8rem' }}>{lead.paymentStatus}</span>
                    </div>
                    <div className="status-pill" style={{ padding: '2px 8px', minWidth: '110px', justifyContent: 'flex-start' }}>
                      <span className="small text-muted me-1" style={{ fontSize: '0.65rem' }}>BOOK:</span>
                      <div className={`dot ${lead.status === 'Done' ? 'dot--green' : lead.status === 'Confirmed' ? 'dot--blue' : 'dot--amber'}`}></div>
                      <span style={{ fontSize: '0.8rem' }}>{lead.status || 'Pending'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="td-value">{new Date(lead.createdAt).toLocaleDateString()}</div>
                    <div className="td-muted small">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td className="text-end px-4">
                    <div className="position-relative d-inline-block">
                      <button 
                        className="topbar-icon-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(activeMenu === lead._id ? null : lead._id);
                        }}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>

                      {activeMenu === lead._id && (
                        <div 
                          className="action-dropdown shadow-lg animate__animated animate__fadeIn"
                          style={{ position: 'absolute', top: '100%', right: '0', zIndex: '99999', display: 'block' }}
                        >
                          <div className="dropdown-label text-start px-3 py-2 text-muted small fw-bold" style={{ borderBottom: '1px solid var(--border)', marginBottom: '5px' }}>
                            Update Booking Status
                          </div>
                          <button 
                            className="dropdown-item d-flex align-items-center"
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(lead._id, 'Pending'); setActiveMenu(null); }}
                          >
                            <div className="dot dot--amber me-2"></div> Pending
                          </button>
                          <button 
                            className="dropdown-item d-flex align-items-center"
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(lead._id, 'Confirmed'); setActiveMenu(null); }}
                          >
                            <div className="dot dot--blue me-2"></div> Confirmed
                          </button>
                          <button 
                            className="dropdown-item d-flex align-items-center"
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(lead._id, 'Done'); setActiveMenu(null); }}
                          >
                            <div className="dot dot--green me-2"></div> Done
                          </button>
                          <div className="dropdown-divider"></div>
                          <button 
                            className="dropdown-item d-flex align-items-center text-danger"
                            onClick={(e) => { e.stopPropagation(); handleDeleteLead(lead._id); setActiveMenu(null); }}
                          >
                            <i className="fas fa-trash-alt me-2"></i> Delete Lead
                          </button>
                        </div>
                      )}
                    </div>
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
