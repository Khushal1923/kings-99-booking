import React from 'react';
import { useResort } from '../context/ResortContext';
import { ShieldCheck, Anchor, Compass, Award, HeartHandshake, Sparkles } from 'lucide-react';

export const AboutSection = () => {
  const { cms } = useResort();

  const highlights = [
    { icon: <Anchor size={28} color="var(--accent-gold)" />, title: "Private Peninsula", desc: "100+ acres of untouched tropical coastline with secluded white sand beaches." },
    { icon: <Award size={28} color="var(--accent-gold)" />, title: "Personal Butler", desc: "Each villa features a dedicated 24/7 butler trained to fulfill every request." },
    { icon: <Compass size={28} color="var(--accent-gold)" />, title: "Helicopter Transfers", desc: "Seamless private air arrivals directly to our cliffside helipad." },
    { icon: <HeartHandshake size={28} color="var(--accent-gold)" />, title: "World-Class Wellness", desc: "Holistic ocean spa treatments, sunset yoga, and hydrotherapy pools." }
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Text Content */}
          <div>
            <span className="badge-gold">Our Philosophy</span>
            <h2 className="font-serif text-gold-gradient" style={{ fontSize: '2.5rem', marginTop: '10px', color: '#fff', marginBottom: '20px' }}>
              Where Unrivaled Luxury Meets Coastal Tranquility
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
              {cms.aboutStory}
            </p>

            {/* Highlights list */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ shrink: 0 }}>{h.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 700 }}>{h.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Grid */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '12px', borderRadius: 'var(--radius-lg)' }}>
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                alt="Resort Experience"
                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-glass)',
              padding: '20px',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-gold)',
              maxWidth: '240px'
            }}>
              <span className="font-serif" style={{ fontSize: '2rem', color: 'var(--accent-gold)', fontWeight: 800 }}>#1</span>
              <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>Rated Luxury Coastal Resort & Ocean Villas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
