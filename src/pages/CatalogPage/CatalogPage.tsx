import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import SortSelect from '../../components/SortSelect/SortSelect';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import styles from './CatalogPage.module.css';

// Интерфейсы для типизации
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  base_price: number;
  description: string;
  brand: Brand;
  main_image?: {
    image: string;
    is_main: boolean;
  };
  available_sizes: number[];
}

interface Filters {
  brands: string[];
  sizes: number[];
  minPrice: number;
  maxPrice: number;
}

const CatalogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [sortBy, setSortBy] = useState('default');
  const [filters, setFilters] = useState({
    brands: [] as string[],
    sizes: [] as number[],
    minPrice: 0,
    maxPrice: 10000,
  });

  const pageSize = 30;

  // Получение брендов
  const fetchBrands = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/brands/');
      if (!response.ok) throw new Error('Ошибка загрузки брендов');
      const data = await response.json();
      setBrands(data);
    } catch (err) {
      console.error('Ошибка загрузки брендов:', err);
    }
  };

  // Получение товаров
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Формируем параметры запроса
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('page_size', pageSize.toString());

      // Добавляем параметры сортировки
      if (sortBy !== 'default') {
        if (sortBy === 'price_asc') params.append('ordering', 'base_price');
        if (sortBy === 'price_desc') params.append('ordering', '-base_price');
        if (sortBy === 'name') params.append('ordering', 'title');
      }

      // Добавляем фильтры
      if (filters.brands.length > 0) {
        filters.brands.forEach(brand => params.append('brand', brand));
      }
      if (filters.sizes.length > 0) {
        filters.sizes.forEach(size => params.append('size', size.toString()));
      }
      params.append('min_price', filters.minPrice.toString());
      params.append('max_price', filters.maxPrice.toString());

      // Добавляем категорию из URL, если есть
      // const categorySlug = new URLSearchParams(location.search).get('category');
      // if (categorySlug) {
      //   params.append('category', categorySlug);
      // }

      const response = await fetch(`http://127.0.0.1:8000/api/products/?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Ошибка загрузки товаров');
      }

      const data = await response.json();
      setProducts(data);
      setTotalItems(data.length);
    } catch (err) {
      setError('Не удалось загрузить товары. Попробуйте позже.');
      console.error('Ошибка загрузки товаров:', err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка данных при монтировании и изменении параметров
  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortBy, filters, location.search]);

  // Обработчики
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: Filters) => {
  setFilters(newFilters);
  setCurrentPage(1);
};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Каталог кроссовок</h1>

      {/* Фильтры и сортировка */}
      <div className={styles.controls}>
        <FilterPanel
          filters={filters}
          brands={brands}
          onFilterChange={handleFilterChange}
        />
        <SortSelect
          currentSort={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Загрузка и ошибки */}
      {loading && <div className={styles.loading}>Загрузка товаров...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {/* Сетка товаров */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className={styles.noResults}>Товары не найдены</div>
          ) : (
            <>
              <div className={styles.productsGrid}>
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                ))}
              </div>

              {/* Пагинация */}
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CatalogPage;