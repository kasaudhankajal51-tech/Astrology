import ConsultationCategory from '../models/ConsultationCategory.js';
import ConsultationService from '../models/ConsultationService.js';
import { CONSULTATION_CATEGORIES } from '../data/consultationCatalog.js';

export const formatPriceLabel = (price) => `₹${Number(price).toLocaleString('en-IN')}`;

export const formatServiceDoc = (service, categoryName = '') => ({
  id: service.slug,
  slug: service.slug,
  categoryId: service.categorySlug,
  category: categoryName,
  title: service.title,
  short: service.short || service.title,
  desc: service.desc,
  price: service.price,
  priceLabel: formatPriceLabel(service.price),
  duration: service.duration || '',
  badge: service.badge || '',
  badgeColor: service.badgeColor || 'purple',
  img: service.img || '',
  highlights: service.highlights || [],
  sortOrder: service.sortOrder ?? 0,
  isActive: service.isActive !== false,
});

export const buildPublicCatalog = async ({ includeInactive = false } = {}) => {
  const catFilter = includeInactive ? {} : { isActive: true };
  const svcFilter = includeInactive ? {} : { isActive: true };

  const [categories, services] = await Promise.all([
    ConsultationCategory.find(catFilter).sort({ sortOrder: 1, name: 1 }).lean(),
    ConsultationService.find(svcFilter).sort({ sortOrder: 1, title: 1 }).lean(),
  ]);

  const categoryNameBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

  const formattedServices = services.map((s) =>
    formatServiceDoc(s, categoryNameBySlug[s.categorySlug] || '')
  );

  const servicesByCategory = formattedServices.reduce((acc, svc) => {
    if (!acc[svc.categoryId]) acc[svc.categoryId] = [];
    acc[svc.categoryId].push({
      id: svc.id,
      title: svc.title,
      short: svc.short,
      desc: svc.desc,
      price: svc.price,
      priceLabel: svc.priceLabel,
      duration: svc.duration,
      badge: svc.badge,
      badgeColor: svc.badgeColor,
      img: svc.img,
      highlights: svc.highlights,
      sortOrder: svc.sortOrder,
      isActive: svc.isActive,
    });
    return acc;
  }, {});

  const publicCategories = categories
    .filter((cat) => includeInactive || (servicesByCategory[cat.slug]?.length > 0))
    .map((cat) => ({
      id: cat.slug,
      slug: cat.slug,
      name: cat.name,
      icon: cat.icon,
      description: cat.description,
      sortOrder: cat.sortOrder ?? 0,
      isActive: cat.isActive !== false,
      cards: servicesByCategory[cat.slug] || [],
    }));

  return { categories: publicCategories, services: formattedServices };
};

export const getActiveServiceBySlug = async (slug) => {
  const service = await ConsultationService.findOne({ slug, isActive: true }).lean();
  if (!service) return null;
  const category = await ConsultationCategory.findOne({ slug: service.categorySlug }).lean();
  return formatServiceDoc(service, category?.name || '');
};

export const syncCatalogFromStatic = async () => {
  for (let ci = 0; ci < CONSULTATION_CATEGORIES.length; ci += 1) {
    const cat = CONSULTATION_CATEGORIES[ci];
    await ConsultationCategory.findOneAndUpdate(
      { slug: cat.id },
      {
        slug: cat.id,
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        sortOrder: ci,
        isActive: true,
      },
      { upsert: true, new: true }
    );

    for (let si = 0; si < cat.cards.length; si += 1) {
      const card = cat.cards[si];
      await ConsultationService.findOneAndUpdate(
        { slug: card.id },
        {
          slug: card.id,
          categorySlug: cat.id,
          title: card.title,
          short: card.short || card.title,
          desc: card.desc,
          price: card.price,
          duration: card.duration || '',
          badge: card.badge || '',
          badgeColor: card.badgeColor || 'purple',
          img: card.img || '',
          highlights: card.highlights || [],
          sortOrder: si,
          isActive: cat.id !== 'testing',
        },
        { upsert: true, new: true }
      );
    }
  }

  const count = await ConsultationService.countDocuments();
  return { synced: true, count };
};

/** @deprecated use syncCatalogFromStatic — kept for callers */
export const seedCatalogFromStaticIfEmpty = syncCatalogFromStatic;
