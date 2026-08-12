import { AuthPage } from '@/components/auth/auth-shell'
import { EnterpriseRegisterForm } from '@/components/auth/enterprise-register-form'

export default function EnterpriseRegisterPage() {
  return (
    <AuthPage 
      kind="register" 
      eyebrow="For Enterprise" 
      title="Create your enterprise account." 
      description="Scale your business deliveries with Patel Technology's powerful enterprise platform."
    >
      <EnterpriseRegisterForm />
    </AuthPage>
  )
}
