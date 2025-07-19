 // OAuth callback handler that processes Google authentication response
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Head from 'next/head';

export default function Callback() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const { code, error } = router.query;
      
      if (error) {
        toast.error('Authentication failed');
        router.push('/login');
        return;
      }
      
      if (!code) return;

      try {
        const response = await api.post('/auth/google/callback', { code });
        const { token, user } = response.data;
        
        await login(token, user);
        router.push('/dashboard');
      } catch (error) {
        console.error('Callback error:', error);
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