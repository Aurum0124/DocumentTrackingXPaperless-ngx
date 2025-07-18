// Session management utility for user authentication

const SESSION_KEY = 'pgin_session';
const ACTIVITY_KEY = 'pgin_last_activity';

export const sessionManager = {
  setUserSession(username) {
    localStorage.setItem(SESSION_KEY, username);
    localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
  },
  getUserSession() {
    return localStorage.getItem(SESSION_KEY);
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(ACTIVITY_KEY);
  },
  isSessionValid() {
    const user = localStorage.getItem(SESSION_KEY);
    const lastActivity = parseInt(localStorage.getItem(ACTIVITY_KEY), 10);
    if (!user || isNaN(lastActivity)) return false;
    // Session expires after 8 hours of inactivity
    const now = Date.now();
    return now - lastActivity < 8 * 60 * 60 * 1000;
  },
  updateActivity() {
    localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
  },
}; 