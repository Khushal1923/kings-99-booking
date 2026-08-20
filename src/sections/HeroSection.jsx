import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Search, Sparkles, MapPin, Play } from 'lucide-react';

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
    <section id="home" style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background Video element if configured, or background image */}
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
          {/* Gradient Overlay for high text contrast */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(11, 19, 16, 0.5) 0%, rgba(11, 19, 16, 0.85) 75%, #0b1310 100%)'
          }}></div>
        </div>
      ) : (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(180deg, rgba(11, 19, 16, 0.4) 0%, rgba(11, 19, 16, 0.85) 70%, #0b1310 100%), url(${cms.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge-gold" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} /> Luxury Private Pool Resort Nashik
          </span>

          <h1 className="font-serif text-gold-gradient" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '20px',
            textShadow: '0 10px 30px rgba(0,0,0,0.6)'
          }}>
            {cms.tagline}
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '40px',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            {cms.heroSubtitle}
          </p>

          {/* Quick Date Availability Search Widget */}
          <form onSubmit={handleQuickSearch} className="glass-card" style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            alignItems: 'end',
            textAlign: 'left'
          }}>
            <div>
              <label className="form-label" style={{ color: 'var(--accent-gold-light)' }}>Villa Type</label>
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
              <label className="form-label" style={{ color: 'var(--accent-gold-light)' }}>Check-In Date</label>
              <input
                type="date"
                className="form-input"
                value={searchCheckIn}
                onChange={(e) => setSearchCheckIn(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ color: 'var(--accent-gold-light)' }}>Check-Out Date</label>
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
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            marginTop: '24px'
          }}>
            <MapPin size={16} color="var(--accent-gold)" />
            <span>{cms.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
