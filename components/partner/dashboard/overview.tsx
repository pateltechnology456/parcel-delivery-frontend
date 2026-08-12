'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Check, ChevronRight, Clock3, Map, Package, Route,
  Star, Target, Truck, Home, Wallet, Zap, Navigation,
  Landmark, FileText, CalendarDays, Gift, X,
} from 'lucide-react'
import { Button, MiniMap, PageHeading, StatCard, Status, money } from '../ui/partner-ui'

/* ── Welcome ── */
export function Welcome() {
  const [available, setAvailable] = useState(true)
  return (
    <div className="partner-welcome">
      <div>
        <p className="partner-eyebrow">Tuesday, 24 June 2025</p>
        <h2>Good morning, Arjun <span>—</span></h2>
        <p>{available ? 'You are ready to make a difference today.' : 'You are currently offline. Switch on to receive orders.'}</p>
        <div className="welcome-actions">
          <button onClick={() => setAvailable(v => !v)} className={available ? 'available' : ''}>
            <span />{available ? 'Online & accepting orders' : 'Go online'}
          </button>
          <small><Star /> 4.9 partner rating</small>
        </div>
      </div>
      <div className="welcome-route">
        <Route /><span className="route-node first" /><span className="route-node last" />
        <span className="route-box">12 deliveries<br /><b>today</b></span>
      </div>
    </div>
  )
}

/* ── Quick Actions ── */
export function QuickActions() {
  return (
    <div className="partner-card quick-actions-card">
      <div className="partner-card-title"><h2>Quick actions</h2><Zap /></div>
      <div className="partner-quick-grid">
        <Link href="/partner/navigation"><span className="quick-tone blue"><Navigation /></span><b>Open navigation</b></Link>
        <Link href="/partner/earnings"><span className="quick-tone green"><Wallet /></span><b>View earnings</b></Link>
        <Link href="/partner/withdraw"><span className="quick-tone orange"><Landmark /></span><b>Withdraw funds</b></Link>
        <Link href="/partner/documents"><span className="quick-tone purple"><FileText /></span><b>My documents</b></Link>
      </div>
    </div>
  )
}

/* ── Incoming Orders ── */
export function Incoming() {
  const [orders, setOrders] = useState([
    { id: 'PT-2941', from: 'Vijay Nagar', to: 'Bengaluru', pay: 280, dist: '4.8 km', time: '8 min' },
    { id: 'PT-2942', from: 'Bhawarkua', to: 'Palasia', pay: 140, dist: '2.1 km', time: '12 min' },
  ])
  const [processing, setProcessing] = useState<string | null>(null);

  const handleAction = (id: string, action: 'accept' | 'reject') => {
    setProcessing(`${action}-${id}`);
    setTimeout(() => {
      setOrders(v => v.filter(x => x.id !== id));
      setProcessing(null);
    }, 600);
  };
  return (
    <div className="partner-card incoming-card">
      <div className="partner-card-title">
        <div><h2>Incoming orders</h2><p>Nearby delivery requests</p></div>
        <Status color="orange">{orders.length} new</Status>
      </div>
      {orders.length ? orders.map(order => (
        <div className="incoming-order" key={order.id}>
          <div className="incoming-order-top">
            <span className="order-serial"><Package /> {order.id}</span>
            <b>{money(order.pay)}</b>
          </div>
          <div className="incoming-route">
            <div><i /><span>{order.from}</span></div>
            <Route />
            <div><i /><span>{order.to}</span></div>
          </div>
          <div className="incoming-meta">
            <span><Map /> {order.dist}</span>
            <span><Clock3 /> Accept within {order.time}</span>
            <div>
              <button onClick={() => handleAction(order.id, 'reject')} className="reject" disabled={!!processing}>
                {processing === `reject-${order.id}` ? '...' : <><X /> Reject</>}
              </button>
              <button onClick={() => handleAction(order.id, 'accept')} className="accept" disabled={!!processing}>
                {processing === `accept-${order.id}` ? 'Accepting...' : <><Check /> Accept</>}
              </button>
            </div>
          </div>
        </div>
      )) : (
        <div className="partner-empty">
          <Check /><b>All caught up</b><span>No new delivery requests nearby.</span>
        </div>
      )}
      <Link className="view-all" href="/partner/orders">View all orders <ChevronRight /></Link>
    </div>
  )
}

