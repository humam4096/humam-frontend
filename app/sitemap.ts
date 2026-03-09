import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://humam.sa'

  // Base routes for both languages
  const routes = ['', '/about', '/services', '/training-center', '/contact']

  const sitemapEntries: MetadataRoute.Sitemap = []

  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
    })
    sitemapEntries.push({
      url: `${baseUrl}/ar${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
    })
  })

  return sitemapEntries
}
