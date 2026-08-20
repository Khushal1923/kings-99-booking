import React, { useState } from 'react';
import { X, Users, BedDouble, Bath, Maximize2, CheckCircle2, CalendarCheck, Star } from 'lucide-react';

export const VillaDetailModal = ({ villa, onClose, onBookNow }) => {
  const [activePhoto, setActivePhoto] = useState(villa.coverImage);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid var(--border-glass)',
            color: '#fff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Main Photo Viewer */}
        <div style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '16px',
          maxHeight: '420px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <img
            src={activePhoto || villa.coverImage}
            alt={villa.name}
            style={{ width: '100%', height: '420px', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            background: 'rgba(11, 19, 16, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-glass)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--accent-gold)',
            fontSize: '0.85rem'
          }}>
            <Star size={16} fill="var(--accent-gold)" />
            <strong>{villa.rating}</strong> ({villa.reviewsCount} verified reviews)
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {villa.gallery && villa.gallery.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
            {[villa.coverImage, ...villa.gallery.filter(g => g !== villa.coverImage)].map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`${villa.name} ${idx}`}
                onClick={() => setActivePhoto(imgUrl)}
                style={{
                  width: '80px',
                  height: '60px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: activePhoto === imgUrl ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  opacity: activePhoto === imgUrl ? 1 : 0.6,
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>
        )}

        {/* Header Details */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <span className="badge-gold">{villa.tag}</span>
            <h2 className="font-serif" style={{ fontSize: '2rem', color: '#fff', marginTop: '6px' }}>
              {villa.name}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
              {villa.tagline}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Starting from</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
              ₹{villa.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ night</span>
            </div>
          </div>
        </div>

        {/* Quick Specs Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-glass)',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="var(--accent-gold)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Capacity</span>
              <strong style={{ fontSize: '0.95rem' }}>Up to {villa.maxGuests} Guests</strong>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BedDouble size={20} color="var(--accent-gold)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Bedrooms</span>
              <strong style={{ fontSize: '0.95rem' }}>{villa.bedrooms} Bedrooms</strong>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bath size={20} color="var(--accent-gold)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Baths</span>
              <strong style={{ fontSize: '0.95rem' }}>{villa.bathrooms} Luxury Baths</strong>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Maximize2 size={20} color="var(--accent-gold)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Size</span>
              <strong style={{ fontSize: '0.95rem' }}>{villa.sqm} m²</strong>
            </div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div style={{ marginBottom: '30px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '16px' }}>
            Exclusive Villa Amenities & Services
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {villa.amenities.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} color="var(--accent-gold)" shrink={0} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onClose();
            onBookNow(villa);
          }}
          className="btn-gold"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
        >
          <CalendarCheck size={20} /> Reserve Villa at Kings 99 Nashik
        </button>
      </div>
    </div>
  );
};
