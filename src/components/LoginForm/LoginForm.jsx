import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../redux/auth/operations';
import { selectAuthError, selectIsLoading } from '../../redux/auth/selectors';
import styles from './LoginForm.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(loginUser(values));
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.form}>
            <label className={styles.label}>
              Email
              <Field name="email" type="email" className={styles.input} />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.error}
              />
            </label>
            <label className={styles.label}>
              Password
              <Field name="password" type="password" className={styles.input} />
              <ErrorMessage
                name="password"
                component="span"
                className={styles.error}
              />
            </label>
            {authError && <div className={styles.error}>{authError}</div>}
            <button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
