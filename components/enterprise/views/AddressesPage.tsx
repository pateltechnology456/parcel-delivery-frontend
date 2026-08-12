import { Plus, MapPin } from "lucide-react";
import { PageHeading, Button } from "../EnterpriseHome";
import { useState } from "react";

export function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Warehouse (Indore)", address: "123 Logistics Park, Vijay Nagar\nIndore, MP 452010", isDefault: true },
    { id: 2, type: "Office (Bengaluru)", address: "45 Tech Park, HSR Layout\nBengaluru, KA 560102", isDefault: false }
  ]);

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleEdit = (id: number) => {
    const newAddress = window.prompt("Edit address details:");
    if (newAddress) {
      setAddresses(addresses.map(a => a.id === id ? { ...a, address: newAddress } : a));
    }
  };

  return (
    <>
      <PageHeading eyebrow="Workspace / Addresses" title="Saved Addresses" description="Keep your pickup and delivery locations close." action={<Button variant="primary"><Plus /> Add Address</Button>} />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {addresses.map((addr) => (
            <div key={addr.id} style={{ border: '1px solid #dfe7f1', borderRadius: '8px', padding: '16px', position: 'relative', opacity: 1, transition: 'opacity 0.2s' }}>
              {addr.isDefault && <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#e7efff', color: '#1154d9', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>DEFAULT</span>}
              <b style={{ color: '#0b2a62', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color="#ff6b2c" /> {addr.type}</b>
              <p style={{ margin: '8px 0 0', color: '#4b5b72', fontSize: '11px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>{addr.address}</p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <button onClick={() => handleEdit(addr.id)} style={{ background: 'none', border: 'none', color: '#1154d9', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Edit</button>
                {!addr.isDefault && (
                  <button onClick={() => handleDelete(addr.id)} style={{ background: 'none', border: 'none', color: '#e05763', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Delete</button>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}
