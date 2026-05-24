/**
 * Central API base URL.
 *
 * Local dev  → VITE_API_URL is empty; Vite proxy rewrites:
 *   /api/*          → http://localhost:5000/api/*
 *   /_/backend/api/* → http://localhost:5000/api/*
 *
 * Production → Set VITE_API_URL=/_/backend in your deploy env.
 *   All fetch(`${API_BASE}/api/...`) calls become /_/backend/api/...
 *   which Netlify (or the experimental service router) forwards to the backend.
 */
const getApiBase = () => {
  if (typeof window !== 'undefined') {
    const { hostname, protocol } = window.location;
    
    // If we are on a live server or VPS IP (not localhost)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      const envUrl = import.meta.env.VITE_API_URL;
      // If a real production URL was provided in .env, use it
      if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
        return envUrl;
      }
      // Otherwise dynamically connect to the backend on the same server IP, port 5000
      return `${protocol}//${hostname}:5000`;
    }
  }

  // Local development fallback
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

const API_BASE = getApiBase();

export default API_BASE;
