"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

const loginSchema = z.object({
  identifier: z.string().min(1, "Enter your email or mobile number"),
  otp: z.string().min(6, "Enter a valid 6-digit OTP"),
  remember: z.boolean().optional(),
});
type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const [notice, setNotice] = useState("");
  const submit = async (data: LoginData) => {
    await new Promise((r) => setTimeout(r, 700));
    const isEnterprise = data.identifier.includes("enterprise");
    const mockUser = {
      id: isEnterprise ? "456" : "123",
      name: isEnterprise ? "ABC Pvt Ltd" : "Ankit Sharma",
      email: data.identifier,
      accountType: isEnterprise ? "enterprise" : "normal"
    };
    localStorage.setItem("mock_current_user", JSON.stringify(mockUser));
    
    setNotice(`Welcome back. Redirecting...`);
    
    setTimeout(() => {
      const redirect = searchParams?.get("redirect");
      router.push(redirect || "/dashboard");
    }, 500);
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit(submit)} noValidate>
      {notice && (
        <div className="success-alert">
          <CheckCircle2 /> {notice}
        </div>
      )}
      <Field
        label="Email or mobile number"
        icon={Mail}
        error={errors.identifier?.message}
      >
        <input
          placeholder="you@company.com"
          autoComplete="email"
          {...register("identifier")}
        />
      </Field>
      <div className="otp-field-container" style={{ position: 'relative' }}>
        <Field
          label="6-digit OTP"
          icon={KeyRound}
          error={errors.otp?.message}
        >
          <input
            placeholder="123456"
            maxLength={6}
            {...register("otp")}
          />
        </Field>
        <button 
          type="button"
          onClick={() => setNotice("OTP sent to your number!")}
          style={{ position: 'absolute', right: '12px', top: '38px', background: 'none', border: 'none', color: '#1d6bff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
        >
          Get OTP
        </button>
      </div>
      <div className="form-options">
        <label className="check-label">
          <input type="checkbox" {...register("remember")} />
          <span /> Remember me
        </label>
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
      <SubmitButton loading={isSubmitting}>Log in</SubmitButton>
      <SocialButtons />
      <AuthFooter>
        Don&apos;t have an account?{" "}
        <Link href="/register">
          Create account <ChevronRight />
        </Link>
      </AuthFooter>
    </form>
  );
}

export function RecoveryForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ identifier: string }>({
    resolver: zodResolver(
      z.object({
        identifier: z.string().min(1, "Enter your email or mobile number"),
      }),
    ),
  });
  const submit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setSent(true);
  };
  if (sent)
    return (
      <div className="success-state">
        <CheckCircle2 />
        <h3>OTP sent successfully</h3>
        <p>We sent a 6-digit verification code to your registered contact.</p>
        <Link className="auth-submit inline-flex" href="/verify-otp">
          Continue to verification <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <form className="auth-form" onSubmit={handleSubmit(submit)} noValidate>
      <Field
        label="Email or mobile number"
        icon={Mail}
        error={errors.identifier?.message}
      >
        <input placeholder="you@company.com" {...register("identifier")} />
      </Field>
      <SubmitButton loading={isSubmitting}>Send OTP</SubmitButton>
      <AuthFooter>
        <Link href="/login">
          <ArrowLeft /> Back to login
        </Link>
      </AuthFooter>
    </form>
  );
}

export function OtpForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [seconds, setSeconds] = useState(42);
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

export function ResetForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ password: string; confirm: string }>({
    resolver: zodResolver(
      z
        .object({
          password: z.string().min(8, "Use at least 8 characters"),
          confirm: z.string(),
        })
        .refine((d) => d.password === d.confirm, {
          path: ["confirm"],
          message: "Passwords do not match",
        }),
    ),
  });
  const password = watch("password", "");
  if (done)
    return (
      <div className="success-state">
        <CheckCircle2 />
        <h3>Password updated successfully</h3>
        <p>
          Your new password is active. You can now securely access your account.
        </p>
        <Link className="auth-submit inline-flex" href="/login">
          Return to login <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit(async () => {
        await new Promise((r) => setTimeout(r, 700));
        setDone(true);
      })}
      noValidate
    >
      <PasswordField
        label="New password"
        error={errors.password?.message}
        register={register}
        name="password"
      />
      <div className="strength-bar">
        <span style={{ width: `${Math.min(100, password.length * 12.5)}%` }} />
        <small>
          {password.length >= 8 ? "Strong enough" : "Password strength"}
        </small>
      </div>
      <PasswordField
        label="Confirm new password"
        error={errors.confirm?.message}
        register={register}
        name="confirm"
      />
      <SubmitButton loading={isSubmitting}>Reset password</SubmitButton>
      <AuthFooter>
        <Link href="/login">
          <ArrowLeft /> Back to login
        </Link>
      </AuthFooter>
    </form>
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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
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

export function PasswordRecoveryPage() {
  return (
    <AuthPage
      kind="forgot"
      eyebrow="Account recovery"
      title="Forgot password?"
      description="Enter your registered email or mobile number and we'll send a secure verification code."
      illustration="security"
    >
      <RecoveryForm />
    </AuthPage>
  );
}
export function ResetPasswordPage() {
  return (
    <AuthPage
      kind="reset"
      eyebrow="Create new password"
      title="Secure your account."
      description="Choose a strong password you'll remember. Your deliveries deserve a secure home."
      illustration="lock"
    >
      <ResetForm />
    </AuthPage>
  );
}
export function VerifyOtpPage() {
  return (
    <AuthPage
      kind="otp"
      eyebrow="Identity check"
      title="Verify your mobile number."
      description="Enter the 6-digit verification code sent to your mobile number."
      illustration="phone"
    >
      <OtpForm />
    </AuthPage>
  );
}

export function SocialIconOnly() {
  return (
    <div className="auth-badge">
      <Truck /> Patel Central <span>Secure access</span>
    </div>
  );
}
