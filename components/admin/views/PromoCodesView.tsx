"use client";

import { useState } from "react";
import { Percent, Plus, Tag, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function PromoCodesView() {
  const [promos, setPromos] = useState([
    { code: "FIRST50", discount: "50% OFF", type: "Percentage", maxDiscount: "₹100", minOrder: "₹150", used: "842 / 1000", expiry: "31 Dec 2026", status: "active" },
    { code: "INDOREFAST", discount: "Flat ₹50 OFF", type: "Flat Cash", maxDiscount: "₹50", minOrder: "₹200", used: "312 / 500", expiry: "15 Oct 2026", status: "active" },
    { code: "ENTERPRISE20", discount: "20% Bulk OFF", type: "Percentage", maxDiscount: "₹500", minOrder: "₹1,000", used: "64 / 100", expiry: "30 Nov 2026", status: "active" },
    { code: "FESTIVE100", discount: "Flat ₹100 OFF", type: "Flat Cash", maxDiscount: "₹100", minOrder: "₹350", used: "1000 / 1000", expiry: "15 Aug 2026", status: "expired" },
  ]);

  const handleDelete = (code: string) => {
    setPromos((prev) => prev.filter((p) => p.code !== code));
    toast.success(`Promo code ${code} deleted!`);
  };

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>MARKETING / DISCOUNTS</p>
          <h1>Promo Codes & Coupons</h1>
          <span>Create and manage customer discount vouchers, referral codes, and promotional campaigns.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button"
            onClick={() => toast.success("Opening Create Coupon modal...")}
          >
            <Plus size={14} /> Create Promo Code
          </button>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.4fr 1.1fr 1fr 1fr 1fr 1fr 60px" }}>
          <span>Coupon Code</span>
          <span>Discount Value</span>
          <span>Max Cap</span>
          <span>Min Order</span>
          <span>Usage Limit</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {promos.map((p) => (
          <div
            key={p.code}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.4fr 1.1fr 1fr 1fr 1fr 1fr 60px" }}
          >
            <span>
              <b style={{ color: "#1154d9", letterSpacing: "0.05em", fontFamily: "monospace" }}>{p.code}</b>
              <small>Expires {p.expiry}</small>
            </span>
            <span>
              <strong style={{ color: "#16a34a" }}>{p.discount}</strong>
            </span>
            <span>
              <b>{p.maxDiscount}</b>
            </span>
            <span>
              <b>{p.minOrder}</b>
            </span>
            <span>
              <strong>{p.used}</strong>
            </span>
            <span>
              <span className={`admin-status ${p.status === "active" ? "green" : "red"}`}>
                <i /> {p.status}
              </span>
            </span>
            <span>
              <button
                type="button"
                onClick={() => handleDelete(p.code)}
                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
              >
                <Trash2 size={15} />
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
