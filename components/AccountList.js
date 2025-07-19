import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  ExternalLink,
  Shield,
  Clock
} from 'lucide-react';
import { useRemoveAccount } from '../hooks/useAccounts';
import { format } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

export default function AccountList({ accounts, loading }) {
  const [connecting, setConnecting] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [testingId, setTestingId] = useState(null);
  const removeAccount = useRemoveAccount();

  const handleAddAccount = async () => {
    setConnecting(true);
    try {
      const response = await api.get('/auth/google');
      // Add prompt=consent to force account selection
      const url = new URL(response.data.url);
      url.searchParams.set('prompt', 'consent');
      url.searchParams.set('access_type', 'offline');
      
      toast.success('Redirecting to Google...');
      window.location.href = url.toString();
    } catch (error) {
      console.error('Add account error:', error);
      toast.error('Failed to connect account');
      setConnecting(false);
    }
  };

  const handleRemoveAccount = async (accountId, email) => {
    if (!confirm(`Remove account ${email}?\n\nThis will stop processing emails from this account. You can reconnect it later if needed.`)) return;
    
    setRemovingId(accountId);
    try {
      await removeAccount.mutateAsync(accountId);
    } catch (error) {
      // Error handled by mutation
    } finally {
      setRemovingId(null);
    }
  };

  const handleTestConnection = async (accountId, email) => {
    setTestingId(accountId);
    try {
      const response = await api.post(`/api/accounts/${accountId}/test`);
      if (response.data.connected) {
        toast.success(`✅ ${email} is connected and working!`);
      } else {
        toast.error(`❌ ${email} connection failed`);
      }
    } catch (error) {
      toast.error(`Connection test failed for ${email}`);
    } finally {
      setTestingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connected accounts */}
      {accounts.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Connected Accounts ({accounts.length})
          </h3>
          <div className="space-y-3">
            {accounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Account Avatar */}
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center relative">
                        <Mail className="h-6 w-6 text-primary-600" />
                        {/* Status indicator */}
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          account.is_connected ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                      </div>
                    </div>
                    
                    {/* Account Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-gray-900 truncate">
                          {account.email}
                        </p>
                        {account.is_connected ? (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" title="Connected" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" title="Connection issue" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Added {format(new Date(account.created_at), 'MMM d, yyyy')}</span>
                        </div>
                        
                        {account.updated_at !== account.created_at && (
                          <div className="flex items-center space-x-1">
                            <RefreshCw className="h-3 w-3" />
                            <span>Updated {format(new Date(account.updated_at), 'MMM d')}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span>{account.provider || 'Google'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {/* Test Connection */}
                    <button
                      onClick={() => handleTestConnection(account.id, account.email)}
                      disabled={testingId === account.id}
                      className="btn-secondary text-xs"
                      title="Test connection"
                    >
                      {testingId === account.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Test
                        </>
                      )}
                    </button>
                    
                    {/* Remove Account */}
                    <button
                      onClick={() => handleRemoveAccount(account.id, account.email)}
                      disabled={removingId === account.id || accounts.length <= 1}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={accounts.length <= 1 ? "Cannot remove the last account" : "Remove account"}
                    >
                      {removingId === account.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Connection Status Details */}
                {!account.is_connected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Connection Issue</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          This account may need to be reconnected. Click "Test" to check the connection or remove and re-add the account.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Account Features */}
                <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">Status</div>
                    <div className={`text-xs ${account.is_connected ? 'text-green-600' : 'text-yellow-600'}`}>
                      {account.is_connected ? 'Active' : 'Needs Attention'}
                    </div>
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">Processing</div>
                    <div className="text-green-600 text-xs">Enabled</div>
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">Auto-Archive</div>
                    <div className="text-green-600 text-xs">On</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add account section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Add Gmail Account
        </h3>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: accounts.length * 0.1 }}
        >
          <button
            onClick={handleAddAccount}
            disabled={connecting}
            className="w-full flex items-center justify-center py-4 px-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connecting ? (
              <>
                <LoadingSpinner size="sm" className="mr-3" />
                <span className="font-medium">Connecting to Google...</span>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Connect Another Gmail Account</div>
                  <div className="text-sm text-gray-500">Add multiple accounts for comprehensive email management</div>
                </div>
              </>
            )}
          </button>
        </motion.div>

        {/* Help text */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Secure Connection</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Each account is secured with Google OAuth 2.0</p>
                <p>• We only access email metadata and content for processing</p>
                <p>• Emails are automatically archived after AI categorization</p>
                <p>• You can disconnect accounts anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {accounts.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts connected</h3>
            <p className="text-gray-500 mb-6">
              Connect your first Gmail account to start organizing your emails with AI-powered categorization.
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>🚀 <strong>Get started:</strong> Connect your Gmail account</p>
              <p>🤖 <strong>AI sorts:</strong> Emails automatically categorized</p>
              <p>📧 <strong>Stay organized:</strong> Clean inbox, sorted emails</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Multiple accounts benefits */}
      {accounts.length >= 1 && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <ExternalLink className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">💡 Multiple Account Benefits</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• <strong>Unified management:</strong> Handle personal and work emails in one place</p>
                <p>• <strong>Smart categorization:</strong> AI learns patterns across all accounts</p>
                <p>• <strong>Bulk operations:</strong> Unsubscribe and organize across accounts</p>
                <p>• <strong>Separate processing:</strong> Each account's emails remain distinct</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}