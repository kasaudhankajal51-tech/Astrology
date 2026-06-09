import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/api/admin/orders`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      toast.error('Network Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => 
    (order.guestDetails?.name || order.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.guestDetails?.email || order.userId?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.courseId?.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-leads-content">
      <div className="d-flex flex-column gap-3 mb-4">
        <div className="d-flex flex-column flex-xl-row justify-content-between gap-3">
          <div className="search-bar flex-grow-1" style={{ maxWidth: '400px', background: 'var(--surface)' }}>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search by student or course..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <button onClick={fetchOrders} className="topbar-icon-btn" title="Refresh" style={{ height: '42px', width: '42px' }}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <div className="leads-table-wrap border-0 shadow-sm" style={{ minHeight: '400px', background: 'var(--surface)' }}>
        <table className="leads-table w-100">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">
                  <div className="dash-loading py-5">
                    <div className="dash-spin"></div>
                    <span className="ms-2">Fetching purchases...</span>
                  </div>
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="text-center py-5 text-muted">
                    <i className="fas fa-shopping-cart fa-3x mb-3 opacity-25"></i>
                    <p className="mb-0">No purchases found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                const name = order.userId?.name || order.guestDetails?.name || 'Guest';
                return (
                  <tr key={order._id}>
                    <td><small className="text-muted">{order.razorpayOrderId || order._id.toString().slice(-6)}</small></td>
                    <td className="fw-bold">{name}</td>
                    <td>{order.courseId?.title || 'Unknown Course'}</td>
                    <td className="text-success fw-bold">₹{order.amount}</td>
                    <td>
                      <span className={`badge bg-${order.paymentStatus === 'completed' ? 'success' : order.paymentStatus === 'pending' ? 'warning' : 'danger'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
