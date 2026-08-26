import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { X, Lock, User, ShieldCheck, Eye, EyeOff, KeyRound } from 'lucide-react';

export const LoginModal = ({ onClose }) => {
  const { login, targetRole } = useResort();

  const [role, setRole] = useState(targetRole || 'STAFF'); // 'STAFF' | 'ADMIN'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(username, password);
      if (!res.success) {
        setError(res.error);
      }
    } catch (err) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '32px' }}>
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
          <X size={22} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: role === 'ADMIN' ? 'linear-gradient(135deg, #d4af37, #aa8620)' : 'rgba(16, 185, 129, 0.2)',
            color: role === 'ADMIN' ? '#0b1310' : '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: 'var(--shadow-gold)'
          }}>
            <ShieldCheck size={28} />
          </div>

          <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff' }}>
            {role === 'ADMIN' ? 'Owner / Admin Portal' : 'Staff Concierge Portal'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Authentication Required for Kings 99 Nashik
          </p>

          {/* Role Switcher Pills */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-primary)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            marginTop: '16px',
            border: '1px solid var(--border-glass)'
          }}>
            <button
              type="button"
              onClick={() => handleRoleSwitch('STAFF')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: role === 'STAFF' ? '#10b981' : 'transparent',
                color: role === 'STAFF' ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🔑 Staff Portal
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('ADMIN')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: role === 'ADMIN' ? 'linear-gradient(135deg, #d4af37, #aa8620)' : 'transparent',
                color: role === 'ADMIN' ? '#0b1310' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              👑 Owner / Admin
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '10px 14px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '0.85rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={{ marginBottom: '16px' }}>
            <label className="form-label">Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '38px', paddingRight: '40px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px',
              background: role === 'STAFF' ? '#10b981' : undefined,
              color: '#fff',
              opacity: loading ? 0.7 : 1
            }}
          >
            <KeyRound size={18} /> {loading ? 'Authenticating...' : 'Authenticate & Access Portal'}
          </button>
        </form>
      </div>
    </div>
  );
};
