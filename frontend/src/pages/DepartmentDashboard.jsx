import { useState, useEffect, useRef, useCallback } from 'react';
import { API_CONFIG } from '../config.js';
import {
  USER_TAG_ID_MAP,
  DOCUMENT_STATUSES,
  getFileTypeIcon,
  VIEW_TYPES,
  COLORS,
  VALIDATION_MESSAGES
} from '../constants/index.js';
import {
  useDocumentState,
  useUploadState,
  useUIState,
  useSearchState,
  useConnectionState
} from '../hooks/index.js';
import {
  Header,
  Sidebar,
  DashboardView,
  LoadingSpinner,
  StatusBadge,
  DocumentList,
  UploadModal,
  DocumentViewerModal,
  TrackingCodeModal,
  FloatingActionButton,
  SearchAndFilterBar
} from '../components/index.js';

function DepartmentDashboard({ department }) {
  // =========================================================================
  // CUSTOM HOOKS - State management extracted into focused hooks
  // =========================================================================
  
  // Document state management
  const {
    files,
    loading,
    error: documentError,
    fetchDocs,
    updateDocumentStatus,
    forwardDocument,
    setError: setDocumentError
  } = useDocumentState(department);
  
  // Upload and processing state
  const {
    uploadFile,
    uploading,
    uploadProgress,
    processingDocId,
    isProcessing,
    processingStatus,
    pendingTrackingCodeDoc,
    error: uploadError,
    canRetry,
    setUploadFile,
    handleUpload,
    saveTrackingCode,
    clearUploadState,
    completeUpload,
    retryUpload,
    setError: setUploadError
  } = useUploadState(department, fetchDocs);
  
  // UI state management
  const {
    viewingDocument,
    currentView,
    sidebarVisible,
    profileMenuOpen,
    hoveredCard,
    showAddModal,
    imgErrors,
    imgLoading,
    profileMenuRef,
    toggleSidebar,
    toggleProfileMenu,
    closeProfileMenu,
    setView,
    openDocumentViewer,
    closeDocumentViewer,
    openUploadModal,
    closeUploadModal,
    setImageLoading,
    setImageError,
    resetUIState,
    setHoveredCard,
    setShowAddModal
  } = useUIState();
  
  // Search and filter state
  const {
    trackingCodeSearch,
    viewType,
    statusFilter,
    filterDocuments,
    setSearchTerm,
    setStatusFilterValue,
    setViewTypeValue,
    clearSearchState,
    getStatusOptions,
    getSearchStats
  } = useSearchState();
  
  // Connection and session state
  const {
    apiConnected,
    connectionError,
    checkConnection,
    validateSession,
    logout
  } = useConnectionState();
  
  // Local state for operations
  const [forwarding, setForwarding] = useState({});          // Tracks which documents are being forwarded
  const [isForwarding, setIsForwarding] = useState(false);   // Global forwarding state
  const [selectedDepartments, setSelectedDepartments] = useState({}); // Target departments for forwarding
  const [trackingCode, setTrackingCode] = useState('');       // Manual tracking code input
  
  // Local state for operations

  // ============================================================================
  // EFFECTS & LIFECYCLE
  // ============================================================================
  
  // Initialize connection and fetch documents
  useEffect(() => {
    if (!validateSession()) {
      return;
    }
    
    const checkConnectionAndFetch = async () => {
      try {
        const connected = await checkConnection();
        if (connected) {
          await fetchDocs();
        }
      } catch (err) {
        console.error('Error during initialization:', err);
      }
    };
    
    checkConnectionAndFetch();
  }, [department, fetchDocs, checkConnection, validateSession]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleForward = async (docId) => {
    const newTagId = selectedDepartments[docId];
    if (!newTagId) return;
    
    setForwarding(prev => ({ ...prev, [docId]: true }));
    setIsForwarding(true);
    
    try {
      await forwardDocument(docId, newTagId);
    } catch (err) {
      setDocumentError('Failed to forward document');
    } finally {
      setForwarding(prev => ({ ...prev, [docId]: false }));
      setIsForwarding(false);
    }
  };

  const handleStatusChange = async (docId, newStatus) => {
    try {
      await updateDocumentStatus(docId, newStatus);
    } catch (err) {
      setDocumentError('Failed to update document status');
    }
  };

  const handleSaveTrackingCode = async () => {
    if (!pendingTrackingCodeDoc || !trackingCode) return;
    
    try {
      await saveTrackingCode(trackingCode);
      setTrackingCode('');
      // Close the upload modal after tracking code is saved
      closeUploadModal();
    } catch (err) {
      console.error('Error saving tracking code:', err);
    }
  };

  // StatusBadge is imported from components

  const tagName = USER_TAG_ID_MAP[department]?.name || '';
  if (loading || isForwarding) {
    return (
      <>
        <div style={{ 
          display: 'flex', 
          minHeight: '100vh', 
          backgroundColor: '#f8f9fa',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          flexDirection: 'column'
        }}>
          <Header
            tagName={tagName}
            apiConnected={apiConnected}
            profileMenuOpen={profileMenuOpen}
            profileMenuRef={profileMenuRef}
            toggleSidebar={toggleSidebar}
            toggleProfileMenu={toggleProfileMenu}
            closeProfileMenu={closeProfileMenu}
            logout={logout}
          />
          <Sidebar
            sidebarVisible={sidebarVisible}
            currentView={currentView}
            setView={setView}
          />
          <div style={{ flex: 1, padding: '20px', marginLeft: sidebarVisible ? '200px' : '0', transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)', minHeight: 'calc(100vh - 128px)' }}>
            <LoadingSpinner text={isForwarding ? 'Forwarding document…' : 'Loading documents…'} showOverlay={false} />
          </div>
          <div className="bg-bar bottom">
            <div className="footer-text">
              Powered by the Information Technology Office<br />
              © Provincial Government of Ilocos Norte
            </div>
          </div>
        </div>
      </>
    );
  }
  if (documentError || uploadError || connectionError) {
    const errorMessage = documentError || uploadError || connectionError;
    return <div style={{ padding: 32, textAlign: 'center', color: '#000' }}>{errorMessage}</div>;
  }

  return (
    <>
      <div style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Header
          tagName={tagName}
          apiConnected={apiConnected}
          profileMenuOpen={profileMenuOpen}
          profileMenuRef={profileMenuRef}
          toggleSidebar={toggleSidebar}
          toggleProfileMenu={toggleProfileMenu}
          closeProfileMenu={closeProfileMenu}
          logout={logout}
        />
        {/* Sidebar */}
        <Sidebar
          sidebarVisible={sidebarVisible}
          currentView={currentView}
          setView={setView}
        />

        {/* Main Content */}
        <div style={{ 
          flex: 1, 
          padding: '20px',
          marginLeft: sidebarVisible ? '200px' : '0',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: 'calc(100vh - 128px)'
        }}>
          {currentView === 'dashboard' ? (
            <DashboardView tagName={tagName} files={files} />
          ) : (
            /* Documents View */
            <div style={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              padding: '20px 24px',
              maxWidth: '1242px',
              margin: '0 auto',
              width: '100%',
              height: 'calc(100vh - 200px)',
              display: 'flex',
              flexDirection: 'column',
            }}>
                {/* Search and Filter Bar */}
                <SearchAndFilterBar
                  trackingCodeSearch={trackingCodeSearch}
                  statusFilter={statusFilter}
                  viewType={viewType}
                  onSearchChange={setSearchTerm}
                  onStatusFilterChange={setStatusFilterValue}
                  onViewTypeChange={setViewTypeValue}
                  onRefresh={fetchDocs}
                />
                
                {/* Document List */}
                <DocumentList
                  files={files}
                  trackingCodeSearch={trackingCodeSearch}
                  statusFilter={statusFilter}
                  viewType={viewType}
                  hoveredCard={hoveredCard}
                  selectedDepartments={selectedDepartments}
                  forwarding={forwarding}
                  imgLoading={imgLoading}
                  imgErrors={imgErrors}
                  department={department}
                  onHoverCard={setHoveredCard}
                  onSelectDepartment={(docId, value) => {
                    setSelectedDepartments(prev => ({
                      ...prev,
                      [docId]: value
                    }));
                  }}
                  onForward={handleForward}
                  onStatusChange={handleStatusChange}
                  onViewDocument={openDocumentViewer}
                  onImageLoad={setImageLoading}
                  onImageError={setImageError}
                  onImageLoadStart={setImageLoading}
                  getFileTypeIcon={getFileTypeIcon}
                />
                {/* Upload Modal */}
                <UploadModal
                  showAddModal={showAddModal}
                  uploading={uploading}
                  uploadProgress={uploadProgress}
                  isProcessing={isProcessing}
                  processingStatus={processingStatus}
                  uploadFile={uploadFile}
                  uploadError={uploadError}
                  canRetry={canRetry}
                  onClose={() => {
                    if (!uploading && !isProcessing) {
                      closeUploadModal();
                      completeUpload();
                    }
                  }}
                  onFileSelect={setUploadFile}
                  onUpload={handleUpload}
                  onRetry={retryUpload}
                  onRemoveFile={() => setUploadFile(null)}
                />

                {/* Document Viewer Modal */}
                <DocumentViewerModal
                  viewingDocument={viewingDocument}
                  onClose={closeDocumentViewer}
                />

                {/* Pending Tracking Code Modal */}
                <TrackingCodeModal
                  pendingTrackingCodeDoc={pendingTrackingCodeDoc}
                  trackingCode={trackingCode}
                  processingStatus={processingStatus}
                  onClose={() => { 
                    completeUpload(); 
                    setTrackingCode(''); 
                    closeUploadModal();
                  }}
                  onTrackingCodeChange={setTrackingCode}
                  onSave={handleSaveTrackingCode}
                />

                {/* Floating Upload FAB */}
                <FloatingActionButton
                  currentView={currentView}
                  onClick={openUploadModal}
                />
            </div>
          )}
        </div>

        {/* Blue Footer (matches public tracker) - Always visible */}
                <div className="bg-bar bottom">
                  <div className="footer-text">
                    Powered by the Information Technology Office<br />
                    © Provincial Government of Ilocos Norte
                  </div>
        </div>

        {/* Floating Upload Button, Upload Modal, Footer, Document Viewer Modal, Pending Tracking Code Modal */}
        {/* ...rest of the UI from App.jsx... */}
      </div>
    </>
  );
}

export default DepartmentDashboard; 