"use client";

import { useState } from "react";
import { Boxes, Edit, Plus, Save } from "lucide-react";
import toast from "react-hot-toast";

export function CmsView() {
  const [heroHeading, setHeroHeading] = useState("Move what matters. Move it better.");
  const [heroSub, setHeroSub] = useState("Technology-powered parcel delivery for businesses & individuals. Real-time GPS tracking, verified OTP security, and lightning-fast dispatch across India.");
  const [announcement, setAnnouncement] = useState("⚡ Monsoon Express Delivery Active: Zero delay guarantee across Indore, Bhopal & Dewas!");
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);

  const handleSave = () => {
    toast.success("Marketing CMS content & announcements updated successfully!");
  };

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>SYSTEM / CONTENT</p>
          <h1>Content Management System (CMS)</h1>
          <span>Manage website marketing copy, top announcement ticker, Hero section content, and FAQs.</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" className="admin-button" onClick={handleSave}>
            <Save size={14} /> Publish Changes
          </button>
        </div>
      </div>

      <div className="admin-grid-two">
        <div className="admin-card form-card" style={{ padding: "20px" }}>
          <div className="admin-card-heading">
            <div>
              <h2>Hero Section & Taglines</h2>
              <p>Main landing page copy</p>
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Primary Hero Title
              </label>
              <input
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Hero Subtitle Description
              </label>
              <textarea
                value={heroSub}
                rows={3}
                onChange={(e) => setHeroSub(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1", fontSize: "13px", resize: "vertical" }}
              />
            </div>
          </div>
        </div>

        <div className="admin-card status-card">
          <div className="admin-card-heading">
            <div>
              <h2>Announcement Ticker Bar</h2>
              <p>Top banner shown on main website</p>
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#0b2a62" }}>Show Announcement Banner</span>
              <button
                type="button"
                onClick={() => setAnnouncementEnabled(!announcementEnabled)}
                style={{
                  background: announcementEnabled ? "#dcfce7" : "#fee2e2",
                  color: announcementEnabled ? "#166534" : "#991b1b",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {announcementEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>
                Announcement Text
              </label>
              <textarea
                value={announcement}
                rows={3}
                onChange={(e) => setAnnouncement(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #dfe7f1", fontSize: "13px", resize: "vertical" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
