import React from 'react';
import { VIEW_TYPES, COLORS } from '../../constants/index.js';

/**
 * SearchAndFilterBar Component
 * 
 * Handles document search and filtering with:
 * - Tracking code search
 * - Status filter
 * - View type switcher (grid/list)
 */

function SearchAndFilterBar({
  trackingCodeSearch,
  statusFilter,
  viewType,
  onSearchChange,
  onStatusFilterChange,
  onViewTypeChange,
  onRefresh
}) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: '#f6f8fa',
      borderRadius: '6px',
      padding: '16px 12px 12px 12px',
      marginBottom: '18px',
      boxShadow: '0 2px 8px rgba(42,81,150,0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <label htmlFor="tracking-search" style={{ 
        fontWeight: 600, 
        color: '#2a5196', 
        fontSize: 15, 
        marginRight: 8 
      }}>
        Search by Tracking Code:
      </label>
      
      <input
        id="tracking-search"
        type="text"
        placeholder="e.g. TRK-2025-0001"
        value={trackingCodeSearch}
        onChange={e => onSearchChange(e.target.value)}
        style={{
          padding: '8px 14px',
          fontSize: 15,
          border: '1.5px solid #bfc4d1',
          borderRadius: 5,
          outline: 'none',
          minWidth: 180,
          background: '#fff',
          color: '#2a5196',
          fontWeight: 500,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          transition: 'border-color 0.18s, box-shadow 0.18s',
        }}
      />
      
      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={e => onStatusFilterChange(e.target.value)}
        style={{
          padding: '8px 14px',
          fontSize: 15,
          border: '1.5px solid #bfc4d1',
          borderRadius: 5,
          outline: 'none',
          background: '#fff',
          color: '#2a5196',
          fontWeight: 500,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          transition: 'border-color 0.18s, box-shadow 0.18s',
        }}
      >
        <option value="">All Status</option>
        <option value="Under Review">Under Review</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      
      {/* Refresh Button */}
      <button
        type="button"
        aria-label="Refresh documents"
        onClick={onRefresh}
        style={{
          background: 'transparent',
          border: '1.5px solid #bfc4d1',
          borderRadius: 4,
          padding: 8,
          marginLeft: 'auto',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.18s, border-color 0.18s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#f0f4ff';
          e.target.style.borderColor = '#2a5196';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = '#bfc4d1';
        }}
      >
        {/* Refresh icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path 
            d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7c2.76 0 5.13-1.88 5.84-4.43" 
            stroke="#2a5196" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M15 7l-2-2 2-2" 
            stroke="#2a5196" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* View Switcher Icons */}
      <div style={{ display: 'flex', gap: 6, marginLeft: 10 }}>
        <button
          type="button"
          aria-label="Grid view"
          onClick={() => onViewTypeChange(VIEW_TYPES.GRID)}
          style={{
            background: viewType === VIEW_TYPES.GRID ? COLORS.PRIMARY : 'transparent',
            border: '1.5px solid #bfc4d1',
            borderRadius: 4,
            padding: 4,
            marginRight: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.18s',
          }}
        >
          {/* Grid icon (4 squares) */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1.5" fill={viewType === 'grid' ? '#fff' : '#2a5196'} />
            <rect x="13" y="3" width="6" height="6" rx="1.5" fill={viewType === 'grid' ? '#fff' : '#2a5196'} />
            <rect x="3" y="13" width="6" height="6" rx="1.5" fill={viewType === 'grid' ? '#fff' : '#2a5196'} />
            <rect x="13" y="13" width="6" height="6" rx="1.5" fill={viewType === 'grid' ? '#fff' : '#2a5196'} />
          </svg>
        </button>
        <button
          type="button"
          aria-label="List view"
          onClick={() => onViewTypeChange(VIEW_TYPES.LIST)}
          style={{
            background: viewType === VIEW_TYPES.LIST ? COLORS.PRIMARY : 'transparent',
            border: '1.5px solid #bfc4d1',
            borderRadius: 4,
            padding: 4,
            marginRight: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.18s',
          }}
        >
          {/* List icon (3 lines) */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="4" y="6" width="14" height="2.5" rx="1.2" fill={viewType === 'list' ? '#fff' : '#2a5196'} />
            <rect x="4" y="10" width="14" height="2.5" rx="1.2" fill={viewType === 'list' ? '#fff' : '#2a5196'} />
            <rect x="4" y="14" width="14" height="2.5" rx="1.2" fill={viewType === 'list' ? '#fff' : '#2a5196'} />
          </svg>
        </button>
        <button
          type="button"
          aria-label="One-line view"
          onClick={() => onViewTypeChange(VIEW_TYPES.ONELINE)}
          style={{
            background: viewType === VIEW_TYPES.ONELINE ? COLORS.PRIMARY : 'transparent',
            border: '1.5px solid #bfc4d1',
            borderRadius: 4,
            padding: 4,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.18s',
          }}
        >
          {/* One-line icon (single line with thumbnail) */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="8" width="16" height="6" rx="1" fill={viewType === 'oneline' ? '#fff' : '#2a5196'} />
            <rect x="3" y="9" width="3" height="4" rx="0.5" fill={viewType === 'oneline' ? '#2a5196' : '#fff'} />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchAndFilterBar; 