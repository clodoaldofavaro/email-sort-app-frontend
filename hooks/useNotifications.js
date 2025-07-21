import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useNotifications() {
  const [socket, setSocket] = useState(null);
  const queryClient = useQueryClient();

  // Fetch notifications
  const { data: notifications = [], isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`${API_URL}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token might be expired, handle auth error
          throw new Error('Authentication failed');
        }
        throw new Error('Failed to fetch notifications');
      }
      
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: !!localStorage.getItem('authToken'), // Only run query if token exists
    retry: false // Don't retry on auth errors
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId) => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`${API_URL}/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`${API_URL}/api/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  // Set up WebSocket connection
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const newSocket = io(API_URL, {
      auth: {
        token
      },
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Connected to notification server');
    });

    newSocket.on('notification', (notification) => {
      // Add the new notification to the cache
      queryClient.setQueryData('notifications', (old = []) => [notification, ...old]);
      
      // Show toast based on notification type
      const toastOptions = { duration: 5000 };
      
      switch (notification.type) {
        case 'unsubscribe_complete':
          toast.success(notification.message, { ...toastOptions, icon: '✅' });
          break;
        case 'unsubscribe_failed':
          toast.error(notification.message, { ...toastOptions, icon: '❌' });
          break;
        case 'unsubscribe_partial':
          toast(notification.message, { ...toastOptions, icon: '⚠️' });
          break;
        default:
          toast(notification.message, toastOptions);
      }
      
      // Play notification sound if available
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/icon-192x192.png'
          });
        }
      }
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from notification server');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [queryClient]);

  // Request notification permission
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    socket
  };
}