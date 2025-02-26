import { useEffect } from 'react';
import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contactsOps';
import { selectNameFilter, selectStatusFilter } from '../../redux/filtersSlice';
import {
  selectContacts,
  selectError,
  selectLoading,
  selectVisibleContacts,
} from '../../redux/contactsSlice';

const getFilterStatusContacts = (contacts, statusFilter) => {
  switch (statusFilter) {
    case 'family':
      return contacts.filter(contacts => contacts.group === 'family');
    case 'work':
      return contacts.filter(contacts => contacts.group === 'work');
    case 'other':
      return contacts.filter(
        contacts => contacts.group !== 'family' && contacts.group !== 'work'
      );
    default:
      return contacts;
  }
};

// const ContactList = ({ contacts, onDelete }) => (
const ContactList = () => {
  const dispatch = useDispatch();
  // Отримуємо масив контактів, статус завантаження та помилку із стану Redux
  // const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  // Викликаємо операцію
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //Отримуємо значення фільтра status із стану Redux
  // const statusFilter = useSelector(selectStatusFilter);
  //Отримуємо значення фільтра пошуку по імені із стану Redux
  // const nameFilter = useSelector(selectNameFilter);
  //Обчислюємо масив контактів, відфільтрованими по статусу
  // const сontactsFilterStatus = getFilterStatusContacts(contacts, statusFilter);
  // const сontactsFilterStatus = useSelector(getFilterStatusContacts);
  //Обчислюємо масив контактів, які необхідно відображати в інтерфейсі
  // const visibleContacts = сontactsFilterStatus.filter(contact =>
  //   contact.name.toLowerCase().includes(nameFilter.toLowerCase().trim())
  // );
  const visibleContacts = useSelector(selectVisibleContacts);
  return (
    <div>
      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {loading && !error && <b>Request in progress...</b>}
      {visibleContacts.length > 0 && (
        <ul className={s.list}>
          {visibleContacts.map(contact => (
            <li className={s.item} key={contact.id}>
              <Contact contact={contact} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ContactList;
