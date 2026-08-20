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
          background: 'linear-gradient(90deg, #c5a059 0%, #dfc88b 50%, #c5a059 100%)',
          color: '#0f1715',
          padding: '7px 14px',
          textAlign: 'center',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          boxShadow: '0 2px 10px rgba(197, 160, 89, 0.2)'
        }}>
          <Sparkles size={14} />
          <span>{cms.announcementText}</span>
        </div>
      )}

      {/* Main Glass Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(248, 246, 240, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-glass)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px'
        }}>
          {/* Logo & Brand */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c5a059, #9a7632)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-gold)',
              flexShrink: 0
            }}>
              <Compass size={24} />
            </div>
            <div>
              <span className="font-serif" style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--text-dark)',
                letterSpacing: '0.5px',
                display: 'block',
                lineHeight: 1.2
              }}>
                {cms.resortName}
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--accent-gold-dark)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
                Nashik • Private Pool Villas & Dining
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-nav">
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
                style={{ padding: '7px 14px', fontSize: '0.8rem', borderColor: '#dc2626', color: '#dc2626' }}
              >
                Logout ({userSession.username})
              </button>
            ) : (
              <>
                {/* Staff Login Button */}
                <button
                  onClick={() => openLoginModal('STAFF')}
                  className="btn-outline nav-btn-compact"
                  style={{ padding: '7px 12px', fontSize: '0.8rem', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}
                  title="Staff Concierge Login"
                >
                  <KeyRound size={14} /> <span className="hide-on-mobile">Staff Portal</span>
                </button>

                {/* Owner / Admin Login Button */}
                <button
                  onClick={() => openLoginModal('ADMIN')}
                  className="btn-outline nav-btn-compact"
                  style={{ padding: '7px 12px', fontSize: '0.8rem' }}
                  title="Owner / Admin Login"
                >
                  <ShieldCheck size={14} /> <span className="hide-on-mobile">Owner Admin</span>
                </button>
              </>
            )}

            {/* Book Now Button */}
            <button
              onClick={() => onOpenBookingModal(null)}
              className="btn-gold"
              style={{ padding: '9px 18px', fontSize: '0.85rem' }}
            >
              <CalendarCheck size={16} /> Book Villa
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dark)',
                cursor: 'pointer',
                display: 'none',
                padding: '4px'
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
          top: '74px',
          left: 0,
          right: 0,
          background: '#ffffff',
          borderBottom: '2px solid var(--border-glass)',
          padding: '24px 20px',
          zIndex: 899,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: 'var(--shadow-elevated)'
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
  fontSize: '0.9rem',
  fontWeight: 600,
  transition: 'color 0.2s ease',
};

const mobileNavLinkStyle = {
  color: 'var(--text-dark)',
  textDecoration: 'none',
  fontSize: '1.05rem',
  fontWeight: 700,
  padding: '8px 0',
  borderBottom: '1px solid var(--border-subtle)'
};
