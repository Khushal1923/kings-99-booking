import React, { useState, useEffect, useRef } from 'react';
import { useResort } from '../context/ResortContext';
import { Compass, Menu, X, UtensilsCrossed, Phone, Sparkles, LogOut } from 'lucide-react';

export const Navbar = ({ onOpenBookingModal }) => {
  const { cms, userSession, logout } = useResort();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoClickRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secret 3x Logo Tap Handler for Staff/Admin Access
  const handleLogoClick = (e) => {
    logoClickRef.current += 1;
    if (logoClickRef.current >= 3) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-portal-login', { detail: { role: 'STAFF' } }));
      logoClickRef.current = 0;
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logoClickRef.current = 0;
    }, 1200);
  };

  const handleTableReservationClick = () => {
    const element = document.getElementById('dining');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBookingModal(null);
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      {cms.announcementText && (
        <div style={{
          background: 'linear-gradient(90deg, #aa8620 0%, #d4af37 50%, #aa8620 100%)',
          color: '#0b1310',
          padding: '6px 14px',
          textAlign: 'center',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <Sparkles size={14} />
          <span>{cms.announcementText}</span>
        </div>
      )}

      {/* Main Clean Customer Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: scrolled ? 'rgba(11, 19, 16, 0.96)' : 'rgba(15, 23, 21, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.18)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.35)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px'
        }}>
          {/* Logo & Brand (With Secret 3x Tap Trigger) */}
          <a
            href="#"
            onClick={handleLogoClick}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', userSelect: 'none' }}
            title="Kings 99 Multicuisine Restaurant & Villa"
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              shrink: 0
            }}>
              <Compass size={22} color="var(--accent-gold-light)" />
            </div>
            <div>
              <span className="font-serif" style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.5px',
                display: 'block',
                lineHeight: 1.1
              }}>
                Kings 99
              </span>
              <span style={{
                fontSize: '0.62rem',
                color: '#d4af37',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 800,
                display: 'block',
                marginTop: '1px'
              }}>
                RESTAURANT & VILLA
              </span>
            </div>
          </a>

          {/* Center Nav Links (RESTAURANT & MENU FIRST) */}
          <nav style={{ display: 'none', gap: '26px', alignItems: 'center' }} className="desktop-nav">
            <a href="#home" style={navLinkStyle}>Home</a>
            <a href="#dining" style={navLinkStyle}>Restaurant & Menu</a>
            <a href="#villas" style={navLinkStyle}>Private Pool Villas</a>
            <a href="#gallery" style={navLinkStyle}>Gallery</a>
            <a href="#about" style={navLinkStyle}>About Us</a>
            <a href="#contact" style={navLinkStyle}>Location</a>
          </nav>

          {/* Right Action Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {userSession && (
              <button
                onClick={logout}
                className="btn-outline"
                style={{ padding: '6px 12px', fontSize: '0.78rem', borderColor: '#ef4444', color: '#ef4444', background: 'transparent' }}
              >
                <LogOut size={13} /> Logout ({userSession.username})
              </button>
            )}

            {/* Restaurant Focus Primary CTA Button */}
            <button
              onClick={handleTableReservationClick}
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #aa8620 100%)',
                color: '#0b1310',
                fontWeight: 800,
                padding: '9px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                boxShadow: 'var(--shadow-gold)'
              }}
            >
              <UtensilsCrossed size={15} /> RESERVE TABLE
            </button>

            {/* Circular Phone Icon Button */}
            <a
              href={`tel:${cms.phone}`}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
                shrink: 0
              }}
              title="Call Restaurant Inquiries"
            >
              <Phone size={16} />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
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
          top: '72px',
          left: 0,
          right: 0,
          background: 'rgba(11, 19, 16, 0.98)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '24px 20px',
          zIndex: 899,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          backdropFilter: 'blur(20px)'
        }}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Home</a>
          <a href="#dining" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Kings Multicuisine Restaurant & Lawn</a>
          <a href="#villas" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Private Pool Villas & Staycations</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Resort Gallery</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>About Kings 99</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Location & Contact</a>
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
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '0.88rem',
  fontWeight: 600,
  transition: 'color 0.2s ease',
  letterSpacing: '0.3px'
};

const mobileNavLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1.05rem',
  fontWeight: 700,
  padding: '8px 0',
  borderBottom: '1px solid var(--border-subtle)'
};
