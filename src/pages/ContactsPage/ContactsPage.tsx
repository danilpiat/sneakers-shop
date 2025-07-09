import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <div className={styles.container}>
      <h2>Контакты</h2>

      <p className={styles.paragraph}>
        Мы всегда готовы помочь вам и ответить на любые вопросы.
      </p>

      <p className={styles.paragraph}>
        Если вы не нашли нужный товар на сайте, это не значит, что он недоступен для заказа.
        Вы можете отправить менеджеру фото или название товара, а также свои предпочтения, и с высокой вероятностью мы сможем привезти его для вас по выгодной цене.
      </p>

      <div className={styles.contactBlock}>
        <strong>Менеджер:</strong>
        <a
          href="https://t.me/Manager_sneakerstore"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.telegramLink}
        >
          @Manager_sneakerstore
        </a>
      </div>

      <div className={styles.warning}>
        <strong>Внимание!</strong>
        <p>
          Если вы зашли на наш сайт без использования телеграм-бота, ваш заказ не будет виден менеджеру.
          Пожалуйста, оформите заказ через нашего бота.
        </p>
        <a
          href="https://t.me/test_bot_sneakers_culture_bot"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.botLink}
        >
          Перейти к боту
        </a>
      </div>
    </div>
  );
};

export default ContactsPage;
