import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Utensils, X, CheckCircle2 } from 'lucide-react';

export const RestaurantSection = () => {
  const { restaurant, addDiningBooking } = useResort();
  const [activeCategory, setActiveCategory] = useState(restaurant.categories[0]?.id || '');
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('19:30');
  const [resGuests, setResGuests] = useState(4);
  const [resNotes, setResNotes] = useState('');
  const [createdTableBooking, setCreatedTableBooking] = useState(null);

  const currentCategory = restaurant.categories.find(c => c.id === activeCategory) || restaurant.categories[0] || { dishes: [] };

  const handleTableSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim() || !resDate) return;

    const result = addDiningBooking({
      customerName: guestName,
      phone: guestPhone,
      date: resDate,
      time: resTime,
      guests: resGuests,
      notes: resNotes
    });

    setCreatedTableBooking(result);
  };

  const handleOpenModal = () => {
    setCreatedTableBooking(null);
    setGuestName('');
    setGuestPhone('');
    setResDate(new Date().toISOString().split('T')[0]);
    setResTime('19:30');
    setResGuests(4);
    setResNotes('');
    setTableModalOpen(true);
  };

  return (
    <section id="dining" className="section-padding" style={{ background: '#0f172a', color: '#ffffff', position: 'relative' }}>
      <div className="container">
        {/* Main Royal Menu Header (Matching Reference Design) */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#facc15', borderColor: '#facc15' }}>
            👑 Kings 99 Culinary Legacy
          </span>

          <h2 className="font-serif" style={{ fontSize: '3rem', marginTop: '12px', color: '#facc15', fontWeight: 800, letterSpacing: '0.5px' }}>
            The Royal Feast
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginTop: '8px', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            A culinary journey curated for Kings and Queens
          </p>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleOpenModal}
              className="btn-gold"
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              <Utensils size={18} /> Reserve a Dining Table
            </button>
          </div>
        </div>

        {/* Category Pills Filter Bar (Exact Match with Reference Image) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '50px'
        }}>
          {restaurant.categories.map(cat => {
            const isActive = (activeCategory || restaurant.categories[0]?.id) === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: isActive ? '2px solid #facc15' : '1px solid rgba(255, 255, 255, 0.25)',
                  background: isActive ? '#facc15' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#0f172a' : '#ffffff',
                  boxShadow: isActive ? '0 0 20px rgba(250, 204, 21, 0.4)' : 'none'
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Category Title Heading */}
        {currentCategory && (
          <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#fef08a', fontWeight: 700 }}>
              {currentCategory.title.includes('MAHARASHTRIAN') || currentCategory.title.includes('INDIAN') ? 'Main Course' : currentCategory.title}
            </h3>
          </div>
        )}

        {/* Dish Items Card Grid (Matching Reference Image Dark Cards) */}
        {currentCategory && currentCategory.dishes && currentCategory.dishes.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {currentCategory.dishes.map(dish => (
              <div
                key={dish.id}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '18px 22px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backdropFilter: 'blur(8px)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{ paddingRight: '12px' }}>
                  <h4 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 700, margin: 0 }}>
                    {dish.name}
                  </h4>
                  {dish.description && (
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px', lineHeight: 1.3 }}>
                      {dish.description}
                    </p>
                  )}
                  {dish.tag && (
                    <span style={{
                      fontSize: '0.7rem',
                      color: '#facc15',
                      background: 'rgba(250, 204, 21, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      display: 'inline-block',
                      marginTop: '6px',
                      fontWeight: 600
                    }}>
                      {dish.tag}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#facc15', flexShrink: 0 }}>
                  ₹{dish.price}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
            No dishes added in this category yet.
          </div>
        )}

        {/* Dining Ambiance Photo Showcase */}
        {restaurant.ambianceGallery && restaurant.ambianceGallery.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h4 className="font-serif" style={{ fontSize: '1.5rem', color: '#facc15', textAlign: 'center', marginBottom: '24px', fontWeight: 700 }}>
              🏡 Garden & Ambiance Dining Showcase
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px'
            }}>
              {restaurant.ambianceGallery.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxPhoto(photo)}
                  style={{
                    height: '220px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img
                    src={photo}
                    alt={`Ambiance ${idx}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="modal-overlay" onClick={() => setLightboxPhoto(null)} style={{ zIndex: 1200 }}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img src={lightboxPhoto} alt="Zoom" style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px' }} />
            <button
              onClick={() => setLightboxPhoto(null)}
              style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Table Reservation Modal */}
      {tableModalOpen && (
        <div className="modal-overlay" onClick={() => setTableModalOpen(false)} style={{ zIndex: 1150 }}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '30px', background: '#1e293b', color: '#ffffff' }}>
            <button
              onClick={() => setTableModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            {!createdTableBooking ? (
              <form onSubmit={handleTableSubmit}>
                <span className="badge-gold">Kings 99 Nashik</span>
                <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#facc15', margin: '8px 0 16px', fontWeight: 800 }}>
                  Reserve Dining Table
                </h3>

                <div style={{ marginBottom: '14px' }}>
                  <label className="form-label" style={{ color: '#cbd5e1' }}>Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="form-label" style={{ color: '#cbd5e1' }}>Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label className="form-label" style={{ color: '#cbd5e1' }}>Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ color: '#cbd5e1' }}>Time Slot *</label>
                    <select
                      className="form-input"
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Dinner)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="form-label" style={{ color: '#cbd5e1' }}>Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    className="form-input"
                    value={resGuests}
                    onChange={(e) => setResGuests(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label" style={{ color: '#cbd5e1' }}>Special Seating Requests</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Garden candle-light table, high chair for kid"
                    value={resNotes}
                    onChange={(e) => setResNotes(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}
                >
                  <Utensils size={18} /> Confirm Table Reservation
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={48} color="#22c55e" style={{ margin: '0 auto 16px' }} />
                <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#facc15', marginBottom: '10px' }}>
                  Table Reservation Received!
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Thank you <strong>{createdTableBooking.customerName}</strong>! Your table reservation for <strong>{createdTableBooking.guests} guests</strong> on <strong>{createdTableBooking.date}</strong> at <strong>{createdTableBooking.time}</strong> has been logged.
                </p>

                <button
                  onClick={() => setTableModalOpen(false)}
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
