import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Maximize2, X } from 'lucide-react';

export const GallerySection = () => {
  const { gallery } = useResort();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxImg, setLightboxImg] = useState(null);

  const categories = ['ALL', 'Villas', 'Dining', 'Experiences', 'Views'];

  const filteredGallery = activeCategory === 'ALL'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
          <span className="badge-gold">Resort Showcase</span>
          <h2 className="font-serif text-gold-gradient" style={{ fontSize: '2.5rem', marginTop: '10px', color: '#fff' }}>
            Life at Aura Haven
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px' }}>
            Explore our tropical paradise, private infinity pools, turquoise ocean views, and luxury amenities.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '24px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'btn-gold' : 'btn-outline'}
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {filteredGallery.map(img => (
            <div
              key={img.id}
              onClick={() => setLightboxImg(img)}
              className="glass-card"
              style={{
                position: 'relative',
                height: '260px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <img
                src={img.url}
                alt={img.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(0deg, rgba(11,19,16,0.9) 0%, transparent 100%)',
                padding: '20px 16px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{img.title}</span>
                <Maximize2 size={16} color="var(--accent-gold)" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImg.url}
              alt={lightboxImg.title}
              style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '16px', boxShadow: 'var(--shadow-card)' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: 'rgba(11,19,16,0.85)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              color: '#fff',
              fontSize: '0.9rem'
            }}>
              {lightboxImg.title} ({lightboxImg.category})
            </div>
            <button
              onClick={() => setLightboxImg(null)}
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
