import { getContentBySlug } from '../features/content/contentApi'

export function useContent(slug: string) {
  return getContentBySlug(slug)
}
