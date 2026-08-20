import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Camera, X } from 'lucide-react';

export const GallerySection = () => {
  const { gallery } = useResort();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ['ALL', 'Villas', 'Dining', 'Experiences'];

  const filteredGallery = gallery.filter(g =>
    activeFilter === 'ALL' || g.category === activeFilter
  );

  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <span className="badge-gold">Kings 99 Visual Experience</span>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '10px', color: 'var(--text-dark)', fontWeight: 800 }}>
            Resort Gallery & Ambiance
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px' }}>
            Take a glance into our private pool villas, lush celebration lawns, and fine dining spaces in Nashik.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={activeFilter === cat ? 'btn-gold' : 'btn-outline'}
                style={{ padding: '8px 20px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="glass-card"
              style={{
                height: '280px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                cursor: 'pointer'
              }}
            >
              <img
                src={item.url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 21, 0.85) 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-gold-light)', fontWeight: 700 }}>
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.title}</h4>
                </div>
                <Camera size={18} color="var(--accent-gold-light)" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div className="modal-overlay" onClick={() => setLightboxImage(null)}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img src={lightboxImage.url} alt={lightboxImage.title} style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px' }} />
            <div style={{ textAlign: 'center', marginTop: '12px', color: '#fff' }}>
              <h3>{lightboxImage.title}</h3>
            </div>
            <button
              onClick={() => setLightboxImage(null)}
              style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
