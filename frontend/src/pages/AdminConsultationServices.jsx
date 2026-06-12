import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';
import { uploadImage } from '../utils/uploadMedia';

const EMPTY_CATEGORY = {
  name: '',
  slug: '',
  icon: 'fa-star',
  description: '',
  sortOrder: '0',
  isActive: true,
};

const EMPTY_SERVICE = {
  categorySlug: '',
  title: '',
  slug: '',
  short: '',
  desc: '',
  price: '',
  duration: '',
  badge: '',
  badgeColor: 'purple',
  img: '',
  highlightsText: '',
  sortOrder: '0',
  isActive: true,
};

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
});

export default function AdminConsultationServices() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingCategorySlug, setEditingCategorySlug] = useState(null);
  const [editingServiceSlug, setEditingServiceSlug] = useState(null);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY);
  const [serviceForm, setServiceForm] = useState(EMPTY_SERVICE);
  const [activePanel, setActivePanel] = useState('services');

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/consultation-catalog`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
        setServices(data.services || []);
      } else {
        toast.error(data.message || 'Failed to load catalog');
      }
    } catch {
      toast.error('Failed to load consultation catalog');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const resetCategoryForm = () => {
    setEditingCategorySlug(null);
    setCategoryForm(EMPTY_CATEGORY);
  };

  const resetServiceForm = () => {
    setEditingServiceSlug(null);
    setServiceForm(EMPTY_SERVICE);
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setSaving(true);
    try {
      const url = editingCategorySlug
        ? `${API_BASE}/api/admin/consultation-categories/${editingCategorySlug}`
        : `${API_BASE}/api/admin/consultation-categories`;
      const res = await fetch(url, {
        method: editingCategorySlug ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          ...categoryForm,
          sortOrder: Number(categoryForm.sortOrder) || 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingCategorySlug ? 'Category updated' : 'Category created');
        resetCategoryForm();
        loadCatalog();
      } else {
        toast.error(data.message || 'Save failed');
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const saveService = async (e) => {
    e.preventDefault();
    if (!serviceForm.categorySlug || !serviceForm.title.trim() || !serviceForm.desc.trim()) {
      toast.error('Category, title, and description are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...serviceForm,
        price: Number(serviceForm.price),
        sortOrder: Number(serviceForm.sortOrder) || 0,
        highlights: serviceForm.highlightsText
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
      };
      delete payload.highlightsText;

      const url = editingServiceSlug
        ? `${API_BASE}/api/admin/consultation-services/${editingServiceSlug}`
        : `${API_BASE}/api/admin/consultation-services`;
      const res = await fetch(url, {
        method: editingServiceSlug ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingServiceSlug ? 'Service updated' : 'Service created');
        resetServiceForm();
        loadCatalog();
      } else {
        toast.error(data.message || 'Save failed');
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const editCategory = (cat) => {
    setEditingCategorySlug(cat.slug || cat.id);
    setCategoryForm({
      name: cat.name,
      slug: cat.slug || cat.id,
      icon: cat.icon || 'fa-star',
      description: cat.description || '',
      sortOrder: String(cat.sortOrder ?? 0),
      isActive: cat.isActive !== false,
    });
    setActivePanel('categories');
  };

  const editService = (svc) => {
    setEditingServiceSlug(svc.slug || svc.id);
    setServiceForm({
      categorySlug: svc.categoryId || svc.categorySlug,
      title: svc.title,
      slug: svc.slug || svc.id,
      short: svc.short || '',
      desc: svc.desc || '',
      price: String(svc.price ?? ''),
      duration: svc.duration || '',
      badge: svc.badge || '',
      badgeColor: svc.badgeColor || 'purple',
      img: svc.img || '',
      highlightsText: (svc.highlights || []).join('\n'),
      sortOrder: String(svc.sortOrder ?? 0),
      isActive: svc.isActive !== false,
    });
    setActivePanel('services');
  };

  const deleteCategory = async (slug) => {
    if (!window.confirm('Delete this category? It must have no services.')) return;
    const res = await fetch(`${API_BASE}/api/admin/consultation-categories/${slug}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const data = await res.json();
    if (data.success) {
      toast.success('Category deleted');
      loadCatalog();
    } else {
      toast.error(data.message || 'Delete failed');
    }
  };

  const deleteService = async (slug) => {
    if (!window.confirm('Delete this consultation service?')) return;
    const res = await fetch(`${API_BASE}/api/admin/consultation-services/${slug}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const data = await res.json();
    if (data.success) {
      toast.success('Service deleted');
      loadCatalog();
    } else {
      toast.error(data.message || 'Delete failed');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, 'consultation-services');
      setServiceForm((prev) => ({ ...prev, img: url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <p className="dash-section-title">Loading consultation catalog…</p>;
  }

  return (
    <div>
      <div className="coupons-header">
        <div>
          <h2>Consultation Catalog</h2>
          <p>Manage consultation categories and service cards shown on the public booking page.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button type="button" className={`coupon-action-btn ${activePanel === 'services' ? '' : 'opacity-60'}`} onClick={() => setActivePanel('services')}>
          Services ({services.length})
        </button>
        <button type="button" className={`coupon-action-btn ${activePanel === 'categories' ? '' : 'opacity-60'}`} onClick={() => setActivePanel('categories')}>
          Categories ({categories.length})
        </button>
      </div>

      {activePanel === 'categories' && (
        <div className="coupons-grid">
          <form onSubmit={saveCategory} className="coupon-form-card">
            <h3 className="dash-section-title">{editingCategorySlug ? 'Edit Category' : 'Add Category'}</h3>
            <div className="coupon-form-row"><label>Name</label><input value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} required /></div>
            <div className="coupon-form-row"><label>Slug</label><input value={categoryForm.slug} onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })} disabled={!!editingCategorySlug} placeholder="auto from name" /></div>
            <div className="coupon-form-row"><label>Icon</label><input value={categoryForm.icon} onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })} /></div>
            <div className="coupon-form-row"><label>Description</label><textarea rows={3} value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} /></div>
            <div className="coupon-form-row"><label>Sort order</label><input type="number" value={categoryForm.sortOrder} onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: e.target.value })} /></div>
            <label className="coupon-checkbox"><input type="checkbox" checked={categoryForm.isActive} onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.checked })} /> Active</label>
            <div className="coupon-form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Category'}</button>
              {editingCategorySlug && <button type="button" className="btn-secondary" onClick={resetCategoryForm}>Cancel</button>}
            </div>
          </form>

          <div className="admin-table-shell">
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Slug</th><th>Count</th><th>Active</th><th /></tr></thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.slug || cat.id}>
                      <td>{cat.name}</td>
                      <td><code>{cat.slug || cat.id}</code></td>
                      <td>{cat.cards?.length ?? 0}</td>
                      <td>{cat.isActive !== false ? 'Yes' : 'No'}</td>
                      <td>
                        <button type="button" className="btn-secondary btn-sm" onClick={() => editCategory(cat)}>Edit</button>
                        <button type="button" className="btn-danger btn-sm" onClick={() => deleteCategory(cat.slug || cat.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activePanel === 'services' && (
        <div className="coupons-grid">
          <form onSubmit={saveService} className="coupon-form-card">
            <h3 className="dash-section-title">{editingServiceSlug ? 'Edit Service' : 'Add Service'}</h3>
            <div className="coupon-form-row">
              <label>Category</label>
              <select value={serviceForm.categorySlug} onChange={(e) => setServiceForm({ ...serviceForm, categorySlug: e.target.value })} required>
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.slug || cat.id} value={cat.slug || cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="coupon-form-row"><label>Title</label><input value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} required /></div>
            <div className="coupon-form-row"><label>Slug</label><input value={serviceForm.slug} onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })} disabled={!!editingServiceSlug} /></div>
            <div className="coupon-form-row"><label>Short label</label><input value={serviceForm.short} onChange={(e) => setServiceForm({ ...serviceForm, short: e.target.value })} /></div>
            <div className="coupon-form-row"><label>Description</label><textarea rows={4} value={serviceForm.desc} onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })} required /></div>
            <div className="coupon-form-row two-col">
              <div><label>Price (INR)</label><input type="number" min="0" value={serviceForm.price} onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })} required /></div>
              <div><label>Duration</label><input value={serviceForm.duration} onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })} /></div>
            </div>
            <div className="coupon-form-row two-col">
              <div><label>Badge</label><input value={serviceForm.badge} onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })} /></div>
              <div>
                <label>Badge color</label>
                <select value={serviceForm.badgeColor} onChange={(e) => setServiceForm({ ...serviceForm, badgeColor: e.target.value })}>
                  {['purple', 'pink', 'orange', 'red', 'green'].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="coupon-form-row"><label>Image URL</label><input value={serviceForm.img} onChange={(e) => setServiceForm({ ...serviceForm, img: e.target.value })} /></div>
            <div className="coupon-form-row"><label>Upload image</label><input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} /></div>
            {serviceForm.img && <img src={serviceForm.img} alt="" style={{ maxWidth: 120, borderRadius: 8, marginBottom: 12 }} />}
            <div className="coupon-form-row"><label>Highlights (one per line)</label><textarea rows={3} value={serviceForm.highlightsText} onChange={(e) => setServiceForm({ ...serviceForm, highlightsText: e.target.value })} /></div>
            <div className="coupon-form-row"><label>Sort order</label><input type="number" value={serviceForm.sortOrder} onChange={(e) => setServiceForm({ ...serviceForm, sortOrder: e.target.value })} /></div>
            <label className="coupon-checkbox"><input type="checkbox" checked={serviceForm.isActive} onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })} /> Active</label>
            <div className="coupon-form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Service'}</button>
              {editingServiceSlug && <button type="button" className="btn-secondary" onClick={resetServiceForm}>Cancel</button>}
            </div>
          </form>

          <div className="admin-table-shell">
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead><tr><th>Service</th><th>Category</th><th>Price</th><th>Active</th><th /></tr></thead>
                <tbody>
                  {services.map((svc) => (
                    <tr key={svc.slug || svc.id}>
                      <td><strong>{svc.title}</strong><br /><code>{svc.slug || svc.id}</code></td>
                      <td>{svc.category}</td>
                      <td>{svc.priceLabel}</td>
                      <td>{svc.isActive !== false ? 'Yes' : 'No'}</td>
                      <td>
                        <button type="button" className="btn-secondary btn-sm" onClick={() => editService(svc)}>Edit</button>
                        <button type="button" className="btn-danger btn-sm" onClick={() => deleteService(svc.slug || svc.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
