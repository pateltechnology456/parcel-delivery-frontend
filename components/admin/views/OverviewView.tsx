"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Flame,
  MapPin,
  Package,
  ShieldCheck,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

export function OverviewView() {
  const stats = [
    { label: "Today's Orders", val: "148", change: "+14.2%", isUp: true, icon: Package, tone: "blue" },
    { label: "Gross Revenue (GMV)", val: "₹1,42,850", change: "+18.6%", isUp: true, icon: CircleDollarSign, tone: "green" },
    { label: "Active Fleet On-Duty", val: "64 Drivers", change: "92% online", isUp: true, icon: Truck, tone: "orange" },
    { label: "On-Time Delivery SLA", val: "98.4%", change: "+0.8%", isUp: true, icon: ShieldCheck, tone: "purple" },
  ];

  const recentOrders = [
    { id: "PT-2841", customer: "Rohan Mehta", route: "Vijay Nagar → Palasia", vehicle: "2-Wheeler", fare: "₹280", status: "in_transit" },
    { id: "PT-2840", customer: "Kavita Sharma", route: "Bhopal MP Nagar → Arera Colony", vehicle: "3-Wheeler", fare: "₹480", status: "delivered" },
    { id: "PT-2839", customer: "Acme Logistics", route: "Pithampur Sec 3 → Dewas Industrial", vehicle: "Mini Truck", fare: "₹1,850", status: "in_transit" },
    { id: "PT-2838", customer: "Pooja Verma", route: "Indore Airport → Scheme 78", vehicle: "2-Wheeler", fare: "₹220", status: "delivered" },
    { id: "PT-2837", customer: "Deepak Joshi", route: "Annapurna → Chhavani", vehicle: "3-Wheeler", fare: "₹340", status: "pending" },
  ];

  const hubStatus = [
    { hub: "Indore Central (Vijay Nagar)", activeOrders: 42, activeDrivers: 24, surge: "1.5x" },
    { hub: "Pithampur Heavy Logistics", activeOrders: 28, activeDrivers: 14, surge: "1.8x" },
    { hub: "Bhopal MP Nagar", activeOrders: 31, activeDrivers: 18, surge: "1.2x" },
    { hub: "Dewas Industrial Gate", activeOrders: 16, activeDrivers: 8, surge: "Normal" },
  ];

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>COMMAND CENTER / SYSTEM HEALTH</p>
          <h1>Operations Overview</h1>
          <span>Real-time dispatch telemetry, active fleet metrics, and revenue tracking.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/orders" className="admin-button">
            <Package size={15} /> Manage All Orders
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="admin-stat-grid">
        {stats.map((s) => {
          const I = s.icon;
          return (
            <div className="admin-stat" key={s.label}>
              <div className={`admin-stat-icon ${s.tone}`}>
                <I />
              </div>
              <div>
                <p>{s.label}</p>
                <strong>{s.val}</strong>
                <small>{s.change}</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-grid-two">
        {/* Recent Live Orders */}
        <div className="admin-card admin-orders-card">
          <div className="admin-card-heading">
            <div>
              <h2>Live Dispatch Activity</h2>
              <p>Real-time shipments across active cities</p>
            </div>
            <Link href="/admin/orders">
              View all <ChevronRight size={13} />
            </Link>
          </div>

          <div className="admin-order-row head">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Route</span>
            <span>Fare</span>
            <span>Status</span>
          </div>

          {recentOrders.map((o) => (
            <Link href={`/admin/orders/${o.id}`} className="admin-order-row" key={o.id}>
              <span>
                <b>{o.id}</b>
                <small>{o.vehicle}</small>
              </span>
              <span>
                <b>{o.customer}</b>
              </span>
              <span>
                <b>{o.route}</b>
              </span>
              <span>
                <strong>{o.fare}</strong>
              </span>
              <span className={`admin-status ${o.status === "delivered" ? "green" : o.status === "in_transit" ? "orange" : "blue"}`}>
                <i /> {o.status.replace("_", " ")}
              </span>
            </Link>
          ))}
        </div>

        {/* City Hubs Telemetry */}
        <div className="admin-card status-card">
          <div className="admin-card-heading">
            <div>
              <h2>Active Logistics Hubs</h2>
              <p>City-wide demand and surge telemetry</p>
            </div>
            <Link href="/admin/zones">
              Manage <ChevronRight size={13} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            {hubStatus.map((h) => (
              <div
                key={h.hub}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "#f8fafc",
                  border: "1px solid #edf2f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <b style={{ fontSize: "12.5px", color: "#0b2a62", display: "block" }}>{h.hub}</b>
                  <small style={{ fontSize: "11px", color: "#64748b" }}>
                    {h.activeOrders} orders · {h.activeDrivers} drivers active
                  </small>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: h.surge === "Normal" ? "#16a34a" : "#ea580c",
                    background: h.surge === "Normal" ? "#dcfce7" : "#ffedd5",
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {h.surge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
