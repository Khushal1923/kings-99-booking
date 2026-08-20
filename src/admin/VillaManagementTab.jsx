import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ImageUploader } from '../components/ImageUploader';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

export const VillaManagementTab = () => {
  const { villas, saveVilla, deleteVilla } = useResort();

  const [editingVilla, setEditingVilla] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const initialForm = {
    id: '',
    name: '',
    tag: 'Most Popular',
    tagline: '',
    price: 4500,
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 250,
    coverImage: '',
    gallery: [],
    amenities: 'Private Pool, Lawn Garden, AC Bedrooms, Free Parking, Room Service',
    isActive: true
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setEditingVilla(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setFormData({
      ...v,
      amenities: Array.isArray(v.amenities) ? v.amenities.join(', ') : v.amenities
    });
    setEditingVilla(v);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amenitiesArr = typeof formData.amenities === 'string'
      ? formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
      : formData.amenities;

    saveVilla({
      ...formData,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      sqm: Number(formData.sqm),
      amenities: amenitiesArr,
      gallery: formData.gallery.length > 0 ? formData.gallery : [formData.coverImage]
    });

    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
            🏡 Villa & Residence Management (Kings 99 Nashik)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Add new pool villas, update tariffs in ₹ INR, adjust guest capacity, and upload real photos.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-gold">
          <Plus size={18} /> Add New Villa
        </button>
      </div>

      {/* Villas Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {villas.map(v => (
          <div key={v.id} className="glass-card" style={{ padding: '16px', borderRadius: '16px' }}>
            <div style={{ position: 'relative', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <img src={v.coverImage} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span className="badge-gold" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                {v.tag}
              </span>
            </div>

            <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '4px' }}>
              {v.name}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', height: '36px', overflow: 'hidden' }}>
              {v.tagline}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nightly Tariff</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                  ₹{v.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}>/night</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleOpenEdit(v)}
                  className="btn-outline"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${v.name}?`)) deleteVilla(v.id);
                  }}
                  className="btn-danger"
                  style={{ padding: '6px 10px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Villa Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <button
              onClick={() => setModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '20px' }}>
              {editingVilla ? `Edit ${editingVilla.name}` : 'Add New Villa'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label className="form-label">Villa Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Category Tag *</label>
                  <select
                    className="form-input"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  >
                    <option value="Most Popular">Most Popular</option>
                    <option value="Family Special">Family Special</option>
                    <option value="Romantic Getaway">Romantic Getaway</option>
                    <option value="Ultra Luxury">Ultra Luxury</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Tagline / Short Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label className="form-label">Price (₹/night)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Max Guests</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Bedrooms</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Area (m²)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.sqm}
                    onChange={(e) => setFormData({ ...formData, sqm: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Photo Uploaders */}
              <ImageUploader
                label="Villa Main Cover Photo (Upload File or URL)"
                value={formData.coverImage}
                onChange={(img) => setFormData({ ...formData, coverImage: img })}
              />

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Amenities (Comma separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  placeholder="Private Pool, Lawn Garden, AC Bedrooms, Parking"
                />
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                <Check size={18} /> Save Villa Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
