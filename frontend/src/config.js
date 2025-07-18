/**
 * Document Tracking X PaperlessNGX - Configuration Module
 * 
 * This module contains all configuration settings for the application.
 * 
 * Flow:
 * 1. API Configuration - Settings for connecting to Paperless-ngx
 * 2. Session Storage Keys - Keys for session and preference storage
 */

// ============================================================================
// API CONFIGURATION
// ============================================================================

/**
 * API Configuration object
 * Contains settings for connecting to the Paperless-ngx backend
 */
export const API_CONFIG = {
  BASE_URL: '', // Use relative URLs so Vite proxy is used
  API_KEY: '8e676e14cba55ed1c3c7389dd4f6659cfc37e2ff', // API token for authentication
  HEADERS: {
    'Content-Type': 'application/json',
    'Authorization': 'Token 8e676e14cba55ed1c3c7389dd4f6659cfc37e2ff', // Bearer token
    'Accept': 'application/json',
  }
};

// ============================================================================
// SESSION STORAGE KEYS
// ============================================================================

/**
 * Session storage keys for consistent data storage
 * These keys are used to store and retrieve session data
 */
export const SESSION_KEYS = {
  USER_DEPARTMENT: 'user_department',    // Current user's department
  USER_LOGGED_IN: 'user_logged_in',      // Login status flag
  LAST_ACTIVITY: 'last_activity',        // Timestamp of last user activity
  DOCUMENT_FILTERS: 'document_filters',  // User's document filter preferences
  VIEW_PREFERENCES: 'view_preferences'   // UI view preferences (grid/list)
}; 