import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type {Product} from '../../components/ProductCard/ProductCard';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Загрузка товара (в реальном приложении заменить на API-запрос)
  useEffect(() => {
    const mockProduct: Product = {
      id: Number(id),
      title: `Кроссовки ${id}`,
      price: 12000,
      colors: ['#000000', '#FFFFFF', '#FF0000'],
      sizes: [39, 40, 41, 42, 43],
      image: 'https://via.placeholder.com/400x400',
      category: 'sneakers',
      description: 'Стильные кроссовки с амортизирующей подошвой. Подходят для повседневной носки и занятий спортом.'
    };
    setProduct(mockProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <img
        src={product.image}
        alt={product.title}
        className={styles.mainImage}
      />

      <div className={styles.details}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>₽{product.price.toLocaleString()}</p>

        <div className={styles.section}>
          <h3>Цвета:</h3>
          <div className={styles.colors}>
            {product.colors.map(color => (
              <button
                key={color}
                className={`${styles.color} ${selectedColor === color ? styles.selected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Размеры:</h3>
          <div className={styles.sizes}>
            {product.sizes.map(size => (
              <button
                key={size}
                className={`${styles.size} ${selectedSize === size ? styles.selected : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Описание:</h3>
          <p className={styles.description}>{product.description}</p>
        </div>

        <button
          className={styles.addToCart}
          disabled={!selectedSize || !selectedColor}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductPage;