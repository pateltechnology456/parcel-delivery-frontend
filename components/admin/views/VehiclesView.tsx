"use client";

import { useState } from "react";
import { Bike, CarFront, Download, Plus, Search, Truck } from "lucide-react";
import toast from "react-hot-toast";

export function VehiclesView() {
  const [search, setSearch] = useState("");

  const vehicles = [
    { id: "VEH-101", model: "Honda Activa 6G", type: "2-Wheeler", number: "MP-09-XX-4821", driver: "Arjun Kumar", capacity: "25 kg", rcExpiry: "12 Mar 2028", insurance: "Active", status: "active" },
    { id: "VEH-102", model: "Piaggio Ape Auto Plus", type: "3-Wheeler", number: "MP-04-EA-1920", driver: "Sunil Verma", capacity: "500 kg", rcExpiry: "24 Nov 2027", insurance: "Active", status: "active" },
    { id: "VEH-103", model: "Tata Ace Gold (Chhota Hathi)", type: "Mini Truck", number: "MP-09-TR-7721", driver: "Rajesh Solanki", capacity: "850 kg", rcExpiry: "15 Aug 2026", insurance: "Active", status: "active" },
    { id: "VEH-104", model: "Mahindra Bolero Maxi Truck", type: "Pickup 1.7T", number: "MP-09-TK-4411", driver: "Vikram Rathi", capacity: "1,500 kg", rcExpiry: "02 Feb 2027", insurance: "Expiring Soon", status: "maintenance" },
    { id: "VEH-105", model: "Hero Electric Nyx", type: "2-Wheeler (EV)", number: "MP-09-EV-8833", driver: "Mohit Jain", capacity: "30 kg", rcExpiry: "18 Jun 2029", insurance: "Active", status: "active" },
  ];

  const filtered = vehicles.filter(
    (v) =>
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.number.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>OPERATIONS / FLEET</p>
          <h1>Fleet & Vehicles</h1>
          <span>Vehicle inventory, payload capacities, driver allocations, and RC/Insurance records.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button"
            onClick={() => toast.success("Opening Add Vehicle modal...")}
          >
            <Plus size={14} /> Add New Vehicle
          </button>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-table-toolbar">
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#0b2a62" }}>
            Total Fleet Size: <strong>142 Vehicles</strong>
          </div>
          <div className="mini-search">
            <Search />
            <input
              placeholder="Search vehicle model, number, driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.3fr 1.1fr 1.1fr 1.2fr 0.9fr 1fr 0.9fr" }}>
          <span>Vehicle Model</span>
          <span>Plate Number</span>
          <span>Category</span>
          <span>Assigned Driver</span>
          <span>Payload</span>
          <span>Insurance</span>
          <span>Status</span>
        </div>

        {filtered.map((v) => (
          <div
            key={v.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.3fr 1.1fr 1.1fr 1.2fr 0.9fr 1fr 0.9fr" }}
          >
            <span>
              <b>{v.model}</b>
              <small>{v.id}</small>
            </span>
            <span>
              <b>{v.number}</b>
            </span>
            <span>
              <small style={{ fontWeight: 700, color: "#1154d9" }}>{v.type}</small>
            </span>
            <span>
              <b>{v.driver}</b>
            </span>
            <span>
              <strong>{v.capacity}</strong>
            </span>
            <span>
              <small style={{ color: v.insurance === "Active" ? "#16a34a" : "#ea580c", fontWeight: 700 }}>
                {v.insurance}
              </small>
            </span>
            <span>
              <span className={`admin-status ${v.status === "active" ? "green" : "orange"}`}>
                <i /> {v.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
