import { PageHeading, Button } from "../EnterpriseHome";
import Link from "next/link";
import { useState } from "react";
import { ArrowDownToLine, CheckCircle2, Route, Truck } from "lucide-react";
import { MapPreview } from "./MapPreview";
import { orders } from "../data";

export function OrderDetail({ id = "PT-2048" }: { id?: string }) {
  return (
    <>
      <PageHeading
        eyebrow={`Workspace / Orders / ${id}`}
        title={`Order ${id}`}
        description="A complete view of this shipment and its delivery progress."
        action={
          <Button href="/dashboard/track">
            Track parcel <Route />
          </Button>
        }
      />
      <div className="track-layout">
        <div className="dash-card track-card">
          <div className="track-card-heading">
            <div>
              <span className="track-status">
                <i /> In transit
              </span>
              <h2>{id}</h2>
              <p>Express delivery · Booked today at 08:12 AM</p>
            </div>
            <button className="outline-button">
              <ArrowDownToLine /> Download receipt
            </button>
          </div>
          <MapPreview />
          <div className="timeline">
            <div className="timeline-item done">
              <span>
                <CheckCircle2 />
              </span>
              <div>
                <b>Shipment picked up</b>
                <small>Indore, MP · Today, 08:12 AM</small>
              </div>
            </div>
            <div className="timeline-item done">
              <span>
                <CheckCircle2 />
              </span>
              <div>
                <b>In transit to destination</b>
                <small>On route · Today, 08:32 AM</small>
              </div>
            </div>
            <div className="timeline-item current">
              <span>
                <Truck />
              </span>
              <div>
                <b>Out for delivery</b>
                <small>Expected today by 09:14 AM</small>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-card shipment-summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Current status</span>
            <StatusBadge status="In transit" color="blue" />
          </div>
          <div className="summary-row">
            <span>From</span>
            <b>Vijay Nagar, Indore</b>
          </div>
          <div className="summary-row">
            <span>To</span>
            <b>HSR Layout, Bengaluru</b>
          </div>
          <div className="summary-row">
            <span>Recipient</span>
            <b>Rohan Mehta</b>
          </div>
          <div className="summary-row">
            <span>Package</span>
            <b>2.5 kg · Electronics</b>
          </div>
          <div className="summary-row">
            <span>Total paid</span>
            <b>₹840</b>
          </div>
        </div>
      </div>
    </>
  );
}
