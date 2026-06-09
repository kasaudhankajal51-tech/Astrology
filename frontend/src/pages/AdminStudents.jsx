import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';

function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/api/admin/users`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setStudents(data.users);
      } else {
        toast.error(data.message || 'Failed to fetch students');
      }
    } catch (err) {
      toast.error('Network Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.mobile && student.mobile.includes(searchTerm))
  );

  return (
    <div className="admin-leads-content">
      <div className="d-flex flex-column gap-3 mb-4">
        <div className="d-flex flex-column flex-xl-row justify-content-between gap-3">
          <div className="search-bar flex-grow-1" style={{ maxWidth: '400px', background: 'var(--surface)' }}>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search by name, email, or mobile..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <button onClick={fetchStudents} className="topbar-icon-btn" title="Refresh" style={{ height: '42px', width: '42px' }}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <div className="leads-table-wrap border-0 shadow-sm" style={{ minHeight: '400px', background: 'var(--surface)' }}>
        <table className="leads-table w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4">
                  <div className="dash-loading py-5">
                    <div className="dash-spin"></div>
                    <span className="ms-2">Fetching students...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <div className="text-center py-5 text-muted">
                    <i className="fas fa-users fa-3x mb-3 opacity-25"></i>
                    <p className="mb-0">No students found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map(student => (
                <tr key={student._id}>
                  <td className="fw-bold">{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.mobile || 'N/A'}</td>
                  <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminStudents;
