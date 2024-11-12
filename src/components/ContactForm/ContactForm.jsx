import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import style from './ContactForm.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .min(3, 'Too short!')
    .max(50, 'Too long!'),
  number: Yup.string()
    .required('Required')
    .min(3, 'Too short!')
    .max(50, 'Too long!'),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${values.name} is already in contacts.`);
    } else {
      dispatch(
        createContact({
          name: values.name,
          number: values.number,
        })
      );
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={style.form}>
        <div className={style.fieldContainer}>
          <label htmlFor={nameFieldId} className={style.label}>
            Name
          </label>
          <Field
            name="name"
            type="text"
            id={nameFieldId}
            className={style.input}
          />
          <ErrorMessage name="name" component="span" className={style.error} />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor={numberFieldId} className={style.label}>
            Number
          </label>
          <Field
            name="number"
            type="text"
            id={numberFieldId}
            className={style.input}
          />
          <ErrorMessage
            name="number"
            component="span"
            className={style.error}
          />
        </div>
        <button type="submit" className={style.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
