import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, FolderOpen } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function CategorySelectionModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  categories = [], 
  currentCategoryId,
  emailCount,
  isLoading = false 
}) {
  const availableCategories = categories.filter(cat => cat.id !== currentCategoryId);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <FolderOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Move {emailCount} email{emailCount !== 1 ? 's' : ''} to category
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select a category to move the selected emails to. This will help improve future categorization.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  {availableCategories.length === 0 ? (
                    <p className="text-center text-sm text-gray-500 py-4">
                      No other categories available
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {availableCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => onConfirm(category.id)}
                          disabled={isLoading}
                          className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <div className="font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500 mt-1">{category.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 sm:mt-6 flex gap-3">
                  <button
                    type="button"
                    className="flex-1 btn-secondary"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  {isLoading && (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="sm" />
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}