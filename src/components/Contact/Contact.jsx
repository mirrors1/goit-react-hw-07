import { FaUserLarge, FaPhone, FaUserGroup } from 'react-icons/fa6';
import { IconContext } from 'react-icons';
import s from './Contact.module.css';
//Імпортуємо хук
import { useDispatch } from 'react-redux';
//Імпортуємо фабрику екшену
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ contact: { id, name, number, group } }) {
  //Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();

  const iconDataValue = {
    className: 'global-class-name-icon',
    size: '18px',
  };

  // Викликаємо фабрику екшену та передаємо ідентифікатор завдання
  // Відправляємо результат - екшен видалення завдання
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };
  return (
    <>
      <div className={s.contact}>
        <div className={s.containerTitle}>
          <IconContext.Provider value={iconDataValue}>
            <FaUserLarge className={s.icon} />
          </IconContext.Provider>
          <p className={s.name}>{name}</p>
        </div>
        <div className={s.containerPhone}>
          <IconContext.Provider value={iconDataValue}>
            <FaPhone className={s.icon} />
          </IconContext.Provider>
          <a className={s.phone} href={'tel:' + number}>
            {number}
          </a>
        </div>
        <div className={s.containerPhone}>
          <IconContext.Provider value={iconDataValue}>
            <FaUserGroup className={s.icon} />
          </IconContext.Provider>
          <p className={s.group}>{group}</p>
        </div>
      </div>
      {/* <button className={s.btn} onClick={() => onDelete(id)}></button> */}
      <button className={s.btn} onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
