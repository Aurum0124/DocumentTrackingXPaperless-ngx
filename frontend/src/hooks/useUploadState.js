/**
 * useUploadState Hook
 * 
 * Orchestrates the upload process using three focused hooks:
 * - useFileUpload: Handles file selection and upload
 * - useDocumentProcessing: Handles processing and polling
 * - useTrackingCode: Handles tracking code management
 * 
 * This provides a clean API while maintaining separation of concerns.
 */

import { useCallback } from 'react';
import { useFileUpload } from './useFileUpload.js';
import { useDocumentProcessing } from './useDocumentProcessing.js';
import { useTrackingCode } from './useTrackingCode.js';

export function useUploadState(department, onUploadComplete) {
  // File upload hook
  const {
    uploadFile,
    uploading,
    uploadProgress,
    error: uploadError,
    canRetry: uploadCanRetry,
    setUploadFile,
    handleUpload: handleFileUpload,
    clearUploadState: clearFileUploadState,
    setError: setUploadError,
  } = useFileUpload(department);

  // Document processing hook
  const {
    processingDocId,
    isProcessing,
    processingStatus,
    error: processingError,
    canRetry: processingCanRetry,
    startProcessing,
    clearProcessingState,
    stopPolling,
    setError: setProcessingError,
    setProcessingStatus,
    setIsProcessing,
  } = useDocumentProcessing((doc) => {
    // When processing completes, set the document for tracking code
    setPendingDocument(doc);
    // Clear the upload processing status since processing is complete
    setProcessingStatus('');
    setIsProcessing(false);
  });

  // Tracking code hook - will be initialized after completeUpload is defined
  let trackingCodeHook;





  /**
   * Handle the complete upload process
   */
  const handleUpload = useCallback(async (e) => {
    try {
      // Step 1: Upload file
      const uploadResult = await handleFileUpload(e);
      
      // Check if upload was successful
      if (!uploadResult) {
        console.error('Upload failed - no result returned');
        return;
      }
      
      if (!uploadResult.docId && !uploadResult.taskUuid) {
        console.error('Upload failed - no document ID or task UUID returned');
        return;
      }
      
      // Set processing state immediately to keep modal open
      setProcessingStatus('Starting processing...');
      setIsProcessing(true);
      
      // Step 2: Start processing
      await startProcessing(uploadResult);
      
    } catch (err) {
      console.error('Upload process failed:', err);
      // Reset processing state on error
      setIsProcessing(false);
      setProcessingStatus('');
      // The error should already be set by the individual hooks
    }
  }, [handleFileUpload, startProcessing, setIsProcessing, setProcessingStatus, isProcessing]);

  // Initialize tracking code hook first
  trackingCodeHook = useTrackingCode((docId) => {
    // When tracking code is saved, call the completion callback
    if (onUploadComplete) {
      onUploadComplete(docId);
    }
  }, [onUploadComplete]);

  const {
    pendingTrackingCodeDoc,
    processingStatus: trackingCodeStatus,
    error: trackingCodeError,
    setPendingDocument,
    saveTrackingCode,
    clearTrackingCodeState,
    setError: setTrackingCodeError,
    setProcessingStatus: setTrackingCodeProcessingStatus,
  } = trackingCodeHook;

  /**
   * Complete upload process and clear state
   */
  const completeUpload = useCallback(() => {
    clearFileUploadState();
    clearProcessingState();
    clearTrackingCodeState();
    stopPolling();
  }, [clearFileUploadState, clearProcessingState, clearTrackingCodeState, stopPolling]);

  /**
   * Clear all upload state
   */
  const clearUploadState = useCallback(() => {
    // Only clear if not currently uploading or processing
    if (!uploading && !isProcessing) {
    clearFileUploadState();
    clearProcessingState();
    clearTrackingCodeState();
      stopPolling(); // Ensure polling is stopped
    }
  }, [clearFileUploadState, clearProcessingState, clearTrackingCodeState, stopPolling, uploading, isProcessing]);

  /**
   * Retry upload (currently only retries file upload)
   */
  const retryUpload = useCallback(async (e) => {
    // Clear all errors first
    setUploadError('');
    setProcessingError('');
    setTrackingCodeError('');
    
    // Retry the upload process
    try {
      const uploadResult = await handleFileUpload(e);
      if (uploadResult.docId || uploadResult.taskUuid) {
        await startProcessing(uploadResult);
      }
    } catch (err) {
      console.error('Retry failed:', err);
    }
  }, [handleFileUpload, startProcessing, setUploadError, setProcessingError, setTrackingCodeError]);

  // Combine errors from all hooks
  const error = uploadError || processingError || trackingCodeError;
  const canRetry = uploadCanRetry || processingCanRetry;

  // Combine processing status
  const combinedProcessingStatus = processingStatus || trackingCodeStatus;

  return {
    // State
    uploadFile,
    uploading,
    uploadProgress,
    processingDocId,
    isProcessing,
    processingStatus: combinedProcessingStatus,
    pendingTrackingCodeDoc,
    error,
    canRetry,
    
    // Actions
    setUploadFile,
    handleUpload,
    saveTrackingCode,
    clearUploadState,
    retryUpload,
    stopPolling,
    completeUpload,
    
    // Setters
    setError: setUploadError, // Primary error setter
  };
} 