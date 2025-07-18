import React from 'react';

/**
 * DashboardView Component
 * 
 * Displays the dashboard overview page with:
 * - Welcome message
 * - Department statistics
 * - Summary cards
 */

function DashboardView({ tagName, files }) {
  return (
    <div style={{ 
      backgroundColor: '#fff', 
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
      <h2 style={{ 
        color: '#495057', 
        marginBottom: '16px',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        Dashboard
      </h2>
      <p style={{ 
        color: '#6c757d', 
        fontSize: '16px',
        marginBottom: '30px'
      }}>
        Welcome to the {tagName} dashboard
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '30px',
        width: '100%'
      }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>📄</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '16px' }}>Total Documents</h3>
          <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>{files.length} documents</p>
        </div>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🏢</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '16px' }}>Department</h3>
          <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>{tagName}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardView; 