import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Folder, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
import { useCreateCategory } from '../hooks/useCategories';
import LoadingSpinner from './LoadingSpinner';

const categoryExamples = [
  {
    name: "Newsletters",
    description: "Marketing emails, newsletters, promotional content, and subscription updates from companies and services I follow."
  },
  {
    name: "Bills & Finance",
    description: "Bank statements, credit card bills, payment confirmations, invoices, tax documents, and financial notifications."
  },
  {
    name: "Work & Business",
    description: "Work-related emails, project updates, meeting invitations, client communications, and professional correspondence."
  },
  {
    name: "Travel & Bookings",
    description: "Flight confirmations, hotel reservations, travel itineraries, booking confirmations, and travel-related updates."
  },
  {
    name: "Shopping & Orders",
    description: "Order confirmations, shipping notifications, delivery updates, receipts, and e-commerce communications."
  },
  {
    name: "Social & Personal",
    description: "Personal emails from friends and family, social media notifications, and casual correspondence."
  }
];

export default function AddCategoryModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Examples, 3: Success
  const [selectedExample, setSelectedExample] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const createCategory = useCreateCategory();

  const formData = watch();

  useEffect(() => {
    // Focus on name input when modal opens
    const nameInput = document.getElementById('category-name');
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 100);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await createCategory.mutateAsync(data);
      setStep(3); // Show success step
      setTimeout(() => {
        onSuccess();
        reset();
      }, 1500);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleUseExample = (example) => {
    setValue('name', example.name);
    setValue('description', example.description);
    setSelectedExample(example);
    setStep(1); // Go back to form
  };

  const handleClose = () => {
    if (!createCategory.isLoading) {
      reset();
      setStep(1);
      setSelectedExample(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
                <Folder className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {step === 1 ? 'Create Email Category' : 
                   step === 2 ? 'Category Examples' : 
                   'Category Created!'}
                </h3>
                <p className="text-sm text-gray-600">
                  {step === 1 ? 'Define how AI should categorize your emails' :
                   step === 2 ? 'Choose from popular category templates' :
                   'Your new category is ready to use'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={createCategory.isLoading}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Step 1: Form */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Category Name */}
                  <div>
                    <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name *
                    </label>
                    <input
                      id="category-name"
                      type="text"
                      {...register('name', { 
                        required: 'Category name is required',
                        maxLength: { value: 100, message: 'Name must be less than 100 characters' },
                        pattern: {
                          value: /^[a-zA-Z0-9\s&-]+$/,
                          message: 'Name can only contain letters, numbers, spaces, hyphens, and ampersands'
                        }
                      })}
                      className="input-field"
                      placeholder="e.g., Newsletters, Bills, Work Emails"
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Category Description */}
                  <div>
                    <label htmlFor="category-description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="category-description"
                      {...register('description', { 
                        required: 'Description is required',
                        minLength: { value: 20, message: 'Description must be at least 20 characters' },
                        maxLength: { value: 500, message: 'Description must be less than 500 characters' }
                      })}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Describe what types of emails should be categorized here. Be specific about senders, subjects, content, and any keywords that typically appear in these emails..."
                      maxLength={500}
                    />
                    <div className="flex justify-between items-start mt-2">
                      <div>
                        {errors.description && (
                          <p className="text-red-600 text-sm flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {formData.description?.length || 0}/500
                      </p>
                    </div>
                  </div>

                  {/* AI Tips */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for Better AI Categorization</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• <strong>Be specific:</strong> Include typical senders, subjects, and keywords</li>
                          <li>• <strong>Add examples:</strong> Mention specific companies or email types</li>
                          <li>• <strong>Include patterns:</strong> Describe common phrases or formatting</li>
                          <li>• <strong>Think comprehensively:</strong> Cover all variations of this email type</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-secondary"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      See Examples
                    </button>
                    
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={createCategory.isLoading}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={createCategory.isLoading}
                        className="btn-primary"
                      >
                        {createCategory.isLoading ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Creating...
                          </>
                        ) : (
                          'Create Category'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Examples */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6"
              >
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Popular Category Templates</h4>
                  <p className="text-sm text-gray-600">
                    Click on any example to use it as a starting point. You can customize it afterwards.
                  </p>
                </div>

                <div className="space-y-3">
                  {categoryExamples.map((example, index) => (
                    <motion.button
                      key={example.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleUseExample(example)}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                          <Folder className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 mb-1">{example.name}</h5>
                          <p className="text-sm text-gray-600 line-clamp-2">{example.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                  >
                    ← Back to Form
                  </button>
                  <button
                    onClick={handleClose}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6"
              >
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </motion.div>
                  
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg font-medium text-gray-900 mb-2"
                  >
                    Category Created Successfully!
                  </motion.h4>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 mb-6"
                  >
                    Your new "{formData.name}" category is ready. The AI will start categorizing matching emails automatically.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                  >
                    <p className="text-sm text-green-800">
                      🎉 <strong>What's next?</strong> New emails will be automatically sorted into this category based on your description. You can view and manage them from the dashboard.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}