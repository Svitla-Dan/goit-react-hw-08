import { Toaster } from 'react-hot-toast';
import AppBar from '../AppBar/AppBar';
import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <AppBar />
    <main>{children}</main>
    <Toaster />
  </div>
);

export default Layout;
