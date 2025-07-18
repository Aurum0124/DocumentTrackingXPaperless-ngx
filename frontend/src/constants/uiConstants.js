/**
 * UI Constants
 * 
 * This file contains UI-related constants like colors, spacing, and design tokens.
 */

// Color palette
export const COLORS = {
  // Primary colors
  PRIMARY: '#2a5196',
  PRIMARY_LIGHT: '#4f6cff',
  PRIMARY_DARK: '#1e3a8a',
  
  // Secondary colors
  SECONDARY: '#bfc4d1',
  SECONDARY_LIGHT: '#e3e7ef',
  SECONDARY_DARK: '#6c757d',
  
  // Status colors
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  ERROR: '#dc3545',
  INFO: '#17a2b8',
  
  // Text colors
  TEXT_PRIMARY: '#2a5196',
  TEXT_SECONDARY: '#495057',
  TEXT_MUTED: '#6c757d',
  TEXT_LIGHT: '#bfc4d1',
  
  // Background colors
  BG_PRIMARY: '#fff',
  BG_SECONDARY: '#f8f9fa',
  BG_LIGHT: '#f6f8fa',
  BG_DARK: '#343a40',
  
  // Border colors
  BORDER_LIGHT: '#e9ecef',
  BORDER_MEDIUM: '#dee2e6',
  BORDER_DARK: '#ced4da',
  
  // Overlay colors
  OVERLAY: 'rgba(0,0,0,0.35)',
  OVERLAY_LIGHT: 'rgba(0,0,0,0.18)',
  
  // White and black
  WHITE: '#fff',
  BLACK: '#000',
};

// Spacing scale (in pixels)
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
};

// Border radius values
export const BORDER_RADIUS = {
  SM: 4,
  MD: 6,
  LG: 8,
  XL: 10,
  XXL: 14,
  ROUND: '50%',
};

// Font sizes
export const FONT_SIZES = {
  XS: '12px',
  SM: '13px',
  MD: '14px',
  LG: '16px',
  XL: '18px',
  XXL: '22px',
  XXXL: '24px',
  DISPLAY: '38px',
};

// Font weights
export const FONT_WEIGHTS = {
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
};

// Z-index values
export const Z_INDEX = {
  DROPDOWN: 100,
  SIDEBAR: 100,
  MODAL: 3000,
  PROCESSING_MODAL: 4000,
  LOADING_OVERLAY: 9999,
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
};

// Box shadows
export const SHADOWS = {
  SM: '0 1px 2px rgba(0,0,0,0.04)',
  MD: '0 2px 4px rgba(0,0,0,0.1)',
  LG: '0 4px 16px rgba(42,81,150,0.18)',
  XL: '0 8px 32px rgba(42,81,150,0.18)',
};

// View types
export const VIEW_TYPES = {
  GRID: 'grid',
  LIST: 'list',
  ONELINE: 'oneline',
};

// Default view settings
export const DEFAULT_VIEW_SETTINGS = {
  VIEW_TYPE: VIEW_TYPES.GRID,
  SIDEBAR_VISIBLE: true,
  CURRENT_VIEW: 'documents',
};

// Modal sizes
export const MODAL_SIZES = {
  SM: { minWidth: 300, maxWidth: 400 },
  MD: { minWidth: 400, maxWidth: 600 },
  LG: { minWidth: 600, maxWidth: 800 },
  XL: { minWidth: 800, maxWidth: 1200 },
};

// Button sizes
export const BUTTON_SIZES = {
  SM: { padding: '6px 12px', fontSize: '12px' },
  MD: { padding: '8px 16px', fontSize: '14px' },
  LG: { padding: '12px 24px', fontSize: '16px' },
  XL: { padding: '16px 32px', fontSize: '18px' },
}; 