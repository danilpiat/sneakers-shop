import styles from './PaymentPage.module.css';

const PaymentPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>Доставка</h2>

        <h3>✅ Товары в наличии:</h3>
        <ul className={styles.list}>
          <li>
            <strong>Самовывоз в Москве:</strong>
            <p>Адрес: ул. Ленинский проспект, 131.</p>
          </li>
          <li>
            <strong>Курьерская доставка по Москве:</strong>
            <p>Отправляем через Яндекс Доставку или Достависту.</p>
            <p>Оплата производится сразу.</p>
          </li>
          <li>
            <strong>Доставка по России:</strong>
            <p>Доступные службы: Почта России, Яндекс Доставка, Боксберри, СДЭК.</p>
          </li>
        </ul>

        <h3>🚚 Товары под заказ:</h3>
        <ul className={styles.list}>
          <li>
            <strong>Обычная доставка (3-4 недели):</strong>
            <p>Цена доставки уже включена в стоимость товара.</p>
          </li>
          <li>
            <strong>Экспресс доставка самолетом до Москвы (6-10 дней):</strong>
            <p>Доплата: 3000 ₽ за одну пару обуви (для других товаров уточняйте у менеджера).</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Оплата</h2>
        <ul className={styles.list}>
          <li>
            <strong>Товары в наличии:</strong>
            <p>Наличными при получении или переводом на карту.</p>
          </li>
          <li>
            <strong>Товары под заказ:</strong>
            <p>Оплачиваются сразу переводом на карту.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PaymentPage;