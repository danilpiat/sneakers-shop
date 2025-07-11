import { useState, useEffect, useRef  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
// import Pagination from '../../components/Pagination/Pagination';
import SortSelect from '../../components/SortSelect/SortSelect';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import styles from './CatalogPage.module.css';

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
  // Удаляем available_sizes
}

interface Filters {
  brands: string[];
  sizes: number[];
  minPrice: number;
  maxPrice: number;
  inStock: boolean; // Добавляем новое поле
}

const CatalogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [sortBy, setSortBy] = useState('default');
  const [filters, setFilters] = useState({
    brands: [] as string[],
    sizes: [] as number[],
    minPrice: 0,
    maxPrice: 100000,
    inStock: false, // Добавляем начальное значение
  });

  const [searchTerm, setSearchTerm] = useState('');


  const abortControllerRef = useRef<AbortController | null>(null);

  const pageSize = 30;

  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const categoryNameParam = queryParams.get('category_name');
  const decodedCategoryName = categoryNameParam
    ? decodeURIComponent(categoryNameParam)
    : null;

  const fetchBrands = async () => {
    try {
      let host = window.location.host;

      if (host === 'localhost:3000') {
          host = 'http://127.0.0.1:8000';
        }
        else {
          host = 'https://'.concat(host);
        }
      const response = await fetch(`${host}/api/brands/`);
      if (!response.ok) throw new Error('Ошибка загрузки брендов');
      const data = await response.json();
      setBrands(data);
    } catch (err) {
      console.error('Ошибка загрузки брендов:', err);
    }
  };

   const fetchProducts = async () => {
    // Отменяем предыдущий запрос
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('page_size', pageSize.toString());

      // Добавляем категорию, если она есть
      if (categoryParam) {
        params.append('category', categoryParam);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      if (sortBy !== 'default') {
        if (sortBy === 'price_asc') params.append('ordering', 'base_price');
        if (sortBy === 'price_desc') params.append('ordering', '-base_price');
        if (sortBy === 'name') params.append('ordering', 'title');
      }

      if (filters.brands.length > 0) {
        filters.brands.forEach(brand => params.append('brand', brand));
      }
      if (filters.sizes.length > 0) {
        filters.sizes.forEach(size => params.append('size', size.toString()));
      }
      if (filters.inStock) {
        params.append('in_stock', 'true');
        }

      params.append('min_price', filters.minPrice.toString());
      params.append('max_price', filters.maxPrice.toString());

      let host = window.location.host;

      if (host === 'localhost:3000') {
          host = 'http://127.0.0.1:8000';
        }
        else {
          host = 'https://'.concat(host);
        }
      const response = await fetch(
        `${host}/api/products/?${params.toString()}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error('Ошибка загрузки товаров');
      }

      const data = await response.json();
      setProducts(data);
      // setTotalItems(data.length);
    } catch (err) {
      // Игнорируем ошибки отмены запроса
      setError('Не удалось загрузить товары. Попробуйте позже.');
      console.error('Ошибка загрузки товаров:', err);
    } finally {
      // Сбрасываем контроллер только если это текущий запрос
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

   useEffect(() => {
    // Сбрасываем страницу при изменении категории
    setCurrentPage(1);
  }, [categoryParam]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Отменяем запрос при размонтировании
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentPage, sortBy, filters, categoryParam, searchTerm]);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: Filters) => {
  setFilters(newFilters);
  setCurrentPage(1);
  setSearchTerm(''); // Сбрасываем поиск при изменении фильтров
};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {decodedCategoryName ? `Категория: \n ${decodedCategoryName}` : ''}
      </h1>

      <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button
              className={styles.clearSearchButton}
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>

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
              {/*<Pagination*/}
              {/*  currentPage={currentPage}*/}
              {/*  totalItems={totalItems}*/}
              {/*  pageSize={pageSize}*/}
              {/*  onPageChange={setCurrentPage}*/}
              {/*/>*/}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CatalogPage;