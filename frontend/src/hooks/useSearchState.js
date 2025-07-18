/**
 * useSearchState Hook
 * 
 * Manages search and filter state including tracking code search, status filters, 
 * and view type selection.
 */

import { useState, useCallback } from 'react';
import { VIEW_TYPES, DEFAULT_VIEW_SETTINGS, DOCUMENT_STATUSES } from '../constants/index.js';

export function useSearchState() {
  // Search and Filter State
  const [trackingCodeSearch, setTrackingCodeSearch] = useState('');
  const [viewType, setViewType] = useState(DEFAULT_VIEW_SETTINGS.VIEW_TYPE);
  const [statusFilter, setStatusFilter] = useState('');

  /**
   * Filter documents based on search criteria
   * 
   * @param {Array} documents - Array of documents to filter
   * @returns {Array} Filtered documents
   */
  const filterDocuments = useCallback((documents) => {
      if (!Array.isArray(documents)) return [];
      
      return documents.filter(doc => {
        // Filter by tracking code search
        const matchesSearch = !trackingCodeSearch || 
          (doc.trackingCode && 
           doc.trackingCode.toLowerCase().includes(trackingCodeSearch.toLowerCase()));
        
        // Filter by status
        const matchesStatus = !statusFilter || doc.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      });
  }, [trackingCodeSearch, statusFilter]);

  /**
   * Clear all search and filter state
   */
  const clearSearchState = () => {
    setTrackingCodeSearch('');
    setStatusFilter('');
    setViewType(DEFAULT_VIEW_SETTINGS.VIEW_TYPE);
  };

  /**
   * Set tracking code search
   * 
   * @param {string} searchTerm - Search term
   */
  const setSearchTerm = (searchTerm) => {
    setTrackingCodeSearch(searchTerm);
  };

  /**
   * Set status filter
   * 
   * @param {string} status - Status to filter by
   */
  const setStatusFilterValue = (status) => {
    setStatusFilter(status);
  };

  /**
   * Set view type
   * 
   * @param {string} type - View type ('grid', 'list', or 'oneline')
   */
  const setViewTypeValue = (type) => {
    if (type === VIEW_TYPES.GRID || type === VIEW_TYPES.LIST || type === VIEW_TYPES.ONELINE) {
      setViewType(type);
    }
  };

  /**
   * Get available status options for filtering
   * 
   * @returns {Array} Array of status options
   */
  const getStatusOptions = () => {
    return [
      { value: '', label: 'All Status' },
      { value: DOCUMENT_STATUSES.UNDER_REVIEW, label: DOCUMENT_STATUSES.UNDER_REVIEW },
      { value: DOCUMENT_STATUSES.APPROVED, label: DOCUMENT_STATUSES.APPROVED },
      { value: DOCUMENT_STATUSES.REJECTED, label: DOCUMENT_STATUSES.REJECTED },
    ];
  };

  /**
   * Get search statistics
   * 
   * @param {Array} documents - Array of documents
   * @returns {Object} Search statistics
   */
  const getSearchStats = (documents) => {
    const total = documents?.length || 0;
    const filtered = filterDocuments(documents).length;
    
    return {
      total,
      filtered,
      hasFilters: trackingCodeSearch || statusFilter,
      searchTerm: trackingCodeSearch,
      statusFilter,
    };
  };

  return {
    // State
    trackingCodeSearch,
    viewType,
    statusFilter,
    
    // Computed values
    filterDocuments,
    
    // Actions
    setSearchTerm,
    setStatusFilterValue,
    setViewTypeValue,
    clearSearchState,
    
    // Utilities
    getStatusOptions,
    getSearchStats,
    
    // Setters (for backward compatibility)
    setTrackingCodeSearch,
    setViewType,
    setStatusFilter,
  };
} 