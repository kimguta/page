import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 'neo-board',
    name: 'Neo Board',
    category: 'Dashboard',
    price: 240,
    summary: 'A modular admin dashboard pack with reusable cards and chart zones.',
    features: ['Responsive layout', 'Card-based composition', 'Dark and light themes'],
  },
  {
    id: 'pulse-kit',
    name: 'Pulse Kit',
    category: 'Marketing',
    price: 180,
    summary: 'A conversion-focused landing kit with strong headline composition.',
    features: ['Hero variants', 'CTA sections', 'Lead capture blocks'],
  },
  {
    id: 'atlas-flow',
    name: 'Atlas Flow',
    category: 'Operations',
    price: 320,
    summary: 'A workflow-oriented product page set for internal tools and service portals.',
    features: ['Workflow steps', 'Status chips', 'Action summaries'],
  },
]

export function getProducts() {
  return products
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id) ?? products[0]
}
