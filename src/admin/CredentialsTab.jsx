import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { KeyRound, ShieldCheck, Check, User, Lock, AlertCircle } from 'lucide-react';

export const CredentialsTab = () => {
  const { credentials, updateCredentials } = useResort();

  const [staffUsername, setStaffUsername] = useState(credentials.staff.username);
  const [staffPassword, setStaffPassword] = useState(credentials.staff.password);
  const [staffStatus, setStaffStatus] = useState('');

  const [adminUsername, setAdminUsername] = useState(credentials.admin.username);
  const [adminPassword, setAdminPassword] = useState(credentials.admin.password);
  const [adminStatus, setAdminStatus] = useState('');

  const handleUpdateStaff = (e) => {
    e.preventDefault();
    if (!staffUsername.trim() || !staffPassword.trim()) return;
    updateCredentials('STAFF', staffUsername, staffPassword);
    setStaffStatus("✅ Staff login credentials updated!");
    setTimeout(() => setStaffStatus(''), 3000);
  };

  const handleUpdateAdmin = (e) => {
    e.preventDefault();
    if (!adminUsername.trim() || !adminPassword.trim()) return;
    updateCredentials('ADMIN', adminUsername, adminPassword);
    setAdminStatus("✅ Admin/Owner login credentials updated!");
    setTimeout(() => setAdminStatus(''), 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
          🔐 Password & Portal Security Management
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Update login usernames and passwords for both Staff and Admin/Owner portals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Staff Credentials Card */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <KeyRound size={20} />
            </div>
            <div>
              <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff' }}>
                Staff Concierge Portal Credentials
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>For receptionists & front desk team</span>
            </div>
          </div>

          {staffStatus && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
              {staffStatus}
            </div>
          )}

          <form onSubmit={handleUpdateStaff}>
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Staff Username</label>
              <input
                type="text"
                className="form-input"
                value={staffUsername}
                onChange={(e) => setStaffUsername(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Staff Password</label>
              <input
                type="text"
                className="form-input"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-gold" style={{ background: '#10b981', color: '#fff', width: '100%', justifyContent: 'center' }}>
              <Check size={18} /> Save Staff Credentials
            </button>
          </form>
        </div>

        {/* Admin Credentials Card */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(212,175,55,0.15)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff' }}>
                Owner / Admin Portal Credentials
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full administrative access</span>
            </div>
          </div>

          {adminStatus && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
              {adminStatus}
            </div>
          )}

          <form onSubmit={handleUpdateAdmin}>
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Admin Username</label>
              <input
                type="text"
                className="form-input"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Admin Password</label>
              <input
                type="text"
                className="form-input"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              <Check size={18} /> Save Admin Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
