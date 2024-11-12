import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';
import ErrorText from '../ErrorText/ErrorText';
import styles from './RegistrationForm.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must not exceed 50 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const handleSubmit = (values, { resetForm }) => {
    dispatch(registerUser(values));
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.form} autoComplete="off">
            {authError && <ErrorText>{authError}</ErrorText>}
            <label className={styles.label}>
              Name
              <Field name="name" type="text" className={styles.input} />
              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />
            </label>
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
            <button type="submit" className={styles.button}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
