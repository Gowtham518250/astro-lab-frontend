export const API_BASE_URL = "https://astro-lab-backend-sctj-production.up.railway.app";

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

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}
