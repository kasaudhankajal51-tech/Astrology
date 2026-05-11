import { useState, useEffect } from 'react';

function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [settings, setSettings] = useState({
    siteName: '',
    siteTitle: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    facebookUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    twitterUrl: '',
    whatsappNumber: '',
    razorpayKeyId: '',
    googleAnalyticsId: '',
    maintenanceMode: false
  });

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
      setMessage({ type: 'error', text: 'Failed to load settings.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-admin-secret': 'admin123' // Maintain backward compatibility if middleware uses it
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Update failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-loading">
        <div className="spinner"></div>
        <p>Loading platform configuration...</p>
      </div>
    );
  }

  const TabButton = ({ id, label, icon }) => (
    <button 
      className={`settings-tab-btn ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      <i className={`fas ${icon}`}></i>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="sh-info">
          <h1>Platform Configuration</h1>
          <p>Global settings for AstroAva ecosystem</p>
        </div>
        <div className="sh-actions">
          {message.text && (
            <div className={`settings-alert alert-${message.type}`}>
              <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
              {message.text}
            </div>
          )}
        </div>
      </div>

      <div className="settings-card">
        <aside className="settings-sidebar">
          <TabButton id="general" label="General Info" icon="fa-info-circle" />
          <TabButton id="social" label="Social Media" icon="fa-share-alt" />
          <TabButton id="integrations" label="Integrations" icon="fa-plug" />
          <TabButton id="security" label="Security" icon="fa-shield-alt" />
        </aside>

        <main className="settings-main">
          <form onSubmit={handleSubmit}>
            {activeTab === 'general' && (
              <div className="settings-section">
                <h3 className="section-title">Site Identity</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Site Name</label>
                    <input 
                      name="siteName" 
                      value={settings.siteName} 
                      onChange={handleChange}
                      placeholder="e.g. AstroAva"
                    />
                  </div>
                  <div className="form-group">
                    <label>Site Title (SEO)</label>
                    <input 
                      name="siteTitle" 
                      value={settings.siteTitle} 
                      onChange={handleChange}
                      placeholder="Browser tab title"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Meta Description</label>
                    <textarea 
                      name="siteDescription" 
                      value={settings.siteDescription} 
                      onChange={handleChange}
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <h3 className="section-title mt-4">Contact Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Support Email</label>
                    <input 
                      name="contactEmail" 
                      type="email"
                      value={settings.contactEmail} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Support Phone</label>
                    <input 
                      name="contactPhone" 
                      value={settings.contactPhone} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Business Address</label>
                    <input 
                      name="address" 
                      value={settings.address} 
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="settings-section">
                <h3 className="section-title">Social Prescence</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label><i className="fab fa-facebook"></i> Facebook URL</label>
                    <input 
                      name="facebookUrl" 
                      value={settings.facebookUrl} 
                      onChange={handleChange}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div className="form-group">
                    <label><i className="fab fa-instagram"></i> Instagram URL</label>
                    <input 
                      name="instagramUrl" 
                      value={settings.instagramUrl} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label><i className="fab fa-youtube"></i> YouTube Channel</label>
                    <input 
                      name="youtubeUrl" 
                      value={settings.youtubeUrl} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label><i className="fab fa-whatsapp"></i> WhatsApp Number</label>
                    <input 
                      name="whatsappNumber" 
                      value={settings.whatsappNumber} 
                      onChange={handleChange}
                      placeholder="+91..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="settings-section">
                <h3 className="section-title">Third-party Keys</h3>
                <p className="section-desc">Configure your payment gateways and analytics tracking.</p>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Razorpay Key ID</label>
                    <input 
                      name="razorpayKeyId" 
                      value={settings.razorpayKeyId} 
                      onChange={handleChange}
                      type="password"
                    />
                    <small>Sensitive info is masked for security.</small>
                  </div>
                  <div className="form-group">
                    <label>Google Analytics (G-ID)</label>
                    <input 
                      name="googleAnalyticsId" 
                      value={settings.googleAnalyticsId} 
                      onChange={handleChange}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="maintenance-toggle mt-4">
                  <div className="mt-info">
                    <h4>Maintenance Mode</h4>
                    <p>Show a maintenance page to all users except admins.</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-section">
                <h3 className="section-title">Admin Access</h3>
                <div className="alert-info">
                  <i className="fas fa-info-circle"></i>
                  <span>Passwords and administrative roles are managed under the user security module.</span>
                </div>
                <button type="button" className="btn btn-outline-danger mt-4">
                  Reset Master Keys
                </button>
              </div>
            )}

            <div className="settings-footer">
              <button 
                type="submit" 
                className={`save-btn ${saving ? 'loading' : ''}`}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="btn-spinner"></div>
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;
