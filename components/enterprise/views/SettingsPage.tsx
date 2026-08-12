import { PageHeading, Button } from "../EnterpriseHome";

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
