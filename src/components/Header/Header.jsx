import { RiContactsBookFill } from 'react-icons/ri';
import s from './Header.module.css';
const Header = () => {
  return (
    <h1 className={s.title}>
      <RiContactsBookFill className={s.icon} />
      Phonebook
    </h1>
  );
};
export default Header;
