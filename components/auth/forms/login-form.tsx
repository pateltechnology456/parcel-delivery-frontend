"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, ChevronRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Field, SubmitButton, SocialButtons, AuthFooter, OtpInput } from "../ui";

const loginSchema = z.object({
  identifier: z.string().min(1, "Enter your email or mobile number"),
  otp: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit OTP"),
});
type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const [notice, setNotice] = useState("");
  const otpValue = watch("otp") || "";
  const submit = async (data: LoginData) => {
    await new Promise((r) => setTimeout(r, 600));
    const isEnterprise = data.identifier.toLowerCase().includes("enterprise");
    const cleanId = data.identifier.trim();
    const isPhone = /^\d{10}$/.test(cleanId.replace(/\D/g, ''));
    const phoneNum = isPhone ? cleanId.replace(/\D/g, '') : "";

    const mockUser = {
      id: isEnterprise ? "456" : "123",
      name: isEnterprise ? "Acme Enterprise" : isPhone ? `User ${phoneNum.slice(-4)}` : cleanId.split("@")[0],
      fullName: isEnterprise ? "Acme Enterprise" : isPhone ? `User ${phoneNum.slice(-4)}` : cleanId.split("@")[0],
      email: isPhone ? `${phoneNum}@pateltechnology.in` : cleanId,
      phone: phoneNum,
      accountType: isEnterprise ? "enterprise" : "normal"
    };

    const redirect = searchParams?.get("redirect");
    // If not actively continuing a booking handoff, remove old session drafts!
    if (!redirect || !redirect.includes("book")) {
      localStorage.removeItem("active_booking_draft");
      localStorage.removeItem("estimate_data");
    }

    localStorage.setItem("mock_current_user", JSON.stringify(mockUser));
    
    setNotice(`Welcome back. Redirecting...`);
    
    setTimeout(() => {
      router.push(redirect || "/dashboard");
    }, 400);
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
      <div className="otp-field-container" style={{ position: 'relative', marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#0b2a62' }}>6-digit OTP</label>
          <button 
            type="button"
            onClick={() => setNotice("OTP sent to your number!")}
            style={{ background: 'none', border: 'none', color: '#1d6bff', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
          >
            Get OTP
          </button>
        </div>
        <OtpInput value={otpValue} onChange={(val) => setValue("otp", val, { shouldValidate: true })} />
      </div>
  
      <SubmitButton loading={isSubmitting}>Log in</SubmitButton>
      <SocialButtons />
      <AuthFooter>
        New to Patel Technology?{" "}
        <Link href="/register">
          Create an account <ChevronRight />
        </Link>
      </AuthFooter>

      <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #edf2f7", textAlign: "center" }}>
        <Link
          href="/login/partner"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12.5px",
            color: "#166534",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            padding: "6px 14px",
            borderRadius: "99px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          🛵 Delivery Partner? Login to Partner Portal <ChevronRight size={13} />
        </Link>
      </div>
    </form>
  );
}
