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
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
