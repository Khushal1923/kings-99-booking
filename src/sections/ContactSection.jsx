import React from 'react';
import { useResort } from '../context/ResortContext';
import { MapPin, Navigation, Clock, Phone, ExternalLink, MessageSquare, Compass, ShieldCheck } from 'lucide-react';

export const ContactSection = () => {
  const { cms } = useResort();

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Kings 99 Restaurant and Villa Nashik Anjaneri Maharashtra")}`;
  // Clean embed map URL for Nashik Trimbak Road area
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=Kings%2099%20Restaurant%20and%20Villa%20Nashik&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px' }}>
          <span className="badge-gold" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(13, 92, 70, 0.12)',
            color: 'var(--accent-emerald)',
            borderColor: 'rgba(13, 92, 70, 0.25)',
            marginBottom: '14px',
            padding: '6px 16px',
            fontWeight: 700
          }}>
            <MapPin size={14} /> VISIT US IN NASHIK
          </span>

          <h2 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-dark)', fontWeight: 800, lineHeight: 1.2 }}>
            Find Us at <span style={{ color: 'var(--accent-emerald)' }}>Anjaneri, Trimbak Road, Nashik</span>
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '14px', lineHeight: 1.6 }}>
            Located in the scenic valley along Trimbakeshwar Road, Nashik — easily accessible with ample private parking, pool staycations, and gourmet dining.
          </p>
        </div>

        {/* 2-Column Grid Layout (Image 2 Reference Style) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* LEFT COLUMN: 3 Stacked Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Card 1: Primary Location & Address */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--accent-emerald)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shrink: 0,
                  boxShadow: '0 6px 16px rgba(13, 92, 70, 0.3)'
                }}>
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--text-dark)', fontWeight: 800, lineHeight: 1.2 }}>
                    {cms.resortName}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                    {cms.address}
                  </p>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: 'var(--accent-emerald)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Navigation size={16} /> Get Driving Directions
                </a>

                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Free Parking & Wi-Fi Available
                </span>
              </div>
            </div>

            {/* Card 2: Timings & Inquiries */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '20px'
              }}>
                {/* Opening Hours */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    <Clock size={15} color="var(--accent-emerald)" /> OPENING HOURS
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                    07:00 AM – 11:00 PM
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                    Open All 7 Days
                  </span>
                </div>

                {/* Reservations */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    <Phone size={15} color="var(--accent-emerald)" /> RESERVATIONS
                  </div>
                  <a href={`tel:${cms.phone}`} style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)', textDecoration: 'none' }}>
                    {cms.phone}
                  </a>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                    Calls & WhatsApp
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Connected Social Links & Platforms */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '14px' }}>
                CONNECTED SOCIAL & DIRECTORIES
              </span>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={cms.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{ padding: '8px 16px', fontSize: '0.82rem', borderColor: '#e1306c', color: '#e1306c' }}
                >
                  📸 Instagram (@kings99official)
                </a>

                <a
                  href={`https://wa.me/${cms.whatsappNumber}?text=${encodeURIComponent('Namaste Kings 99 Nashik, I would like to make an inquiry!')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{ padding: '8px 16px', fontSize: '0.82rem', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}
                >
                  <MessageSquare size={14} /> WhatsApp Direct
                </a>

                <a
                  href={cms.googleLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                >
                  <ExternalLink size={14} /> Google Business
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Embedded Google Map with Custom Overlay */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{
              borderRadius: '24px',
              overflow: 'hidden',
              height: '460px',
              position: 'relative',
              boxShadow: 'var(--shadow-elevated)',
              border: '2px solid var(--border-glass)'
            }}>
              {/* Google Map iframe */}
              <iframe
                title="Kings 99 Nashik Map"
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.02)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Top Floating Badge: Open in Maps ↗ */}
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: '#ffffff',
                  color: 'var(--accent-emerald)',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid var(--border-glass)'
                }}
              >
                Open in Maps <ExternalLink size={14} />
              </a>

              {/* Bottom Floating Info Card Overlay (Reference Image 2 Style) */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: '#ffffff',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                border: '1px solid var(--border-glass)'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                    Kings 99 Restaurant & Villa • Anjaneri, Nashik
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Tap button to open directly in Google Maps app
                  </p>
                </div>

                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    background: 'var(--accent-emerald)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(13, 92, 70, 0.3)'
                  }}
                >
                  Open Maps <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
