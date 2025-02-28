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
import Loader from './Loader/Loader';

import ScrollTop from './ScrollTop/ScrollTop';

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
  return (
    <Layout>
      <Header />
      <AppBar />
      <ContactForm />
      <SearchBox />
      {loading ? <Loader /> : <ContactList />}
      <ScrollTop />
    </Layout>
  );
}

export default App;
