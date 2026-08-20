import React, { useState, useRef } from 'react';
import { useResort } from '../context/ResortContext';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const AudioPlayerWidget = () => {
  const { cms } = useResort();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

  if (!cms.bgMusic) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play blocked by browser:", err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 990,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      border: '1.5px solid var(--border-glass)',
      borderRadius: 'var(--radius-full)',
      padding: '8px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: 'var(--shadow-gold)'
    }}>
      <audio
        ref={audioRef}
        src={cms.bgMusic}
        loop
        preload="auto"
      />

      {/* Animated Sound Wave Equalizer Icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        height: '16px'
      }}>
        <div style={{
          width: '3px',
          height: isPlaying ? '14px' : '6px',
          background: 'var(--accent-gold-dark)',
          borderRadius: '2px',
          transition: 'height 0.3s ease'
        }}></div>
        <div style={{
          width: '3px',
          height: isPlaying ? '18px' : '10px',
          background: 'var(--accent-gold-dark)',
          borderRadius: '2px',
          transition: 'height 0.2s ease'
        }}></div>
        <div style={{
          width: '3px',
          height: isPlaying ? '10px' : '4px',
          background: 'var(--accent-gold-dark)',
          borderRadius: '2px',
          transition: 'height 0.3s ease'
        }}></div>
      </div>

      {/* Title */}
      <div style={{ fontSize: '0.82rem', color: 'var(--text-dark)', fontWeight: 700, display: 'none' }} className="music-title">
        {cms.bgMusicTitle || "Kings 99 Music"}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        style={{
          background: 'linear-gradient(135deg, #c5a059, #9a7632)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(197, 160, 89, 0.4)'
        }}
        title={isPlaying ? "Pause Resort Ambiance Music" : "Play Resort Ambiance Music"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
      </button>

      {/* Mute Button */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={16} color="#dc2626" /> : <Volume2 size={16} color="var(--accent-gold-dark)" />}
        </button>
      )}

      <style>{`
        @media (min-width: 600px) {
          .music-title { display: block !important; }
        }
      `}</style>
    </div>
  );
};
