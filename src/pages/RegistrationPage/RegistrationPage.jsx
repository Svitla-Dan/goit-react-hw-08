import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={styles.registrationContainer}>
      <h1 className={styles.pageTitle}>Create Your Account</h1>
      <p className={styles.description}>
        Please fill in the details below to create a new account.
      </p>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
