import React from 'react';
import { useDocumentHistory } from '../../hooks/index.js';

/**
 * DocumentViewerModal Component
 * 
 * Displays a document in an iframe viewer with:
 * - Document title
 * - Full document preview
 * - Document history in side panel
 * - Close functionality
 */

function DocumentViewerModal({
  viewingDocument,
  onClose
}) {
  const {
    history,
    loading: loadingHistory,
    error: historyError,
    formatTimestamp,
    getActionText
  } = useDocumentHistory(viewingDocument?.id);

  if (!viewingDocument) return null;

  return (
    <div 
      style={{
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
      onClick={onClose}
    >
      <div 
        style={{
          background: '#fff',
          borderRadius: 14,
          minWidth: 800,
          maxWidth: '95vw',
          width: '95vw',
          height: '90vh',
          boxShadow: '0 8px 32px rgba(42,81,150,0.18)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Side Panel - 1/4 width */}
        <div style={{
          width: '25%',
          background: '#f8f9fa',
          borderRight: '1px solid #e9ecef',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Side panel header */}
          <div style={{
            marginBottom: '20px',
            borderBottom: '1px solid #e9ecef',
            paddingBottom: '16px'
          }}>
            <h3 style={{
              margin: 0,
              color: '#2a5196',
              fontWeight: 600,
              fontSize: '18px'
            }}>
              Document Timeline
            </h3>
            <p style={{
              margin: '4px 0 0 0',
              color: '#6c757d',
              fontSize: '14px'
            }}>
              {viewingDocument.title}
            </p>
          </div>

          {/* History content */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            paddingRight: '8px'
          }}>
            {loadingHistory ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100px',
                color: '#6c757d'
              }}>
                Loading history...
              </div>
            ) : historyError ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100px',
                color: '#dc3545',
                textAlign: 'center',
                fontSize: '14px'
              }}>
                {historyError}
              </div>
            ) : history.length === 0 ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100px',
                color: '#6c757d',
                textAlign: 'center',
                fontSize: '14px'
              }}>
                No history available
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {history.map((entry, index) => (
                  <div key={entry.id} style={{
                    position: 'relative',
                    paddingLeft: '20px'
                  }}>
                    {/* Timeline line */}
                    {index < history.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: '6px',
                        top: '24px',
                        bottom: '-16px',
                        width: '2px',
                        background: '#e9ecef'
                      }} />
                    )}
                    
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#2a5196',
                      border: '2px solid #fff',
                      boxShadow: '0 0 0 2px #e9ecef'
                    }} />
                    
                    {/* History entry content */}
                    <div style={{
                      background: '#fff',
                      borderRadius: '8px',
                      padding: '12px',
                      border: '1px solid #e9ecef',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#2a5196',
                        marginBottom: '4px'
                      }}>
                        {getActionText(entry.action, entry.changes)}
                      </div>
                      
                      <div style={{
                        fontSize: '12px',
                        color: '#6c757d',
                        marginBottom: '6px'
                      }}>
                        {formatTimestamp(entry.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content - 3/4 width */}
        <div style={{
          width: '75%',
          padding: '32px 32px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}>
          <h2 style={{ 
            marginTop: 0, 
            marginBottom: 16, 
            color: '#2a5196', 
            fontWeight: 700, 
            fontSize: 22 
          }}>
            {viewingDocument.title}
          </h2>
          
          <iframe
            src={`/api/documents/${viewingDocument.id}/preview/`}
            title="Document Viewer"
            style={{ 
              width: '100%', 
              height: '70vh', 
              border: 'none', 
              marginBottom: 16, 
              borderRadius: 8 
            }}
          />
          
          <button 
            onClick={onClose}
            style={{
              padding: '12px 24px',
              background: '#2a5196',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.18s'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentViewerModal; 