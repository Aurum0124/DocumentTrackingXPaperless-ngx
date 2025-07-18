import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sessionManager } from '../services/session.js';

const HARDCODED_USERS = [
  'pgin-receiving',    // Receiving Office
  'pgin-hr',          // Human Resource Department
  'pgin-oba',         // Office of Barangay Affairs
  'pgin-govoffice',   // Governor's Office
];

function LoginForm() {
  // Form state
  const [username, setUsername] = useState('');     // Username input
  const [password, setPassword] = useState('');     // Password input
  const [error, setError] = useState('');           // Error message display
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Loading state during login
  
  // Navigation hook for programmatic routing
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    if (HARDCODED_USERS.includes(username) && password === 'admin') {
      // Set user session
      sessionManager.setUserSession(username);
      setTimeout(() => {
        setIsLoggingIn(false);
        navigate(`/${username}`);
      }, 800); // simulate network delay for UX
    } else {
      setTimeout(() => {
        setIsLoggingIn(false);
        setError('Invalid username or password');
      }, 800);
    }
  };

  return (
    <>
      {isLoggingIn && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.25)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 10,
            padding: '32px 40px',
            boxShadow: '0 4px 24px rgba(42,81,150,0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div className="spinner" style={{
              width: 48, height: 48, border: '6px solid #e3e7ef', borderTop: '6px solid #2a5196', borderRadius: '50%', marginBottom: 18, animation: 'spin 1s linear infinite'
            }} />
            <div style={{ color: '#2a5196', fontWeight: 600, fontSize: 18 }}>Logging in…</div>
          </div>
        </div>
      )}
      <div className="bg-bar bottom">
        <div className="footer-text">
          Powered by the Information Technology Office<br />
          © Provincial Government of Ilocos Norte
        </div>
      </div>
      <img src="/assets/bp.webp" alt="Decor" className="bg-decor" />
      <div className="container enhanced-ui">
        <img src="/assets/logo.png" alt="Logo" className="logo" style={{ display: 'block', margin: '0 auto 18px auto', maxWidth: 100, height: 'auto' }} />
        <form onSubmit={handleSubmit} className="tracking-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            aria-label="Username"
            style={{ width: '100%', marginBottom: 8 }}
            disabled={isLoggingIn}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-label="Password"
            style={{ width: '100%', marginBottom: 8 }}
            disabled={isLoggingIn}
          />
          <button type="submit" disabled={isLoggingIn}>Login</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
}

export default LoginForm; 