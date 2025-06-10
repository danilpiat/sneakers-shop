import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './ProductPage.module.css';

interface SizeItem {
  size: string;
  stock: number;
  price: number; // Добавляем цену для каждого размера
}

interface ProductModel {
  id: string;
  color: string;
  sku: string;
  sizes: SizeItem[]; // Используем обновленный интерфейс
  images: {
    image: string;
    is_main: boolean;
    order_index: number;
  }[];
  min_price: number; // Добавляем минимальную цену
  max_price: number; // Добавляем максимальную цену
}

interface ProductDetail {
  id: string;
  title: string;
  brand: {
    name: string;
    logo?: string;
  };
  main_image?: {
    image: string;
  };
  description: string;
  models: ProductModel[];
}

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Хук для навигации
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Загрузка товара
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        let host = window.location.host;

        if (host === 'localhost:3000') {
          host = 'http://127.0.0.1:8000';
        }
        else {
          host = 'https://'.concat(host);
        }
        const productResponse = await fetch(`${host}/api/products/${id}/`);
        if (!productResponse.ok) throw new Error('Ошибка загрузки товара');
        const productData = await productResponse.json();

        const productDetail: ProductDetail = {
          ...productData,
          models: productData.models
        };

        setProduct(productDetail);
        if (productData.models.length > 0) {
          setSelectedModel(productData.models[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.error('Ошибка загрузки товара:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Функция для получения всех изображений выбранной модели
  const getAllImages = () => {
    if (!selectedModel) return [];

    return selectedModel.images
      .sort((a, b) => a.order_index - b.order_index)
      .map(img => `data:image/jpeg;base64,${img.image}`);
  };

  // Переключение изображений в карусели
  const nextImage = () => {
    const images = getAllImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getAllImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) return <div className={styles.loading}>Загрузка товара...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Товар не найден</div>;

  // Получение текущего изображения
  const images = getAllImages();
  const currentImage = images[currentImageIndex] || '/placeholder-image.jpg';

  return (
    <div className={styles.container}>
      {/* Кнопка "Назад" */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        &larr; Назад
      </button>

      {/* Карусель изображений */}
      <div className={styles.imageCarousel}>
        {images.length > 1 && (
          <>
            <button className={`${styles.carouselButton} ${styles.prevButton}`} onClick={prevImage}>
              &lt;
            </button>
            <button className={`${styles.carouselButton} ${styles.nextButton}`} onClick={nextImage}>
              &gt;
            </button>
          </>
        )}

        <img
          src={currentImage}
          alt={product.title}
          className={styles.mainImage}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
      </div>

      {/* Бренд и название */}
      <div className={styles.productHeader}>
        <h2 className={styles.brandName}>{product.brand?.name}</h2>
        <h1 className={styles.productTitle}>{product.title}</h1>
      </div>

      {/* Карусель цветов */}
      {product.models.length > 1 && (
        <div className={styles.colorSection}>
          <h3>Цвета:</h3>
          <div className={styles.colorCarousel}>
            {product.models.map(model => (
              <button
                key={model.id}
                className={`${styles.colorButton} ${
                  selectedModel?.id === model.id ? styles.selected : ''
                }`}
                onClick={() => {
                  setSelectedModel(model);
                  setSelectedSize(null);
                  setCurrentImageIndex(0);
                }}
              >
                {model.color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Сетка размеров */}
      {selectedModel && selectedModel.sizes.length > 0 && (
        <div className={styles.sizeSection}>
          <h3>Размеры:</h3>
          <div className={styles.sizeGrid}>
            {selectedModel.sizes.map(sizeItem => (
              <button
                key={sizeItem.size}
                className={`${styles.sizeButton} ${
                  selectedSize?.size === sizeItem.size ? styles.selected : ''
                }`}
                onClick={() => setSelectedSize(sizeItem)}
              >
                <div className={styles.sizeValue}>{sizeItem.size}</div>
                <div className={styles.sizePrice}>{sizeItem.price.toLocaleString()} ₽</div>

                {/* Статус наличия */}
                <div className={`${styles.stockBadge} ${
                  sizeItem.stock > 0 ? styles.inStockBadge : styles.preOrderBadge
                }`}>
                  {sizeItem.stock > 0 ? 'В наличии' : 'Под заказ'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}


      {/* Описание товара */}
      <div className={styles.descriptionSection}>
        <h3>Описание:</h3>
        <p className={styles.description}>{product.description}</p>
      </div>

      {/* Нижняя панель с ценой выбранного размера */}
      <div className={styles.bottomPanel}>
        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Цена:</span>
          <span className={styles.priceValue}>
            {selectedSize
              ? `${selectedSize.price.toLocaleString()} ₽`
              : selectedModel
                ? `от ${selectedModel.min_price.toLocaleString()} ₽`
                : 'Цена не указана'}
          </span>
        </div>

        {/* Динамическая кнопка в зависимости от наличия */}
        {selectedSize ? (
          <button
            className={`${styles.addButton} ${
              selectedSize.stock > 0 
                ? styles.addToCartButton 
                : styles.preOrderButton
            }`}
          >
            {selectedSize.stock > 0 ? 'Добавить в корзину' : 'Заказать'}
          </button>
        ) : (
          <button
            className={`${styles.addButton} ${styles.disabledButton}`}
            disabled
          >
            Выберите размер
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPage;