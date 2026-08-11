"use client";

import { useState } from 'react';
import Link from 'next/link';
import { UserRound, Briefcase, ChevronRight } from 'lucide-react';
import { AuthPage } from '@/components/auth/auth-shell';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<"none" | "retail">("none");

  if (accountType === "retail") {
    return (
      <AuthPage 
        kind="register" 
        eyebrow="Start moving better" 
        title="Create your account." 
        description="Join the operating system for faster, calmer business deliveries."
      >
        <button 
          onClick={() => setAccountType("none")}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#6e7c91', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', padding: 0 }}
        >
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to options
        </button>
        <RegisterForm />
      </AuthPage>
    )
  }

  return (
    <AuthPage 
      kind="register" 
      eyebrow="Start moving better" 
      title="How will you use Patel Central?" 
      description="Select an account type to proceed."
    >
      <div className="account-type-chooser" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
        <button 
          onClick={() => setAccountType("retail")}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', border: '1px solid #dfe7f1', borderRadius: '12px', background: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#1d6bff'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = '#dfe7f1'}
        >
          <div style={{ background: '#f5f8fc', padding: '12px', borderRadius: '8px', color: '#1d6bff' }}>
            <UserRound size={24} />
          </div>
          <div>
            <b style={{ display: 'block', fontSize: '16px', color: '#10203a', marginBottom: '4px' }}>Personal use</b>
            <span style={{ color: '#6e7c91', fontSize: '14px' }}>Send parcels, track orders, and manage your personal deliveries.</span>
          </div>
        </button>

        <Link 
          href="/register/enterprise"
          style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', border: '1px solid #dfe7f1', borderRadius: '12px', background: '#fff', cursor: 'pointer', textAlign: 'left', textDecoration: 'none', transition: 'border-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#1d6bff'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = '#dfe7f1'}
        >
          <div style={{ background: '#f5f8fc', padding: '12px', borderRadius: '8px', color: '#1d6bff' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <b style={{ display: 'block', fontSize: '16px', color: '#10203a', marginBottom: '4px' }}>Business / Enterprise</b>
            <span style={{ color: '#6e7c91', fontSize: '14px' }}>Bulk bookings, APIs, workspaces and dedicated support.</span>
          </div>
        </Link>
      </div>
      
      <div style={{ marginTop: '32px', textAlign: 'center', color: '#6e7c91', fontSize: '14px' }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: '#1d6bff', fontWeight: '500', textDecoration: 'none' }}>
          Log in
        </Link>
      </div>
    </AuthPage>
  )
}
