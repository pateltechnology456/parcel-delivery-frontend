"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField, SubmitButton, AuthFooter } from "../ui";

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
