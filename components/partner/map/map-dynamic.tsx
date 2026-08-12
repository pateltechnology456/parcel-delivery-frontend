'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Leaflet requires window, so we must disable SSR
export const MapDynamic = dynamic(
  () => import('./partner-map'),
  { 
    ssr: false,
    loading: () => (
      <div className="partner-map" style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: '#8a9aae' }}>
          <Loader2 className="slide-spinner" />
          <small>Loading map...</small>
        </div>
      </div>
    )
  }
)
