import AppBar from './AppBar/AppBar';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contactsOps';
import { useEffect } from 'react';

import Header from './Header/Header';
import Layout from './Layout/Layout';

import SearchBox from './SearchBox/SearchBox';

function App() {
  // const dispatch = useDispatch();
  // Отримуємо частини стану
  // const { items, loading, error } = useSelector(state => state.contacts);

  // Викликаємо операцію
  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  return (
    <Layout>
      <Header />
      <AppBar />
      <ContactForm />
      <SearchBox />
      <ContactList />
      {/* {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {loading && !error && <b>Request in progress...</b>}
      <p>{items.length > 0 && JSON.stringify(items, null, 2)}</p> */}
    </Layout>
  );
}

export default App;
