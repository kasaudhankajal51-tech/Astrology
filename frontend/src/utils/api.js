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
  // 1. Use environment variable if provided (Vite embeds this at build time)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 2. Fallback: If we are on a live server (not localhost), 
  // assume the backend is on the same IP but at port 5000
  if (typeof window !== 'undefined') {
    const { hostname, protocol } = window.location;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `${protocol}//${hostname}:5000`;
    }
  }

  // 3. Local dev fallback
  return '';
};

const API_BASE = getApiBase();

export default API_BASE;
