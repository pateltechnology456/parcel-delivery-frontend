"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Filter,
  MoreVertical,
  Package,
  Plus,
  RefreshCw,
  Search,
  Truck,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

export function OrdersView() {
  const [tab, setTab] = useState<"all" | "in_transit" | "delivered" | "pending" | "cancelled">("all");
  const [search, setSearch] = useState("");

  const orders = [
    { id: "PT-2841", customer: "Rohan Mehta", phone: "9876543210", from: "Vijay Nagar, Indore", to: "Palasia Square, Indore", driver: "Arjun Kumar (Bike)", fare: "₹280", status: "in_transit", time: "10 mins ago" },
    { id: "PT-2840", customer: "Kavita Sharma", phone: "9823456789", from: "MP Nagar, Bhopal", to: "Arera Colony, Bhopal", driver: "Sunil Verma (Tempo)", fare: "₹480", status: "delivered", time: "42 mins ago" },
    { id: "PT-2839", customer: "Acme Logistics", phone: "9988776655", from: "Pithampur Sec 3", to: "Dewas Industrial Gate", driver: "Rajesh Solanki (Truck)", fare: "₹1,850", status: "in_transit", time: "1 hr ago" },
    { id: "PT-2838", customer: "Pooja Verma", phone: "9812345670", from: "Indore Airport", to: "Scheme 78, Indore", driver: "Mohit Jain (Bike)", fare: "₹220", status: "delivered", time: "2 hrs ago" },
    { id: "PT-2837", customer: "Deepak Joshi", phone: "9765432109", from: "Annapurna Road", to: "Chhavani, Indore", driver: "Unassigned", fare: "₹340", status: "pending", time: "3 mins ago" },
    { id: "PT-2836", customer: "Ravi Teja", phone: "9123456780", from: "Rajwada, Indore", to: "Rau, Indore", driver: "Vikram Singh (Tempo)", fare: "₹520", status: "cancelled", time: "4 hrs ago" },
  ];

  const filtered = orders.filter((o) => {
    if (tab !== "all" && o.status !== tab) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.from.toLowerCase().includes(q) ||
        o.to.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>OPERATIONS / DISPATCH</p>
          <h1>Orders Management</h1>
          <span>Manage live delivery orders, driver allocations, and tracking statuses.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button secondary"
            onClick={() => toast.success("Exporting Orders report to CSV...")}
          >
            <Download size={14} /> Export CSV
          </button>
          <Link href="/admin/orders/new" className="admin-button">
            <Plus size={14} /> Create Manual Order
          </Link>
        </div>
      </div>

      <div className="admin-card full-table-card">
        {/* Table Toolbar */}
        <div className="admin-table-toolbar">
          <div className="admin-tabs">
            {(["all", "in_transit", "delivered", "pending", "cancelled"] as const).map((t) => (
              <button
                key={t}
                className={tab === t ? "active" : ""}
                onClick={() => setTab(t)}
                style={{ textTransform: "capitalize" }}
              >
                {t.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="admin-table-actions">
            <div className="mini-search">
              <Search />
              <input
                placeholder="Search order ID, customer, route..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.1fr 1.2fr 1.6fr 1.2fr 0.9fr 1.1fr 60px" }}>
          <span>Order ID</span>
          <span>Customer</span>
          <span>Pickup ➔ Drop</span>
          <span>Assigned Driver</span>
          <span>Fare</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filtered.map((o) => (
          <div
            key={o.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.1fr 1.2fr 1.6fr 1.2fr 0.9fr 1.1fr 60px" }}
          >
            <span>
              <b>{o.id}</b>
              <small>{o.time}</small>
            </span>
            <span>
              <b>{o.customer}</b>
              <small>{o.phone}</small>
            </span>
            <span>
              <b>{o.from}</b>
              <small>➔ {o.to}</small>
            </span>
            <span>
              <b style={{ color: o.driver === "Unassigned" ? "#ea580c" : "#0f172a" }}>{o.driver}</b>
            </span>
            <span>
              <strong>{o.fare}</strong>
            </span>
            <span>
              <span
                className={`admin-status ${
                  o.status === "delivered" ? "green" : o.status === "in_transit" ? "orange" : o.status === "cancelled" ? "red" : "blue"
                }`}
              >
                <i /> {o.status.replace("_", " ")}
              </span>
            </span>
            <span>
              <Link
                href={`/admin/orders/${o.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "#edf3ff",
                  color: "#1154d9",
                }}
              >
                <Eye size={14} />
              </Link>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
