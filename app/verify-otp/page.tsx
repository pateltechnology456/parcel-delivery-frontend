import { AuthPage, OtpForm } from '@/components/auth/auth-shell';

export default function VerifyOtpPage() {
  return (
    <AuthPage
      kind="verify"
      eyebrow="Security verification"
      title="Enter 6-digit code"
      description="We sent a one-time verification code to your registered mobile number."
      illustration="phone"
    >
      <OtpForm />
    </AuthPage>
  );
}
