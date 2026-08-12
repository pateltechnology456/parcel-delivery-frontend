'use client'

import { useState, useEffect, useRef } from 'react'
import { FileText, Upload, Check, AlertCircle, Eye, Loader2, RotateCcw, ShieldCheck } from 'lucide-react'
import { PageHeading, Status, Button } from '../ui/partner-ui'
import * as partnerService from '@/services/partner.service'
import type { PartnerDocument, DocumentStatus } from '@/types/partner'

const statusColors: Record<DocumentStatus, string> = {
  approved: 'green', pending: 'orange', rejected: 'red', not_uploaded: 'blue'
}
const statusLabels: Record<DocumentStatus, string> = {
  approved: 'Approved', pending: 'Under review', rejected: 'Rejected', not_uploaded: 'Not uploaded'
}

export function DocumentsPage() {
  const [docs, setDocs] = useState<PartnerDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [activeType, setActiveType] = useState<PartnerDocument['type'] | null>(null)

  useEffect(() => {
    partnerService.getPartnerDocuments().then(d => { setDocs(d); setLoading(false) })
  }, [])

  const requiredDocs: { type: PartnerDocument['type']; label: string }[] = [
    { type: 'driving_license', label: 'Driving License' },
    { type: 'vehicle_rc', label: 'Vehicle RC' },
    { type: 'insurance', label: 'Vehicle Insurance' },
    { type: 'identity', label: 'Identity Document (Aadhaar)' },
  ]

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !activeType) return
    setUploading(activeType)
    try {
      const newDoc = await partnerService.uploadDocument(activeType, file)
      setDocs(prev => {
        const filtered = prev.filter(d => d.type !== activeType)
        return [...filtered, newDoc]
      })
    } catch {
      // Error handled silently in mock
    }
    setUploading(null)
    setActiveType(null)
    e.target.value = ''
  }

  const allApproved = requiredDocs.every(rd => docs.find(d => d.type === rd.type)?.status === 'approved')

  return (
    <>
      <PageHeading
        eyebrow="Partner workspace / Account"
        title="Documents & KYC"
        description="Upload and manage your verification documents."
      />
      <div className="partner-card" style={{ padding: 20, marginBottom: 14 }}>
        <div className="pickup-section-header" style={{ marginBottom: 16 }}>
          <ShieldCheck size={18} style={{ color: allApproved ? '#2dbb76' : '#ff6b2c' }} />
          <div>
            <b>KYC Status: {allApproved ? 'Complete' : 'Incomplete'}</b>
            <small>{allApproved ? 'All documents verified' : 'Some documents need attention'}</small>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="partner-card" style={{ padding: 40 }}>
          <div className="partner-empty"><Loader2 className="slide-spinner" /><b>Loading documents...</b></div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {requiredDocs.map(rd => {
            const doc = docs.find(d => d.type === rd.type)
            const status = doc?.status || 'not_uploaded'
            return (
              <div className="partner-card" style={{ padding: 16 }} key={rd.type}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="payout-icon" style={{ background: status === 'approved' ? '#e7faf0' : status === 'rejected' ? '#fef2f2' : '#e7f0ff', color: status === 'approved' ? '#2dbb76' : status === 'rejected' ? '#d95b66' : '#1154d9' }}>
                    <FileText size={15} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: 11, color: '#294a70', display: 'block' }}>{rd.label}</b>
                    {doc?.uploadedAt && <small style={{ color: '#91a0b5', fontSize: 9 }}>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</small>}
                    {doc?.rejectionReason && <small style={{ color: '#d95b66', fontSize: 9, display: 'block' }}>Reason: {doc.rejectionReason}</small>}
                  </div>
                  <Status color={statusColors[status]}>{statusLabels[status]}</Status>
                  {status !== 'approved' && (
                    <button
                      className="partner-button secondary"
                      style={{ padding: '0 10px', minHeight: 32, fontSize: 9 }}
                      onClick={() => { setActiveType(rd.type); fileRef.current?.click() }}
                      disabled={uploading === rd.type}
                    >
                      {uploading === rd.type ? <Loader2 size={13} className="slide-spinner" /> : status === 'not_uploaded' ? <><Upload size={13} /> Upload</> : <><RotateCcw size={13} /> Re-upload</>}
                    </button>
                  )}
                  {status === 'approved' && <Check size={16} style={{ color: '#2dbb76' }} />}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={handleUpload} hidden />
    </>
  )
}
