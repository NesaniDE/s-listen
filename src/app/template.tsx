export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="route-transition-shell">
      <div className="route-transition-bar" aria-hidden="true" />
      <div className="route-transition-content">{children}</div>
    </div>
  )
}
