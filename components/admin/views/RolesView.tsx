"use client";

import { useState } from "react";
import { Check, Plus, Shield, ShieldCheck, Users } from "lucide-react";
import toast from "react-hot-toast";

export function RolesView() {
  const roles = [
    { id: "ROLE-01", name: "Super Administrator", usersCount: 2, access: "All Permissions (Full System Root Control)", color: "purple" },
    { id: "ROLE-02", name: "Operations & Dispatch Manager", usersCount: 6, access: "Orders, Driver Allocations, Geofenced Zones, Fleet", color: "blue" },
    { id: "ROLE-03", name: "Finance & Accounts Auditor", usersCount: 3, access: "Payments, Partner Wallets, Payout Batch, GST Invoicing", color: "green" },
    { id: "ROLE-04", name: "Customer Support Executive", usersCount: 12, access: "Tickets Helpdesk, Order Tracking Read-only, Customer Profiles", color: "orange" },
  ];

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>SYSTEM / SECURITY</p>
          <h1>Roles & Permissions</h1>
          <span>Manage team administrative access, role-based security clearance, and employee access controls.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button"
            onClick={() => toast.success("Opening Create Role modal...")}
          >
            <Plus size={14} /> Add New Role
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {roles.map((r) => (
          <div key={r.id} className="admin-card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className={`admin-stat-icon ${r.color}`} style={{ width: "36px", height: "36px" }}>
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <b style={{ fontSize: "14px", color: "#0b2a62" }}>{r.name}</b>
                  <small style={{ color: "#64748b", display: "block" }}>{r.usersCount} Active Staff Members</small>
                </div>
              </div>
              <span className="admin-status green"><i /> Active</span>
            </div>

            <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", border: "1px solid #edf2f7", fontSize: "12px", color: "#475569", marginBottom: "14px" }}>
              <strong>Scope:</strong> {r.access}
            </div>

            <button
              type="button"
              className="admin-button secondary"
              onClick={() => toast.success(`Configuring permissions for ${r.name}...`)}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Edit Permissions
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
