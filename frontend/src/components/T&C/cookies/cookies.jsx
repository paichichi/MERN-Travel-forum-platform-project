import React from 'react';
import styles from './cookies.module.css';

const Cookies = () => {
  return (
    <div className={styles.cookiesPolicy}>
      <h1 className={styles.cookiesPolicyTitle}>Cookies Policy</h1>
      <p className={styles.cookiesPolicyIntroduction}>
        Our Cookies Policy explains what cookies are, how we use cookies, your choices regarding cookies, and further information about cookies.
      </p>

      <h2 className={styles.cookiesPolicySection}>What are cookies?</h2>
      <p>
        Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and the website more useful to you.
      </p>

      <h2 className={styles.cookiesPolicySection}>How we use cookies</h2>
      <p>
        When you use and access our website, we may place a number of cookies files in your web browser. We use cookies for the following purposes: to enable certain functions of the website, to provide analytics, to store your preferences, and to enable advertisements delivery, including behavioral advertising.
      </p>

      <h2 className={styles.cookiesPolicySection}>Your choices regarding cookies</h2>
      <p>
        If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
      </p>

      <h2 className={styles.cookiesPolicySection}>More information about cookies</h2>
      <p>
        You can learn more about cookies and the following third-party websites:
        <ul>
          <li>
            <a href="https://www.allaboutcookies.org/" className={styles.cookiesLink}>
              All About Cookies
            </a>
          </li>
          <li>
            <a href="https://www.networkadvertising.org/" className={styles.cookiesLink}>
              Network Advertising Initiative
            </a>
          </li>
        </ul>
      </p>

      <p className={styles.cookiesPolicyContact}>
        If you have any questions about our Cookies Policy, please contact us at cookies@example.com.
      </p>
    </div>
  );
};

export default Cookies;
