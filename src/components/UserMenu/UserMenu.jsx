import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';
import { selectAuthUser } from '../../redux/auth/selectors';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.userMenu}>
      <p className={styles.userName}>Welcome, {user.name}</p>
      <button
        type="button"
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
