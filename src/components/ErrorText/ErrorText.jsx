import styles from './ErrorText.module.css';

const ErrorText = ({ children }) => (
  <div className={styles.errorText}>{children}</div>
);

export default ErrorText;
