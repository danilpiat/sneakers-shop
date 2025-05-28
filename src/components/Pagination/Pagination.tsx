import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Назад
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => {
          if (totalPages <= 7) return true;
          return (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 2 && page <= currentPage + 2)
          );
        })
        .map((page, index, array) => (
          <React.Fragment key={page}>
            {index > 0 && page - array[index - 1] > 1 && (
              <span className={styles.pageDots}>...</span>
            )}
            <button
              className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </React.Fragment>
        ))
      }

      <button
        className={styles.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;