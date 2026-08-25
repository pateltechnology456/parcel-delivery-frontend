"use client";

import { useState } from "react";
import {
  Download,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

export function CustomersView() {
  const [search, setSearch] = useState("");

  const customers = [
    { id: "CUST-1092", name: "Rohan Mehta", email: "rohan.mehta@gmail.com", phone: "+91 98765 43210", city: "Indore", totalOrders: 28, totalSpend: "₹14,280", status: "active", kyc: "verified" },
    { id: "CUST-1091", name: "Kavita Sharma", email: "kavita.sharma@yahoo.com", phone: "+91 98234 56789", city: "Bhopal", totalOrders: 14, totalSpend: "₹7,650", status: "active", kyc: "verified" },
    { id: "CUST-1090", name: "Acme Enterprises", email: "dispatch@acme.com", phone: "+91 99887 76655", city: "Pithampur", totalOrders: 184, totalSpend: "₹2,48,900", status: "enterprise", kyc: "verified" },
    { id: "CUST-1089", name: "Pooja Verma", email: "pooja.v@outlook.com", phone: "+91 98123 45670", city: "Indore", totalOrders: 6, totalSpend: "₹2,140", status: "active", kyc: "pending" },
    { id: "CUST-1088", name: "Suresh Patel", email: "suresh.patel@rediff.com", phone: "+91 97654 32109", city: "Ujjain", totalOrders: 2, totalSpend: "₹680", status: "inactive", kyc: "pending" },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>OPERATIONS / CLIENTS</p>
          <h1>Customer Directory</h1>
          <span>Manage individual buyers, enterprise business clients, and customer accounts.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button secondary"
            onClick={() => toast.success("Exporting Customer database to CSV...")}
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-table-toolbar">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#0b2a62" }}>
              Total Registered: <strong>1,420 Users</strong>
            </span>
          </div>
          <div className="mini-search">
            <Search />
            <input
              placeholder="Search customer name, email, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.2fr 1.6fr 1.1fr 1fr 1fr 1fr" }}>
          <span>Customer</span>
          <span>Contact Details</span>
          <span>City</span>
          <span>Orders</span>
          <span>Lifetime Spend</span>
          <span>Status</span>
        </div>

        {filtered.map((c) => (
          <div
            key={c.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.2fr 1.6fr 1.1fr 1fr 1fr 1fr" }}
          >
            <span>
              <b>{c.name}</b>
              <small>{c.id}</small>
            </span>
            <span>
              <b>{c.email}</b>
              <small>{c.phone}</small>
            </span>
            <span>
              <b>{c.city}</b>
            </span>
            <span>
              <strong>{c.totalOrders} trips</strong>
            </span>
            <span>
              <strong style={{ color: "#1154d9" }}>{c.totalSpend}</strong>
            </span>
            <span>
              <span className={`admin-status ${c.status === "enterprise" ? "orange" : c.status === "active" ? "green" : "red"}`}>
                <i /> {c.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
