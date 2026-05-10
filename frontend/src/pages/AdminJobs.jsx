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
    <div>
      <h3 className="mb-4">Job Applications</h3>
      
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Position</th>
              <th>Exp</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="6" className="text-center">Loading...</td></tr>
            ) : applications.length === 0 ? (
              <tr><td colSpan="6" className="text-center text-muted">No applications found.</td></tr>
            ) : (
              applications.map(app => (
                <tr key={app._id}>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div>{app.name}</div>
                    <small className="text-muted">{app.email} | {app.phone}</small>
                  </td>
                  <td>{app.position}</td>
                  <td>{app.experience}</td>
                  <td>
                    <select 
                      className="form-select form-select-sm bg-dark text-white border-secondary"
                      value={app.status}
                      onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-info" onClick={() => alert(app.message || 'No message provided')}>View Msg</button>
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

export default AdminJobs;
