'use client'

import { useState, useEffect } from 'react'
import { Bell, Check, CheckCheck, Loader2, Package, Wallet, FileText, UserRound, Settings } from 'lucide-react'
import { PageHeading, Button } from '../ui/partner-ui'
import * as partnerService from '@/services/partner.service'
import type { Notification } from '@/types/partner'
import Link from 'next/link'

const typeIcons: Record<Notification['type'], React.ReactNode> = {
  order: <Package size={15} />,
  earnings: <Wallet size={15} />,
  document: <FileText size={15} />,
  account: <UserRound size={15} />,
  system: <Settings size={15} />,
}
const typeColors: Record<Notification['type'], string> = {
  order: '#1154d9', earnings: '#2dbb76', document: '#ff6b2c', account: '#7957d8', system: '#8a9aae',
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    partnerService.getNotifications().then(n => { setNotifications(n); setLoading(false) })
  }, [])

  const handleMarkRead = async (id: string) => {
    await partnerService.markNotificationRead(id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleMarkAllRead = async () => {
    await partnerService.markAllNotificationsRead()
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      <PageHeading
        eyebrow="Partner workspace / Account"
        title="Notifications"
        description="Stay updated with your deliveries, earnings, and account."
        action={unreadCount > 0 ? <Button variant="secondary" onClick={handleMarkAllRead}><CheckCheck size={14} /> Mark all read</Button> : undefined}
      />

      {loading ? (
        <div className="partner-card" style={{ padding: 40 }}><div className="partner-empty"><Loader2 className="slide-spinner" /><b>Loading notifications...</b></div></div>
      ) : notifications.length === 0 ? (
        <div className="partner-card" style={{ padding: 40 }}><div className="partner-empty"><Bell /><b>No notifications</b><span>You&apos;re all caught up!</span></div></div>
      ) : (
        <div style={{ display: 'grid', gap: 6 }}>
          {notifications.map(n => (
            <div
              key={n.id}
              className="partner-card"
              style={{ padding: '14px 16px', borderLeftWidth: 3, borderLeftColor: n.read ? 'transparent' : typeColors[n.type], cursor: 'pointer' }}
              onClick={() => handleMarkRead(n.id)}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                <span className="payout-icon" style={{ background: typeColors[n.type] + '18', color: typeColors[n.type], flexShrink: 0 }}>
                  {typeIcons[n.type]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <b style={{ fontSize: 11, color: n.read ? '#8a9aae' : '#294a70' }}>{n.title}</b>
                    <small style={{ color: '#91a0b5', fontSize: 8, whiteSpace: 'nowrap' }}>
                      {new Date(n.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: 10, color: '#71849d', lineHeight: 1.5 }}>{n.message}</p>
                  {n.actionUrl && (
                    <Link href={n.actionUrl} style={{ fontSize: 9, color: '#1154d9', fontWeight: 700, marginTop: 6, display: 'inline-block' }}>
                      View details →
                    </Link>
                  )}
                </div>
                {!n.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: typeColors[n.type], flexShrink: 0, marginTop: 4 }} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
