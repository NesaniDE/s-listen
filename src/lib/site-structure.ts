import { categories, type Category, type Subcategory } from '@/data/categories'
import { top10Lists } from '@/data/lists'

const publishedListSlugSet = new Set(top10Lists.map((list) => list.slug))

export function hasPublishedList(listSlug: string) {
  return publishedListSlugSet.has(listSlug)
}

export function getCategorySubcategory(categorySlug: string, subcategorySlug: string) {
  const category = categories.find((entry) => entry.slug === categorySlug)
  const subcategory = category?.subcategories.find((entry) => entry.slug === subcategorySlug)

  return { category, subcategory }
}

export function getPublishedSubcategories(category: Category): Subcategory[] {
  return category.subcategories.filter((subcategory) => hasPublishedList(subcategory.listSlug))
}

export function getPlaceholderSubcategories(category: Category): Subcategory[] {
  return category.subcategories.filter((subcategory) => !hasPublishedList(subcategory.listSlug))
}

export function getPublishedSubcategoryCount() {
  return categories.flatMap((category) => getPublishedSubcategories(category)).length
}
