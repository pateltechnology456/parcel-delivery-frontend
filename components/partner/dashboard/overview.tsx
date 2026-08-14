'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, ChevronRight, Clock3, Map, Package, Route,
  Star, Target, Truck, Home, Wallet, Zap, Navigation,
  Landmark, FileText, CalendarDays, Gift, X,
} from 'lucide-react'
import { Button, MiniMap, PageHeading, StatCard, Status, money } from '../ui/partner-ui'
import { fadeUp, staggerContainer, staggerChild, pageTransition, smooth, spring } from '@/lib/animations'

/* ── Welcome ── */
export function Welcome() {
  const [available, setAvailable] = useState(true)
  return (
    <motion.div
      className="partner-welcome"
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="partner-eyebrow">Tuesday, 24 June 2025</p>
        <h2>Good morning, Arjun <span>—</span></h2>
        <p>{available ? 'You are ready to make a difference today.' : 'You are currently offline. Switch on to receive orders.'}</p>
        <div className="welcome-actions">
          <motion.button
            onClick={() => setAvailable(v => !v)}
            className={available ? 'available' : ''}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={spring}
          >
            <motion.span
              animate={{ backgroundColor: available ? '#22c55e' : '#94a3b8' }}
              transition={{ duration: 0.3 }}
            />{available ? 'Online & accepting orders' : 'Go online'}
          </motion.button>
          <small><Star /> 4.9 partner rating</small>
        </div>
      </div>
      <div className="welcome-route">
        <Route /><span className="route-node first" /><span className="route-node last" />
        <span className="route-box">12 deliveries<br /><b>today</b></span>
      </div>
    </motion.div>
  )
}

/* ── Quick Actions ── */
export function QuickActions() {
  const links = [
    { href: '/partner/navigation', tone: 'blue', icon: Navigation, label: 'Open navigation' },
    { href: '/partner/earnings', tone: 'green', icon: Wallet, label: 'View earnings' },
    { href: '/partner/withdraw', tone: 'orange', icon: Landmark, label: 'Withdraw funds' },
    { href: '/partner/documents', tone: 'purple', icon: FileText, label: 'My documents' },
  ]
  return (
    <motion.div
      className="partner-card quick-actions-card"
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="partner-card-title"><h2>Quick actions</h2><Zap /></div>
      <motion.div
        className="partner-quick-grid"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {links.map(({ href, tone, icon: Icon, label }) => (
          <motion.div key={href} variants={staggerChild}>
            <Link href={href}>
              <motion.span
                className={`quick-tone ${tone}`}
                whileHover={{ scale: 1.12, rotate: 5 }}
                whileTap={{ scale: 0.92 }}
                transition={spring}
              >
                <Icon />
              </motion.span>
              <b>{label}</b>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
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
    <motion.div
      className="partner-card incoming-card"
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="partner-card-title">
        <div><h2>Incoming orders</h2><p>Nearby delivery requests</p></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={orders.length}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={spring}
          >
            <Status color="orange">{orders.length} new</Status>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="popLayout">
        {orders.length ? orders.map(order => (
          <motion.div
            className="incoming-order"
            key={order.id}
            layout
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
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
                <motion.button
                  onClick={() => handleAction(order.id, 'reject')}
                  className="reject"
                  disabled={!!processing}
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.03 }}
                  transition={spring}
                >
                  {processing === `reject-${order.id}` ? '...' : <><X /> Reject</>}
                </motion.button>
                <motion.button
                  onClick={() => handleAction(order.id, 'accept')}
                  className="accept"
                  disabled={!!processing}
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.03 }}
                  transition={spring}
                >
                  {processing === `accept-${order.id}` ? 'Accepting...' : <><Check /> Accept</>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )) : (
          <motion.div
            className="partner-empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check /><b>All caught up</b><span>No new delivery requests nearby.</span>
          </motion.div>
        )}
      </AnimatePresence>
      <Link className="view-all" href="/partner/orders">View all orders <ChevronRight /></Link>
    </motion.div>
  )
}

