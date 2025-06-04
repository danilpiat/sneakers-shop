import React from 'react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    base_price: number;
    main_image?: {
      image: string;
    };
  };
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
      <div className={styles.card} onClick={onClick}>
          {product.main_image? (
              <img
                  src={`data:image/jpeg;base64,${product.main_image}`}
                  alt={product.title}
                  className={styles.image}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
              />
          ) : (
              <div className={styles.imagePlaceholder}>Нет изображения</div>
          )}


          <h3 className={styles.title}>{product.title}</h3>


          <p className={styles.price}>{product.base_price.toLocaleString()} ₽</p>
      </div>
  );
};

export default ProductCard;