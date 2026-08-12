import { Package, Truck, Plus, MapPin } from "lucide-react";
import { PageHeading, Button } from "./EnterpriseHome";

export function Profile() {
  return (
    <>
      <PageHeading eyebrow="Workspace / Profile" title="Edit Profile" description="Manage your personal information and account details." />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-grid" style={{ marginTop: '16px' }}>
            <label>
              First Name
              <input defaultValue="Ankit" />
            </label>
            <label>
              Last Name
              <input defaultValue="Kumar" />
            </label>
            <label>
              Email Address
              <input defaultValue="ankit@acme.com" type="email" />
            </label>
            <label>
              Phone Number
              <input defaultValue="+91 9876543210" />
            </label>
          </div>
        </div>
        <div style={{ marginTop: '24px' }}>
          <Button variant="primary">Save Changes</Button>
        </div>
      </div>
    </>
  )
}

export function SettingsPage() {
  return (
    <>
      <PageHeading eyebrow="Workspace / Settings" title="Preferences" description="Manage your notification and display settings." />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div className="form-section">
          <h2>Notifications</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="check-field">
              <input type="checkbox" defaultChecked /> Email notifications for order updates
            </label>
            <label className="check-field">
              <input type="checkbox" defaultChecked /> SMS alerts for delivery drivers
            </label>
            <label className="check-field">
              <input type="checkbox" /> Marketing emails and promotions
            </label>
          </div>
        </div>
        <div style={{ marginTop: '24px' }}>
          <Button variant="primary">Save Preferences</Button>
        </div>
      </div>
    </>
  )
}

export function Language() {
  return (
    <>
      <PageHeading eyebrow="Workspace / Language" title="Language Preferences" description="Select your preferred language for the dashboard." />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div className="form-section">
          <h2>Select Language</h2>
          <div className="form-grid" style={{ marginTop: '16px', gridTemplateColumns: '1fr' }}>
            <label>
              Language
              <select defaultValue="English">
                <option>English</option>
                <option>Hindi (हिंदी)</option>
                <option>Marathi (मराठी)</option>
                <option>Gujarati (ગુજરાતી)</option>
              </select>
            </label>
          </div>
        </div>
        <div style={{ marginTop: '24px' }}>
          <Button variant="primary">Update Language</Button>
        </div>
      </div>
    </>
  )
}

export function Terms() {
  return (
    <>
      <PageHeading eyebrow="Workspace / Legal" title="Terms & Privacy Policy" description="Read our terms of service and privacy policy." />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div className="legal-content" style={{ color: '#4b5b72', fontSize: '13px', lineHeight: '1.6' }}>
          <h2 style={{ fontSize: '16px', color: '#0b2a62', marginBottom: '12px' }}>Privacy Policy</h2>
          <p>Your privacy is important to us. It is Patel Technology's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
          <p style={{ marginTop: '8px' }}>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
          
          <h2 style={{ fontSize: '16px', color: '#0b2a62', marginTop: '24px', marginBottom: '12px' }}>Terms of Service</h2>
          <p>By accessing the website at Patel Technology, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        </div>
      </div>
    </>
  )
}

export function Support() {
  return (
    <>
      <PageHeading eyebrow="Workspace / Support" title="Help & Support" description="Get help with your shipments, account, or technical issues." />
      <div className="dash-card profile-card" style={{ padding: '24px' }}>
        <div className="form-section">
          <h2>Contact Us</h2>
          <p style={{ marginTop: '8px', color: '#8a99ac', fontSize: '12px' }}>Send a message to our support team and we will get back to you within 24 hours.</p>
          <div className="form-grid" style={{ marginTop: '16px', gridTemplateColumns: '1fr' }}>
            <label>
              Subject
              <select defaultValue="General Inquiry">
                <option>General Inquiry</option>
                <option>Billing Issue</option>
                <option>Shipment Tracking</option>
                <option>Technical Support</option>
              </select>
            </label>
            <label>
              Message
              <textarea rows={4} placeholder="Describe your issue..." style={{ padding: '11px', border: '1px solid #dfe7f1', borderRadius: '7px', outline: 'none', fontFamily: 'inherit', fontSize: '11px', resize: 'vertical' }}></textarea>
            </label>
          </div>
        </div>
        <div style={{ marginTop: '24px' }}>
          <Button variant="primary">Submit Request</Button>
        </div>
      </div>
    </>
  )
}

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
