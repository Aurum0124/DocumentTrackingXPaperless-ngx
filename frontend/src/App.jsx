/**
 * Document Tracking X PaperlessNGX - Main Application Component
 * 
 * This is the root component that handles routing for the application.
 * It provides two main interfaces:
 * 1. Public Document Tracker (default route) - for citizens
 * 2. Department Dashboards (protected routes) - for government staff
 * 
 * Application Flow:
 * 1. Router setup with public and protected routes
 * 2. Public tracker allows document search by tracking code
 * 3. Protected routes require authentication
 * 4. Session management for department access
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import LoginForm from './pages/LoginForm.jsx'
import DepartmentDashboard from './pages/DepartmentDashboard.jsx'
import PublicTracker from './pages/PublicTracker.jsx'

/**
 * Main App Component
 * 
 * This is the root component that handles routing and the public document tracker.
 * It provides two main interfaces:
 * 1. Public Document Tracker (default route) - for citizens
 * 2. Department Dashboards (protected routes) - for government staff
 * 
 * Application Flow:
 * 1. Router setup with public and protected routes
 * 2. Public tracker allows document search by tracking code
 * 3. Protected routes require authentication
 * 4. Session management for department access
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/pgin-receiving" element={<DepartmentDashboard department="pgin-receiving" />} />
        <Route path="/pgin-hr" element={<DepartmentDashboard department="pgin-hr" />} />
        <Route path="/pgin-oba" element={<DepartmentDashboard department="pgin-oba" />} />
        <Route path="/pgin-govoffice" element={<DepartmentDashboard department="pgin-govoffice" />} />
        <Route path="/*" element={<PublicTracker />} />
      </Routes>
    </Router>
  );
}

export default App
