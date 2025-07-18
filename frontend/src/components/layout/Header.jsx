import React from 'react';

/**
 * Header Component
 * 
 * Displays the top navigation bar with:
 * - Hamburger menu for sidebar toggle
 * - Logo
 * - Department name
 * - Connection status
 * - Profile menu with logout
 */

function Header({ 
  tagName, 
  apiConnected, 
  profileMenuOpen, 
  profileMenuRef,
  toggleSidebar, 
  toggleProfileMenu, 
  closeProfileMenu, 
  logout 
}) {
  return (
    <div className="bg-bar top" style={{ fontFamily: 'Roboto Condensed, Arial, sans-serif', position: 'relative' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: '20px',
        position: 'relative'
      }}>
        {/* Hamburger */}
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            marginRight: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            transition: 'background 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onFocus={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          onMouseDown={e => { e.preventDefault(); }}
        >
          <div style={{ width: '20px', height: '2px', backgroundColor: '#fff' }}></div>
          <div style={{ width: '20px', height: '2px', backgroundColor: '#fff' }}></div>
          <div style={{ width: '20px', height: '2px', backgroundColor: '#fff' }}></div>
        </button>
        
        {/* Logo */}
        <img 
          src="/assets/logo.png" 
          alt="Logo" 
          style={{
            height: '60px',
            width: 'auto',
            marginRight: '15px'
          }}
        />
        
        {/* Department Name */}
        <div className="footer-text">
          <span style={{
            color: '#fff',
            fontSize: '38px',
            fontWeight: '700',
            marginLeft: '15px',
            lineHeight: '60px',
            textTransform: 'uppercase',
            fontFamily: 'Roboto Condensed, Arial, sans-serif'
          }}>
            {tagName}
          </span>
        </div>
        
        {/* Connection Status */}
        <div style={{ 
          position: 'absolute', 
          right: 280, 
          top: 0, 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {apiConnected ? (
            <span style={{ color: '#90EE90' }}>● Connected</span>
          ) : (
            <span style={{ color: '#FFB6C1' }}>● Disconnected</span>
          )}
        </div>
        
        {/* Profile Icon & Dropdown */}
        <div style={{ position: 'absolute', right: 32, top: 0, height: '100%', display: 'flex', alignItems: 'center' }} ref={profileMenuRef}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', marginRight: '10px' }}>
            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <button
            onClick={toggleProfileMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 500,
              marginLeft: 0,
              fontFamily: 'Roboto Condensed, Arial, sans-serif',
              letterSpacing: '0.5px',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
            onFocus={e => { e.currentTarget.style.background = 'none'; }}
            aria-label="Profile menu"
          >
            {(tagName || '').replace(/^PGIN - /, '')}
          </button>
          {profileMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '60px',
              right: 0,
              background: '#fff',
              color: '#222',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              minWidth: '160px',
              width: 'auto',
              zIndex: 2000,
              fontFamily: 'Roboto Condensed, Arial, sans-serif',
              padding: '8px 0',
              border: '1px solid #e3e7ef',
              transition: 'opacity 0.18s, transform 0.18s',
              opacity: profileMenuOpen ? 1 : 0,
              transform: profileMenuOpen ? 'translateY(0)' : 'translateY(-8px)'
            }}>
              {/* Option: Logout */}
              <button
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: '#222',
                  fontSize: '16px',
                  padding: '12px 24px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'Roboto Condensed, Arial, sans-serif',
                  transition: 'background 0.18s',
                  borderRadius: 0
                }}
                onClick={() => {
                  closeProfileMenu();
                  logout();
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f5f7fa'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
              >
                Logout
              </button>
              <div style={{
                height: '1px',
                background: '#e3e7ef',
                margin: '4px 0 0 0',
                width: '100%',
                display: 'none'
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header; 