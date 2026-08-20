import React, { useState } from 'react';
import { Upload, Link as LinkIcon, X, Check, Image as ImageIcon } from 'lucide-react';

export const ImageUploader = ({ value, onChange, label = "Photo / Image URL" }) => {
  const [tab, setTab] = useState('upload'); // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState(value || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit. Please choose a smaller photo.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label className="form-label">{label}</label>

      {/* Preview if image exists */}
      {value ? (
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-glass)',
          marginBottom: '10px',
          maxHeight: '200px'
        }}>
          <img
            src={value}
            alt="Preview"
            style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x400?text=Invalid+Image+URL';
            }}
          />
          <button
            type="button"
            onClick={() => { onChange(''); setUrlInput(''); }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid #ef4444',
              color: '#ef4444',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Remove Photo"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px dashed var(--border-glass)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          {/* Toggle Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
            <button
              type="button"
              onClick={() => setTab('upload')}
              className={tab === 'upload' ? 'btn-gold' : 'btn-outline'}
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              <Upload size={14} /> Upload Device File
            </button>
            <button
              type="button"
              onClick={() => setTab('url')}
              className={tab === 'url' ? 'btn-gold' : 'btn-outline'}
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              <LinkIcon size={14} /> Image Web URL
            </button>
          </div>

          {tab === 'upload' ? (
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              border: '2px dashed var(--border-glass)',
              borderRadius: '8px',
              cursor: 'pointer',
              background: 'rgba(212, 175, 55, 0.03)',
              textAlign: 'center'
            }}>
              <ImageIcon size={32} color="var(--accent-gold)" style={{ marginBottom: '8px' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                Click to browse photo from your device
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Supports JPG, PNG, WEBP (Max 5MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Paste image URL (https://...)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button
                type="button"
                className="btn-gold"
                onClick={handleUrlSubmit}
                style={{ padding: '10px 16px', shrink: 0 }}
              >
                <Check size={16} /> Save
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
