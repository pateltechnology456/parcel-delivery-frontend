'use client'

import type React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, Bike, ChevronDown, CircleHelp, CreditCard, FileText, Gauge,
  LayoutDashboard, ListChecks, LogOut, Menu, Moon, Navigation, PanelLeftClose,
  Settings, Sun, UserRound, Wallet,
} from 'lucide-react'

/* ── Modular imports ── */
import { Brand } from './ui/partner-ui'
import { Placeholder } from './ui/partner-ui'
import { Overview, Earnings } from './dashboard/overview'
import { Orders } from './orders/order-list'
import { OrderDetail } from './orders/order-detail'
import { NavigationPage } from './navigation/navigation-page'
import { Landmark } from 'lucide-react'
import { Button } from './ui/partner-ui'

/* ── Nav config ── */
const nav = [
  { label: 'Overview', href: '/partner', icon: LayoutDashboard },
  { label: 'My Orders', href: '/partner/orders', icon: ListChecks, badge: 4 },
  { label: 'Navigation', href: '/partner/navigation', icon: Navigation },
]

/* ── Shell ── */
function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [online, setOnline] = useState(true)
  return (
    <div className={`partner-shell ${dark ? 'partner-dark' : ''}`}>
      <AnimatePresence>
        {open && (
          <motion.button
            key="overlay"
            aria-label="Close navigation"
            className="partner-overlay"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <aside className={`partner-sidebar ${open ? 'open' : ''}`}>
        <div className="partner-sidebar-top">
          <Brand />
          <motion.button
            className="partner-close"
            onClick={() => setOpen(false)}
            whileTap={{ scale: 0.9 }}
          >
            <PanelLeftClose />
          </motion.button>
        </div>
        <div className="partner-profile-card">
          <span>AK</span>
          <div><b>Arjun Kumar</b><small>Delivery Partner</small></div>
          <ChevronDown />
        </div>
        <div className="partner-online-toggle">
          <motion.span
            className={online ? 'is-online' : ''}
            animate={{ backgroundColor: online ? '#22c55e' : '#94a3b8' }}
            transition={{ duration: 0.3 }}
          />
          <div>
            <b>{online ? 'You are online' : 'You are offline'}</b>
            <small>{online ? 'Ready for deliveries' : 'Go online to receive orders'}</small>
          </div>
          <motion.button
            aria-label="Toggle online status"
            onClick={() => setOnline(v => !v)}
            className={online ? 'active' : ''}
            whileTap={{ scale: 0.9 }}
          >
            <i />
          </motion.button>
        </div>
        <nav className="partner-nav">
          <p>Main menu</p>
          {nav.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="partner-nav-link">
              <item.icon /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}
            </Link>
          ))}
          <p className="partner-spaced">Finance</p>
          <Link href="/partner/earnings" className="partner-nav-link"><Wallet /><span>Earnings</span></Link>
          <Link href="/partner/wallet" className="partner-nav-link"><CreditCard /><span>Wallet</span></Link>
          <p className="partner-spaced">Account</p>
          <Link href="/partner/notifications" className="partner-nav-link"><Bell /><span>Notifications</span><em>3</em></Link>
          <Link href="/partner/profile" className="partner-nav-link"><UserRound /><span>My profile</span></Link>
          <Link href="/partner/settings" className="partner-nav-link"><Settings /><span>Settings</span></Link>
        </nav>
        <div className="partner-sidebar-bottom">
          <div className="partner-help">
            <CircleHelp />
            <div><b>Need help?</b><small>Contact partner support</small></div>
          </div>
          <Link className="partner-logout" href="/login"><LogOut /> Sign out</Link>
        </div>
      </aside>

      <main className="partner-main">
        <header className="partner-topbar">
          <motion.button
            aria-label="Open navigation"
            className="partner-mobile-menu"
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.88 }}
          >
            <Menu />
          </motion.button>
          <div className="partner-search">
            <Gauge /><input placeholder="Search orders, earnings..." /><kbd>⌘ K</kbd>
          </div>
          <div className="partner-top-actions">
            <motion.button
              className="partner-icon-button"
              onClick={() => setDark(v => !v)}
              aria-label="Toggle theme"
              whileTap={{ scale: 0.88, rotate: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              {dark ? <Sun /> : <Moon />}
            </motion.button>
            <motion.button
              className="partner-icon-button partner-bell"
              aria-label="Notifications"
              whileTap={{ scale: 0.88 }}
              animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
              transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 8 }}
            >
              <Bell /><i />
            </motion.button>
            <div className="partner-user">
              <span>AK</span>
              <div><b>Arjun Kumar</b><small>ID: PT-DRV-2841</small></div>
              <ChevronDown />
            </div>
          </div>
        </header>
        <div className="partner-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

import { WalletPage } from './wallet/wallet-page'
import { DocumentsPage } from './documents/documents-page'
import { NotificationsPage } from './notifications/notifications-page'
import { ProfilePage } from './profile/profile-page'
import { SettingsPage } from './settings/settings-page'
import { VehiclePage } from './vehicle/vehicle-page'
import { SupportPage } from './support/support-page'
import { SafetyPage } from './safety/safety-page'

/* ── Page Router ── */
function PartnerPage({ section, orderId }: { section?: string; orderId?: string }) {
  if (orderId) return <OrderDetail id={orderId} />
  if (section === 'orders') return <Orders />
  if (section === 'navigation') return <NavigationPage />
  if (section === 'earnings') return <Earnings />
  if (section === 'wallet') return <WalletPage />
  if (section === 'withdraw') return <Placeholder title="Withdraw funds" icon={Landmark} text="Move your available earnings to your registered bank account." />
  if (section === 'notifications') return <NotificationsPage />
  if (section === 'profile') return <ProfilePage />
  if (section === 'vehicle') return <VehiclePage />
  if (section === 'documents') return <DocumentsPage />
  if (section === 'settings') return <SettingsPage />
  if (section === 'support') return <SupportPage />
  if (section === 'safety') return <SafetyPage />
  return <Overview />
}

/* ── Bottom Nav ── */
function PartnerBottomNav({ section }: { section?: string }) {
  const tabs = [
    { href: '/partner', label: 'Home', icon: LayoutDashboard, key: undefined },
    { href: '/partner/orders', label: 'Orders', icon: ListChecks, key: 'orders' },
    { href: '/partner/navigation', label: 'Navigate', icon: Navigation, key: 'navigation', center: true },
    { href: '/partner/earnings', label: 'Earnings', icon: Wallet, key: 'earnings' },
    { href: '/partner/profile', label: 'Profile', icon: UserRound, key: 'profile' },
  ]
  return (
    <nav className="partner-mobile-bottom-nav" aria-label="Mobile partner navigation">
      {tabs.map(({ href, label, icon: Icon, key, center }) => {
        const isActive = section === key || (!section && !key)
        return (
          <Link key={href} href={href} className={`${isActive ? 'pnav-active' : ''}${center ? ' pnav-center' : ''}`} aria-label={label}>
            <motion.div
              whileTap={{ scale: 0.82 }}
              whileHover={{ scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
            >
              <motion.div
                animate={isActive ? { y: -2 } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon />
              </motion.div>
              {!center && (
                <motion.span
                  animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.span>
              )}
            </motion.div>
          </Link>
        )
      })}
    </nav>
  )
}

export default function PartnerApp({ section, orderId }: { section?: string; orderId?: string }) {
  return (
    <Shell>
      <PartnerPage section={section} orderId={orderId} />
      <PartnerBottomNav section={section} />
    </Shell>
  )
}
