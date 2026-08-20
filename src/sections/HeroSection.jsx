import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Search, Sparkles, MapPin } from 'lucide-react';

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

  return (
    <section id="home" style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
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
          {/* Subtle Ambient Vignette & Gradient Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 21, 0.45) 0%, rgba(15, 23, 21, 0.68) 60%, var(--bg-primary) 100%)'
          }}></div>
        </div>
      ) : (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 21, 0.4) 0%, rgba(15, 23, 21, 0.68) 60%, var(--bg-primary) 100%), url(${cms.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '110px 20px 70px' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge-gold" style={{
            marginBottom: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'var(--accent-gold)',
            color: 'var(--accent-gold-dark)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            fontWeight: 700,
            letterSpacing: '1px'
          }}>
            <Sparkles size={14} /> Luxury Private Pool Resort • Nashik
          </span>

          <h1 className="font-serif" style={{
            fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '22px',
            color: '#ffffff',
            textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            letterSpacing: '0.5px'
          }}>
            {cms.tagline}
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '42px',
            lineHeight: 1.6,
            fontWeight: 500,
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            maxWidth: '780px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {cms.heroSubtitle}
          </p>

          {/* Quick Date Availability Search Widget in Bright White Card */}
          <form onSubmit={handleQuickSearch} className="glass-card" style={{
            padding: '28px 32px',
            borderRadius: 'var(--radius-lg)',
            background: '#ffffff',
            boxShadow: 'var(--shadow-elevated)',
            border: '2px solid var(--border-glass)',
            backdropFilter: 'blur(20px)'
          }}>
            {/* Top 3 Input Controls Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              textAlign: 'left',
              marginBottom: '24px'
            }}>
              <div>
                <label className="form-label" style={{ color: 'var(--accent-gold-dark)', fontWeight: 700 }}>Villa Type</label>
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

            {/* Centered Check Rates & Availability Button */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button
                type="submit"
                className="btn-gold"
                style={{
                  padding: '14px 36px',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-gold)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  minWidth: '280px'
                }}
              >
                <Search size={18} /> Check Rates & Availability
              </button>
            </div>
          </form>

          {/* Location snippet */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.92)',
            fontSize: '0.88rem',
            marginTop: '28px',
            fontWeight: 600,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            <MapPin size={16} color="var(--accent-gold-light)" />
            <span>{cms.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
