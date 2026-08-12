import { CheckCircle2 } from "lucide-react";
import { Edit } from "lucide-react";
import { useState } from "react";
import { PageHeading, Button } from "../EnterpriseHome";

export function Profile() {
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
          <Button variant="primary" onClick={handleSave}>
            {saving ? "Saving..." : saved ? <><CheckCircle2 size={16} style={{display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px'}}/> Saved!</> : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  )
}
