'use client'

import { useState } from 'react'
import { MapPin, Navigation, Check, Camera, KeyRound, AlertTriangle, Phone, Store, ChevronRight } from 'lucide-react'
import { SlideToAction } from './slide-to-action'
import { OtpInput } from './otp-input'
import { ParcelPhotos } from './parcel-photos'
import { Status, Button } from '../ui/partner-ui'
import type { Order } from '@/types/order'
import * as orderService from '@/services/order.service'

type PickupStep = 'navigate' | 'arrived' | 'photos' | 'otp_generate' | 'otp_verify' | 'confirmed' | 'failed'

interface PickupFlowProps {
  order: Order
  onComplete?: () => void
  /** OTP length — configurable per backend contract */
  otpLength?: number
}

export function PickupFlow({ order, onComplete, otpLength }: PickupFlowProps) {
  const [step, setStep] = useState<PickupStep>('navigate')
  const [otpGenerated, setOtpGenerated] = useState(false)
  const [failReason, setFailReason] = useState('')
  const [showFailForm, setShowFailForm] = useState(false)

  const handleConfirmArrival = async () => {
    await orderService.updateOrderStatus(order.id, 'arrived_at_seller')
    setStep('photos')
  }

  const handlePhotosComplete = () => {
    setStep('otp_generate')
  }

  const handleGenerateOtp = async () => {
    await orderService.generateOtp(order.id, 'pickup')
    setOtpGenerated(true)
    setStep('otp_verify')
  }

  const handleVerifyOtp = async (otp: string) => {
    const result = await orderService.verifyOtp(order.id, otp, 'pickup')
    if (result.success) {
      setStep('confirmed')
      await orderService.updateOrderStatus(order.id, 'pickup_confirmed')
      onComplete?.()
    }
    return result
  }

  const handleFailedPickup = async () => {
    if (!failReason.trim()) return
    await orderService.reportFailedPickup(order.id, failReason)
    setStep('failed')
  }

  return (
    <div className="pickup-flow">
      {/* ── Step indicator ── */}
      <div className="pickup-steps">
        {[
          { key: 'navigate', label: 'Navigate' },
          { key: 'arrived', label: 'Arrive' },
          { key: 'photos', label: 'Photos' },
          { key: 'otp_generate', label: 'OTP' },
          { key: 'otp_verify', label: 'Verify' },
          { key: 'confirmed', label: 'Done' },
        ].map((s, i, arr) => {
          const stepOrder = ['navigate', 'arrived', 'photos', 'otp_generate', 'otp_verify', 'confirmed']
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

      {/* ── Navigate to seller ── */}
      {step === 'navigate' && (
        <div className="pickup-section">
          <div className="pickup-section-header">
            <MapPin size={16} />
            <div>
              <b>Navigate to seller</b>
              <small>{order.pickup.area}, {order.pickup.city}</small>
            </div>
          </div>
          <div className="pickup-seller-card">
            <Store size={16} />
            <div>
              <b>{order.seller.name}</b>
              <small>{order.pickup.address}</small>
            </div>
            <Button variant="secondary" className="pickup-call-btn">
              <Phone size={14} />
            </Button>
          </div>
          <Button href={`https://www.google.com/maps/dir/?api=1&destination=${order.pickup.lat},${order.pickup.lng}`} className="pickup-nav-btn">
            <Navigation size={15} /> Open in Google Maps
          </Button>
          <SlideToAction
            label="Slide to confirm arrival"
            onComplete={handleConfirmArrival}
          />
          <button className="pickup-fail-link" onClick={() => setShowFailForm(true)}>
            <AlertTriangle size={13} /> Report pickup issue
          </button>
        </div>
      )}

      {/* ── Arrived — capture photos ── */}
      {step === 'photos' && (
        <div className="pickup-section">
          <div className="pickup-section-header">
            <Camera size={16} />
            <div>
              <b>Capture parcel photos</b>
              <small>Take 1-4 photos of the parcel for verification</small>
            </div>
          </div>
          <ParcelPhotos
            maxPhotos={4}
            onUpload={async (files) => orderService.uploadParcelPhotos(order.id, files)}
            existingPhotos={order.parcelPhotos}
          />
          <button className="partner-button" onClick={handlePhotosComplete} style={{ width: '100%', marginTop: 16 }}>
            Continue to OTP <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* ── Generate OTP ── */}
      {step === 'otp_generate' && (
        <div className="pickup-section">
          <div className="pickup-section-header">
            <KeyRound size={16} />
            <div>
              <b>Generate pickup OTP</b>
              <small>Generate an OTP for the seller to verify the pickup</small>
            </div>
          </div>
          <div className="pickup-otp-info">
            <p>When you generate the OTP, the seller will receive it. Ask the seller to share the OTP with you to confirm the pickup.</p>
          </div>
          <button className="partner-button" onClick={handleGenerateOtp} style={{ width: '100%' }}>
            <KeyRound size={15} /> Generate OTP
          </button>
        </div>
      )}

      {/* ── Verify OTP ── */}
      {step === 'otp_verify' && (
        <div className="pickup-section">
          <div className="pickup-section-header">
            <KeyRound size={16} />
            <div>
              <b>Verify pickup OTP</b>
              <small>Enter the OTP provided by the seller</small>
            </div>
          </div>
          <OtpInput
            length={otpLength}
            label="Enter seller OTP"
            onComplete={handleVerifyOtp}
            onResend={handleGenerateOtp}
          />
        </div>
      )}

      {/* ── Confirmed ── */}
      {step === 'confirmed' && (
        <div className="pickup-section pickup-success">
          <div className="pickup-success-icon"><Check size={28} /></div>
          <b>Pickup confirmed!</b>
          <p>Parcel has been picked up successfully. Navigate to the delivery destination.</p>
          <Button href={`/partner/orders/${order.id}`}>
            View order details <ChevronRight size={15} />
          </Button>
        </div>
      )}

      {/* ── Failed ── */}
      {step === 'failed' && (
        <div className="pickup-section pickup-failed">
          <div className="pickup-failed-icon"><AlertTriangle size={28} /></div>
          <b>Pickup issue reported</b>
          <p>Our support team will follow up shortly. You can continue with other deliveries.</p>
          <Button href="/partner/orders">
            Back to orders <ChevronRight size={15} />
          </Button>
        </div>
      )}

      {/* ── Failed pickup form modal ── */}
      {showFailForm && (
        <div className="pickup-fail-overlay" onClick={() => setShowFailForm(false)}>
          <div className="pickup-fail-form" onClick={e => e.stopPropagation()}>
            <b>Report pickup issue</b>
            <p>Let us know what went wrong at the pickup location.</p>
            <select value={failReason} onChange={e => setFailReason(e.target.value)}>
              <option value="">Select a reason</option>
              <option value="seller_unavailable">Seller not available</option>
              <option value="wrong_address">Wrong pickup address</option>
              <option value="parcel_not_ready">Parcel not ready</option>
              <option value="seller_refused">Seller refused handover</option>
              <option value="other">Other</option>
            </select>
            <div className="pickup-fail-actions">
              <button className="partner-button secondary" onClick={() => setShowFailForm(false)}>Cancel</button>
              <button className="partner-button" onClick={handleFailedPickup} disabled={!failReason}>Submit report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
