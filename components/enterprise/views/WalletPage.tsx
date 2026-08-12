import { Plus } from "lucide-react";
import { PageHeading, Button } from "../EnterpriseHome";

export function WalletPage() {
  return (
    <>
      <PageHeading eyebrow="Workspace / Wallet" title="Wallet & Payments" description="Manage balance, payments, and billing history." action={<Button variant="primary"><Plus /> Add Funds</Button>} />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '14px', color: '#8a99ac', fontWeight: 400, margin: 0 }}>Available Balance</h2>
            <strong style={{ display: 'block', fontSize: '32px', color: '#0b2a62', marginTop: '4px' }}>₹24,680</strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', color: '#2eaf6b', fontSize: '12px', fontWeight: 600 }}>+₹12,400 this month</span>
          </div>
        </div>
        <div className="form-section">
          <h2>Recent Transactions</h2>
          <div style={{ marginTop: '16px', borderTop: '1px solid #dfe7f1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dfe7f1', fontSize: '12px' }}>
              <div>
                <b style={{ color: '#0b2a62' }}>Added Funds</b>
                <span style={{ display: 'block', color: '#8a99ac', marginTop: '2px' }}>Today, 10:45 AM</span>
              </div>
              <b style={{ color: '#2eaf6b' }}>+₹5,000</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dfe7f1', fontSize: '12px' }}>
              <div>
                <b style={{ color: '#0b2a62' }}>Order PT-2048</b>
                <span style={{ display: 'block', color: '#8a99ac', marginTop: '2px' }}>Yesterday, 09:14 AM</span>
              </div>
              <b style={{ color: '#0b2a62' }}>-₹840</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '12px' }}>
              <div>
                <b style={{ color: '#0b2a62' }}>Order PT-2047</b>
                <span style={{ display: 'block', color: '#8a99ac', marginTop: '2px' }}>10 Aug, 04:32 PM</span>
              </div>
              <b style={{ color: '#0b2a62' }}>-₹1,240</b>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
