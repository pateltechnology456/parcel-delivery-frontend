"use client";

import { useState } from "react";
import { Gauge, MapPin, Plus, Power, Save } from "lucide-react";
import toast from "react-hot-toast";

export function ZonesView() {
  const [zones, setZones] = useState([
    { id: "ZONE-IND-01", name: "Indore Central (AB Road, Palasia)", city: "Indore", radius: "12 km", activeDrivers: 38, surge: "1.4x", status: "active" },
    { id: "ZONE-IND-02", name: "Vijay Nagar & Super Corridor", city: "Indore", radius: "15 km", activeDrivers: 42, surge: "1.5x", status: "active" },
    { id: "ZONE-IND-03", name: "Pithampur Industrial Hub", city: "Dhar / Indore", radius: "25 km", activeDrivers: 24, surge: "1.8x", status: "active" },
    { id: "ZONE-BHP-01", name: "Bhopal MP Nagar & Arera", city: "Bhopal", radius: "14 km", activeDrivers: 28, surge: "1.2x", status: "active" },
    { id: "ZONE-DEW-01", name: "Dewas Industrial Belt", city: "Dewas", radius: "18 km", activeDrivers: 12, surge: "1.0x", status: "active" },
    { id: "ZONE-UJJ-01", name: "Ujjain Mahakal Zone", city: "Ujjain", radius: "10 km", activeDrivers: 16, surge: "1.1x", status: "active" },
  ]);

  const toggleZone = (id: string) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, status: z.status === "active" ? "inactive" : "active" } : z))
    );
    toast.success("Zone status updated!");
  };

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>NETWORK / GEOFENCING</p>
          <h1>Operational Zones & Hubs</h1>
          <span>Manage serviceable city clusters, dispatch radii, and zone-specific surge multipliers.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-button"
            onClick={() => toast.success("Opening Add City Zone modal...")}
          >
            <Plus size={14} /> Add New Zone
          </button>
        </div>
      </div>

      <div className="admin-card full-table-card">
        <div className="admin-wide-row head" style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr" }}>
          <span>Zone & Area</span>
          <span>City</span>
          <span>Coverage Radius</span>
          <span>Active Fleet</span>
          <span>Surge Multiplier</span>
          <span>Status / Action</span>
        </div>

        {zones.map((z) => (
          <div
            key={z.id}
            className="admin-wide-row"
            style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr" }}
          >
            <span>
              <b>{z.name}</b>
              <small>{z.id}</small>
            </span>
            <span>
              <b>{z.city}</b>
            </span>
            <span>
              <strong>{z.radius}</strong>
            </span>
            <span>
              <strong>{z.activeDrivers} drivers</strong>
            </span>
            <span>
              <strong style={{ color: "#ea580c" }}>{z.surge}</strong>
            </span>
            <span>
              <button
                type="button"
                onClick={() => toggleZone(z.id)}
                style={{
                  background: z.status === "active" ? "#dcfce7" : "#fee2e2",
                  color: z.status === "active" ? "#166534" : "#991b1b",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {z.status === "active" ? "Active" : "Disabled"}
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
