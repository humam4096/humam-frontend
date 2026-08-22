'use client';

import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react';
import { User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  /**
   * Fetch current session from API
   * Note: We always call the API because the session cookie is HttpOnly
   * and cannot be read by JavaScript
   */
  const fetchSession = useCallback(async () => {
    try {
      console.log('[AuthContext] Fetching session...');
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/session', {
        credentials: 'include',
        cache: 'no-store',
      });

      console.log('[AuthContext] Session response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        // console.log('[AuthContext] Session data:', data);
        setUser(data.authenticated ? data.user : null);
      } else {
        console.log('[AuthContext] Session response not OK');
        setUser(null);
      }
    } catch (err) {
      console.error('[AuthContext] Failed to fetch session:', err);
      setError('Failed to fetch session');
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  /**
   * Login user
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log('[AuthContext] Attempting login...');
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('[AuthContext] Login response:', { status: response.status, data });

      if (response.ok) {
        setUser(data.user);
        setInitialized(true);
        return { success: true };
      } else {
        setError(data.error || 'Login failed');
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error('[AuthContext] Login error:', err);
      const errorMessage = 'Failed to login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      setLoading(true);

      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setUser(null);
      setError(null);

      // Redirect to home
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    if (!initialized) {
      fetchSession();
    }
  }, [initialized, fetchSession]);

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    logout,
    refetch: fetchSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
