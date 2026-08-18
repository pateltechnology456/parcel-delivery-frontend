import { useEffect, useState } from 'react'
import { Phone, Navigation as NavIcon, ChevronRight, Loader2, Check } from 'lucide-react'
import { Button, PageHeading, Status, money } from '../ui/partner-ui'
import { MapDynamic } from '../map/map-dynamic'
import { PickupFlow } from '../pickup/pickup-flow'
import { DeliveryFlow } from '../delivery/delivery-flow'
import * as orderService from '@/services/order.service'
import type { Order } from '@/types/order'

export function OrderDetail({ id = 'PT-2841' }: { id?: string }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService.getOrderById(id).then(o => {
      setOrder(o)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="partner-card" style={{ padding: 40, marginTop: 24 }}>
        <div className="partner-empty"><Loader2 className="slide-spinner" /><b>Loading order details...</b></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="partner-card" style={{ padding: 40, marginTop: 24 }}>
        <div className="partner-empty"><b>Order not found</b><span>The order you requested could not be found.</span></div>
      </div>
    )
  }

  const isPickupFlow = ['assigned', 'accepted', 'pickup_in_progress', 'arrived_at_seller'].includes(order.status)
  const isDeliveryFlow = ['pickup_confirmed', 'in_transit', 'arrived_at_customer'].includes(order.status)

  return (
    <>
      <PageHeading
        eyebrow={`Partner workspace / Orders / ${id}`}
        title={id}
        description="Delivery details, route, payout, and customer information."
        action={<Button href="/partner/navigation">Navigate <NavIcon size={14} /></Button>}
      />
      <div className="partner-detail-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {isPickupFlow && (
            <div className="partner-card" style={{ padding: '0 20px 20px' }}>
              <PickupFlow order={order} onComplete={() => orderService.getOrderById(id).then(setOrder)} otpLength={4} />
            </div>
          )}
          {isDeliveryFlow && (
            <div className="partner-card" style={{ padding: '0 20px 20px' }}>
              <DeliveryFlow order={order} onComplete={() => orderService.getOrderById(id).then(setOrder)} otpLength={4} />
            </div>
          )}
          <div className="partner-card detail-main">
            <div className="detail-status">
              <Status>{order.status.replace(/_/g, ' ')}</Status>
              <span style={{ textTransform: 'capitalize' }}>{order.type} delivery · Booked {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <h2 style={{ marginBottom: 20 }}>{order.pickup.area} <ChevronRight size={18} style={{ margin: '0 8px', color: '#9db0c8' }} /> {order.delivery.area}</h2>
            
            <MapDynamic 
              pickup={order.pickup as any} 
              delivery={order.delivery as any} 
              height={220} 
            />
            
            <div className="delivery-route" style={{ marginTop: 24 }}>
              {order.timeline.map((event, i) => (
                <div key={i} className={`delivery-step ${event.completed ? 'done' : ''} ${event.current ? 'current' : ''}`}>
                  <span>{event.completed ? <Check size={12} /> : <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}/>}</span>
                  <div>
                    <b>{event.label}</b>
                    {event.timestamp && <small>{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="partner-card order-summary">
          <h2>Order summary</h2>
          <div><span>Customer</span><b>{order.customer.name}</b></div>
          <div><span>Phone</span><b>{order.customer.maskedPhone}</b></div>
          <div><span>Package</span><b>{order.parcel.weight} · {order.parcel.description}</b></div>
          <div><span>Your payout</span><strong>{money(order.estimatedEarnings)}</strong></div>
          <Button variant="secondary"><Phone size={14} /> Call customer</Button>
        </div>
      </div>
    </>
  )
}
