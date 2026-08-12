const fs = require('fs');
const path = require('path');

const enterpriseHomePath = path.join(__dirname, 'components/enterprise/EnterpriseHome.tsx');
let content = fs.readFileSync(enterpriseHomePath, 'utf-8');

// Replace DashboardViews import
content = content.replace(
  /import \{ Profile, SettingsPage, Language, Terms, Support, WalletPage, NotificationsPage, AddressesPage \} from "\.\/DashboardViews";/,
  `import { Profile } from "./views/Profile";
import { SettingsPage } from "./views/SettingsPage";
import { Language } from "./views/Language";
import { Terms } from "./views/Terms";
import { Support } from "./views/Support";
import { WalletPage } from "./views/WalletPage";
import { NotificationsPage } from "./views/NotificationsPage";
import { AddressesPage } from "./views/AddressesPage";
import { Overview } from "./views/Overview";
import { Orders } from "./views/Orders";
import { Track } from "./views/Track";
import { Book } from "./views/Book";
import { OrderDetail } from "./views/OrderDetail";
import { orders } from "./data";`
);

// Remove the `let orders = [...]` block
content = content.replace(/let orders = \[[\s\S]*?\];\n/, '');

// Remove the components that were extracted
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
  content = content.replace(regex, '');
});

// Remove Placeholder component which is not exported/used outside Book really? Wait, Placeholder is used in Book?
// Actually Placeholder was not extracted. Let's leave it or remove it. Placeholder is not used.
content = content.replace(/function Placeholder\([\s\S]*?\n\}\n/, '');

fs.writeFileSync(enterpriseHomePath, content);
