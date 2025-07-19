import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/Layout/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import CategoryList from '../components/CategoryList';
import AccountList from '../components/AccountList';
import StatsOverview from '../components/StatsOverview';
import AddCategoryModal from '../components/AddCategoryModal';
import { useAuth } from '../hooks/useAuth';
import { useCategories } from '../hooks/useCategories';
import { useAccounts } from '../hooks/useAccounts';
import { useEmailStats } from '../hooks/useEmails';
import { Plus, Mail, Settings, BarChart3 } from 'lucide-react';

const tabs = [
  { id: 'overview', name: 'Overview', icon: BarChart3 },
  { id: 'categories', name: 'Categories', icon: Mail },
  { id: 'accounts', name: 'Accounts', icon: Settings },
];

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: accounts = [], isLoading: accountsLoading } = useAccounts();
  const { data: stats, isLoading: statsLoading } = useEmailStats();

  // Handle tab query parameter
  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    }
  }, [router.query.tab]);

  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard - AI Email Sorter</title>
        <meta name="description" content="Manage your AI-powered email categorization and view statistics" />
      </Head>
      
      <DashboardLayout>
        <div className="p-6">
          {/* Welcome header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your email management.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <StatsOverview 
                stats={stats} 
                loading={statsLoading} 
                categories={categories}
                onCreateCategory={() => setShowAddCategory(true)}
              />
            )}

            {activeTab === 'categories' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Email Categories</h2>
                    <p className="text-gray-600">Organize your emails with AI-powered categorization</p>
                  </div>
                  <button
                    onClick={() => setShowAddCategory(true)}
                    className="btn-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </button>
                </div>
                <CategoryList categories={categories} loading={categoriesLoading} />
              </div>
            )}

            {activeTab === 'accounts' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Connected Accounts</h2>
                  <p className="text-gray-600">Manage your Gmail accounts for email processing</p>
                </div>
                <AccountList accounts={accounts} loading={accountsLoading} />
              </div>
            )}
          </motion.div>
        </div>

        {/* Add Category Modal */}
        {showAddCategory && (
          <AddCategoryModal
            onClose={() => setShowAddCategory(false)}
            onSuccess={() => setShowAddCategory(false)}
          />
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}