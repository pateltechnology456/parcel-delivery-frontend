"use client";

import { BarChart3, Clock, Flame, TrendingUp, Users } from "lucide-react";

export function AnalyticsView() {
  const bars = [42, 68, 55, 84, 95, 110, 88];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <div className="admin-heading">
        <div>
          <p>ENGAGEMENT / INTELLIGENCE</p>
          <h1>Platform Analytics & BI</h1>
          <span>Growth trends, dispatch volume by day, delivery completion velocity, and customer cohort retention.</span>
        </div>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat">
          <div className="admin-stat-icon green"><TrendingUp /></div>
          <div>
            <p>Weekly GMV Growth</p>
            <strong>+24.8%</strong>
            <small>vs previous week</small>
          </div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-icon blue"><Clock /></div>
          <div>
            <p>Avg Dispatch Time</p>
            <strong>14.2 Mins</strong>
            <small>Pickup to transit</small>
          </div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-icon orange"><Flame /></div>
          <div>
            <p>Peak Order Window</p>
            <strong>11 AM - 3 PM</strong>
            <small>68% daily volume</small>
          </div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-icon purple"><Users /></div>
          <div>
            <p>Customer Retention</p>
            <strong>82.4%</strong>
            <small>Repeat monthly orders</small>
          </div>
        </div>
      </div>

      <div className="admin-grid-two">
        <div className="admin-card admin-chart-card">
          <div className="admin-card-heading">
            <div>
              <h2>Daily Order Volume Velocity</h2>
              <p>Completed shipments across the last 7 days</p>
            </div>
          </div>

          <div className="admin-chart">
            <div className="admin-bars" style={{ height: "180px" }}>
              {bars.map((h, i) => (
                <div className="admin-bar-col" key={days[i]}>
                  <i style={{ height: `${h}%` }} />
                  <span>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-card performance-card">
          <div className="admin-card-heading">
            <div>
              <h2>Order Fulfillment Quality</h2>
              <p>SLA on-time vs delayed metrics</p>
            </div>
          </div>

          <div className="performance-donut">
            <div>
              <strong>98.4%</strong>
              <small>On-Time SLA</small>
            </div>
          </div>

          <div className="performance-legend">
            <span><i className="green" /> On-Time (Under 45m) <b>98.4%</b></span>
            <span><i className="orange" /> Slight Delay (45-60m) <b>1.2%</b></span>
            <span><i className="red" /> Exception / Cancelled <b>0.4%</b></span>
          </div>
        </div>
      </div>
    </>
  );
}
