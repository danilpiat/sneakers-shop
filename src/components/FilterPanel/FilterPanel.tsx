import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

interface Filters {
  brands: string[];
  sizes: number[];
  minPrice: number;
  maxPrice: number;
  inStock: boolean; // Добавляем новое поле
}

interface FilterPanelProps {
  filters: {
    brands: string[];
    sizes: number[];
    minPrice: number;
    maxPrice: number;
    inStock: boolean; // Добавляем новое поле
  };
  brands: Array<{ id: string; name: string; slug: string }>;
  onFilterChange: (filters: Filters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  brands,
  onFilterChange
}) => {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, inStock: e.target.checked });
  };

  // Доступные размеры
  const availableSizes = [
    36.5, 37.5, 38, 38.5, 39,
    40, 40.5, 41, 42, 42.5,
    43, 44, 44.5, 45, 45.5,
    46, 47, 47.5, 48.5, 49.5
  ];

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
      maxPrice: 100000,
      inStock: false
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

      {/* Секция брендов с выпадающим списком */}
      <div className={styles.filterGroup}>
        <div
          className={styles.filterHeader}
          onClick={() => setBrandsOpen(!brandsOpen)}
        >
          <h3>Бренды</h3>
          <span className={styles.arrow}>{brandsOpen ? '▼' : '►'}</span>
        </div>

        {brandsOpen && (
          <div className={styles.dropdownContent}>
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
        )}
      </div>

      {/* Секция размеров с выпадающим списком */}
      <div className={styles.filterGroup}>
        <div
          className={styles.filterHeader}
          onClick={() => setSizesOpen(!sizesOpen)}
        >
          <h3>Размеры</h3>
          <span className={styles.arrow}>{sizesOpen ? '▼' : '►'}</span>
        </div>

        {sizesOpen && (
          <div className={styles.dropdownContent}>
            <div className={styles.sizesGrid}>
              {availableSizes.map(size => (
                <label key={size} className={styles.sizeOption}>
                  <input
                    type="checkbox"
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className={styles.checkbox}
                  />
                  <span className={styles.sizeLabel}>{size}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.inStockToggle}>
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={handleInStockChange}
            className={styles.toggleInput}
          />
          <span className={styles.toggleLabel}> В наличии</span>
        </label>
      </div>
    </div>

  );
};

export default FilterPanel;