const fs = require('fs');
const path = require('path');

const dashboardViewsContent = fs.readFileSync(path.join(__dirname, 'components/enterprise/DashboardViews.tsx'), 'utf-8');

const components = [
  'Profile',
  'SettingsPage',
  'Language',
  'Terms',
  'Support',
  'WalletPage',
  'NotificationsPage',
  'AddressesPage'
];

components.forEach(comp => {
  const regex = new RegExp(`export function ${comp}\\(\\) \\{[\\s\\S]*?\\n\\}\\n`, 'g');
  const match = dashboardViewsContent.match(regex);
  if (match) {
    let content = match[0];
    // Find used lucide icons
    const icons = ['Package', 'Truck', 'Plus', 'MapPin', 'CheckCircle2', 'Edit', 'Globe', 'CircleHelp', 'FileText', 'LogOut'].filter(icon => content.includes(`<${icon}`) || content.includes(`${icon} `));
    
    let imports = `import { PageHeading, Button } from "../EnterpriseHome";\n`;
    if (icons.length > 0) {
      imports = `import { ${icons.join(', ')} } from "lucide-react";\n` + imports;
    }
    
    fs.writeFileSync(path.join(__dirname, `components/enterprise/views/${comp}.tsx`), imports + '\n' + content);
  }
});

// Now for EnterpriseHome.tsx
const enterpriseHomeContent = fs.readFileSync(path.join(__dirname, 'components/enterprise/EnterpriseHome.tsx'), 'utf-8');

const ehComponents = [
  'Overview',
  'Orders',
  'OrderTable',
  'MapPreview',
  'Track',
  'Book',
  'OrderDetail'
];

ehComponents.forEach(comp => {
  const regex = new RegExp(`function ${comp}\\([\\s\\S]*?\\n\\}\\n`, 'g');
  const match = enterpriseHomeContent.match(regex);
  if (match) {
    let content = match[0];
    if (comp === 'OrderTable' || comp === 'MapPreview') {
      content = content.replace(/^function/, 'export function');
    } else {
      content = content.replace(/^function/, 'export default function');
    }

    const icons = ['Activity', 'ArrowDownToLine', 'ArrowRight', 'Bell', 'Box', 'CalendarDays', 'CheckCircle2', 'ChevronDown', 'CircleHelp', 'CreditCard', 'Edit', 'FileText', 'Globe', 'Home', 'LogOut', 'MapPin', 'Menu', 'Moon', 'Package', 'Plus', 'Route', 'Search', 'Settings', 'ShieldCheck', 'Sun', 'Truck', 'UserRound', 'Wallet', 'X', 'Zap'].filter(icon => content.includes(`<${icon}`) || content.includes(`${icon} `) || content.includes(`{${icon}}`) || content.includes(`icon={${icon}}`));
    
    let imports = `import { PageHeading, Button } from "../EnterpriseHome";\n`;
    imports += `import Link from "next/link";\n`;
    imports += `import { useState } from "react";\n`;
    
    if (comp === 'Book' || comp === 'Orders') {
      imports += `import { useSearchParams } from "next/navigation";\n`;
    }
    
    if (icons.length > 0) {
      imports += `import { ${icons.join(', ')} } from "lucide-react";\n`;
    }
    
    if (comp === 'Overview' || comp === 'Orders') {
      imports += `import { OrderTable } from "./OrderTable";\n`;
    }
    if (comp === 'Track' || comp === 'OrderDetail') {
      imports += `import { MapPreview } from "./MapPreview";\n`;
    }
    if (comp === 'OrderTable') {
      imports += `import { StatusBadge } from "../EnterpriseHome";\n`;
    }

    // Export orders from EnterpriseHome and import it
    imports += `import { orders } from "../data";\n`;

    fs.writeFileSync(path.join(__dirname, `components/enterprise/views/${comp}.tsx`), imports + '\n' + content);
  }
});
