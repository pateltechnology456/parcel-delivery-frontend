import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CalendarDays, ChevronDown, ChevronRight, Gauge, Package, Loader2 } from 'lucide-react'
import { Button, PageHeading, Status, money } from '../ui/partner-ui'
import * as orderService from '@/services/order.service'
import type { Order } from '@/types/order'

export function Orders() {
  const [filter, setFilter] = useState<'Active' | 'Completed' | 'Cancelled'>('Active')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService.getOrders().then(data => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

  const filteredOrders = orders.filter(o => {
    if (filter === 'Active') return !['delivered', 'cancelled', 'failed_pickup', 'failed_delivery'].includes(o.status)
    if (filter === 'Completed') return o.status === 'delivered'
    if (filter === 'Cancelled') return ['cancelled', 'failed_pickup', 'failed_delivery'].includes(o.status)
    return false
  })

  return (
    <>
      <PageHeading
        eyebrow="Partner workspace / Orders"
        title="My orders"
        description="Manage active, completed, and upcoming deliveries."
        action={<Button href="/partner/navigation">Open map <Package size={14} /></Button>}
      />
      <div className="partner-card full-table-card">
        <div className="partner-table-toolbar">
          <div className="partner-tabs">
            {['Active', 'Completed', 'Cancelled'].map(t => (
              <button 
                key={t}
                className={filter === t ? 'active' : ''} 
                onClick={() => setFilter(t as any)} 
              >
                {t}<span>{orders.filter(o => {
                  if (t === 'Active') return !['delivered', 'cancelled', 'failed_pickup', 'failed_delivery'].includes(o.status)
                  if (t === 'Completed') return o.status === 'delivered'
                  if (t === 'Cancelled') return ['cancelled', 'failed_pickup', 'failed_delivery'].includes(o.status)
                  return false
                }).length}</span>
              </button>
            ))}
          </div>
          <div className="partner-table-actions">
            <div className="partner-mini-search"><Gauge size={14} /><input placeholder="Search orders" /></div>
            <button className="partner-filter"><CalendarDays size={14} /> Today <ChevronDown size={14} /></button>
          </div>
        </div>
        
        {loading ? (
          <div className="partner-empty" style={{ padding: 60 }}><Loader2 className="slide-spinner" /><b>Loading orders...</b></div>
        ) : filteredOrders.length === 0 ? (
          <div className="partner-empty" style={{ padding: 60 }}><Package size={32} style={{ color: '#a0adbd', marginBottom: 12 }} /><b>No orders found</b><span>There are no {filter.toLowerCase()} orders for today.</span></div>
        ) : (
          <div className="partner-wide-table">
            <div className="partner-wide-row head">
              <span>Order ID</span><span>Pickup</span><span>Destination</span><span>Status</span><span>Earnings</span><span />
            </div>
            {filteredOrders.map(row => (
              <Link className="partner-wide-row" href={`/partner/orders/${row.id}`} key={row.id}>
                <span><b>{row.id}</b><small>Today · {new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></span>
                <span>{row.pickup.area}</span>
                <span>{row.delivery.area}</span>
                <Status color={row.status === 'delivered' ? 'green' : ['cancelled', 'failed_pickup', 'failed_delivery'].includes(row.status) ? 'red' : 'blue'}>{row.status.replace(/_/g, ' ')}</Status>
                <strong>{money(row.estimatedEarnings)}</strong>
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
