import React from 'react';
import { StatusBadge } from '../index.js';
import { USER_TAG_ID_MAP } from '../../../constants/index.js';

/**
 * DocumentRow Component
 * 
 * Renders a single document row for list and oneline views
 * Extracted from DocumentList.jsx to improve maintainability
 */

function DocumentRow({
  document: f,
  index: i,
  viewType,
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
  // One-line view (Paperless-ngx style)
  if (viewType === 'oneline') {
    return (
      <div key={i} style={{
        display: 'flex',
        alignItems: 'center',
        background: hoveredCard === i ? '#e3e7ef' : '#f6f8fa',
        border: '1px solid #e3e7ef',
        borderLeft: '4px solid #2a5196',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        height: '180px',
        padding: '16px 20px',
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: 0,
        position: 'relative',
        transition: 'background-color 0.18s',
      }}
      onMouseEnter={() => onHoverCard(i)}
      onMouseLeave={() => onHoverCard(null)}
      >
        {/* Thumbnail */}
        <div style={{
          width: '120px',
          height: '100%',
          marginRight: '16px',
          borderRadius: '6px',
          overflow: 'hidden',
          background: '#e9ecef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'absolute',
          left: '20px',
          top: '0',
          bottom: '0',
          position: 'relative',
        }}>
          {/* Status Badge */}
          <div style={{
            position: 'absolute',
            top: 4,
            right: 8,
            zIndex: 3,
          }}>
            <StatusBadge status={f.status} />
          </div>
          {imgLoading[f.id] && !imgErrors[f.id] && (
            <div className="spinner" style={{
              width: '32px',
              height: '32px',
              border: '4px solid #e3e7ef',
              borderTop: '4px solid #2a5196',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          )}
          {!imgErrors[f.id] && (
            <img
              src={`/api/documents/${f.id}/thumb/`}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: imgLoading[f.id] ? 'none' : 'block',
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
              color: '#bfc4d1',
              fontSize: '28px',
            }}>{getFileTypeIcon(f.title || f.filename || '')}</div>
          )}
        </div>

        {/* Document Info */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          minWidth: 0, // Allows text to truncate
          marginLeft: '15px', // Very close to thumbnail
          marginBottom: '16px',
        }}>
          <div style={{ 
            fontWeight: 600, 
            color: '#2a5196', 
            fontSize: 15, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            marginBottom: '2px',
          }}>
            {f.title}
          </div>
          <div style={{ 
            color: '#495057', 
            fontSize: 13, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
          }}>
            Tracking Code: <span style={{ color: '#646cff', fontWeight: 500 }}>{f.trackingCode}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ 
          display: 'flex', 
          gap: 8, 
          alignItems: 'center',
          flexShrink: 0,
          position: 'absolute',
          bottom: '16px',
          left: '160px',
          zIndex: 4,
        }}>
          {/* Status Change (Governor's Office only) */}
          {department === 'pgin-govoffice' && (
            <select
              style={{
                padding: '6px 8px',
                fontSize: '12px',
                backgroundColor: '#fff',
                color: '#495057',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                minWidth: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              value={f.status}
              onChange={(e) => onStatusChange(f.id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          )}
          
          <select
            style={{
              padding: '6px 8px',
              fontSize: '12px',
              backgroundColor: '#fff',
              color: '#495057',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              minWidth: '120px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            value={selectedDepartments[f.id] || ''}
            onChange={(e) => onSelectDepartment(f.id, e.target.value ? parseInt(e.target.value) : null)}
            disabled={forwarding[f.id]}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="">Select department...</option>
            {Object.entries(USER_TAG_ID_MAP).map(([key, tag]) => (
              <option key={key} value={tag.id} disabled={tag.id === USER_TAG_ID_MAP[department].id}>
                {tag.name}
              </option>
            ))}
          </select>

          <button
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.18s',
              fontWeight: '500',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDocument(f);
            }}
          >
            View
          </button>
          
          <button
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              backgroundColor: selectedDepartments[f.id] && !forwarding[f.id] ? '#2a5196' : '#bfc4d1',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: selectedDepartments[f.id] && !forwarding[f.id] ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.18s',
              fontWeight: '500',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onForward(f.id);
            }}
            disabled={!selectedDepartments[f.id] || forwarding[f.id]}
          >
            {forwarding[f.id] ? 'Forwarding...' : 'Forward'}
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div key={i} style={{
      display: 'flex',
      alignItems: 'center',
      background: hoveredCard === i ? '#e3e7ef' : '#f6f8fa',
      border: '1px solid #e3e7ef',
      borderLeft: '4px solid #2a5196',
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      minHeight: '64px',
      padding: '10px 18px',
      cursor: 'pointer',
      width: '100%',
      boxSizing: 'border-box',
      marginBottom: 0,
      position: 'relative',
    }}
    onMouseEnter={() => onHoverCard(i)}
    onMouseLeave={() => onHoverCard(null)}
    >
      <div style={{ flex: 2, fontWeight: 700, color: '#2a5196', fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title}</div>
      <div style={{ flex: 1, color: '#495057', fontSize: 14, marginLeft: 18, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Tracking Code: <span style={{ color: '#646cff', fontWeight: 600 }}>{f.trackingCode}</span></div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginLeft: 18 }}>
        <StatusBadge status={f.status} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
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
          }}
          onClick={() => onViewDocument(f)}
        >
          View
        </button>
        <select
          style={{
            padding: '7px 10px',
            fontSize: '13px',
            backgroundColor: '#fff',
            color: '#495057',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            minWidth: '120px',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          value={selectedDepartments[f.id] || ''}
          onChange={(e) => onSelectDepartment(f.id, e.target.value ? parseInt(e.target.value) : null)}
          disabled={forwarding[f.id]}
        >
          <option value="">Select department...</option>
          {Object.entries(USER_TAG_ID_MAP).map(([key, tag]) => (
            <option key={key} value={tag.id} disabled={tag.id === USER_TAG_ID_MAP[department].id}>
              {tag.name}
            </option>
          ))}
        </select>
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

export default DocumentRow; 