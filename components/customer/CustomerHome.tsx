"use client";

import { Shell, DashboardPage } from "../enterprise/EnterpriseHome";
import {
  ArrowUpRight,
  ChevronRight,
  Megaphone,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { QuickBookingModal, DashVehicle } from "../enterprise/views/QuickBookingModal";

const RETAIL_VEHICLES: DashVehicle[] = [
  {
    key: "bike",
    name: "2 Wheeler",
    img: "/images/bike.png",
    capacity: "Up to 20 kg",
    sub: "Instant courier & docs",
    eta: "15 mins",
    basePrice: "₹40",
    accent: "#1154d9",
    bgAccent: "#eff6ff"
  },
  {
    key: "tempo",
    name: "3 Wheeler",
    img: "/images/truck.png",
    capacity: "Up to 500 kg",
    sub: "Cartons & commercial cargo",
    eta: "20 mins",
    basePrice: "₹140",
    accent: "#2dbb76",
    bgAccent: "#f0fdf4"
  },
  {
    key: "truck",
    name: "Mini Truck",
    img: "/images/truck.png",
    capacity: "Up to 1,000 kg",
    sub: "Tata Ace heavy freight",
    eta: "25 mins",
    basePrice: "₹280",
    accent: "#ff6b2c",
    bgAccent: "#fff7ed"
  },
  {
    key: "packers",
    name: "Packers",
    img: "/images/packers.png",
    capacity: "1-3 BHK Shifting",
    sub: "Dedicated house shifting crew",
    eta: "Scheduled",
    basePrice: "₹950",
    accent: "#8b5cf6",
    bgAccent: "#f5f3ff"
  },
];

export function CustomerHome({
  section,
  orderId,
}: {
  section?: string;
  orderId?: string;
}) {
  const [activeVeh, setActiveVeh] = useState<DashVehicle | null>(null);

  return (
    <Shell>
      {section ? (
        <DashboardPage section={section} orderId={orderId} />
      ) : (
        <div className="retail-shell" style={{ minHeight: 'auto', paddingBottom: 0 }}>
          <div className="retail-main">
            {/* Top Header */}
            <div className="retail-header">
              <div
                onClick={() => setActiveVeh(RETAIL_VEHICLES[0])}
                className="retail-location-picker"
                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
              >
                <span className="location-icon green">
                  <ArrowUpRight size={16} />
                </span>
                <div className="location-text">
                  <b>Pick up from</b>
                  <small>Vijay Nagar, Indore • Tap to set pickup & drop route</small>
                </div>
                <ChevronRight size={18} className="chevron" />
              </div>
            </div>

            {/* Services Grid */}
            <div className="retail-services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
              {RETAIL_VEHICLES.map((v) => (
                <div
                  key={v.key}
                  onClick={() => setActiveVeh(v)}
                  className="retail-service-card"
                  style={{ padding: '16px 14px', cursor: 'pointer' }}
                >
                  <div className="service-image-placeholder">
                    <img src={v.img} alt={v.name} />
                  </div>
                  <div className="service-content">
                    <b style={{ fontSize: '13px' }}>{v.name}</b>
                    <ChevronRight size={15} />
                  </div>
                </div>
              ))}
            </div>

            {/* Reusable Quick Booking Modal */}
            <QuickBookingModal
              vehicle={activeVeh}
              onClose={() => setActiveVeh(null)}
            />

            {/* Rewards Banner */}
            <div className="retail-banner rewards-banner">
              <div className="rewards-icon-wrap">
                <img src="/images/coin.png" alt="Rewards Coin" />
              </div>
              <div className="banner-text">
                <b>Explore Patel Rewards</b>
                <small>Earn rewards on your deliveries</small>
              </div>
              <ChevronRight size={18} className="chevron" />
            </div>

            {/* Announcements */}
            <div className="retail-announcements">
              <div className="announcement-header">
                <h3>Announcements</h3>
                <button>View all <ChevronRight size={16} /></button>
              </div>
              <div className="announcement-card">
                <div className="announcement-icon-wrap">
                  <Megaphone size={24} color="#1d6bff" />
                </div>
                <div className="announcement-text">
                  <b>Make your next move smooth and safe</b>
                </div>
                <ChevronRight size={18} className="chevron" />
              </div>
              <div className="announcement-dots">
                <span className="dot active" />
                <span className="dot" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
