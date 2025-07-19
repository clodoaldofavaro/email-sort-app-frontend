import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/Layout/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { useAccounts } from '../hooks/useAccounts';
import { useEmailStats } from '../hooks/useEmails';
import { 
  User, 
  Shield, 
  Bell, 
  HelpCircle, 
  Mail, 
  BarChart3, 
  Settings as SettingsIcon,
  ExternalLink,
  RefreshCw,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

export default function Settings() {
  const { user, logout } = useAuth();
  const { data: accounts = [] } = useAccounts();
  const { data: stats } = useEmailStats();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    // Simulate refresh action
    setTimeout(() => {
      setIsRefreshing(false);
      // In real app, this would trigger data refetch
    }, 2000);
  };

  const handleExportData = () => {
    // In real app, this would export user data
    alert('Data export functionality would be implemented here');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In real app, this would delete the account
      alert('Account deletion would be implemented here');
    }
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Settings - AI Email Sorter</title>
        <meta name="description" content="Manage your account settings and preferences" />
      </Head>
      
      <DashboardLayout>
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your account and application preferences
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-16 w-16 rounded-full"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-primary-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Member since</dt>
                      <dd className="text-sm text-gray-900">
                        {user?.created_at ? format(new Date(user.created_at), 'MMMM d, yyyy') : 'Recently'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Account status</dt>
                      <dd className="text-sm text-gray-900 flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Active
                      </dd>
                    </div>
                  </dl>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={logout}
                    className="btn-secondary text-red-600 hover:bg-red-50 border-red-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Account Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Account Statistics</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats?.overview?.total_emails || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Emails</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats?.overview?.categories_used || 0}
                    </div>
                    <div className="text-sm text-gray-600">Categories</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {accounts.length}
                    </div>
                    <div className="text-sm text-gray-600">Connected Accounts</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats?.overview?.with_unsubscribe_link || 0}
                    </div>
                    <div className="text-sm text-gray-600">Unsubscribe Links</div>
                  </div>
                </div>
                
                <button
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                  className="w-full btn-secondary"
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Statistics
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Connected Accounts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Email Accounts</h2>
              </div>
              
              <div className="space-y-3">
                {accounts.length > 0 ? (
                  accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{account.email}</p>
                          <p className="text-xs text-gray-500">
                            Connected {format(new Date(account.created_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {account.is_connected ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-4 w-4 border-2 border-yellow-500 rounded-full" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No accounts connected</p>
                )}
              </div>
            </motion.div>

            {/* Security & Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Security & Privacy</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Account Security</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Your account is secured with Google OAuth 2.0 authentication
                  </p>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Two-factor authentication enabled via Google
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Data Processing</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Emails are processed securely and archived automatically
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Email content is processed locally and not stored permanently</li>
                    <li>• AI summaries are generated using OpenAI's secure API</li>
                    <li>• Unsubscribe automation uses secure browser automation</li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleExportData}
                    className="btn-secondary mr-3"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Export Data
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="btn-secondary text-red-600 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Bell className="h-5 w-5 text-yellow-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email Processing</h3>
                    <p className="text-sm text-gray-600">Get notified when emails are processed</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Weekly Summary</h3>
                    <p className="text-sm text-gray-600">Receive weekly email activity summary</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Error Notifications</h3>
                    <p className="text-sm text-gray-600">Get alerted about processing errors</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </motion.div>

            {/* Help & Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Help & Support</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">How it works</h3>
                  <p className="text-sm text-gray-600">
                    AI automatically categorizes your emails based on your custom categories and descriptions. 
                    The more specific your category descriptions, the better the AI performance.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Getting started</h3>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Create categories with detailed descriptions</li>
                    <li>2. Connect your Gmail accounts</li>
                    <li>3. Let AI process and organize your emails</li>
                    <li>4. Use bulk actions to manage emails efficiently</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Need help?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Contact our support team or check the documentation for detailed guides.
                  </p>
                  <div className="space-x-3">
                    <button className="btn-secondary text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Documentation
                    </button>
                    <button className="btn-secondary text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}