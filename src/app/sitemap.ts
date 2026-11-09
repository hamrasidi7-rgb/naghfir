import { MetadataRoute } from 'next';
import { getDatabase } from '@/lib/db';

export default function sitemap(): MetadataRoute.Sitemap {
  const db = getDatabase();
  const baseUrl = 'https://naghfir.id';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/profil`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/perjalanan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pemikiran`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aktivitas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/publikasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = db.articles
    .filter((a) => a.status === 'published')
    .map((article) => ({
      url: `${baseUrl}/pemikiran/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...articleRoutes];
}
