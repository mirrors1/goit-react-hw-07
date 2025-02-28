import { selectContactsCount } from '../../redux/contactsSlice';
import s from './ContactCounter.module.css';
import { useSelector } from 'react-redux';

export const ContactCounter = () => {
  // Отримуємо масив завдань із стану Redux
  const count = useSelector(selectContactsCount);

  return (
    <div className={s.list}>
      <p className={s.text}>Total: {count.total}</p>
      <p className={s.text}>Family: {count.family}</p>
      <p className={s.text}>Work: {count.work}</p>
      <p className={s.text}>Other: {count.other}</p>
    </div>
  );
};
