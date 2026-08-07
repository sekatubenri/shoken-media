import { getAllArticles } from '@/lib/articles'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://shoken-select.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const articleUrls = articles.map((a) => ({
    url: `${BASE_URL}/article/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/category/shoken`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/category/fx`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/category/nisa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/category/beginner`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...articleUrls,
  ]
}
