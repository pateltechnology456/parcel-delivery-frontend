import { AuthPage } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <AuthPage 
      kind="register" 
      eyebrow="Start moving better" 
      title="Create your account." 
      description="Join the operating system for faster, calmer business deliveries."
    >
      <RegisterForm />
    </AuthPage>
  )
}
