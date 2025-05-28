import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link to="/catalog/categories" className={styles.burgerButton}>
          <span>☰</span> Каталог
        </Link>
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