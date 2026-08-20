import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { exportToCSV } from '../utils/exportUtils';
import { CheckCircle2, XCircle, Search, MessageSquare, FileSpreadsheet } from 'lucide-react';

export const BookingRequestsTab = () => {
  const { bookings, updateBookingStatus, cms } = useResort();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.villaName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportExcel = () => {
    const data = filteredBookings.map(b => ({
      'Ref ID': b.id,
      'Guest Name': b.customerName,
      'Mobile Number': b.phone,
      'Email': b.email || 'N/A',
      'Villa Name': b.villaName,
      'Check In': b.checkIn,
      'Check Out': b.checkOut,
      'Guests': b.guests,
      'Total Tariff (₹)': b.totalPrice,
      'Status': b.status,
      'Special Requests': b.specialRequests || 'None'
    }));
    exportToCSV(data, `kings_99_booking_requests_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const getWhatsAppLink = (b, action = 'CONFIRM') => {
    const phoneClean = b.phone.replace(/[^0-9]/g, '');
    let text = '';
    if (action === 'CONFIRM') {
      text = `Namaste ${b.customerName},\n\nWe are delighted to CONFIRM your booking at ${cms.resortName} Nashik!\n\n📋 Booking Ref: ${b.id}\n🏡 Villa: ${b.villaName}\n📅 Check-In: ${b.checkIn}\n📅 Check-Out: ${b.checkOut}\n👥 Guests: ${b.guests}\n💰 Total Amount: ₹${b.totalPrice.toLocaleString('en-IN')}\n\nWe look forward to welcoming you!`;
    } else {
      text = `Namaste ${b.customerName},\n\nRegarding your booking request (Ref: ${b.id}) at ${cms.resortName} Nashik for ${b.villaName} (${b.checkIn} to ${b.checkOut}):\nUnfortunately, we are unable to accept this request for the selected dates.\n\nPlease feel free to contact us at ${cms.phone} for alternative dates.`;
    }
    return `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontWeight: 800 }}>
            📋 Customer Booking Requests
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage guest reservation requests, confirm stays, and dispatch WhatsApp alerts.
          </p>
        </div>

        {/* Actions & Search */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={handleExportExcel}
            className="btn-gold"
            style={{ padding: '8px 14px', fontSize: '0.8rem', background: 'var(--accent-emerald)', color: '#fff' }}
            title="Download Excel Spreadsheet"
          >
            <FileSpreadsheet size={16} /> Excel Export
          </button>

          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              placeholder="Search name, phone, ref..."
              className="form-input"
              style={{ paddingLeft: '36px', width: '220px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'PENDING', 'CONFIRMED', 'REJECTED'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={statusFilter === st ? 'btn-gold' : 'btn-outline'}
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-card" style={{ overflowX: 'auto', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border-glass)' }}>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Ref ID</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Guest Name</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Villa Name</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Dates (In → Out)</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Guests</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Total Tariff</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Status</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>
                    {b.id}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <strong style={{ color: 'var(--text-dark)', display: 'block' }}>{b.customerName}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.phone}</span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 600 }}>
                    {b.villaName}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.85rem' }}>
                    <div>In: {b.checkIn}</div>
                    <div>Out: {b.checkOut}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {b.guests} Guests
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>
                    ₹{b.totalPrice.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className={`status-badge status-${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="btn-outline"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        title="View Details"
                      >
                        Details
                      </button>

                      {b.status !== 'CONFIRMED' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'CONFIRMED')}
                          className="btn-gold"
                          style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--accent-emerald)', color: '#fff' }}
                          title="Confirm Booking"
                        >
                          <CheckCircle2 size={14} /> Confirm
                        </button>
                      )}

                      {b.status !== 'REJECTED' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'REJECTED')}
                          className="btn-danger"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          title="Reject / Cancel Booking"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      )}

                      <a
                        href={getWhatsAppLink(b, b.status === 'REJECTED' ? 'REJECT' : 'CONFIRM')}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}
                        title="Dispatch WhatsApp Alert"
                      >
                        <MessageSquare size={14} /> WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No booking requests match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Popover Modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 800 }}>
              Guest Reservation Details (Ref: {selectedBooking.id})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <div>
                <span className="form-label">Guest Full Name</span>
                <strong style={{ color: 'var(--text-dark)', fontSize: '1.05rem' }}>{selectedBooking.customerName}</strong>
              </div>
              <div>
                <span className="form-label">Mobile / WhatsApp Number</span>
                <a href={`tel:${selectedBooking.phone}`} style={{ color: 'var(--accent-gold-dark)', fontWeight: 700 }}>{selectedBooking.phone}</a>
              </div>
              <div>
                <span className="form-label">Email Address</span>
                <span>{selectedBooking.email || "Not Provided"}</span>
              </div>
              <div>
                <span className="form-label">Reserved Villa</span>
                <strong style={{ color: 'var(--text-dark)' }}>{selectedBooking.villaName}</strong>
              </div>
              <div>
                <span className="form-label">Check-In → Check-Out</span>
                <span>{selectedBooking.checkIn} to {selectedBooking.checkOut} ({selectedBooking.guests} Guests)</span>
              </div>
              <div>
                <span className="form-label">Total Tariff</span>
                <strong style={{ color: 'var(--accent-gold-dark)', fontSize: '1.2rem' }}>₹{selectedBooking.totalPrice.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="form-label">Special Requests</span>
                <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '6px', fontSize: '0.85rem' }}>
                  {selectedBooking.specialRequests || "No special requests mentioned."}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedBooking(null)} className="btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
