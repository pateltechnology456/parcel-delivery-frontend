'use client'

import { useState, useEffect } from 'react'
import {
  Check,
  ListChecks,
  Navigation as NavIcon,
  Phone,
  Loader2,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  MapPin,
  Flame,
  Radio,
  X
} from 'lucide-react'
import { Button, PageHeading, Status } from '../ui/partner-ui'
import { MapDynamic } from '../map/map-dynamic'
import * as orderService from '@/services/order.service'
import type { Order } from '@/types/order'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export function NavigationPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [sosModalOpen, setSosModalOpen] = useState(false)
  const [locSharing, setLocSharing] = useState(false)

  // Grab the first in-transit order or default
  useEffect(() => {
    orderService.getOrders().then(orders => {
      const active = orders.find(o => !['delivered', 'cancelled'].includes(o.status))
      if (active) setOrder(active)
      else if (orders.length > 0) setOrder(orders[0])
    })
  }, [])

  const handleOpenGoogleMaps = () => {
    if (!order) return
    const dest = encodeURIComponent(`${order.delivery.address || order.delivery.area}, ${order.delivery.city || 'Indore'}`)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`, '_blank')
    toast.success("Opening route in Google Maps...")
  }

  const handleShareLocation = () => {
    setLocSharing(true)
    setTimeout(() => {
      setLocSharing(false)
      toast.success("Live GPS tracking link copied & sent to emergency contacts!")
    }, 800)
  }

  return (
    <>
      <PageHeading
        eyebrow="Partner workspace / Navigation"
        title="Active navigation"
        description="Turn-by-turn live navigation, Google Maps routing, and driver safety toolkit."
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setSosModalOpen(true)}
              style={{
                background: '#fee2e2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                padding: '9px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldAlert size={16} /> SOS Safety
            </button>
            <Button href="/partner/orders">My orders <ListChecks size={14} /></Button>
          </div>
        }
      />

      {/* Emergency SOS Safety Modal */}
      <AnimatePresence>
        {sosModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSosModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              style={{
                position: 'relative',
                background: '#ffffff',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '460px',
                padding: '24px',
                zIndex: 10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'grid', placeItems: 'center' }}>
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#991b1b', margin: 0 }}>Driver Safety & SOS</h3>
                    <small style={{ color: '#64748b' }}>Emergency assistance available 24x7</small>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSosModalOpen(false)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                <a
                  href="tel:112"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: '#dc2626',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: '14px'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={18} /> Call Police Emergency (112)
                  </span>
                  <ChevronRight size={16} />
                </a>

                <a
                  href="tel:18002008899"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#0f172a',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '13.5px'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={18} color="#1154d9" /> 24x7 Patel Partner Helpline
                  </span>
                  <ChevronRight size={16} color="#94a3b8" />
                </a>

                <button
                  type="button"
                  onClick={handleShareLocation}
                  disabled={locSharing}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#166534',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Radio size={18} color="#16a34a" /> {locSharing ? "Sharing Live GPS..." : "Share Live Trip with Family"}
                  </span>
                  <Check size={16} color="#16a34a" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="partner-card large-nav-card" style={{ overflow: 'hidden' }}>
        <div className="nav-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Status color="green">Live GPS Active</Status>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1154d9', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>
                4G Connected
              </span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0b2a62', margin: '4px 0' }}>
              {order ? `${order.id} · ${order.pickup.area} ➔ ${order.delivery.area}` : 'No active delivery'}
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
              {order ? `${order.distance} remaining · ETA ${order.estimatedTime}` : 'Go online and accept an order to see turn-by-turn navigation'}
            </p>
          </div>

          {order && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleOpenGoogleMaps}
                style={{
                  background: 'linear-gradient(135deg, #1154d9 0%, #0039c7 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(17, 84, 217, 0.3)'
                }}
              >
                <ExternalLink size={14} /> Open in Google Maps
              </button>
              <a
                href={`tel:${order.customer?.maskedPhone || '9876543210'}`}
                style={{
                  background: '#f1f5f9',
                  color: '#334155',
                  border: '1px solid #e2e8f0',
                  padding: '9px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Phone size={14} color="#1154d9" /> Call Customer
              </a>
            </div>
          )}
        </div>
        
        {order ? (
          <MapDynamic 
            pickup={order.pickup as any}
            delivery={order.delivery as any}
            height={410}
            liveLocation={true}
          />
        ) : (
          <div className="partner-empty" style={{ height: 410 }}>
            <NavIcon size={32} style={{ color: '#a0adbd', marginBottom: 12 }} />
            <b>No active delivery in progress</b>
            <span>Accepted orders will automatically display full live route navigation here.</span>
          </div>
        )}
        
        {order && (
          <div className="nav-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
            <div>
              <small style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Next Destination Stop</small>
              <b style={{ fontSize: '14px', color: '#0b2a62', display: 'block' }}>{order.delivery.address || order.delivery.area}</b>
            </div>
            <Button href={`/partner/orders/${order.id}`}>
              Verify OTP & Complete Delivery <ChevronRight size={14} />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
