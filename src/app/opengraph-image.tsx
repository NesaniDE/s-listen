import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/config'

export const runtime = 'edge'
export const alt = `${siteConfig.name} — ${siteConfig.shortDescription}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#08080A',
          padding: '72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: '#FAFAFA',
              color: '#08080A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-1px',
            }}
          >
            S
          </div>
          <div style={{ color: '#FAFAFA', fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px' }}>
            Listen
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 18,
              color: '#A1A1AA',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontWeight: 500,
            }}
          >
            Lokales Verzeichnis · {siteConfig.city}
          </div>
          <div
            style={{
              fontSize: 88,
              color: '#FAFAFA',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-3px',
              maxWidth: 980,
            }}
          >
            Redaktionelle Top-10-Listen für {siteConfig.city}.
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#A1A1AA',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Kuratierte lokale Empfehlungen für Gastro, Freizeit, Dienstleister, Beauty und Gesundheit.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#71717A',
            fontSize: 18,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '24px',
          }}
        >
          <span>s-listen.de</span>
          <span>Built by Nesani</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
