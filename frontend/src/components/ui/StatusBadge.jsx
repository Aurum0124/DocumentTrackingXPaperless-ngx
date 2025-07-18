import React from 'react';

function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Approved':
        return { color: '#28a745', bg: '#d4edda', border: '#c3e6cb' };
      case 'Rejected':
        return { color: '#dc3545', bg: '#f8d7da', border: '#f5c6cb' };
      case 'Under Review':
      default:
        return { color: '#ffc107', bg: '#fff3cd', border: '#ffeaa7' };
    }
  };
  const config = getStatusConfig(status);
  return (
    <span style={{
      padding: '1px 4px',
      borderRadius: '6px',
      fontSize: '9px',
      fontWeight: '600',
      color: config.color,
      backgroundColor: config.bg,
      border: `1px solid ${config.border}`,
      textTransform: 'uppercase',
      letterSpacing: '0.2px',
    }}>
      {status}
    </span>
  );
}

export default StatusBadge; 