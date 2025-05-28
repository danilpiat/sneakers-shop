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
}

interface CategoryNode extends Category {
  children: CategoryNode[];
}

const CatalogCategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories/');
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

  const buildCategoryTree = (categories: Category[]): CategoryNode[] => {
    const map = new Map<string, CategoryNode>();
    const tree: CategoryNode[] = [];
    categories.forEach(category => {
      map.set(category.id, { ...category, children: [] });
    });
    categories.forEach(category => {
      const node = map.get(category.id);
      if (node) {
        if (category.parent_id) {
          const parent = map.get(category.parent_id);
          if (parent) parent.children.push(node);
        } else {
          tree.push(node);
        }
      }
    });
    return tree;
  };

  const categoryTree = buildCategoryTree(categories);

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/catalog?category=${categorySlug}`);
  };

  const renderCategoryTree = (categories: CategoryNode[], level = 0) => {
    return categories.map(category => (
      <div key={category.id} className={styles.categoryTreeItem}>
        <div className={styles.categoryCard}>
          <div
            className={styles.categoryContent}
            onClick={() => handleCategoryClick(category.slug)}
          >
            <div className={styles.categoryPlaceholder}>
              {category.name.charAt(0)}
            </div>
            <h3 className={styles.categoryName}>{category.name}</h3>
          </div>

          {category.children.length > 0 && (
            <button
              className={styles.showAllButton}
              onClick={() => handleCategoryClick(category.slug)}
            >
              Показать все
            </button>
          )}
        </div>

        {category.children.length > 0 && (
          <div
            className={styles.childrenContainer}
            style={{ marginLeft: `${level * 20}px` }}
          >
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Категории обуви</h1>
        {loading && <div className={styles.loading}>Загрузка категорий...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && (
          <div className={styles.categoryTree}>
            {renderCategoryTree(categoryTree)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogCategoriesPage;