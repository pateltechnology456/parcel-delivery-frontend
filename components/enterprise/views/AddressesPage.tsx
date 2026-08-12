import { Plus, MapPin } from "lucide-react";
import { PageHeading, Button } from "../EnterpriseHome";

export function AddressesPage() {
  return (
    <>
      <PageHeading eyebrow="Workspace / Addresses" title="Saved Addresses" description="Keep your pickup and delivery locations close." action={<Button variant="primary"><Plus /> Add Address</Button>} />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          
          <div style={{ border: '1px solid #dfe7f1', borderRadius: '8px', padding: '16px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#e7efff', color: '#1154d9', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>DEFAULT</span>
            <b style={{ color: '#0b2a62', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color="#ff6b2c" /> Warehouse (Indore)</b>
            <p style={{ margin: '8px 0 0', color: '#4b5b72', fontSize: '11px', lineHeight: '1.5' }}>123 Logistics Park, Vijay Nagar<br/>Indore, MP 452010</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button style={{ background: 'none', border: 'none', color: '#1154d9', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Edit</button>
            </div>
          </div>

          <div style={{ border: '1px solid #dfe7f1', borderRadius: '8px', padding: '16px', position: 'relative' }}>
            <b style={{ color: '#0b2a62', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color="#ff6b2c" /> Office (Bengaluru)</b>
            <p style={{ margin: '8px 0 0', color: '#4b5b72', fontSize: '11px', lineHeight: '1.5' }}>45 Tech Park, HSR Layout<br/>Bengaluru, KA 560102</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button style={{ background: 'none', border: 'none', color: '#1154d9', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Edit</button>
              <button style={{ background: 'none', border: 'none', color: '#e05763', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Delete</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
