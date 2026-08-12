"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";

export function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
      <span />
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
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap h-16 flex items-center" style={{ background: 'white', boxShadow: 'none' }}>
      <nav className="container nav " aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Patel Technology home">
          <LogoMark />
          <span>
            Patel <b>Technology</b>
          </span>
        </Link>
        <div className={`nav-links ${open ? "nav-open" : ""}`}>
          <Link href="/register/enterprise" onClick={() => setOpen(false)}>
            For enterprise
          </Link>
          <Link href="/register/partner" onClick={() => setOpen(false)}>
            Delivery partners
          </Link>
        </div>
        <div className="nav-actions">
          <Button href="/login">Log in</Button>
        </div>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}
