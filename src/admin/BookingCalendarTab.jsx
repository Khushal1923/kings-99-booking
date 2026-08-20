import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from 'lucide-react';

export const BookingCalendarTab = () => {
  const { bookings, villas, blockedDates } = useResort();

  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026 default
  const [selectedVillaFilter, setSelectedVillaFilter] = useState('ALL');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Helper to check bookings for a specific day string (YYYY-MM-DD)
  const getEventsForDate = (dateStr) => {
    const events = [];
    const targetDate = new Date(dateStr);

    bookings.forEach(b => {
      if (selectedVillaFilter !== 'ALL' && b.villaId !== selectedVillaFilter) return;
      if (b.status === 'REJECTED' || b.status === 'CANCELLED') return;

      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);

      if (targetDate >= checkIn && targetDate <= checkOut) {
        events.push({
          type: 'BOOKING',
          title: `${b.customerName} (${b.villaName})`,
          status: b.status,
          booking: b
        });
      }
    });

    blockedDates.forEach(blk => {
      if (selectedVillaFilter !== 'ALL' && blk.villaId !== selectedVillaFilter) return;
      const blkIn = new Date(blk.startDate);
      const blkOut = new Date(blk.endDate);
      if (targetDate >= blkIn && targetDate <= blkOut) {
        events.push({
          type: 'BLOCKED',
          title: `BLOCKED: ${blk.reason || 'Maintenance'}`,
          status: 'BLOCKED'
        });
      }
    });

    return events;
  };

  const daysGrid = [];
  for (let i = 0; i < firstDay; i++) {
    daysGrid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    daysGrid.push({ day: d, dateStr: dayStr, events: getEventsForDate(dayStr) });
  }

  return (
    <div>
      {/* Calendar Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
            📅 Interactive Villa Booking Calendar
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Visual availability grid showing reserved dates, pending requests, and owner blocks.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Villa Filter */}
          <select
            className="form-input"
            style={{ width: '220px' }}
            value={selectedVillaFilter}
            onChange={(e) => setSelectedVillaFilter(e.target.value)}
          >
            <option value="ALL">All Villas & Suites</option>
            {villas.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>

          {/* Month Navigator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-full)', padding: '4px' }}>
            <button onClick={handlePrevMonth} className="btn-outline" style={{ border: 'none', padding: '6px' }}>
              <ChevronLeft size={18} />
            </button>
            <span style={{ fontWeight: 700, color: '#fff', padding: '0 12px', fontSize: '0.95rem' }}>
              {monthNames[month]} {year}
            </span>
            <button onClick={handleNextMonth} className="btn-outline" style={{ border: 'none', padding: '6px' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.8rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span> Confirmed Stay
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span> Pending Request
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span> Blocked / Maintenance
        </span>
      </div>

      {/* Calendar Grid */}
      <div className="glass-card" style={{ padding: '20px', borderRadius: '16px' }}>
        {/* Days Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '12px', fontWeight: 700, color: 'var(--accent-gold)', fontSize: '0.85rem' }}>
          <div>SUN</div>
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div>SAT</div>
        </div>

        {/* Days Cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {daysGrid.map((item, idx) => {
            if (!item) {
              return <div key={`empty-${idx}`} style={{ minHeight: '90px', background: 'transparent' }}></div>;
            }
            return (
              <div
                key={item.dateStr}
                style={{
                  minHeight: '100px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  {item.day}
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
                  {item.events.map((ev, eIdx) => {
                    const bgColor = ev.status === 'CONFIRMED' ? 'rgba(16,185,129,0.2)' : ev.status === 'PENDING' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)';
                    const textColor = ev.status === 'CONFIRMED' ? '#10b981' : ev.status === 'PENDING' ? '#f59e0b' : '#ef4444';
                    return (
                      <div
                        key={eIdx}
                        style={{
                          background: bgColor,
                          color: textColor,
                          border: `1px solid ${textColor}`,
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
