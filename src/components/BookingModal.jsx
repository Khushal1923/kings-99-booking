import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { X, User, CheckCircle2, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';

export const BookingModal = ({ selectedVilla, onClose }) => {
  const { villas, checkAvailability, addBooking, cms } = useResort();

  const activeVillas = villas.filter(v => v.isActive);
  const initialVillaId = selectedVilla ? selectedVilla.id : (activeVillas[0]?.id || '');

  const [villaId, setVillaId] = useState(initialVillaId);

  // Set default dates (Check-in: tomorrow, Check-out: 3 days after)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = tomorrow.toISOString().split('T')[0];

  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  const defaultCheckOut = threeDaysLater.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);

  const currentVilla = villas.find(v => v.id === villaId);

  // Calculate nights and total price in INR ₹
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

  // Validate dates whenever they change
  useEffect(() => {
    if (checkIn && checkOut && villaId) {
      const res = checkAvailability(villaId, checkIn, checkOut);
      if (!res.available) {
        setErrorMsg(res.reason);
      } else {
        setErrorMsg('');
      }
    }
  }, [villaId, checkIn, checkOut]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg("Please provide your Name and Mobile Number so we can confirm your booking.");
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
        guests,
        totalPrice: total,
        specialRequests
      };
      const result = addBooking(bookingData);
      setCreatedBooking(result);
    } catch (err) {
      setErrorMsg(err.message || "Could not complete booking request.");
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
            <div style={{ marginBottom: '24px' }}>
              <span className="badge-gold">Kings 99 Nashik Staycation</span>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', marginTop: '8px', color: '#fff' }}>
                Book Your Private Pool Villa
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Select your dates and preferred villa to check real-time availability and request your staycation in Nashik.
              </p>
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

            <form onSubmit={handleSubmit}>
              {/* Villa Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Select Villa</label>
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

              {/* Date Selection */}
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
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  required
                />
              </div>

              {/* Summary Price Box in ₹ */}
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
                      ₹{currentVilla.price.toLocaleString('en-IN')} x {nights} Nights ({guests} Guests)
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

              {/* Submit Button */}
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
                <Sparkles size={18} /> Confirm & Request Booking
              </button>
            </form>
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
              Booking Reference: {createdBooking.id}
            </span>

            <h2 className="font-serif" style={{ fontSize: '2rem', color: '#fff', marginBottom: '12px' }}>
              Booking Request Submitted!
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 24px' }}>
              Thank you <strong style={{ color: '#fff' }}>{createdBooking.customerName}</strong>. Your reservation request for <strong style={{ color: 'var(--accent-gold)' }}>{createdBooking.villaName}</strong> ({createdBooking.checkIn} to {createdBooking.checkOut}) at Kings 99 Nashik has been received.
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
                Click below to send your booking details directly to Kings 99 Nashik team on WhatsApp:
              </p>
              <a
                href={`https://wa.me/${cms.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Kings 99 Nashik, I submitted a villa booking request!\nRef: ${createdBooking.id}\nVilla: ${createdBooking.villaName}\nDates: ${createdBooking.checkIn} to ${createdBooking.checkOut}\nName: ${createdBooking.customerName}\nMobile: ${createdBooking.phone}`
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
