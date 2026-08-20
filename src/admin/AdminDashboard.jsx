import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { BookingRequestsTab } from './BookingRequestsTab';
import { DiningBookingsTab } from './DiningBookingsTab';
import { BookingCalendarTab } from './BookingCalendarTab';
import { VillaManagementTab } from './VillaManagementTab';
import { RestaurantManagementTab } from './RestaurantManagementTab';
import { AvailabilityManagerTab } from './AvailabilityManagerTab';
import { CmsEditorTab } from './CmsEditorTab';
import { GuestDirectoryTab } from './GuestDirectoryTab';
import { BackupRestoreTab } from './BackupRestoreTab';
import { CredentialsTab } from './CredentialsTab';

import {
  FileText,
  Calendar,
  Home,
  Utensils,
  Lock,
  Globe,
  Users,
  Database,
  LogOut,
  Clock,
  KeyRound,
  UtensilsCrossed
} from 'lucide-react';

export const AdminDashboard = () => {
  const { logout, userSession, bookings, diningBookings, villas } = useResort();
  const [activeTab, setActiveTab] = useState('REQUESTS');

  const role = userSession ? userSession.role : 'STAFF';

  // Stats calculation
  const pendingVillaCount = bookings.filter(b => b.status === 'PENDING').length;
  const pendingTableCount = diningBookings.filter(d => d.status === 'PENDING').length;

  const totalRevenue = bookings
    .filter(b => b.status === 'CONFIRMED')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Filter available tabs based on role
  const allTabs = [
    { id: 'REQUESTS', label: 'Villa Requests', icon: <FileText size={18} />, badge: pendingVillaCount, roles: ['STAFF', 'ADMIN'] },
    { id: 'TABLES', label: 'Table Reservations', icon: <UtensilsCrossed size={18} />, badge: pendingTableCount, roles: ['STAFF', 'ADMIN'] },
    { id: 'CALENDAR', label: 'Booking Calendar', icon: <Calendar size={18} />, roles: ['STAFF', 'ADMIN'] },
    { id: 'GUESTS', label: 'Guest Directory', icon: <Users size={18} />, roles: ['STAFF', 'ADMIN'] },
    { id: 'VILLAS', label: 'Villa & Photos', icon: <Home size={18} />, roles: ['ADMIN'] },
    { id: 'RESTAURANT', label: 'Restaurant & Photos', icon: <Utensils size={18} />, roles: ['ADMIN'] },
    { id: 'AVAILABILITY', label: 'Date Blocker', icon: <Lock size={18} />, roles: ['ADMIN'] },
    { id: 'CMS', label: 'Website CMS', icon: <Globe size={18} />, roles: ['ADMIN'] },
    { id: 'SECURITY', label: 'Password Security', icon: <KeyRound size={18} />, roles: ['ADMIN'] },
    { id: 'BACKUP', label: 'Data Backup / Restore', icon: <Database size={18} />, roles: ['ADMIN'] }
  ];

  const tabs = allTabs.filter(t => t.roles.includes(role));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)', paddingBottom: '60px' }}>
      {/* Top Header Bar */}
      <header style={{
        background: '#ffffff',
        borderBottom: '2px solid var(--border-glass)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 950,
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className={role === 'ADMIN' ? 'badge-gold' : 'status-badge status-confirmed'}>
              {role === 'ADMIN' ? '👑 Owner Admin Portal' : '🔑 Staff Reception Desk'}
            </span>
            <h2 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-dark)', margin: 0, fontWeight: 800 }}>
              Kings 99 Nashik ({userSession ? userSession.username : 'User'})
            </h2>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            {role === 'ADMIN' && (
              <div style={statBoxStyle}>
                <span style={{ color: 'var(--accent-gold-dark)', fontWeight: 800, fontSize: '1.1rem' }}>₹</span>
                <div>
                  <span style={statLabelStyle}>Confirmed Revenue</span>
                  <strong style={statValStyle}>₹{totalRevenue.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            )}

            <div style={statBoxStyle}>
              <Clock size={16} color="#d97706" />
              <div>
                <span style={statLabelStyle}>Pending Requests</span>
                <strong style={{ ...statValStyle, color: '#d97706' }}>
                  {pendingVillaCount + pendingTableCount} ({pendingVillaCount} Villa / {pendingTableCount} Table)
                </strong>
              </div>
            </div>

            <div style={statBoxStyle}>
              <Home size={16} color="#0d5c46" />
              <div>
                <span style={statLabelStyle}>Active Villas</span>
                <strong style={{ ...statValStyle, color: '#0d5c46' }}>{villas.length}</strong>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="btn-danger"
              style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              title="Logout to website"
            >
              <LogOut size={16} /> Logout ({userSession?.username})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 24px' }}>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '30px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={activeTab === t.id ? 'btn-gold' : 'btn-outline'}
              style={{
                padding: '10px 18px',
                fontSize: '0.88rem',
                whiteSpace: 'nowrap',
                position: 'relative'
              }}
            >
              {t.icon}
              <span>{t.label}</span>
              {t.badge > 0 && (
                <span style={{
                  background: '#dc2626',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 7px',
                  marginLeft: '4px'
                }}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab View Render */}
        <div className="animate-fade-in">
          {activeTab === 'REQUESTS' && <BookingRequestsTab />}
          {activeTab === 'TABLES' && <DiningBookingsTab />}
          {activeTab === 'CALENDAR' && <BookingCalendarTab />}
          {activeTab === 'GUESTS' && <GuestDirectoryTab />}
          {role === 'ADMIN' && activeTab === 'VILLAS' && <VillaManagementTab />}
          {role === 'ADMIN' && activeTab === 'RESTAURANT' && <RestaurantManagementTab />}
          {role === 'ADMIN' && activeTab === 'AVAILABILITY' && <AvailabilityManagerTab />}
          {role === 'ADMIN' && activeTab === 'CMS' && <CmsEditorTab />}
          {role === 'ADMIN' && activeTab === 'SECURITY' && <CredentialsTab />}
          {role === 'ADMIN' && activeTab === 'BACKUP' && <BackupRestoreTab />}
        </div>
      </div>
    </div>
  );
};

const statBoxStyle = {
  background: '#ffffff',
  border: '1.5px solid var(--border-glass)',
  borderRadius: '10px',
  padding: '6px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
};

const statLabelStyle = {
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  display: 'block',
  fontWeight: 600
};

const statValStyle = {
  fontSize: '0.95rem',
  color: 'var(--accent-gold-dark)',
  fontWeight: 800
};
