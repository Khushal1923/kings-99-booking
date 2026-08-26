import React, { useState } from 'react';
import { Upload, Link as LinkIcon, X, Check, Image as ImageIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const compressAndResizeImage = (file, maxDimension = 1280, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const ImageUploader = ({ value, onChange, label = "Photo / Image URL" }) => {
  const [tab, setTab] = useState('upload'); // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState(value || '');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please choose a smaller photo.");
      return;
    }

    setUploading(true);
    try {
      // 1. Compress & resize image to 1280px JPEG
      const compressedDataUrl = await compressAndResizeImage(file, 1280, 0.75);

      if (isSupabaseConfigured && supabase) {
        // 2. Upload to Supabase Storage bucket 'resort-media'
        const blob = dataURLtoBlob(compressedDataUrl);
        const fileName = `resort_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.jpg`;

        const { data, error } = await supabase.storage
          .from('resort-media')
          .upload(fileName, blob, {
            contentType: 'image/jpeg',
            upsert: true
          });

        if (error) {
          console.warn("Supabase storage upload fallback:", error);
          onChange(compressedDataUrl);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('resort-media')
            .getPublicUrl(data.path);

          onChange(publicUrlData.publicUrl);
        }
      } else {
        // Fallback for offline local testing
        onChange(compressedDataUrl);
      }
    } catch (err) {
      console.error("Image processing error:", err);
      alert("Failed to process and upload image.");
    } finally {
      setUploading(false);
    }
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
                {uploading ? "Uploading to Supabase Storage..." : "Click to browse photo from your device"}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {isSupabaseConfigured ? "Uploads directly to Supabase CDN Storage" : "Auto-compressed to ~1280px JPEG"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
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
