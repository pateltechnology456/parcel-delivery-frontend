"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  LockKeyhole,
  KeyRound,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
  X,
  Briefcase,
  BadgeCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const blue = "#0057FF";

function Logo() {
  return (
    <Link className="auth-logo" href="/">
      <span className="auth-logo-mark">
        <i />
        <i />
        <i />
      </span>
      <span>
        Patel <b>Technology</b>
      </span>
    </Link>
  );
}

function Illustration({
  type = "delivery",
}: {
  type?: "delivery" | "security" | "lock" | "phone";
}) {
  if (type === "security" || type === "lock" || type === "phone")
    return (
      <div className={`security-illustration ${type}`} aria-hidden="true">
        <div className="security-grid" />
        <div className="shield">
          <ShieldCheck />
        </div>
        <div className="security-ring ring-a" />
        <div className="security-ring ring-b" />
        <span className="security-dot dot-a" />
        <span className="security-dot dot-b" />
        <span className="security-dot dot-c" />
        {type === "lock" && (
          <div className="mini-lock">
            <LockKeyhole />
          </div>
        )}
        {type === "phone" && (
          <div className="mini-phone">
            <Phone />
          </div>
        )}
      </div>
    );
  return (
    <div className="delivery-illustration" aria-hidden="true">
      <div className="city-lines" />
      <div className="route-line" />
      <div className="pin pin-one">
        <MapPin />
      </div>
      <div className="pin pin-two">
        <MapPin />
      </div>
      <div className="auth-truck">
        <div className="truck-box">
          <Package />
        </div>
        <div className="truck-cab" />
        <i />
        <i />
      </div>
      <div className="parcel parcel-one" />
      <div className="parcel parcel-two" />
      <div className="live-pill">
        <span /> Live route
      </div>
    </div>
  );
}

function AuthAside({
  mode = "delivery",
}: {
  mode?: "delivery" | "security" | "lock" | "phone";
}) {
  return (
    <aside className="auth-aside">
      <div className="auth-aside-inner">
        <Logo />
        <div className="aside-art">
          <Illustration type={mode} />
        </div>
        <div className="aside-copy">
          <p className="auth-eyebrow">PATEL CENTRAL / IND</p>
          <h2>
            Move what matters.
            <br />
            <em>Move it better.</em>
          </h2>
          <p>
            One calm, connected place to manage every delivery from pickup to
            proof of delivery.
          </p>
        </div>
        <div className="aside-bottom">
          <span>
            <Check size={14} /> Trusted by 7,000+ businesses
          </span>
          <span>
            <span className="green-dot" /> Systems operating normally
          </span>
        </div>
      </div>
    </aside>
  );
}

function AuthHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="auth-header">
      <p className="auth-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="auth-description">{description}</p>
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  return message ? (
    <p className="field-error" role="alert">
      {message}
    </p>
  ) : null;
}
export function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: typeof Mail;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className={`input-wrap ${error ? "has-error" : ""}`}>
        <Icon />
        <>{children}</>
      </div>
      <FormError message={error} />
    </div>
  );
}
export function PasswordField({
  label,
  error,
  register,
  name,
}: {
  label: string;
  error?: string;
  register: any;
  name: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="field">
      <label>{label}</label>
      <div className={`input-wrap ${error ? "has-error" : ""}`}>
        <LockKeyhole />
        <input
          type={show ? "text" : "password"}
          placeholder="••••••••"
          {...register(name)}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
      <FormError message={error} />
    </div>
  );
}
export function SocialButtons() {
  return (
    <>
      <div className="or-divider">
        <span>or continue with</span>
      </div>
      <div className="social-grid">
        <button className="social-button" type="button">
          <span className="google-mark">G</span> Google
        </button>
        <button className="social-button" type="button">
          <span className="apple-mark">●</span> Apple
        </button>
      </div>
    </>
  );
}
export function SubmitButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <button className="auth-submit" disabled={loading}>
      {loading ? <span className="loader" /> : null}
      {children}
      <ArrowRight size={16} />
    </button>
  );
}
export function AuthFooter({ children }: { children: React.ReactNode }) {
  return <p className="auth-footer">{children}</p>;
}

export function OtpInput({ length = 6, value, onChange }: { length?: number; value: string; onChange: (val: string) => void }) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const valArr = value.split("").slice(0, length);
    const newOtp = Array(length).fill("");
    valArr.forEach((char, i) => (newOtp[i] = char));
    setOtp(newOtp);
  }, [value, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
      return;
    }
    
    if (val.length > 1) {
      const pasteData = val.slice(0, length - index).split("");
      const newOtp = [...otp];
      pasteData.forEach((char, i) => {
        newOtp[index + i] = char;
      });
      setOtp(newOtp);
      onChange(newOtp.join(""));
      
      const nextFocus = Math.min(index + pasteData.length, length - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="tel"
          value={digit}
          maxLength={6}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            border: '1px solid #dfe7f1',
            background: 'white',
            outline: 'none',
            color: '#0b2a62',
            transition: 'all 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#1d6bff';
            e.target.style.boxShadow = '0 0 0 3px rgba(29, 107, 255, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#dfe7f1';
            e.target.style.boxShadow = 'none';
          }}
        />
      ))}
    </div>
  );
}

export function AuthPage({
  kind,
  title,
  description,
  eyebrow,
  illustration = "delivery",
  children,
}: {
  kind: string;
  title: string;
  description: string;
  eyebrow: string;
  illustration?: "delivery" | "security" | "lock" | "phone";
  children: React.ReactNode;
}) {
  return (
    <main className="auth-page">
      <AuthAside mode={illustration} />
      <section className="auth-content">
        <div className="auth-content-inner">
          <div className="mobile-auth-brand">
            <Logo />
          </div>
          <div className="auth-panel">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <AuthHeader
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
              {children}
            </motion.div>
          </div>
          <p className="auth-legal">
            By continuing, you agree to Patel Technology&apos;s{" "}
            <Link href="#terms">Terms</Link> and{" "}
            <Link href="#privacy">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

export function SocialIconOnly() {
  return (
    <div className="auth-badge">
      <Truck /> Patel Central <span>Secure access</span>
    </div>
  );
}
