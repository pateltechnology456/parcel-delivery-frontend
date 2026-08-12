import { PageHeading, Button } from "../EnterpriseHome";

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
