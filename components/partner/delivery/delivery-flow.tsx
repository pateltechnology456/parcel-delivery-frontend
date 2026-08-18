'use client'

import { useState, useRef } from 'react'
import {
  MapPin, Navigation, Check, KeyRound, AlertTriangle, Phone,
  User, ChevronRight, Home, Camera, PenTool, Sparkles, Image as ImageIcon,
  CheckCircle2, RefreshCw
} from 'lucide-react'
import { SlideToAction } from '../pickup/slide-to-action'
import { OtpInput } from '../pickup/otp-input'
import { Status, Button } from '../ui/partner-ui'
import type { Order } from '@/types/order'
import * as orderService from '@/services/order.service'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

type DeliveryStep = 'navigate' | 'arrived' | 'otp_verify' | 'pod_capture' | 'confirmed' | 'failed'

interface DeliveryFlowProps {
  order: Order
  onComplete?: () => void
  /** OTP length — configurable per backend contract */
  otpLength?: number
}

export function DeliveryFlow({ order, onComplete, otpLength = 4 }: DeliveryFlowProps) {
  const [step, setStep] = useState<DeliveryStep>('navigate')
  const [failReason, setFailReason] = useState('')
  const [showFailForm, setShowFailForm] = useState(false)
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [hasSignature, setHasSignature] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleConfirmArrival = async () => {
    await orderService.updateOrderStatus(order.id, 'arrived_at_customer')
    setStep('otp_verify')
  }

  const handleVerifyOtp = async (otp: string) => {
    const result = await orderService.verifyOtp(order.id, otp, 'delivery')
    if (result.success) {
      setStep('pod_capture')
    }
    return result
  }

  const handleCompleteDelivery = async () => {
    setStep('confirmed')
    await orderService.updateOrderStatus(order.id, 'delivered')
    toast.success(`Trip finished! ₹${order.estimatedEarnings || 280} credited to your wallet!`)
    onComplete?.()
  }

  const handleFailedDelivery = async () => {
    if (!failReason.trim()) return
    await orderService.reportFailedDelivery(order.id, failReason)
    setStep('failed')
  }

  // Signature canvas handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.lineTo(x, y)
    ctx.strokeStyle = '#1154d9'
    ctx.lineWidth = 2.5
    ctx.stroke()
    setHasSignature(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  return (
    <div className="pickup-flow">
      {/* Step indicator */}
      <div className="pickup-steps">
        {[
          { key: 'navigate', label: 'Navigate' },
          { key: 'arrived', label: 'Arrive' },
          { key: 'otp_verify', label: 'OTP' },
          { key: 'pod_capture', label: 'POD' },
          { key: 'confirmed', label: 'Done' },
        ].map((s, i) => {
          const stepOrder = ['navigate', 'arrived', 'otp_verify', 'pod_capture', 'confirmed']
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

      {/* 1. Navigate to customer */}
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
            <div style={{ flex: 1 }}>
              <b>{order.customer.name}</b>
              <small>{order.delivery.address}</small>
            </div>
            <a
              href={`tel:${order.customer.maskedPhone || '9876543210'}`}
              className="partner-button secondary pickup-call-btn"
              style={{ display: 'grid', placeItems: 'center', width: '36px', height: '36px', padding: 0 }}
            >
              <Phone size={14} color="#1154d9" />
            </a>
          </div>
          <Button
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(order.delivery.address || order.delivery.area)}`}
            className="pickup-nav-btn"
          >
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

      {/* 2. OTP verification */}
      {step === 'otp_verify' && (
        <div className="pickup-section">
          <div className="pickup-section-header">
            <KeyRound size={16} />
            <div>
              <b>Verify delivery OTP</b>
              <small>Ask the customer for the 4-digit delivery security code</small>
            </div>
          </div>
          <OtpInput
            length={otpLength}
            label="Enter customer OTP (Demo: 1234)"
            onComplete={handleVerifyOtp}
          />
          <SlideToAction
            label="Skip to POD Signature"
            variant="success"
            onComplete={async () => {
              setStep('pod_capture')
            }}
          />
        </div>
      )}

      {/* 3. Proof of Delivery (Photo & Signature) */}
      {step === 'pod_capture' && (
        <div className="pickup-section">
          <div className="pickup-section-header">
            <PenTool size={16} />
            <div>
              <b>Digital Proof of Delivery (POD)</b>
              <small>Get customer signature or take parcel photo</small>
            </div>
          </div>

          {/* Signature Canvas */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <small style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                Customer Signature (Sign below)
              </small>
              {hasSignature && (
                <button
                  type="button"
                  onClick={clearSignature}
                  style={{ fontSize: '11px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                >
                  <RefreshCw size={11} /> Clear
                </button>
              )}
            </div>
            <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '12px', overflow: 'hidden', height: '110px' }}>
              <canvas
                ref={canvasRef}
                width={380}
                height={110}
                style={{ width: '100%', height: '100%', touchAction: 'none', cursor: 'crosshair' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
          </div>

          {/* Photo Capture Simulation */}
          <div style={{ marginBottom: '18px' }}>
            <button
              type="button"
              onClick={() => {
                setPhotoUploaded(true)
                toast.success("Doorstep delivery photo captured!")
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: photoUploaded ? '1px solid #86efac' : '1px solid #e2e8f0',
                background: photoUploaded ? '#f0fdf4' : '#ffffff',
                color: photoUploaded ? '#166534' : '#334155',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {photoUploaded ? (
                <>
                  <CheckCircle2 size={16} color="#16a34a" /> Photo Attached (Doorstep verified)
                </>
              ) : (
                <>
                  <Camera size={16} color="#1154d9" /> Take Doorstep Photo (Optional)
                </>
              )}
            </button>
          </div>

          <SlideToAction
            label="Slide to Complete Delivery"
            variant="success"
            onComplete={handleCompleteDelivery}
          />
        </div>
      )}

      {/* 4. Confirmed Success with Payout */}
      {step === 'confirmed' && (
        <div className="pickup-section pickup-success">
          <div className="pickup-success-icon"><Check size={28} /></div>
          <b>Delivery Complete! 🎉</b>
          <p>The parcel has been verified & handed over to {order.customer.name}.</p>
          <div style={{
            margin: '12px 0 16px',
            padding: '12px 18px',
            borderRadius: '12px',
            background: '#dcfce7',
            border: '1px solid #86efac',
            color: '#14532d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: 800,
            fontSize: '15px'
          }}>
            <Sparkles size={18} color="#16a34a" /> +₹{order.estimatedEarnings || 280} Credited to Wallet
          </div>
          <Button href="/partner/orders">
            Back to Orders <ChevronRight size={15} />
          </Button>
        </div>
      )}

      {/* 5. Failed */}
      {step === 'failed' && (
        <div className="pickup-section pickup-failed">
          <div className="pickup-failed-icon"><AlertTriangle size={28} /></div>
          <b>Delivery issue reported</b>
          <p>Our 24x7 support team will follow up with the customer shortly.</p>
          <Button href="/partner/orders">
            Back to orders <ChevronRight size={15} />
          </Button>
        </div>
      )}

      {/* Failed delivery form modal */}
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
