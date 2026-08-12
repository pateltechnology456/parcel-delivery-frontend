'use client'

import { useState } from 'react'
import { UserRound, Mail, Phone, Star, ShieldCheck, Pencil, Check, Bike, Hash, Award } from 'lucide-react'
import { PageHeading, Button, Status } from '../ui/partner-ui'

export function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [profile] = useState({
    name: 'Arjun Kumar', email: 'arjun.kumar@email.com', phone: '+91 98765 43210',
    partnerId: 'PT-DRV-2841', rating: 4.9, totalDeliveries: 847, memberSince: 'November 2024',
    vehicle: { type: 'Bike', number: 'MP-09-XX-4821', verified: true },
    verified: true,
  })

  return (
    <>
      <PageHeading
        eyebrow="Partner workspace / Account"
        title="My profile"
        description="Your partner identity, rating, and contact details."
        action={<Button variant="secondary" onClick={() => setEditing(!editing)}>{editing ? <><Check size={14} /> Save</> : <><Pencil size={14} /> Edit</>}</Button>}
      />

      <div className="partner-detail-grid">
        <div className="partner-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1154d9', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 20, fontWeight: 700 }}>AK</div>
            <div>
              <h2 style={{ margin: 0, color: '#0b2a62', fontSize: 18 }}>{profile.name}</h2>
              <small style={{ color: '#8a9aae', fontSize: 10 }}>{profile.partnerId} · Member since {profile.memberSince}</small>
              <div style={{ marginTop: 6 }}><Status color="green">Verified partner</Status></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
            <div className="partner-stat" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}>
              <Star size={18} style={{ color: '#ffad2f' }} />
              <strong style={{ fontSize: 18 }}>{profile.rating}</strong>
              <small style={{ color: '#8a9aae' }}>Rating</small>
            </div>
            <div className="partner-stat" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}>
              <Award size={18} style={{ color: '#1154d9' }} />
              <strong style={{ fontSize: 18 }}>{profile.totalDeliveries}</strong>
              <small style={{ color: '#8a9aae' }}>Deliveries</small>
            </div>
            <div className="partner-stat" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}>
              <ShieldCheck size={18} style={{ color: '#2dbb76' }} />
              <strong style={{ fontSize: 14 }}>Verified</strong>
              <small style={{ color: '#8a9aae' }}>KYC</small>
            </div>
          </div>

          {[
            { icon: <Mail size={15} />, label: 'Email', value: profile.email },
            { icon: <Phone size={15} />, label: 'Phone', value: profile.phone },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid #edf2f7' }}>
              <span style={{ color: '#8a9aae' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <small style={{ color: '#8a9aae', fontSize: 9 }}>{item.label}</small>
                {editing ? (
                  <input defaultValue={item.value} style={{ display: 'block', width: '100%', border: '1px solid #dce7f4', borderRadius: 5, padding: '6px 8px', fontSize: 11, marginTop: 4 }} />
                ) : (
                  <b style={{ display: 'block', color: '#294a70', fontSize: 11 }}>{item.value}</b>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="partner-card" style={{ padding: 20, alignSelf: 'start' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 14, color: '#0b2a62' }}>Vehicle information</h2>
          {[
            { icon: <Bike size={15} />, label: 'Vehicle type', value: profile.vehicle.type },
            { icon: <Hash size={15} />, label: 'Vehicle number', value: profile.vehicle.number },
            { icon: <ShieldCheck size={15} />, label: 'Verification', value: profile.vehicle.verified ? 'Verified' : 'Pending' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid #edf2f7' }}>
              <span style={{ color: '#8a9aae' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <small style={{ color: '#8a9aae', fontSize: 9 }}>{item.label}</small>
                <b style={{ display: 'block', color: '#294a70', fontSize: 11 }}>{item.value}</b>
              </div>
            </div>
          ))}
          <Button href="/partner/vehicle" variant="secondary" className="" style={{ width: '100%', marginTop: 14 }}>
            Manage vehicle →
          </Button>
        </div>
      </div>
    </>
  )
}
