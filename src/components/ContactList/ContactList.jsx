import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectVisibleContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  return (
    <div>
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
