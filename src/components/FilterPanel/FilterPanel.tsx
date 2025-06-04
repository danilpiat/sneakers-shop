import React from 'react';
import styles from './FilterPanel.module.css';

interface Filters {
  brands: string[];
  sizes: number[];
  minPrice: number;
  maxPrice: number;
}

interface FilterPanelProps {
  filters: {
    brands: string[];
    sizes: number[];
    minPrice: number;
    maxPrice: number;
  };
  brands: Array<{ id: string; name: string; slug: string }>;
  onFilterChange: (filters: Filters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  brands,
  onFilterChange 
}) => {

  // Доступные размеры
  const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  const handleBrandChange = (brandSlug: string) => {
    const newBrands = filters.brands.includes(brandSlug)
      ? filters.brands.filter(b => b !== brandSlug)
      : [...filters.brands, brandSlug];
    
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleSizeChange = (size: number) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    onFilterChange({ ...filters, sizes: newSizes });
  };


  const resetFilters = () => {
    onFilterChange({
      brands: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Фильтры</h2>
        <button className={styles.resetButton} onClick={resetFilters}>
          Сбросить
        </button>
      </div>

      {/* Секция брендов */}
      <div className={styles.filterGroup}>
        <h3>Бренды</h3>
        <div className={styles.filterOptions}>
          {brands.map(brand => (
            <label key={brand.id} className={styles.option}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand.slug)}
                onChange={() => handleBrandChange(brand.slug)}
                className={styles.checkbox}
              />
              <span className={styles.optionLabel}>{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Секция размеров */}
      <div className={styles.filterGroup}>
        <h3>Размеры</h3>
        <div className={styles.sizesContainer}>
          {availableSizes.map(size => (
            <button
              key={size}
              className={`${styles.sizeButton} ${
                filters.sizes.includes(size) ? styles.selected : ''
              }`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;