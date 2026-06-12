import { useState, useEffect, useCallback } from 'react';
import API_BASE from './api';

export async function fetchConsultationCatalog() {
  const res = await fetch(`${API_BASE}/api/consultations/services`);
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || data.error || 'Failed to load consultation services');
  }
  return {
    categories: data.categories || [],
    services: data.services || [],
  };
}

export async function fetchConsultationService(serviceId) {
  const res = await fetch(`${API_BASE}/api/consultations/services/${serviceId}`);
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || data.error || 'Service not found');
  }
  return data.service;
}

export function useConsultationCatalog() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchConsultationCatalog();
      setCategories(data.categories);
      setServices(data.services);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { categories, services, loading, error, reload };
}

export function useConsultationService(serviceId) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!serviceId) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchConsultationService(serviceId);
        if (!cancelled) setService(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [serviceId]);

  return { service, loading, error };
}
