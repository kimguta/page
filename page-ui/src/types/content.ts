export type ContentSection = {
  heading: string
  body: string
}

export type ContentItem = {
  slug: string
  title: string
  subtitle: string
  category: string
  hero: string
  sections: ContentSection[]
}
