import { PageHeading, Button, StatCard } from "../EnterpriseHome";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Package, Plus, Route, Truck, Wallet, Zap } from "lucide-react";
import { OrderTable } from "./OrderTable";
import { orders } from "../data";

export function Overview() {
  return (
    <>
      <PageHeading
        eyebrow="Tuesday, 12 August 2025"
        title="Good morning, Ankit"
        description="Here’s what’s moving across your business today."
        action={
          <Button href="/dashboard/book">
            <Plus /> New shipment
          </Button>
        }
      />
      <div className="stat-grid">
        <StatCard
          icon={Package}
          label="Total shipments"
          value="1,284"
          change="+18.4% this month"
        />
        <StatCard
          icon={Truck}
          label="In transit"
          value="472"
          change="+8.2% from yesterday"
          tone="orange"
        />
        <StatCard
          icon={CheckCircle2}
          label="Delivered"
          value="798"
          change="+12.6% this month"
          tone="green"
        />
        <StatCard
          icon={Wallet}
          label="Wallet balance"
          value="₹24,680"
          change="+₹12,400 this month"
          tone="purple"
        />
      </div>
      <div className="dash-grid-two">
       
        <div className="dash-card quick-card">
          <div className="card-heading">
            <div>
              <h2>Quick actions</h2>
              <p>Common things, one click away.</p>
            </div>
            <Zap />
          </div>
          <div className="quick-actions">
            <Link href="/dashboard/book">
              <span className="quick-icon blue">
                <Plus />
              </span>
              <span>
                <b>Book a delivery</b>
                <small>Create a new shipment</small>
              </span>
              <ArrowRight />
            </Link>
            <Link href="/dashboard/track">
              <span className="quick-icon orange">
                <Route />
              </span>
              <span>
                <b>Track a parcel</b>
                <small>Find your shipment</small>
              </span>
              <ArrowRight />
            </Link>
            <Link href="/dashboard/wallet">
              <span className="quick-icon green">
                <Wallet />
              </span>
              <span>
                <b>Add wallet balance</b>
                <small>Top up your account</small>
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
      <OrderTable />
    </>
  );
}
