 // Beautiful login page with Google OAuth integration and feature showcase
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Mail, Zap, Shield, Bot, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Categorization',
    description: 'Automatically sort emails into custom categories using advanced AI'
  },
  {
    icon: Zap,
    title: 'Smart Summarization',
    description: 'Get instant AI-generated summaries of your important emails'
  },
  {
    icon: Shield,
    title: 'Automated Unsubscribe',
    description: 'Intelligently unsubscribe from unwanted newsletters and promotions'
  }
];

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/google');
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Failed to initiate Google login');
      setLoading(false);
    }
  };

  if (user) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Head>
        <title>AI Email Sorter - Smart Email Management</title>
        <meta name="description" content="Automatically categorize and manage your emails with AI-powered sorting and summarization" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left side - Features showcase */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-8">
                <Mail className="h-10 w-10 text-primary-600" />
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  AI Email Sorter
                </h1>
              </div>
              
              <h2 className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Transform your inbox into an organized, intelligent email management system
              </h2>
              
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right side - Login form */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white lg:bg-gray-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-md mx-auto w-full"
            >
              <div className="card p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Started
                  </h3>
                  <p className="text-gray-600">
                    Sign in with your Google account to begin organizing your emails
                  </p>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <div className="loading-spinner h-5 w-5" />
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    By signing in, you agree to our{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-700">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-700">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}