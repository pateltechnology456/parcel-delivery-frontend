"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Field, SubmitButton } from "@/components/auth/ui";

const adminLoginSchema = z.object({
  email: z.string().min(1, "Enter your administrator email"),
  password: z.string().min(6, "Enter your master password (min 6 chars)"),
  securityCode: z.string().optional(),
});

type AdminLoginData = z.infer<typeof adminLoginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "admin@pateltechnology.in",
      password: "",
    },
  });

  const handleFillDemo = () => {
    setValue("email", "admin@pateltechnology.in", { shouldValidate: true });
    setValue("password", "admin@2026", { shouldValidate: true });
    setValue("securityCode", "889922");
    toast.success("Demo Administrator credentials auto-filled!");
  };

  const submit = async (data: AdminLoginData) => {
    await new Promise((r) => setTimeout(r, 650));

    const adminUser = {
      id: "PT-ADM-001",
      name: "Super Administrator",
      fullName: "Super Admin",
      email: data.email,
      accountType: "admin",
      role: "Super Administrator",
      permissions: ["all_access", "orders_manage", "dispatch_control", "finance_audit"],
      lastLogin: new Date().toISOString(),
    };

    localStorage.setItem("mock_current_user", JSON.stringify(adminUser));
    localStorage.setItem("admin_current_user", JSON.stringify(adminUser));

    setNotice("Security credentials verified! Accessing Command Center...");
    toast.success("Admin access granted. Loading system dashboard...");

    setTimeout(() => {
      router.push("/admin");
    }, 450);
  };

  const onError = (formErrors: any) => {
    Object.values(formErrors).forEach((err: any) => {
      if (err?.message) toast.error(err.message as string);
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(submit, onError)} noValidate>
      {notice && (
        <div className="success-alert">
          <CheckCircle2 /> {notice}
        </div>
      )}

      {/* Admin Security Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0b2a62 0%, #001845 100%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "14px",
          padding: "12px 14px",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "rgba(255, 107, 44, 0.2)",
              color: "#ff8a4c",
              display: "grid",
              placeItems: "center",
            }}
          >
            <ShieldCheck size={18} />
          </span>
          <div>
            <b style={{ fontSize: "13px", color: "#ffffff", display: "block" }}>
              Patel Command Gateway
            </b>
            <small style={{ fontSize: "11px", color: "#93c5fd" }}>
              Restricted Area · 256-Bit SSL Encrypted
            </small>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFillDemo}
          style={{
            fontSize: "11px",
            fontWeight: 800,
            color: "#ffedd5",
            background: "rgba(255, 107, 44, 0.25)",
            border: "1px solid rgba(255, 107, 44, 0.4)",
            padding: "4px 8px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Sparkles size={11} /> Auto Fill
        </button>
      </div>

      <Field label="Administrator Email / Username" icon={Mail} error={errors.email?.message}>
        <input
          placeholder="admin@pateltechnology.in"
          autoComplete="username"
          {...register("email")}
        />
      </Field>

      <div style={{ position: "relative" }}>
        <Field label="Master Password" icon={Lock} error={errors.password?.message}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            autoComplete="current-password"
            {...register("password")}
          />
        </Field>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "12px",
            top: "38px",
            background: "none",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
          }}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <Field
        label="2FA Security Passcode (Optional for Demo)"
        icon={KeyRound}
        error={errors.securityCode?.message}
      >
        <input
          placeholder="e.g. 889922 (Optional)"
          autoComplete="one-time-code"
          {...register("securityCode")}
        />
      </Field>

      <SubmitButton loading={isSubmitting}>
        Authorize Admin Access <ChevronRight size={16} />
      </SubmitButton>

      {/* Footer Switcher */}
      <div
        style={{
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: "1px solid #edf2f7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          color: "#64748b",
        }}
      >
        <Link href="/login" style={{ color: "#475569", textDecoration: "none", fontWeight: 600 }}>
          ← Customer Login
        </Link>
        <Link
          href="/login/partner"
          style={{ color: "#166534", textDecoration: "none", fontWeight: 700 }}
        >
          Driver Portal →
        </Link>
      </div>
    </form>
  );
}
