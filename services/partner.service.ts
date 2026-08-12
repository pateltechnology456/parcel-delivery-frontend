import type { Partner, PartnerEarnings, EarningsHistoryItem, WalletTransaction, Notification, PartnerDocument, SupportTicket } from '../types/partner'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

/* ── Mock partner data ── */
const MOCK_PARTNER: Partner = {
  id: 'p-001',
  name: 'Arjun Kumar',
  email: 'arjun.kumar@email.com',
  phone: '+91 98765 43210',
  partnerId: 'PT-DRV-2841',
  status: 'online',
  rating: 4.9,
  totalDeliveries: 847,
  totalEarnings: 284600,
  kycComplete: true,
  verified: true,
  createdAt: '2024-11-15T10:30:00Z',
  vehicle: {
    id: 'v-001',
    type: 'bike',
    number: 'MP-09-XX-4821',
    rcStatus: 'approved',
    insuranceStatus: 'approved',
    verified: true,
  },
  documents: [
    { id: 'd-001', type: 'driving_license', label: 'Driving License', status: 'approved', uploadedAt: '2024-11-16T09:00:00Z' },
    { id: 'd-002', type: 'vehicle_rc', label: 'Vehicle RC', status: 'approved', uploadedAt: '2024-11-16T09:10:00Z' },
    { id: 'd-003', type: 'insurance', label: 'Vehicle Insurance', status: 'pending', uploadedAt: '2025-06-01T11:00:00Z' },
    { id: 'd-004', type: 'identity', label: 'Aadhaar Card', status: 'approved', uploadedAt: '2024-11-16T09:20:00Z' },
  ],
}

const MOCK_EARNINGS: PartnerEarnings = {
  today: 1840,
  thisWeek: 12680,
  thisMonth: 42840,
  total: 284600,
  availableBalance: 8420,
  pendingBalance: 3200,
  incentives: 2400,
  deductions: 0,
}

const MOCK_EARNINGS_HISTORY: EarningsHistoryItem[] = [
  { id: 'e-001', date: '2025-06-24', amount: 8420, deliveries: 23, type: 'weekly_payout', status: 'paid' },
  { id: 'e-002', date: '2025-06-21', amount: 12680, deliveries: 31, type: 'weekly_payout', status: 'paid' },
  { id: 'e-003', date: '2025-06-17', amount: 9640, deliveries: 27, type: 'weekly_payout', status: 'paid' },
  { id: 'e-004', date: '2025-06-14', amount: 1200, deliveries: 0, type: 'incentive', status: 'paid' },
]

const MOCK_TRANSACTIONS: WalletTransaction[] = [
  { id: 't-001', date: '2025-06-24', amount: 8420, type: 'credit', description: 'Weekly payout', status: 'completed' },
  { id: 't-002', date: '2025-06-23', amount: 5000, type: 'debit', description: 'Withdrawal to bank', status: 'completed' },
  { id: 't-003', date: '2025-06-21', amount: 12680, type: 'credit', description: 'Weekly payout', status: 'completed' },
  { id: 't-004', date: '2025-06-20', amount: 1200, type: 'credit', description: 'Weekend bonus', status: 'completed' },
]

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n-001', type: 'order', title: 'New delivery request', message: 'A new delivery request is available near Vijay Nagar.', read: false, createdAt: '2025-06-24T09:30:00Z', actionUrl: '/partner/orders' },
  { id: 'n-002', type: 'earnings', title: 'Weekly payout processed', message: 'Your weekly payout of ₹8,420 has been credited.', read: false, createdAt: '2025-06-24T08:00:00Z', actionUrl: '/partner/earnings' },
  { id: 'n-003', type: 'document', title: 'Insurance review pending', message: 'Your vehicle insurance document is under review.', read: false, createdAt: '2025-06-23T14:00:00Z', actionUrl: '/partner/documents' },
  { id: 'n-004', type: 'account', title: 'Rating updated', message: 'Your partner rating has increased to 4.9. Great work!', read: true, createdAt: '2025-06-22T18:00:00Z' },
  { id: 'n-005', type: 'system', title: 'App update available', message: 'A new version of the partner app is available.', read: true, createdAt: '2025-06-21T10:00:00Z' },
]

/* ── Service methods ── */

export async function getPartnerProfile(): Promise<Partner> {
  await delay(600)
  const stored = typeof window !== 'undefined' ? localStorage.getItem('mock_current_user') : null
  if (!stored) throw new Error('Not authenticated')
  return MOCK_PARTNER
}

export async function updatePartnerStatus(status: Partner['status']): Promise<Partner> {
  await delay(400)
  MOCK_PARTNER.status = status
  return MOCK_PARTNER
}

export async function getPartnerEarnings(): Promise<PartnerEarnings> {
  await delay(500)
  return MOCK_EARNINGS
}

export async function getEarningsHistory(): Promise<EarningsHistoryItem[]> {
  await delay(500)
  return MOCK_EARNINGS_HISTORY
}

export async function getWalletTransactions(): Promise<WalletTransaction[]> {
  await delay(500)
  return MOCK_TRANSACTIONS
}

export async function requestWithdrawal(amount: number): Promise<{ success: boolean; message: string }> {
  await delay(800)
  if (amount > MOCK_EARNINGS.availableBalance) {
    return { success: false, message: 'Insufficient balance' }
  }
  return { success: true, message: `Withdrawal of ₹${amount} initiated. Will be processed in 24-48 hours.` }
}

export async function getNotifications(): Promise<Notification[]> {
  await delay(400)
  return MOCK_NOTIFICATIONS
}

export async function markNotificationRead(id: string): Promise<void> {
  await delay(200)
  const n = MOCK_NOTIFICATIONS.find(x => x.id === id)
  if (n) n.read = true
}

export async function markAllNotificationsRead(): Promise<void> {
  await delay(300)
  MOCK_NOTIFICATIONS.forEach(n => { n.read = true })
}

export async function getPartnerDocuments(): Promise<PartnerDocument[]> {
  await delay(500)
  return MOCK_PARTNER.documents
}

export async function uploadDocument(
  type: PartnerDocument['type'],
  _file: File
): Promise<PartnerDocument> {
  await delay(1500)
  // In production this would upload to backend
  return {
    id: `d-${Date.now()}`,
    type,
    label: type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    status: 'pending',
    uploadedAt: new Date().toISOString(),
  }
}

export async function submitSupportTicket(
  ticket: Omit<SupportTicket, 'id' | 'status' | 'createdAt'>
): Promise<SupportTicket> {
  await delay(800)
  return {
    ...ticket,
    id: `st-${Date.now()}`,
    status: 'open',
    createdAt: new Date().toISOString(),
  }
}
