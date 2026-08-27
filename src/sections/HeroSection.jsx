import React from 'react';
import { useResort } from '../context/ResortContext';
import { Sparkles, MapPin, UtensilsCrossed, Calendar, Landmark, Mountain, Flame, Waves } from 'lucide-react';

export const HeroSection = ({ onOpenBookingModal }) => {
  const { cms } = useResort();

  const handleScrollToDining = () => {
    const element = document.getElementById('dining');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
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
            marginBottom: '32px',
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
            marginBottom: '36px'
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

          {/* Premium Glassmorphic 4 Feature Highlight Cards (Single Row) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            marginBottom: '32px',
            overflowX: 'auto'
          }}>
            <div className="hero-feature-card" style={featureCardStyle}>
              <div style={{ ...iconBadgeStyle, background: 'rgba(45, 212, 191, 0.18)', border: '1px solid rgba(45, 212, 191, 0.4)' }}>
                <Landmark size={20} color="#2dd4bf" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.88rem', lineHeight: 1.2 }}>Arch & Garden</div>
                <div style={{ color: '#2dd4bf', fontSize: '0.72rem', fontWeight: 600, marginTop: '2px' }}>Open-Air Dining</div>
              </div>
            </div>

            <div className="hero-feature-card" style={featureCardStyle}>
              <div style={{ ...iconBadgeStyle, background: 'rgba(110, 231, 183, 0.18)', border: '1px solid rgba(110, 231, 183, 0.4)' }}>
                <Mountain size={20} color="#6ee7b7" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.88rem', lineHeight: 1.2 }}>Sahyadri Hill</div>
                <div style={{ color: '#6ee7b7', fontSize: '0.72rem', fontWeight: 600, marginTop: '2px' }}>Scenic Mountain View</div>
              </div>
            </div>

            <div className="hero-feature-card" style={featureCardStyle}>
              <div style={{ ...iconBadgeStyle, background: 'rgba(245, 158, 11, 0.18)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                <Flame size={20} color="#f59e0b" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.88rem', lineHeight: 1.2 }}>Tandoor & Sizzlers</div>
                <div style={{ color: '#f59e0b', fontSize: '0.72rem', fontWeight: 600, marginTop: '2px' }}>Chef's Specials</div>
              </div>
            </div>

            <div className="hero-feature-card" style={featureCardStyle}>
              <div style={{ ...iconBadgeStyle, background: 'rgba(56, 189, 248, 0.18)', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                <Waves size={20} color="#38bdf8" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.88rem', lineHeight: 1.2 }}>Private Pool Villa</div>
                <div style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 600, marginTop: '2px' }}>Luxury Staycation</div>
              </div>
            </div>
          </div>

          {/* Location snippet */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.85rem',
            marginTop: '8px',
            fontWeight: 600,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            <MapPin size={15} color="#2dd4bf" />
            <span>{cms.address}</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.7) !important;
          box-shadow: 0 12px 30px rgba(212, 175, 55, 0.25) !important;
        }
      `}</style>
    </section>
  );
};

const featureCardStyle = {
  background: 'rgba(15, 23, 21, 0.72)',
  border: '1.5px solid rgba(212, 175, 55, 0.3)',
  borderRadius: '16px',
  padding: '10px 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',
  backdropFilter: 'blur(16px)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  minWidth: '150px'
};

const iconBadgeStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};
