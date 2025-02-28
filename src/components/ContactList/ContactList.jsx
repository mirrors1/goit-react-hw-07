import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectVisibleContacts } from '../../redux/contactsSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { FaRegFaceSadCry } from 'react-icons/fa6';

const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  return (
    <div>
      {visibleContacts.length > 0 ? (
        <ul className={s.list}>
          {visibleContacts.map(contact => (
            <li className={s.item} key={contact.id}>
              <Contact contact={contact} />
            </li>
          ))}
        </ul>
      ) : (
        <ErrorMessage>
          Sorry I did not find contacts ...
          <FaRegFaceSadCry className={s.icon} />
        </ErrorMessage>
      )}
    </div>
  );
};
export default ContactList;
