import type { OrderItem, UserProfile } from '../types/user'

export const profile: UserProfile = {
  name: 'Jisoo Kim',
  email: 'jisoo@example.com',
  tier: 'Premium',
  joinedAt: '2024-02-15',
}

export const orders: OrderItem[] = [
  { id: 'OD-2401', product: 'Neo Board', status: 'Delivered', date: '2026-04-11' },
  { id: 'OD-2402', product: 'Pulse Kit', status: 'Preparing', date: '2026-04-18' },
  { id: 'OD-2403', product: 'Atlas Flow', status: 'In transit', date: '2026-04-22' },
]
