import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { PageHeading, Button } from "../EnterpriseHome";

export function SettingsPage() {
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
          <Button variant="primary" onClick={handleSave}>
            {saving ? "Saving..." : saved ? <><CheckCircle2 size={16} style={{display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px'}}/> Saved!</> : "Save Preferences"}
          </Button>
        </div>
      </div>
    </>
  )
}
