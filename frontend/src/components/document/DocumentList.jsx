import React from 'react';
import { VIEW_TYPES } from '../../constants/index.js';
import { DocumentCard, DocumentRow } from './documentlist/index.js';

/**
 * DocumentList Component
 * 
 * Renders the list of documents in either grid or list view
 * Handles filtering, search, and document interactions
 */

function DocumentList({
  files,
  trackingCodeSearch,
  statusFilter,
  viewType,
  hoveredCard,
  selectedDepartments,
  forwarding,
  imgLoading,
  imgErrors,
  department,
  onHoverCard,
  onSelectDepartment,
  onForward,
  onStatusChange,
  onViewDocument,
  onImageLoad,
  onImageError,
  onImageLoadStart,
  getFileTypeIcon
}) {
  const filteredFiles = files.filter(f =>
    (!trackingCodeSearch ||
      (f.trackingCode && f.trackingCode.toLowerCase().includes(trackingCodeSearch.toLowerCase()))) &&
    (!statusFilter || f.status === statusFilter)
  );

  if (filteredFiles.length === 0) {
    return (
      <div style={{ 
        padding: 0, 
        textAlign: 'center', 
        color: '#6c757d',
        fontSize: '16px',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '340px',
      }}>
        No documents found for this department
      </div>
    );
  }

  if (viewType === VIEW_TYPES.GRID) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: '100%',
        paddingRight: '8px',
        scrollBehavior: 'smooth',
        minHeight: '340px',
      }}>
        {filteredFiles.map((f, i) => (
          <DocumentCard
            key={i}
            document={f}
            index={i}
            hoveredCard={hoveredCard}
            selectedDepartments={selectedDepartments}
            forwarding={forwarding}
            imgLoading={imgLoading}
            imgErrors={imgErrors}
            department={department}
            onHoverCard={onHoverCard}
            onSelectDepartment={onSelectDepartment}
            onForward={onForward}
            onStatusChange={onStatusChange}
            onViewDocument={onViewDocument}
            onImageLoad={onImageLoad}
            onImageError={onImageError}
            onImageLoadStart={onImageLoadStart}
            getFileTypeIcon={getFileTypeIcon}
          />
        ))}
      </div>
    );
  }

  // One-line view (Paperless-ngx style)
  if (viewType === VIEW_TYPES.ONELINE) {
    return (
      <div style={{
        width: '100%',
        minHeight: '340px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '0 4px',
      }}>
        {filteredFiles.map((f, i) => (
          <DocumentRow
            key={i}
            document={f}
            index={i}
            viewType={viewType}
            hoveredCard={hoveredCard}
            selectedDepartments={selectedDepartments}
            forwarding={forwarding}
            imgLoading={imgLoading}
            imgErrors={imgErrors}
            department={department}
            onHoverCard={onHoverCard}
            onSelectDepartment={onSelectDepartment}
            onForward={onForward}
            onStatusChange={onStatusChange}
            onViewDocument={onViewDocument}
            onImageLoad={onImageLoad}
            onImageError={onImageError}
            onImageLoadStart={onImageLoadStart}
            getFileTypeIcon={getFileTypeIcon}
          />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div style={{
      width: '100%',
      minHeight: '340px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '0 4px',
    }}>
      {filteredFiles.map((f, i) => (
        <DocumentRow
          key={i}
          document={f}
          index={i}
          viewType={viewType}
          hoveredCard={hoveredCard}
          selectedDepartments={selectedDepartments}
          forwarding={forwarding}
          imgLoading={imgLoading}
          imgErrors={imgErrors}
          department={department}
          onHoverCard={onHoverCard}
          onSelectDepartment={onSelectDepartment}
          onForward={onForward}
          onStatusChange={onStatusChange}
          onViewDocument={onViewDocument}
          onImageLoad={onImageLoad}
          onImageError={onImageError}
          onImageLoadStart={onImageLoadStart}
          getFileTypeIcon={getFileTypeIcon}
        />
      ))}
    </div>
  );
}

export default DocumentList; 