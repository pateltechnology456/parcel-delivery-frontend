"use client";

import type React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
  Loader2,
  ShieldAlert,
} from "lucide-react";

import {
  OverviewView,
  OrdersView,
  CustomersView,
  DeliveryPartnersView,
  VehiclesView,
  PricingView,
  ZonesView,
  BusinessAccountsView,
  PaymentsView,
  WalletView,
  PromoCodesView,
  NotificationsView,
  ReportsView,
  AnalyticsView,
  CmsView,
  SupportView,
  RolesView,
  SettingsView,
} from "./views";

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

function AdminBottomNav() {
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
      {tabs.map(({ href, label, icon: Icon, center }) => {
        const isActive =
          href === "/admin"
            ? path === "/admin"
            : path === href || (Boolean(path) && path.startsWith(href + "/"));
        return (
          <Link
            key={href}
            href={href}
            className={`${isActive ? "active" : ""}${center ? " pnav-center" : ""}`}
            aria-label={label}
          >
            <Icon />
            {!center && <span>{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function Sidebar({
  open,
  onClose,
  dark,
}: {
  open: boolean;
  onClose: () => void;
  dark: boolean;
}) {
  const path = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Save sidebar scroll position on user scrolling
  const handleScroll = () => {
    if (navRef.current) {
      sessionStorage.setItem("admin_sidebar_scroll_top", String(navRef.current.scrollTop));
    }
  };

  // Restore scroll position after route transitions
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("admin_sidebar_scroll_top");
    if (savedScroll && navRef.current) {
      navRef.current.scrollTop = Number(savedScroll);
    }
  }, [path]);

  return (
    <aside
      className={`admin-sidebar ${open ? "open" : ""} ${dark ? "dark" : ""}`}
    >
      <div className="admin-brand-row">
        <Link className="admin-brand" href="/admin" scroll={false}>
          <span className="admin-mark">
            <i />
            <i />
            <i />
          </span>
          <b>Patel</b>
          <small>technology</small>
        </Link>
        <button className="admin-close" onClick={onClose} aria-label="Close menu">
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
      <nav ref={navRef} onScroll={handleScroll}>
        {navGroups.map((group) => (
          <div className="admin-nav-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => {
              const I = item.icon;
              const isActive =
                item.href === "/admin"
                  ? path === "/admin"
                  : path === item.href || (Boolean(path) && path.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  scroll={false}
                  className={isActive ? "active" : ""}
                >
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
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("mock_current_user");
            localStorage.removeItem("admin_current_user");
            window.location.href = "/admin/login";
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            padding: "10px",
            background: "none",
            border: "none",
            color: "#ef4444",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <LogOut size={15} /> Sign out of Admin
        </button>
        <Link href="/">
          <PanelLeftClose /> Back to website
        </Link>
      </div>
    </aside>
  );
}

function Topbar({
  onMenu,
  dark,
  onTheme,
}: {
  onMenu: () => void;
  dark: boolean;
  onTheme: () => void;
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("mock_current_user");
    localStorage.removeItem("admin_current_user");
    window.location.href = "/admin/login";
  };

  return (
    <header className="admin-topbar">
      <button className="admin-mobile-menu" onClick={onMenu} aria-label="Open menu">
        <Menu />
      </button>
      <div className="admin-search">
        <Search />
        <input placeholder="Search orders, fleet, partners..." />
        <kbd>⌘ K</kbd>
      </div>
      <div className="admin-top-actions">
        <button className="admin-icon-button" onClick={onTheme} aria-label="Toggle theme">
          {dark ? <Sun /> : <Moon />}
        </button>
        <button className="admin-icon-button admin-bell" aria-label="Notifications">
          <Bell />
          <i />
        </button>

        {/* Admin User Avatar & Dropdown */}
        <div style={{ position: "relative" }}>
          <div
            className="admin-user"
            onClick={() => setProfileOpen(!profileOpen)}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <span>AS</span>
            <div>
              <b>Aditya Sharma</b>
              <small>Super admin</small>
            </div>
            <ChevronDown
              size={14}
              style={{
                transform: profileOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
          </div>

          {profileOpen && (
            <>
              <div
                onClick={() => setProfileOpen(false)}
                style={{ position: "fixed", inset: 0, zIndex: 90 }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  width: "240px",
                  background: dark ? "#132544" : "#ffffff",
                  borderRadius: "14px",
                  boxShadow:
                    "0 20px 40px -8px rgba(11, 42, 98, 0.2), 0 0 0 1px rgba(0,0,0,0.06)",
                  border: dark ? "1px solid #294667" : "1px solid #e2e8f0",
                  zIndex: 100,
                  overflow: "hidden",
                  padding: "6px",
                }}
              >
                <div
                  style={{
                    padding: "10px 12px",
                    background: dark ? "#0d1b33" : "#f8fafc",
                    borderRadius: "10px",
                    marginBottom: "6px",
                  }}
                >
                  <b
                    style={{
                      fontSize: "13px",
                      color: dark ? "#ffffff" : "#0b2a62",
                      display: "block",
                    }}
                  >
                    Aditya Sharma
                  </b>
                  <small
                    style={{
                      fontSize: "11px",
                      color: "#1154d9",
                      fontWeight: 700,
                    }}
                  >
                    Super Administrator
                  </small>
                </div>

                <Link
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    color: dark ? "#cbd5e1" : "#334155",
                    textDecoration: "none",
                    fontSize: "12.5px",
                    fontWeight: 600,
                  }}
                >
                  <Settings size={14} /> System Settings
                </Link>

                <div
                  style={{
                    marginTop: "4px",
                    paddingTop: "4px",
                    borderTop: "1px solid rgba(226, 232, 240, 0.6)",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleSignOut}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function AdminPage({ section }: { section?: string }) {
  if (!section) return <OverviewView />;
  if (section === "orders") return <OrdersView />;
  if (section === "customers") return <CustomersView />;
  if (section === "delivery-partners") return <DeliveryPartnersView />;
  if (section === "vehicles") return <VehiclesView />;
  if (section === "pricing") return <PricingView />;
  if (section === "zones") return <ZonesView />;
  if (section === "business-accounts") return <BusinessAccountsView />;
  if (section === "payments") return <PaymentsView />;
  if (section === "wallet") return <WalletView />;
  if (section === "promo-codes") return <PromoCodesView />;
  if (section === "notifications") return <NotificationsView />;
  if (section === "reports") return <ReportsView />;
  if (section === "analytics") return <AnalyticsView />;
  if (section === "cms") return <CmsView />;
  if (section === "support") return <SupportView />;
  if (section === "roles") return <RolesView />;
  if (section === "settings") return <SettingsView />;
  return <OverviewView />;
}

export default function AdminApp() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const pathname = usePathname();
  const section = pathname.split("/")[2] || undefined;

  useEffect(() => {
    try {
      const storedAdmin =
        typeof window !== "undefined"
          ? localStorage.getItem("admin_current_user")
          : null;
      const storedUser =
        typeof window !== "undefined"
          ? localStorage.getItem("mock_current_user")
          : null;
      let isAdmin = false;

      if (storedAdmin) {
        const parsed = JSON.parse(storedAdmin);
        if (
          parsed &&
          (parsed.accountType === "admin" ||
            parsed.role?.toLowerCase().includes("admin"))
        ) {
          isAdmin = true;
        }
      } else if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (
          parsed &&
          (parsed.accountType === "admin" ||
            parsed.role?.toLowerCase().includes("admin"))
        ) {
          isAdmin = true;
        }
      }

      if (!isAdmin) {
        setAuthorized(false);
        router.replace("/admin/login");
      } else {
        setAuthorized(true);
      }
    } catch (e) {
      setAuthorized(false);
      router.replace("/admin/login");
    }
  }, [router, pathname]);

  if (authorized === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b172e",
          color: "#ffffff",
          gap: "16px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <Loader2
          style={{ animation: "spin 1s linear infinite" }}
          size={36}
          color="#1154d9"
        />
        <div style={{ textAlign: "center" }}>
          <b style={{ fontSize: "16px", display: "block", color: "#ffffff" }}>
            Verifying Administrator Credentials...
          </b>
          <small style={{ color: "#94a3b8" }}>
            Secured by Patel Technology Gateway
          </small>
        </div>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b172e",
          color: "#ffffff",
          gap: "16px",
          padding: "20px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <ShieldAlert size={44} color="#ef4444" />
        <div style={{ textAlign: "center" }}>
          <b style={{ fontSize: "18px", display: "block", color: "#fca5a5" }}>
            Admin Access Restricted
          </b>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              maxWidth: "340px",
              margin: "8px 0 18px",
            }}
          >
            You need verified super administrator authorization to access the
            command gateway.
          </p>
          <Link
            href="/admin/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#1154d9",
              color: "#ffffff",
              padding: "10px 22px",
              borderRadius: "10px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "13.5px",
            }}
          >
            Go to Admin Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-shell ${dark ? "admin-dark" : ""}`}>
      <Sidebar open={open} onClose={() => setOpen(false)} dark={dark} />
      <div className="admin-main">
        <Topbar
          onMenu={() => setOpen(true)}
          dark={dark}
          onTheme={() => setDark(!dark)}
        />
        <main className="admin-content">
          <AdminPage section={section} />
        </main>
      </div>
      {open && (
        <button
          className="admin-overlay"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      )}
      <AdminBottomNav />
    </div>
  );
}
