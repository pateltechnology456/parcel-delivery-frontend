const fs = require('fs');
const path = require('path');

const viewsPath = path.join(__dirname, 'components/enterprise/views');

const modifyFile = (file, targetBtn, text, loadingText, loadedText) => {
  const filePath = path.join(viewsPath, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('useState')) {
    content = content.replace(/import.*?from "\.\.\/EnterpriseHome";/, `import { useState } from "react";\n$&`);
  }
  
  if (!content.includes('CheckCircle2') && !content.includes('import { CheckCircle2 }')) {
    content = `import { CheckCircle2 } from "lucide-react";\n` + content;
  }
  
  content = content.replace(`export function ${file.replace('.tsx', '')}() {`, `export function ${file.replace('.tsx', '')}() {\n  const [saving, setSaving] = useState(false);\n  const [saved, setSaved] = useState(false);\n\n  const handleSave = () => {\n    setSaving(true);\n    setTimeout(() => {\n      setSaving(false);\n      setSaved(true);\n      setTimeout(() => setSaved(false), 2000);\n    }, 800);\n  };\n`);
  
  content = content.replace(`<Button variant="primary">${targetBtn}</Button>`, `<Button variant="primary" onClick={handleSave}>\n            {saving ? "${loadingText}" : saved ? <><CheckCircle2 size={16} style={{display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px'}}/> ${loadedText}</> : "${text}"}\n          </Button>`);
  
  fs.writeFileSync(filePath, content);
};

modifyFile('Profile.tsx', 'Save Changes', 'Save Changes', 'Saving...', 'Saved!');
modifyFile('SettingsPage.tsx', 'Save Preferences', 'Save Preferences', 'Saving...', 'Saved!');
modifyFile('Support.tsx', 'Submit Request', 'Submit Request', 'Sending...', 'Sent!');
