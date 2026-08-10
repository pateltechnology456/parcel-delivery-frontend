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

function Status({
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
function Button({
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
function Heading({
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

function Sidebar({
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

function Topbar({
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

function Overview() {
  return (
    <>
      <Heading
        eyebrow="Monday, 24 June 2024"
        title="Good morning, Aditya"
        description="Here is what is happening across your delivery network today."
        action={
          <Button href="/admin/orders">
            <Package /> View all orders
          </Button>
        }
      />
      <div className="admin-stat-grid">
        {(
          [
            ["Total orders", "12,846", "+18.4%", "blue", Package],
            ["Revenue", "₹24.8L", "+12.8%", "orange", CircleDollarSign],
            ["Active drivers", "184", "+6.2%", "green", Truck],
            ["On-time delivery", "96.8%", "+2.4%", "purple", Zap],
          ] as [string, string, string, string, Icon][]
        ).map(([label, value, change, color, Icon]) => (
          <div className="admin-stat" key={label}>
            <span className={`admin-stat-icon ${color}`}>
              <Icon />
            </span>
            <div>
              <p>{label}</p>
              <strong>{value}</strong>
              <small>{change} vs last month</small>
            </div>
          </div>
        ))}
      </div>
 
      <div className="admin-grid-two bottom">
        <div className="admin-card admin-orders-card">
          <div className="admin-card-heading">
            <div>
              <h2>Recent orders</h2>
              <p>Latest shipment activity from your network</p>
            </div>
            <Link href="/admin/orders">
              View all <ArrowUpRight />
            </Link>
          </div>
          <div className="admin-order-table">
            <div className="admin-order-row head">
              <span>Order ID</span>
              <span>Customer</span>
              <span>Route</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {orders.map((order) => (
              <Link
                href={`/admin/orders/${order[0]}`}
                className="admin-order-row"
                key={order[0]}
              >
                <span>
                  <b>{order[0]}</b>
                  <small>Today, 08:32 AM</small>
                </span>
                <span>{order[1]}</span>
                <span>{order[2]}</span>
                <strong>{order[3]}</strong>
                <Status color={order[5]}>{order[4]}</Status>
              </Link>
            ))}
          </div>
        </div>
        <div className="admin-card admin-performance-card">
          <div className="admin-card-heading">
            <div>
              <h2>Delivery performance</h2>
              <p>Network health today</p>
            </div>
            <Activity />
          </div>
          <div className="performance-donut">
            <div>
              <strong>96.8%</strong>
              <small>On time</small>
            </div>
          </div>
          <div className="performance-legend">
            <span>
              <i className="green" />
              On-time <b>96.8%</b>
            </span>
            <span>
              <i className="orange" />
              Delayed <b>2.1%</b>
            </span>
            <span>
              <i className="red" />
              Exception <b>1.1%</b>
            </span>
          </div>
        </div>
      </div>
      <div className="admin-grid-three">
        <div className="admin-card status-card">
          <div className="admin-card-heading">
            <div>
              <h2>Live network</h2>
              <p>Current operational status</p>
            </div>
            <Gauge />
          </div>
          <div className="network-stat">
            <span className="network-icon blue">
              <Truck />
            </span>
            <div>
              <b>184</b>
              <small>Drivers online</small>
            </div>
            <Status color="green">Healthy</Status>
          </div>
          <div className="network-stat">
            <span className="network-icon orange">
              <Package />
            </span>
            <div>
              <b>428</b>
              <small>In transit</small>
            </div>
            <Status color="blue">Active</Status>
          </div>
          <div className="network-stat">
            <span className="network-icon purple">
              <CarFront />
            </span>
            <div>
              <b>62</b>
              <small>At hub</small>
            </div>
            <Status color="orange">Busy</Status>
          </div>
        </div>
        <div className="admin-card activity-card">
          <div className="admin-card-heading">
            <div>
              <h2>Driver activity</h2>
              <p>Top performers today</p>
            </div>
            <Link href="/admin/delivery-partners">
              View all <ArrowUpRight />
            </Link>
          </div>
          {[
            ["RS", "Rajesh Singh", "48 deliveries", "4.9", "blue"],
            ["PM", "Priya Mehta", "42 deliveries", "4.8", "orange"],
            ["AK", "Amit Kulkarni", "39 deliveries", "4.9", "green"],
          ].map((driver) => (
            <div className="driver-row" key={driver[1]}>
              <span className={`driver-avatar ${driver[4]}`}>{driver[0]}</span>
              <div>
                <b>{driver[1]}</b>
                <small>{driver[2]}</small>
              </div>
              <strong>★ {driver[3]}</strong>
            </div>
          ))}
        </div>
        <div className="admin-card activity-feed">
          <div className="admin-card-heading">
            <div>
              <h2>Activity feed</h2>
              <p>Recent events in the workspace</p>
            </div>
            <Bell />
          </div>
          {[
            ["Order PT-2048 assigned to Rajesh Singh", "2 min ago", "blue"],
            ["New business account approved", "18 min ago", "green"],
            ["Payment of ₹12,400 received", "42 min ago", "orange"],
            ["Vehicle VH-042 marked for service", "1 hr ago", "purple"],
          ].map((item) => (
            <div className="feed-row" key={item[0]}>
              <span className={`feed-dot ${item[2]}`} />
              <div>
                <b>{item[0]}</b>
                <small>{item[1]}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function TablePage({ section }: { section: string }) {
  const data =
    section === "customers"
      ? [
          ["CU-1042", "Rohan Mehta", "rohan@acme.com", "14 orders", "Active"],
          ["CU-1041", "Ananya Shah", "ananya@studio.in", "8 orders", "Active"],
          [
            "CU-1040",
            "Vivek Kumar",
            "vivek@commerce.com",
            "22 orders",
            "Active",
          ],
          ["CU-1039", "Meera Iyer", "meera@brand.co", "4 orders", "Inactive"],
        ]
      : section === "delivery-partners"
        ? [
            ["DP-208", "Rajesh Singh", "Indore Hub", "48 deliveries", "Online"],
            ["DP-207", "Priya Mehta", "Vijay Nagar", "42 deliveries", "Online"],
            [
              "DP-206",
              "Amit Kulkarni",
              "Bhopal Hub",
              "39 deliveries",
              "On route",
            ],
            ["DP-205", "Suresh Patil", "Pune Hub", "31 deliveries", "Offline"],
          ]
        : orders.map((o) => [o[0], o[1], o[2], o[3], o[4]]);
  const title =
    section === "customers"
      ? "Customers"
      : section === "delivery-partners"
        ? "Delivery partners"
        : "Orders";
  const icon =
    section === "customers" ? (
      <Users />
    ) : section === "delivery-partners" ? (
      <Truck />
    ) : (
      <Package />
    );
  return (
    <>
      <Heading
        eyebrow={`Operations / ${title}`}
        title={title}
        description={`Manage your ${title.toLowerCase()} and keep the network moving.`}
        action={
          <Button>
            <span>{icon}</span> Add{" "}
            {title === "Orders"
              ? "order"
              : title === "Customers"
                ? "customer"
                : "partner"}
          </Button>
        }
      />
      <div className="admin-card full-table-card">
        <div className="admin-table-toolbar">
          <div className="admin-tabs">
            <button className="active">
              All <span>{data.length}</span>
            </button>
            <button>
              Active <span>3</span>
            </button>
            <button>
              Needs attention <span>1</span>
            </button>
          </div>
          <div className="admin-table-actions">
            <div className="mini-search">
              <Search />
              <input placeholder={`Search ${title.toLowerCase()}...`} />
            </div>
            <button className="admin-filter">
              <Settings /> Filters
            </button>
          </div>
        </div>
        <div className="admin-wide-table">
          <div className="admin-wide-row head">
            <span>{title === "Orders" ? "Order ID" : "ID"}</span>
            <span>Name / customer</span>
            <span>{title === "Orders" ? "Route" : "Contact / location"}</span>
            <span>{title === "Orders" ? "Amount" : "Activity"}</span>
            <span>Status</span>
            <span />
          </div>
          {data.map((row) => (
            <div className="admin-wide-row" key={row[0]}>
              <span>
                <b>{row[0]}</b>
                <small>Today, 08:32 AM</small>
              </span>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
              <span>{row[3]}</span>
              <Status
                color={
                  row[4] === "Active" ||
                  row[4] === "Delivered" ||
                  row[4] === "Online"
                    ? "green"
                    : row[4] === "Exception"
                      ? "red"
                      : "blue"
                }
              >
                {row[4]}
              </Status>
              <button className="row-more">•••</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function FormPage({ section }: { section: string }) {
  const title =
    section === "pricing"
      ? "Pricing rules"
      : section === "zones"
        ? "Delivery zones"
        : section === "promo-codes"
          ? "Promo codes"
          : section === "vehicles"
            ? "Vehicles"
            : "Settings";
  return (
    <>
      <Heading
        eyebrow={`Network / ${title}`}
        title={title}
        description={`Configure ${title.toLowerCase()} for a predictable delivery experience.`}
        action={
          <Button>
            <Zap /> Create new
          </Button>
        }
      />
      <div className="admin-form-layout">
        <div className="admin-card admin-form-card">
          <div className="admin-card-heading">
            <div>
              <h2>General configuration</h2>
              <p>Keep your workspace settings clear and consistent.</p>
            </div>
            <Settings />
          </div>
          <div className="admin-form-grid">
            <label>
              Display name
              <input defaultValue={title} />
            </label>
            <label>
              Workspace owner
              <input defaultValue="Aditya Sharma" />
            </label>
            <label>
              Default city
              <select defaultValue="Indore">
                <option>Indore</option>
                <option>Bhopal</option>
                <option>Pune</option>
              </select>
            </label>
            <label>
              Timezone
              <select defaultValue="Asia/Kolkata">
                <option>Asia/Kolkata</option>
                <option>UTC</option>
              </select>
            </label>
            <label className="wide">
              Description
              <textarea
                defaultValue={`Manage ${title.toLowerCase()} across Patel Technology delivery operations.`}
              />
            </label>
          </div>
          <div className="form-actions">
            <Button secondary>Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
        <div className="admin-card admin-tip-card">
          <span>
            <Zap />
          </span>
          <h2>Admin tip</h2>
          <p>
            Use consistent rules and clear ownership so your team can make
            decisions faster across every hub.
          </p>
          <Link href="/admin/support">
            Need help? Contact support <ArrowUpRight />
          </Link>
        </div>
      </div>
    </>
  );
}

function Placeholder({ section }: { section: string }) {
  const labels: Record<string, string> = {
    "business-accounts": "Business accounts",
    payments: "Payments",
    wallet: "Wallet",
    notifications: "Notifications",
    reports: "Reports",
    analytics: "Analytics",
    cms: "Content management",
    support: "Help & support",
    roles: "Roles & permissions",
  };
  const title = labels[section] || "Admin workspace";
  return (
    <>
      <Heading
        eyebrow={`Workspace / ${title}`}
        title={title}
        description="A focused operational view for your Patel Technology team."
        action={
          <Button>
            <Zap /> New action
          </Button>
        }
      />
      <div className="admin-placeholder">
        <span>
          <Boxes />
        </span>
        <h2>{title} is ready for your team</h2>
        <p>
          Connect this workspace to your operational workflows to manage it with
          the same clarity as every delivery.
        </p>
        <Button secondary>Explore workspace</Button>
      </div>
    </>
  );
}

function AdminPage({ section }: { section?: string }) {
  if (!section) return <Overview />;
  if (["orders", "customers", "delivery-partners"].includes(section))
    return <TablePage section={section} />;
  if (
    ["pricing", "zones", "promo-codes", "vehicles", "settings"].includes(
      section,
    )
  )
    return <FormPage section={section} />;
  return <Placeholder section={section} />;
}

export default function AdminApp() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const section = pathname.split("/")[2] || undefined;
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
