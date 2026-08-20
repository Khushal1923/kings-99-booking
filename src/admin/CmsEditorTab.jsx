import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ImageUploader } from '../components/ImageUploader';
import { Check, Video, Music, Upload } from 'lucide-react';

export const CmsEditorTab = () => {
  const { cms, updateCMS } = useResort();

  const [formState, setFormState] = useState(cms);
  const [savedSuccess, setSavedSuccess] = useState(false);

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
        <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#fff' }}>
          🌐 Live Website CMS, Video & Background Music Editor
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Edit resort branding, hero video loop URL, background music track, and contact details.
        </p>
      </div>

      {savedSuccess && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          color: '#10b981',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check size={18} /> Website video, music & CMS content updated live!
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
        <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>
          General Branding & Text
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">Resort Name</label>
            <input
              type="text"
              className="form-input"
              value={formState.resortName}
              onChange={(e) => setFormState({ ...formState, resortName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label">Main Hero Tagline</label>
            <input
              type="text"
              className="form-input"
              value={formState.tagline}
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
            value={formState.announcementText}
            onChange={(e) => setFormState({ ...formState, announcementText: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label className="form-label">Hero Subtitle Story</label>
          <textarea
            className="form-input"
            rows="3"
            value={formState.heroSubtitle}
            onChange={(e) => setFormState({ ...formState, heroSubtitle: e.target.value })}
            required
          ></textarea>
        </div>

        {/* Hero Video & Background Music Config */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '24px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            value={formState.heroImage}
            onChange={(img) => setFormState({ ...formState, heroImage: img })}
          />
        </div>

        {/* Background Resort Ambiance Music Config */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginBottom: '24px' }}>
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#10b981', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>
            Resort Contact Details
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="form-label">Primary Phone</label>
              <input
                type="text"
                className="form-input"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">WhatsApp Number (digits only)</label>
              <input
                type="text"
                className="form-input"
                value={formState.whatsappNumber}
                onChange={(e) => setFormState({ ...formState, whatsappNumber: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formState.email}
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
              value={formState.address}
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
