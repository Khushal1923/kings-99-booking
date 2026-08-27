import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { ImageUploader } from '../components/ImageUploader';
import { Check, Video, Music, Share2 } from 'lucide-react';

export const CmsEditorTab = () => {
  const { cms, updateCMS } = useResort();

  const [formState, setFormState] = useState(cms);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormState(cms);
  }, [cms]);

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Audio file size exceeds 10MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState(prev => ({ ...prev, bgMusic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      alert("Video file size exceeds 25MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState(prev => ({ ...prev, heroVideo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCMS(formState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontWeight: 800 }}>
          🌐 Live Website CMS, Branding & Media Editor
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Edit restaurant branding, tagline, hero video loop, background lounge music, Instagram reels link, and contact details.
        </p>
      </div>

      {savedSuccess && (
        <div style={{
          background: 'rgba(13, 92, 70, 0.12)',
          border: '1px solid #0d5c46',
          color: '#0d5c46',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700
        }}>
          <Check size={18} /> Website branding, social links, video & CMS content published live!
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
        <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 700 }}>
          General Restaurant Branding & Headlines
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">Restaurant / Resort Name</label>
            <input
              type="text"
              className="form-input"
              value={formState.resortName || ''}
              onChange={(e) => setFormState({ ...formState, resortName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label">Main Hero Tagline</label>
            <input
              type="text"
              className="form-input"
              value={formState.tagline || ''}
              onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label className="form-label">Announcement Banner Text</label>
          <input
            type="text"
            className="form-input"
            value={formState.announcementText || ''}
            onChange={(e) => setFormState({ ...formState, announcementText: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label className="form-label">Hero Subtitle Story & Cuisine Highlight</label>
          <textarea
            className="form-input"
            rows="3"
            value={formState.heroSubtitle || ''}
            onChange={(e) => setFormState({ ...formState, heroSubtitle: e.target.value })}
            required
          ></textarea>
        </div>

        {/* Social & Brand Links (Instagram Reels, Google Map, Facebook) */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '24px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#c026d3', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <Share2 size={20} /> Social & Media Reel Links
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="form-label">Instagram Reel / Page URL</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://www.instagram.com/kings99official/"
                value={formState.instagramLink || ''}
                onChange={(e) => setFormState({ ...formState, instagramLink: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Google Business / Maps URL</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://www.google.com/maps/..."
                value={formState.googleLink || ''}
                onChange={(e) => setFormState({ ...formState, googleLink: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Facebook Page URL</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://facebook.com/kings99official"
                value={formState.facebookLink || ''}
                onChange={(e) => setFormState({ ...formState, facebookLink: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Hero Video & Background Music Config */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '24px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--accent-gold-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <Video size={20} /> Hero Section Background Video Loop
          </h4>

          <div style={{ marginBottom: '16px' }}>
            <label className="form-label">Hero Video URL (.mp4 / webm)</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://...video.mp4"
              value={formState.heroVideo || ''}
              onChange={(e) => setFormState({ ...formState, heroVideo: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Or Upload Video File from Device</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoFileChange}
              className="form-input"
              style={{ padding: '8px' }}
            />
          </div>

          <ImageUploader
            label="Hero Poster Image Fallback (For slow connections / Mobile)"
            value={formState.heroImage || ''}
            onChange={(img) => setFormState({ ...formState, heroImage: img })}
          />
        </div>

        {/* Background Resort Ambiance Music Config */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '24px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#0d5c46', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <Music size={20} /> Resort Ambiance Background Music
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="form-label">Music Track Title</label>
              <input
                type="text"
                className="form-input"
                value={formState.bgMusicTitle || ''}
                onChange={(e) => setFormState({ ...formState, bgMusicTitle: e.target.value })}
                placeholder="Kings 99 Serene Lounge Music"
              />
            </div>
            <div>
              <label className="form-label">Audio Track URL (.mp3)</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://...audio.mp3"
                value={formState.bgMusic || ''}
                onChange={(e) => setFormState({ ...formState, bgMusic: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Or Upload MP3 Audio File from Device</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioFileChange}
              className="form-input"
              style={{ padding: '8px' }}
            />
          </div>
        </div>

        {/* Contact Details */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '24px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '16px', fontWeight: 700 }}>
            Resort & Restaurant Contact Details
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="form-label">Primary Phone</label>
              <input
                type="text"
                className="form-input"
                value={formState.phone || ''}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">WhatsApp Number (digits only)</label>
              <input
                type="text"
                className="form-input"
                value={formState.whatsappNumber || ''}
                onChange={(e) => setFormState({ ...formState, whatsappNumber: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formState.email || ''}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="form-label">Physical Address</label>
            <input
              type="text"
              className="form-input"
              value={formState.address || ''}
              onChange={(e) => setFormState({ ...formState, address: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-gold" style={{ padding: '12px 24px' }}>
          <Check size={18} /> Save & Publish Video, Music & CMS Changes
        </button>
      </form>
    </div>
  );
};
