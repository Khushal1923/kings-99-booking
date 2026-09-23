import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ImageUploader } from '../components/ImageUploader';
import { Plus, Trash2, Check, X, FolderPlus } from 'lucide-react';

export const RestaurantManagementTab = () => {
  const { restaurant, saveRestaurantData } = useResort();

  const [restName, setRestName] = useState(restaurant.name);
  const [restDesc, setRestDesc] = useState(restaurant.description);
  const [restCover, setRestCover] = useState(restaurant.coverImage);
  const [categories, setCategories] = useState(restaurant.categories || []);
  const [ambianceGallery, setAmbianceGallery] = useState(restaurant.ambianceGallery || []);

  // Category Modal
  const [newCatModal, setNewCatModal] = useState(false);
  const [newCatTitle, setNewCatTitle] = useState('');

  // Dish Modal
  const [newDishModal, setNewDishModal] = useState(false);
  const [targetCatId, setTargetCatId] = useState('');
  const [dishForm, setDishForm] = useState({ name: '', price: 350, description: '', tag: 'Chef Special', image: '' });

  const [newAmbiancePhoto, setNewAmbiancePhoto] = useState('');

  const handleSaveHeader = (e) => {
    e.preventDefault();
    saveRestaurantData({
      ...restaurant,
      name: restName,
      description: restDesc,
      coverImage: restCover,
      categories,
      ambianceGallery
    });
    alert("Restaurant profile updated successfully!");
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatTitle.trim()) return;

    const catId = `cat-${newCatTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    const newCategory = {
      id: catId,
      title: newCatTitle.trim().toUpperCase(),
      dishes: []
    };

    const updated = [...categories, newCategory];
    setCategories(updated);
    saveRestaurantData({ ...restaurant, categories: updated });
    setNewCatTitle('');
    setNewCatModal(false);
  };

  const handleDeleteCategory = (catId, catTitle) => {
    if (!confirm(`Are you sure you want to delete the category "${catTitle}" and all its dishes?`)) return;
    const updated = categories.filter(c => c.id !== catId);
    setCategories(updated);
    saveRestaurantData({ ...restaurant, categories: updated });
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    const newDish = { ...dishForm, id: `d-${Date.now()}` };
    const updatedCats = categories.map(cat => {
      if (cat.id === targetCatId) {
        return { ...cat, dishes: [...cat.dishes, newDish] };
      }
      return cat;
    });
    setCategories(updatedCats);
    saveRestaurantData({ ...restaurant, categories: updatedCats });
    setNewDishModal(false);
  };

  const handleDeleteDish = (catId, dishId) => {
    const updatedCats = categories.map(cat => {
      if (cat.id === catId) {
        return { ...cat, dishes: cat.dishes.filter(d => d.id !== dishId) };
      }
      return cat;
    });
    setCategories(updatedCats);
    saveRestaurantData({ ...restaurant, categories: updatedCats });
  };

  const handleAddAmbiance = (imgUrl) => {
    if (!imgUrl) return;
    const updatedGallery = [imgUrl, ...ambianceGallery];
    setAmbianceGallery(updatedGallery);
    saveRestaurantData({ ...restaurant, ambianceGallery: updatedGallery });
    setNewAmbiancePhoto('');
  };

  const handleDeleteAmbiance = (idx) => {
    const updatedGallery = ambianceGallery.filter((_, i) => i !== idx);
    setAmbianceGallery(updatedGallery);
    saveRestaurantData({ ...restaurant, ambianceGallery: updatedGallery });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontWeight: 800 }}>
            🍽️ Restaurant & Digital Menu Management
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage menu categories (e.g. BREAKFAST, INDIAN, MAHARASHTRIAN, DESSERTS), add dish items, update prices in ₹ INR, and upload food photos.
          </p>
        </div>

        <button
          onClick={() => setNewCatModal(true)}
          className="btn-gold"
          style={{ padding: '10px 18px', background: 'var(--accent-emerald)', color: '#fff' }}
        >
          <FolderPlus size={18} /> Add New Menu Category
        </button>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveHeader} className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '32px' }}>
        <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 700 }}>
          Restaurant Overview & Cover Photo
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">Restaurant Name</label>
            <input
              type="text"
              className="form-input"
              value={restName}
              onChange={(e) => setRestName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">Short Description</label>
            <input
              type="text"
              className="form-input"
              value={restDesc}
              onChange={(e) => setRestDesc(e.target.value)}
              required
            />
          </div>
        </div>

        <ImageUploader
          label="Restaurant Cover Photo (Upload File or URL)"
          value={restCover}
          onChange={(img) => setRestCover(img)}
        />

        <button type="submit" className="btn-gold" style={{ padding: '10px 20px' }}>
          <Check size={16} /> Update Restaurant Profile
        </button>
      </form>

      {/* Ambiance Gallery Manager */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '32px' }}>
        <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 700 }}>
          Dining Ambiance Gallery Photos
        </h4>

        <ImageUploader
          label="Add New Ambiance Photo"
          value={newAmbiancePhoto}
          onChange={(img) => handleAddAmbiance(img)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginTop: '16px' }}>
          {ambianceGallery.map((photo, idx) => (
            <div key={idx} style={{ position: 'relative', height: '100px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={photo} alt={`Ambiance ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => handleDeleteAmbiance(idx)}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: 'rgba(0,0,0,0.7)',
                  color: '#ef4444',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Categories & Dishes Manager */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--text-dark)', fontWeight: 800 }}>
            Digital Menu Categories & Items ({categories.length} Categories)
          </h4>
        </div>

        {categories.map(cat => (
          <div key={cat.id} className="glass-card" style={{ padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <h5 className="font-serif" style={{ fontSize: '1.15rem', color: 'var(--accent-gold-dark)', fontWeight: 800, textTransform: 'uppercase' }}>
                {cat.title} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>({cat.dishes.length} Items)</span>
              </h5>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setTargetCatId(cat.id);
                    setDishForm({ name: '', price: 350, description: '', tag: 'Chef Special', image: '' });
                    setNewDishModal(true);
                  }}
                  className="btn-gold"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  <Plus size={14} /> Add Dish to {cat.title}
                </button>

                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.title)}
                  className="btn-danger"
                  style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                  title="Delete Category"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {cat.dishes.map(dish => (
                <div key={dish.id} style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}>
                  {dish.image ? (
                    <img src={dish.image} alt={dish.name} style={{ width: '65px', height: '65px', borderRadius: '8px', objectFit: 'cover', shrink: 0 }} />
                  ) : (
                    <div style={{ width: '65px', height: '65px', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', shrink: 0, color: 'var(--accent-gold-dark)', fontWeight: 700, fontSize: '0.75rem' }}>
                      KINGS 99
                    </div>
                  )}

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 700 }}>{dish.name}</strong>
                      <span style={{ color: 'var(--accent-gold-dark)', fontWeight: 800 }}>₹{dish.price}</span>
                    </div>
                    {dish.tag && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dish.tag}</span>}
                  </div>

                  <button
                    onClick={() => handleDeleteDish(cat.id, dish.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    title="Remove Dish"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Category Modal */}
      {newCatModal && (
        <div className="modal-overlay" onClick={() => setNewCatModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <h4 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 800 }}>
              ➕ Add New Menu Category
            </h4>

            <form onSubmit={handleAddCategory}>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Category Title (e.g. MAHARASHTRIAN, CHINESE, SEAFOOD)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. MAHARASHTRIAN"
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setNewCatModal(false)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-gold" style={{ background: 'var(--accent-emerald)', color: '#fff' }}>
                  <Check size={16} /> Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Dish Modal */}
      {newDishModal && (
        <div className="modal-overlay" onClick={() => setNewDishModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h4 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 800 }}>
              Add New Dish Item
            </h4>

            <form onSubmit={handleAddDish}>
              <div style={{ marginBottom: '12px' }}>
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={targetCatId}
                  onChange={(e) => setTargetCatId(e.target.value)}
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label className="form-label">Dish Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Shev Bhaji / Veg Maratha"
                  value={dishForm.name}
                  onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label className="form-label">Price (₹ INR)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({ ...dishForm, price: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Tag / Speciality</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Chef Special, Pure Veg, Spicy"
                    value={dishForm.tag}
                    onChange={(e) => setDishForm({ ...dishForm, tag: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label className="form-label">Description (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Short description of masalas & ingredients"
                  value={dishForm.description}
                  onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                />
              </div>

              <ImageUploader
                label="Dish Photo (Optional)"
                value={dishForm.image}
                onChange={(img) => setDishForm({ ...dishForm, image: img })}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button type="button" onClick={() => setNewDishModal(false)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-gold">
                  <Check size={16} /> Save Dish Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
