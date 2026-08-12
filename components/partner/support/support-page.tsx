'use client'

import { useState } from 'react'
import { CircleHelp, MessageSquare, ChevronDown, ChevronRight, Send, Loader2, CheckCircle2, Package, Wallet, FileText, Settings } from 'lucide-react'
import { PageHeading, Button } from '../ui/partner-ui'
import * as partnerService from '@/services/partner.service'

const faqs = [
  { q: 'How do I accept an order?', a: 'When a new order appears in your dashboard, tap "Accept" to take the delivery. You have a limited time window to accept before the order is reassigned.' },
  { q: 'How are my earnings calculated?', a: 'Earnings are based on distance, order type, and time. You can view the breakdown in your Earnings section. Bonuses and incentives are added separately.' },
  { q: 'What if I can\'t complete a pickup?', a: 'Use the "Report pickup issue" option in the pickup workflow. Select the appropriate reason. Our support team will handle the rest.' },
  { q: 'How do I update my documents?', a: 'Go to Documents & KYC in your profile. You can upload, replace, or re-upload any document. Verification typically takes 24-48 hours.' },
  { q: 'When do I receive my payout?', a: 'Payouts are processed weekly. You can check the schedule and request early withdrawals from the Wallet section.' },
]

export function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!subject || !description) return
    setSubmitting(true)
    await partnerService.submitSupportTicket({ subject, description })
    setSubmitting(false)
    setSubmitted(true)
    setSubject('')
    setDescription('')
  }

  return (
    <>
      <PageHeading eyebrow="Partner workspace / Support" title="Help & support" description="Find answers, report issues, or contact our support team." />

      <div className="partner-card" style={{ padding: 20, marginBottom: 14 }}>
        <div className="partner-card-title" style={{ marginBottom: 16 }}>
          <div><h2>Frequently asked questions</h2><p>Quick answers to common questions</p></div>
          <CircleHelp size={18} style={{ color: '#ff6b2c' }} />
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid #edf2f7' }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '14px 0', border: 0, background: 'transparent', cursor: 'pointer', textAlign: 'left', color: '#294a70', fontSize: 11, fontWeight: 700 }}
            >
              {faq.q}
              <ChevronDown size={14} style={{ color: '#ff6b2c', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
            </button>
            {openFaq === i && <p style={{ margin: '0 0 14px', color: '#71849d', fontSize: 10, lineHeight: 1.6 }}>{faq.a}</p>}
          </div>
        ))}
      </div>

      <div className="partner-card" style={{ padding: 20 }}>
        <div className="partner-card-title" style={{ marginBottom: 16 }}>
          <div><h2>Contact support</h2><p>Describe your issue and our team will get back to you</p></div>
          <MessageSquare size={18} style={{ color: '#1154d9' }} />
        </div>

        {submitted ? (
          <div className="partner-empty" style={{ padding: '24px 0' }}>
            <CheckCircle2 size={28} style={{ color: '#2dbb76', background: 'transparent', padding: 0 }} />
            <b>Ticket submitted</b>
            <span>Our support team will respond within 24 hours.</span>
            <button className="partner-button secondary" onClick={() => setSubmitted(false)} style={{ marginTop: 8 }}>Submit another</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#52657f', fontSize: 10, fontWeight: 700 }}>Subject</label>
              <input
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g., Issue with order PT-2841"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #dce7f4', borderRadius: 7, fontSize: 11, outline: 'none' }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#52657f', fontSize: 10, fontWeight: 700 }}>Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your issue in detail..."
                rows={4}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #dce7f4', borderRadius: 7, fontSize: 11, outline: 'none', resize: 'vertical' }}
              />
            </div>
            <Button onClick={handleSubmit} disabled={submitting || !subject || !description}>
              {submitting ? <Loader2 size={14} className="slide-spinner" /> : <Send size={14} />} Submit ticket
            </Button>
          </>
        )}
      </div>
    </>
  )
}
