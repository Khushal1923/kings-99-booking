import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Globe } from 'lucide-react';

export const ContactSection = () => {
  const { cms } = useResort();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
          <span className="badge-gold">Contact & Directions</span>
          <h2 className="font-serif text-gold-gradient" style={{ fontSize: '2.5rem', marginTop: '10px', color: '#fff' }}>
            Visit {cms.resortName}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px' }}>
            Located in Nashik, Maharashtra. Reach out for villa staycation bookings, pool party arrangements, or garden dining reservations.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px'
        }}>
          {/* Contact Details & Social Links Card */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '24px' }}>
              Direct Resort Contacts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)'
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Reservations & Inquiries</span>
                  <a href={`tel:${cms.phone}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>{cms.phone}</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)'
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Email Inquiry</span>
                  <a href={`mailto:${cms.email}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>{cms.email}</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)'
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{cms.address}</span>
                </div>
              </div>
            </div>

            {/* Official Social Links Box */}
            <div style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '12px' }}>
                📸 Official Social & Maps
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {cms.instagramLink && (
                  <a
                    href={cms.instagramLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                    style={{ padding: '8px 14px', fontSize: '0.8rem', background: '#e1306c', color: '#fff' }}
                  >
                    📸 Instagram @kings99official
                  </a>
                )}
                {cms.googleLink && (
                  <a
                    href={cms.googleLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                    style={{ padding: '8px 14px', fontSize: '0.8rem', background: '#4285F4', color: '#fff' }}
                  >
                    <Globe size={14} /> Google Business Listing
                  </a>
                )}
              </div>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '4px' }}>
                Instant WhatsApp Booking Inquiry
              </h4>
              <a
                href={`https://wa.me/${cms.whatsappNumber}?text=${encodeURIComponent(`Hello Kings 99 Nashik, I have an inquiry about booking a villa stay.`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{ background: '#10b981', color: '#fff', width: '100%', justifyContent: 'center', marginTop: '10px' }}
              >
                <MessageSquare size={16} /> Chat on WhatsApp Now
              </a>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '20px' }}>
                  Send Inquiry to Kings 99
                </h3>

                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Message / Event Inquiry</label>
                  <textarea
                    className="form-input"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Pool villa booking, birthday party, lawn event inquiry..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={18} /> Send Message to Kings 99
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>
                  Message Sent to Kings 99!
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Thank you {name}. Our team will respond to {email} shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
