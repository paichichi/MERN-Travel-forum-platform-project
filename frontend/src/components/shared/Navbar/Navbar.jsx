import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { AppContext } from '../../../service/contexts/context';

const Navbar = (props) => {
  const { user } = useContext(AppContext);
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <a className={styles.link} href="/">
            Home
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                alert('Please login first!');
                window.location.href = '/login';
              }
            }}
            className={styles.link}
            href="/travel/plan"
          >
            Travel
          </a>
        </li>
        <li>
          <a className={styles.link} href="/forum">
            Forum
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
