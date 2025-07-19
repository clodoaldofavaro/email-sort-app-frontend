 // OAuth callback handler that processes Google authentication response
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Head from 'next/head';

export default function Callback() {
  const router = useRouter();
  const { login } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      const { code, error } = router.query;
      
      if (error) {
        toast.error('Authentication failed');
        router.push('/login');
        return;
      }
      
      if (!code || hasProcessed.current) return;
      
      hasProcessed.current = true;

      try {
        const response = await api.post('/api/auth/google/callback', { code });
        const { token, user } = response.data;
        
        await login(token, user);
        toast.success('Successfully logged in!');
        router.push('/dashboard');
      } catch (error) {
        console.error('Callback error:', error);
        if (error.response?.data?.message?.includes('invalid_grant')) {
          // Code already used, likely a duplicate request
          // Check if user is already authenticated
          const token = localStorage.getItem('token');
          if (token) {
            router.push('/dashboard');
            return;
          }
        }
        toast.error('Authentication failed');
        router.push('/login');
      }
    };

    handleCallback();
  }, [router.query, login, router]);

  return (
    <>
      <Head>
        <title>Signing you in... - AI Email Sorter</title>
      </Head>
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Signing you in...</p>
      </div>
    </>
  );
}