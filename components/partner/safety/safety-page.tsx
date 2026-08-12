'use client'

import { ShieldAlert, Phone, AlertTriangle, MapPin, Info, ChevronRight } from 'lucide-react'
import { PageHeading, Button } from '../ui/partner-ui'
import Link from 'next/link'

export function SafetyPage() {
  return (
    <>
      <PageHeading eyebrow="Partner workspace / Safety" title="Safety & emergency" description="Your safety is our priority. Access emergency features and safety resources." />

      <div className="partner-card" style={{ padding: 20, marginBottom: 14, borderLeftWidth: 3, borderLeftColor: '#d95b66' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span className="payout-icon" style={{ background: '#fef2f2', color: '#d95b66' }}><ShieldAlert size={18} /></span>
          <div>
            <b style={{ fontSize: 13, color: '#0b2a62', display: 'block' }}>Emergency assistance</b>
            <small style={{ color: '#71849d', fontSize: 10 }}>Call emergency services immediately if you are in danger</small>
          </div>
        </div>
        <a href="tel:112" className="partner-button" style={{ width: '100%', justifyContent: 'center', background: '#d95b66', boxShadow: '0 8px 18px rgba(217,91,102,0.25)' }}>
          <Phone size={15} /> Call Emergency (112)
        </a>
      </div>

      <div className="partner-card" style={{ padding: 20, marginBottom: 14 }}>
        <div className="partner-card-title" style={{ marginBottom: 16 }}>
          <div><h2>Safety information</h2><p>Important guidelines for safe deliveries</p></div>
          <Info size={18} style={{ color: '#1154d9' }} />
        </div>
        {[
          { icon: <MapPin size={14} />, title: 'Share live location', desc: 'Your live location is shared with the operations team during active deliveries for your safety.' },
          { icon: <AlertTriangle size={14} />, title: 'Report unsafe situations', desc: 'If you feel unsafe at a pickup or delivery location, report it immediately through the app.' },
          { icon: <ShieldAlert size={14} />, title: 'Night delivery protocol', desc: 'For deliveries after 9 PM, ensure you are in well-lit areas and follow the night safety guidelines.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 0', borderBottom: '1px solid #edf2f7', alignItems: 'start' }}>
            <span style={{ color: '#ff6b2c', marginTop: 2 }}>{item.icon}</span>
            <div>
              <b style={{ fontSize: 11, color: '#294a70', display: 'block' }}>{item.title}</b>
              <p style={{ margin: '4px 0 0', color: '#71849d', fontSize: 10, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/partner/support" className="partner-button secondary" style={{ width: '100%', justifyContent: 'center' }}>
        Contact support <ChevronRight size={14} />
      </Link>
    </>
  )
}
