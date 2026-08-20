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
          {/* Subtle Ambient Vignette Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 21, 0.4) 0%, rgba(15, 23, 21, 0.65) 60%, var(--bg-primary) 100%)'
          }}></div>
        </div>
      ) : (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 21, 0.35) 0%, rgba(15, 23, 21, 0.65) 60%, var(--bg-primary) 100%), url(${cms.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '100px 20px 70px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge-gold" style={{
            marginBottom: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'var(--accent-gold)',
            color: 'var(--accent-gold-dark)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}>
            <Sparkles size={14} /> Luxury Private Pool Resort • Nashik
          </span>

          <h1 className="font-serif" style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '20px',
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            {cms.tagline}
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '36px',
            lineHeight: 1.6,
            fontWeight: 500,
            textShadow: '0 2px 10px rgba(0,0,0,0.4)'
          }}>
            {cms.heroSubtitle}
          </p>

          {/* Quick Date Availability Search Widget in Bright White Card */}
          <form onSubmit={handleQuickSearch} className="glass-card" style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '16px',
            alignItems: 'end',
            textAlign: 'left',
            background: '#ffffff',
            boxShadow: 'var(--shadow-elevated)',
            border: '2px solid var(--border-glass)'
          }}>
            <div>
              <label className="form-label" style={{ color: 'var(--accent-gold-dark)' }}>Villa Type</label>
              <select
                className="form-input"
                value={selectedVillaId}
                onChange={(e) => setSelectedVillaId(e.target.value)}
              >
                <option value="">All Private Pool Villas</option>
                {villas.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ color: 'var(--accent-gold-dark)' }}>Check-In Date</label>
              <input
                type="date"
                className="form-input"
                value={searchCheckIn}
                onChange={(e) => setSearchCheckIn(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ color: 'var(--accent-gold-dark)' }}>Check-Out Date</label>
              <input
                type="date"
                className="form-input"
                value={searchCheckOut}
                onChange={(e) => setSearchCheckOut(e.target.value)}
              />
            </div>

            <div>
              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                <Search size={18} /> Check Rates & Availability
              </button>
            </div>
          </form>

          {/* Location snippet */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.88rem',
            marginTop: '24px',
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
