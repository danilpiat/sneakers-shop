import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <div className={styles.container}>
      <h2>Контакты</h2>
      <p className={styles.description}>Мы всегда готовы помочь вам и ответить на любые вопросы.</p>

      <div className={styles.contactItem}>
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
    </div>
  );
};

export default ContactsPage;