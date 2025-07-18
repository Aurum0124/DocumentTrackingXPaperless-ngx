import React from 'react';

/**
 * FloatingActionButton Component
 * 
 * Displays a floating action button for document upload
 * Only shows on documents view
 */

function FloatingActionButton({
  currentView,
  onClick
}) {
  if (currentView !== 'documents') return null;

  return (
    <button
      onClick={onClick}
      className="upload-fab"
      aria-label="Add Document"
      title="Add Document"
      style={{
        position: 'fixed',
        right: 36,
        bottom: 64,
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'transparent',
        border: 'none',
        boxShadow: '0 4px 16px rgba(42,81,150,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1201,
        cursor: 'pointer',
        transition: 'background 0.2s, box-shadow 0.2s',
        padding: 0
      }}
    >
      <svg width="56" height="56" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="url(#uploadFabGradient)"/>
        <path d="M18 10v16M10 18h16" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
        <defs>
          <linearGradient id="uploadFabGradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f6cff"/>
            <stop offset="1" stopColor="#2a5196"/>
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
}

export default FloatingActionButton; 