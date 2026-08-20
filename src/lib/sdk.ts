import { setToken, getToken, AuthClient } from '@wabtechs/sdk';

const CORE_API_URL = process.env.NEXT_PUBLIC_CORE_API_URL || '';

function getHeaders(): Record<string, string> {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'X-Client': 'wabtechs-cloud',
    'X-Client-Version': '0.1.0',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const sdk = {
  async get(path: string, params?: Record<string, unknown>) {
    const url = new URL(path, CORE_API_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) url.searchParams.set(key, String(value));
      });
    }
    const response = await fetch(url.toString(), { headers: getHeaders() });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },

  async post(path: string, body?: unknown) {
    const response = await fetch(`${CORE_API_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  },

  async patch(path: string, body?: unknown) {
    const response = await fetch(`${CORE_API_URL}${path}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },

  async delete(path: string) {
    const response = await fetch(`${CORE_API_URL}${path}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },
};

export { AuthClient, setToken, getToken };
