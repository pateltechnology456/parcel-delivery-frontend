import { AuthPage, RegisterForm } from '@/components/auth/auth-shell'

export default function RegisterPage() {
  return <AuthPage kind="register" eyebrow="Start moving better" title="Create your account." description="Join the operating system for faster, calmer business deliveries."><RegisterForm /></AuthPage>
}
