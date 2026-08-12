import { PageHeading, Button } from "../EnterpriseHome";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "../EnterpriseHome";
import { orders } from "../data";

export function OrderTable() {
  return (
    <div className="dash-card orders-card">
      <div className="card-heading">
        <div>
          <h2>Recent orders</h2>
          <p>Your latest shipments at a glance.</p>
        </div>
        <Link href="/dashboard/orders">
          View all <ArrowRight />
        </Link>
      </div>
      <div className="order-table">
        <div className="order-row order-head">
          <span>Order ID</span>
          <span>Destination</span>
          <span>Booked on</span>
          <span>Status</span>
          <span>Amount</span>
        </div>
        {orders.map((order) => (
          <Link
            href={`/dashboard/orders/${order.id}`}
            className="order-row"
            key={order.id}
          >
            <span>
              <b>{order.id}</b>
              <small>{order.type}</small>
            </span>
            <span>{order.destination}</span>
            <span>{order.date}</span>
            <StatusBadge status={order.status} color={order.color} />
            <span className="amount">{order.amount}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
