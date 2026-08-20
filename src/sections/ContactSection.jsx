import React from 'react';
import { useResort } from '../context/ResortContext';
import { MapPin, Navigation, Clock, Phone, ExternalLink, Compass } from 'lucide-react';

// Official SVG Brand Icons
export const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.761.459 3.479 1.332 5.001l-1.416 5.17 5.292-1.387c1.467.8 3.127 1.22 4.782 1.221h.004c5.505 0 9.988-4.478 9.99-9.985 0-2.668-1.039-5.176-2.926-7.062a9.923 9.923 0 0 0-7.061-2.942zm.004 1.666a8.272 8.272 0 0 1 5.889 2.451 8.272 8.272 0 0 1 2.446 5.88c-.002 4.587-3.737 8.318-8.327 8.318h-.003a8.27 8.27 0 0 1-4.225-1.157l-.303-.18-3.14.822.837-3.061-.197-.314a8.261 8.261 0 0 1-1.266-4.417c0-4.587 3.735-8.32 8.326-8.322zm-3.6 3.6c-.206 0-.442.078-.673.328-.231.25-.88.86-.88 2.098 0 1.238.902 2.434 1.027 2.602.126.168 1.777 2.712 4.305 3.804 2.528 1.092 2.528.728 2.98.683.453-.045 1.46-.597 1.666-1.173.206-.576.206-1.069.145-1.173-.06-.104-.226-.168-.432-.272-.206-.104-1.222-.603-1.413-.672-.19-.07-.33-.104-.47.104-.14.208-.544.683-.667.824-.124.14-.247.157-.453.052-.206-.104-.87-.321-1.657-1.023-.614-.547-1.028-1.222-1.149-1.429-.121-.208-.013-.32.09-.423.094-.093.206-.244.309-.366.104-.122.138-.208.207-.348.069-.14.034-.262-.017-.366-.052-.104-.469-1.13-.642-1.547-.168-.407-.338-.352-.469-.358l-.4-.007z"/>
  </svg>
);

export const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
    <path fill="#FBBC05" d="M5.28 14.24a7.185 7.185 0 0 1 0-4.48V6.61H1.29a11.97 11.97 0 0 0 0 10.78l3.99-3.15z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
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

            {/* Card 3: Connected Social Links & Platforms (With Official Brand SVG Icons) */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '14px' }}>
                CONNECTED SOCIAL & DIRECTORIES
              </span>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {/* Instagram Button with Official SVG Icon */}
                <a
                  href={cms.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    borderColor: '#e1306c',
                    color: '#e1306c',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <InstagramIcon size={18} /> Instagram (@kings99official)
                </a>

                {/* WhatsApp Button with Official SVG Icon */}
                <a
                  href={`https://wa.me/${cms.whatsappNumber}?text=${encodeURIComponent('Namaste Kings 99 Nashik, I would like to make an inquiry!')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    borderColor: '#25D366',
                    color: '#128C7E',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <WhatsAppIcon size={18} /> WhatsApp Direct
                </a>

                {/* Google Maps Button with Multi-Color Google G SVG Icon */}
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <GoogleIcon size={18} /> Google Business
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
