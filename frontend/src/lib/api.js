import axios from 'axios';
import { CONFIG } from '@/config/env';

const AUTH_TOKEN_KEY = 'auth_token';

const api = axios.create({
  baseURL: CONFIG.backendUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request Interceptor — Attach Bearer Token ────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor — Handle 401 Unauthorized ───────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only act if a token was stored (meaning it expired or was revoked).
      // If there's no token, the user is just a guest on a public page
      // and we should NOT redirect — let the component handle it.
      const hadToken = !!localStorage.getItem(AUTH_TOKEN_KEY);

      localStorage.removeItem(AUTH_TOKEN_KEY);

      // Dispatch a custom event so other parts of the app (e.g. Redux
      // store, React context) can react to the forced logout.
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));

      // Only redirect if the user HAD a token (session expired)
      // and they're not already on login or a public page
      if (hadToken && window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// ── Token helpers ────────────────────────────────────────────
/** Persist the token after a successful login / register. */
export function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/** Remove the token (used on logout). */
export function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/** Check whether a token currently exists. */
export function hasAuthToken() {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

// ── Auth API Methods ─────────────────────────────────────────
export const authApi = {
  /**
   * Login — send credentials, receive a token, persist it.
   * Expected backend response shape: { token: "...", user: {...} }
   */
  async login(credentials) {
    const response = await api.post('/api/login', credentials);
    const { token } = response.data;
    if (token) {
      setAuthToken(token);
    }
    return response.data;
  },

  /**
   * Register — create account, receive a token, persist it.
   * Expected backend response shape: { token: "...", user: {...} }
   */
  async register(userData) {
    const response = await api.post('/api/register', userData);
    const { token } = response.data;
    if (token) {
      setAuthToken(token);
    }
    return response.data;
  },

  /**
   * Logout — tell the backend to revoke the token, then clean up locally.
   */
  async logout() {
    try {
      await api.post('/api/logout');
    } finally {
      // Always clear locally, even if the server request fails
      removeAuthToken();
    }
  },

  /**
   * Get the currently authenticated user.
   * If the token is invalid the 401 interceptor handles cleanup.
   */
  async getUser() {
    const response = await api.get('/api/user');
    return response.data;
  },
};

// ── Default Export ────────────────────────────────────────────
export default api;