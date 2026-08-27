import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { X, User, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Home, UtensilsCrossed } from 'lucide-react';

export const BookingModal = ({ selectedVilla, onClose }) => {
  const { villas, checkAvailability, addBooking, addDiningBooking, cms } = useResort();

  const [bookingMode, setBookingMode] = useState('VILLA'); // 'VILLA' | 'TABLE'

  const activeVillas = villas.filter(v => v.isActive);
  const initialVillaId = selectedVilla ? selectedVilla.id : (activeVillas[0]?.id || '');

  const [villaId, setVillaId] = useState(initialVillaId);

  // Villa dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = tomorrow.toISOString().split('T')[0];

  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  const defaultCheckOut = threeDaysLater.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [villaGuests, setVillaGuests] = useState(2);

  // Dining table dates
  const todayStr = new Date().toISOString().split('T')[0];
  const [diningDate, setDiningDate] = useState(todayStr);
  const [diningTime, setDiningTime] = useState('19:30');
  const [diningGuests, setDiningGuests] = useState(4);
  const [diningNotes, setDiningNotes] = useState('');

  // Common customer contact details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);
  const [createdType, setCreatedType] = useState('VILLA');

  const currentVilla = villas.find(v => v.id === villaId);

  // Calculate nights and total price in INR ₹ for villa
  const calculateTotal = () => {
    if (!checkIn || !checkOut || !currentVilla) return { nights: 0, total: 0 };
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const timeDiff = end.getTime() - start.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (nights <= 0) return { nights: 0, total: 0 };
    return { nights, total: nights * currentVilla.price };
  };

  const { nights, total } = calculateTotal();

  // Validate villa dates whenever they change
  useEffect(() => {
    if (bookingMode === 'VILLA' && checkIn && checkOut && villaId) {
      const res = checkAvailability(villaId, checkIn, checkOut);
      if (!res.available) {
        setErrorMsg(res.reason);
      } else {
        setErrorMsg('');
      }
    } else {
      setErrorMsg('');
    }
  }, [bookingMode, villaId, checkIn, checkOut, checkAvailability]);

  const handleVillaSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg("Please provide your Name and Mobile Number so we can confirm your villa booking.");
      return;
    }

    try {
      const bookingData = {
        villaId,
        customerName,
        phone,
        email,
        checkIn,
        checkOut,
        guests: villaGuests,
        totalPrice: total,
        specialRequests
      };
      const result = await addBooking(bookingData);
      setCreatedType('VILLA');
      setCreatedBooking(result);
    } catch (err) {
      setErrorMsg(err.message || "Could not complete villa booking request.");
    }
  };

  const handleDiningSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg("Please provide your Name and Mobile Number so we can confirm your table reservation.");
      return;
    }

    try {
      const tableData = {
        customerName,
        phone,
        date: diningDate,
        time: diningTime,
        guests: diningGuests,
        notes: diningNotes || specialRequests
      };
      const result = await addDiningBooking(tableData);
      setCreatedType('TABLE');
      setCreatedBooking(result);
    } catch (err) {
      setErrorMsg(err.message || "Could not complete dining table reservation.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        {!createdBooking ? (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span className="badge-gold">Kings 99 Nashik Reservations</span>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', marginTop: '8px', color: '#fff' }}>
                Online Reservation Desk
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Select whether you would like to book a private pool villa staycation or reserve a multicuisine dining table.
              </p>
            </div>

            {/* Mode Switcher Tabs: Villa vs Dining Table */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-primary)',
              padding: '4px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '24px',
              border: '1px solid var(--border-glass)'
            }}>
              <button
                type="button"
                onClick={() => { setBookingMode('VILLA'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: bookingMode === 'VILLA' ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : 'transparent',
                  color: bookingMode === 'VILLA' ? '#fff' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Home size={16} /> 🏡 Private Pool Villa Stay
              </button>

              <button
                type="button"
                onClick={() => { setBookingMode('TABLE'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: bookingMode === 'TABLE' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
                  color: bookingMode === 'TABLE' ? '#0b1310' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <UtensilsCrossed size={16} /> 🍽️ Reserve Dining Table
              </button>
            </div>

            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#ef4444',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <AlertCircle size={20} shrink={0} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* VILLA BOOKING FORM */}
            {bookingMode === 'VILLA' && (
              <form onSubmit={handleVillaSubmit}>
                {/* Villa Selector */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Select Villa Accommodation</label>
                  <select
                    className="form-input"
                    value={villaId}
                    onChange={(e) => setVillaId(e.target.value)}
                  >
                    {activeVillas.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} - ₹{v.price.toLocaleString('en-IN')}/night (Max {v.maxGuests} Guests)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Villa Date Selection */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label className="form-label">Check-In Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Check-Out Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Guests Count */}
                <div style={{ marginBottom: '24px' }}>
                  <label className="form-label">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    max={currentVilla ? currentVilla.maxGuests : 10}
                    className="form-input"
                    value={villaGuests}
                    onChange={(e) => setVillaGuests(e.target.value)}
                    required
                  />
                </div>

                {/* Summary Price Box */}
                {currentVilla && nights > 0 && (
                  <div style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-glass)',
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        ₹{currentVilla.price.toLocaleString('en-IN')} x {nights} Nights ({villaGuests} Guests)
                      </span>
                      <h4 className="text-gold" style={{ fontSize: '1.25rem' }}>
                        Est. Total: ₹{total.toLocaleString('en-IN')}
                      </h4>
                    </div>
                    <span className="badge-gold">Best Rate Guaranteed</span>
                  </div>
                )}

                {/* Customer Contact Details */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} color="var(--accent-gold)" /> Guest Contact Information
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rahul Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+91 99999 99999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label className="form-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label">Special Requests / Occasion</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      placeholder="Birthday decoration, extra bedding, pool dinner setup..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  disabled={!!errorMsg}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    fontSize: '1rem',
                    opacity: errorMsg ? 0.6 : 1,
                    cursor: errorMsg ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Sparkles size={18} /> Confirm & Request Villa Staycation
                </button>
              </form>
            )}

            {/* DINING TABLE RESERVATION FORM */}
            {bookingMode === 'TABLE' && (
              <form onSubmit={handleDiningSubmit}>
                {/* Dining Date & Time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label className="form-label">Reservation Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={diningDate}
                      onChange={(e) => setDiningDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Time Slot</label>
                    <select
                      className="form-input"
                      value={diningTime}
                      onChange={(e) => setDiningTime(e.target.value)}
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="14:30">02:30 PM (Late Lunch)</option>
                      <option value="19:00">07:00 PM (Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Late Dinner)</option>
                    </select>
                  </div>
                </div>

                {/* Table Guests Count */}
                <div style={{ marginBottom: '24px' }}>
                  <label className="form-label">Number of Dining Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    className="form-input"
                    value={diningGuests}
                    onChange={(e) => setDiningGuests(e.target.value)}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} color="var(--accent-gold)" /> Dining Guest Information
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Ananya Deshmukh"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+91 99999 99999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Seating Preference / Special Notes</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      placeholder="Open-air lawn table, anniversary celebration setup, high chair..."
                      value={diningNotes}
                      onChange={(e) => setDiningNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#0b1310'
                  }}
                >
                  <Sparkles size={18} /> Confirm & Reserve Dining Table
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Booking Success Screen */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <span className="status-badge status-pending" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>
              Reference: {createdBooking.id}
            </span>

            <h2 className="font-serif" style={{ fontSize: '2rem', color: '#fff', marginBottom: '12px' }}>
              {createdType === 'VILLA' ? 'Villa Booking Request Received!' : 'Table Reservation Requested!'}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 24px' }}>
              Thank you <strong style={{ color: '#fff' }}>{createdBooking.customerName}</strong>. Your {createdType === 'VILLA' ? `reservation request for ${createdBooking.villaName} (${createdBooking.checkIn} to ${createdBooking.checkOut})` : `table reservation for ${createdBooking.guests} guests on ${createdBooking.date} at ${createdBooking.time}`} at Kings 99 Nashik has been received.
            </p>

            <div style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '8px', fontSize: '0.9rem' }}>
                📲 Send Instant WhatsApp Confirmation
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Click below to send your details directly to Kings 99 Nashik team on WhatsApp:
              </p>
              <a
                href={`https://wa.me/${cms.whatsappNumber}?text=${encodeURIComponent(
                  createdType === 'VILLA'
                    ? `Hello Kings 99 Nashik, I submitted a villa booking request!\nRef: ${createdBooking.id}\nVilla: ${createdBooking.villaName}\nDates: ${createdBooking.checkIn} to ${createdBooking.checkOut}\nName: ${createdBooking.customerName}\nMobile: ${createdBooking.phone}`
                    : `Hello Kings 99 Nashik, I submitted a table reservation request!\nRef: ${createdBooking.id}\nDate: ${createdBooking.date} at ${createdBooking.time}\nGuests: ${createdBooking.guests}\nName: ${createdBooking.customerName}\nMobile: ${createdBooking.phone}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{ marginTop: '14px', width: '100%', justifyContent: 'center' }}
              >
                <MessageSquare size={18} /> Send WhatsApp Alert to Kings 99
              </a>
            </div>

            <button onClick={onClose} className="btn-outline" style={{ padding: '10px 30px' }}>
              Close & Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
