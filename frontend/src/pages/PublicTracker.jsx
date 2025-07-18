import { useState, useEffect, useRef } from 'react';
import { apiCall, testApiConnection } from '../services/api.js';
import StatusBadge from '../components/ui/StatusBadge.jsx';

function PublicTracker() {
  // Document tracking state
  const [trackingCode, setTrackingCode] = useState('');        // User input tracking code
  const [result, setResult] = useState(null);                  // Search results
  const [loading, setLoading] = useState(false);               // Search loading state
  const [error, setError] = useState(null);                    // Error messages
  // API and connection state
  const [tagMap, setTagMap] = useState({});                    // Department tag mapping
  const [apiConnected, setApiConnected] = useState(false);     // Backend connection status
  const [connectionChecking, setConnectionChecking] = useState(true); // Connection check state
  // UI references
  const logoRef = useRef(null);                                // Logo element reference

  // Test API connection and fetch all tags on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionChecking(true);
        const connected = await testApiConnection();
        setApiConnected(connected);
        if (connected) {
          const data = await apiCall('/api/tags/');
          if (Array.isArray(data.results)) {
            const map = {};
            data.results.forEach(tag => { map[tag.id] = tag.name; });
            setTagMap(map);
          }
        }
      } catch (err) {
        console.error('Error checking connection:', err);
        setApiConnected(false);
      } finally {
        setConnectionChecking(false);
      }
    };
    checkConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Build the Paperless-ngx API URL
      const url = `/api/documents/?custom_field_query=${encodeURIComponent(JSON.stringify(["Tracking Code", "exact", trackingCode]))}`;
      const data = await apiCall(url);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Regex for TRK-2025-0000 format
  const trackingCodePattern = /^TRK-\d{4}-\d{4}$/;

  return (
    <>
      <div className="bg-bar bottom">
        <div className="footer-text">
          Powered by the Information Technology Office<br />
          © Provincial Government of Ilocos Norte
        </div>
      </div>
      <img src="/assets/bp.webp" alt="Decor" className="bg-decor" />
      {/* Logo at the middle of the form */}
      <div className="container enhanced-ui">
        <img
          ref={logoRef}
          src="/assets/logo.png"
          alt="Logo"
          className="logo"
          style={{ display: 'block', margin: '0 auto 18px auto', maxWidth: 100, height: 'auto', cursor: 'pointer', transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)', willChange: 'transform' }}
          onClick={e => {
            if (logoRef.current) {
              logoRef.current.style.transition = 'transform 0.25s cubic-bezier(.4,2,.6,1)';
              logoRef.current.style.transform = 'scale(1.12) rotate(-8deg)';
              setTimeout(() => {
                if (logoRef.current) {
                  logoRef.current.style.transform = 'scale(1) rotate(0deg)';
                  setTimeout(() => {
                    if (logoRef.current) {
                      logoRef.current.style.transition = 'none';
                      logoRef.current.style.transform = 'none';
                      void logoRef.current.offsetWidth;
                      logoRef.current.style.transition = 'transform 0.25s cubic-bezier(.4,2,.6,1)';
                    }
                  }, 50);
                }
              }, 220);
            }
            setTrackingCode('');
            setResult(null);
            setError(null);
          }}
        />
        {/* Connection Status Indicator */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '1rem',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {connectionChecking ? (
            <span style={{ color: '#666' }}>🔍 Checking connection...</span>
          ) : apiConnected ? (
            <span style={{ color: '#28a745' }}>✅ Connected to backend</span>
          ) : (
            <span style={{ color: '#dc3545' }}>❌ Backend connection failed</span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="tracking-form">
          <div style={{ position: 'relative', width: '100%', maxWidth: 260, margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Enter tracking code"
              value={trackingCode}
              onChange={e => setTrackingCode(e.target.value)}
              required
              aria-label="Tracking code"
              style={{ width: '100%', boxSizing: 'border-box', paddingRight: 28 }}
            />
            <span
              className="tracking-tooltip-icon"
              tabIndex={0}
              aria-label="What is a tracking code?"
              style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#2a5196',
                fontSize: 13,
                fontWeight: 700,
                userSelect: 'none',
                zIndex: 2,
                background: '#fff',
                borderRadius: '50%',
                width: 18,
                height: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px rgba(42,81,150,0.08)'
              }}
              onMouseEnter={e => {
                const tip = e.currentTarget.nextSibling;
                if (tip) tip.style.display = 'block';
              }}
              onMouseLeave={e => {
                const tip = e.currentTarget.nextSibling;
                if (tip) tip.style.display = 'none';
              }}
              onFocus={e => {
                const tip = e.currentTarget.nextSibling;
                if (tip) tip.style.display = 'block';
              }}
              onBlur={e => {
                const tip = e.currentTarget.nextSibling;
                if (tip) tip.style.display = 'none';
              }}
            >
              ?
            </span>
            <span
              style={{
                display: 'none',
                position: 'absolute',
                right: 28,
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#fff',
                color: '#2a5196',
                border: '1px solid #bfc4d1',
                borderRadius: 4,
                padding: '0.2em 0.7em',
                fontSize: 11,
                fontWeight: 500,
                boxShadow: '0 2px 8px rgba(42,81,150,0.10)',
                whiteSpace: 'pre-line',
                zIndex: 10,
                minWidth: 120,
                maxWidth: 180
              }}
            >
              A tracking code is a unique identifier for your document.
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? (<span>Tracking<span className="tracking-dots"></span></span>) : 'Track Document'}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
        {result && Array.isArray(result.results) && result.results.length === 0 && (
          <div className="result" style={{ marginTop: '2.5rem', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>No documents found.</div>
        )}
        {result && Array.isArray(result.results) && result.results.length > 0 && (
          <div className="result-list">
            {result.results.map((doc) => {
              // Determine last updated date
              const raw = doc.modified || doc.updated || doc.last_modified;
              let lastUpdated = null;
              if (raw) {
                const date = new Date(raw);
                lastUpdated = date.toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                });
              }
              // Extract status from custom fields
              const statusField = doc.custom_fields?.find(field => field.field === 3);
              const status = statusField?.value || 'Under Review';
              return (
                <div key={doc.id} className="result-item" style={{ background: '#f8fafd', border: '1px solid #e3e7ef', borderRadius: 6, padding: '1rem 1.2rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                  {/* Status Badge */}
                  <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#495057' }}>Status:</span>
                    <StatusBadge status={status} />
                  </div>
                  {lastUpdated && (
                    <>
                      <span className="result-label-last-updated">Last Updated:</span>
                      <span> {lastUpdated}</span>
                      <br />
                    </>
                  )}
                  {doc.tags && doc.tags.length > 0 && (
                    <>
                      <span className="result-label">Current Location:</span>
                      <span> {doc.tags.map(tagId => (tagMap[tagId] ? tagMap[tagId] : '')).filter(Boolean).join(', ')}</span>
                    </>
                  )}
                  {(!doc.tags || doc.tags.length === 0) && (
                    <>
                      <span className="result-label">Current Location:</span>
                      <span> <em>No tag assigned</em></span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default PublicTracker; 