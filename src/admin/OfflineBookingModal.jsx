import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { X, Calendar, User, Phone, Mail, Home, CreditCard, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

export const OfflineBookingModal = ({ onClose }) => {
  const { villas, addBooking } = useResort();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedVillaId, setSelectedVillaId] = useState(villas[0]?.id || 1);
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);

  // Default check out tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [checkOut, setCheckOut] = useState(tomorrow.toISOString().split('T')[0]);

  const [guests, setGuests] = useState(2);
  const [paymentMode, setPaymentMode] = useState('UPI / GPay / PhonePe');
  const [paymentStatus, setPaymentStatus] = useState('Paid in Full');
  const [walkInNotes, setWalkInNotes] = useState('');
  const [customPrice, setCustomPrice] = useState('');

  const targetVilla = villas.find((v) => v.id === parseInt(selectedVillaId)) || villas[0];

  // Calculate nights & default price
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const calculatedTotal = targetVilla ? targetVilla.price * nights : 0;
  const finalPrice = customPrice !== '' ? parseFloat(customPrice) : calculatedTotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('Please fill in Guest Name and Mobile Number.');
      return;
    }

    const walkInRef = `K99-WALKIN-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBookingData = {
      id: walkInRef,
      customerName,
      phone,
      email,
      villaId: targetVilla.id,
      villaName: targetVilla.title,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      totalPrice: finalPrice,
      status: 'CONFIRMED',
      bookingType: 'WALK_IN_OFFLINE',
      paymentMode,
      paymentStatus,
      specialRequests: walkInNotes ? `[WALK-IN NOTES]: ${walkInNotes}` : 'Offline Reception Desk Booking',
      createdAt: new Date().toISOString()
    };

    addBooking(newBookingData);
    alert(`🎉 Walk-In Booking Confirmed Successfully!\nRef ID: ${walkInRef}\nVilla: ${targetVilla.title}`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', width: '90%', borderRadius: '24px', padding: '30px' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', pb: '14px' }}>
          <div>
            <span className="badge-gold" style={{ background: 'rgba(13, 92, 70, 0.12)', color: 'var(--accent-emerald)', borderColor: 'rgba(13, 92, 70, 0.25)', marginBottom: '6px' }}>
              <ShieldCheck size={13} /> RECEPTION DESK ACCESS
            </span>
            <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontWeight: 800 }}>
              ➕ New Offline / Walk-in Booking
            </h3>
          </div>

          <button onClick={onClose} className="btn-outline" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Guest Information */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="var(--accent-emerald)" /> Guest Full Name *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Rajesh Kumar"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} color="var(--accent-emerald)" /> Mobile / WhatsApp Number *
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="e.g. +91 9876543210"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color="var(--accent-emerald)" /> Email Address (Optional)
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. rajesh@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Villa Selection & Guests */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={14} color="var(--accent-emerald)" /> Select Available Villa *
              </label>
              <select
                className="form-input"
                value={selectedVillaId}
                onChange={(e) => setSelectedVillaId(e.target.value)}
              >
                {villas.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title} — ₹{v.price.toLocaleString('en-IN')}/night
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="var(--accent-emerald)" /> Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max="12"
                className="form-input"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </div>

          {/* Check-In & Check-Out Dates */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="var(--accent-emerald)" /> Check-In Date
              </label>
              <input
                type="date"
                className="form-input"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="var(--accent-emerald)" /> Check-Out Date
              </label>
              <input
                type="date"
                className="form-input"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          {/* Payment Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={14} color="var(--accent-emerald)" /> Payment Mode
              </label>
              <select
                className="form-input"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="Cash">💵 Cash at Desk</option>
                <option value="UPI / GPay / PhonePe">📱 UPI / GPay / PhonePe</option>
                <option value="Credit / Debit Card">💳 Credit / Debit Card</option>
                <option value="Bank Transfer">🏦 Bank Transfer</option>
                <option value="Pay at Checkout">⌛ Pay at Checkout</option>
              </select>
            </div>

            <div>
              <label className="form-label">Payment Status</label>
              <select
                className="form-input"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="Paid in Full">✅ Paid in Full</option>
                <option value="Advance Paid (50%)">⏳ Advance Paid (50%)</option>
                <option value="Pending">❌ Payment Pending</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={14} color="var(--accent-emerald)" /> Custom Tariff (₹)
              </label>
              <input
                type="number"
                className="form-input"
                placeholder={`Default: ₹${calculatedTotal.toLocaleString('en-IN')}`}
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Walk-in Notes */}
          <div>
            <label className="form-label">Walk-In / Reception Notes</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Arrived 2:30 PM, requested 1 extra mattress and pool towels"
              value={walkInNotes}
              onChange={(e) => setWalkInNotes(e.target.value)}
            />
          </div>

          {/* Total Tariff Summary */}
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid var(--border-glass)'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Total Tariff ({nights} {nights === 1 ? 'Night' : 'Nights'})
              </span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                ₹{finalPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{
                padding: '12px 24px',
                fontSize: '0.95rem',
                background: 'var(--accent-emerald)',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(13, 92, 70, 0.4)'
              }}
            >
              <CheckCircle2 size={18} /> Confirm Walk-In Stay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
