import { useEffect, useState } from 'react'
import { useProductStore } from '../../stores/productStore'
import styles from './FilterPanel.module.css'

export const FilterPanel = () => {
  const { filters, setFilters } = useProductStore()
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    const timeout = setTimeout(() => setFilters(localFilters), 300)
    return () => clearTimeout(timeout)
  }, [localFilters])

  return (
    <div className={styles.panel}>
      <div className={styles.filterGroup}>
        <label>Price Range:</label>
        <div className={styles.range}>
          <input
            type="number"
            value={localFilters.minPrice}
            onChange={e => setLocalFilters({ ...localFilters, minPrice: +e.target.value })}
          />
          <span>-</span>
          <input
            type="number"
            value={localFilters.maxPrice}
            onChange={e => setLocalFilters({ ...localFilters, maxPrice: +e.target.value })}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Sizes:</label>
        <div className={styles.chips}>
          {[39, 40, 41, 42, 43].map(size => (
            <button
              key={size}
              className={`${styles.chip} ${localFilters.sizes.includes(size) ? styles.active : ''}`}
              onClick={() => setLocalFilters({
                ...localFilters,
                sizes: localFilters.sizes.includes(size)
                  ? localFilters.sizes.filter(s => s !== size)
                  : [...localFilters.sizes, size]
              })}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Colors:</label>
        <div className={styles.colors}>
          {['#2d3748', '#718096', '#4a5568', '#48bb78', '#f6e05e', '#f56565'].map(color => (
            <button
              key={color}
              className={styles.color}
              style={{ backgroundColor: color }}
              onClick={() => setLocalFilters({
                ...localFilters,
                colors: localFilters.colors.includes(color)
                  ? localFilters.colors.filter(c => c !== color)
                  : [...localFilters.colors, color]
              })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}