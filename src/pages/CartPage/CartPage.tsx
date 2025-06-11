import { useCart } from '../contexts/CartContext';
import styles from './CartPage.module.css';

const CartPage = () => {
  const { state, dispatch } = useCart();

  const totalAmount = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Заглушка для оформления заказа
    alert('Заказ оформлен! Спасибо за покупку!');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>

      {state.items.length === 0 ? (
        <p className={styles.emptyMessage}>Ваша корзина пуста</p>
      ) : (
        <>
          <div className={styles.itemsContainer}>
            {state.items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDetail}>Цвет: {item.color}</p>
                  <p className={styles.itemDetail}>Размер: {item.size}</p>
                  <p className={styles.itemDetail}>Цена: {item.price} руб.</p>
                  {item.isPreOrder && (
                    <span className={styles.preOrderBadge}>Под заказ</span> // <- новая плашка
                  )}
                </div>

                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: item.quantity - 1 }
                      })
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: item.quantity + 1 }
                      })
                    }
                    disabled={item.quantity >= 100}
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemSubtotal}>
                  Сумма: {(item.price * item.quantity).toFixed(2)} руб.
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.totalAmount}>
              Итого: {totalAmount.toFixed(2)} руб.
            </h2>
            <div className={styles.actions}>
              <button
                className={styles.clearButton}
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Очистить корзину
              </button>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;