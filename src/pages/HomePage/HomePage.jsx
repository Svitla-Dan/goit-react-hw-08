import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Contact Manager</h1>
      <p className={styles.subtitle}>
        Manage your contacts easily and securely.
      </p>
    </div>
  );
};

export default HomePage;
