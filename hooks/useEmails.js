 // Email management hooks for fetching and manipulating email data
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import toast from 'react-hot-toast';

export const useEmails = (categoryId, page = 1, limit = 20, accountId = null, hasUnsubscribe = null) => {
  return useQuery({
    queryKey: ['emails', categoryId, page, limit, accountId, hasUnsubscribe],
    queryFn: () => {
      let url = `/api/emails/category/${categoryId}?page=${page}&limit=${limit}`;
      if (accountId) {
        url += `&accountId=${accountId}`;
      }
      if (hasUnsubscribe !== null) {
        url += `&hasUnsubscribe=${hasUnsubscribe}`;
      }
      return api.get(url).then(res => res.data);
    },
    enabled: !!categoryId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useEmail = (emailId) => {
  return useQuery({
    queryKey: ['email', emailId],
    queryFn: () => api.get(`/api/emails/${emailId}`).then(res => res.data),
    enabled: !!emailId,
  });
};

export const useBulkDeleteEmails = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
          mutationFn: (emailIds) => api.delete('/api/emails/bulk', { data: { emailIds } }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      toast.success(`${data.data.deletedCount} emails deleted successfully!`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to delete emails');
    },
  });
};

export const useBulkUnsubscribe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
          mutationFn: (emailIds) => api.post('/api/unsubscribe/batch', { emailIds }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      const { summary } = data;
      toast.success(`Unsubscribed from ${summary.successful}/${summary.total} emails`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to unsubscribe from emails');
    },
  });
};

export const useEmailStats = () => {
  return useQuery({
    queryKey: ['email-stats'],
    queryFn: () => api.get('/api/emails/stats/overview').then(res => res.data),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};