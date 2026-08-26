import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { KeyRound, ShieldCheck, Check, Lock, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const CredentialsTab = () => {
  const { userSession, updateCredentials } = useResort();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    if (newPassword.length < 6) {
      setStatusMessage("❌ New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage("❌ New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });
        if (error) throw error;
      } else {
        await updateCredentials(userSession?.role || 'STAFF', userSession?.username || 'user', newPassword);
      }

      setNewPassword('');
      setConfirmPassword('');
      setStatusMessage("✅ Account password successfully updated!");
    } catch (err) {
      console.error("Password update error:", err);
      setStatusMessage(`❌ Error: ${err.message || "Could not update password."}`);
    } finally {
      setLoading(false);
    }
  };

  const roleLabel = userSession?.role === 'ADMIN' ? '👑 Owner / Admin Account' : '🔑 Staff Concierge Account';

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontWeight: 800 }}>
          🔐 Supabase Auth & Password Security
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Manage your account credentials. Authenticated via Supabase Postgres Auth with Row Level Security (RLS).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Active User Account Info */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: userSession?.role === 'ADMIN' ? 'rgba(212,175,55,0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: userSession?.role === 'ADMIN' ? 'var(--accent-gold-dark)' : '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {userSession?.role === 'ADMIN' ? <ShieldCheck size={22} /> : <KeyRound size={22} />}
            </div>
            <div>
              <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontWeight: 700 }}>
                {roleLabel}
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {userSession?.email || userSession?.username || 'Authenticated User'}
              </span>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.85rem',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Access Role:</span>
              <strong style={{ color: userSession?.role === 'ADMIN' ? 'var(--accent-gold-dark)' : '#10b981' }}>
                {userSession?.role || 'STAFF'}
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Authentication Provider:</span>
              <strong>{isSupabaseConfigured ? 'Supabase Auth (Postgres RLS)' : 'Local Storage Mode'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Active Username/Email:</span>
              <strong style={{ wordBreak: 'break-all' }}>{userSession?.email || userSession?.username}</strong>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-gold-dark)' }} />
            Supabase Auth handles secure salted password hashing, JWT token refresh, and Row Level Security on all database queries.
          </div>
        </div>

        {/* Change Password Form */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.12)',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Lock size={20} />
            </div>
            <div>
              <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontWeight: 700 }}>
                Update Account Password
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Set a new secure password for your portal login</span>
            </div>
          </div>

          {statusMessage && (
            <div style={{
              background: statusMessage.includes('✅') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${statusMessage.includes('✅') ? '#10b981' : '#ef4444'}`,
              color: statusMessage.includes('✅') ? '#10b981' : '#ef4444',
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '0.85rem'
            }}>
              {statusMessage}
            </div>
          )}

          <form onSubmit={handlePasswordUpdate}>
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Re-type new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
            >
              <Check size={18} /> {loading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
