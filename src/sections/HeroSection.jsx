import React from 'react';
import { useResort } from '../context/ResortContext';
import { Sparkles, MapPin, UtensilsCrossed, Calendar } from 'lucide-react';

export const HeroSection = ({ onOpenBookingModal }) => {
  const { cms } = useResort();

  const handleScrollToDining = () => {
    const element = document.getElementById('dining');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" style={{ position: 'relative', minHeight: '86vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
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
            marginBottom: '36px',
            lineHeight: 1.6,
            maxWidth: '750px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
            fontWeight: 400
          }}>
            {cms.heroSubtitle || "Experience Nashik's premier culinary sanctuary. Enjoy rich Indian gravies, charcoal Tandoori kebabs, open-air garden dining & luxury private pool villa stays on Trimbak Road."}
          </p>

          {/* 3 Premium Theme Action Pill Buttons */}
          <div style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            {/* Button 1: Rich Champagne Gold Pill */}
            <button
              onClick={handleScrollToDining}
              className="btn-hero-primary"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #aa8620 100%)',
                color: '#0b1310',
                fontWeight: 800,
                padding: '13px 26px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)'
              }}
            >
              <UtensilsCrossed size={17} color="#0b1310" /> EXPLORE MENU
            </button>

            {/* Button 2: Deep Emerald Forest Pill */}
            <button
              onClick={() => onOpenBookingModal(null)}
              className="btn-hero-secondary"
              style={{
                background: 'linear-gradient(135deg, #1b5e4d 0%, #0f3d32 100%)',
                color: '#ffffff',
                fontWeight: 800,
                padding: '13px 26px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                boxShadow: '0 6px 20px rgba(27, 94, 77, 0.5)'
              }}
            >
              <Calendar size={17} color="#d4af37" /> BOOK VILLA / TABLE
            </button>

            {/* Button 3: Frosted Luxury Glass Pill */}
            <a
              href={cms.instagramLink || "https://www.instagram.com/kings99official/"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-glass"
              style={{
                background: 'rgba(15, 23, 21, 0.65)',
                color: '#ffffff',
                fontWeight: 800,
                padding: '13px 26px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                backdropFilter: 'blur(12px)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                letterSpacing: '0.8px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.35)'
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Watch Reel 🎬
            </a>
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
        .btn-hero-primary {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .btn-hero-primary:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.55) !important;
        }
        .btn-hero-secondary {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .btn-hero-secondary:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 10px 25px rgba(27, 94, 77, 0.7) !important;
        }
        .btn-hero-glass {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .btn-hero-glass:hover {
          transform: translateY(-3px) !important;
          background: rgba(212, 175, 55, 0.15) !important;
          border-color: rgba(212, 175, 55, 0.8) !important;
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.25) !important;
        }
      `}</style>
    </section>
  );
};
