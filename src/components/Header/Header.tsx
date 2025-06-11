import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useCart } from '../../pages/contexts/CartContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useCart();

  const cartItemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  const handleCatalogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/catalog/categories') {
      navigate(-1);
    } else {
      navigate('/catalog/categories');
    }
  };

  const goToPayment = () => navigate('/payment');
  const goToContacts = () => navigate('/contacts');

  return (
    <header className={styles.header}>
      {/* Первая строка - название магазина */}
      <div className={styles.topRow}>
        <Link to="/" className={styles.storeName}>
          «SNEAKER CULTURE STORE»
        </Link>
      </div>

      {/* Вторая строка - кнопки оплаты и контактов */}
      <div className={styles.middleRow}>
        <button className={styles.infoButton} onClick={goToPayment}>
          Оплата
        </button>
        <button className={styles.infoButton} onClick={goToContacts}>
          Контакты
        </button>
      </div>

      {/* Третья строка - каталог и корзина */}
      <div className={styles.bottomRow}>
        <div className={styles.leftSection}>
          <a
            href="/catalog/categories"
            className={styles.burgerButton}
            onClick={handleCatalogClick}
          >
            <span>☰</span> Каталог
          </a>
        </div>

        <div className={styles.rightSection}>
          <Link to="/cart" className={styles.cartButton}>
            <span>🛒</span>
            {cartItemCount > 0 && (
              <span className={styles.cartBadge}>{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;