import React from 'react';
import { useResort } from '../context/ResortContext';
import { MapPin, Navigation, Clock, Phone, ExternalLink } from 'lucide-react';

// Exact Full-Color Instagram Gradient App Badge SVG (Matching User's Image 1)
export const InstagramAppLogo = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ borderRadius: '6px', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
    <defs>
      <linearGradient id="igAppGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="15%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="100%" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#igAppGrad)" />
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4z" fill="#ffffff" />
    <circle cx="16.5" cy="7.5" r="1.1" fill="#ffffff" />
    <path d="M16 3H8C5.24 3 3 5.24 3 8v8c0 2.76 2.24 5 5 5h8c2.76 0 5-2.24 5-5V8c0-2.76-2.24-5-5-5zm3.2 13c0 1.76-1.44 3.2-3.2 3.2H8c-1.76 0-3.2-1.44-3.2-3.2V8c0-1.76 1.44-3.2 3.2-3.2h8c1.76 0 3.2 1.44 3.2 3.2v8z" fill="#ffffff" />
  </svg>
);

// Exact Full-Color WhatsApp Bright Green App Badge SVG (Matching User's Image 2)
export const WhatsAppAppLogo = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ borderRadius: '6px', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
    <rect width="24" height="24" rx="6" fill="#25D366" />
    <path fill="#ffffff" d="M12.012 4c-4.405 0-7.991 3.582-7.992 7.987 0 1.409.367 2.783 1.066 3.999l-1.133 4.136 4.234-1.11c1.174.64 2.502.977 3.826.977h.003c4.404 0 7.99-3.582 7.992-7.988 0-2.134-.831-4.14-2.34-5.649A7.938 7.938 0 0 0 12.012 4zm.003 1.333c1.777 0 3.447.693 4.711 1.961a6.618 6.618 0 0 1 1.957 4.704c-.002 3.67-2.99 6.654-6.662 6.654h-.002a6.616 6.616 0 0 1-3.38-.925l-.242-.144-2.512.658.67-2.449-.158-.251a6.609 6.609 0 0 1-1.013-3.534c0-3.67 2.988-6.656 6.661-6.658zm-2.88 2.88c-.165 0-.354.062-.538.262-.185.2-.704.688-.704 1.678 0 .99.722 1.947.822 2.082.1.134 1.421 2.17 3.444 3.043 2.023.874 2.023.582 2.384.546.362-.036 1.168-.478 1.333-.938.165-.461.165-.855.116-.938-.048-.083-.181-.134-.346-.218-.165-.083-.977-.482-1.13-.537-.152-.056-.264-.083-.376.083-.112.166-.435.546-.534.659-.099.112-.198.125-.363.042-.165-.083-.696-.257-1.326-.818-.491-.437-.822-.977-.919-1.143-.097-.166-.01-.256.072-.338.075-.074.165-.195.247-.293.083-.098.11-.166.166-.278.055-.112.027-.21-.014-.293-.042-.083-.375-.904-.514-1.238-.134-.325-.27-.282-.375-.286l-.32-.006z"/>
  </svg>
);

// Full-Color Google Multi-Color App Badge SVG
export const GoogleAppLogo = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ borderRadius: '6px', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
    <rect width="24" height="24" rx="6" fill="#ffffff" stroke="rgba(0,0,0,0.12)" />
    <g transform="translate(3.5, 3.5) scale(0.7)">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.24a7.185 7.185 0 0 1 0-4.48V6.61H1.29a11.97 11.97 0 0 0 0 10.78l3.99-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
    </g>
  </svg>
);

export const ContactSection = () => {
  const { cms } = useResort();

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Kings 99 Restaurant and Villa Nashik Anjaneri Maharashtra")}`;
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

        {/* 2-Column Grid Layout */}
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

            {/* Card 3: Connected Social Links (With User's exact Instagram & WhatsApp App Badge Logos) */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '14px' }}>
                CONNECTED SOCIAL & DIRECTORIES
              </span>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {/* Instagram App Badge Button (Image 1 Logo) */}
                <a
                  href={cms.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    borderColor: '#d6249f',
                    color: '#c13584',
                    background: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(214, 36, 159, 0.12)'
                  }}
                >
                  <InstagramAppLogo size={22} /> Instagram (@kings99official)
                </a>

                {/* WhatsApp App Badge Button (Image 2 Logo) */}
                <a
                  href={`https://wa.me/${cms.whatsappNumber}?text=${encodeURIComponent('Namaste Kings 99 Nashik, I would like to make an inquiry!')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    borderColor: '#25D366',
                    color: '#075E54',
                    background: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.15)'
                  }}
                >
                  <WhatsAppAppLogo size={22} /> WhatsApp Direct
                </a>

                {/* Google Business App Badge Button */}
                <a
                  href={cms.googleLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    borderColor: 'var(--border-glass)',
                    color: 'var(--text-dark)',
                    background: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <GoogleAppLogo size={22} /> Google Business
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Embedded Google Map */}
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

              {/* Bottom Floating Info Card Overlay */}
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
