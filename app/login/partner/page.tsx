import { AuthPage } from "@/components/auth/auth-shell";
import { PartnerLoginForm } from "@/components/partner/auth/PartnerLoginForm";
import { Suspense } from "react";

export default function LoginPartnerPage() {
  return (
    <AuthPage
      kind="login"
      eyebrow="Delivery Partner Portal"
      title="Drive with Patel Technology."
      description="Log in to view incoming dispatch requests, navigate live routes, and manage your daily payouts."
    >
      <Suspense fallback={<div>Loading partner workspace...</div>}>
        <PartnerLoginForm />
      </Suspense>
    </AuthPage>
  );
}
