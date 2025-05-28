import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './ProductPage.module.css';

interface ProductModel {
  id: string;
  color: string;
  sku: string;
  price: string;
  sizes: {
    size: string;
    stock: number;
  }[];
  images: {
    image: string;
    is_main: boolean;
    order_index: number;
  }[];
}

interface ProductDetail {
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
  description: string;
  models: ProductModel[];
}

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Загрузка товара
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // Получаем основную информацию о товаре
        const productResponse = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
        if (!productResponse.ok) throw new Error('Ошибка загрузки товара');
        const productData = await productResponse.json();

        // Получаем модели товара

        const productDetail: ProductDetail = {
          ...productData,
          models: productData.models
        };

        setProduct(productDetail);
        // Устанавливаем первую модель по умолчанию
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

  if (loading) return <div className={styles.loading}>Загрузка товара...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Товар не найден</div>;

  // Находим главное изображение для выбранной модели
  const getMainImage = () => {
    if (!selectedModel) return '';

    const mainImage = selectedModel.images.find(img => img.is_main);
    if (mainImage && mainImage.image) {
      return `data:image/jpeg;base64,${mainImage.image}`;
    }

    return selectedModel.images.length > 0 && selectedModel.images[0].image
      ? `data:image/jpeg;base64,${selectedModel.images[0].image}`
      : '/placeholder-image.jpg';
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className={styles.imageGallery}>
        <img
          src={getMainImage()}
          alt={product.title}
          className={styles.mainImage}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
      </div>

      <div className={styles.details}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>
          {selectedModel
            ? `${parseFloat(selectedModel.price).toLocaleString()} ₽`
            : 'Цена не указана'}
        </p>

        {/* Блок выбора модели (цвета) */}
        {product.models.length > 1 && (
          <div className={styles.section}>
            <h3>Цвета:</h3>
            <div className={styles.models}>
              {product.models.map(model => (
                <button
                  key={model.id}
                  className={`${styles.modelButton} ${
                    selectedModel?.id === model.id ? styles.selected : ''
                  }`}
                  onClick={() => {
                    setSelectedModel(model);
                    setSelectedSize(null); // Сбрасываем выбранный размер при смене модели
                  }}
                >
                  {model.color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Блок выбора размера */}
        {selectedModel && selectedModel.sizes.length > 0 && (
          <div className={styles.section}>
            <h3>Размеры:</h3>
            <div className={styles.sizes}>
              {selectedModel.sizes.map(sizeItem => (
                <button
                  key={sizeItem.size}
                  className={`${styles.size} ${
                    selectedSize === sizeItem.size ? styles.selected : ''
                  } ${sizeItem.stock <= 0 ? styles.outOfStock : ''}`}
                  onClick={() => setSelectedSize(sizeItem.size)}
                  disabled={sizeItem.stock <= 0}
                >
                  {sizeItem.size}
                  {sizeItem.stock <= 0 && <span className={styles.stockLabel}>Нет в наличии</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Описание товара */}
        <div className={styles.section}>
          <h3>Описание:</h3>
          <p className={styles.description}>{product.description}</p>
        </div>

        {/* Блок бренда */}
        {product.brand && (
          <div className={styles.brandSection}>
            <h3>Бренд:</h3>
            <div className={styles.brandInfo}>
              {product.brand.logo ? (
                <img
                  src={product.brand.logo}
                  alt={product.brand.name}
                  className={styles.brandLogo}
                />
              ) : (
                <span className={styles.brandName}>{product.brand.name}</span>
              )}
            </div>
          </div>
        )}

        {/* Кнопка добавления в корзину */}
        <button
          className={styles.addToCart}
          disabled={!selectedSize || !selectedModel}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductPage;