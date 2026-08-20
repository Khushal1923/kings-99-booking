import React, { useState, useRef } from 'react';
import { useResort } from '../context/ResortContext';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

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
      background: 'rgba(18, 30, 26, 0.9)',
      backdropFilter: 'blur(16px)',
      border: '1px solid var(--border-glass)',
      borderRadius: 'var(--radius-full)',
      padding: '8px 16px',
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
          background: 'var(--accent-gold)',
          borderRadius: '2px',
          transition: 'height 0.3s ease'
        }}></div>
        <div style={{
          width: '3px',
          height: isPlaying ? '18px' : '10px',
          background: 'var(--accent-gold)',
          borderRadius: '2px',
          transition: 'height 0.2s ease'
        }}></div>
        <div style={{
          width: '3px',
          height: isPlaying ? '10px' : '4px',
          background: 'var(--accent-gold)',
          borderRadius: '2px',
          transition: 'height 0.3s ease'
        }}></div>
      </div>

      {/* Title */}
      <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600, display: 'none' }} className="music-title">
        {cms.bgMusicTitle || "Kings 99 Music"}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        style={{
          background: 'linear-gradient(135deg, #d4af37, #aa8620)',
          color: '#0b1310',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
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
          {isMuted ? <VolumeX size={16} color="#ef4444" /> : <Volume2 size={16} color="var(--accent-gold)" />}
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
