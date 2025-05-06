import { Link } from 'react-router-dom';
import styles from './CatalogCategoriesPage.module.css';

const categories = [
  {
    id: 1,
    name: 'Кроссовки и кеды',
    slug: 'sneakers',
    image: 'https://via.placeholder.com/300x200/1e293b/fff?text=Sneakers'
  },
    {
    id: 2,
    name: 'Ботинки',
    slug: 'bots',
    image: 'https://via.placeholder.com/300x200/1e293b/fff?text=Sneakers'
  },
    {
    id: 3,
    name: 'Полуботинки',
    slug: 'p',
    image: 'https://via.placeholder.com/300x200/1e293b/fff?text=Sneakers'
  },
    {
    id: 4,
    name: 'Сапоги',
    slug: 's',
    image: 'https://via.placeholder.com/300x200/1e293b/fff?text=Sneakers'
  }
  // Добавьте остальные категории позже
];

const CatalogCategoriesPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Категории обуви</h1>

      <div className={styles.categoriesGrid}>
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/catalog/${category.slug}`}
            className={styles.categoryCard}
          >
            <img
              src={category.image}
              alt={category.name}
              className={styles.categoryImage}
            />
            <h3 className={styles.categoryName}>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatalogCategoriesPage;