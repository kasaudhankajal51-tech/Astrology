import { useState, useEffect, useCallback } from 'react';
import API_BASE from './api';
import { getConsultationServiceById } from '../data/consultationCatalog';

export async function fetchConsultationCatalog() {
  try {
    const res = await fetch(`${API_BASE}/api/consultations/services`);
    const data = await res.json();
    if (data.success) {
      return {
        categories: data.categories || [],
        services: data.services || [],
      };
    }
  } catch {
    /* fall through to static catalog */
  }

  const { getAllConsultationServices, CONSULTATION_CATEGORIES } = await import('../data/consultationCatalog');
  const services = getAllConsultationServices();
  const categories = CONSULTATION_CATEGORIES.map((cat) => ({
    id: cat.id,
    slug: cat.id,
    name: cat.name,
    icon: cat.icon,
    description: cat.description,
    cards: cat.cards.map((card) => ({
      ...card,
      priceLabel: `₹${Number(card.price).toLocaleString('en-IN')}`,
    })),
  }));
  return { categories, services: services.map((s) => ({ ...s, priceLabel: s.priceLabel || `₹${Number(s.price).toLocaleString('en-IN')}` })) };
}

export async function fetchConsultationService(serviceId) {
  try {
    const res = await fetch(`${API_BASE}/api/consultations/services/${serviceId}`);
    const data = await res.json();
    if (res.ok && data.success) {
      return data.service;
    }
  } catch {
    /* fall through */
  }

  const fallback = getConsultationServiceById(serviceId);
  if (fallback) {
    return {
      ...fallback,
      priceLabel: fallback.priceLabel || `₹${Number(fallback.price).toLocaleString('en-IN')}`,
    };
  }

  throw new Error('Service not found');
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
