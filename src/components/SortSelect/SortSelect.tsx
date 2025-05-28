import React from 'react';
import styles from './SortSelect.module.css';

interface SortSelectProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ currentSort, onSortChange }) => {
  const options = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'price_asc', label: 'Цена по возрастанию' },
    { value: 'price_desc', label: 'Цена по убыванию' },
    { value: 'name', label: 'По названию' },
  ];

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Сортировка:</label>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className={styles.select}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;