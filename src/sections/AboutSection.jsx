import React from 'react';
import { useResort } from '../context/ResortContext';
import { ShieldCheck, Award, Heart, Sparkles } from 'lucide-react';

export const AboutSection = () => {
  const { cms } = useResort();

  return (
    <section id="about" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Text Content */}
          <div>
            <span className="badge-gold">About Kings 99 Nashik</span>
            <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '10px', color: 'var(--text-dark)', fontWeight: 800, lineHeight: 1.2 }}>
              A Royal Escape in the Heart of Nashik, Maharashtra
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: '20px 0 30px', lineHeight: 1.7 }}>
              {cms.aboutStory}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={iconBoxStyle}>
                  <ShieldCheck size={20} color="var(--accent-gold-dark)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', fontWeight: 700 }}>100% Private Pools</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Complete privacy for families & couples.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={iconBoxStyle}>
                  <Award size={20} color="var(--accent-gold-dark)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', fontWeight: 700 }}>Gourmet Dining</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Fresh North Indian & Tandoori specialties.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={iconBoxStyle}>
                  <Sparkles size={20} color="var(--accent-gold-dark)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', fontWeight: 700 }}>Grand Lawns</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Perfect for birthdays & anniversaries.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={iconBoxStyle}>
                  <Heart size={20} color="var(--accent-gold-dark)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', fontWeight: 700 }}>Warm Hospitality</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>24/7 dedicated room service & staff.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-elevated)',
              border: '2px solid var(--border-glass)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Kings 99 Resort Lawn"
                style={{ width: '100%', height: '440px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const iconBoxStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(197, 160, 89, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};
