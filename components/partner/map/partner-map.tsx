'use client'

import { useEffect, useState, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Navigation2, Package } from 'lucide-react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useGeolocation } from '@/hooks/useGeolocation'

interface Location {
  lat: number
  lng: number
  label?: string
}

interface PartnerMapProps {
  pickup?: Location
  delivery?: Location
  className?: string
  height?: number | string
  liveLocation?: boolean
}

// Custom icons using Lucide
const createIcon = (icon: React.ReactNode, color: string) =>
  L.divIcon({
    html: renderToStaticMarkup(
      <div style={{
        display: 'grid', placeItems: 'center', width: 32, height: 32,
        background: color, color: '#fff', borderRadius: '50%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '2px solid #fff'
      }}>
        {icon}
      </div>
    ),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })

const pickupIcon = createIcon(<Package size={16} />, '#1154d9')
const deliveryIcon = createIcon(<MapPin size={16} />, '#ff6b2c')
const partnerIcon = createIcon(<Navigation2 size={16} />, '#2dbb76')

export default function PartnerMap({ pickup, delivery, className, height = 300, liveLocation }: PartnerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const partnerMarker = useRef<L.Marker | null>(null)
  const { coords } = useGeolocation(liveLocation)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map)

    mapInstance.current = map

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [])

  // Update markers and bounds
  useEffect(() => {
    if (!mapInstance.current) return
    const map = mapInstance.current
    const bounds = L.latLngBounds([])

    // Clear existing layers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer)
      }
    })

    const points: L.LatLng[] = []

    if (pickup) {
      const pt = L.latLng(pickup.lat, pickup.lng)
      points.push(pt)
      L.marker(pt, { icon: pickupIcon }).addTo(map)
      bounds.extend(pt)
    }

    if (delivery) {
      const pt = L.latLng(delivery.lat, delivery.lng)
      points.push(pt)
      L.marker(pt, { icon: deliveryIcon }).addTo(map)
      bounds.extend(pt)
    }

    if (coords) {
      const pt = L.latLng(coords.lat, coords.lng)
      points.push(pt)
      partnerMarker.current = L.marker(pt, { icon: partnerIcon }).addTo(map)
      bounds.extend(pt)
    }

    // Draw simple line
    if (points.length > 1) {
      L.polyline(points, {
        color: '#1154d9',
        weight: 3,
        dashArray: '8, 8',
        opacity: 0.7
      }).addTo(map)
    }

    if (points.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] })
    }
  }, [pickup, delivery, coords])

  return <div ref={mapRef} style={{ height, width: '100%', borderRadius: 8, zIndex: 1 }} className={className} />
}
