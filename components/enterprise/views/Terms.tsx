import { PageHeading, Button } from "../EnterpriseHome";

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
