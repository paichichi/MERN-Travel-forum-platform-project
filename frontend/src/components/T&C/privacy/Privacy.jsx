import React from 'react';
import styles from './privacy.module.css';

const Privacy = () => {
  return (
    <div className={styles.privacyPolicy}>
      <h1 className={styles.privacyPolicyTitle}>Privacy Policy</h1>
      <p className={styles.privacyPolicyIntroduction}>
        We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information, as well as your rights regarding your data.
      </p>

      <h2 className={styles.privacyPolicySection}>Introduction</h2>
      <p>
        Our Privacy Policy applies to all users of our website and services. By using our platform, you agree to the collection and use of your information in accordance with this policy. If you have any questions or concerns, please contact us at bug.writer2023@gmail.com.
      </p>

      <h2 className={styles.privacyPolicySection}>Q&A</h2>
      <h3 className={styles.privacyPolicyQuestion}>What information do we collect?</h3>
      <p>
        We collect personal data that you voluntarily provide when you register for an account, fill out a form, or otherwise interact with our platform. This may include your name, email address, phone number, and other contact information. We may also collect non-personally identifiable information, such as browser type, operating system, and usage data.
      </p>

      <h3 className={styles.privacyPolicyQuestion}>How do we use your information?</h3>
      <p>
        We use your information to provide and improve our services, personalize your experience, communicate with you, and for marketing purposes. We may share your information with trusted third parties for the same purposes, but we will never sell your data.
      </p>

      <h3 className={styles.privacyPolicyQuestion}>How do we protect your information?</h3>
      <p>
        We implement a variety of security measures to maintain the safety of your personal data, including encryption and secure servers. While we strive to protect your information, we cannot guarantee its absolute security.
      </p>

      <h3 className={styles.privacyPolicyQuestion}>What are your rights?</h3>
      <p>
        You have the right to access, update, or delete your personal information at any time. To exercise these rights, please contact us at bug.writer2023@gmail.com.
      </p>

      <h2 className={styles.privacyPolicySection}>Other Information</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. It is your responsibility to review the policy periodically for any updates.
      </p>

      <p className={styles.privacyPolicyContact}>
        If you have any questions about our Privacy Policy, please contact us at bug.writer2023@gmail.com.
      </p>
    </div>
  );
};

export default Privacy;
