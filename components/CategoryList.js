import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Folder, ArrowRight, Edit2, Trash2, Mail } from 'lucide-react';
import { useDeleteCategory } from '../hooks/useCategories';
import LoadingSpinner from './LoadingSpinner';

export default function CategoryList({ categories, loading }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const deleteCategory = useDeleteCategory();

  const handleDelete = async (categoryId, categoryName) => {
    if (!confirm(`Are you sure you want to delete "${categoryName}"? This action cannot be undone.`)) return;
    
    setDeletingId(categoryId);
    try {
      await deleteCategory.mutateAsync(categoryId);
    } catch (error) {
      // Error is handled by the mutation hook
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (categoryId) => {
    // TODO: Implement edit functionality
    console.log('Edit category:', categoryId);
    // This would open an edit modal in a real implementation
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="max-w-sm mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gray-100 rounded-full">
              <Folder className="h-16 w-16 text-gray-300" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
          <p className="text-gray-500 mb-6">
            Create your first category to start organizing your emails with AI-powered sorting.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>💡 <strong>Tip:</strong> Be specific in your category descriptions</p>
            <p>🤖 The more detail you provide, the better the AI categorization</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="card p-6 h-full hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden">
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="flex items-center space-x-3 flex-1 cursor-pointer"
                  onClick={() => router.push(`/category/${category.id}`)}
                >
                  <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <Folder className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors truncate">
                      {category.name}
                    </h3>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(category.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors"
                    title="Edit category"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(category.id, category.name);
                    }}
                    disabled={deletingId === category.id}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white rounded transition-colors disabled:opacity-50"
                    title="Delete category"
                  >
                    {deletingId === category.id ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Description */}
              <div 
                className="mb-4 cursor-pointer"
                onClick={() => router.push(`/category/${category.id}`)}
              >
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {category.description}
                </p>
              </div>
              
              {/* Footer */}
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => router.push(`/category/${category.id}`)}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">
                      {category.email_count || 0}
                    </span>
                    <span>
                      email{(category.email_count || 0) !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span className="text-sm font-medium">View emails</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Progress indicator for categories with emails */}
            {(category.email_count || 0) > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                <div 
                  className="h-full bg-primary-500 transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, ((category.email_count || 0) / 50) * 100)}%` 
                  }}
                ></div>
              </div>
            )}
          </div>
        </motion.div>
      ))}

    </div>
  );
}