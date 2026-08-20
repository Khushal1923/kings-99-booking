import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Calendar, Lock, Unlock, Plus, Trash2 } from 'lucide-react';

export const AvailabilityManagerTab = () => {
  const { villas, blockedDates, addBlockedDate, removeBlockedDate } = useResort();

  const [villaId, setVillaId] = useState(villas[0]?.id || '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('Routine Pool Maintenance');

  const handleBlockSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !villaId) return;

    addBlockedDate({
      villaId,
      startDate,
      endDate,
      reason
    });

    setStartDate('');
    setEndDate('');
    alert("Date range blocked successfully!");
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
          🔴🟢 Villa Availability & Date Range Blocker
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Manually close specific date ranges for maintenance, private VIP events, or seasonal closures.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {/* Block Form */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>
            🔒 Block Villa Dates
          </h4>

          <form onSubmit={handleBlockSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Select Villa</label>
              <select
                className="form-input"
                value={villaId}
                onChange={(e) => setVillaId(e.target.value)}
              >
                {villas.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Closure Reason / Notes</label>
              <input
                type="text"
                className="form-input"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Deep cleaning, Owner private stay"
                required
              />
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              <Lock size={16} /> Apply Date Block
            </button>
          </form>
        </div>

        {/* Existing Blocks List */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>
            Current Blocked Schedules ({blockedDates.length})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {blockedDates.map(blk => {
              const villa = villas.find(v => v.id === blk.villaId);
              return (
                <div
                  key={blk.id}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{villa ? villa.name : blk.villaId}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '2px' }}>
                      {blk.startDate} → {blk.endDate}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{blk.reason}</span>
                  </div>

                  <button
                    onClick={() => removeBlockedDate(blk.id)}
                    className="btn-danger"
                    style={{ padding: '6px 10px' }}
                    title="Remove Date Block"
                  >
                    <Unlock size={14} /> Unblock
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
