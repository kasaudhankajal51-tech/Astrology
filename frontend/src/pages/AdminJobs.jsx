import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function AdminJobs() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_PASS = 'admin123';

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        headers: { 'x-admin-secret': ADMIN_PASS }
      });
      const data = await res.json();
      if (data.success) setApplications(data.applications);
    } catch (err) {
      toast.error('Failed to fetch applications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-secret': ADMIN_PASS 
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Status updated');
        fetchApplications();
      }
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Expert Recruitment</h3>
        <p className="text-muted small">Review and manage applications from astrology professionals</p>
      </div>
      
      <div className="admin-card">
        <div className="admin-card-header">
          <h5 className="mb-0 fw-bold">Recent Applications</h5>
          <span className="badge-premium badge-consultation">{applications.length} Candidates</span>
        </div>
        <div className="admin-card-body">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submission Date</th>
                  <th>Candidate Details</th>
                  <th>Expertise</th>
                  <th>Experience</th>
                  <th>Current Status</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                ) : applications.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-5 text-muted">No applications received yet.</td></tr>
                ) : (
                  applications.map(app => (
                    <tr key={app._id}>
                      <td>
                        <div className="fw-bold text-dark">{new Date(app.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td>
                        <div className="fw-bold">{app.name}</div>
                        <div className="small text-muted">{app.email}</div>
                        <div className="small text-muted">{app.phone}</div>
                      </td>
                      <td>
                        <span className="badge-premium badge-webinar">{app.position}</span>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{app.experience}</div>
                      </td>
                      <td>
                        <select 
                          className="form-select form-select-sm admin-input fw-bold"
                          style={{ width: '130px', fontSize: '12px' }}
                          value={app.status}
                          onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                        >
                          <option value="Applied">APPLIED</option>
                          <option value="Reviewed">REVIEWED</option>
                          <option value="Interviewing">INTERVIEW</option>
                          <option value="Selected">SELECTED</option>
                          <option value="Rejected">REJECTED</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-premium-outline" onClick={() => alert(app.message || 'No additional details provided by candidate.')}>
                          <i className="fas fa-eye me-1"></i> View Cover Letter
                        </button>
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

export default AdminJobs;
