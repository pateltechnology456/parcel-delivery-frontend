"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  Boxes,
  CarFront,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Gauge,
  Headphones,
  LayoutDashboard,
  Menu,
  Moon,
  Package,
  PanelLeftClose,
  Percent,
  Receipt,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Tags,
  Truck,
  Users,
  WalletCards,
  X,
  Zap,
  ArrowUpRight,
} from "lucide-react";
type Icon = React.ComponentType<{ className?: string }>;

const navGroups: {
  label: string;
  items: { label: string; href: string; icon: Icon; badge?: string }[];
}[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      { label: "Orders", href: "/admin/orders", icon: Package, badge: "24" },
      { label: "Customers", href: "/admin/customers", icon: Users },
      {
        label: "Delivery partners",
        href: "/admin/delivery-partners",
        icon: Truck,
      },
      { label: "Vehicles", href: "/admin/vehicles", icon: CarFront },
    ],
  },
  {
    label: "Network",
    items: [
      { label: "Pricing", href: "/admin/pricing", icon: CircleDollarSign },
      { label: "Zones", href: "/admin/zones", icon: Gauge },
      {
        label: "Business accounts",
        href: "/admin/business-accounts",
        icon: ShoppingBag,
      },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Payments", href: "/admin/payments", icon: Receipt },
      { label: "Wallet", href: "/admin/wallet", icon: WalletCards },
      { label: "Promo codes", href: "/admin/promo-codes", icon: Percent },
    ],
  },
  {
    label: "Engagement",
    items: [
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      { label: "Reports", href: "/admin/reports", icon: FileText },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { label: "CMS", href: "/admin/cms", icon: Boxes },
      { label: "Support", href: "/admin/support", icon: Headphones },
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Roles & permissions", href: "/admin/roles", icon: ShieldCheck },
    ],
  },
];

const orders = [
  [
    "PT-2048",
    "Rohan Mehta",
    "Indore → Bengaluru",
    "₹840",
    "In transit",
    "blue",
  ],
  ["PT-2047", "Ananya Shah", "Bhopal → Pune", "₹540", "Delivered", "green"],
  [
    "PT-2046",
    "Vivek Kumar",
    "Indore → Mumbai",
    "₹1,240",
    "Out for delivery",
    "orange",
  ],
  ["PT-2045", "Meera Iyer", "Delhi → Indore", "₹380", "Delivered", "green"],
  ["PT-2044", "Arjun Rao", "Pune → Hyderabad", "₹760", "Exception", "red"],
];

export function Status({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className={`admin-status ${color}`}>
      <i />
      {children}
    </span>
  );
}
export function Button({
  children,
  secondary = false,
  href,
}: {
  children: React.ReactNode;
  secondary?: boolean;
  href?: string;
}) {
  const c = `admin-button ${secondary ? "secondary" : "primary"}`;
  return href ? (
    <Link className={c} href={href}>
      {children}
    </Link>
  ) : (
    <button className={c}>{children}</button>
  );
}
export function Heading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="admin-heading">
      <div>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{description}</span>
      </div>
      {action}
    </div>
  );
}

export function AdminBottomNav() {
  const path = usePathname();
  const tabs = [
    { href: "/admin", label: "Home", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: Package, center: true },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/delivery-partners", label: "Partners", icon: Truck },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];
  return (
    <nav
      className="admin-mobile-bottom-nav"
      aria-label="Mobile admin navigation"
    >
      {tabs.map(({ href, label, icon: Icon, center }) => (
        <Link
          key={href}
          href={href}
          className={`${path === href ? "active" : ""}${center ? " pnav-center" : ""}`}
          aria-label={label}
        >
          <Icon />
          {!center && <span>{label}</span>}
        </Link>
      ))}
    </nav>
  );
}

export function Sidebar({
  open,
  onClose,
  dark,
}: {
  open: boolean;
  onClose: () => void;
  dark: boolean;
}) {
  return (
    <aside
      className={`admin-sidebar ${open ? "open" : ""} ${dark ? "dark" : ""}`}
    >
      <div className="admin-brand-row">
        <Link className="admin-brand" href="/admin">
          <span className="admin-mark">
            <i />
            <i />
            <i />
          </span>
          <b>Patel</b>
          <small>technology</small>
        </Link>
        <button className="admin-close" onClick={onClose}>
          <X />
        </button>
      </div>
      <div className="admin-workspace">
        <span>PT</span>
        <div>
          <b>Patel Technology</b>
          <small>Admin workspace</small>
        </div>
        <ChevronDown />
      </div>
      <nav>
        {navGroups.map((group) => (
          <div className="admin-nav-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => {
              const I = item.icon;
              return (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <I />
                  <span>{item.label}</span>
                  {item.badge && <em>{item.badge}</em>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="admin-sidebar-bottom">
        <div className="admin-health">
          <span />
          <div>
            <b>All systems operational</b>
            <small>Last checked 2m ago</small>
          </div>
        </div>
        <Link href="/">
          <PanelLeftClose /> Back to website
        </Link>
      </div>
    </aside>
  );
}

export function Topbar({
  onMenu,
  dark,
  onTheme,
}: {
  onMenu: () => void;
  dark: boolean;
  onTheme: () => void;
}) {
  return (
    <header className="admin-topbar">
      <button className="admin-mobile-menu" onClick={onMenu}>
        <Menu />
      </button>
      <div className="admin-search">
        <Search />
        <input placeholder="Search anything..." />
        <kbd>⌘ K</kbd>
      </div>
      <div className="admin-top-actions">
        <button className="admin-icon-button" onClick={onTheme}>
          {dark ? <Sun /> : <Moon />}
        </button>
        <button className="admin-icon-button admin-bell">
          <Bell />
          <i />
        </button>
        <div className="admin-user">
          <span>AS</span>
          <div>
            <b>Aditya Sharma</b>
            <small>Super admin</small>
          </div>
          <ChevronDown />
        </div>
      </div>
    </header>
  );
}
