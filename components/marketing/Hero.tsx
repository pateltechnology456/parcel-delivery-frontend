"use client";

import { useState } from "react";
import { Play, MapPin, Search } from "lucide-react";
import { Button } from "../navbar";
import { EstimateForm } from "../estimate-form";

export function Hero() {
  const [tracking, setTracking] = useState("");
  const [message, setMessage] = useState("");
  function track() {
    setMessage(
      tracking.trim()
        ? `Tracking ${tracking.trim()} — your shipment is on the way.`
        : "Enter a tracking ID to get started.",
    );
  }
  return (
    <section className="hero section-grid" id="top">
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> Logistics, elevated{" "}
            <span className="eyebrow-line" />
          </div>
          <h1>
            Move what <em>matters.</em>
            <br />
            Move it <span>better.</span>
          </h1>
          <p className="hero-lede">
            Technology-led delivery solutions for businesses that refuse to
            compromise on speed, visibility, or care.
          </p>
          <div className="hero-actions">
            <Button href="#contact">Ship with confidence</Button>
            <a className="watch-link" href="#how-it-works">
              <span className="play-icon">
                <Play size={13} fill="currentColor" />
              </span>{" "}
              See how it works
            </a>
          </div>
          <div className="trust-row">
            <div className="avatar-stack">
              <span>AK</span>
              <span>RS</span>
              <span>PM</span>
              <span>+7k</span>
            </div>
            <div>
              <div className="stars">★★★★★</div>
              <p>Trusted by 7,000+ businesses</p>
            </div>
          </div>
        </div>
        <div
          className="hero-visual"
          aria-label="Live delivery dashboard preview"
        >
          <div className="dashboard-window">
            <div className="window-bar">
              <span className="traffic">
                <i />
                <i />
                <i />
              </span>
              <span className="window-title">
                <span className="live-dot" /> Live operations
              </span>
              <span className="window-time">08:42 AM · IN</span>
            </div>
            <div className="dashboard-body">
              <div className="map-panel">
                <div className="map-label label-one">
                  <MapPin size={12} /> Vijay Nagar <b>08:58</b>
                </div>
                <div className="map-label label-two">
                  <MapPin size={12} /> Rau <b>09:15</b>
                </div>
                <svg
                  className="route-path"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10,20 C40,10 60,80 90,90"
                    fill="none"
                    stroke="#1d6bff"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  <circle cx="90" cy="90" r="4" fill="#0057FF" />
                </svg>
              </div>
              <div className="status-panel">
                <div className="status-card">
                  <b>Shipment #PT-802</b>
                  <span>En route to fulfillment center</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "65%" }} />
                  </div>
                </div>
                <div className="status-card">
                  <b>Shipment #PT-914</b>
                  <span>Arrived at destination</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="track-box">
            <div className="track-input-wrap">
              <Search className="track-icon" size={18} />
              <input
                type="text"
                placeholder="Enter tracking ID (e.g. PT-802)"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
              />
              <button onClick={track} className="track-btn">
                Track
              </button>
            </div>
            {message && <div className="track-msg">{message}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
