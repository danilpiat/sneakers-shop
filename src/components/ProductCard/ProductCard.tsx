import React from 'react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    base_price: number;
    brand: {
      name: string;
      logo?: string;
    };
    main_image?: {
      image: string;
    };
    available_sizes: number[];
  };
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
      <div className={styles.card} onClick={onClick}>
          {product.main_image?.image ? (
              <img
                  src={`data:image/jpeg;base64,${product.main_image?.image}`}
                  alt={product.title}
                  className={styles.image}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
              />
          ) : (
              <div className={styles.imagePlaceholder}>Нет изображения</div>
          )}

          <div className={styles.brandContainer}>
              {product.brand && product.brand.logo ? (
                  <img
                      src={product.brand.logo}
                      alt={product.brand.name}
                      className={styles.brandLogo}
                  />
              ) : (
                  <span className={styles.brandName}>
                      {product.brand ? product.brand.name : 'Без бренда'}
                    </span>
              )}
          </div>

          <h3 className={styles.title}>{product.title}</h3>

          <div className={styles.sizesContainer}>
              {product.available_sizes.slice(0, 5).map(size => (
                  <span key={size} className={styles.sizeTag}>{size}</span>
              ))}
              {product.available_sizes.length > 5 && (
                  <span className={styles.moreSizes}>+{product.available_sizes.length - 5}</span>
              )}
          </div>

          <p className={styles.price}>{product.base_price.toLocaleString()} ₽</p>
      </div>
  );
};

export default ProductCard;