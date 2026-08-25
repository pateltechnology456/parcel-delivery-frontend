"use client";

import { useState } from "react";
import { Download, Key, Plus, Search, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

export function BusinessAccountsView() {
  const [search, setSearch] = useState("");

  const accounts = [
    { id: "ENT-101", company: "Acme Industrial Logistics", contact: "Rajesh Singhania", email: "dispatch@acme.com", phone: "+91 99887 76655", creditLimit: "₹5,00,000", usedCredit: "₹2,14,000", tier: "Gold (15% Off)", status: "active" },
    { id: "ENT-102", company: "Apex Pharmaceuticals Ltd", contact: "Dr. Alok Verma", email: "supply@apexpharma.in", phone: "+91 98221 44556", creditLimit: "₹3,00,000", usedCredit: "₹1,45,000", tier: "Platinum (20% Off)", status: "active" },
    { id: "ENT-103", company: "Malwa Textiles Group", contact: "Harsh Vardhan", email: "orders@malwatextile.com", phone: "+91 97554 11223", creditLimit: "₹2,00,000", usedCredit: "₹88,000", tier: "Silver (10% Off)", status: "active" },
    { id: "ENT-104", company: "Indore FMCG Distributors", contact: "Sunil Jain", email: "fmcg.dist@gmail.com", phone: "+91 98930 77889", creditLimit: "₹1,50,000", usedCredit: "₹1,48,000", tier: "Standard", status: "review" },
  ];

  const filtered = accounts.filter(
    (a) =>
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>NETWORK / B2B ENTERPRISE</p>
          <h1>Business Accounts</h1>
          <span>Manage corporate enterprise clients, postpaid credit limits, custom pricing tiers, and API keys.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button"
            onClick={() => toast.success("Opening New Enterprise Onboarding...")}
          >
            <Plus size={14} /> Onboard Enterprise Client
          </button>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-table-toolbar">
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#0b2a62" }}>
            Total B2B Clients: <strong>48 Active Contracts</strong>
          </div>
          <div className="mini-search">
            <Search />
            <input
              placeholder="Search company or contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.5fr 1.3fr 1.1fr 1.1fr 1fr 1fr" }}>
          <span>Enterprise Client</span>
          <span>Contact Person</span>
          <span>Credit Limit</span>
          <span>Current Due</span>
          <span>Contract Tier</span>
          <span>Status</span>
        </div>

        {filtered.map((a) => (
          <div
            key={a.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.5fr 1.3fr 1.1fr 1.1fr 1fr 1fr" }}
          >
            <span>
              <b>{a.company}</b>
              <small>{a.id}</small>
            </span>
            <span>
              <b>{a.contact}</b>
              <small>{a.phone}</small>
            </span>
            <span>
              <strong>{a.creditLimit}</strong>
            </span>
            <span>
              <strong style={{ color: "#ea580c" }}>{a.usedCredit}</strong>
            </span>
            <span>
              <small style={{ fontWeight: 700, color: "#1154d9" }}>{a.tier}</small>
            </span>
            <span>
              <span className={`admin-status ${a.status === "active" ? "green" : "orange"}`}>
                <i /> {a.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
