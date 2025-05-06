export interface Product {
  id: number
  name: string
  price: number
  colors: string[]
  sizes: number[]
  image: string
  category: string
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'UltraBoost 5.0 DNA',
    price: 180,
    colors: ['#2d3748', '#718096', '#4a5568'],
    sizes: [39, 40, 41, 42, 43],
    image: 'https://via.placeholder.com/300x200',
    category: 'running'
  },
  {
    id: 2,
    name: 'Air Max 2090',
    price: 150,
    colors: ['#48bb78', '#f6e05e', '#f56565'],
    sizes: [38, 39, 40, 41, 42],
    image: 'https://via.placeholder.com/300x200',
    category: 'lifestyle'
  },
  {
    id: 3,
    name: 'Classic Leather',
    price: 85,
    colors: ['#1a365d', '#fff', '#c53030'],
    sizes: [37, 38, 39, 40, 41],
    image: 'https://via.placeholder.com/300x200',
    category: 'casual'
  }
]