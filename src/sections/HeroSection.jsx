import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Search, Sparkles, MapPin, UtensilsCrossed, Calendar, Landmark, Mountain, Flame, Waves } from 'lucide-react';

export const HeroSection = ({ onOpenBookingModal }) => {
  const { cms, villas } = useResort();

  const [searchCheckIn, setSearchCheckIn] = useState('');
  const [searchCheckOut, setSearchCheckOut] = useState('');
  const [selectedVillaId, setSelectedVillaId] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const matchedVilla = villas.find(v => v.id === selectedVillaId);
    onOpenBookingModal(matchedVilla || null);
  };

  const handleScrollToDining = () => {
    const element = document.getElementById('dining');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" style={{ position: 'relative', minHeight: '94vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background Video element or background image */}
      {cms.heroVideo ? (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, overflow: 'hidden' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={cms.heroImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={cms.heroVideo} type="video/mp4" />
          </video>
          {/* Deep Forest Overlay Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(11, 19, 16, 0.55) 0%, rgba(11, 19, 16, 0.78) 60%, var(--bg-primary) 100%)'
          }}></div>
        </div>
      ) : (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(180deg, rgba(11, 19, 16, 0.5) 0%, rgba(11, 19, 16, 0.8) 60%, var(--bg-primary) 100%), url(${cms.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '100px 20px 60px' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Rating Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.18)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            padding: '6px 18px',
            borderRadius: 'var(--radius-full)',
            color: '#6ee7b7',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }}>
            <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>⭐ 4.9 ★ Rated</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ color: '#ffffff' }}>Kings 99 Nashik</span>
            <Sparkles size={14} color="#f59e0b" />
          </div>

          {/* Main Title: KINGS 99 */}
          <h1 className="font-serif" style={{
            fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
            fontWeight: 800,
            lineHeight: 1.02,
            marginBottom: '6px',
            letterSpacing: '1px'
          }}>
            <span style={{ color: '#ffffff', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>KINGS </span>
            <span style={{ color: '#eab308', textShadow: '0 4px 30px rgba(234, 179, 8, 0.4)' }}>99</span>
          </h1>

          {/* Italic Script Subtitle */}
          <div style={{
            fontFamily: 'serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 3.4vw, 2.5rem)',
            color: '#2dd4bf',
            fontWeight: 600,
            marginBottom: '20px',
            textShadow: '0 2px 14px rgba(45, 212, 191, 0.3)',
            letterSpacing: '0.5px'
          }}>
            Multicuisine Restaurant, Lawn & Villa
          </div>

          {/* Description Paragraph */}
          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(255, 255, 255, 0.92)',
            marginBottom: '28px',
            lineHeight: 1.6,
            maxWidth: '750px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
            fontWeight: 400
          }}>
            {cms.heroSubtitle || "Experience Nashik's premier culinary sanctuary. Enjoy rich Indian gravies, charcoal Tandoori kebabs, open-air garden dining & luxury private pool villa stays on Trimbak Road."}
          </p>

          {/* 3 Main Action Pill Buttons */}
          <div style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '28px'
          }}>
            {/* Button 1: Warm Gold Pill */}
            <button
              onClick={handleScrollToDining}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#0b1310',
                fontWeight: 800,
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)'
              }}
            >
              <UtensilsCrossed size={16} /> EXPLORE MENU
            </button>

            {/* Button 2: Emerald Teal Pill */}
            <button
              onClick={() => onOpenBookingModal(null)}
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                color: '#ffffff',
                fontWeight: 800,
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                boxShadow: '0 6px 20px rgba(20, 184, 166, 0.4)'
              }}
            >
              <Calendar size={16} /> BOOK VILLA / TABLE
            </button>

            {/* Button 3: Instagram Magenta Gradient Pill */}
            <a
              href={cms.instagramLink || "https://www.instagram.com/kings99official/"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #c026d3 100%)',
                color: '#ffffff',
                fontWeight: 800,
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                letterSpacing: '0.8px',
                boxShadow: '0 6px 20px rgba(236, 72, 153, 0.4)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Watch Reel 🎬
            </a>
          </div>

          {/* Bottom 4 Feature Highlight Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            marginBottom: '28px'
          }}>
            <div style={featureCardStyle}>
              <Landmark size={18} color="#2dd4bf" />
              <span>Arch & Garden Dining</span>
            </div>
            <div style={featureCardStyle}>
              <Mountain size={18} color="#6ee7b7" />
              <span>Sahyadri Hill View</span>
            </div>
            <div style={featureCardStyle}>
              <Flame size={18} color="#f59e0b" />
              <span>Tandoor & Sizzlers</span>
            </div>
            <div style={featureCardStyle}>
              <Waves size={18} color="#38bdf8" />
              <span>Private Pool Villa</span>
            </div>
          </div>

          {/* ALWAYS VISIBLE Date Availability Search Widget */}
          <form onSubmit={handleQuickSearch} className="glass-card" style={{
            padding: '24px 28px',
            borderRadius: 'var(--radius-lg)',
            background: '#ffffff',
            boxShadow: 'var(--shadow-elevated)',
            border: '2px solid var(--border-glass)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              textAlign: 'left',
              marginBottom: '16px'
            }}>
              <div>
                <label className="form-label" style={{ color: 'var(--accent-gold-dark)', fontWeight: 700 }}>Villa Accommodation</label>
                <select
                  className="form-input"
                  value={selectedVillaId}
                  onChange={(e) => setSelectedVillaId(e.target.value)}
                  style={{ background: '#fafaf7' }}
                >
                  <option value="">All Private Pool Villas</option>
                  {villas.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" style={{ color: 'var(--accent-gold-dark)', fontWeight: 700 }}>Check-In Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={searchCheckIn}
                  onChange={(e) => setSearchCheckIn(e.target.value)}
                  style={{ background: '#fafaf7' }}
                />
              </div>

              <div>
                <label className="form-label" style={{ color: 'var(--accent-gold-dark)', fontWeight: 700 }}>Check-Out Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={searchCheckOut}
                  onChange={(e) => setSearchCheckOut(e.target.value)}
                  style={{ background: '#fafaf7' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button
                type="submit"
                className="btn-gold"
                style={{
                  padding: '12px 28px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-gold)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Search size={16} /> Check Staycation Rates & Availability
              </button>
            </div>
          </form>

          {/* Location snippet */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.85rem',
            marginTop: '20px',
            fontWeight: 600,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            <MapPin size={15} color="#2dd4bf" />
            <span>{cms.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const featureCardStyle = {
  background: 'rgba(15, 23, 21, 0.65)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '12px',
  padding: '12px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  color: '#ffffff',
  fontSize: '0.82rem',
  fontWeight: 700,
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
};
