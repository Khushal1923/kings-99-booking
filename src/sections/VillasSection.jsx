import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Star, Users, BedDouble, CalendarCheck, Eye } from 'lucide-react';

export const VillasSection = ({ onSelectVillaDetail, onOpenBookingModal }) => {
  const { villas } = useResort();
  const [filterTag, setFilterTag] = useState('ALL');

  const activeVillas = villas.filter(v => v.isActive);

  const tags = ['ALL', 'Most Popular', 'Family Special', 'Romantic Getaway'];

  const filteredVillas = filterTag === 'ALL'
    ? activeVillas
    : activeVillas.filter(v => v.tag === filterTag);

  return (
    <section id="villas" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge-gold">Kings 99 Staycations</span>
          <h2 className="font-serif text-gold-gradient" style={{ fontSize: '2.5rem', marginTop: '10px', color: '#fff' }}>
            Private Pool Villas & Suites in Nashik
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px' }}>
            Designed for royal comfort, private pool parties, family weekend getaways, and romantic stays in Nashik.
          </p>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '30px'
          }}>
            {tags.map(t => (
              <button
                key={t}
                onClick={() => setFilterTag(t)}
                className={filterTag === t ? 'btn-gold' : 'btn-outline'}
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Villas Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {filteredVillas.map(v => (
            <div key={v.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Photo Container */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={v.coverImage}
                  alt={v.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <span className="badge-gold" style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
                  {v.tag}
                </span>

                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(11,19,16,0.85)',
                  backdropFilter: 'blur(6px)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--accent-gold)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Star size={14} fill="var(--accent-gold)" />
                  <strong>{v.rating}</strong> ({v.reviewsCount})
                </div>
              </div>

              {/* Body Content */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
                  {v.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', flexGrow: 1, lineClamp: 2 }}>
                  {v.tagline}
                </p>

                {/* Specs Pill */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '16px',
                  marginBottom: '20px',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} color="var(--accent-gold)" /> {v.maxGuests} Guests
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BedDouble size={16} color="var(--accent-gold)" /> {v.bedrooms} Bed
                  </span>
                  <span>{v.sqm} m²</span>
                </div>

                {/* Price & Action Footer in ₹ */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Nightly Tariff</span>
                    <strong style={{ fontSize: '1.4rem', color: 'var(--accent-gold)' }}>
                      ₹{v.price.toLocaleString('en-IN')}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onSelectVillaDetail(v)}
                      className="btn-outline"
                      style={{ padding: '8px 12px' }}
                      title="View Gallery & Specs"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onOpenBookingModal(v)}
                      className="btn-gold"
                      style={{ padding: '8px 18px', fontSize: '0.85rem' }}
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
