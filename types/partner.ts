/* ── Partner types ── */

export type PartnerStatus = 'online' | 'offline' | 'busy' | 'on_pickup' | 'on_delivery'

export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'not_uploaded'

export interface PartnerDocument {
  id: string
  type: 'driving_license' | 'vehicle_rc' | 'insurance' | 'identity' | 'other'
  label: string
  status: DocumentStatus
  fileUrl?: string
  rejectionReason?: string
  uploadedAt?: string
}

export interface Vehicle {
  id: string
  type: 'bike' | 'tempo' | 'truck'
  number: string
  rcStatus: DocumentStatus
  insuranceStatus: DocumentStatus
  verified: boolean
}

export interface Partner {
  id: string
  name: string
  email: string
  phone: string
  partnerId: string
  profilePhoto?: string
  status: PartnerStatus
  rating: number
  totalDeliveries: number
  totalEarnings: number
  vehicle?: Vehicle
  documents: PartnerDocument[]
  kycComplete: boolean
  verified: boolean
  createdAt: string
}

export interface PartnerEarnings {
  today: number
  thisWeek: number
  thisMonth: number
  total: number
  availableBalance: number
  pendingBalance: number
  incentives: number
  deductions: number
}

export interface EarningsHistoryItem {
  id: string
  date: string
  amount: number
  deliveries: number
  type: 'weekly_payout' | 'incentive' | 'deduction' | 'withdrawal'
  status: 'paid' | 'pending' | 'processing'
}

export interface WalletTransaction {
  id: string
  date: string
  amount: number
  type: 'credit' | 'debit'
  description: string
  orderId?: string
  status: 'completed' | 'pending' | 'failed'
}

export interface Notification {
  id: string
  type: 'order' | 'earnings' | 'account' | 'document' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
}

export interface SupportTicket {
  id: string
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  orderId?: string
  createdAt: string
}
