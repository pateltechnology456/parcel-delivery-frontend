import { Edit } from "lucide-react";
import { PageHeading, Button } from "../EnterpriseHome";

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
