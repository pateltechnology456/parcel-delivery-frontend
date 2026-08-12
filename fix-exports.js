const fs = require('fs');
const path = require('path');

// Fix default exports to named exports
const viewsPath = path.join(__dirname, 'components/enterprise/views');
const files = fs.readdirSync(viewsPath);

files.forEach(file => {
  const filePath = path.join(viewsPath, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/export default function/g, 'export function');
  
  // Fix imports for StatusBadge, StatCard from EnterpriseHome
  content = content.replace(/import \{.*?StatusBadge.*?\} from "\.\.\/EnterpriseHome";/g, 'import { StatusBadge } from "../EnterpriseHome";');
  fs.writeFileSync(filePath, content);
});

// Fix missing exports in EnterpriseHome.tsx
const ehPath = path.join(__dirname, 'components/enterprise/EnterpriseHome.tsx');
let ehContent = fs.readFileSync(ehPath, 'utf-8');

ehContent = ehContent.replace(/function StatusBadge/g, 'export function StatusBadge');
ehContent = ehContent.replace(/function StatCard/g, 'export function StatCard');

fs.writeFileSync(ehPath, ehContent);
