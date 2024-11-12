import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Loader from '../../components/Loader/Loader';
import ErrorText from '../../components/ErrorText/ErrorText';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import style from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>Phonebook</h2>
      <ContactForm />
      <SearchBox />
      {loading && <Loader />}
      {error && <ErrorText>{error}</ErrorText>}
      {!error && !loading && <ContactList />}
    </div>
  );
};

export default ContactsPage;
