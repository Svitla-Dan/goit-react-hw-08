import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import styles from './Navigation.module.css';

const getNavLinkClass = ({ isActive }) =>
  clsx(styles.link, isActive && styles.activeLink);

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={getNavLinkClass}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
