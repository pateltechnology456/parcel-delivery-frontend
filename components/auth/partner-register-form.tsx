"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, CheckCircle2, ChevronRight, Mail, Phone, UserRound, Truck, BadgeCheck, Hash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, SocialButtons, SubmitButton, AuthFooter, FormError } from "./auth-shell";
import { KeyRound } from "lucide-react";

export const partnerRegisterSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    vehicleType: z.enum(["bike", "tempo", "truck"], {
      message: "Select a vehicle type",
    }),
    vehicleNumber: z.string().min(4, "Enter valid vehicle number"),
    licenseNumber: z.string().min(5, "Enter a valid license number"),
    otp: z.string().min(6, "Enter a valid 6-digit OTP"),
    terms: z.boolean().refine(Boolean, "Accept the terms to continue"),
  });

type PartnerRegisterData = z.infer<typeof partnerRegisterSchema>;

export function PartnerRegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PartnerRegisterData>({
    resolver: zodResolver(partnerRegisterSchema),
    defaultValues: { terms: false },
  });
  const [notice, setNotice] = useState("");
  const submit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setNotice(
      "Your partner account is ready. We will review your application.",
    );
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
        <Field label="Email" icon={Mail} error={errors.email?.message}>
          <input
            placeholder="you@email.com"
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
      <div className="field">
        <label>Vehicle type</label>
        <div className={`input-wrap ${errors.vehicleType ? "has-error" : ""}`}>
          <Truck />
          <select
            className="select-input"
            {...register("vehicleType")}
            defaultValue=""
          >
            <option value="" disabled>
              Select a vehicle
            </option>
            <option value="bike">Bike</option>
            <option value="tempo">Tempo (3-Wheeler)</option>
            <option value="truck">Mini Truck</option>
          </select>
        </div>
        <FormError message={errors.vehicleType?.message} />
      </div>
      <Field
        label="Vehicle Number"
        icon={Hash}
        error={errors.vehicleNumber?.message}
      >
        <input placeholder="MH-12-XX-XXXX" {...register("vehicleNumber")} />
      </Field>
      <Field
        label="Driving License Number"
        icon={BadgeCheck}
        error={errors.licenseNumber?.message}
      >
        <input placeholder="DL-XXXX-XXXXXXX" {...register("licenseNumber")} />
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
      <label className="terms-label">
        <input type="checkbox" {...register("terms")} />
        <span /> I agree to the <Link href="#terms">
          Partner Terms
        </Link> and <Link href="#privacy">Privacy Policy</Link>
      </label>
      <FormError message={errors.terms?.message} />
      <SubmitButton loading={isSubmitting}>Apply as partner</SubmitButton>
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
