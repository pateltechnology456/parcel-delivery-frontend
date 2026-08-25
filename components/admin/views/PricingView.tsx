"use client";

import { useState } from "react";
import { CircleDollarSign, Edit, Save, Zap } from "lucide-react";
import toast from "react-hot-toast";

export function PricingView() {
  const [rates, setRates] = useState([
    { id: "2w", vehicle: "2-Wheeler (Bike)", baseKm: 2, baseFare: 40, perKm: 12, minFare: 50, commission: 15 },
    { id: "3w", vehicle: "3-Wheeler (Tempo)", baseKm: 3, baseFare: 120, perKm: 22, minFare: 150, commission: 18 },
    { id: "truck_mini", vehicle: "Mini Truck (Tata Ace)", baseKm: 4, baseFare: 350, perKm: 32, minFare: 400, commission: 20 },
    { id: "truck_large", vehicle: "Pickup (Bolero 1.7T)", baseKm: 5, baseFare: 600, perKm: 45, minFare: 700, commission: 20 },
  ]);

  const [globalSurge, setGlobalSurge] = useState("1.0");

  const handleSave = () => {
    toast.success("Pricing slabs & surge rules updated across all city hubs!");
  };

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>NETWORK / REVENUE</p>
          <h1>Pricing & Fare Matrix</h1>
          <span>Configure vehicle base fares, distance per-km rates, partner commission cuts, and surge multipliers.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" className="admin-button" onClick={handleSave}>
            <Save size={14} /> Save Pricing Changes
          </button>
        </div>
      </div>

      <div className="admin-grid-two">
        {/* Slabs */}
        <div className="admin-card full-table-card">
          <div className="admin-card-heading" style={{ padding: "16px 20px" }}>
            <div>
              <h2>Vehicle Rate Slabs</h2>
              <p>Base fares and distance charging brackets</p>
            </div>
          </div>

          <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr" }}>
            <span>Vehicle Slab</span>
            <span>Base Fare (₹)</span>
            <span>Per Km (₹)</span>
            <span>Min Charge (₹)</span>
            <span>Platform Fee (%)</span>
          </div>

          {rates.map((r, idx) => (
            <div
              key={r.id}
              className="admin-wide-row"
              style={{ gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr" }}
            >
              <span>
                <b>{r.vehicle}</b>
                <small>Includes first {r.baseKm} km</small>
              </span>
              <span>
                <input
                  type="number"
                  defaultValue={r.baseFare}
                  style={{ width: "70px", padding: "4px 8px", border: "1px solid #dfe7f1", borderRadius: "6px" }}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setRates((prev) => prev.map((x, i) => (i === idx ? { ...x, baseFare: val } : x)));
                  }}
                />
              </span>
              <span>
                <input
                  type="number"
                  defaultValue={r.perKm}
                  style={{ width: "70px", padding: "4px 8px", border: "1px solid #dfe7f1", borderRadius: "6px" }}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setRates((prev) => prev.map((x, i) => (i === idx ? { ...x, perKm: val } : x)));
                  }}
                />
              </span>
              <span>
                <b>₹{r.minFare}</b>
              </span>
              <span>
                <strong style={{ color: "#1154d9" }}>{r.commission}%</strong>
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Surge & Peak Hours */}
        <div className="admin-card status-card">
          <div className="admin-card-heading">
            <div>
              <h2>Peak Hour & Surge Multiplier</h2>
              <p>Dynamic multiplier applied during high order volume</p>
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Global Surge Multiplier: <strong style={{ color: "#ea580c" }}>{globalSurge}x</strong>
              </label>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={globalSurge}
                onChange={(e) => setGlobalSurge(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <b style={{ fontSize: "12.5px", color: "#0b2a62", display: "block" }}>Night Surcharge (10 PM - 6 AM)</b>
              <small style={{ color: "#64748b" }}>Flat +₹50 applied to all vehicle types</small>
            </div>

            <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <b style={{ fontSize: "12.5px", color: "#0b2a62", display: "block" }}>Rain & Weather Surcharge</b>
              <small style={{ color: "#64748b" }}>Automatic +1.3x multiplier during monsoon precipitation</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
