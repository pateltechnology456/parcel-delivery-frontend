/* ── Order types ── */

export type OrderStatus =
  | 'pending'
  | 'assigned'
  | 'accepted'
  | 'pickup_in_progress'
  | 'arrived_at_seller'
  | 'pickup_confirmed'
  | 'in_transit'
  | 'arrived_at_customer'
  | 'delivered'
  | 'cancelled'
  | 'failed_pickup'
  | 'failed_delivery'

export type OrderType = 'express' | 'standard' | 'scheduled'

export interface Location {
  address: string
  area: string
  city: string
  lat?: number
  lng?: number
}

export interface OrderParcel {
  weight: string
  description: string
  category?: string
  quantity?: number
}

export interface OrderContact {
  name: string
  /** Masked phone for privacy — e.g. "+91 987** ***10" */
  maskedPhone: string
}

export interface Order {
  id: string
  status: OrderStatus
  type: OrderType
  pickup: Location
  delivery: Location
  seller: OrderContact
  customer: OrderContact
  parcel: OrderParcel
  distance: string
  estimatedEarnings: number
  actualEarnings?: number
  estimatedTime: string
  acceptDeadline?: string
  createdAt: string
  pickedUpAt?: string
  deliveredAt?: string
  cancelledAt?: string
  cancellationReason?: string
  failureReason?: string
  pickupOtp?: string
  deliveryOtp?: string
  parcelPhotos: string[]
  timeline: OrderTimelineEvent[]
}

export interface OrderTimelineEvent {
  status: OrderStatus
  label: string
  timestamp?: string
  completed: boolean
  current: boolean
}

export interface IncomingOrder {
  id: string
  pickup: Location
  delivery: Location
  distance: string
  estimatedEarnings: number
  estimatedTime: string
  type: OrderType
  acceptDeadline: string
  /** Seconds remaining to accept */
  timeoutSeconds: number
}
