'use client'

import { useState, useRef, useCallback } from 'react'
import { Loader2, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react'

interface OtpInputProps {
  /** Number of digits — configurable per backend contract */
  length?: number
  onComplete: (otp: string) => Promise<{ success: boolean; message: string }> | void
  onResend?: () => Promise<void> | void
  disabled?: boolean
  label?: string
  resendCooldown?: number
}

type OtpState = 'input' | 'loading' | 'success' | 'error' | 'expired'

export function OtpInput({
  length = 4,
  onComplete,
  onResend,
  disabled = false,
  label = 'Enter OTP',
  resendCooldown = 30,
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''))
  const [state, setState] = useState<OtpState>('input')
  const [message, setMessage] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const startCooldown = useCallback(() => {
    setCooldown(resendCooldown)
    const timer = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
  }, [resendCooldown])

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    setState('input')
    setMessage('')

    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus()
    }

    // Auto-submit when all digits filled
    if (digit && index === length - 1 && next.every(d => d !== '')) {
      handleVerify(next.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (pasted.length > 0) {
      const next = Array(length).fill('')
      pasted.split('').forEach((ch, i) => { next[i] = ch })
      setDigits(next)
      if (pasted.length === length) {
        handleVerify(pasted)
      } else {
        refs.current[pasted.length]?.focus()
      }
    }
  }

  const handleVerify = async (otp: string) => {
    setState('loading')
    try {
      const result = await onComplete(otp)
      if (result && !result.success) {
        setState('error')
        setMessage(result.message || 'Incorrect OTP')
        setDigits(Array(length).fill(''))
        setTimeout(() => refs.current[0]?.focus(), 100)
      } else {
        setState('success')
        setMessage(result?.message || 'Verified successfully')
      }
    } catch {
      setState('error')
      setMessage('Verification failed. Please try again.')
      setDigits(Array(length).fill(''))
    }
  }

  const handleResend = async () => {
    if (cooldown > 0 || !onResend) return
    setDigits(Array(length).fill(''))
    setState('input')
    setMessage('')
    startCooldown()
    await onResend()
    refs.current[0]?.focus()
  }

  if (state === 'success') {
    return (
      <div className="otp-container">
        <div className="otp-success-state">
          <CheckCircle2 size={32} />
          <b>{message}</b>
        </div>
      </div>
    )
  }

  return (
    <div className="otp-container">
      <label className="otp-label">{label}</label>
      <div className="otp-inputs" style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el }}
            value={d}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            inputMode="numeric"
            maxLength={1}
            disabled={disabled || state === 'loading'}
            aria-label={`Digit ${i + 1} of ${length}`}
            className={state === 'error' ? 'otp-error' : ''}
            autoFocus={i === 0}
          />
        ))}
      </div>

      {state === 'loading' && (
        <div className="otp-status"><Loader2 size={14} className="slide-spinner" /> Verifying...</div>
      )}
      {state === 'error' && message && (
        <div className="otp-status otp-error-msg"><AlertCircle size={14} /> {message}</div>
      )}

      <div className="otp-meta">
        <span>Didn&apos;t receive it?</span>
        {cooldown > 0
          ? <b>Resend in 00:{String(cooldown).padStart(2, '0')}</b>
          : onResend
            ? <button type="button" onClick={handleResend}><RotateCcw size={12} /> Resend OTP</button>
            : null
        }
      </div>
    </div>
  )
}
