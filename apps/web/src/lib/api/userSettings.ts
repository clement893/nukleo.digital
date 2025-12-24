/**
 * User Settings API client for managing user preferences.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper to get auth token
import { TokenStorage } from '@/lib/auth/tokenStorage';

function getAuthToken(): string {
  return TokenStorage.getToken() || '';
}

export interface ThemePreferenceResponse {
  theme: 'light' | 'dark' | 'system';
  message: string;
}

export interface ThemePreferenceUpdate {
  theme: 'light' | 'dark' | 'system';
}

/**
 * Get current user's theme preference.
 * Requires authentication.
 */
export async function getThemePreference(
  token?: string
): Promise<ThemePreferenceResponse> {
  const authToken = token || getAuthToken();
  const response = await fetch(`${API_URL}/api/v1/user-settings/theme`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Failed to get theme preference: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update current user's theme preference.
 * Requires authentication.
 */
export async function updateThemePreference(
  theme: 'light' | 'dark' | 'system',
  token?: string
): Promise<ThemePreferenceResponse> {
  const authToken = token || getAuthToken();
  const response = await fetch(`${API_URL}/api/v1/user-settings/theme`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ theme }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Failed to update theme preference: ${response.statusText}`);
  }

  return response.json();
}

