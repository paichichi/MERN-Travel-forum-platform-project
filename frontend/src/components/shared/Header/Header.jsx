import React from 'react';
import styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';
import palette from '../../../assets/theme/palette';
import RegisterBox from '../RegisterBox/Registerbox'
import logo from '../../../assets/images/logo.png'

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title}>
          <a href="/" className={styles.logo}>
            TRAVEL_FUNNY
          </a>
          <img src={logo} alt="Logo" className={styles.logoIamge} />
        </div>
        <div className={styles.menu}>
            <Navbar />          
        </div>
        <div className={styles.register}>
          <RegisterBox />
        </div>

      </div>

    </header>
  );
};

export default Header;
