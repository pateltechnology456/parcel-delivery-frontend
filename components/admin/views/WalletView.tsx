"use client";

import { useState } from "react";
import { Check, Download, Send, WalletCards } from "lucide-react";
import toast from "react-hot-toast";

export function WalletView() {
  const [payouts, setPayouts] = useState([
    { id: "PAY-9901", driver: "Arjun Kumar", phone: "+91 98765 43210", bank: "HDFC Bank (••••4821)", amount: "₹8,420", trips: 28, status: "pending" },
    { id: "PAY-9902", driver: "Sunil Verma", phone: "+91 98234 56789", bank: "State Bank of India (••••1920)", amount: "₹6,150", trips: 19, status: "pending" },
    { id: "PAY-9903", driver: "Rajesh Solanki", phone: "+91 99887 76655", bank: "ICICI Bank (••••7721)", amount: "₹12,400", trips: 42, status: "pending" },
    { id: "PAY-9904", driver: "Mohit Jain", phone: "+91 98123 45670", bank: "Paytm Payments Bank (••••3412)", amount: "₹2,850", trips: 12, status: "completed" },
    { id: "PAY-9905", driver: "Vikram Rathi", phone: "+91 91234 56780", bank: "Axis Bank (••••4411)", amount: "₹4,600", trips: 16, status: "completed" },
  ]);

  const handleProcessSingle = (id: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "completed" } : p))
    );
    toast.success(`Payout ${id} processed successfully via IMPS Bank Transfer!`);
  };

  const handleProcessBatch = () => {
    setPayouts((prev) => prev.map((p) => ({ ...p, status: "completed" })));
    toast.success("Batch Payout: ₹26,970 transferred to all pending drivers!");
  };

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>FINANCE / PARTNER PAYOUTS</p>
          <h1>Driver Wallets & Settlements</h1>
          <span>Manage delivery partner earnings balances, bank payout queues, and batch transfers.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" className="admin-button" onClick={handleProcessBatch}>
            <Send size={14} /> Process All Pending Payouts
          </button>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.2fr 1.5fr 1.5fr 1fr 1fr 1.2fr" }}>
          <span>Payout ID</span>
          <span>Delivery Partner</span>
          <span>Registered Bank / UPI</span>
          <span>Settlement Amount</span>
          <span>Trips Done</span>
          <span>Action</span>
        </div>

        {payouts.map((p) => (
          <div
            key={p.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.2fr 1.5fr 1.5fr 1fr 1fr 1.2fr" }}
          >
            <span>
              <b>{p.id}</b>
            </span>
            <span>
              <b>{p.driver}</b>
              <small>{p.phone}</small>
            </span>
            <span>
              <b>{p.bank}</b>
            </span>
            <span>
              <strong style={{ color: "#16a34a", fontSize: "13px" }}>{p.amount}</strong>
            </span>
            <span>
              <strong>{p.trips} trips</strong>
            </span>
            <span>
              {p.status === "pending" ? (
                <button
                  type="button"
                  onClick={() => handleProcessSingle(p.id)}
                  style={{
                    background: "#1154d9",
                    color: "#ffffff",
                    border: "none",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Send size={11} /> Transfer
                </button>
              ) : (
                <span className="admin-status green">
                  <i /> Settled
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
