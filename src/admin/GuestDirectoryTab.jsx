import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { exportToCSV } from '../utils/exportUtils';
import { Search, MessageSquare, FileSpreadsheet } from 'lucide-react';

export const GuestDirectoryTab = () => {
  const { bookings, cms } = useResort();
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique guests by phone/email
  const guestMap = {};
  bookings.forEach(b => {
    const key = b.phone || b.email || b.customerName;
    if (!guestMap[key]) {
      guestMap[key] = {
        name: b.customerName,
        phone: b.phone,
        email: b.email,
        totalBookings: 0,
        totalSpent: 0,
        lastCheckIn: b.checkIn,
        history: []
      };
    }
    guestMap[key].totalBookings += 1;
    if (b.status === 'CONFIRMED') {
      guestMap[key].totalSpent += b.totalPrice;
    }
    guestMap[key].history.push(b);
  });

  const guestList = Object.values(guestMap).filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.email && g.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportDirectoryExcel = () => {
    const csvData = guestList.map(g => ({
      'Guest Name': g.name,
      'Mobile Number': g.phone,
      'Email Address': g.email || 'N/A',
      'Total Stays': g.totalBookings,
      'Confirmed Spend (₹)': g.totalSpent,
      'Last Stay Check-In': g.lastCheckIn
    }));
    exportToCSV(csvData, `kings_99_guest_directory_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
            👤 Customer Directory & Guest Records (Nashik, India)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Long-term database of guest contact information, total stays, and spending metrics in Indian Rupees (₹).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={handleExportDirectoryExcel}
            className="btn-gold"
            style={{ padding: '8px 14px', fontSize: '0.8rem', background: '#10b981', color: '#fff' }}
            title="Download Guest Directory Excel"
          >
            <FileSpreadsheet size={16} /> Excel Export
          </button>

          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              placeholder="Search guest directory..."
              className="form-input"
              style={{ paddingLeft: '36px', width: '220px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ overflowX: 'auto', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-glass)' }}>
              <th style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>Guest Name</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>Mobile / WhatsApp</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>Email Address</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>Total Stays</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>Confirmed Spend</th>
              <th style={{ padding: '14px 16px', color: 'var(--text-muted)', textAlign: 'right' }}>Quick Contact</th>
            </tr>
          </thead>
          <tbody>
            {guestList.length > 0 ? (
              guestList.map((g, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#fff' }}>
                    {g.name}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <a href={`tel:${g.phone}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>
                      {g.phone}
                    </a>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {g.email || "N/A"}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge-gold">{g.totalBookings} Stays</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#10b981' }}>
                    ₹{g.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <a
                      href={`https://wa.me/${g.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${g.name}, greetings from ${cms.resortName} Nashik!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline"
                      style={{ padding: '4px 12px', fontSize: '0.75rem', borderColor: '#10b981', color: '#10b981' }}
                    >
                      <MessageSquare size={14} /> WhatsApp
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No customer records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