/* ── Active Delivery ── */
export function ActiveDelivery() {
  const steps = [
    { done: true,    current: false, icon: Check, label: 'Pickup complete',        sub: 'Vijay Nagar · 09:14 AM' },
    { done: false,   current: true,  icon: Truck, label: 'Heading to destination', sub: '4.8 km remaining · ETA 10:02 AM' },
    { done: false,   current: false, icon: Home,  label: 'Drop-off',               sub: 'HSR Layout, Bengaluru' },
  ]
  return (
    <motion.div
      className="partner-card active-delivery"
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="partner-card-title">
        <div><h2>Active delivery</h2><p>Order PT-2841 · Express</p></div>
        <Status>In progress</Status>
      </div>
      <MiniMap />
      <div className="delivery-route">
        {steps.map(({ done, current, icon: Icon, label, sub }, i) => (
          <motion.div
            key={label}
            className={`delivery-step${done ? ' done' : ''}${current ? ' current' : ''}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span><Icon /></span>
            <div><b>{label}</b><small>{sub}</small></div>
          </motion.div>
        ))}
      </div>
      <Button href="/partner/navigation">Open navigation <Navigation /></Button>
    </motion.div>
  )
}

/* ── Performance ── */
export function Performance() {
  return (
    <motion.div
      className="partner-card performance-card"
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <div className="partner-card-title">
        <div><h2>Today&apos;s performance</h2><p>Keep up the momentum</p></div>
        <Target />
      </div>
      <div className="performance-score">
        <motion.div
          className="score-ring"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.3 }}
        >
          <strong>92</strong><small>/100</small>
        </motion.div>
        <div><b>Great work!</b><span>You&apos;re in the top 12% of partners today.</span></div>
      </div>
      <motion.div
        className="performance-metrics"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {[['100%', 'On-time rate'], ['4.9', 'Rating'], ['8/8', 'Completed']].map(([val, label]) => (
          <motion.span key={label} variants={staggerChild}>
            <b>{val}</b><small>{label}</small>
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ── Earnings ── */
export function Earnings() {
  const bars = [58, 72, 48, 84, 64, 92, 76]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const payouts = [
    { date: '24 Jun 2025', amount: 8420 },
    { date: '21 Jun 2025', amount: 12680 },
    { date: '17 Jun 2025', amount: 9640 },
  ]
  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
      <PageHeading eyebrow="Partner workspace / Finance" title="Earnings" description="Track your performance and payouts at a glance." action={<Button href="/partner/withdraw">Withdraw funds <Landmark /></Button>} />
      <motion.div
        className="partner-stat-grid"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={staggerChild}><StatCard icon={Wallet} tone="green" label="Available balance" value="₹8,420" sub="Ready to withdraw" /></motion.div>
        <motion.div variants={staggerChild}><StatCard icon={CalendarDays} tone="blue" label="This week" value="₹12,680" sub="+12.6% vs last week" /></motion.div>
        <motion.div variants={staggerChild}><StatCard icon={Target} tone="orange" label="This month" value="₹42,840" sub="Goal: ₹50,000" /></motion.div>
        <motion.div variants={staggerChild}><StatCard icon={Gift} tone="purple" label="Bonuses" value="₹2,400" sub="3 active incentives" /></motion.div>
      </motion.div>
      <div className="partner-grid-two">
        <motion.div
          className="partner-card earnings-chart"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <div className="partner-card-title">
            <div><h2>Weekly earnings</h2><p>Your payout trend over the last 7 days</p></div>
            <button className="partner-select">This week <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>
          </div>
          <div className="earnings-bars">
            {bars.map((h, i) => (
              <div key={i}>
                <motion.i
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                />
                <span>{days[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="partner-card payout-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <div className="partner-card-title">
            <div><h2>Next payout</h2><p>Scheduled for Friday, 27 June</p></div>
            <Landmark />
          </div>
          <strong>₹8,420</strong>
          <span>Includes 23 completed deliveries</span>
          <Button href="/partner/withdraw">Manage payout <ChevronRight /></Button>
        </motion.div>
      </div>
      <motion.div
        className="partner-card payout-table"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="partner-card-title">
          <div><h2>Recent payouts</h2><p>Your latest completed payout cycles</p></div>
          <Link href="/partner/wallet">View wallet <ChevronRight /></Link>
        </div>
        {payouts.map(({ date, amount }, i) => (
          <motion.div
            className="payout-row"
            key={date}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.35 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="payout-icon"><Wallet /></span>
            <div><b>Weekly payout</b><small>{date} · 23 deliveries</small></div>
            <strong>{money(amount)}</strong>
            <Status color="green">Paid</Status>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ── Overview (Dashboard) ── */
export function Overview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeading
        eyebrow="Partner workspace / Overview"
        title="Partner overview"
        description="Your delivery command center for a more productive day."
        action={<Button href="/partner/orders">View all orders <ChevronRight /></Button>}
      />
      <Welcome />
      <motion.div
        className="partner-stat-grid"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={staggerChild}><StatCard icon={Package} tone="blue" label="Deliveries today" value="8" sub="+2 from yesterday" /></motion.div>
        <motion.div variants={staggerChild}><StatCard icon={Wallet} tone="green" label="Today&apos;s earnings" value="₹1,840" sub="+18.4% this week" /></motion.div>
        <motion.div variants={staggerChild}><StatCard icon={Clock3} tone="orange" label="Online hours" value="6h 24m" sub="Goal: 8 hours" /></motion.div>
        <motion.div variants={staggerChild}><StatCard icon={Star} tone="purple" label="Partner rating" value="4.9" sub="Top 12% this month" /></motion.div>
      </motion.div>
      <div className="partner-grid-two">
        <Incoming />
        <QuickActions />
      </div>
      <div className="partner-grid-two bottom">
        <ActiveDelivery />
        <Performance />
      </div>
    </motion.div>
  )
}
