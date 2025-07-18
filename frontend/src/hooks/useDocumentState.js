/**
 * useDocumentState Hook
 * 
 * Manages document-related state including fetching, loading, and error handling.
 * This hook encapsulates all document list management logic.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { apiCall } from '../services/api.js';
import { USER_TAG_ID_MAP, CUSTOM_FIELD_IDS, DEFAULT_DOCUMENT_STATUS, API_ENDPOINTS } from '../constants/index.js';

export function useDocumentState(department) {
  // Document Management State
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ref to store timeout ID for cleanup
  const statusInitTimeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (statusInitTimeoutRef.current) {
        clearTimeout(statusInitTimeoutRef.current);
        statusInitTimeoutRef.current = null;
      }
    };
  }, []);

  /**
   * Initialize document status for documents that don't have a status field
   * This ensures all documents have a proper status for tracking
   * 
   * @param {number} docId - The document ID to initialize status for
   * @returns {Promise<boolean>} Whether the status was successfully initialized
   */
  const initializeDocumentStatus = useCallback(async (docId) => {
    try {
      // First get the current document to preserve existing custom fields
      const currentDoc = await apiCall(API_ENDPOINTS.DOCUMENT_DETAIL(docId));
      // Check if document already has a status field (field ID 3)
      const existingFields = currentDoc.custom_fields || [];
      const hasStatus = existingFields.some(field => field.field === CUSTOM_FIELD_IDS.STATUS);
      if (!hasStatus) {
        // Add default status to documents without status
        const updatedFields = [...existingFields, { field: CUSTOM_FIELD_IDS.STATUS, value: DEFAULT_DOCUMENT_STATUS }];
        await apiCall(API_ENDPOINTS.DOCUMENT_DETAIL(docId), {
          method: 'PATCH',
          body: JSON.stringify({ custom_fields: updatedFields }),
        });
        console.log(`Status initialized for document ${docId}`);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to initialize document status:', err);
      return false;
    }
  }, []);

  /**
   * Fetch documents for the current department
   */
  const fetchDocs = useCallback(async () => {
    setLoading(true);
    setError('');
    setFiles([]);
    
    try {
      const tagInfo = USER_TAG_ID_MAP[department];
      if (!tagInfo) throw new Error('Tag not found');
      
      let apiUrl = `${API_ENDPOINTS.DOCUMENTS}?tags=${tagInfo.id}&include=custom_fields`;
      let data = await apiCall(apiUrl);
      
      // If custom fields are not included in the response, fetch detailed docs
      if (data.results && data.results.length > 0 && (!data.results[0].custom_fields || data.results[0].custom_fields.length === 0)) {
        const detailedDocs = [];
        for (const doc of data.results) {
          try {
            const detailedDoc = await apiCall(API_ENDPOINTS.DOCUMENT_DETAIL(doc.id));
            detailedDocs.push(detailedDoc);
          } catch (err) {
            detailedDocs.push(doc);
          }
        }
        data.results = detailedDocs;
      }
      
      const filteredDocs = Array.isArray(data.results) 
        ? data.results.filter(doc => doc.tags && doc.tags.includes(tagInfo.id))
        : [];
      
      // Process documents and collect those needing status initialization
      const docsNeedingStatus = [];
      const processedDocs = filteredDocs.map(doc => {
        const trackingCodeField = doc.custom_fields?.find(field => field.field === CUSTOM_FIELD_IDS.TRACKING_CODE);
        const trackingCode = trackingCodeField?.value || 'No tracking code';
        const statusField = doc.custom_fields?.find(field => field.field === CUSTOM_FIELD_IDS.STATUS);
        const status = statusField?.value || DEFAULT_DOCUMENT_STATUS;
        
        // Collect documents that need status initialization
        if (!statusField) {
          docsNeedingStatus.push(doc.id);
        }
        
        return {
          id: doc.id,
          title: doc.title || doc.filename || doc.name,
          trackingCode: trackingCode,
          status: status,
          tags: doc.tags
        };
      });
      
      setFiles(processedDocs);
      
      // Initialize status for documents that need it (outside render cycle)
      if (docsNeedingStatus.length > 0) {
        // Use setTimeout to avoid blocking the UI and prevent circular calls
        statusInitTimeoutRef.current = setTimeout(async () => {
          for (const docId of docsNeedingStatus) {
            await initializeDocumentStatus(docId);
          }
          // Optionally refresh the document list after status initialization
          // This could be controlled by a flag or callback
        }, 100);
      }
    } catch (err) {
      setError('Error fetching documents');
      console.error('Error fetching documents:', err);
    }
    
    setLoading(false);
  }, [department, initializeDocumentStatus]);

  /**
   * Update document status
   * 
   * @param {number} docId - Document ID
   * @param {string} newStatus - New status value
   */
  const updateDocumentStatus = useCallback(async (docId, newStatus) => {
    try {
      const currentDoc = await apiCall(API_ENDPOINTS.DOCUMENT_DETAIL(docId));
      const existingFields = currentDoc.custom_fields || [];
      const updatedFields = existingFields.map(field => 
        field.field === CUSTOM_FIELD_IDS.STATUS ? { field: CUSTOM_FIELD_IDS.STATUS, value: newStatus } : field
      );
      
      if (!existingFields.some(field => field.field === CUSTOM_FIELD_IDS.STATUS)) {
        updatedFields.push({ field: CUSTOM_FIELD_IDS.STATUS, value: newStatus });
      }
      
      await apiCall(API_ENDPOINTS.DOCUMENT_DETAIL(docId), {
        method: 'PATCH',
        body: JSON.stringify({ custom_fields: updatedFields }),
      });
      
      await fetchDocs();
    } catch (err) {
      setError('Failed to update document status');
      console.error('Error updating document status:', err);
    }
  }, [fetchDocs]);

  /**
   * Forward document to another department
   * 
   * @param {number} docId - Document ID
   * @param {number} newTagId - New department tag ID
   */
  const forwardDocument = useCallback(async (docId, newTagId) => {
    try {
      await apiCall(API_ENDPOINTS.DOCUMENT_DETAIL(docId), {
        method: 'PATCH',
        body: JSON.stringify({ tags: [newTagId] })
      });
      await fetchDocs();
    } catch (err) {
      setError('Failed to forward document');
      console.error('Error forwarding document:', err);
    }
  }, [fetchDocs]);

  return {
    // State
    files,
    loading,
    error,
    
    // Actions
    fetchDocs,
    updateDocumentStatus,
    forwardDocument,
    initializeDocumentStatus,
    
    // Setters for external use
    setError,
  };
} 