import React, { useState, useEffect, useRef } from 'react';
import { useResort } from '../context/ResortContext';
import { Crown, Menu, X, LogOut } from 'lucide-react';

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

  return (
    <>
      {/* Main Reference Matching Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: scrolled ? 'rgba(11, 19, 16, 0.96)' : 'rgba(11, 19, 16, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.18)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px'
        }}>
          {/* Logo & Brand: KINGS 99 with Circular Crown Badge */}
          <a
            href="#"
            onClick={handleLogoClick}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', userSelect: 'none' }}
            title="Kings 99 Multicuisine Restaurant & Villa"
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '2px solid #eab308',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#eab308',
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(234, 179, 8, 0.3)'
            }}>
              <Crown size={22} color="#eab308" />
            </div>
            <div>
              <span className="font-serif" style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '0.5px',
                lineHeight: 1.1,
                display: 'block'
              }}>
                <span style={{ color: '#ffffff' }}>KINGS </span>
                <span style={{ color: '#eab308' }}>99</span>
              </span>
              <span style={{
                fontSize: '0.6rem',
                color: '#2dd4bf',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'block',
                marginTop: '1px'
              }}>
                RESTAURANT & VILLA • NASHIK
              </span>
            </div>
          </a>

          {/* Center Nav Links (Exact Match: Home, About Kings 99, Menu, Villa Stay, Reviews, Gallery & Reels, Location) */}
          <nav style={{ display: 'none', gap: '22px', alignItems: 'center' }} className="desktop-nav">
            <a href="#home" style={navLinkStyle}>Home</a>
            <a href="#about" style={navLinkStyle}>About Kings 99</a>
            <a href="#dining" style={navLinkStyle}>Menu</a>
            <a href="#villas" style={navLinkStyle}>Villa Stay</a>
            <a href="#about" style={navLinkStyle}>Reviews</a>
            <a href="#gallery" style={navLinkStyle}>Gallery & Reels</a>
            <a href="#contact" style={navLinkStyle}>Location</a>
          </nav>

          {/* Right Action Buttons: Instagram Pill + Emerald Book Now Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {userSession && (
              <button
                onClick={logout}
                className="btn-outline"
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444', background: 'transparent' }}
              >
                <LogOut size={13} /> Logout ({userSession.username})
              </button>
            )}

            {/* Instagram Pill Button (@kings99official) */}
            <a
              href={cms.instagramLink || "https://www.instagram.com/kings99official/"}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-ig-pill"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(236, 72, 153, 0.45)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@kings99official</span>
            </a>

            {/* Emerald Teal "Book Now" Pill Button */}
            <button
              onClick={() => onOpenBookingModal(null)}
              className="nav-book-pill"
              style={{
                background: 'linear-gradient(135deg, #00c49f 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 196, 159, 0.45)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Book Now</span>
            </button>

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
          top: '74px',
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
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>About Kings 99</a>
          <a href="#dining" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Menu</a>
          <a href="#villas" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Villa Stay</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Reviews</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Gallery & Reels</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Location</a>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 991px) {
          .mobile-toggle { display: block !important; }
        }
        @media (max-width: 640px) {
          .nav-ig-pill { display: none !important; }
        }
        .nav-ig-pill:hover {
          background: rgba(236, 72, 153, 0.15) !important;
          border-color: rgba(236, 72, 153, 0.8) !important;
        }
        .nav-book-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 196, 159, 0.6) !important;
        }
      `}</style>
    </>
  );
};

const navLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '0.86rem',
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
