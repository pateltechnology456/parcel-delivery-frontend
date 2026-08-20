"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bike,
  CheckCircle2,
  ChevronRight,
  KeyRound,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Field, SubmitButton, AuthFooter, OtpInput } from "@/components/auth/ui";

const partnerLoginSchema = z.object({
  identifier: z.string().min(1, "Enter your registered mobile number or Driver ID"),
  otp: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit OTP"),
});

type PartnerLoginData = z.infer<typeof partnerLoginSchema>;

export function PartnerLoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PartnerLoginData>({
    resolver: zodResolver(partnerLoginSchema),
  });

  const [notice, setNotice] = useState("");
  const otpValue = watch("otp") || "";

  const submit = async (data: PartnerLoginData) => {
    await new Promise((r) => setTimeout(r, 600));
    const cleanId = data.identifier.trim();
    const isPhone = /^\d{10}$/.test(cleanId.replace(/\D/g, ""));
    const phoneNum = isPhone ? cleanId.replace(/\D/g, "") : "9876543210";

    const partnerUser = {
      id: "PT-DRV-2841",
      name: "Arjun Kumar",
      fullName: "Arjun Kumar",
      phone: phoneNum,
      email: isPhone ? `${phoneNum}@driver.pateltechnology.in` : cleanId,
      accountType: "partner",
      vehicle: "Honda Activa 6G",
      vehicleNumber: "MP-09-XX-4821",
      rating: 4.9,
      status: "verified",
    };

    localStorage.setItem("mock_current_user", JSON.stringify(partnerUser));
    localStorage.setItem("partner_current_user", JSON.stringify(partnerUser));

    setNotice("Partner verified! Redirecting to Driver Workspace...");
    toast.success("Welcome back, Arjun Kumar!");

    setTimeout(() => {
      router.push("/partner");
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

      {/* Driver Benefit Pill */}
      <div
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          border: "1px solid #bbf7d0",
          borderRadius: "14px",
          padding: "10px 14px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "10px",
            background: "#16a34a",
            color: "#ffffff",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Bike size={18} />
        </span>
        <div>
          <b style={{ fontSize: "12.5px", color: "#14532d", display: "block" }}>
            Delivery Partner Workspace
          </b>
          <small style={{ fontSize: "11px", color: "#15803d" }}>
            Earn up to ₹35,000/month with instant daily payouts
          </small>
        </div>
      </div>

      <Field
        label="Registered Mobile Number or Partner ID"
        icon={Phone}
        error={errors.identifier?.message}
      >
        <input
          placeholder="e.g. 9876543210 or PT-DRV-2841"
          autoComplete="tel"
          {...register("identifier")}
        />
      </Field>

      <div className="otp-field-container" style={{ position: "relative", marginTop: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#0b2a62" }}>
            6-digit Partner OTP
          </label>
          <button
            type="button"
            onClick={() => {
              setValue("otp", "123456", { shouldValidate: true });
              setNotice("Demo OTP 123456 auto-filled!");
              toast.success("OTP sent to your registered mobile!");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#1d6bff",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Get OTP (Demo: 123456)
          </button>
        </div>
        <OtpInput
          value={otpValue}
          onChange={(val) => setValue("otp", val, { shouldValidate: true })}
        />
      </div>

      <SubmitButton loading={isSubmitting}>
        Log in to Partner App <ChevronRight size={16} />
      </SubmitButton>

      {/* Partner Registration Link */}
      <div
        style={{
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: "1px solid #edf2f7",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        <div style={{ color: "#64748b" }}>
          New delivery partner?{" "}
          <Link
            href="/register/partner"
            style={{ color: "#1154d9", fontWeight: 700, textDecoration: "none" }}
          >
            Register & Drive with us <ChevronRight size={13} style={{ display: "inline" }} />
          </Link>
        </div>
      </div>
    </form>
  );
}
