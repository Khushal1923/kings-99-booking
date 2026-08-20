import React from 'react';
import { useResort } from '../context/ResortContext';
import { Compass, ShieldCheck, MapPin, Globe } from 'lucide-react';

export const Footer = () => {
  const { cms, adminMode, setAdminMode } = useResort();

  return (
    <footer style={{
      background: '#070c0a',
      borderTop: '1px solid var(--border-glass)',
      padding: '60px 0 30px',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #aa8620)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0b1310'
              }}>
                <Compass size={20} />
              </div>
              <span className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
                {cms.resortName}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              {cms.heroSubtitle}
            </p>

            {/* Social Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {cms.instagramLink && (
                <a
                  href={cms.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{ padding: '8px 14px', fontSize: '0.8rem', borderColor: '#e1306c', color: '#e1306c' }}
                  title="Follow Kings 99 on Instagram"
                >
                  📸 Instagram @kings99official
                </a>
              )}
              {cms.googleLink && (
                <a
                  href={cms.googleLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{ padding: '8px 14px', fontSize: '0.8rem', borderColor: '#4285F4', color: '#4285F4' }}
                  title="View Kings 99 on Google"
                >
                  <MapPin size={16} /> Google Listing
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '16px' }}>Quick Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <a href="#home" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</a>
              <a href="#villas" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Private Pool Villas</a>
              <a href="#dining" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Kings Multicuisine Dining</a>
              <a href="#gallery" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Resort Photo Gallery</a>
              <a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact & Location</a>
            </div>
          </div>

          {/* Staff Portal Link */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '16px' }}>Resort Administration</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px' }}>
              Staff & Owner dashboard for booking management, calendar, photos, and CMS content updates.
            </p>
            <button
              onClick={() => setAdminMode(!adminMode)}
              className="btn-outline"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <ShieldCheck size={16} />
              {adminMode ? 'Switch to Customer View' : 'Access Owner / Admin Panel'}
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '0.8rem'
        }}>
          © {new Date().getFullYear()} {cms.resortName} Nashik. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
