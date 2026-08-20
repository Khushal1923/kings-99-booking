import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { exportToCSV } from '../utils/exportUtils';
import { CheckCircle2, XCircle, Search, MessageSquare, FileSpreadsheet } from 'lucide-react';

export const DiningBookingsTab = () => {
  const { diningBookings, updateDiningStatus, cms } = useResort();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = diningBookings.filter(d => {
    const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
    const matchesSearch =
      d.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportExcel = () => {
    const data = filtered.map(d => ({
      'Table Ref ID': d.id,
      'Guest Name': d.customerName,
      'Mobile Number': d.phone,
      'Date': d.date,
      'Time Slot': d.time,
      'Guests Count': d.guests,
      'Status': d.status,
      'Notes': d.notes || 'None'
    }));
    exportToCSV(data, `kings_99_dining_reservations_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const getWhatsAppLink = (d, action = 'CONFIRM') => {
    const phoneClean = d.phone.replace(/[^0-9]/g, '');
    let text = '';
    if (action === 'CONFIRM') {
      text = `Namaste ${d.customerName},\n\nWe are delighted to CONFIRM your Dining Table Reservation at ${cms.resortName} Nashik!\n\n🍽️ Ref: ${d.id}\n📅 Date: ${d.date}\n⏰ Time: ${d.time}\n👥 Guests: ${d.guests}\n\nWe look forward to serving you!`;
    } else {
      text = `Namaste ${d.customerName},\n\nRegarding your Table Request (Ref: ${d.id}) at ${cms.resortName} Nashik:\nUnfortunately, our dining area is fully booked for ${d.date} at ${d.time}.\n\nPlease contact us at ${cms.phone} for alternative time slots.`;
    }
    return `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontWeight: 800 }}>
            🍽️ Restaurant Dining Table Reservations
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage guest table requests, confirm time slots, and dispatch WhatsApp alerts.
          </p>
        </div>

        {/* Actions & Filters */}
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
              placeholder="Search table ref, name..."
              className="form-input"
              style={{ paddingLeft: '36px', width: '200px' }}
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

      {/* Table */}
      <div className="glass-card" style={{ overflowX: 'auto', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--border-glass)' }}>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Ref ID</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Guest Name</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Mobile Number</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Date & Time Slot</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Guests</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Notes / Seating</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700 }}>Status</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-dark)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>
                    {d.id}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--text-dark)' }}>
                    {d.customerName}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <a href={`tel:${d.phone}`} style={{ color: 'var(--accent-gold-dark)', textDecoration: 'none', fontWeight: 600 }}>
                      {d.phone}
                    </a>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-dark)' }}>
                    <div>📅 {d.date}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏰ {d.time}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {d.guests} Persons
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {d.notes || 'Standard Table'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className={`status-badge status-${d.status.toLowerCase()}`}>
                      {d.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      {d.status !== 'CONFIRMED' && (
                        <button
                          onClick={() => updateDiningStatus(d.id, 'CONFIRMED')}
                          className="btn-gold"
                          style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--accent-emerald)', color: '#fff' }}
                          title="Confirm Table"
                        >
                          <CheckCircle2 size={14} /> Confirm
                        </button>
                      )}

                      {d.status !== 'REJECTED' && (
                        <button
                          onClick={() => updateDiningStatus(d.id, 'REJECTED')}
                          className="btn-danger"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          title="Reject / Cancel Table"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      )}

                      <a
                        href={getWhatsAppLink(d, d.status === 'REJECTED' ? 'REJECT' : 'CONFIRM')}
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
                <td colSpan="8" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No dining table reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
