import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Users, 
  Zap, 
  Plus, 
  RefreshCw, 
  BarChart3,
  Calendar,
  Clock,
  Target
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import LoadingSpinner from './LoadingSpinner';

const StatCard = ({ title, subtitle, value, icon: Icon, color, trend, loading, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`card p-6 min-h-[120px] ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} transition-all duration-200`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center space-x-4">
        <div className={`flex-shrink-0 p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-xs text-gray-400 h-4">{subtitle || '\u00A0'}</p>
          </div>
          {loading ? (
            <div className="flex items-center space-x-2 mt-2">
              <LoadingSpinner size="sm" />
              <span className="text-gray-400">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {trend && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  trend > 0 
                    ? 'bg-green-100 text-green-800' 
                    : trend < 0 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const QuickActionCard = ({ title, description, icon: Icon, color, onClick, disabled = false, loading = false }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.02 } : {}}
    whileTap={!disabled ? { scale: 0.98 } : {}}
    onClick={onClick}
    disabled={disabled || loading}
    className={`card p-4 text-left w-full transition-all duration-200 ${
      disabled || loading
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:shadow-md cursor-pointer'
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${color}`}>
        {loading ? (
          <LoadingSpinner size="sm" className="text-white" />
        ) : (
          <Icon className="h-5 w-5 text-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-600 truncate">
          {loading ? 'Processing...' : description}
        </p>
      </div>
    </div>
  </motion.button>
);

export default function StatsOverview({ stats, loading, categories, onCreateCategory }) {
  const [processingEmails, setProcessingEmails] = useState(false);

  const handleProcessEmails = async () => {
    setProcessingEmails(true);
    try {
      const response = await api.post('/api/emails/process');
      
      // Show results
      const successCount = response.data.accounts.filter(a => a.status === 'success').length;
      const errorCount = response.data.accounts.filter(a => a.status === 'error').length;
      
      if (successCount > 0 && errorCount === 0) {
        toast.success(`Email processing completed for ${successCount} account${successCount > 1 ? 's' : ''}`);
      } else if (successCount > 0 && errorCount > 0) {
        toast.success(`Processed ${successCount} account${successCount > 1 ? 's' : ''}, ${errorCount} failed`);
      } else {
        toast.error('Failed to process emails');
      }
      
      // Optionally refresh stats
      window.location.reload();
    } catch (error) {
      console.error('Email processing error:', error);
      toast.error(error.response?.data?.error || 'Failed to process emails');
    } finally {
      setProcessingEmails(false);
    }
  };
  const statCards = [
    {
      title: 'Total Emails',
      value: loading ? '...' : (stats?.overview?.total_emails?.toLocaleString() || '0'),
      icon: Mail,
      color: 'bg-blue-500',
      trend: null, // Could calculate week-over-week growth
    },
    {
      title: 'Last 7 Days',
      value: loading ? '...' : (stats?.overview?.last_7_days?.toLocaleString() || '0'),
      icon: Calendar,
      color: 'bg-green-500',
      trend: 15, // Example trend data
    },
    {
      title: 'Categories In Use',
      subtitle: 'With emails',
      value: loading ? '...' : (stats?.overview?.categories_used?.toString() || '0'),
      icon: Users,
      color: 'bg-purple-500',
      trend: null,
    },
    {
      title: 'Unsubscribe Ready',
      value: loading ? '...' : (stats?.overview?.with_unsubscribe_link?.toLocaleString() || '0'),
      icon: Zap,
      color: 'bg-orange-500',
      trend: -5, // Example: 5% fewer emails with unsubscribe links
    },
  ];

  const quickActions = [
    {
      title: 'Create Category',
      description: 'Add a new email category',
      icon: Plus,
      color: 'bg-indigo-500',
      onClick: onCreateCategory,
    },
    {
      title: 'Process Emails',
      description: 'Manually trigger email processing',
      icon: RefreshCw,
      color: 'bg-blue-500',
      onClick: handleProcessEmails,
      disabled: processingEmails,
      loading: processingEmails,
    },
    {
      title: 'View Analytics',
      description: 'Detailed email statistics',
      icon: BarChart3,
      color: 'bg-green-500',
      onClick: () => {
        // In a real app, this would navigate to analytics page
        alert('Analytics page would open here');
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Email Statistics</h2>
          <button className="btn-secondary text-sm">
            <Clock className="h-4 w-4 mr-2" />
            Last updated: {new Date().toLocaleTimeString()}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} loading={loading} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Category Breakdown</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : categories?.length > 0 ? (
            <div className="space-y-4">
              {categories.slice(0, 5).map((category, index) => {
                const percentage = stats?.overview?.total_emails 
                  ? (category.email_count / stats.overview.total_emails) * 100 
                  : 0;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {category.email_count} email{category.email_count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-primary-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(2, percentage)}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {percentage.toFixed(1)}% of total emails
                    </div>
                  </motion.div>
                );
              })}
              
              {categories.length > 5 && (
                <div className="text-sm text-gray-500 text-center pt-2">
                  +{categories.length - 5} more categories
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No email categories yet</p>
              <button
                onClick={onCreateCategory}
                className="btn-primary text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Category
              </button>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <Zap className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <QuickActionCard {...action} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
                <Mail className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary-900 mb-1">
                  💡 Pro Tip
                </h4>
                <p className="text-sm text-primary-700">
                  The more specific your category descriptions, the better the AI will categorize your emails.
                  Include examples and key phrases that typically appear in those email types.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity (if you want to add this) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Email Processing Status</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>System Online</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700 mb-1">
              {loading ? '...' : (stats?.overview?.last_7_days || 0)}
            </div>
            <div className="text-sm text-green-600">Emails Processed</div>
            <div className="text-xs text-green-500 mt-1">Last 7 days</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700 mb-1">
              {loading ? '...' : Math.round((stats?.overview?.with_unsubscribe_link || 0) / Math.max(1, stats?.overview?.total_emails || 1) * 100)}%
            </div>
            <div className="text-sm text-blue-600">Unsubscribe Rate</div>
            <div className="text-xs text-blue-500 mt-1">Available actions</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-700 mb-1">
              {loading ? '...' : (categories?.length || 0)}
            </div>
            <div className="text-sm text-purple-600">Active Categories</div>
            <div className="text-xs text-purple-500 mt-1">Organizing emails</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}