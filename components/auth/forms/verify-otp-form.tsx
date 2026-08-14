"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { AuthFooter } from "../ui";

export function OtpForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [seconds, setSeconds] = useState(42);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const update = (index: number, value: string) => {
    const next = [...otp];
    next[index] = value.replace(/\D/g, "").slice(-1);
    setOtp(next);
    if (value && index < 5)
      document.getElementById(`otp-${index + 1}`)?.focus();
  };
  if (verified)
    return (
      <div className="success-state">
        <CheckCircle2 />
        <h3>Mobile number verified</h3>
        <p>Your Patel Technology account is now secure and ready to use.</p>
        <Link className="auth-submit inline-flex" href="/login">
          Go to login <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <div className="otp-form">
      <div className="otp-sent">
        Code sent to <b>+91 98••• 3210</b>
      </div>
      <div className="otp-inputs">
        {otp.map((value, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            value={value}
            onChange={(e) => update(i, e.target.value)}
            inputMode="numeric"
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
      <div className="otp-meta">
        <span>Didn&apos;t receive it?</span>
        {seconds > 0 ? (
          <b>Resend in 00:{seconds}</b>
        ) : (
          <button type="button" onClick={() => setSeconds(42)}>
            Resend OTP
          </button>
        )}
      </div>
      <button
        className="auth-submit"
        disabled={otp.join("").length !== 6}
        onClick={() => setVerified(true)}
      >
        Verify code <ArrowRight size={16} />
      </button>
      <AuthFooter>
        <Link href="/login">
          <ArrowLeft /> Back to login
        </Link>
      </AuthFooter>
    </div>
  );
}
