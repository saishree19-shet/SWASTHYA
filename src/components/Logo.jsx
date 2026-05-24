import React from 'react';

export default function Logo({ size = 32, color = 'var(--primary, #5A4FCF)', showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Heart Shape */}
        <path d="M50 90 C15 65 5 40 5 25 C5 10 25 0 40 15 C45 20 50 28 50 28 C50 28 55 20 60 15 C75 0 95 10 95 25 C95 40 85 65 50 90 Z" fill={color} />
        
        {/* Negative Space Figure Reaching Up */}
        {/* Head */}
        <circle cx="50" cy="32" r="9" fill="white" />
        {/* Arms and Body */}
        <path d="M50 48 C42 48 32 30 25 20 C22 16 18 20 22 25 C30 40 40 55 43 65 L43 90 L57 90 L57 65 C60 55 70 40 78 25 C82 20 78 16 75 20 C68 30 58 48 50 48 Z" fill="white" />
      </svg>
      
      {showText && (
        <span style={{ 
          color: color, 
          fontWeight: '800', 
          fontSize: size * 0.7, 
          letterSpacing: '-0.5px',
          fontFamily: "'Inter', sans-serif"
        }}>
          Swasthya
        </span>
      )}
    </div>
  );
}
