"use client";

import { useState } from "react";
import { Bell, CheckCircle2, MessageSquare, Send, Users } from "lucide-react";
import toast from "react-hot-toast";

export function NotificationsView() {
  const [audience, setAudience] = useState<"all" | "drivers" | "customers">("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [history, setHistory] = useState([
    { id: "NOTIF-401", title: "Monsoon Surge Active (+1.3x)", audience: "All Delivery Partners", time: "Today, 10:00 AM", delivered: "142 Drivers", status: "sent" },
    { id: "NOTIF-400", title: "Flat 50% Off Your First Parcel!", audience: "All Customers", time: "Yesterday", delivered: "1,420 Users", status: "sent" },
    { id: "NOTIF-399", title: "System Maintenance Tonight 2 AM - 3 AM", audience: "All Users & Partners", time: "2 days ago", delivered: "1,562 Total", status: "sent" },
  ]);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Enter notification title and message body");
      return;
    }
    const newBroadcast = {
      id: `NOTIF-${Math.floor(400 + Math.random() * 500)}`,
      title,
      audience: audience === "all" ? "All Users & Partners" : audience === "drivers" ? "All Drivers" : "All Customers",
      time: "Just now",
      delivered: "Queued for 1,500+ users",
      status: "sent",
    };
    setHistory([newBroadcast, ...history]);
    setTitle("");
    setMessage("");
    toast.success("Push Notification & SMS broadcast dispatched successfully!");
  };

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>ENGAGEMENT / ALERTS</p>
          <h1>Push Notifications & Broadcasts</h1>
          <span>Send real-time alerts, operational announcements, and marketing updates to drivers and customers.</span>
        </div>
      </div>

      <div className="admin-grid-two">
        {/* Send Broadcast Form */}
        <div className="admin-card form-card" style={{ padding: "20px" }}>
          <div className="admin-card-heading">
            <div>
              <h2>Send Instant Broadcast</h2>
              <p>Dispatch real-time Push notification & SMS</p>
            </div>
          </div>

          <form onSubmit={handleSendBroadcast} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1" }}
              >
                <option value="all">Everyone (Customers + Drivers)</option>
                <option value="drivers">Delivery Partners Only</option>
                <option value="customers">Customers & Enterprise Only</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Notification Title
              </label>
              <input
                placeholder="e.g. Surge Alert: +₹50 Extra per delivery today!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Message Body
              </label>
              <textarea
                placeholder="Write your announcement message here..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1", resize: "vertical" }}
              />
            </div>

            <button type="submit" className="admin-button" style={{ justifyContent: "center", width: "100%" }}>
              <Send size={15} /> Send Broadcast Now
            </button>
          </form>
        </div>

        {/* Broadcast History */}
        <div className="admin-card status-card">
          <div className="admin-card-heading">
            <div>
              <h2>Recent Broadcast History</h2>
              <p>Sent push alerts and delivery telemetry</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            {history.map((h) => (
              <div
                key={h.id}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "#f8fafc",
                  border: "1px solid #edf2f7",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <b style={{ fontSize: "12.5px", color: "#0b2a62" }}>{h.title}</b>
                  <span className="admin-status green">
                    <i /> {h.status}
                  </span>
                </div>
                <small style={{ color: "#64748b", display: "block", marginTop: "4px" }}>
                  {h.audience} · {h.delivered} · {h.time}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
