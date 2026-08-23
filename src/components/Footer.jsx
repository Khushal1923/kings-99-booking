import React from 'react';
import { useResort } from '../context/ResortContext';
import { Compass, KeyRound } from 'lucide-react';

export const Footer = () => {
  const { cms } = useResort();

  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '2px solid var(--border-glass)',
      color: 'var(--text-main)',
      padding: '60px 0 30px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c5a059, #9a7632)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Compass size={20} />
              </div>
              <span className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                {cms.resortName}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              {cms.tagline}
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
              📍 Trimbak Road, Nashik, Maharashtra, India
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 700 }}>
              Resort Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <a href="#villas" style={footerLinkStyle}>Pool Villas & Tariffs</a>
              <a href="#dining" style={footerLinkStyle}>Restaurant Menu</a>
              <a href="#gallery" style={footerLinkStyle}>Resort Gallery</a>
              <a href="#about" style={footerLinkStyle}>About Us</a>
              <a href="#contact" style={footerLinkStyle}>Contact & Location</a>
            </div>
          </div>

          {/* Contact Inquiries */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 700 }}>
              Inquiries & Reservations
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
              For staycations, pool villa bookings, celebration lawn events, or garden table reservations:
            </p>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
              📞 {cms.phone}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              ✉️ {cms.email}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} {cms.resortName}. All rights reserved. Nashik, Maharashtra.
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a href={cms.googleLink} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Google Business</a>
            <a href={cms.instagramLink} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Instagram Profile</a>
            {/* Discrete Portal Shortcut Link */}
            <a href="#login" style={{ color: 'rgba(0,0,0,0.15)', textDecoration: 'none' }} title="Staff / Admin Portal Access">
              <KeyRound size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerLinkStyle = {
  color: 'var(--text-muted)',
  textDecoration: 'none',
  transition: 'color 0.2s ease'
};
