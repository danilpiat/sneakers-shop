import { useCart } from '../contexts/CartContext';
import styles from './CartPage.module.css';
import { useEffect } from 'react'; // Импортируем useEffect
import { retrieveRawInitData } from '@telegram-apps/sdk';

const CartPage = () => {
  const { state, dispatch } = useCart();

  const totalAmount = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready(); // Сообщаем Telegram, что приложение готово
      tg.expand(); // Раскрываем приложение на весь экран
    }
  }, []);


  // Функция отправки данных корзины в Telegram
  const sendCartDataToTelegram = () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      alert('Ошибка: Telegram WebApp не инициализирован');
      return;
    }

    const initDataRaw = retrieveRawInitData();

    // Формируем данные корзины в формате JSON
    const cartData = {
      items: state.items.map(item => ({
        id: item.id,
        title: item.title,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        isPreOrder: item.isPreOrder,
        modelId: item.modelId,
        productId: item.productId
      })),
      totalAmount: totalAmount,
      timestamp: Date.now(),
      initData: initDataRaw
    };

    // Отправляем данные в бота
    tg.sendData(JSON.stringify(cartData));

    // Очищаем корзину после отправки
    dispatch({ type: 'CLEAR_CART' });

    const showTelegramAlert = (message: string, callback?: () => void) => {
      // Проверяем доступность метода
      if (tg && typeof tg.showPopup === 'function') {
        tg.showPopup({
          title: 'Уведомление',
          message: message,
          buttons: [{ type: 'ok' }]
        }, callback);
      } else if (tg && typeof tg.showAlert === 'function') {
        // Для версий, поддерживающих showAlert
        tg.showAlert(message, callback);
      } else {
        // Fallback для старых версий
        alert(message);
        if (callback) callback();
      }
    };
    // Показываем уведомление и закрываем приложение
    showTelegramAlert('✅ Заказ успешно отправлен!', () => {
    if (tg) {
      tg.close();
    }
  });
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
                 className={styles.telegramButton}
                onClick={sendCartDataToTelegram}
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