import { useState, useEffect } from 'react'

export interface GeolocationState {
  loading: boolean
  error: string | null
  coords: { lat: number; lng: number; heading?: number; speed?: number } | null
}

export function useGeolocation(watch = false) {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    coords: null,
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setState({ loading: false, error: 'Geolocation not supported', coords: null })
      return
    }

    const handleSuccess = (pos: GeolocationPosition) => {
      setState({
        loading: false,
        error: null,
        coords: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          heading: pos.coords.heading || undefined,
          speed: pos.coords.speed || undefined,
        },
      })
    }

    const handleError = (err: GeolocationPositionError) => {
      setState({ loading: false, error: err.message, coords: null })
    }

    if (watch) {
      const id = navigator.geolocation.watchPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      })
      return () => navigator.geolocation.clearWatch(id)
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
      })
    }
  }, [watch])

  return state
}
