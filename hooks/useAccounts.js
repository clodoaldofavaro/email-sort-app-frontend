 // Account management hooks for connecting multiple Gmail accounts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import toast from 'react-hot-toast';

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.get('/api/accounts').then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useRemoveAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accountId) => api.delete(`/api/accounts/${accountId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Account removed successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to remove account');
    },
  });
};