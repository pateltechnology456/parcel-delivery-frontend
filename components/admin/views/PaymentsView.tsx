"use client";

import { useState } from "react";
import { Download, Receipt, RefreshCw, Search } from "lucide-react";
import toast from "react-hot-toast";

export function PaymentsView() {
  const [search, setSearch] = useState("");

  const txns = [
    { id: "TXN-884920", orderId: "PT-2841", customer: "Rohan Mehta", method: "UPI (Google Pay)", gross: "₹280", gatewayFee: "₹5.60", net: "₹274.40", date: "Today, 10:45 AM", status: "success" },
    { id: "TXN-884919", orderId: "PT-2840", customer: "Kavita Sharma", method: "Credit Card (Visa)", gross: "₹480", gatewayFee: "₹9.60", net: "₹470.40", date: "Today, 10:12 AM", status: "success" },
    { id: "TXN-884918", orderId: "PT-2839", customer: "Acme Logistics", method: "Enterprise Credit", gross: "₹1,850", gatewayFee: "₹0.00", net: "₹1,850.00", date: "Today, 09:30 AM", status: "settled" },
    { id: "TXN-884917", orderId: "PT-2836", customer: "Ravi Teja", method: "UPI (PhonePe)", gross: "₹520", gatewayFee: "₹0.00", net: "₹520.00", date: "Today, 08:15 AM", status: "refunded" },
    { id: "TXN-884916", orderId: "PT-2835", customer: "Suresh Patel", method: "Net Banking (HDFC)", gross: "₹380", gatewayFee: "₹7.60", net: "₹372.40", date: "Yesterday", status: "success" },
  ];

  const filtered = txns.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.orderId.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>FINANCE / TRANSACTIONS</p>
          <h1>Payments & Settlements</h1>
          <span>Live payment gateway logs, customer transaction receipts, fee breakdowns, and refund logs.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button secondary"
            onClick={() => toast.success("Exporting financial transactions to CSV...")}
          >
            <Download size={14} /> Export Financial Ledger
          </button>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-table-toolbar">
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#0b2a62" }}>
            Total Processed Today: <strong>₹1,42,850</strong>
          </div>
          <div className="mini-search">
            <Search />
            <input
              placeholder="Search TXN ID, Order ID, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.2fr 1fr 1.2fr 1.3fr 0.9fr 0.9fr 1fr" }}>
          <span>Transaction ID</span>
          <span>Order ID</span>
          <span>Customer</span>
          <span>Payment Gateway</span>
          <span>Gross</span>
          <span>Net</span>
          <span>Status</span>
        </div>

        {filtered.map((t) => (
          <div
            key={t.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.2fr 1fr 1.2fr 1.3fr 0.9fr 0.9fr 1fr" }}
          >
            <span>
              <b>{t.id}</b>
              <small>{t.date}</small>
            </span>
            <span>
              <b>{t.orderId}</b>
            </span>
            <span>
              <b>{t.customer}</b>
            </span>
            <span>
              <small style={{ fontWeight: 700, color: "#1154d9" }}>{t.method}</small>
            </span>
            <span>
              <strong>{t.gross}</strong>
            </span>
            <span>
              <strong style={{ color: "#16a34a" }}>{t.net}</strong>
            </span>
            <span>
              <span className={`admin-status ${t.status === "success" || t.status === "settled" ? "green" : "red"}`}>
                <i /> {t.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
