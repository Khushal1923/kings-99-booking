import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { Compass, ShieldCheck, Menu, X, CalendarCheck, Sparkles, UserCheck, KeyRound } from 'lucide-react';

export const Navbar = ({ onOpenBookingModal }) => {
  const { cms, userSession, logout, openLoginModal } = useResort();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      {cms.announcementText && (
        <div style={{
          background: 'linear-gradient(90deg, #aa8620 0%, #d4af37 50%, #aa8620 100%)',
          color: '#0b1310',
          padding: '6px 16px',
          textAlign: 'center',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} />
          {cms.announcementText}
        </div>
      )}

      {/* Main Glass Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: scrolled ? 'rgba(11, 19, 16, 0.95)' : 'rgba(11, 19, 16, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-glass)',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '75px'
        }}>
          {/* Logo & Brand */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37, #aa8620)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b1310',
              boxShadow: 'var(--shadow-gold)'
            }}>
              <Compass size={24} />
            </div>
            <div>
              <span className="font-serif" style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.5px',
                display: 'block'
              }}>
                {cms.resortName}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Nashik • Restaurant & Villa
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none', gap: '22px', alignItems: 'center' }} className="desktop-nav">
            <a href="#home" style={navLinkStyle}>Home</a>
            <a href="#villas" style={navLinkStyle}>Pool Villas</a>
            <a href="#dining" style={navLinkStyle}>Restaurant Menu</a>
            <a href="#gallery" style={navLinkStyle}>Gallery</a>
            <a href="#about" style={navLinkStyle}>About Us</a>
            <a href="#contact" style={navLinkStyle}>Contact & Location</a>
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {userSession ? (
              <button
                onClick={logout}
                className="btn-outline"
                style={{ padding: '8px 14px', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444' }}
              >
                Logout ({userSession.username})
              </button>
            ) : (
              <>
                {/* Staff Login Button */}
                <button
                  onClick={() => openLoginModal('STAFF')}
                  className="btn-outline"
                  style={{ padding: '8px 12px', fontSize: '0.8rem', borderColor: '#10b981', color: '#10b981' }}
                  title="Staff Concierge Login"
                >
                  <KeyRound size={14} /> Staff Portal
                </button>

                {/* Owner / Admin Login Button */}
                <button
                  onClick={() => openLoginModal('ADMIN')}
                  className="btn-outline"
                  style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                  title="Owner / Admin Login"
                >
                  <ShieldCheck size={14} /> Owner Admin
                </button>
              </>
            )}

            {/* Book Now Button */}
            <button
              onClick={() => onOpenBookingModal(null)}
              className="btn-gold"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <CalendarCheck size={16} /> Book Villa
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'none'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '75px',
          left: 0,
          right: 0,
          background: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '24px',
          zIndex: 899,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Home</a>
          <a href="#villas" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Pool Villas & Suites</a>
          <a href="#dining" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Kings Restaurant & Dining</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Resort Gallery</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>About Kings 99</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Contact & Location</a>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 991px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
};

const navLinkStyle = {
  color: 'var(--text-main)',
  textDecoration: 'none',
  fontSize: '0.88rem',
  fontWeight: 600,
  transition: 'color 0.2s ease',
};

const mobileNavLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  padding: '8px 0',
  borderBottom: '1px solid var(--border-subtle)'
};
