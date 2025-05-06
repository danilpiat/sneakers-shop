import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import SearchInput from '../../components/SearchInput/SearchInput';
import styles from './CatalogPage.module.css';

// Интерфейс для товара
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  sizes: number[];
  colors: string[];
  category: string;
  description: string;

}

const CatalogPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 30;

  // Моковые данные товаров
  const [products] = useState<Product[]>(
    Array.from({ length: 90 }, (_, i) => ({
      id: i + 1,
      title: `Кроссовки ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 1000,
      image: 'https://via.placeholder.com/200x200',
      sizes: [39, 40, 41, 42, 43],
      colors: ['#000000', '#FFFFFF', '#FF0000'],
      category: 'sneakers', // Добавили категорию
      description: 'Описание1' // Добавили категорию
    }))
  );

  // Фильтрация и пагинация
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Сброс пагинации при изменении поискового запроса
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
  <div className={styles.container}>
    {/* Поисковая строка */}
    <div className={styles.searchWrapper}>
      <div className={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e)}
          placeholder="Поиск по каталогу..."
        />
      </div>

      {/* Кнопка категорий */}
      <button
        className={styles.catalogButton}
        onClick={() => navigate('/catalog/')}
      >
        Категории
      </button>
    </div>

    {/* Сетка товаров */}
    <div className={styles.productsGrid}>
      {paginatedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

    {/* Пагинация */}
    <Pagination
      currentPage={currentPage}
      totalItems={filteredProducts.length}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
    />
  </div>
);
};

export default CatalogPage;