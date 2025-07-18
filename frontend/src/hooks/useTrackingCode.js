/**
 * useTrackingCode Hook
 * 
 * Manages tracking code state and saving functionality.
 * Handles the final step of document upload process.
 */

import { useState, useCallback } from 'react';
import { apiCall } from '../services/api.js';
import { API_ENDPOINTS, CUSTOM_FIELD_IDS } from '../constants/index.js';

export function useTrackingCode(onTrackingCodeComplete) {
  // Tracking code state
  const [pendingTrackingCodeDoc, setPendingTrackingCodeDoc] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('');
  const [error, setError] = useState('');

  /**
   * Set pending tracking code document
   * 
   * @param {Object} doc - Document object with id and title
   */
  const setPendingDocument = useCallback((doc) => {
    console.log('setPendingDocument called with:', doc);
    setPendingTrackingCodeDoc(doc);
    console.log('pendingTrackingCodeDoc state should now be:', doc);
  }, []);

  /**
   * Clear tracking code state
   */
  const clearTrackingCodeState = useCallback(() => {
    setPendingTrackingCodeDoc(null);
    setProcessingStatus('');
    setError('');
  }, []);

  /**
   * Save tracking code for pending document
   * 
   * @param {string} trackingCode - Tracking code to save
   */
  const saveTrackingCode = useCallback(async (trackingCode) => {
    if (!pendingTrackingCodeDoc || !trackingCode) return;
    
    setProcessingStatus('Saving tracking code...');
    setError('');
    
    try {
      await apiCall(API_ENDPOINTS.DOCUMENT_DETAIL(pendingTrackingCodeDoc.id), {
        method: 'PATCH',
        body: JSON.stringify({ 
          custom_fields: [{ field: CUSTOM_FIELD_IDS.TRACKING_CODE, value: trackingCode }] 
        }),
      });
      
      const docId = pendingTrackingCodeDoc.id;
      setPendingTrackingCodeDoc(null);
      setProcessingStatus('');
      
      // Call completion callback
      if (onTrackingCodeComplete) {
        onTrackingCodeComplete(docId);
      }
    } catch (err) {
      setProcessingStatus('Failed to save tracking code.');
      setError('Failed to save tracking code: ' + err.message);
      console.error('Error saving tracking code:', err);
    }
  }, [pendingTrackingCodeDoc, onTrackingCodeComplete]);

  return {
    // State
    pendingTrackingCodeDoc,
    processingStatus,
    error,
    
    // Actions
    setPendingDocument,
    saveTrackingCode,
    clearTrackingCodeState,
    
    // Setters
    setError,
    setProcessingStatus,
  };
} 