import type { ContentItem } from '../types/content'

export const contentPages: ContentItem[] = [
  {
    slug: 'story',
    title: 'Brand Story',
    subtitle: 'A short editorial page for campaigns, launches, or announcements.',
    category: 'Editorial',
    hero: 'A flexible CMS page layout that can be reused across the site.',
    sections: [
      {
        heading: 'Why it exists',
        body: 'This page demonstrates how content-driven routes can share the same layout system as the rest of the application.',
      },
      {
        heading: 'How it feels',
        body: 'The visual language leans on bold typography, glassy cards, and a warm gradient background to keep the example site lively.',
      },
    ],
  },
  {
    slug: 'launch',
    title: 'Launch Notes',
    subtitle: 'A product launch page with a compact summary and supporting details.',
    category: 'Product',
    hero: 'Built for announcements that need a polished but minimal reading flow.',
    sections: [
      {
        heading: 'Release focus',
        body: 'Use this template for changes, updates, or release highlights without reworking the shell of the site.',
      },
      {
        heading: 'Content shape',
        body: 'Each section is intentionally short so the page stays scannable on desktop and mobile.',
      },
    ],
  },
]

export function getContentBySlug(slug: string) {
  return contentPages.find((page) => page.slug === slug) ?? contentPages[0]
}
