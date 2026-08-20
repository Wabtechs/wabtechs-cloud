/**
 * @wabtechs/sdk — Client HTTP pour Wabtechs Core API.
 *
 * Indépendant de @wabtechs/ui — ce package gère uniquement la communication.
 */

import type { ApiResponse, MeResponse, SessionResponse, LoginInput } from './schemas';

const BASE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE_URL) ||
  'https://api.wabtechs.com';

let _token: string | null = null;

export function setToken(token: string | null) {
  _token = token;
}

export function getToken(): string | null {
  return _token;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (_token) {
    headers.set('Authorization', `Bearer ${_token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      _token = null;
    }
    const body = await response.json().catch(() => ({}));
    return {
      success: false,
      data: undefined as T,
      error: (body as { error?: string }).error || `Erreur HTTP ${response.status}`,
    };
  }

  return response.json() as Promise<ApiResponse<T>>;
}

export const AuthClient = {
  async login(input: LoginInput): Promise<ApiResponse<{ token: string }>> {
    const result = await request<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (result.success && result.data) {
      setToken(result.data.token);
    }
    return result;
  },

  async me(): Promise<ApiResponse<MeResponse>> {
    return request<MeResponse>('/auth/me');
  },

  async session(): Promise<ApiResponse<SessionResponse>> {
    return request<SessionResponse>('/auth/session');
  },

  async logout(): Promise<ApiResponse<void>> {
    const result = await request<void>('/auth/logout', { method: 'POST' });
    setToken(null);
    return result;
  },
};
