"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, CheckCircle2, ChevronRight, Mail, Phone, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, SocialButtons, SubmitButton, AuthFooter, FormError, OtpInput } from "./auth-shell";
import { KeyRound } from "lucide-react";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    otp: z.string().min(6, "Enter a valid 6-digit OTP"),
    terms: z.boolean().refine(Boolean, "Accept the terms to continue"),
  });

type RegisterData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { terms: false },
  });
  const [notice, setNotice] = useState("");
  const otpValue = watch("otp") || "";
  const submit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setNotice("Your account is ready. Check your email to verify it.");
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit(submit)} noValidate>
      {notice && (
        <div className="success-alert">
          <CheckCircle2 /> {notice}
        </div>
      )}
      <Field label="Full name" icon={UserRound} error={errors.name?.message}>
        <input
          placeholder="Ankit Patel"
          autoComplete="name"
          {...register("name")}
        />
      </Field>
      <div className="field-row">
        <Field label="Work email" icon={Mail} error={errors.email?.message}>
          <input
            placeholder="you@company.com"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
        <Field label="Mobile number" icon={Phone} error={errors.phone?.message}>
          <input
            placeholder="98765 43210"
            inputMode="numeric"
            {...register("phone")}
          />
        </Field>
      </div>
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
      <label className="check-label auth-terms">
        <input type="checkbox" {...register("terms")} />
        <span /> I agree to the <Link href="#terms">
          Terms of Service
        </Link> and <Link href="#privacy">Privacy Policy</Link>
      </label>
      <FormError message={errors.terms?.message} />
      <SubmitButton loading={isSubmitting}>Create account</SubmitButton>
      <SocialButtons />
      <AuthFooter>
        Already have an account?{" "}
        <Link href="/login">
          Log in <ChevronRight />
        </Link>
      </AuthFooter>
    </form>
  );
}
