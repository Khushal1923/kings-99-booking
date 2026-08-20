import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Utensils, X, MessageSquare, CheckCircle2 } from 'lucide-react';

export const RestaurantSection = () => {
  const { restaurant, addDiningBooking, cms } = useResort();
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

  const currentCategory = restaurant.categories.find(c => c.id === activeCategory) || restaurant.categories[0];

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
    <section id="dining" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container">
        {/* Restaurant Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <span className="badge-gold">Kings 99 Nashik Dining</span>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '10px', color: 'var(--text-dark)', fontWeight: 800 }}>
            {restaurant.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px' }}>
            {restaurant.description}
          </p>

          <button
            onClick={handleOpenModal}
            className="btn-gold"
            style={{ marginTop: '24px' }}
          >
            <Utensils size={18} /> Reserve a Dining Table
          </button>
        </div>

        {/* Ambiance Showcase Banner */}
        <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-lg)', marginBottom: '60px', background: 'var(--bg-primary)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {restaurant.ambianceGallery.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxPhoto(photo)}
                style={{
                  height: '240px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative'
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

        {/* Digital Menu Categories Tabs */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 className="font-serif" style={{ fontSize: '1.85rem', color: 'var(--text-dark)', marginBottom: '20px', fontWeight: 800 }}>
            Kings Special Culinary Menu
          </h3>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {restaurant.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id ? 'btn-gold' : 'btn-outline'}
                style={{ padding: '10px 22px' }}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Cards Grid with ₹ Prices */}
        {currentCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {currentCategory.dishes.map(dish => (
              <div key={dish.id} className="glass-card" style={{ display: 'flex', gap: '16px', padding: '18px', alignItems: 'center' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ width: '110px', height: '110px', borderRadius: '14px', objectFit: 'cover', shrink: 0 }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-dark)', fontWeight: 700 }}>
                      {dish.name}
                    </h4>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>
                      ₹{dish.price}
                    </span>
                  </div>

                  {dish.tag && (
                    <span style={{
                      fontSize: '0.7rem',
                      color: 'var(--accent-gold-dark)',
                      background: 'rgba(197,160,89,0.12)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      display: 'inline-block',
                      margin: '4px 0 8px',
                      fontWeight: 700
                    }}>
                      {dish.tag}
                    </span>
                  )}

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="modal-overlay" onClick={() => setLightboxPhoto(null)}>
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
        <div className="modal-overlay" onClick={() => setTableModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setTableModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            {!createdTableBooking ? (
              <form onSubmit={handleTableSubmit}>
                <span className="badge-gold">Kings 99 Nashik</span>
                <h3 className="font-serif" style={{ fontSize: '1.75rem', color: 'var(--text-dark)', margin: '8px 0 16px', fontWeight: 800 }}>
                  Reserve Dining Table
                </h3>

                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={guestPhone}
                    placeholder="+91 99999 99999"
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Time Slot</label>
                    <select
                      className="form-input"
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                    >
                      <option value="13:00">01:00 PM (Lunch)</option>
                      <option value="14:30">02:30 PM (Late Lunch)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Peak Dinner)</option>
                      <option value="21:30">09:30 PM (Late Night)</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Guests</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      className="form-input"
                      value={resGuests}
                      onChange={(e) => setResGuests(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Table Preferences / Notes</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Outdoor lawn table, birthday decoration..."
                    value={resNotes}
                    onChange={(e) => setResNotes(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  <Utensils size={18} /> Confirm Table Request
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 color="var(--accent-emerald)" size={48} style={{ margin: '0 auto 16px' }} />
                <span className="status-badge status-pending" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>
                  Reference: {createdTableBooking.id}
                </span>

                <h3 className="font-serif" style={{ fontSize: '1.75rem', color: 'var(--text-dark)', margin: '12px 0 8px', fontWeight: 800 }}>
                  Table Reservation Received!
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Thank you <strong style={{ color: 'var(--text-dark)' }}>{createdTableBooking.customerName}</strong>. Your table request for {createdTableBooking.guests} guests on {createdTableBooking.date} at {createdTableBooking.time} has been saved.
                </p>

                <a
                  href={`https://wa.me/${cms.whatsappNumber}?text=${encodeURIComponent(
                    `Namaste Kings 99 Nashik, I submitted a Table Reservation Request!\nRef: ${createdTableBooking.id}\nName: ${createdTableBooking.customerName}\nMobile: ${createdTableBooking.phone}\nDate: ${createdTableBooking.date} at ${createdTableBooking.time}\nGuests: ${createdTableBooking.guests}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', background: '#0d5c46', color: '#fff' }}
                >
                  <MessageSquare size={18} /> Send WhatsApp Alert to Kings 99
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
