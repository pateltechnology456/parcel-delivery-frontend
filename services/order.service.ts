import type { Order, IncomingOrder, OrderStatus } from '../types/order'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

const MOCK_ORDERS: Order[] = [
  {
    id: 'PT-2841', status: 'in_transit', type: 'express',
    pickup: { address: '123, Scheme No 54', area: 'Vijay Nagar', city: 'Indore', lat: 22.7533, lng: 75.8937 },
    delivery: { address: 'HSR Layout, Sector 2', area: 'HSR Layout', city: 'Bengaluru', lat: 12.9141, lng: 77.6446 },
    seller: { name: 'QuickMart Store', maskedPhone: '+91 987** ***45' },
    customer: { name: 'Neha Sharma', maskedPhone: '+91 987** ***10' },
    parcel: { weight: '2.5 kg', description: 'Electronics', category: 'Electronics' },
    distance: '4.8 km', estimatedEarnings: 280, actualEarnings: 280, estimatedTime: '22 min',
    createdAt: '2025-06-24T08:47:00Z', pickedUpAt: '2025-06-24T09:14:00Z',
    parcelPhotos: [],
    timeline: [
      { status: 'assigned', label: 'Order assigned', timestamp: '2025-06-24T08:47:00Z', completed: true, current: false },
      { status: 'accepted', label: 'Order accepted', timestamp: '2025-06-24T08:48:00Z', completed: true, current: false },
      { status: 'pickup_in_progress', label: 'Heading to seller', timestamp: '2025-06-24T08:50:00Z', completed: true, current: false },
      { status: 'arrived_at_seller', label: 'Arrived at seller', timestamp: '2025-06-24T09:10:00Z', completed: true, current: false },
      { status: 'pickup_confirmed', label: 'Pickup complete', timestamp: '2025-06-24T09:14:00Z', completed: true, current: false },
      { status: 'in_transit', label: 'In transit', timestamp: '2025-06-24T09:15:00Z', completed: false, current: true },
      { status: 'arrived_at_customer', label: 'Arrived at customer', completed: false, current: false },
      { status: 'delivered', label: 'Delivered', completed: false, current: false },
    ],
  },
  {
    id: 'PT-2838', status: 'delivered', type: 'standard',
    pickup: { address: 'Palasia Square', area: 'Palasia', city: 'Indore', lat: 22.7196, lng: 75.8577 },
    delivery: { address: 'MG Road', area: 'Bengaluru Central', city: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
    seller: { name: 'Fresh Foods', maskedPhone: '+91 876** ***22' },
    customer: { name: 'Rahul Verma', maskedPhone: '+91 901** ***55' },
    parcel: { weight: '1.2 kg', description: 'Food & Groceries' },
    distance: '3.2 km', estimatedEarnings: 320, actualEarnings: 320, estimatedTime: '18 min',
    createdAt: '2025-06-24T07:30:00Z', pickedUpAt: '2025-06-24T07:55:00Z', deliveredAt: '2025-06-24T08:20:00Z',
    parcelPhotos: [],
    timeline: [
      { status: 'assigned', label: 'Order assigned', timestamp: '2025-06-24T07:30:00Z', completed: true, current: false },
      { status: 'delivered', label: 'Delivered', timestamp: '2025-06-24T08:20:00Z', completed: true, current: false },
    ],
  },
  {
    id: 'PT-2835', status: 'delivered', type: 'express',
    pickup: { address: 'Bhawarkua Main Rd', area: 'Bhawarkua', city: 'Indore', lat: 22.7240, lng: 75.8655 },
    delivery: { address: 'MG Road', area: 'MG Road', city: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
    seller: { name: 'TechZone', maskedPhone: '+91 812** ***78' },
    customer: { name: 'Priya Patel', maskedPhone: '+91 773** ***33' },
    parcel: { weight: '0.8 kg', description: 'Accessories' },
    distance: '2.5 km', estimatedEarnings: 190, actualEarnings: 190, estimatedTime: '14 min',
    createdAt: '2025-06-24T06:45:00Z', deliveredAt: '2025-06-24T07:15:00Z',
    parcelPhotos: [],
    timeline: [
      { status: 'assigned', label: 'Order assigned', timestamp: '2025-06-24T06:45:00Z', completed: true, current: false },
      { status: 'delivered', label: 'Delivered', timestamp: '2025-06-24T07:15:00Z', completed: true, current: false },
    ],
  },
  {
    id: 'PT-2829', status: 'delivered', type: 'standard',
    pickup: { address: 'Rau Circle', area: 'Rau', city: 'Indore', lat: 22.6569, lng: 75.8532 },
    delivery: { address: 'Vijay Nagar Rd', area: 'Vijay Nagar', city: 'Indore', lat: 22.7533, lng: 75.8937 },
    seller: { name: 'HomeDecor Plus', maskedPhone: '+91 934** ***11' },
    customer: { name: 'Amit Singh', maskedPhone: '+91 889** ***66' },
    parcel: { weight: '3.1 kg', description: 'Home Decor' },
    distance: '6.2 km', estimatedEarnings: 240, actualEarnings: 240, estimatedTime: '28 min',
    createdAt: '2025-06-23T16:00:00Z', deliveredAt: '2025-06-23T16:45:00Z',
    parcelPhotos: [],
    timeline: [
      { status: 'assigned', label: 'Order assigned', timestamp: '2025-06-23T16:00:00Z', completed: true, current: false },
      { status: 'delivered', label: 'Delivered', timestamp: '2025-06-23T16:45:00Z', completed: true, current: false },
    ],
  },
  {
    id: 'PT-2822', status: 'cancelled', type: 'standard',
    pickup: { address: 'Rajwada Palace Rd', area: 'Rajwada', city: 'Indore', lat: 22.7179, lng: 75.8564 },
    delivery: { address: 'Koramangala', area: 'Bengaluru', city: 'Bengaluru', lat: 12.9352, lng: 77.6245 },
    seller: { name: 'BookWorld', maskedPhone: '+91 956** ***42' },
    customer: { name: 'Kavita Rao', maskedPhone: '+91 812** ***99' },
    parcel: { weight: '0.5 kg', description: 'Books' },
    distance: '5.0 km', estimatedEarnings: 0, estimatedTime: '25 min',
    createdAt: '2025-06-23T12:00:00Z', cancelledAt: '2025-06-23T12:15:00Z',
    cancellationReason: 'Customer cancelled the order',
    parcelPhotos: [],
    timeline: [
      { status: 'assigned', label: 'Order assigned', timestamp: '2025-06-23T12:00:00Z', completed: true, current: false },
      { status: 'cancelled', label: 'Cancelled', timestamp: '2025-06-23T12:15:00Z', completed: true, current: false },
    ],
  },
]

const MOCK_INCOMING: IncomingOrder[] = [
  {
    id: 'PT-2941',
    pickup: { address: 'Scheme No 54', area: 'Vijay Nagar', city: 'Indore' },
    delivery: { address: 'HSR Layout', area: 'Bengaluru', city: 'Bengaluru' },
    distance: '4.8 km', estimatedEarnings: 280, estimatedTime: '22 min',
    type: 'express', acceptDeadline: '2025-06-24T09:38:00Z', timeoutSeconds: 480,
  },
  {
    id: 'PT-2942',
    pickup: { address: 'Main Road', area: 'Bhawarkua', city: 'Indore' },
    delivery: { address: 'Palasia Square', area: 'Palasia', city: 'Indore' },
    distance: '2.1 km', estimatedEarnings: 140, estimatedTime: '12 min',
    type: 'standard', acceptDeadline: '2025-06-24T09:42:00Z', timeoutSeconds: 720,
  },
]

/* ── Service methods ── */

export async function getOrders(statusFilter?: OrderStatus): Promise<Order[]> {
  await delay(600)
  if (!statusFilter) return MOCK_ORDERS
  return MOCK_ORDERS.filter(o => o.status === statusFilter)
}

export async function getOrderById(id: string): Promise<Order | null> {
  await delay(400)
  return MOCK_ORDERS.find(o => o.id === id) || null
}

export async function getIncomingOrders(): Promise<IncomingOrder[]> {
  await delay(300)
  return [...MOCK_INCOMING]
}

export async function acceptOrder(id: string): Promise<{ success: boolean; message: string }> {
  await delay(600)
  const idx = MOCK_INCOMING.findIndex(o => o.id === id)
  if (idx >= 0) MOCK_INCOMING.splice(idx, 1)
  return { success: true, message: 'Order accepted successfully' }
}

export async function rejectOrder(id: string): Promise<{ success: boolean; message: string }> {
  await delay(400)
  const idx = MOCK_INCOMING.findIndex(o => o.id === id)
  if (idx >= 0) MOCK_INCOMING.splice(idx, 1)
  return { success: true, message: 'Order rejected' }
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<{ success: boolean; message: string }> {
  await delay(500)
  const order = MOCK_ORDERS.find(o => o.id === id)
  if (!order) return { success: false, message: 'Order not found' }
  order.status = status
  return { success: true, message: `Order status updated to ${status}` }
}

export async function generateOtp(
  orderId: string,
  _type: 'pickup' | 'delivery'
): Promise<{ success: boolean; otp?: string; message: string }> {
  await delay(500)
  // In production, backend generates and sends OTP to seller/customer
  return { success: true, message: 'OTP generated and sent' }
}

export async function verifyOtp(
  orderId: string,
  otp: string,
  type: 'pickup' | 'delivery'
): Promise<{ success: boolean; message: string }> {
  await delay(700)
  // In production, backend verifies OTP
  if (otp.length < 1) return { success: false, message: 'Please enter OTP' }
  return { success: true, message: `${type === 'pickup' ? 'Pickup' : 'Delivery'} verified successfully` }
}

export async function uploadParcelPhotos(
  orderId: string,
  photos: File[]
): Promise<{ success: boolean; urls: string[]; message: string }> {
  await delay(1500)
  // In production, uploads to backend storage
  const urls = photos.map((_, i) => `/mock-photo-${orderId}-${i}.jpg`)
  return { success: true, urls, message: `${photos.length} photo(s) uploaded` }
}

export async function reportFailedPickup(
  orderId: string,
  reason: string
): Promise<{ success: boolean; message: string }> {
  await delay(600)
  return { success: true, message: 'Failed pickup reported. Support will follow up.' }
}

export async function reportFailedDelivery(
  orderId: string,
  reason: string
): Promise<{ success: boolean; message: string }> {
  await delay(600)
  return { success: true, message: 'Failed delivery reported. Support will follow up.' }
}

export async function cancelOrderByPartner(
  orderId: string,
  reason: string
): Promise<{ success: boolean; message: string }> {
  await delay(600)
  return { success: true, message: 'Order cancellation requested.' }
}
