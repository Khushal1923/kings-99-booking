import React from 'react';
import { useResort } from '../context/ResortContext';
import { Phone, MapPin, MessageSquare, Globe } from 'lucide-react';

export const ContactSection = () => {
  const { cms } = useResort();

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <span className="badge-gold">Location & Inquiries</span>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '10px', color: 'var(--text-dark)', fontWeight: 800 }}>
            Connect with Kings 99 Nashik
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px' }}>
            We look forward to welcoming you. Contact our team for villa availability, private party bookings, or table reservations.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {/* Direct Phone Card */}
          <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
            <div style={iconCircleStyle}>
              <Phone size={24} color="var(--accent-gold-dark)" />
            </div>
            <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
              Phone Call Inquiry
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Speak directly with our concierge team in Nashik.
            </p>
            <a href={`tel:${cms.phone}`} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-gold-dark)', textDecoration: 'none' }}>
              {cms.phone}
            </a>
          </div>

          {/* WhatsApp Direct Chat Card */}
          <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', borderColor: 'var(--accent-emerald)' }}>
            <div style={{ ...iconCircleStyle, background: 'rgba(13, 92, 70, 0.12)' }}>
              <MessageSquare size={24} color="var(--accent-emerald)" />
            </div>
            <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
              Instant WhatsApp Alert
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Send a direct message on WhatsApp for instant room rates.
            </p>
            <a
              href={`https://wa.me/${cms.whatsappNumber}?text=${encodeURIComponent(`Namaste Kings 99 Nashik, I would like to inquire about villa booking!`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
              style={{ background: 'var(--accent-emerald)', color: '#fff', fontSize: '0.85rem' }}
            >
              <MessageSquare size={16} /> Chat on WhatsApp
            </a>
          </div>

          {/* Location & Social Card */}
          <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
            <div style={iconCircleStyle}>
              <MapPin size={24} color="var(--accent-gold-dark)" />
            </div>
            <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
              Resort Location & Socials
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
              {cms.address}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={cms.googleLink} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                <Globe size={14} /> Google Business
              </a>
              <a href={cms.instagramLink} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                📸 Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const iconCircleStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: 'rgba(197, 160, 89, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px'
};
