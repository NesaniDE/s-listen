import { top10Lists } from '@/data/lists'
import TopListCard from '@/components/cards/TopListCard'

interface RelatedListsProps {
  currentSlug: string
  categorySlug?: string
}

export default function RelatedLists({ currentSlug, categorySlug }: RelatedListsProps) {
  const related = top10Lists
    .filter((l) => l.slug !== currentSlug && (!categorySlug || l.categorySlug === categorySlug))
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section style={{ margin: '5rem 0' }}>
      <hr className="divider" style={{ marginBottom: '3rem' }} />
      <div style={{ marginBottom: '2rem' }}>
        <span className="eyebrow">Weiter lesen</span>
        <h2
          className="section-title"
          style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}
        >
          Ähnliche Listen
        </h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {related.map((list) => (
          <TopListCard key={list.slug} list={list} />
        ))}
      </div>
    </section>
  )
}
