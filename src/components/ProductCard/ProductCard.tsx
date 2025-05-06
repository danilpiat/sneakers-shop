import { useState } from 'react';
import styles from './ProductCard.module.css';
import {Link} from "react-router-dom";

// Обновленный интерфейс продукта
export interface Product {
  id: number;
  title: string;  // Изменили name на title
  price: number;
  colors: string[];
  sizes: number[];
  image: string;
  category: string;
  description: string;

}

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h3 className={styles.title}>{product.title}</h3>  {/* Изменили name на title */}
      <p className={styles.price}>${product.price}</p>

      <div className={styles.selector}>
        {product.colors.map(color => (
          <button
            key={color}
            className={`${styles.colorDot} ${selectedColor === color ? styles.selected : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      <div className={styles.selector}>
        {product.sizes.map(size => (
          <button
            key={size}
            className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      <button
        className={styles.addToCart}
        disabled={!selectedSize || !selectedColor}
      >
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;