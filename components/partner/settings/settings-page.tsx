'use client'

import { useState } from 'react'
import { Settings, Bell, Moon, Sun, Globe, LogOut, ChevronRight, ShieldCheck, Smartphone } from 'lucide-react'
import { PageHeading, Button } from '../ui/partner-ui'
import Link from 'next/link'

export function SettingsPage() {
  const [notifications, setNotifications] = useState({ orders: true, earnings: true, promotions: false, updates: true })

  return (
    <>
      <PageHeading eyebrow="Partner workspace / Account" title="Settings" description="Configure your preferences, notifications, and account." />

      <div className="partner-card" style={{ padding: 20, marginBottom: 14 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 14, color: '#0b2a62' }}>Notification preferences</h2>
        {[
          { key: 'orders', label: 'Order updates', desc: 'New orders, status changes, and completions' },
          { key: 'earnings', label: 'Earnings & payouts', desc: 'Payout confirmations and earning milestones' },
          { key: 'promotions', label: 'Promotions & incentives', desc: 'Special offers and bonus opportunities' },
          { key: 'updates', label: 'App updates', desc: 'New features and app improvements' },
        ].map(item => (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #edf2f7' }}>
            <Bell size={15} style={{ color: '#8a9aae' }} />
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 11, color: '#294a70', display: 'block' }}>{item.label}</b>
              <small style={{ color: '#91a0b5', fontSize: 9 }}>{item.desc}</small>
            </div>
            <button
              className={`partner-online-toggle-btn ${notifications[item.key as keyof typeof notifications] ? 'active' : ''}`}
              onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
              aria-label={`Toggle ${item.label}`}
              style={{ position: 'relative', width: 30, height: 17, padding: 0, border: 0, borderRadius: 99, background: notifications[item.key as keyof typeof notifications] ? '#2dbb76' : '#c5cfdb', cursor: 'pointer' }}
            >
              <i style={{ position: 'absolute', top: 3, left: notifications[item.key as keyof typeof notifications] ? 16 : 3, width: 11, height: 11, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
            </button>
          </div>
        ))}
      </div>

      <div className="partner-card" style={{ padding: 20, marginBottom: 14 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 14, color: '#0b2a62' }}>Account</h2>
        {[
          { icon: <ShieldCheck size={15} />, label: 'Privacy & security', href: '#' },
          { icon: <Smartphone size={15} />, label: 'Connected devices', href: '#' },
          { icon: <Globe size={15} />, label: 'Language', href: '#', extra: 'English' },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid #edf2f7', color: 'inherit' }}>
            <span style={{ color: '#8a9aae' }}>{item.icon}</span>
            <b style={{ flex: 1, fontSize: 11, color: '#294a70' }}>{item.label}</b>
            {item.extra && <small style={{ color: '#8a9aae', fontSize: 9 }}>{item.extra}</small>}
            <ChevronRight size={14} style={{ color: '#a0adbd' }} />
          </Link>
        ))}
      </div>

      <Link href="/login" className="partner-button secondary" style={{ width: '100%', justifyContent: 'center', color: '#d95b66' }}>
        <LogOut size={15} /> Sign out
      </Link>
    </>
  )
}
