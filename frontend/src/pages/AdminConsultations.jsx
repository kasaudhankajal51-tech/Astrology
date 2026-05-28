import React, { useState, useEffect } from 'react';
import API_BASE from '../utils/api';
import toast from 'react-hot-toast';

function AdminConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConsultations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/api/admin/consultations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setConsultations(data.consultations);
      }
    } catch (err) {
      toast.error('Failed to load consultations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/api/admin/consultations/${id}`, {
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
        fetchConsultations(); // refresh list
      }
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (loading) return <div className="text-center py-5"><div className="lf-spinner"></div></div>;

  return (
    <div className="dash-home">
      <div className="mb-4">
        <h2 className="dash-section-title mb-1">Consultation Requests</h2>
        <p className="text-muted small">Manage complimentary consultations booked by students.</p>
      </div>

      <div className="leads-table-wrap">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Mobile</th>
              <th>Requested Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultations.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">No consultation requests found.</td>
              </tr>
            ) : (
              consultations.map(consult => (
                <tr key={consult._id}>
                  <td>
                    <div className="fw-bold" style={{ color: '#2A0F02' }}>{consult.name}</div>
                    <div className="small text-muted">{consult.email}</div>
                  </td>
                  <td>{consult.courseId?.title || 'Unknown Course'}</td>
                  <td>{consult.mobile}</td>
                  <td>{new Date(consult.preferredDatetime).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${consult.status === 'pending' ? 'status-new' : consult.status === 'completed' ? 'status-contacted' : 'status-spam'}`}>
                      {consult.status.charAt(0).toUpperCase() + consult.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="form-select form-select-sm" 
                      value={consult.status}
                      onChange={(e) => handleStatusChange(consult._id, e.target.value)}
                      style={{ width: '120px', borderRadius: '8px' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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

export default AdminConsultations;
