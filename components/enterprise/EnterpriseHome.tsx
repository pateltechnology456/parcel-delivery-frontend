"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Profile } from "./views/Profile";
import { SettingsPage } from "./views/SettingsPage";
import { Language } from "./views/Language";
import { Terms } from "./views/Terms";
import { Support } from "./views/Support";
import { WalletPage } from "./views/WalletPage";
import { NotificationsPage } from "./views/NotificationsPage";
import { AddressesPage } from "./views/AddressesPage";
import { Overview } from "./views/Overview";
import { Orders } from "./views/Orders";
import { Track } from "./views/Track";
import { Book } from "./views/Book";
import { OrderDetail } from "./views/OrderDetail";
import { orders } from "./data";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  Bell,
  Box,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Edit,
  FileText,
  Globe,
  Home,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Package,
  Plus,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Truck,
  UserRound,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/orders", label: "My orders", icon: Package },
  { href: "/dashboard/track", label: "Track parcel", icon: Route },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
];
const secondary = [
  { href: "/dashboard/addresses", label: "Saved addresses", icon: MapPin },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/support", label: "Help & support", icon: CircleHelp },
];

function Mark() {
  return (
    <span className="dash-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
function Brand() {
  return (
    <Link href="/dashboard" className="dash-brand">
      <Mark />
      <span>
        Patel <b>Technology</b>
      </span>
    </Link>
  );
}
function BottomNav() {
  const pathname = usePathname();
  const bottomLinks = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/orders", label: "Orders", icon: Package },
    { href: "/dashboard/track", label: "Track", icon: Route },
    { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  ];
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {bottomLinks.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        const isBook = label === "Book";
        return (
          <Link
            key={href}
            href={href}
            className={`bottom-nav-item${isActive ? " bottom-nav-active" : ""}${isBook ? " bottom-nav-book" : ""}`}
            aria-label={label}
          >
            <span className="bottom-nav-icon">
              <Icon size={isBook ? 22 : 20} />
            </span>
            {!isBook && <span className="bottom-nav-label">{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("mock_current_user");
    localStorage.removeItem("active_booking_draft");
    localStorage.removeItem("estimate_data");
    window.location.href = "/login";
  };
  return (
    <div className={`dashboard-shell ${dark ? "dashboard-dark" : ""}`}>
      <aside className={`dashboard-sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <button
            className="sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X />
          </button>
        </div>
        <div className="workspace-switch">
          <span className="workspace-avatar">AK</span>
          <span>
            <b>Acme Commerce</b>
            <small>Business account</small>
          </span>
          <ChevronDown />
        </div>
        <div className="dash-nav">
          <small className="nav-label">Workspace</small>
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={pathname === href ? "active" : ""}
            >
              <Icon />
              {label}
              {label === "My orders" && <span className="nav-count">12</span>}
            </Link>
          ))}
          <small className="nav-label nav-label-spaced">Manage</small>
          {secondary.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={pathname === href ? "active" : ""}
            >
              <Icon />
              {label}
              {label === "Notifications" && <span className="nav-dot" />}
            </Link>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span />
            <div>
              <b>All systems operational</b>
              <small>Updated just now</small>
            </div>
          </div>
          <Link href="/" className="back-site">
            <ArrowRight /> Back to website
          </Link>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="mobile-menu"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu />
          </button>
          <div className="top-search">
            <Search />
            <input
              placeholder="Search shipments, orders..."
              aria-label="Search dashboard"
            />
          </div>
          <div className="top-actions">
            <button
              className="icon-button theme-toggle"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
            >
              {dark ? <Sun /> : <Moon />}
            </button>
            <Link
              href="/dashboard/notifications"
              className="icon-button notification-button"
              aria-label="Notifications"
            >
              <Bell />
              <i />
            </Link>
            <div className="profile-menu-wrapper" style={{ position: 'relative' }}>
              <div
                className="profile-menu"
                onClick={() => setProfileOpen(true)}
                role="button"
                tabIndex={0}
              >
                <span className="profile-avatar">AK</span>
                <span className="profile-copy">
                  <b>Ankit Kumar</b>
                  <small>Admin</small>
                </span>
                <ChevronDown />
              </div>
              
              {/* Desktop Dropdown */}
              {profileOpen && (
                <>
                  <div className="profile-overlay desktop-only" onClick={() => setProfileOpen(false)} />
                  <div className="profile-dropdown desktop-only">
                    <div className="dropdown-header">
                      <b>Ankit Kumar</b>
                      <small>ankit@acme.com</small>
                    </div>
                    <div className="dropdown-body">
                      <Link href="/dashboard/profile" onClick={() => setProfileOpen(false)}>
                        <Edit size={16} /> Edit Profile
                      </Link>
                      <Link href="/dashboard/settings" onClick={() => setProfileOpen(false)}>
                        <Settings size={16} /> Preferences
                      </Link>
                      <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Profile Sidebar */}
            <aside className={`mobile-profile-sidebar ${profileOpen ? "sidebar-open" : ""}`}>
              <div className="sidebar-top">
                <div className="profile-info-large">
                  <span className="profile-avatar large">AK</span>
                  <div>
                    <b>Ankit Kumar</b>
                    <small>Admin</small>
                  </div>
                </div>
                <button
                  className="sidebar-close"
                  onClick={() => setProfileOpen(false)}
                  aria-label="Close profile menu"
                >
                  <X />
                </button>
              </div>
              <div className="dash-nav mobile-profile-nav">
                <Link href="/dashboard/profile" onClick={() => setProfileOpen(false)}>
                  <Edit /> Edit Profile
                </Link>
                <Link href="/dashboard/language" onClick={() => setProfileOpen(false)}>
                  <Globe /> Language
                </Link>
                <Link href="/dashboard/support" onClick={() => setProfileOpen(false)}>
                  <CircleHelp /> Help & Support
                </Link>
                <Link href="/dashboard/terms" onClick={() => setProfileOpen(false)}>
                  <FileText /> Terms & Condition
                </Link>
                <button className="logout-btn-mobile" onClick={handleLogout}>
                  <LogOut /> Logout
                </button>
              </div>
            </aside>
            {profileOpen && <div className="mobile-overlay-bg" onClick={() => setProfileOpen(false)} />}
          </div>
        </header>
        <main className="dashboard-content">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="dash-heading">
      <div>
        <p className="dash-eyebrow">{eyebrow || "Patel Central"}</p>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  tone = "blue",
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  change: string;
  tone?: string;
}) {
  return (
    <div className="stat-card">
      <span className={`stat-icon ${tone}`}>
        <Icon />
      </span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small className={change.startsWith("-") ? "negative" : ""}>
          {change}
        </small>
      </div>
    </div>
  );
}
export function Button({
  children,
  href,
  variant = "primary",
  onClick,
  style,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
}) {
  const combinedClass = `dash-button ${variant} ${className}`.trim();
  return href ? (
    <Link href={href} className={combinedClass} style={style}>
      {children}
    </Link>
  ) : (
    <button type="button" className={combinedClass} onClick={onClick} style={style} disabled={disabled}>
      {children}
    </button>
  );
}
export function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span className={`status-badge ${color}`}>
      <i />
      {status}
    </span>
  );
}


export function DashboardPage({
  section,
  orderId,
}: {
  section?: string;
  orderId?: string;
}) {
  if (orderId) return <OrderDetail id={orderId} />;
  if (section === "orders") return <Orders />;
  if (section === "book") return <Book />;
  if (section === "track") return <Track />;
  if (section === "language") return <Language />;
  if (section === "terms") return <Terms />;
  if (section === "support") return <Support />;
  if (section === "profile") return <Profile />;
  if (section === "settings") return <SettingsPage />;
  if (section === "wallet") return <WalletPage />;
  if (section === "notifications") return <NotificationsPage />;
  if (section === "addresses") return <AddressesPage />;

  return <Overview />;
}
export function EnterpriseHome({
  section,
  orderId,
}: {
  section?: string;
  orderId?: string;
}) {
  return (
    <Shell>
      <DashboardPage section={section} orderId={orderId} />
    </Shell>
  );
}
