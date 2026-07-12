const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';
export const API_BASE_URL = configuredApiBaseUrl.replace(/\/$/, '');

/**
 * A wrapper around the native fetch API that automatically injects
 * the JWT Bearer token into the headers.
 */
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('astro_lab_token') : null;

  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Default to JSON if body is provided and Content-Type isn't explicitly set
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const normalizedEndpoint = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(normalizedEndpoint, {
    ...options,
    headers,
    credentials: 'include',
  });

  return response;
}
