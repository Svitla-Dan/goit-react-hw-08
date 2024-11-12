import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './AuthNav.module.css';

const getAuthNavLinkClass = ({ isActive }) =>
  clsx(styles.link, isActive && styles.activeLink);

const AuthNav = () => (
  <div className={styles.authNav}>
    <NavLink to="/register" className={getAuthNavLinkClass}>
      Register
    </NavLink>
    <NavLink to="/login" className={getAuthNavLinkClass}>
      Login
    </NavLink>
  </div>
);

export default AuthNav;
