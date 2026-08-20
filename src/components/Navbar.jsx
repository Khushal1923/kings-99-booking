import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { Compass, ShieldCheck, Menu, X, CalendarCheck, Sparkles, KeyRound } from 'lucide-react';

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
          padding: '6px 12px',
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <Sparkles size={14} shrink={0} />
          <span>{cms.announcementText}</span>
        </div>
      )}

      {/* Main Glass Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: scrolled ? 'rgba(11, 19, 16, 0.95)' : 'rgba(11, 19, 16, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-glass)',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          {/* Logo & Brand */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37, #aa8620)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b1310',
              boxShadow: 'var(--shadow-gold)',
              shrink: 0
            }}>
              <Compass size={22} />
            </div>
            <div>
              <span className="font-serif" style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.5px',
                display: 'block',
                lineHeight: 1.2
              }}>
                {cms.resortName}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Nashik • Villa & Restaurant
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {userSession ? (
              <button
                onClick={logout}
                className="btn-outline"
                style={{ padding: '6px 12px', fontSize: '0.78rem', borderColor: '#ef4444', color: '#ef4444' }}
              >
                Logout ({userSession.username})
              </button>
            ) : (
              <>
                {/* Staff Login Button */}
                <button
                  onClick={() => openLoginModal('STAFF')}
                  className="btn-outline nav-btn-compact"
                  style={{ padding: '6px 10px', fontSize: '0.78rem', borderColor: '#10b981', color: '#10b981' }}
                  title="Staff Concierge Login"
                >
                  <KeyRound size={14} /> <span className="hide-on-mobile">Staff</span>
                </button>

                {/* Owner / Admin Login Button */}
                <button
                  onClick={() => openLoginModal('ADMIN')}
                  className="btn-outline nav-btn-compact"
                  style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                  title="Owner / Admin Login"
                >
                  <ShieldCheck size={14} /> <span className="hide-on-mobile">Owner</span>
                </button>
              </>
            )}

            {/* Book Now Button */}
            <button
              onClick={() => onOpenBookingModal(null)}
              className="btn-gold"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
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
                display: 'none',
                padding: '4px'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '20px 16px',
          zIndex: 899,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
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
        @media (max-width: 576px) {
          .hide-on-mobile { display: none !important; }
          .nav-btn-compact { padding: 6px 8px !important; }
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
  fontSize: '1rem',
  fontWeight: 600,
  padding: '6px 0',
  borderBottom: '1px solid var(--border-subtle)'
};
