'use client'

import type React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, Bike, ChevronDown, ChevronRight, CircleHelp, CreditCard, FileText, Gauge,
  LayoutDashboard, ListChecks, LogOut, Menu, Moon, Navigation, PanelLeftClose,
  Settings, Star, Sun, UserRound, Wallet, Zap, ShieldCheck
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
  const [profileOpen, setProfileOpen] = useState(false)

  const handleSignOut = () => {
    localStorage.removeItem("mock_current_user");
    localStorage.removeItem("active_booking_draft");
    localStorage.removeItem("estimate_data");
    window.location.href = "/login";
  }

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
        <div className="partner-profile-card" onClick={() => setProfileOpen(true)} style={{ cursor: 'pointer' }}>
          <span>AK</span>
          <div><b>Arjun Kumar</b><small>Delivery Partner · ⭐ 4.9</small></div>
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
          <Link href="/partner/vehicle" className="partner-nav-link"><Bike /><span>Vehicle details</span></Link>
          <Link href="/partner/documents" className="partner-nav-link"><FileText /><span>KYC & Documents</span></Link>
          <Link href="/partner/settings" className="partner-nav-link"><Settings /><span>Settings</span></Link>
        </nav>
        <div className="partner-sidebar-bottom">
          <div className="partner-help">
            <CircleHelp />
            <div><b>Need help?</b><small>Contact partner support</small></div>
          </div>
          <button
            type="button"
            className="partner-logout"
            onClick={handleSignOut}
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <LogOut /> Sign out
          </button>
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

            {/* Profile Menu Trigger & Dropdown */}
            <div className="partner-profile-dropdown-wrapper" style={{ position: 'relative' }}>
              <div
                className="partner-user"
                onClick={() => setProfileOpen(!profileOpen)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <span>AK</span>
                <div><b>Arjun Kumar</b><small>ID: PT-DRV-2841</small></div>
                <ChevronDown size={14} style={{ transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </div>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    {/* Backdrop for closing */}
                    <div
                      onClick={() => setProfileOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                    />

                    {/* Floating Dropdown Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        width: '280px',
                        background: '#ffffff',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px -8px rgba(11, 42, 98, 0.18), 0 0 0 1px #e2e8f0',
                        border: '1px solid #e2e8f0',
                        zIndex: 100,
                        overflow: 'hidden',
                        padding: '8px'
                      }}
                    >
                      {/* Driver Card Header */}
                      <div style={{
                        padding: '12px 14px',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #edf4ff 100%)',
                        borderRadius: '12px',
                        marginBottom: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: '#1154d9',
                            color: '#ffffff',
                            display: 'grid',
                            placeItems: 'center',
                            fontWeight: 800,
                            fontSize: '13px'
                          }}>AK</span>
                          <div style={{ flex: 1 }}>
                            <b style={{ fontSize: '14px', color: '#0b2a62', display: 'block' }}>Arjun Kumar</b>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                              <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>PT-DRV-2841</span>
                              <span style={{ fontSize: '10.5px', color: '#f59e0b', fontWeight: 800 }}>★ 4.9</span>
                            </div>
                          </div>
                        </div>

                        {/* Vehicle & Duty Pill */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(226, 232, 240, 0.8)', fontSize: '11px' }}>
                          <span style={{ color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Bike size={13} color="#1154d9" /> MP-09-XX-4821
                          </span>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: online ? '#16a34a' : '#64748b',
                            background: online ? '#dcfce7' : '#f1f5f9',
                            padding: '2px 8px',
                            borderRadius: '99px'
                          }}>
                            {online ? '● Online' : '○ Offline'}
                          </span>
                        </div>
                      </div>

                      {/* Menu List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <Link
                          href="/partner/profile"
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            color: '#334155',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#1154d9'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#334155'; }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <UserRound size={15} color="#1154d9" /> My Profile
                          </span>
                          <ChevronRight size={13} color="#94a3b8" />
                        </Link>

                        <Link
                          href="/partner/vehicle"
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            color: '#334155',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#1154d9'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#334155'; }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Bike size={15} color="#1154d9" /> Vehicle Details
                          </span>
                          <ChevronRight size={13} color="#94a3b8" />
                        </Link>

                        <Link
                          href="/partner/documents"
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            color: '#334155',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#1154d9'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#334155'; }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={15} color="#1154d9" /> KYC & Documents
                          </span>
                          <ChevronRight size={13} color="#94a3b8" />
                        </Link>

                        <Link
                          href="/partner/settings"
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            color: '#334155',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#1154d9'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#334155'; }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Settings size={15} color="#1154d9" /> Settings
                          </span>
                          <ChevronRight size={13} color="#94a3b8" />
                        </Link>

                        <Link
                          href="/partner/support"
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            color: '#334155',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#1154d9'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#334155'; }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CircleHelp size={15} color="#1154d9" /> Partner Support
                          </span>
                          <ChevronRight size={13} color="#94a3b8" />
                        </Link>
                      </div>

                      {/* Sign out */}
                      <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #f1f5f9' }}>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          <LogOut size={15} /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
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
  ]
  return (
    <nav className="partner-mobile-bottom-nav" aria-label="Mobile partner navigation">
      {tabs.map(({ href, label, icon: Icon, key, center }) => {
        const isActive = section === key || (!section && !key)
        return (
          <Link
            key={href}
            href={href}
            className={`${isActive ? 'pnav-active' : ''}${center ? ' pnav-center' : ''}`}
            aria-label={label}
          >
            <motion.div
              whileTap={{ scale: 0.88 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                width: '100%',
                height: '100%'
              }}
            >
              <Icon size={center ? 22 : 19} />
              <span style={{ fontSize: '10.5px', fontWeight: isActive ? 800 : 600, letterSpacing: '-0.01em' }}>
                {label}
              </span>
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
