// API utility functions for Paperless-ngx and backend
import { API_CONFIG } from '../config.js';

export async function apiCall(url, options = {}) {
  const fullUrl = url.startsWith('http') ? url : API_CONFIG.BASE_URL + url;
  const headers = options.headers || {};
  let mergedHeaders = { ...API_CONFIG.HEADERS, ...headers };

  // If uploading FormData, remove Content-Type so browser sets it
  if (options.body instanceof FormData) {
    const { ['Content-Type']: _, ...headersWithoutContentType } = mergedHeaders;
    mergedHeaders = headersWithoutContentType;
  }

  const fetchOptions = {
    ...options,
    headers: mergedHeaders,
    credentials: 'include',
  };
  
  console.log('API Call:', fullUrl, fetchOptions.method || 'GET');
  console.log('API Headers:', mergedHeaders);
  if (options.body instanceof FormData) {
    console.log('API Body: FormData with entries:', Array.from(options.body.entries()));
  } else if (options.body) {
    console.log('API Body:', options.body);
  }
  
  const response = await fetch(fullUrl, fetchOptions);
  console.log('API Response status:', response.status, response.statusText);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', response.status, response.statusText, errorText);
    
    // Provide more specific error messages
    if (response.status === 401) {
      throw new Error('Authentication failed. Please check your API token.');
    } else if (response.status === 403) {
      throw new Error('Access denied. You may not have permission for this operation.');
    } else if (response.status === 404) {
      throw new Error('API endpoint not found. Please check the URL.');
    } else if (response.status === 405) {
      throw new Error('Method not allowed. This endpoint does not support this operation.');
    } else if (response.status === 400) {
      throw new Error(`Bad request: ${errorText}`);
    } else {
    throw new Error(errorText || response.statusText);
    }
  }
  
  // Try to parse JSON, fallback to text
  try {
    const result = await response.json();
    console.log('API Response parsed successfully:', result);
    return result;
  } catch (parseError) {
    const textResult = await response.text();
    console.log('API Response as text:', textResult);
    return textResult;
  }
}

export async function testApiConnection() {
  try {
    await apiCall('/api/documents/');
    return true;
  } catch {
    return false;
  }
} 