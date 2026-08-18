'use client'

import type React from 'react'
import Link from 'next/link'
import { Check, ChevronRight, Home, Package, Truck } from 'lucide-react'

export type Icon = React.ComponentType<{ className?: string }>

export const money = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export function Brand() {
  return (
    <Link href="/partner" className="partner-brand">
      <span className="partner-mark"><i /><i /><i /></span>
      <b>Patel<span>Technology</span></b>
    </Link>
  )
}

export function Status({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) {
  return <span className={`partner-status ${color}`}><i />{children}</span>
}

export function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  disabled,
  className = '',
  type = 'button',
  style,
}: {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
  style?: React.CSSProperties
}) {
  const c = `partner-button ${variant === 'secondary' ? 'secondary' : ''} ${className}`.trim()
  return href
    ? <Link href={href} className={c} style={style}>{children}</Link>
    : <button className={c} onClick={onClick} disabled={disabled} type={type} style={style}>{children}</button>
}

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="partner-heading">
      <div>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{description}</span>
      </div>
      {action}
    </div>
  )
}

export function StatCard({
  icon: IconComp,
  tone,
  label,
  value,
  sub,
}: {
  icon: Icon
  tone: string
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="partner-stat">
      <span className={`partner-stat-icon ${tone}`}><IconComp /></span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{sub}</small>
      </div>
    </div>
  )
}

export function MiniMap() {
  return (
    <div className="partner-map">
      <div className="partner-map-grid" />
      <div className="partner-map-road road-1" />
      <div className="partner-map-road road-2" />
      <div className="partner-map-road road-3" />
      <span className="map-name name-1">Vijay Nagar</span>
      <span className="map-name name-2">Palasia</span>
      <span className="map-name name-3">Rajwada</span>
      <span className="partner-map-route" />
      <span className="partner-map-marker start"><Package /></span>
      <span className="partner-map-marker end"><Home /></span>
      <div className="map-vehicle">
        <Truck /> <b>PT-2841</b>
        <span>On route</span>
      </div>
    </div>
  )
}

export function Placeholder({
  title,
  icon: IconComp,
  text,
  action,
}: {
  title: string
  icon: Icon
  text: string
  action?: React.ReactNode
}) {
  return (
    <>
      <PageHeading eyebrow="Partner workspace" title={title} description={text} action={action} />
      <div className="partner-placeholder">
        <span><IconComp /></span>
        <h2>{title} workspace</h2>
        <p>This area is ready for your partner operations. Keep everything in one clean, reliable place.</p>
        <Button>{title === 'Withdraw funds' ? 'Request withdrawal' : 'Explore workspace'} <ChevronRight /></Button>
      </div>
    </>
  )
}
