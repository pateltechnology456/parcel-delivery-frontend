"use client";

import { useState } from "react";
import {
  Bike,
  CheckCircle2,
  Download,
  MoreVertical,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Truck,
  UserCheck,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export function DeliveryPartnersView() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "approved" | "pending" | "online">("all");

  const [partners, setPartners] = useState([
    { id: "PT-DRV-2841", name: "Arjun Kumar", phone: "+91 98765 43210", vehicle: "Bike (Honda Activa 6G)", number: "MP-09-XX-4821", rating: "4.9", trips: 248, duty: "online", kyc: "approved" },
    { id: "PT-DRV-2840", name: "Sunil Verma", phone: "+91 98234 56789", vehicle: "Tempo (Piaggio Ape)", number: "MP-04-EA-1920", rating: "4.8", trips: 182, duty: "online", kyc: "approved" },
    { id: "PT-DRV-2839", name: "Rajesh Solanki", phone: "+91 99887 76655", vehicle: "Mini Truck (Tata Ace)", number: "MP-09-TR-7721", rating: "4.9", trips: 412, duty: "offline", kyc: "approved" },
    { id: "PT-DRV-2838", name: "Mohit Jain", phone: "+91 98123 45670", vehicle: "Bike (Hero Splendor)", number: "MP-09-CC-3412", rating: "4.7", trips: 64, duty: "online", kyc: "approved" },
    { id: "PT-DRV-2837", name: "Dinesh Yadav", phone: "+91 97654 32109", vehicle: "Tempo (Mahindra Alfa)", number: "MP-13-ZZ-9081", rating: "5.0", trips: 12, duty: "offline", kyc: "pending" },
    { id: "PT-DRV-2836", name: "Vikram Rathi", phone: "+91 91234 56780", vehicle: "Mini Truck (Bolero Pickup)", number: "MP-09-TK-4411", rating: "4.6", trips: 96, duty: "offline", kyc: "pending" },
  ]);

  const handleApprove = (id: string) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, kyc: "approved" } : p))
    );
    toast.success(`Partner ${id} KYC Approved & Activated!`);
  };

  const filtered = partners.filter((p) => {
    if (tab === "approved" && p.kyc !== "approved") return false;
    if (tab === "pending" && p.kyc !== "pending") return false;
    if (tab === "online" && p.duty !== "online") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.vehicle.toLowerCase().includes(q) || p.number.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>OPERATIONS / DRIVERS</p>
          <h1>Delivery Partners</h1>
          <span>Driver onboarding, vehicle verification, duty tracking, and KYC approvals.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button secondary"
            onClick={() => toast.success("Exporting Driver database to CSV...")}
          >
            <Download size={14} /> Export Driver List
          </button>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-table-toolbar">
          <div className="admin-tabs">
            {(["all", "online", "approved", "pending"] as const).map((t) => (
              <button
                key={t}
                className={tab === t ? "active" : ""}
                onClick={() => setTab(t)}
                style={{ textTransform: "capitalize" }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mini-search">
            <Search />
            <input
              placeholder="Search partner, vehicle, plate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.3fr 1.6fr 1fr 1fr 1fr 1.2fr" }}>
          <span>Driver Name</span>
          <span>Vehicle & Number</span>
          <span>Rating</span>
          <span>Trips</span>
          <span>Duty</span>
          <span>KYC Action</span>
        </div>

        {filtered.map((p) => (
          <div
            key={p.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.3fr 1.6fr 1fr 1fr 1fr 1.2fr" }}
          >
            <span>
              <b>{p.name}</b>
              <small>{p.id}</small>
            </span>
            <span>
              <b>{p.vehicle}</b>
              <small>{p.number}</small>
            </span>
            <span>
              <strong style={{ color: "#d97706" }}>★ {p.rating}</strong>
            </span>
            <span>
              <strong>{p.trips} completed</strong>
            </span>
            <span>
              <span className={`admin-status ${p.duty === "online" ? "green" : "orange"}`}>
                <i /> {p.duty}
              </span>
            </span>
            <span>
              {p.kyc === "pending" ? (
                <button
                  type="button"
                  onClick={() => handleApprove(p.id)}
                  style={{
                    background: "#1154d9",
                    color: "#ffffff",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Approve KYC
                </button>
              ) : (
                <span className="admin-status green">
                  <i /> Verified
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
