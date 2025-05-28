import {Link, useLocation, useNavigate} from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCatalogClick = (e: React.MouseEvent) => {
    e.preventDefault(); // отменяем переход по ссылке по умолчанию

    if (location.pathname === '/catalog/categories') {
      // Уже на странице каталога — возвращаемся назад
      navigate(-1);
    } else {
      // Идём на страницу каталога
      navigate('/catalog/categories');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* Заменили Link на span с onClick */}
        <a
          href="/catalog/categories"
          className={styles.burgerButton}
          onClick={handleCatalogClick}
        >
          <span>☰</span> Каталог
        </a>
      </div>

      <div className={styles.centerSection}>
        <Link to="/" className={styles.logo}>
          SneakersShop
        </Link>
      </div>

      <div className={styles.rightSection}>
        <Link to="/cart" className={styles.cartButton}>
          <span>🛒</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
