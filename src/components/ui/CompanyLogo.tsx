import Image from 'next/image'
import { getCompanyInitials, getCompanyLogoUrl } from '@/lib/company-brand'

type CompanyLogoProps = {
  name: string
  website?: string
  logo?: string
  size?: number
  radius?: number
  fontSize?: string
  priority?: boolean
}

export default function CompanyLogo({
  name,
  website,
  logo,
  size = 48,
  radius = 12,
  fontSize = '0.85rem',
  priority = false,
}: CompanyLogoProps) {
  const src = getCompanyLogoUrl(website, logo)
  const initials = getCompanyInitials(name)
  const hasLogo = Boolean(src)

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        borderRadius: `${radius}px`,
        background: hasLogo ? 'rgba(255, 255, 255, 0.98)' : 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'var(--text-muted)',
        fontSize,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        boxShadow: hasLogo ? '0 10px 24px rgba(8, 6, 20, 0.14)' : undefined,
      }}
      aria-label={hasLogo ? `${name} Logo` : `${name} Monogramm`}
    >
      {src ? (
        <Image
          src={src}
          alt={`${name} Logo`}
          width={size}
          height={size}
          priority={priority}
          sizes={`${size}px`}
          style={{
            width: '72%',
            height: '72%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      ) : (
        initials
      )}
    </div>
  )
}
