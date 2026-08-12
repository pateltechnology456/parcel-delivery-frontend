import { PageHeading, Button } from "../EnterpriseHome";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowDownToLine, Plus } from "lucide-react";
import { OrderTable } from "./OrderTable";
import { orders } from "../data";

export function Orders() {
  const [filter, setFilter] = useState("All orders");
  return (
    <>
      <PageHeading
        eyebrow="Workspace / Orders"
        title="My orders"
        description="Manage and monitor every shipment from one place."
        action={
          <Button href="/dashboard/book">
            <Plus /> New shipment
          </Button>
        }
      />
      <div className="filter-bar">
        <div className="filter-tabs">
          {["All orders", "In transit", "Delivered", "Cancelled"].map(
            (item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
                {item === "All orders" && <span>12</span>}
              </button>
            ),
          )}
        </div>
        <button className="outline-button">
          <ArrowDownToLine /> Export
        </button>
      </div>
      <OrderTable />
    </>
  );
}
