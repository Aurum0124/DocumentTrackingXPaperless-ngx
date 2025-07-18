import React from 'react';

/**
 * UploadModal Component
 * 
 * Handles document upload functionality with:
 * - File selection
 * - Upload progress
 * - Processing status
 * - Error handling and retry
 */

function UploadModal({
  showAddModal,
  uploading,
  uploadProgress,
  isProcessing,
  processingStatus,
  uploadFile,
  uploadError,
  canRetry,
  onClose,
  onFileSelect,
  onUpload,
  onRetry,
  onRemoveFile
}) {
  if (!showAddModal) return null;

  return (
    <div style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
      background: 'rgba(0,0,0,0.35)', 
      zIndex: 3000, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      animation: 'fadeIn 0.2s'
    }} 
    onClick={() => {
      if (!uploading && !isProcessing) {
        onClose();
      }
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
      }} 
      onClick={e => e.stopPropagation()}>
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
          disabled={uploading || isProcessing}
        >×</button>
        
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: 8, 
          color: '#2a5196', 
          fontWeight: 700, 
          fontSize: 22 
        }}>
          Upload Document
        </h2>
        
        <p style={{ 
          color: '#495057', 
          fontSize: 14, 
          marginBottom: 8 
        }}>
          Select a file to upload. The document will be tagged to your department.
        </p>
        
        <div style={{ 
          color: '#6c757d', 
          fontSize: 13, 
          marginBottom: 18 
        }}>
          Accepted file types: <b>PDF, DOCX, JPG, PNG</b>. Max size: <b>10MB</b>.
        </div>

        {isProcessing ? (
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <div className="spinner" style={{
              width: 48, 
              height: 48, 
              border: '6px solid #e3e7ef', 
              borderTop: '6px solid #2a5196', 
              borderRadius: '50%', 
              margin: '0 auto', 
              animation: 'spin 1s linear infinite'
            }} />
            <div style={{ 
              marginTop: 18, 
              color: '#2a5196', 
              fontWeight: 600, 
              fontSize: 16 
            }}>
              {processingStatus || 'Processing...'}
            </div>
            <div style={{ 
              marginTop: 8, 
              color: '#495057', 
              fontSize: 13 
            }}>
              Your document is being processed. This may take a few seconds.
            </div>
          </div>
        ) : (
          <form onSubmit={onUpload}>
            <label style={{
              display: 'block', 
              marginBottom: 16, 
              background: '#f6f8fa', 
              border: '1px solid #e3e7ef',
              borderRadius: 6, 
              padding: '18px 12px', 
              cursor: uploading ? 'not-allowed' : 'pointer', 
              textAlign: 'center', 
              color: '#2a5196', 
              fontWeight: 500,
              transition: 'border 0.18s',
              outline: uploadFile ? '2px solid #2a5196' : 'none',
              opacity: uploading ? 0.7 : 1,
              position: 'relative'
            }}>
              <input
                type="file"
                required
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={e => onFileSelect(e.target.files[0])}
                style={{ display: 'none' }}
                disabled={uploading}
              />
              {uploadFile ? (
                <>
                  <span style={{ 
                    color: '#2a5196', 
                    fontWeight: 600 
                  }}>
                    {uploadFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={e => { 
                      e.stopPropagation(); 
                      onRemoveFile(); 
                    }}
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 8,
                      background: 'none',
                      border: 'none',
                      color: '#bfc4d1',
                      fontSize: 18,
                      cursor: 'pointer',
                      padding: 0,
                      lineHeight: 1,
                      zIndex: 2
                    }}
                    aria-label="Remove file"
                    tabIndex={0}
                  >×</button>
                </>
              ) : (
                <span style={{ color: '#bfc4d1' }}>Click to select file</span>
              )}
            </label>

            {uploading && (
              <div style={{ marginBottom: 12 }}>
                <div style={{
                  width: '100%', 
                  height: 8, 
                  background: '#e3e7ef', 
                  borderRadius: 4, 
                  overflow: 'hidden', 
                  marginBottom: 4
                }}>
                  <div style={{
                    width: '100%', 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#2a5196 60%,#bfc4d1 100%)',
                    transition: 'width 0.3s'
                  }} />
                </div>
                <span style={{ 
                  color: '#2a5196', 
                  fontSize: 13 
                }}>
                  Uploading...
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={!uploadFile || uploading}
              style={{
                width: '100%', 
                padding: '12px 0', 
                background: '#2a5196', 
                color: '#fff', 
                border: 'none',
                borderRadius: 6, 
                fontWeight: 600, 
                fontSize: 16, 
                cursor: (!uploadFile || uploading) ? 'not-allowed' : 'pointer',
                marginBottom: 8, 
                marginTop: 4, 
                transition: 'background 0.18s'
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {uploadError && (
              <div style={{ 
                marginTop: 12, 
                color: '#dc3545', 
                fontWeight: 500, 
                fontSize: 14 
              }}>
                {uploadError}
                {canRetry && (
                  <button
                    onClick={onRetry}
                    style={{
                      marginTop: 8,
                      padding: '8px 16px',
                      background: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      fontWeight: 500,
                      fontSize: 14,
                      cursor: 'pointer',
                      transition: 'background 0.18s'
                    }}
                  >
                    Retry Upload
                  </button>
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default UploadModal; 