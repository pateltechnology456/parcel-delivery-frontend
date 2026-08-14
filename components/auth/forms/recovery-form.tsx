"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, SubmitButton, AuthFooter } from "../ui";

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
           Back to login
        </Link>
      </AuthFooter>
    </form>
  );
}
