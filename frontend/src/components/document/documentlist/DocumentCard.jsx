import React from 'react';
import { StatusBadge } from '../index.js';
import { USER_TAG_ID_MAP } from '../../../constants/index.js';

/**
 * DocumentCard Component
 * 
 * Renders a single document card for grid view
 * Extracted from DocumentList.jsx to improve maintainability
 */

function DocumentCard({
  document: f,
  index: i,
  hoveredCard,
  selectedDepartments,
  forwarding,
  imgLoading,
  imgErrors,
  department,
  onHoverCard,
  onSelectDepartment,
  onForward,
  onStatusChange,
  onViewDocument,
  onImageLoad,
  onImageError,
  onImageLoadStart,
  getFileTypeIcon
}) {
  return (
    <div
      key={i}
      style={{
        backgroundColor: hoveredCard === i ? '#e3e7ef' : '#f6f8fa',
        border: '1px solid #e3e7ef',
        borderLeft: '4px solid #2a5196',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        minHeight: '340px',
        padding: '14px 14px 22px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '0',
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={() => onHoverCard(i)}
      onMouseLeave={() => onHoverCard(null)}
    >
      {/* Thumbnail with overlapping title/tracking code */}
      <div style={{
        width: '100%',
        height: '220px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '18px',
        background: '#e9ecef',
        borderRadius: '6px',
        overflow: 'hidden',
      }}>
        {/* Overlapping title/tracking code */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          background: 'rgba(42,81,150,0.92)',
          color: '#fff',
          padding: '6px 10px 2px 10px',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
          zIndex: 2,
          fontWeight: 700,
          fontSize: '15px',
          letterSpacing: '0.01em',
          lineHeight: 1.2,
          fontFamily: 'Roboto Condensed, Arial, sans-serif',
          boxShadow: '0 2px 8px rgba(42,81,150,0.08)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          <span style={{
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}>{f.title}</span>
          <div style={{
            fontWeight: 400,
            fontSize: '12px',
            color: '#e0e6f7',
            marginTop: '2px',
            letterSpacing: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}>
            Tracking Code: {f.trackingCode}
          </div>
        </div>
        {/* Status Badge */}
        <div style={{
          position: 'absolute',
          top: 4,
          right: 8,
          zIndex: 3,
        }}>
          <StatusBadge status={f.status} />
        </div>
        {/* Thumbnail image/fallback/spinner */}
        {imgLoading[f.id] && !imgErrors[f.id] && (
          <div style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div className="spinner" style={{
              width: '32px',
              height: '32px',
              border: '4px solid #e3e7ef',
              borderTop: '4px solid #2a5196',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        )}
        {!imgErrors[f.id] && (
          <img
            src={`/api/documents/${f.id}/thumb/`}
            alt="Preview"
            style={{
              width: '98%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '4px',
              background: '#fff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: imgLoading[f.id] ? 'none' : 'block',
              zIndex: 1
            }}
            onLoad={() => onImageLoad(f.id, false)}
            onError={() => {
              onImageError(f.id, true);
              onImageLoad(f.id, false);
            }}
            onLoadStart={() => onImageLoadStart(f.id, true)}
          />
        )}
        {imgErrors[f.id] && (
          <div style={{
            width: '40px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#bfc4d1',
            fontSize: '32px',
            zIndex: 1
          }}>{getFileTypeIcon(f.title || f.filename || '')}</div>
        )}
      </div>
      {/* Card content below thumbnail */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'stretch',
        marginTop: 'auto'
      }}>
        {/* Status Change (Governor's Office only) */}
        {department === 'pgin-govoffice' && (
          <select
            style={{
              padding: '7px 10px',
              fontSize: '13px',
              backgroundColor: '#fff',
              color: '#495057',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              minWidth: '160px',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            value={f.status}
            onChange={(e) => onStatusChange(f.id, e.target.value)}
          >
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        )}
        <select
          style={{
            padding: '7px 10px',
            fontSize: '13px',
            backgroundColor: '#fff',
            color: '#495057',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            minWidth: '160px',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          value={selectedDepartments[f.id] || ''}
          onChange={(e) => onSelectDepartment(f.id, e.target.value ? parseInt(e.target.value) : null)}
          disabled={forwarding[f.id]}
        >
          <option value="">Select department to forward...</option>
          {Object.entries(USER_TAG_ID_MAP).map(([key, tag]) => (
            <option key={key} value={tag.id} disabled={tag.id === USER_TAG_ID_MAP[department].id} style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%'
            }}>
              {tag.name}
            </option>
          ))}
        </select>
        <button
          style={{
            padding: '7px 14px',
            fontSize: '13px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.18s',
            fontWeight: '500',
            width: '100%'
          }}
          onClick={() => onViewDocument(f)}
        >
          View
        </button>
        <button
          style={{
            padding: '7px 14px',
            fontSize: '13px',
            backgroundColor: selectedDepartments[f.id] && !forwarding[f.id] ? '#2a5196' : '#bfc4d1',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedDepartments[f.id] && !forwarding[f.id] ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.18s',
            fontWeight: '500',
            width: '100%'
          }}
          onClick={() => onForward(f.id)}
          disabled={!selectedDepartments[f.id] || forwarding[f.id]}
        >
          {forwarding[f.id] ? 'Forwarding...' : 'Forward'}
        </button>
      </div>
    </div>
  );
}

export default DocumentCard; 