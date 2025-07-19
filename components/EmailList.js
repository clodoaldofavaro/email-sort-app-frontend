 // components/EmailList.js - Complete Implementation
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  Mail, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Inbox, 
  Clock,
  User,
  ExternalLink,
  Zap,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import EmailDetailModal from './EmailDetailModal';
import LoadingSpinner from './LoadingSpinner';

const EmailItem = ({ 
  email, 
  isSelected, 
  onSelect, 
  onView, 
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else if (diffInHours < 168) { // 7 days
      return format(date, 'MMM d, h:mm a');
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  const getSenderName = (sender) => {
    if (!sender) return 'Unknown Sender';
    
    // Extract name from "Name <email@domain.com>" format
    const match = sender.match(/^(.*?)\s*<(.+)>$/);
    if (match) {
      return match[1].trim() || match[2];
    }
    return sender;
  };

  const getSenderEmail = (sender) => {
    if (!sender) return '';
    
    const match = sender.match(/<(.+)>$/);
    return match ? match[1] : sender;
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
        isSelected ? 'bg-primary-50 border-primary-200' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-6 py-4">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <div className="flex items-center pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(email.id)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
            />
          </div>
          
          {/* Email Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0 pr-4">
                {/* Subject */}
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-700 transition-colors">
                    {email.subject || 'No Subject'}
                  </h3>
                  {email.unsubscribe_link && (
                    <Zap className="h-3 w-3 text-orange-500 flex-shrink-0" title="Unsubscribe available" />
                  )}
                </div>
                
                {/* Sender */}
                <div className="flex items-center space-x-1 mb-2">
                  <User className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-600 truncate">
                    <span className="font-medium">{getSenderName(email.sender)}</span>
                    {getSenderEmail(email.sender) !== getSenderName(email.sender) && (
                      <span className="text-gray-500 ml-1">
                        &lt;{getSenderEmail(email.sender)}&gt;
                      </span>
                    )}
                  </span>
                </div>
                
                {/* AI Summary */}
                <div className="mb-2">
                  <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                    {email.ai_summary || 'No summary available'}
                  </p>
                </div>
                
                {/* Metadata */}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(email.received_at)}</span>
                  </div>
                  
                  {email.category_name && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{email.category_name}</span>
                    </div>
                  )}
                  
                  {email.account_email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate max-w-24">{email.account_email}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="text-xs text-gray-500 text-right">
                  {formatDate(email.received_at)}
                </div>
                
                <button
                  onClick={() => onView(email)}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    isHovered 
                      ? 'text-primary-600 bg-primary-100 hover:bg-primary-200' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="View email details"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PaginationControls = ({ 
  page, 
  totalPages, 
  totalCount, 
  onPageChange, 
  loading 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let start = Math.max(1, page - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          <span className="font-medium">
            {totalCount.toLocaleString()}
          </span>
          {' '}total emails
          {totalPages > 1 && (
            <>
              {' • Page '}
              <span className="font-medium">{page}</span>
              {' of '}
              <span className="font-medium">{totalPages}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Previous */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || loading}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {page > 3 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  1
                </button>
                {page > 4 && <span className="text-gray-400">...</span>}
              </>
            )}
            
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                disabled={loading}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  pageNum === page
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            {page < totalPages - 2 && (
              <>
                {page < totalPages - 3 && <span className="text-gray-400">...</span>}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          
          {/* Next */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages || loading}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
            title="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EmailList({
  emails = [],
  selectedEmails = [],
  onSelectEmail,
  onSelectAll,
  totalCount = 0,
  page = 1,
  onPageChange,
  totalPages = 1,
  searchQuery = '',
  loading = false
}) {
  const [viewingEmail, setViewingEmail] = useState(null);

  const handleSelectAll = () => {
    if (typeof onSelectAll === 'function') {
      onSelectAll();
    }
  };

  const handleSelectEmail = (emailId) => {
    if (typeof onSelectEmail === 'function') {
      onSelectEmail(emailId);
    }
  };

  const handleViewEmail = (email) => {
    setViewingEmail(email);
  };

  const isAllSelected = emails.length > 0 && selectedEmails.length === emails.length;
  const isIndeterminate = selectedEmails.length > 0 && selectedEmails.length < emails.length;

  if (loading && emails.length === 0) {
    return (
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="px-6 py-4 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-12"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {searchQuery ? (
              <AlertCircle className="h-8 w-8 text-gray-400" />
            ) : (
              <Inbox className="h-8 w-8 text-gray-400" />
            )}
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No matching emails' : 'No emails in this category'}
          </h3>
          
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchQuery 
              ? `No emails found matching "${searchQuery}". Try adjusting your search terms.`
              : 'Emails will appear here as they are processed and categorized by AI. New emails are processed automatically.'
            }
          </p>
          
          {!searchQuery && (
            <div className="space-y-2 text-sm text-gray-600">
              <p>🤖 <strong>AI Processing:</strong> New emails are categorized automatically</p>
              <p>📧 <strong>Email Sources:</strong> Check your connected Gmail accounts</p>
              <p>⚡ <strong>Processing Time:</strong> Usually takes a few minutes</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={handleSelectAll}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                {selectedEmails.length > 0 ? (
                  <span className="text-primary-700">
                    {selectedEmails.length} email{selectedEmails.length !== 1 ? 's' : ''} selected
                  </span>
                ) : (
                  'Select all'
                )}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {searchQuery && (
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>Filtered results</span>
                </div>
              )}
              <span>
                {emails.length} of {totalCount.toLocaleString()} emails
              </span>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {emails.map((email, index) => (
            <EmailItem
              key={email.id}
              email={email}
              isSelected={selectedEmails.includes(email.id)}
              onSelect={handleSelectEmail}
              onView={handleViewEmail}
              index={index}
            />
          ))}
        </div>

        {/* Pagination */}
        <PaginationControls
          page={page}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={onPageChange}
          loading={loading}
        />
      </div>

      {/* Email Detail Modal */}
      {viewingEmail && (
        <EmailDetailModal
          email={viewingEmail}
          onClose={() => setViewingEmail(null)}
        />
      )}
    </>
  );
}