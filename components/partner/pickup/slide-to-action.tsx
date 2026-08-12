'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { Check, Loader2, AlertCircle, ChevronRight } from 'lucide-react'

interface SlideToActionProps {
  label: string
  onComplete: () => Promise<void> | void
  disabled?: boolean
  variant?: 'primary' | 'success' | 'danger'
  icon?: React.ReactNode
}

type SlideState = 'idle' | 'dragging' | 'loading' | 'success' | 'error'

export function SlideToAction({ label, onComplete, disabled = false, variant = 'primary', icon }: SlideToActionProps) {
  const [state, setState] = useState<SlideState>('idle')
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const trackWidth = () => (trackRef.current?.offsetWidth ?? 300) - 52

  const bgOpacity = useTransform(x, [0, trackWidth()], [0, 0.15])
  const labelOpacity = useTransform(x, [0, trackWidth() * 0.6], [1, 0])

  const colors = {
    primary: { bg: '#1154d9', track: '#e7f0ff', text: '#1154d9' },
    success: { bg: '#2dbb76', track: '#e7faf0', text: '#2dbb76' },
    danger: { bg: '#d95b66', track: '#fef2f2', text: '#d95b66' },
  }
  const c = colors[variant]

  const handleDragEnd = async (_: any, info: PanInfo) => {
    const threshold = trackWidth() * 0.85
    if (info.point.x > 0 && x.get() >= threshold) {
      setState('loading')
      try {
        await onComplete()
        setState('success')
      } catch {
        setState('error')
        setTimeout(() => setState('idle'), 2000)
      }
    }
  }

  if (state === 'success') {
    return (
      <div className="slide-track" style={{ background: colors.success.track, borderColor: colors.success.bg + '33' }} ref={trackRef}>
        <div className="slide-success" style={{ color: colors.success.bg }}>
          <Check size={18} /> Confirmed
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="slide-track" style={{ background: colors.danger.track, borderColor: colors.danger.bg + '33' }} ref={trackRef}>
        <div className="slide-success" style={{ color: colors.danger.bg }}>
          <AlertCircle size={18} /> Failed — try again
        </div>
      </div>
    )
  }

  if (state === 'loading') {
    return (
      <div className="slide-track" style={{ background: c.track, borderColor: c.bg + '33' }} ref={trackRef}>
        <div className="slide-success" style={{ color: c.bg }}>
          <Loader2 size={18} className="slide-spinner" /> Processing...
        </div>
      </div>
    )
  }

  return (
    <div
      className={`slide-track ${disabled ? 'slide-disabled' : ''}`}
      style={{ background: c.track, borderColor: c.bg + '33' }}
      ref={trackRef}
    >
      <motion.div style={{ opacity: labelOpacity }} className="slide-label">
        <span style={{ color: c.text }}>{label}</span>
        <div className="slide-arrows" style={{ color: c.bg + '55' }}>
          <ChevronRight size={14} /><ChevronRight size={14} /><ChevronRight size={14} />
        </div>
      </motion.div>
      <motion.div
        style={{ opacity: bgOpacity, background: c.bg }}
        className="slide-progress"
      />
      {!disabled && (
        <motion.button
          className="slide-thumb"
          style={{ x, background: c.bg }}
          drag="x"
          dragConstraints={{ left: 0, right: trackWidth() }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setState('dragging')}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.95 }}
          aria-label={label}
        >
          {icon || <ChevronRight size={20} />}
        </motion.button>
      )}
    </div>
  )
}
