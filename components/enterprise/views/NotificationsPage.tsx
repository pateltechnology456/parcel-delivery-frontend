import { Package, Truck } from "lucide-react";
import { PageHeading, Button } from "../EnterpriseHome";

export function NotificationsPage() {
  return (
    <>
      <PageHeading eyebrow="Workspace / Notifications" title="Notifications" description="Stay ahead of every delivery update." action={<Button variant="secondary">Mark all as read</Button>} />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', padding: '12px', background: '#f5f8fc', borderRadius: '8px', borderLeft: '3px solid #1154d9' }}>
            <span style={{ color: '#1154d9', marginTop: '2px' }}><Package size={16} /></span>
            <div>
              <b style={{ color: '#0b2a62', fontSize: '12px', display: 'block' }}>Shipment Delivered</b>
              <p style={{ margin: '4px 0 0', color: '#4b5b72', fontSize: '11px' }}>Your shipment PT-2047 has been delivered successfully.</p>
              <span style={{ color: '#8a99ac', fontSize: '10px', marginTop: '6px', display: 'block' }}>2 hours ago</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '8px', border: '1px solid #dfe7f1' }}>
            <span style={{ color: '#ff6b2c', marginTop: '2px' }}><Truck size={16} /></span>
            <div>
              <b style={{ color: '#0b2a62', fontSize: '12px', display: 'block' }}>Out for Delivery</b>
              <p style={{ margin: '4px 0 0', color: '#4b5b72', fontSize: '11px' }}>Your shipment PT-2048 is out for delivery.</p>
              <span style={{ color: '#8a99ac', fontSize: '10px', marginTop: '6px', display: 'block' }}>5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
