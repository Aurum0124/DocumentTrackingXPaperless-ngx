/**
 * useDocumentHistory Hook
 * 
 * Manages document history fetching, filtering, and formatting.
 * Extracted from DocumentViewerModal to improve separation of concerns.
 */

import { useState, useEffect, useRef } from 'react';
import { API_CONFIG } from '../config.js';

export function useDocumentHistory(documentId) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref to store AbortController for cleanup
  const abortControllerRef = useRef(null);

  // Fetch document history when document changes
  useEffect(() => {
    if (!documentId) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/documents/${documentId}/history/`, {
          headers: {
            'Authorization': API_CONFIG.HEADERS.Authorization,
            'Accept': 'application/json',
          },
          signal: abortControllerRef.current.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const historyData = await response.json();
        const essentialHistory = filterEssentialHistory(historyData);
        setHistory(essentialHistory);
      } catch (error) {
        // Don't set error if request was aborted
        if (error.name !== 'AbortError') {
        console.error('Error fetching document history:', error);
        setError('Failed to load document history');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [documentId, API_CONFIG.HEADERS.Authorization]);

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter essential history entries and remove duplicates
  const filterEssentialHistory = (historyData) => {
    const essentialEntries = historyData.filter(entry => {
      // Exclude all 'create' actions completely
      if (entry.action === 'create') {
        return false;
      }
      
      // Only include custom field changes (status, tracking code)
      if (entry.changes?.custom_fields) {
        return true;
      }
      
      // Only include tag changes (department assignments)
      if (entry.changes?.tags) {
        // Only include if it's an 'add' operation with specific objects
        if (entry.changes.tags.operation === 'add' && entry.changes.tags.objects?.length > 0) {
          return true;
        }
        return false;
      }
      
      return false;
    });

    // Remove duplicates with more aggressive logic
    const uniqueEntries = [];
    const seenKeys = new Set();

    for (const entry of essentialEntries) {
      let key = '';
      
      // Custom fields - include field name and value
      if (entry.changes?.custom_fields) {
        const field = entry.changes.custom_fields.field;
        const value = entry.changes.custom_fields.value;
        key = `CUSTOM_FIELD_${field}_${value}`;
      } 
      // Tags - include department name
      else if (entry.changes?.tags) {
        const department = entry.changes.tags.objects?.[0] || 'UNKNOWN_DEPARTMENT';
        key = `TAG_${department}_${entry.timestamp}`;
      }

      // Only add if we haven't seen this key before
      if (key && !seenKeys.has(key)) {
        seenKeys.add(key);
        uniqueEntries.push(entry);
      }
    }

    // Sort by timestamp to maintain chronological order
    return uniqueEntries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  // Get action display text
  const getActionText = (action, changes) => {
    switch (action) {
      case 'update':
        if (changes?.custom_fields) {
          const field = changes.custom_fields.field;
          if (field === 'Document Status') {
            return `Status: ${changes.custom_fields.value}`;
          } else if (field === 'Tracking Code') {
            return `Tracking Code: ${changes.custom_fields.value}`;
          }
          return `${field} Updated`;
        }
        
        // Handle tag changes (department assignments)
        if (changes?.tags) {
          if (changes.tags.operation === 'add' && changes.tags.objects?.length > 0) {
            return `Assigned to: ${changes.tags.objects[0]}`;
          }
          // Don't show generic department updates
          return null;
        }
        
        return 'Document Updated';
      default:
        return action.charAt(0).toUpperCase() + action.slice(1);
    }
  };

  return {
    history,
    loading,
    error,
    formatTimestamp,
    getActionText
  };
} 