import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ImageUploader } from '../components/ImageUploader';
import { Plus, Trash2, Check } from 'lucide-react';

export const RestaurantManagementTab = () => {
  const { restaurant, saveRestaurantData } = useResort();

  const [restName, setRestName] = useState(restaurant.name);
  const [restDesc, setRestDesc] = useState(restaurant.description);
  const [restCover, setRestCover] = useState(restaurant.coverImage);
  const [categories, setCategories] = useState(restaurant.categories);
  const [ambianceGallery, setAmbianceGallery] = useState(restaurant.ambianceGallery);

  const [newDishModal, setNewDishModal] = useState(false);
  const [targetCatId, setTargetCatId] = useState('');
  const [dishForm, setDishForm] = useState({ name: '', price: 340, description: '', tag: 'Chef Special', image: '' });

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
    alert("Restaurant information saved!");
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
      <div style={{ marginBottom: '24px' }}>
        <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
          🍽️ Restaurant & Culinary Management (Kings 99 Nashik)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Update restaurant profile, menu categories, dish items, prices in ₹ INR, and upload food photos.
        </p>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveHeader} className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '32px' }}>
        <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>
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
        <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>
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
        <h4 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '20px' }}>
          Digital Menu Dishes & Items
        </h4>

        {categories.map(cat => (
          <div key={cat.id} className="glass-card" style={{ padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h5 className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--accent-gold)' }}>
                {cat.title} ({cat.dishes.length} Items)
              </h5>

              <button
                onClick={() => {
                  setTargetCatId(cat.id);
                  setDishForm({ name: '', price: 340, description: '', tag: 'Chef Special', image: '' });
                  setNewDishModal(true);
                }}
                className="btn-gold"
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                <Plus size={14} /> Add Dish to {cat.title}
              </button>
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
                  <img src={dish.image} alt={dish.name} style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', shrink: 0 }} />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{dish.name}</strong>
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>₹{dish.price}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dish.tag}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteDish(cat.id, dish.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Dish Modal */}
      {newDishModal && (
        <div className="modal-overlay" onClick={() => setNewDishModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h4 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '16px' }}>
              Add New Dish Item
            </h4>

            <form onSubmit={handleAddDish}>
              <div style={{ marginBottom: '12px' }}>
                <label className="form-label">Dish Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={dishForm.name}
                  onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({ ...dishForm, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Dietary Tag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={dishForm.tag}
                    onChange={(e) => setDishForm({ ...dishForm, tag: e.target.value })}
                    placeholder="Pure Veg, Tandoor, Chef Special"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={dishForm.description}
                  onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                  required
                />
              </div>

              <ImageUploader
                label="Dish Photo (Upload File or URL)"
                value={dishForm.image}
                onChange={(img) => setDishForm({ ...dishForm, image: img })}
              />

              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                Save Dish to Menu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
