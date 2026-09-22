import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { X, Calendar, User, Phone, Mail, Home, CreditCard, CheckCircle2, ShieldCheck, DollarSign, IdCard } from 'lucide-react';

export const OfflineBookingModal = ({ onClose }) => {
  const { villas, addBooking, checkAvailability } = useResort();

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
  const [availabilityError, setAvailabilityError] = useState('');

  // Identity Proof State (Aadhaar, Passport, DL, etc.)
  const [idProofType, setIdProofType] = useState('Aadhaar Card');
  const [idProofNumber, setIdProofNumber] = useState('');

  // Target Villa object
  const targetVilla = villas.find((v) => String(v.id) === String(selectedVillaId)) || villas[0];

  // Editable Nightly Rate & Custom Total Tariff
  const [nightlyRate, setNightlyRate] = useState(targetVilla ? targetVilla.price : 4500);
  const [customTotal, setCustomTotal] = useState('');

  // Update nightly rate when selected villa changes
  useEffect(() => {
    if (targetVilla) {
      setNightlyRate(targetVilla.price);
      setCustomTotal('');
    }
  }, [selectedVillaId]);

  // Real-time Availability Collision Validation
  useEffect(() => {
    if (selectedVillaId && checkIn && checkOut) {
      const res = checkAvailability(selectedVillaId, checkIn, checkOut);
      if (!res.available) {
        setAvailabilityError(res.reason);
      } else {
        setAvailabilityError('');
      }
    } else {
      setAvailabilityError('');
    }
  }, [selectedVillaId, checkIn, checkOut, checkAvailability]);

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const calculatedTotal = (parseFloat(nightlyRate) || 0) * nights;
  const finalPrice = customTotal !== '' ? parseFloat(customTotal) : calculatedTotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('Please fill in Guest Name and Mobile Number.');
      return;
    }

    // Validate collision before confirming walk-in
    const availability = checkAvailability(selectedVillaId, checkIn, checkOut);
    if (!availability.available) {
      alert(`⚠️ Cannot Confirm Booking:\n\n${availability.reason}`);
      return;
    }

    const walkInRef = `K99-WALKIN-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBookingData = {
      id: walkInRef,
      customerName,
      phone,
      email,
      idProofType,
      idProofNumber,
      villaId: targetVilla.id,
      villaName: targetVilla.title || targetVilla.name,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      nightlyRate: parseFloat(nightlyRate),
      totalPrice: finalPrice,
      status: 'CONFIRMED',
      bookingType: 'WALK_IN_OFFLINE',
      paymentMode,
      paymentStatus,
      specialRequests: [
        idProofNumber ? `[ID PROOF: ${idProofType} - ${idProofNumber}]` : null,
        walkInNotes ? `[WALK-IN NOTES]: ${walkInNotes}` : null
      ].filter(Boolean).join(' | ') || 'Offline Reception Desk Booking',
      createdAt: new Date().toISOString()
    };

    addBooking(newBookingData);
    alert(`🎉 Walk-In Booking Confirmed Successfully!\nRef ID: ${walkInRef}\nVilla: ${targetVilla.title || targetVilla.name}\nTotal: ₹${finalPrice.toLocaleString('en-IN')}`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', width: '92%', borderRadius: '24px', padding: '30px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
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
          {/* Guest Name & Mobile */}
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

          {/* Email Address & Guest Count */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
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

          {/* Identity Proof Section (Aadhaar / Passport / DL / Voter ID) */}
          <div style={{
            background: 'rgba(212, 175, 55, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '16px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <IdCard size={18} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Identity Proof Details (Required for Govt Compliance)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div>
                <label className="form-label">ID Proof Type</label>
                <select
                  className="form-input"
                  value={idProofType}
                  onChange={(e) => setIdProofType(e.target.value)}
                >
                  <option value="Aadhaar Card">🆔 Aadhaar Card</option>
                  <option value="Passport">🛂 Passport</option>
                  <option value="Driving License">🪪 Driving License</option>
                  <option value="Voter ID Card">🗳️ Voter ID Card</option>
                  <option value="PAN Card">💳 PAN Card</option>
                  <option value="Other Govt ID">📜 Other Govt Issued ID</option>
                </select>
              </div>

              <div>
                <label className="form-label">ID / Aadhaar Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 1234-5678-9012"
                  value={idProofNumber}
                  onChange={(e) => setIdProofNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Select Villa (Shows Villa Name First) */}
          <div>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Home size={14} color="var(--accent-emerald)" /> Select Available Villa *
            </label>
            <select
              className="form-input"
              style={{ fontWeight: 600, fontSize: '0.95rem' }}
              value={selectedVillaId}
              onChange={(e) => setSelectedVillaId(e.target.value)}
            >
              {villas.map((v) => (
                <option key={v.id} value={v.id}>
                  🏡 {v.title || v.name} — ₹{v.price.toLocaleString('en-IN')}/night (Max {v.maxGuests} Guests)
                </option>
              ))}
            </select>
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

          {/* Date Availability Collision Warning Banner */}
          {availabilityError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              color: '#ef4444',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              lineHeight: 1.5
            }}>
              {availabilityError}
            </div>
          )}

          {/* Editable Pricing Section (Nightly Tariff & Total Custom Tariff) */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-glass)',
            borderRadius: '16px',
            padding: '16px'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <DollarSign size={16} /> Editable Pricing & Tariff Override
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label className="form-label">Editable Nightly Rate (₹/night)</label>
                <input
                  type="number"
                  className="form-input"
                  style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}
                  placeholder={`Standard: ₹${targetVilla ? targetVilla.price : 4500}`}
                  value={nightlyRate}
                  onChange={(e) => {
                    setNightlyRate(e.target.value);
                    setCustomTotal('');
                  }}
                />
              </div>

              <div>
                <label className="form-label">Total Custom Override (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder={`Calculated: ₹${calculatedTotal.toLocaleString('en-IN')}`}
                  value={customTotal}
                  onChange={(e) => setCustomTotal(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
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

          {/* Total Tariff Summary & Action Button */}
          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px 20px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid var(--border-glass)',
            marginTop: '8px'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Final Total ({nights} {nights === 1 ? 'Night' : 'Nights'})
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
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
