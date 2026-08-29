export function getCompanyInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function normalizeManualLogo(logo?: string) {
  if (!logo) return null
  if (logo.startsWith('http://') || logo.startsWith('https://')) return logo
  return logo.startsWith('/') ? logo : `/${logo}`
}

function normalizeWebsiteOrigin(website?: string) {
  if (!website) return null

  try {
    const normalized = website.startsWith('http://') || website.startsWith('https://') ? website : `https://${website}`
    return new URL(normalized).origin
  } catch {
    return null
  }
}

export function getCompanyLogoUrl(website?: string, logo?: string) {
  const manualLogo = normalizeManualLogo(logo)
  if (manualLogo) return manualLogo

  const origin = normalizeWebsiteOrigin(website)
  if (!origin) return null

  return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(origin)}`
}
