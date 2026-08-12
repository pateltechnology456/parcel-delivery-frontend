'use client'

import { useState } from 'react'
import { MapPin, Navigation, Check, KeyRound, AlertTriangle, Phone, User, ChevronRight, Home } from 'lucide-react'
import { SlideToAction } from '../pickup/slide-to-action'
import { OtpInput } from '../pickup/otp-input'
import { Status, Button } from '../ui/partner-ui'
import type { Order } from '@/types/order'
import * as orderService from '@/services/order.service'

type DeliveryStep = 'navigate' | 'arrived' | 'otp_verify' | 'confirmed' | 'failed'

interface DeliveryFlowProps {
  order: Order
  onComplete?: () => void
  /** OTP length — configurable per backend contract */
  otpLength?: number
}

export function DeliveryFlow({ order, onComplete, otpLength }: DeliveryFlowProps) {
  const [step, setStep] = useState<DeliveryStep>('navigate')
  const [failReason, setFailReason] = useState('')
  const [showFailForm, setShowFailForm] = useState(false)

  const handleConfirmArrival = async () => {
    await orderService.updateOrderStatus(order.id, 'arrived_at_customer')
    setStep('otp_verify')
  }

  const handleVerifyOtp = async (otp: string) => {
    const result = await orderService.verifyOtp(order.id, otp, 'delivery')
    if (result.success) {
      setStep('confirmed')
      await orderService.updateOrderStatus(order.id, 'delivered')
      onComplete?.()
    }
    return result
  }

  const handleFailedDelivery = async () => {
    if (!failReason.trim()) return
    await orderService.reportFailedDelivery(order.id, failReason)
    setStep('failed')
  }

  return (
    <div className="pickup-flow">
      {/* Step indicator */}
      <div className="pickup-steps">
        {[
          { key: 'navigate', label: 'Navigate' },
          { key: 'arrived', label: 'Arrive' },
          { key: 'otp_verify', label: 'Verify' },
          { key: 'confirmed', label: 'Done' },
        ].map((s, i) => {
          const stepOrder = ['navigate', 'arrived', 'otp_verify', 'confirmed']
          const currentIdx = stepOrder.indexOf(step)
          const thisIdx = stepOrder.indexOf(s.key)
          const isDone = thisIdx < currentIdx
          const isCurrent = s.key === step
          return (
            <div key={s.key} className={`pickup-step-dot ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <span>{isDone ? <Check size={10} /> : i + 1}</span>
              <small>{s.label}</small>
            </div>
          )
        })}
      </div>

      {/* Navigate to customer */}
      {step === 'navigate' && (
        <div className="pickup-section">
          <div className="pickup-section-header">
            <MapPin size={16} />
            <div>
              <b>Navigate to customer</b>
              <small>{order.delivery.area}, {order.delivery.city}</small>
            </div>
          </div>
          <div className="pickup-seller-card">
            <User size={16} />
            <div>
              <b>{order.customer.name}</b>
              <small>{order.delivery.address}</small>
            </div>
            <Button variant="secondary" className="pickup-call-btn">
              <Phone size={14} />
            </Button>
          </div>
          <Button href={`https://www.google.com/maps/dir/?api=1&destination=${order.delivery.lat},${order.delivery.lng}`} className="pickup-nav-btn">
            <Navigation size={15} /> Open in Google Maps
          </Button>
          <SlideToAction
            label="Slide to confirm arrival"
            onComplete={handleConfirmArrival}
          />
          <button className="pickup-fail-link" onClick={() => setShowFailForm(true)}>
            <AlertTriangle size={13} /> Report delivery issue
          </button>
        </div>
      )}

      {/* OTP verification */}
      {step === 'otp_verify' && (
        <div className="pickup-section">
          <div className="pickup-section-header">
            <KeyRound size={16} />
            <div>
              <b>Verify delivery OTP</b>
              <small>Ask the customer for the delivery OTP</small>
            </div>
          </div>
          <OtpInput
            length={otpLength}
            label="Enter customer OTP"
            onComplete={handleVerifyOtp}
          />
          <SlideToAction
            label="Slide to confirm delivery"
            variant="success"
            onComplete={async () => {
              setStep('confirmed')
              await orderService.updateOrderStatus(order.id, 'delivered')
              onComplete?.()
            }}
          />
        </div>
      )}

      {/* Confirmed */}
      {step === 'confirmed' && (
        <div className="pickup-section pickup-success">
          <div className="pickup-success-icon"><Check size={28} /></div>
          <b>Delivery complete!</b>
          <p>The parcel has been delivered successfully to {order.customer.name}.</p>
          <Button href="/partner/orders">
            Back to orders <ChevronRight size={15} />
          </Button>
        </div>
      )}

      {/* Failed */}
      {step === 'failed' && (
        <div className="pickup-section pickup-failed">
          <div className="pickup-failed-icon"><AlertTriangle size={28} /></div>
          <b>Delivery issue reported</b>
          <p>Our support team will follow up shortly.</p>
          <Button href="/partner/orders">
            Back to orders <ChevronRight size={15} />
          </Button>
        </div>
      )}

      {/* Failed delivery form */}
      {showFailForm && (
        <div className="pickup-fail-overlay" onClick={() => setShowFailForm(false)}>
          <div className="pickup-fail-form" onClick={e => e.stopPropagation()}>
            <b>Report delivery issue</b>
            <p>Let us know what went wrong.</p>
            <select value={failReason} onChange={e => setFailReason(e.target.value)}>
              <option value="">Select a reason</option>
              <option value="customer_unavailable">Customer not available</option>
              <option value="wrong_address">Wrong delivery address</option>
              <option value="customer_refused">Customer refused delivery</option>
              <option value="access_issue">Cannot access location</option>
              <option value="other">Other</option>
            </select>
            <div className="pickup-fail-actions">
              <button className="partner-button secondary" onClick={() => setShowFailForm(false)}>Cancel</button>
              <button className="partner-button" onClick={handleFailedDelivery} disabled={!failReason}>Submit report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
