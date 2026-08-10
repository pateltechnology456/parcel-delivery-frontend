"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, CheckCircle2, ChevronRight, Mail, Phone, UserRound, Briefcase, Package } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, PasswordField, SocialButtons, SubmitButton, AuthFooter, FormError } from "./auth-shell";

export const enterpriseRegisterSchema = z
  .object({
    companyName: z.string().min(2, "Enter your company name"),
    industry: z.string().min(2, "Enter your industry"),
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .regex(/[A-Z]/, "Add one uppercase letter")
      .regex(/[a-z]/, "Add one lowercase letter")
      .regex(/\d/, "Add one number")
      .regex(/[^A-Za-z0-9]/, "Add one special character"),
    confirm: z.string(),
    terms: z.boolean().refine(Boolean, "Accept the terms to continue"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

type EnterpriseRegisterData = z.infer<typeof enterpriseRegisterSchema>;

export function EnterpriseRegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EnterpriseRegisterData>({
    resolver: zodResolver(enterpriseRegisterSchema),
    defaultValues: { terms: false },
  });
  const [notice, setNotice] = useState("");
  const password = watch("password", "");
  const rules = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "Lowercase letter", ok: /[a-z]/.test(password) },
    { label: "Number", ok: /\d/.test(password) },
    { label: "Special character", ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const submit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setNotice(
      "Your enterprise account is ready. Check your email to verify it.",
    );
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit(submit)} noValidate>
      {notice && (
        <div className="success-alert">
          <CheckCircle2 /> {notice}
        </div>
      )}
      <Field
        label="Company name"
        icon={Briefcase}
        error={errors.companyName?.message}
      >
        <input placeholder="Patel Industries" {...register("companyName")} />
      </Field>
      <Field label="Industry" icon={Package} error={errors.industry?.message}>
        <input placeholder="E-commerce, Retail..." {...register("industry")} />
      </Field>
      <Field
        label="Contact person"
        icon={UserRound}
        error={errors.name?.message}
      >
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
      <PasswordField
        label="Create password"
        error={errors.password?.message}
        register={register}
        name="password"
      />
      <div className="password-rules">
        {rules.map((rule) => (
          <span className={rule.ok ? "rule-ok" : ""} key={rule.label}>
            <Check size={12} /> {rule.label}
          </span>
        ))}
      </div>
      <PasswordField
        label="Confirm password"
        error={errors.confirm?.message}
        register={register}
        name="confirm"
      />
      <label className="terms-label">
        <input type="checkbox" {...register("terms")} />
        <span /> I agree to the <Link href="#terms">
          Terms of Service
        </Link> and <Link href="#privacy">Privacy Policy</Link>
      </label>
      <FormError message={errors.terms?.message} />
      <SubmitButton loading={isSubmitting}>
        Create enterprise account
      </SubmitButton>
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
