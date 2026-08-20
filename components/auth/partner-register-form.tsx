"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, CheckCircle2, ChevronRight, Mail, Phone, UserRound, Truck, BadgeCheck, Hash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, SocialButtons, SubmitButton, AuthFooter, FormError, OtpInput } from "./auth-shell";
import { KeyRound } from "lucide-react";
import toast from "react-hot-toast";

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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PartnerRegisterData>({
    resolver: zodResolver(partnerRegisterSchema),
    defaultValues: { terms: false },
  });
  const [notice, setNotice] = useState("");
  const otpValue = watch("otp") || "";

  const submit = async (data: PartnerRegisterData) => {
    await new Promise((r) => setTimeout(r, 600));
    const partnerUser = {
      id: "PT-DRV-" + Math.floor(2000 + Math.random() * 7000),
      name: data.name,
      fullName: data.name,
      phone: data.phone,
      email: data.email,
      accountType: "partner",
      vehicle: data.vehicleType.toUpperCase() + " · " + data.vehicleNumber,
      vehicleNumber: data.vehicleNumber,
      licenseNumber: data.licenseNumber,
      rating: 5.0,
      status: "verified",
    };
    localStorage.setItem("mock_current_user", JSON.stringify(partnerUser));
    localStorage.setItem("partner_current_user", JSON.stringify(partnerUser));
    setNotice("Registration successful! Redirecting to Partner Portal...");
    toast.success("Welcome to Patel Technology Partner Network!");
    setTimeout(() => {
      router.push("/partner");
    }, 500);
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
            placeholder="9876543210"
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>
      </div>
      <div className="field-row">
        <Field
          label="Vehicle type"
          icon={Truck}
          error={errors.vehicleType?.message}
        >
          <select {...register("vehicleType")}>
            <option value="">Select vehicle</option>
            <option value="bike">2-Wheeler (Bike / Scooter)</option>
            <option value="tempo">3-Wheeler (Tempo / Auto)</option>
            <option value="truck">Mini Truck (Tata Ace / Pickup)</option>
          </select>
        </Field>
        <Field
          label="Vehicle number"
          icon={Hash}
          error={errors.vehicleNumber?.message}
        >
          <input
            placeholder="MP-09-XX-1234"
            {...register("vehicleNumber")}
          />
        </Field>
      </div>
      <Field
        label="Driving license number"
        icon={BadgeCheck}
        error={errors.licenseNumber?.message}
      >
        <input
          placeholder="DL-0420110012345"
          {...register("licenseNumber")}
        />
      </Field>

      <div className="otp-field-container" style={{ position: 'relative', marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#0b2a62' }}>6-digit OTP</label>
          <button 
            type="button"
            onClick={() => {
              setValue("otp", "123456", { shouldValidate: true });
              setNotice("Demo OTP 123456 auto-filled!");
              toast.success("OTP sent to your number!");
            }}
            style={{ background: 'none', border: 'none', color: '#1d6bff', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
          >
            Get OTP (Demo: 123456)
          </button>
        </div>
        <OtpInput value={otpValue} onChange={(val) => setValue("otp", val, { shouldValidate: true })} />
        <FormError message={errors.otp?.message} />
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
        Already have a partner account?{" "}
        <Link href="/login/partner">
          Log in <ChevronRight />
        </Link>
      </AuthFooter>
    </form>
  );
}
