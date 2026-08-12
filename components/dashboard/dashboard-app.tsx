"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { CustomerHome } from "../customer/CustomerHome";
import { EnterpriseHome } from "../enterprise/EnterpriseHome";

export default function DashboardApp({
  section,
  orderId,
}: {
  section?: string;
  orderId?: string;
}) {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f8fc' }}>
        <div className="loader"></div>
      </div>
    );
  }

  if (user?.accountType === "enterprise") {
    return <EnterpriseHome section={section} orderId={orderId} />;
  }

  return <CustomerHome section={section} orderId={orderId} />;
}
