export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readingTime: string
  relatedCategorySlug?: string
  relatedSubcategorySlug?: string
  relatedListSlugs?: string[]
  relatedCompanySlugs?: string[]
  content: string[]
}

// Noch keine Blogartikel veröffentlicht.
export const blogPosts: BlogPost[] = []

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
