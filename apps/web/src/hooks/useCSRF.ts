/**
 * useCSRF Hook
 * Hook React pour gérer les tokens CSRF côté client
 */

'use client';

import { useEffect, useState } from 'react';

export function useCSRF() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCSRFToken() {
      try {
        const response = await fetch('/api/csrf');
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCSRFToken();
  }, []);

  return { csrfToken, loading };
}

/**
 * Helper function to add CSRF token to fetch requests
 */
export function withCSRF(
  url: string,
  options: RequestInit = {}
): [string, RequestInit] {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrf-token='))
    ?.split('=')[1];

  const headers = new Headers(options.headers);
  if (token) {
    headers.set('X-CSRF-Token', token);
  }

  return [url, { ...options, headers }];
}

