import React, { useState, useEffect } from 'react';
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
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice,
    max: filters.maxPrice
  });

  // Доступные размеры
  const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  
  // Обновление ценового фильтра при изменении ползунка
  useEffect(() => {
    setPriceRange({
      min: filters.minPrice,
      max: filters.maxPrice
    });
  }, [filters.minPrice, filters.maxPrice]);

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

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const resetFilters = () => {
    onFilterChange({
      brands: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 10000
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

      {/* Секция цен */}
      <div className={styles.filterGroup}>
        <h3>Ценовой диапазон</h3>
        <div className={styles.priceRange}>
          <div className={styles.priceInputs}>
            <input
              type="number"
              min="0"
              max="10000"
              value={priceRange.min}
              onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
              className={styles.priceInput}
            />
            <span>-</span>
            <input
              type="number"
              min="0"
              max="10000"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
              className={styles.priceInput}
            />
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange.max}
            onChange={(e) => handlePriceChange(priceRange.min, parseInt(e.target.value))}
            className={styles.priceSlider}
          />
          <div className={styles.priceValues}>
            <span>0 ₽</span>
            <span>{priceRange.max} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;