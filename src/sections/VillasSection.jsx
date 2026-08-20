import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Star, Users, Bed, Eye, CalendarCheck, Check } from 'lucide-react';

export const VillasSection = ({ onSelectVillaDetail, onOpenBookingModal }) => {
  const { villas } = useResort();

  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredVillas = villas.filter(v => {
    if (!v.isActive) return false;
    if (activeFilter === 'COUPLES') return v.maxGuests <= 2;
    if (activeFilter === 'FAMILY') return v.maxGuests > 2 && v.maxGuests <= 6;
    if (activeFilter === 'LARGE_GROUPS') return v.maxGuests > 6;
    return true;
  });

  return (
    <section id="villas" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <span className="badge-gold">Royal Accommodations Nashik</span>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '10px', color: 'var(--text-dark)', fontWeight: 800 }}>
            Luxury Private Pool Villas & Suites
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px' }}>
            Escape into ultimate serenity with personal swimming pools, lush garden lawns, and 24/7 room service in Nashik, India.
          </p>

          {/* Villa Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'All Private Villas' },
              { id: 'COUPLES', label: 'Couple Pool Villas (2 Guests)' },
              { id: 'FAMILY', label: 'Family Suites (4-6 Guests)' },
              { id: 'LARGE_GROUPS', label: 'Grand Celebration Villas (8+ Guests)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={activeFilter === f.id ? 'btn-gold' : 'btn-outline'}
                style={{ padding: '8px 18px', fontSize: '0.82rem' }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Villas Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '30px'
        }}>
          {filteredVillas.map(villa => (
            <div
              key={villa.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              {/* Cover Image Header */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={villa.coverImage}
                  alt={villa.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Tag Badge */}
                {villa.tag && (
                  <span className="badge-gold" style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#ffffff',
                    color: 'var(--accent-gold-dark)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {villa.tag}
                  </span>
                )}

                {/* Rating Pill */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <Star size={14} color="#f59e0b" fill="#f59e0b" />
                  <span>{villa.rating} ({villa.reviewsCount})</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="font-serif" style={{ fontSize: '1.35rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
                  {villa.name}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
                  {villa.tagline}
                </p>

                {/* Specs Pill List */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  padding: '12px 0',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} color="var(--accent-gold-dark)" />
                    <span>Up to {villa.maxGuests} Guests</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bed size={16} color="var(--accent-gold-dark)" />
                    <span>{villa.bedrooms} Bedrooms</span>
                  </div>
                </div>

                {/* Amenities checklist snippet */}
                <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {villa.amenities.slice(0, 3).map((amenity, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      <Check size={14} color="var(--accent-emerald)" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* Tariff Price & Action CTAs */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Starting Tariff</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>
                      ₹{villa.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ night</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onSelectVillaDetail(villa)}
                      className="btn-outline"
                      style={{ padding: '8px 12px' }}
                      title="View Photos & Specifications"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => onOpenBookingModal(villa)}
                      className="btn-gold"
                      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                    >
                      <CalendarCheck size={16} /> Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
