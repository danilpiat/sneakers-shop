import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CatalogCategoriesPage.module.css';

interface Category {
  id: string;
  name: string;
  slug: string;
  level: number;
  parent_id: string | null;
  is_active: boolean;
  image: string | null;
}

const CatalogCategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let host = window.location.host;

        if (host === 'localhost:3000') {
          host = 'http://127.0.0.1:8000';
        }
        else {
          host = 'https://'.concat(host);
        }
        const response = await fetch(`${host}/api/categories/`);
        if (!response.ok) throw new Error('Ошибка загрузки категорий');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError('Не удалось загрузить категории. Попробуйте позже.');
        console.error('Ошибка загрузки категорий:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Группируем категории по родителям
  const groupedCategories: Record<string, Category[]> = {};
  const rootCategories: Category[] = [];

  categories.forEach(category => {
    if (category.level === 0) {
      rootCategories.push(category);
    } else if (category.parent_id) {
      if (!groupedCategories[category.parent_id]) {
        groupedCategories[category.parent_id] = [];
      }
      groupedCategories[category.parent_id].push(category);
    }
  });

  const handleCategoryClick = (categorySlug: string, categoryName: string) => {
  // Кодируем название категории для безопасной передачи в URL
  const encodedName = encodeURIComponent(categoryName);
  navigate(`/catalog?category=${categorySlug}&category_name=${encodedName}`);
};

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Категории</h1>
        {loading && <div className={styles.loading}>Загрузка категорий...</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && (
          <div className={styles.categoriesContainer}>
            {rootCategories.map(rootCategory => (
              <div key={rootCategory.id} className={styles.rootCategory}>
                <div className={styles.rootCategoryHeader}>
                  <h2
                    className={styles.rootCategoryTitle}
                    onClick={() => handleCategoryClick(rootCategory.slug, rootCategory.name)}
                  >
                    {rootCategory.name}
                  </h2>
                  <button
                    className={styles.showAllButton}
                    onClick={() => handleCategoryClick(rootCategory.slug, rootCategory.name)}
                  >
                    Показать все
                  </button>
                </div>

                {/* Особый случай для "Баскетбольные кроссовки" */}
                {rootCategory.slug === 'basketbolnye-krossovki' ? (
                  <div className={styles.mosaicContainer}>
                    <div className={styles.mosaicGrid}>
                      <div
                        className={styles.categoryCard}
                        onClick={() => handleCategoryClick(rootCategory.slug, rootCategory.name)}
                      >
                        {rootCategory.image ? (
                          <img
                            src={`data:image/jpeg;base64,${rootCategory.image}`}
                            alt={rootCategory.name}
                            className={styles.categoryImage}
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-image.jpg';
                            }}
                          />
                        ) : (
                          <div className={styles.categoryPlaceholder}>
                            {rootCategory.name.charAt(0)}
                          </div>
                        )}
                        <h3 className={styles.categoryName}>{rootCategory.name}</h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Стандартное отображение для других категорий
                  groupedCategories[rootCategory.id] && (
                    <div className={styles.mosaicContainer}>
                      <div className={styles.mosaicGrid}>
                        {groupedCategories[rootCategory.id]
                          .slice(0, 8)
                          .map(category => (
                            <div
                              key={category.id}
                              className={styles.categoryCard}
                              onClick={() => handleCategoryClick(category.slug, category.name)}
                            >
                              {category.image ? (
                                <img
                                  src={`data:image/jpeg;base64,${category.image}`}
                                  alt={category.name}
                                  className={styles.categoryImage}
                                  onError={(e) => {
                                    e.currentTarget.src = '/placeholder-image.jpg';
                                  }}
                                />
                              ) : (
                                <div className={styles.categoryPlaceholder}>
                                  {category.name.charAt(0)}
                                </div>
                              )}
                              <h3 className={styles.categoryName}>{category.name}</h3>
                            </div>
                          ))
                        }
                      </div>

                      {/* Кнопка "Показать все" для дочерних категорий */}
                      {groupedCategories[rootCategory.id].length > 8 && (
                        <button
                          className={styles.showAllChildButton}
                          onClick={() => handleCategoryClick(rootCategory.slug, rootCategory.name)}
                        >
                          Показать все
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogCategoriesPage;