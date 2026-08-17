"use client";

import { PageHeading, StatCard } from "../EnterpriseHome";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Bike,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Package,
  Route,
  Sparkles,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { OrderTable } from "./OrderTable";
import { QuickBookingModal, DashVehicle } from "./QuickBookingModal";

const DASH_VEHICLES: DashVehicle[] = [
  {
    key: "bike",
    name: "2 Wheeler",
    sub: "Instant courier & docs",
    capacity: "Up to 20 kg",
    eta: "15 mins",
    basePrice: "₹40",
    accent: "#1154d9",
    bgAccent: "#eff6ff",
    icon: Bike,
  },
  {
    key: "tempo",
    name: "3 Wheeler Tempo",
    sub: "Cargo & medium cartons",
    capacity: "Up to 500 kg",
    eta: "20 mins",
    basePrice: "₹140",
    accent: "#2dbb76",
    bgAccent: "#f0fdf4",
    icon: Truck,
  },
  {
    key: "truck",
    name: "Mini Truck (Tata Ace)",
    sub: "Heavy bulk & freight",
    capacity: "Up to 1,000 kg",
    eta: "25 mins",
    basePrice: "₹280",
    accent: "#ff6b2c",
    bgAccent: "#fff7ed",
    icon: Truck,
  },
  {
    key: "packers",
    name: "Packers & Movers",
    sub: "House & office shifting",
    capacity: "1-3 BHK Shifting",
    eta: "Scheduled",
    basePrice: "₹950",
    accent: "#8b5cf6",
    bgAccent: "#f5f3ff",
    icon: Boxes,
  },
];

export function Overview() {
  const [activeModalVeh, setActiveModalVeh] = useState<DashVehicle | null>(null);

  return (
    <>
      <PageHeading
        eyebrow="Enterprise Fleet Hub"
        title="Good morning, Ankit"
        description="Choose a vehicle to dispatch or track live ongoing business shipments."
      />

      {/* Vehicle Dispatch Selection Section */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0b2a62", margin: 0 }}>
              Book an Instant Delivery
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#64748b" }}>
              Click any vehicle below to set pickup & drop route with guaranteed 15-min driver arrival.
            </p>
          </div>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "4px 10px", borderRadius: "99px", display: "flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={13} /> Fleet Available
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {DASH_VEHICLES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.key}
                onClick={() => setActiveModalVeh(v)}
                style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(11, 42, 98, 0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #e2e8f0",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    transition: "border-color 0.2s ease",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "14px",
                          background: v.bgAccent,
                          color: v.accent,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: v.accent,
                          background: v.bgAccent,
                          padding: "3px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        From {v.basePrice}
                      </span>
                    </div>

                    <b style={{ fontSize: "15px", color: "#0b2a62", display: "block", marginBottom: "2px" }}>
                      {v.name}
                    </b>
                    <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#64748b" }}>
                      {v.sub}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #f1f5f9",
                      paddingTop: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "#475569", fontWeight: 600 }}>
                      ⚖️ {v.capacity}
                    </span>
                    <span style={{ color: v.accent, fontWeight: 700, display: "flex", alignItems: "center", gap: "2px" }}>
                      Enter Route <ChevronRight size={14} />
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reusable Quick Booking Modal */}
      <QuickBookingModal
        vehicle={activeModalVeh}
        onClose={() => setActiveModalVeh(null)}
      />

      {/* Stats Grid */}
      <div className="stat-grid">
        <StatCard
          icon={Package}
          label="Total shipments"
          value="1,284"
          change="+18.4% this month"
        />
        <StatCard
          icon={Truck}
          label="In transit"
          value="472"
          change="+8.2% from yesterday"
          tone="orange"
        />
        <StatCard
          icon={CheckCircle2}
          label="Delivered"
          value="798"
          change="+12.6% this month"
          tone="green"
        />
        <StatCard
          icon={Wallet}
          label="Wallet balance"
          value="₹24,680"
          change="+₹12,400 this month"
          tone="purple"
        />
      </div>

      <div className="dash-grid-two">
        <div className="dash-card quick-card">
          <div className="card-heading">
            <div>
              <h2>Quick actions</h2>
              <p>Common operations, one click away.</p>
            </div>
            <Zap />
          </div>
          <div className="quick-actions">
            <Link href="/dashboard/track">
              <span className="quick-icon orange">
                <Route />
              </span>
              <span>
                <b>Track a parcel</b>
                <small>Find shipment with live GPS</small>
              </span>
              <ArrowRight />
            </Link>
            <Link href="/dashboard/orders">
              <span className="quick-icon blue">
                <Package />
              </span>
              <span>
                <b>View all orders</b>
                <small>Shipment history & invoices</small>
              </span>
              <ArrowRight />
            </Link>
            <Link href="/dashboard/wallet">
              <span className="quick-icon green">
                <Wallet />
              </span>
              <span>
                <b>Add wallet balance</b>
                <small>Top up your business account</small>
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <OrderTable />
    </>
  );
}
