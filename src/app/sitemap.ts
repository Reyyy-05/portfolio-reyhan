import { MetadataRoute } from 'next';
import { PROJECTS } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reyhanalbar.vercel.app';
  const lastModified = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/experience`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((proj) => ({
    url: `${siteUrl}/projects/${proj.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...coreRoutes, ...projectRoutes];
}
