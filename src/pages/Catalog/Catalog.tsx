import { useEffect, useState } from 'react'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { FilterPanel } from '../../components/FilterPanel/FilterPanel'
import { SortSelect } from '../../components/SortSelect/SortSelect'
import { useProductStore } from '../../stores/productStore'
import { mockProducts } from '../../utils/mockProducts'
import styles from './Catalog.module.css'

export const Catalog = () => {
  const { sortBy, filters } = useProductStore()
  const [displayProducts, setDisplayProducts] = useState(mockProducts)

  useEffect(() => {
    let filtered = mockProducts.filter(product =>
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice &&
      (filters.sizes.length === 0 || product.sizes.some(size => filters.sizes.includes(size))) &&
      (filters.colors.length === 0 || product.colors.some(color => filters.colors.includes(color)))
    )

    filtered = filtered.sort((a, b) =>
      sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
    )

    setDisplayProducts(filtered)
  }, [sortBy, filters])

  return (
    <div className={styles.catalog}>
      <div className={styles.controls}>
        <FilterPanel />
        <SortSelect />
      </div>

      <div className={styles.products}>
        {displayProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}