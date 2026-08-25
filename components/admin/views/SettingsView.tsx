"use client";

import { useState } from "react";
import { Key, Lock, Mail, Phone, Save, Settings, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export function SettingsView() {
  const [companyName, setCompanyName] = useState("Patel Technology Logistics Pvt. Ltd.");
  const [supportPhone, setSupportPhone] = useState("+91 1800 200 8899");
  const [supportEmail, setSupportEmail] = useState("support@pateltechnology.in");
  const [gstNumber, setGstNumber] = useState("23AABCP1234F1Z8");
  const [smsGateway, setSmsGateway] = useState("Twilio / MSG91");
  const [autoDispatch, setAutoDispatch] = useState(true);

  const handleSave = () => {
    toast.success("System & API configuration updated successfully!");
  };

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>SYSTEM / CONFIG</p>
          <h1>Platform System Settings</h1>
          <span>Configure company legal credentials, API gateways, auto-dispatch rules, and notifications.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" className="admin-button" onClick={handleSave}>
            <Save size={14} /> Save Configuration
          </button>
        </div>
      </div>

      <div className="admin-grid-two">
        {/* Company Info */}
        <div className="admin-card form-card" style={{ padding: "20px" }}>
          <div className="admin-card-heading">
            <div>
              <h2>Organization & Legal</h2>
              <p>Registered business identity & invoices</p>
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Company Legal Name
              </label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1", fontSize: "13px" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                  Support Hotline
                </label>
                <input
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                  GSTIN Number
                </label>
                <input
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1", fontSize: "13px" }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Official Support Email
              </label>
              <input
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1", fontSize: "13px" }}
              />
            </div>
          </div>
        </div>

        {/* API & Automation */}
        <div className="admin-card status-card">
          <div className="admin-card-heading">
            <div>
              <h2>Dispatch & Integrations</h2>
              <p>Automated algorithms & API keys</p>
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <b style={{ fontSize: "13px", color: "#0b2a62", display: "block" }}>AI Driver Auto-Dispatch</b>
                <small style={{ color: "#64748b" }}>Automatically match nearby online driver within 15s</small>
              </div>
              <button
                type="button"
                onClick={() => setAutoDispatch(!autoDispatch)}
                style={{
                  background: autoDispatch ? "#dcfce7" : "#fee2e2",
                  color: autoDispatch ? "#166534" : "#991b1b",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {autoDispatch ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div style={{ padding: "12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <b style={{ fontSize: "12px", color: "#0b2a62" }}>Google Maps & Routing API</b>
                <span className="admin-status green"><i /> Connected</span>
              </div>
              <small style={{ color: "#64748b" }}>Key: AIzaSyD••••••••••••••••••••</small>
            </div>

            <div style={{ padding: "12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <b style={{ fontSize: "12px", color: "#0b2a62" }}>SMS OTP Gateway (MSG91)</b>
                <span className="admin-status green"><i /> Active</span>
              </div>
              <small style={{ color: "#64748b" }}>Sender ID: PTELTC · Balance: 48,200 SMS</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
