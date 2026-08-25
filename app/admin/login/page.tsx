import { AuthPage } from "@/components/auth/auth-shell";
import { AdminLoginForm } from "@/components/admin/auth/AdminLoginForm";
import { Suspense } from "react";

export default function AdminLoginPage() {
  return (
    <AuthPage
      kind="login"
      eyebrow="Patel Command Center"
      title="Super Administrator Login."
      description="Authorized personnel only. Access live fleet operations, dispatch algorithms, driver verification, and system analytics."
    >
      <Suspense fallback={<div>Authenticating admin gateway...</div>}>
        <AdminLoginForm />
      </Suspense>
    </AuthPage>
  );
}
