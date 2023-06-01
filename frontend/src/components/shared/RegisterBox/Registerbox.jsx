import React, { useState, useEffect } from 'react';
import styles from './Registerbox.module.css';

const Registerbox = (props) => {
  const [user, setUser] = useState({});

  function log_out(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  }

  function redirect(event) {
    event.preventDefault();
    window.location.href = `/profile/${user.id}`;
  }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [localStorage.getItem('user')]);

  return (
    <div className={styles.registerbox}>
      <ul>
        {localStorage.getItem('user') ? (
          <>
            <li
              style={{
                backgroundColor: '#84A98C',
                borderRadius: 4,
                padding: 3,
              }}
            >
              <a style={{ color: 'white' }} href="/" onClick={log_out}>
                Log out
              </a>
            </li>
            <li>
              <a style={{ marginTop: 3 }} href="/" onClick={redirect}>
                {'@' + user.username}
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login">Login</a>
            </li>
            <li
              style={{
                backgroundColor: '#84A98C',
                borderRadius: 4,
                padding: 3,
              }}
            >
              <a href="/signup" style={{ color: 'white' }}>
                Sign Up
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Registerbox;