/* ── Active Delivery ── */
export function ActiveDelivery() {
  return (
    <div className="partner-card active-delivery">
      <div className="partner-card-title">
        <div><h2>Active delivery</h2><p>Order PT-2841 · Express</p></div>
        <Status>In progress</Status>
      </div>
      <MiniMap />
      <div className="delivery-route">
        <div className="delivery-step done"><span><Check /></span><div><b>Pickup complete</b><small>Vijay Nagar · 09:14 AM</small></div></div>
        <div className="delivery-step current"><span><Truck /></span><div><b>Heading to destination</b><small>4.8 km remaining · ETA 10:02 AM</small></div></div>
        <div className="delivery-step"><span><Home /></span><div><b>Drop-off</b><small>HSR Layout, Bengaluru</small></div></div>
      </div>
      <Button href="/partner/navigation">Open navigation <Navigation /></Button>
    </div>
  )
}

/* ── Performance ── */
export function Performance() {
  return (
    <div className="partner-card performance-card">
      <div className="partner-card-title">
        <div><h2>Today&apos;s performance</h2><p>Keep up the momentum</p></div>
        <Target />
      </div>
      <div className="performance-score">
        <div className="score-ring"><strong>92</strong><small>/100</small></div>
        <div><b>Great work!</b><span>You&apos;re in the top 12% of partners today.</span></div>
      </div>
      <div className="performance-metrics">
        <span><b>100%</b><small>On-time rate</small></span>
        <span><b>4.9</b><small>Rating</small></span>
        <span><b>8/8</b><small>Completed</small></span>
      </div>
    </div>
  )
}

/* ── Earnings ── */
export function Earnings() {
  return (
    <>
      <PageHeading eyebrow="Partner workspace / Finance" title="Earnings" description="Track your performance and payouts at a glance." action={<Button href="/partner/withdraw">Withdraw funds <Landmark /></Button>} />
      <div className="partner-stat-grid">
        <StatCard icon={Wallet} tone="green" label="Available balance" value="₹8,420" sub="Ready to withdraw" />
        <StatCard icon={CalendarDays} tone="blue" label="This week" value="₹12,680" sub="+12.6% vs last week" />
        <StatCard icon={Target} tone="orange" label="This month" value="₹42,840" sub="Goal: ₹50,000" />
        <StatCard icon={Gift} tone="purple" label="Bonuses" value="₹2,400" sub="3 active incentives" />
      </div>
      <div className="partner-grid-two">
        <div className="partner-card earnings-chart">
          <div className="partner-card-title">
            <div><h2>Weekly earnings</h2><p>Your payout trend over the last 7 days</p></div>
            <button className="partner-select">This week <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>
          </div>
          <div className="earnings-bars">
            {[58, 72, 48, 84, 64, 92, 76].map((h, i) => (
              <div key={i}><i style={{ height: `${h}%` }} /><span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span></div>
            ))}
          </div>
        </div>
        <div className="partner-card payout-card">
          <div className="partner-card-title">
            <div><h2>Next payout</h2><p>Scheduled for Friday, 27 June</p></div>
            <Landmark />
          </div>
          <strong>₹8,420</strong>
          <span>Includes 23 completed deliveries</span>
          <Button href="/partner/withdraw">Manage payout <ChevronRight /></Button>
        </div>
      </div>
      <div className="partner-card payout-table">
        <div className="partner-card-title">
          <div><h2>Recent payouts</h2><p>Your latest completed payout cycles</p></div>
          <Link href="/partner/wallet">View wallet <ChevronRight /></Link>
        </div>
        {['24 Jun 2025', '21 Jun 2025', '17 Jun 2025'].map((date, i) => (
          <div className="payout-row" key={date}>
            <span className="payout-icon"><Wallet /></span>
            <div><b>Weekly payout</b><small>{date} · 23 deliveries</small></div>
            <strong>{money([8420, 12680, 9640][i])}</strong>
            <Status color="green">Paid</Status>
          </div>
        ))}
      </div>
    </>
  )
}

/* ── Overview (Dashboard) ── */
export function Overview() {
  return (
    <>
      <PageHeading
        eyebrow="Partner workspace / Overview"
        title="Partner overview"
        description="Your delivery command center for a more productive day."
        action={<Button href="/partner/orders">View all orders <ChevronRight /></Button>}
      />
      <Welcome />
      <div className="partner-stat-grid">
        <StatCard icon={Package} tone="blue" label="Deliveries today" value="8" sub="+2 from yesterday" />
        <StatCard icon={Wallet} tone="green" label="Today&apos;s earnings" value="₹1,840" sub="+18.4% this week" />
        <StatCard icon={Clock3} tone="orange" label="Online hours" value="6h 24m" sub="Goal: 8 hours" />
        <StatCard icon={Star} tone="purple" label="Partner rating" value="4.9" sub="Top 12% this month" />
      </div>
      <div className="partner-grid-two">
        <Incoming />
        <QuickActions />
      </div>
      <div className="partner-grid-two bottom">
        <ActiveDelivery />
        <Performance />
      </div>
    </>
  )
}
