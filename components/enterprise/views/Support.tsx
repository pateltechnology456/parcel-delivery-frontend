import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { PageHeading, Button } from "../EnterpriseHome";

export function Support() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

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
          <Button variant="primary" onClick={handleSave}>
            {saving ? "Sending..." : saved ? <><CheckCircle2 size={16} style={{display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px'}}/> Sent!</> : "Submit Request"}
          </Button>
        </div>
      </div>
    </>
  )
}
