"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Sparkles, Building2, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true" style={{
      display: 'inline-flex',
      alignItems: 'flex-end',
      gap: '2.5px',
      height: '20px'
    }}>
      <span style={{ width: '5px', height: '10px', background: '#1154d9', borderRadius: '3px 3px 1px 1px', transform: 'skew(-18deg)' }} />
      <span style={{ width: '5px', height: '15px', background: '#1154d9', borderRadius: '3px 3px 1px 1px', transform: 'skew(-18deg)' }} />
      <span style={{ width: '5px', height: '20px', background: '#ff6b2c', borderRadius: '3px 3px 1px 1px', transform: 'skew(-18deg)' }} />
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  href = "/login",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
}) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <Link
      href={href}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: isPrimary ? '9px 18px' : '8px 14px',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: 700,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        background: isPrimary
          ? 'linear-gradient(135deg, #1154d9 0%, #0043c7 100%)'
          : isSecondary
          ? '#f1f5f9'
          : 'transparent',
        color: isPrimary ? '#ffffff' : '#1e293b',
        border: isSecondary ? '1px solid #e2e8f0' : 'none',
        boxShadow: isPrimary ? '0 4px 12px rgba(17, 84, 217, 0.25)' : 'none'
      }}
    >
      {children}
      {isPrimary && <ArrowRight size={14} />}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        transition: 'all 0.2s ease',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.04)' : 'none'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 20px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#0b2a62',
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '-0.02em'
          }}
        >
          <LogoMark />
          <span>
            Patel <b style={{ color: '#1154d9' }}>Technology</b>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}
          className="desktop-nav-links"
        >
          
          <Link
            href="/register/enterprise"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              color: '#475569',
              transition: 'color 0.15s ease'
            }}
          >
            <Building2 size={15} color="#1154d9" />
            For Enterprise
          </Link>
          <Link
            href="/login/partner"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              color: '#475569',
              transition: 'color 0.15s ease'
            }}
          >
            <Truck size={15} color="#ff6b2c" />
            Drive with Us
          </Link>
          
        </nav>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
          className="desktop-nav-actions"
        >
          <Link
            href="/login"
            style={{
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 700,
              color: '#334155',
              padding: '8px 14px'
            }}
          >
            Log in
          </Link>
          <Button href="/register" variant="primary">
            Create Account
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#0b2a62',
            padding: '8px',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              overflow: 'hidden'
            }}
          >
            <Link
              href="#services"
              onClick={() => setOpen(false)}
              style={{ textDecoration: 'none', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}
            >
              Services & Pricing
            </Link>
            <Link
              href="/register/enterprise"
              onClick={() => setOpen(false)}
              style={{ textDecoration: 'none', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}
            >
              For Enterprise & B2B
            </Link>
            <Link
              href="/register/partner"
              onClick={() => setOpen(false)}
              style={{ textDecoration: 'none', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}
            >
              Become a Delivery Partner
            </Link>
            <Link
              href="/fare-estimate"
              onClick={() => setOpen(false)}
              style={{ textDecoration: 'none', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}
            >
              Fare Calculator
            </Link>
            <div style={{ display: 'flex', gap: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  color: '#1e293b',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '8px',
                  background: '#1154d9',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

