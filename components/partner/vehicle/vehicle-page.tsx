'use client'

import { Bike, Hash, ShieldCheck, FileText, ChevronRight, Check, AlertCircle } from 'lucide-react'
import { PageHeading, Button, Status } from '../ui/partner-ui'

export function VehiclePage() {
  const vehicle: {
    type: string
    number: string
    rcStatus: 'approved' | 'pending'
    insuranceStatus: 'approved' | 'pending'
    verified: boolean
    model: string
    year: string
  } = {
    type: 'Bike', number: 'MP-09-XX-4821',
    rcStatus: 'approved', insuranceStatus: 'pending',
    verified: true, model: 'Honda Activa 6G', year: '2023',
  }

  return (
    <>
      <PageHeading eyebrow="Partner workspace / Account" title="Vehicle" description="Your registered vehicle and verification status." />
      <div className="partner-card" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <span className="partner-stat-icon blue" style={{ width: 52, height: 52 }}><Bike size={24} /></span>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, color: '#0b2a62' }}>{vehicle.model}</h2>
            <small style={{ color: '#8a9aae' }}>{vehicle.type} · {vehicle.year}</small>
            <div style={{ marginTop: 6 }}><Status color={vehicle.verified ? 'green' : 'orange'}>{vehicle.verified ? 'Verified' : 'Verification pending'}</Status></div>
          </div>
        </div>

        {[
          { icon: <Hash size={15} />, label: 'Registration number', value: vehicle.number },
          { icon: <FileText size={15} />, label: 'RC status', value: vehicle.rcStatus === 'approved' ? 'Approved' : 'Pending', color: vehicle.rcStatus === 'approved' ? 'green' : 'orange' },
          { icon: <ShieldCheck size={15} />, label: 'Insurance status', value: vehicle.insuranceStatus === 'approved' ? 'Approved' : 'Under review', color: vehicle.insuranceStatus === 'approved' ? 'green' : 'orange' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid #edf2f7' }}>
            <span style={{ color: '#8a9aae' }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <small style={{ color: '#8a9aae', fontSize: 9 }}>{item.label}</small>
              <b style={{ display: 'block', fontSize: 11, color: '#294a70' }}>{item.value}</b>
            </div>
            {'color' in item && <Status color={item.color}>{item.value}</Status>}
          </div>
        ))}
      </div>
      <Button href="/partner/documents" variant="secondary">Manage documents <ChevronRight size={14} /></Button>
    </>
  )
}
