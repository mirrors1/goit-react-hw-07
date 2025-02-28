import AppBar from './AppBar/AppBar';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contactsOps';
import { useEffect } from 'react';

import Header from './Header/Header';
import Layout from './Layout/Layout';

import SearchBox from './SearchBox/SearchBox';
import { selectError, selectLoading } from '../redux/contactsSlice';
import { toast } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  // Отримуємо частини стану
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  // Викликаємо операцію
  useEffect(() => {
    //Встановлюємо abortController для відміни запиту на сервер
    const abortController = new AbortController();
    dispatch(fetchContacts(abortController.signal));

    //Налаштовуємо таймер для відміни запиту на сервер
    setTimeout(() => {
      abortController.abort();
    }, 6000); //якщо 6 секунд сервер не відповідає - відмінити запит

    //Якщо користувач перейшов на іншу сторінку... - відміняємо запит на сервер
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    toast.loading('Loading tasks...');
  }, [loading]);
  return (
    <Layout>
      <Header />
      <AppBar />
      <ContactForm />
      <SearchBox />
      {loading && <p>Loading tasks...</p>}
      {/* {error && <p>{error}</p>} */}

      {loading && !error && <b>Request in progress...</b>}
      <ContactList />
    </Layout>
  );
}

export default App;
