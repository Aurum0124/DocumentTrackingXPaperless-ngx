import React from 'react';

/**
 * Sidebar Component
 * 
 * Displays the left sidebar navigation with:
 * - Dashboard view option
 * - Documents view option
 * - Smooth animations and hover effects
 */

function Sidebar({ 
  sidebarVisible, 
  currentView, 
  setView 
}) {
  return (
    <div style={{ 
      width: '200px', 
      backgroundColor: '#fff', 
      borderRight: '1px solid #e9ecef',
      padding: '0',
      boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
      transform: sidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'fixed',
      left: 0,
      top: '88px',
      bottom: '40px',
      zIndex: 100,
      height: 'calc(100vh - 128px)',
      overflowY: 'auto',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      <nav style={{ padding: '8px 0' }}>
        <div 
          onClick={() => setView('dashboard')}
          style={{ 
            padding: '12px 16px', 
            backgroundColor: currentView === 'dashboard' ? '#e3f2fd' : 'transparent',
            borderLeft: `3px solid ${currentView === 'dashboard' ? '#2196f3' : 'transparent'}`,
            cursor: 'pointer',
            color: currentView === 'dashboard' ? '#1976d2' : '#495057',
            fontWeight: currentView === 'dashboard' ? '600' : '400',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateX(0)',
            opacity: '1',
            width: '100%',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          onMouseEnter={(e) => {
            if (currentView !== 'dashboard') {
              e.target.style.paddingLeft = '20px';
              e.target.style.backgroundColor = '#f8f9fa';
            }
          }}
          onMouseLeave={(e) => {
            if (currentView !== 'dashboard') {
              e.target.style.paddingLeft = '16px';
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          <span style={{ fontSize: '18px' }}>📊</span>
          Dashboard
        </div>
        <div 
          onClick={() => setView('documents')}
          style={{ 
            padding: '12px 16px', 
            backgroundColor: currentView === 'documents' ? '#e3f2fd' : 'transparent',
            borderLeft: `3px solid ${currentView === 'documents' ? '#2196f3' : 'transparent'}`,
            cursor: 'pointer',
            color: currentView === 'documents' ? '#1976d2' : '#495057',
            fontWeight: currentView === 'documents' ? '600' : '400',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateX(0)',
            opacity: '1',
            width: '100%',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          onMouseEnter={(e) => {
            if (currentView !== 'documents') {
              e.target.style.paddingLeft = '20px';
              e.target.style.backgroundColor = '#f8f9fa';
            }
          }}
          onMouseLeave={(e) => {
            if (currentView !== 'documents') {
              e.target.style.paddingLeft = '16px';
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          <span style={{ fontSize: '18px' }}>📄</span>
          Documents
        </div>
      </nav>
    </div>
  );
}

export default Sidebar; 