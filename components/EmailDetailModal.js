 // components/EmailDetailModal.js - Complete Implementation
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  User, 
  Tag, 
  Mail,
  ExternalLink,
  Copy,
  Trash2,
  Zap,
  ChevronDown,
  ChevronUp,
  Bot,
  Eye,
  EyeOff,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const EmailDetailModal = ({ email, onClose }) => {
  const [showRawContent, setShowRawContent] = useState(false);
  const [showFullHeaders, setShowFullHeaders] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      const emailText = `
Subject: ${email.subject || 'No Subject'}
From: ${email.sender || 'Unknown Sender'}
Date: ${format(new Date(email.received_at), 'PPP p')}
Category: ${email.category_name || 'Uncategorized'}

AI Summary:
${email.ai_summary || 'No summary available'}

Content:
${email.body || 'No content available'}
      `.trim();

      await navigator.clipboard.writeText(emailText);
      setCopied(true);
      toast.success('Email copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy email');
    }
  };

  const handleExportEmail = () => {
    const emailData = {
      id: email.id,
      subject: email.subject,
      sender: email.sender,
      received_at: email.received_at,
      category: email.category_name,
      ai_summary: email.ai_summary,
      body: email.body,
      unsubscribe_link: email.unsubscribe_link
    };

    const blob = new Blob([JSON.stringify(emailData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${email.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Email exported successfully!');
  };

  const getSenderName = (sender) => {
    if (!sender) return 'Unknown Sender';
    const match = sender.match(/^(.*?)\s*<(.+)>$/);
    return match ? match[1].trim() || match[2] : sender;
  };

  const getSenderEmail = (sender) => {
    if (!sender) return '';
    const match = sender.match(/<(.+)>$/);
    return match ? match[1] : sender;
  };

  const formatEmailBody = (body) => {
    if (!body) return 'No content available';
    
    // Convert plain text line breaks to HTML
    return body
      .replace(/\r\n/g, '\n')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      .replace(/<p><\/p>/g, '');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {email.subject || 'No Subject'}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="font-medium text-gray-900">
                      {getSenderName(email.sender)}
                    </span>
                    {getSenderEmail(email.sender) !== getSenderName(email.sender) && (
                      <span className="text-gray-500 ml-1">
                        &lt;{getSenderEmail(email.sender)}&gt;
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{format(new Date(email.received_at), 'PPP p')}</span>
                </div>
                
                {email.category_name && (
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {email.category_name}
                    </span>
                  </div>
                )}
                
                {email.account_email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">{email.account_email}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyEmail}
                className="btn-secondary text-sm"
                title="Copy email content"
              >
                {copied ? (
                  <>
                    <Copy className="h-4 w-4 mr-2 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </button>
              
              <button
                onClick={handleExportEmail}
                className="btn-secondary text-sm"
                title="Export email as JSON"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                title="Close (Esc)"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
            {/* AI Summary Section */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                    🤖 AI Summary
                    <span className="ml-2 text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full">
                      Generated
                    </span>
                  </h3>
                  <p className="text-blue-800 leading-relaxed">
                    {email.ai_summary || 'No summary available for this email.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Unsubscribe Section */}
            {email.unsubscribe_link && (
              <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-gray-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-orange-100 rounded-lg">
                    <Zap className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-orange-900 mb-2">
                      🚫 Unsubscribe Available
                    </h3>
                    <p className="text-orange-800 text-sm mb-3">
                      This email contains an unsubscribe link. You can use our bulk unsubscribe feature to automatically unsubscribe from this sender.
                    </p>
                    <a
                      href={email.unsubscribe_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-orange-700 hover:text-orange-900 text-sm font-medium"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Manual Unsubscribe Link
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Email Body */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Email Content</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowRawContent(!showRawContent)}
                    className="btn-secondary text-sm"
                  >
                    {showRawContent ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Formatted View
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Raw Content
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                {showRawContent ? (
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono overflow-x-auto">
                    {email.body || 'No content available'}
                  </pre>
                ) : (
                  <div 
                    className="prose max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: formatEmailBody(email.body) 
                    }}
                  />
                )}
              </div>
            </div>

            {/* Email Metadata */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setShowFullHeaders(!showFullHeaders)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mb-4"
              >
                {showFullHeaders ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Hide Email Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show Email Details
                  </>
                )}
              </button>
              
              {showFullHeaders && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 text-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="font-medium text-gray-900 mb-1">Email ID</dt>
                      <dd className="text-gray-600 font-mono text-xs">{email.id}</dd>
                    </div>
                    
                    <div>
                      <dt className="font-medium text-gray-900 mb-1">Gmail ID</dt>
                      <dd className="text-gray-600 font-mono text-xs">{email.gmail_id || 'N/A'}</dd>
                    </div>
                    
                    <div>
                      <dt className="font-medium text-gray-900 mb-1">Processed At</dt>
                      <dd className="text-gray-600">
                        {email.processed_at 
                          ? format(new Date(email.processed_at), 'PPP p')
                          : 'Not processed'
                        }
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="font-medium text-gray-900 mb-1">Archive Status</dt>
                      <dd className="text-gray-600">
                        {email.archived ? (
                          <span className="text-green-600">✓ Archived</span>
                        ) : (
                          <span className="text-yellow-600">⏳ Pending</span>
                        )}
                      </dd>
                    </div>
                  </div>
                  
                  {email.unsubscribe_link && (
                    <div>
                      <dt className="font-medium text-gray-900 mb-1">Unsubscribe Link</dt>
                      <dd className="text-gray-600 break-all text-xs font-mono">
                        {email.unsubscribe_link}
                      </dd>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                💡 Use bulk actions in the email list to manage multiple emails at once
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmailDetailModal;