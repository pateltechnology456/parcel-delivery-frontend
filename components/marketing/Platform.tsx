"use client";

import { BarChart3, Bell, Code2 } from "lucide-react";
import { Button } from "../navbar";
import { DeliveryAnimation } from "../delivery-animation";

export function Platform() {
  return (
    <section className="section platform-section">
      <div className="container platform-layout">
        <div className="platform-copy">
          <div className="eyebrow blue-eyebrow">Your command center</div>
          <h2>
            Everything you need.
            <br />
            <em>Nothing you don&apos;t.</em>
          </h2>
          <p>
            See every order, route, and delivery in one beautifully simple
            dashboard. Built for humans, powerful enough for scale.
          </p>
          <div className="platform-list">
            <span>
              <BarChart3 size={18} />
              <b>Know what&apos;s happening</b>
              <small>Live performance analytics</small>
            </span>
            <span>
              <Bell size={18} />
              <b>Stay ahead of issues</b>
              <small>Proactive delay notifications</small>
            </span>
            <span>
              <Code2 size={18} />
              <b>Connect your stack</b>
              <small>Simple, flexible API access</small>
            </span>
          </div>
          <Button href="#contact">Explore the platform</Button>
        </div>
        <div className="platform-preview">
          <DeliveryAnimation />
        </div>
      </div>
    </section>
  );
}
