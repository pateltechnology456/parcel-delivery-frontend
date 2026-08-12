import { useState, useEffect } from 'react'
import { Check, ListChecks, Navigation as NavIcon, Phone, Loader2, ChevronRight } from 'lucide-react'
import { Button, PageHeading, Status } from '../ui/partner-ui'
import { MapDynamic } from '../map/map-dynamic'
import * as orderService from '@/services/order.service'
import type { Order } from '@/types/order'

export function NavigationPage() {
  const [order, setOrder] = useState<Order | null>(null)
  
  // For demo, just grab the first in-transit order
  useEffect(() => {
    orderService.getOrders('in_transit').then(orders => {
      if (orders.length > 0) setOrder(orders[0])
    })
  }, [])

  return (
    <>
      <PageHeading
        eyebrow="Partner workspace / Navigation"
        title="Active navigation"
        description="Follow your active route with live delivery updates."
        action={<Button href="/partner/orders">My orders <ListChecks size={14} /></Button>}
      />
      <div className="partner-card large-nav-card">
        <div className="nav-card-header">
          <div>
            <Status>Live route</Status>
            <h2>{order ? `${order.id} · ${order.pickup.area} to ${order.delivery.area}` : 'No active route'}</h2>
            <p>{order ? `${order.distance} remaining · ETA ${order.estimatedTime}` : 'Start a delivery to see navigation'}</p>
          </div>
          {order && <Button variant="secondary"><Phone size={14} /> Customer</Button>}
        </div>
        
        {order ? (
          <MapDynamic 
            pickup={order.pickup}
            delivery={order.delivery}
            height={410}
            liveLocation={true}
          />
        ) : (
          <div className="partner-empty" style={{ height: 410 }}>
            <NavIcon size={32} style={{ color: '#a0adbd', marginBottom: 12 }} />
            <b>No active delivery</b>
            <span>Your live navigation will appear here.</span>
          </div>
        )}
        
        {order && (
          <div className="nav-bottom">
            <div><b>Next stop</b><span>{order.delivery.address}</span></div>
            <Button href={`/partner/orders/${order.id}`}>View order details <ChevronRight size={14} /></Button>
          </div>
        )}
      </div>
    </>
  )
}

