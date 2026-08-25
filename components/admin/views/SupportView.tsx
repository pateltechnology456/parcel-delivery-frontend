"use client";

import { useState } from "react";
import { CheckCircle2, Headphones, MessageSquare, Phone, Search } from "lucide-react";
import toast from "react-hot-toast";

export function SupportView() {
  const [tab, setTab] = useState<"all" | "open" | "resolved">("all");
  const [tickets, setTickets] = useState([
    { id: "TCK-401", user: "Rohan Mehta", type: "Customer", issue: "Driver not moving on live map", orderId: "PT-2841", priority: "High", time: "8 mins ago", status: "open" },
    { id: "TCK-400", user: "Sunil Verma", type: "Driver", issue: "Customer phone unreachable at dropoff", orderId: "PT-2840", priority: "Medium", time: "25 mins ago", status: "open" },
    { id: "TCK-399", user: "Acme Logistics", type: "Enterprise", issue: "Need consolidated GST Invoice for May", orderId: "-", priority: "Low", time: "1 hr ago", status: "resolved" },
    { id: "TCK-398", user: "Pooja Verma", type: "Customer", issue: "Refund for cancelled booking", orderId: "PT-2836", priority: "High", time: "3 hrs ago", status: "resolved" },
  ]);

  const handleResolve = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "resolved" } : t))
    );
    toast.success(`Ticket ${id} marked as Resolved!`);
  };

  const filtered = tickets.filter((t) => (tab === "all" ? true : t.status === tab));

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>SYSTEM / HELPDESK</p>
          <h1>Support & Helpdesk Tickets</h1>
          <span>Manage live customer inquiries, delivery partner issue escalations, and dispute resolution.</span>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-table-toolbar">
          <div className="admin-tabs">
            {(["all", "open", "resolved"] as const).map((t) => (
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
        </div>

        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.1fr 1.3fr 1.8fr 1fr 1fr 1fr 1.1fr" }}>
          <span>Ticket ID</span>
          <span>Requester</span>
          <span>Issue Summary</span>
          <span>Order Ref</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filtered.map((t) => (
          <div
            key={t.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.1fr 1.3fr 1.8fr 1fr 1fr 1fr 1.1fr" }}
          >
            <span>
              <b>{t.id}</b>
              <small>{t.time}</small>
            </span>
            <span>
              <b>{t.user}</b>
              <small style={{ color: "#1154d9", fontWeight: 700 }}>{t.type}</small>
            </span>
            <span>
              <b>{t.issue}</b>
            </span>
            <span>
              <small>{t.orderId}</small>
            </span>
            <span>
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 800,
                  color: t.priority === "High" ? "#dc2626" : t.priority === "Medium" ? "#d97706" : "#16a34a",
                  background: t.priority === "High" ? "#fee2e2" : t.priority === "Medium" ? "#fef3c7" : "#dcfce7",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {t.priority}
              </span>
            </span>
            <span>
              <span className={`admin-status ${t.status === "resolved" ? "green" : "orange"}`}>
                <i /> {t.status}
              </span>
            </span>
            <span>
              {t.status === "open" ? (
                <button
                  type="button"
                  onClick={() => handleResolve(t.id)}
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
                  Resolve
                </button>
              ) : (
                <small style={{ color: "#16a34a", fontWeight: 700 }}>Closed</small>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
