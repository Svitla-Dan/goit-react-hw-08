import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.pageTitle}>Access Your Account</h1>
      <p className={styles.description}>
        Please enter your login details to access your contacts.
      </p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
