"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Printer } from "lucide-react";
import toast from "react-hot-toast";

export function ReportsView() {
  const reports = [
    { title: "Monthly Gross Revenue & Commission Report", period: "June 2024", format: "PDF / CSV", size: "2.4 MB", desc: "Total orders GMV, platform fees earned, driver payouts, and net profit." },
    { title: "GST & Tax Invoicing Summary (18% Slab)", period: "Q2 2024 (Apr - Jun)", format: "PDF / Excel", size: "4.1 MB", desc: "B2B input tax credit statements and customer tax invoices." },
    { title: "Driver Payout & Incentive Audit Trail", period: "June 2024", format: "CSV", size: "1.8 MB", desc: "Itemized driver trip payouts, bank settlement UTR numbers, and bonuses." },
    { title: "Delivery Turnaround Time & SLA Performance", period: "Last 30 Days", format: "PDF", size: "3.2 MB", desc: "Average pickup time, transit delays, and cancelled order root cause analysis." },
  ];

  const handleDownload = (title: string) => {
    toast.success(`Generating and downloading: ${title}`);
  };

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>ENGAGEMENT / AUDIT</p>
          <h1>Reports & Data Exports</h1>
          <span>Download monthly financial audit reports, GST tax filings, driver payout statements, and SLA metrics.</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {reports.map((r) => (
          <div key={r.title} className="admin-card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#edf3ff", color: "#1154d9", display: "grid", placeItems: "center" }}>
                  <FileSpreadsheet size={20} />
                </span>
                <div>
                  <b style={{ fontSize: "14px", color: "#0b2a62" }}>{r.title}</b>
                  <small style={{ color: "#64748b", display: "block" }}>{r.period} · {r.format} ({r.size})</small>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5", margin: "12px 0 16px" }}>
                {r.desc}
              </p>
            </div>

            <button
              type="button"
              className="admin-button secondary"
              onClick={() => handleDownload(r.title)}
              style={{ justifyContent: "center", width: "100%" }}
            >
              <Download size={14} /> Download Report
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
