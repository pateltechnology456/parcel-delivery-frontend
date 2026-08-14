import { AuthPage, LoginForm } from '@/components/auth/auth-shell'
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <AuthPage kind="login" eyebrow="Welcome back" title="Good to see you again." description="Log in to manage your deliveries and track your parcels in real time.">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthPage>
  );
}
