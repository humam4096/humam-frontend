'use client';

import { useState, useEffect } from 'react';
import { User, MOCK_USER } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { user, loading };
}
