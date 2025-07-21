import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import EmailList from '../../components/EmailList';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmationModal from '../../components/ConfirmationModal';
import { ArrowLeft, Trash2, Zap, Search, RefreshCw, Mail, CheckCircle2, FolderOpen } from 'lucide-react';
import { useEmails, useBulkDeleteEmails, useBulkUnsubscribe, useBulkMoveEmails } from '../../hooks/useEmails';
import { useCategories } from '../../hooks/useCategories';
import { useAccounts } from '../../hooks/useAccounts';
import CategorySelectionModal from '../../components/CategorySelectionModal';

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [unsubscribeFilter, setUnsubscribeFilter] = useState(null);
  const [unsubscribeStatusFilter, setUnsubscribeStatusFilter] = useState(null);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [unsubscribeModalData, setUnsubscribeModalData] = useState({ count: 0, alreadyUnsubscribed: 0 });
  const [showMoveModal, setShowMoveModal] = useState(false);

  const { data: categories } = useCategories();
  const { data: accounts = [] } = useAccounts();
  const { data: emailData, isLoading, refetch } = useEmails(id, page, 20, selectedAccountId, unsubscribeFilter, unsubscribeStatusFilter);
  
  // Poll for updates when there are emails in progress
  useEffect(() => {
    const hasInProgressEmails = emails.some(email => email.unsubscribe_status === 'in_progress');
    
    if (hasInProgressEmails) {
      const interval = setInterval(() => {
        refetch();
      }, 5000); // Poll every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [emails, refetch]);
  const bulkDelete = useBulkDeleteEmails();
  const bulkUnsubscribe = useBulkUnsubscribe();
  const bulkMove = useBulkMoveEmails();
  
  // Extract emails and pagination from the response
  const emails = emailData?.emails || [];
  const totalCount = emailData?.pagination?.total || 0;
  const totalPages = emailData?.pagination?.totalPages || 1;

  const category = categories?.find(cat => cat.id === parseInt(id));

  const handleSelectEmail = (emailId) => {
    setSelectedEmails(prev =>
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id) || []);
    }
  };

  // Filter emails that can be unsubscribed (have link and not already completed or in progress)
  const getUnsubscribableEmails = (emailIds) => {
    return emailIds.filter(id => {
      const email = emails.find(e => e.id === id);
      return email && email.unsubscribe_link && 
             (!email.unsubscribe_status || email.unsubscribe_status === 'pending' || email.unsubscribe_status === 'failed');
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedEmails.length === 0) return;
    if (!confirm(`Delete ${selectedEmails.length} selected emails?`)) return;
    
    try {
      await bulkDelete.mutateAsync(selectedEmails);
      setSelectedEmails([]);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleUnsubscribeSelected = async () => {
    if (selectedEmails.length === 0) return;
    
    // Filter out already unsubscribed emails
    const unsubscribableEmails = getUnsubscribableEmails(selectedEmails);
    
    if (unsubscribableEmails.length === 0) {
      toast.info('All selected emails are already unsubscribed or cannot be unsubscribed');
      return;
    }
    
    const alreadyUnsubscribed = selectedEmails.length - unsubscribableEmails.length;
    setUnsubscribeModalData({ 
      count: unsubscribableEmails.length, 
      alreadyUnsubscribed,
      emailIds: unsubscribableEmails 
    });
    setShowUnsubscribeModal(true);
  };

  const handleConfirmUnsubscribe = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/unsubscribe/async/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ emailIds: unsubscribeModalData.emailIds })
      });

      if (!response.ok) {
        throw new Error('Failed to start unsubscribe process');
      }

      const data = await response.json();
      
      toast.success(`Unsubscribe process started! We'll notify you when it's complete. Job ID: ${data.jobId}`, {
        duration: 5000,
        icon: '🚀'
      });
      
      setSelectedEmails([]);
      setShowUnsubscribeModal(false);
      
      // Refresh the email list to show "in_progress" status
      refetch();
    } catch (error) {
      toast.error('Failed to start unsubscribe process');
      console.error('Unsubscribe error:', error);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleMoveSelected = () => {
    if (selectedEmails.length === 0) return;
    setShowMoveModal(true);
  };

  const handleConfirmMove = async (toCategoryId) => {
    try {
      await bulkMove.mutateAsync({ 
        emailIds: selectedEmails, 
        toCategoryId 
      });
      setSelectedEmails([]);
      setShowMoveModal(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const filteredEmails = emails.filter(email => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      email.subject?.toLowerCase().includes(query) ||
      email.sender?.toLowerCase().includes(query) ||
      email.ai_summary?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!category) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-6">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
              <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or has been deleted.</p>
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>{category?.name || 'Category'} - AI Email Sorter</title>
        <meta name="description" content={`View and manage emails in the ${category?.name} category`} />
      </Head>
      
      <DashboardLayout>
        <div className="p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-primary-600 hover:text-primary-700 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </button>
            
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {category.name}
                </h1>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-gray-600">
                    {totalCount} emails
                  </p>
                  <div className="flex items-center gap-2">
                    {selectedAccountId && (
                      <span className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                        <Mail className="inline h-3 w-3 mr-1" />
                        {accounts.find(a => a.id === parseInt(selectedAccountId))?.email}
                      </span>
                    )}
                    {unsubscribeFilter !== null && (
                      <span className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                        <Zap className="inline h-3 w-3 mr-1" />
                        {unsubscribeFilter ? 'With Unsubscribe' : 'Without Unsubscribe'}
                      </span>
                    )}
                    {unsubscribeStatusFilter && (
                      <span className={`text-sm px-2 py-1 rounded-md ${
                        unsubscribeStatusFilter === 'completed' ? 'text-green-600 bg-green-50' :
                        unsubscribeStatusFilter === 'failed' ? 'text-red-600 bg-red-50' :
                        unsubscribeStatusFilter === 'in_progress' ? 'text-blue-600 bg-blue-50' :
                        'text-gray-600 bg-gray-100'
                      }`}>
                        <CheckCircle2 className="inline h-3 w-3 mr-1" />
                        {unsubscribeStatusFilter === 'pending' ? 'Not Attempted' :
                         unsubscribeStatusFilter === 'completed' ? 'Unsubscribed' :
                         unsubscribeStatusFilter === 'failed' ? 'Failed' :
                         unsubscribeStatusFilter === 'in_progress' ? 'In Progress' : ''}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {category.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {/* Account filter dropdown */}
                <div className="relative">
                  <select
                    value={selectedAccountId || ''}
                    onChange={(e) => {
                      setSelectedAccountId(e.target.value || null);
                      setPage(1); // Reset to first page when changing filter
                    }}
                    className="btn-secondary pr-8 appearance-none"
                  >
                    <option value="">All Accounts</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.email}
                      </option>
                    ))}
                  </select>
                  <Mail className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Unsubscribe filter dropdown */}
                <div className="relative">
                  <select
                    value={unsubscribeFilter === null ? '' : unsubscribeFilter.toString()}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUnsubscribeFilter(value === '' ? null : value === 'true');
                      setPage(1); // Reset to first page when changing filter
                    }}
                    className="btn-secondary pr-8 appearance-none"
                  >
                    <option value="">All Emails</option>
                    <option value="true">With Unsubscribe</option>
                    <option value="false">Without Unsubscribe</option>
                  </select>
                  <Zap className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Unsubscribe status filter dropdown */}
                <div className="relative">
                  <select
                    value={unsubscribeStatusFilter || ''}
                    onChange={(e) => {
                      setUnsubscribeStatusFilter(e.target.value || null);
                      setPage(1); // Reset to first page when changing filter
                    }}
                    className="btn-secondary pr-8 appearance-none"
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Not Attempted</option>
                    <option value="completed">Unsubscribed</option>
                    <option value="failed">Failed</option>
                    <option value="in_progress">In Progress</option>
                  </select>
                  <CheckCircle2 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`btn-secondary ${showSearch ? 'bg-primary-50 border-primary-200 text-primary-700' : ''}`}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
                
                <button
                  onClick={handleRefresh}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Search bar */}
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search emails by subject, sender, or summary..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}

            {/* Bulk actions */}
            {selectedEmails.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-primary-900">
                      {selectedEmails.length} email{selectedEmails.length !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleDeleteSelected}
                      disabled={bulkDelete.isLoading}
                      className="btn-secondary text-red-600 hover:bg-red-50 border-red-200"
                    >
                      {bulkDelete.isLoading ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Delete
                    </button>
                    
                    <button
                      onClick={handleUnsubscribeSelected}
                      disabled={bulkUnsubscribe.isLoading}
                      className="btn-secondary text-orange-600 hover:bg-orange-50 border-orange-200"
                    >
                      {bulkUnsubscribe.isLoading ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : (
                        <Zap className="h-4 w-4 mr-2" />
                      )}
                      Unsubscribe
                    </button>
                    
                    <button
                      onClick={handleMoveSelected}
                      disabled={bulkMove.isLoading}
                      className="btn-secondary text-purple-600 hover:bg-purple-50 border-purple-200"
                    >
                      {bulkMove.isLoading ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : (
                        <FolderOpen className="h-4 w-4 mr-2" />
                      )}
                      Move to Category
                    </button>
                    
                    <button
                      onClick={() => setSelectedEmails([])}
                      className="btn-secondary"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Email list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <EmailList
              emails={filteredEmails}
              selectedEmails={selectedEmails}
              onSelectEmail={handleSelectEmail}
              onSelectAll={handleSelectAll}
              totalCount={searchQuery ? filteredEmails.length : totalCount}
              page={page}
              onPageChange={setPage}
              totalPages={totalPages}
              searchQuery={searchQuery}
            />
          </motion.div>

          {/* Search results info */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm text-gray-600"
            >
              {filteredEmails.length === 0 ? (
                <p>No emails found matching "{searchQuery}"</p>
              ) : (
                <p>
                  Showing {filteredEmails.length} email{filteredEmails.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Unsubscribe Confirmation Modal */}
        <ConfirmationModal
          isOpen={showUnsubscribeModal}
          onClose={() => setShowUnsubscribeModal(false)}
          onConfirm={handleConfirmUnsubscribe}
          title="Confirm Unsubscribe"
          message={unsubscribeModalData.alreadyUnsubscribed > 0
            ? `${unsubscribeModalData.alreadyUnsubscribed} email(s) are already unsubscribed.\n\nAttempt to unsubscribe from ${unsubscribeModalData.count} remaining email(s)?\n\nThis will try to automatically unsubscribe you from these senders.`
            : `Attempt to unsubscribe from ${unsubscribeModalData.count} selected email(s)?\n\nThis will try to automatically unsubscribe you from these senders.`
          }
          confirmText="Unsubscribe"
          cancelText="Cancel"
          type="warning"
          confirmLoading={bulkUnsubscribe.isLoading}
        />

        {/* Category Selection Modal */}
        <CategorySelectionModal
          isOpen={showMoveModal}
          onClose={() => setShowMoveModal(false)}
          onConfirm={handleConfirmMove}
          categories={categories || []}
          currentCategoryId={parseInt(id)}
          emailCount={selectedEmails.length}
          isLoading={bulkMove.isLoading}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
}