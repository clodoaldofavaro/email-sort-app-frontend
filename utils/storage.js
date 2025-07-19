 // Client-side storage utilities for authentication data
export const storage = {
    getToken: () => {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem('authToken');
    },
    
    setToken: (token) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem('authToken', token);
    },
    
    removeToken: () => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('authToken');
    },
    
    getUser: () => {
      if (typeof window === 'undefined') return null;
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    
    setUser: (user) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem('user', JSON.stringify(user));
    },
    
    removeUser: () => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('user');
    },
  };