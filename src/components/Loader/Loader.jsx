import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <ThreeDots color="#337ab7" />
    </div>
  );
};
export default Loader;
