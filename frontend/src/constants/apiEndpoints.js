/**
 * API Endpoint Constants
 * 
 * This file contains all API endpoint URLs used throughout the application.
 */

// Base API endpoints
export const API_ENDPOINTS = {
  // Document endpoints
  DOCUMENTS: '/api/documents/',
  DOCUMENT_DETAIL: (id) => `/api/documents/${id}/`,
  DOCUMENT_THUMBNAIL: (id) => `/api/documents/${id}/thumb/`,
  POST_DOCUMENT: '/api/documents/post_document/',
  UPLOAD_DOCUMENT: '/api/documents/', // Alternative upload endpoint
  
  // Task endpoints
  TASKS: '/api/tasks/',
  
  // Authentication endpoints (if needed in the future)
  LOGIN: '/api/auth/login/',
  LOGOUT: '/api/auth/logout/',
  USER_PROFILE: '/api/auth/user/',
};

// API request methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// API response status codes
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Polling intervals (in milliseconds)
export const POLLING_INTERVALS = {
  TASK_POLLING: 2000,      // 2 seconds for task status
  DOCUMENT_POLLING: 2000,  // 2 seconds for document processing
  CONNECTION_CHECK: 5000,  // 5 seconds for connection status
};

// API timeout settings (in milliseconds)
export const API_TIMEOUTS = {
  DEFAULT: 30000,          // 30 seconds
  UPLOAD: 60000,           // 60 seconds for file uploads
  POLLING: 10000,          // 10 seconds for polling requests
}; 