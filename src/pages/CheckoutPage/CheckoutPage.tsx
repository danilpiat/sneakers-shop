import { useLocation } from 'react-router-dom';
import styles from './CheckoutPage.module.css';

interface OrderItem {
  id: string;
  title: string;
  size: number;
  color: string;
  price: number;
  quantity: number;
  isPreOrder: boolean;
  stock?: number;
  modelId: string;
  productId: string;
}

const CheckoutPage = () => {
  const location = useLocation();
  const orderItems: OrderItem[] = location.state?.items || [];
  const totalAmount = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (orderItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Оформление заказа</h1>
        <p className={styles.emptyMessage}>Нет данных о заказе</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Чек заказа</h1>

      <div className={styles.orderInfo}>
        <p className={styles.infoLine}>Дата: {new Date().toLocaleDateString()}</p>
        <p className={styles.infoLine}>Время: {new Date().toLocaleTimeString()}</p>
        <p className={styles.infoLine}>Номер заказа: #{Math.floor(Math.random() * 10000)}</p>
      </div>

      <div className={styles.itemsHeader}>
        <div className={styles.itemName}>Товар</div>
        <div className={styles.itemDetails}>Характеристики</div>
        <div className={styles.itemPrice}>Цена</div>
        <div className={styles.itemQuantity}>Кол-во</div>
        <div className={styles.itemTotal}>Сумма</div>
      </div>

      {orderItems.map((item) => (
        <div key={item.id} className={styles.orderItem}>
          <div className={styles.itemName}>
            {item.title}
            {item.isPreOrder && <span className={styles.preOrderBadge}>ПОД ЗАКАЗ</span>}
          </div>

          <div className={styles.itemDetails}>
            <p>Цвет: {item.color}</p>
            <p>Размер: {item.size}</p>
            <p>ID модели: {item.modelId}</p>
            <p>ID товара: {item.productId}</p>
            {item.stock !== undefined && <p>Остаток: {item.stock}</p>}
          </div>

          <div className={styles.itemPrice}>{item.price} руб.</div>

          <div className={styles.itemQuantity}>{item.quantity}</div>

          <div className={styles.itemTotal}>{(item.price * item.quantity).toFixed(2)} руб.</div>
        </div>
      ))}

      <div className={styles.summary}>
        <div className={styles.totalLine}>
          <span>Итого:</span>
          <span>{totalAmount.toFixed(2)} руб.</span>
        </div>
      </div>

      <div className={styles.footer}>
        <p>Спасибо за ваш заказ!</p>
        <p>С вами свяжутся для подтверждения деталей доставки</p>
      </div>
    </div>
  );
};

export default CheckoutPage;