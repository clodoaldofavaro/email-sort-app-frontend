import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Settings, 
  BarChart3,
  Folder,
  Home,
  ChevronDown,
  Bell,
  Search,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { useCategories } from '../../hooks/useCategories';
import NotificationBell from '../NotificationBell';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Analytics', icon: BarChart3, comingSoon: true },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const NavigationItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  
  const handleClick = (e) => {
    if (item.comingSoon) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick();
  };
  
  const content = (
    <div
      className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
          : item.comingSoon
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        {item.name}
      </div>
      {item.comingSoon && (
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
          Coming Soon
        </span>
      )}
    </div>
  );
  
  if (item.comingSoon) {
    return (
      <div onClick={handleClick}>
        {content}
      </div>
    );
  }
  
  return (
    <Link href={item.href} onClick={handleClick}>
      {content}
    </Link>
  );
};

const CategoryItem = ({ category, isActive, onClick }) => {
  return (
    <Link
      href={`/category/${category.id}`}
      className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all duration-200 group ${
        isActive
          ? 'bg-primary-50 text-primary-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center min-w-0 flex-1">
        <Folder className="h-4 w-4 mr-2 flex-shrink-0" />
        <span className="truncate">{category.name}</span>
      </div>
      {category.email_count > 0 && (
        <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
          isActive 
            ? 'bg-primary-200 text-primary-800' 
            : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
        }`}>
          {category.email_count}
        </span>
      )}
    </Link>
  );
};

const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative user-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex-shrink-0">
          {user?.picture ? (
            <img
              className="h-8 w-8 rounded-full"
              src={user.picture}
              alt={user.name}
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {user?.email}
          </p>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-3" />
              Account Settings
            </Link>
            
            <Link
              href="/help"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="h-4 w-4 mr-3" />
              Help & Support
            </Link>
            
            <hr className="my-1" />
            
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  
  const { data: categories = [] } = useCategories();

  const isActive = (href) => {
    if (!href) return false;
    if (href === '/dashboard') {
      return router.pathname === '/dashboard';
    }
    return router.pathname.startsWith(href);
  };

  const isCategoryActive = (categoryId) => {
    return router.pathname === `/category/${categoryId}`;
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false);
    };

    router.events?.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={handleSidebarClose}
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden"
          >
            <SidebarContent
              navigation={navigation}
              categories={categories}
              categoriesExpanded={categoriesExpanded}
              setCategoriesExpanded={setCategoriesExpanded}
              isActive={isActive}
              isCategoryActive={isCategoryActive}
              user={user}
              logout={logout}
              onItemClick={handleSidebarClose}
              showCloseButton={true}
              onClose={handleSidebarClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent
          navigation={navigation}
          categories={categories}
          categoriesExpanded={categoriesExpanded}
          setCategoriesExpanded={setCategoriesExpanded}
          isActive={isActive}
          isCategoryActive={isCategoryActive}
          user={user}
          logout={logout}
          showCloseButton={false}
        />
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-primary-600" />
              <span className="font-semibold text-gray-900">AI Email Sorter</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md">
                <Search className="h-5 w-5" />
              </button>
              <NotificationBell />
              {user?.picture ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.picture}
                  alt={user.name}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <div className="mb-2 sm:mb-0">
              © {new Date().getFullYear()} AI Email Sorter. Made with ❤️ for better email management.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Sidebar content component (shared between mobile and desktop)
const SidebarContent = ({
  navigation,
  categories,
  categoriesExpanded,
  setCategoriesExpanded,
  isActive,
  isCategoryActive,
  user,
  logout,
  onItemClick,
  showCloseButton,
  onClose
}) => {
  return (
    <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">AI Email Sorter</span>
        </div>
        <div className="flex items-center space-x-2">
          {!showCloseButton && <NotificationBell />}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </h3>
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavigationItem
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
                onClick={onItemClick}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </h3>
            <button
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                categoriesExpanded ? 'rotate-180' : ''
              }`} />
            </button>
          </div>
          
          <AnimatePresence initial={false}>
            {categoriesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 overflow-hidden"
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      isActive={isCategoryActive(category.id)}
                      onClick={onItemClick}
                    />
                  ))
                ) : (
                  <div className="text-sm text-gray-500 italic px-4 py-2">
                    No categories yet
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Stats</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Categories:</span>
              <span className="font-medium">{categories.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Emails:</span>
              <span className="font-medium">
                {categories.reduce((sum, cat) => sum + Number(cat.email_count || 0), 0)}
              </span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        <UserDropdown user={user} onLogout={logout} />
      </div>
    </div>
  );
};