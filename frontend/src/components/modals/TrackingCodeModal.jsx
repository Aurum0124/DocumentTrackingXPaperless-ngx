import React from 'react';

/**
 * TrackingCodeModal Component
 * 
 * Handles tracking code input for uploaded documents with:
 * - Document title display
 * - Tracking code input field
 * - Save functionality
 * - Processing status display
 */

function TrackingCodeModal({
  pendingTrackingCodeDoc,
  trackingCode,
  processingStatus,
  onClose,
  onTrackingCodeChange,
  onSave
}) {
  if (!pendingTrackingCodeDoc) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
      background: 'rgba(0,0,0,0.35)', 
      zIndex: 4000, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      animation: 'fadeIn 0.2s'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 14,
        padding: '32px 32px 24px 32px',
        minWidth: 340,
        maxWidth: 400,
        width: '90vw',
        boxShadow: '0 8px 32px rgba(42,81,150,0.18)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', 
            top: 16, 
            right: 16, 
            background: 'none', 
            border: 'none',
            fontSize: 24, 
            color: '#bfc4d1', 
            cursor: 'pointer', 
            lineHeight: 1
          }}
          aria-label="Close"
          disabled={!!processingStatus}
        >×</button>
        
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: 8, 
          color: '#2a5196', 
          fontWeight: 700, 
          fontSize: 22 
        }}>
          Enter Tracking Code
        </h2>
        
        <p style={{ 
          color: '#495057', 
          fontSize: 14, 
          marginBottom: 18 
        }}>
          Enter the tracking code for <b>{pendingTrackingCodeDoc.title}</b>.
        </p>
        
        <input
          type="text"
          value={trackingCode}
          onChange={e => onTrackingCodeChange(e.target.value)}
          placeholder="e.g. TRK-2025-0001"
          style={{ 
            padding: '10px', 
            fontSize: 16, 
            borderRadius: 6, 
            border: '1px solid #e3e7ef', 
            marginBottom: 16 
          }}
          autoFocus
          disabled={!!processingStatus}
        />
        
        <button
          onClick={onSave}
          style={{
            width: '100%', 
            padding: '12px 0', 
            background: '#2a5196', 
            color: '#fff', 
            border: 'none',
            borderRadius: 6, 
            fontWeight: 600, 
            fontSize: 16, 
            cursor: trackingCode && !processingStatus ? 'pointer' : 'not-allowed',
            marginBottom: 8, 
            marginTop: 4, 
            transition: 'background 0.18s'
          }}
          disabled={!trackingCode || !!processingStatus}
        >
          {processingStatus ? (processingStatus) : 'Save Tracking Code'}
        </button>
      </div>
    </div>
  );
}

export default TrackingCodeModal; 