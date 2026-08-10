import { AuthPage } from '@/components/auth/auth-shell'
import { PartnerRegisterForm } from '@/components/auth/partner-register-form'

export default function PartnerRegisterPage() {
  return (
    <AuthPage 
      kind="register" 
      eyebrow="Delivery Partners" 
      title="Drive with us." 
      description="Become a delivery partner and enjoy flexible hours with great earnings."
    >
      <PartnerRegisterForm />
    </AuthPage>
  )
}
