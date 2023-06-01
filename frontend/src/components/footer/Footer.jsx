import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import styles from './Footer.module.css';

import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import google from '../../assets/images/google.png';
import instagram from '../../assets/images/instagram.png';
import linkedin from '../../assets/images/linkedin.png';
import github from '../../assets/images/github.png';
import company from '../../assets/images/company.png';
import home from '../../assets/images/home.png';
import phone from '../../assets/images/phone.png';
import email from '../../assets/images/email.png';
import printing from '../../assets/images/printing.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.section}>
        <div className={styles.networkText}>
          <span>Get connected with us on social networks:</span>
        </div>

        <div className={styles.socialIcons}>
          <a href='' className={styles.socialIconList}>
            <img src={facebook} alt="facebook" />
          </a>
          <a href='' className={styles.socialIconList}>
            <img src={twitter} alt="twitter" />
          </a>
          <a href='' className={styles.socialIconList}>
            <img src={google} alt="google" />
          </a>
          <a href='' className={styles.socialIconList}>
            <img src={instagram} alt="instagram" />
          </a>
          <a href='' className={styles.socialIconList}>
            <img src={linkedin} alt="linkedin" />
          </a>
          <a href='' className={styles.socialIconList}>
            <img src={github} alt="github" />
          </a>
        </div>
      </section>

      <section className={styles.mainContainer}>
        <div className={styles.subContainer}>
            <div className={styles.companyContainer}>
              <h6 className={styles.companyName}>
                <img src={company} alt="company" />
                TRAVEL_FUNNY
              </h6>
              <p>
              Guarantee your travel safety, travel freedom, simple tracking and customized recommendations.
              </p>
            </div>

            <div className={styles.serviceContainer}>
              <h6 className={styles.serviceTitle}>About Us</h6>
              <p>
                <a href='/forum' className={styles.services}>
                    Forums
                </a>
              </p>
              <p>
                <a href='/travel/plan' className={styles.services}>
                   Planning
                </a>
              </p>
            </div>

            <div className={styles.usefulLinkContainer}>
              <h6 className={styles.usefulLinkTitle}>Terms and Conditions</h6>
              <p>
                <a href='/privacy' className={styles.useLink}>
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href='/cookies' className={styles.useLink}>
                  Cookies Policy
                </a>
              </p>
            </div>

            <div className={styles.companyDetailsContainer}>
              <h6 className={styles.contactTitle}>Contact</h6>
              <p>
                <img src={home} alt='home' className={styles.companyDetails}/>
                Auckland, New Zealand
              </p>
              <p>
                <img src={email} alt='email' className={styles.companyDetails}/>
                bug.writer2023@gmail.com
              </p>
              <p>
                <img src={phone} alt='phone' className={styles.companyDetails}/>
                 + 123 255 0123
              </p>
              <p>
                <img src={printing} alt='printing' className={styles.companyDetails}/>
                + 9924 123 07
              </p>
            </div>
        </div>
      </section>

      <div className={styles.copyright}>
        © 2023 Copyright:
        <a className={styles.copyrightLink} href='https://www.youtube.com/watch?v=kJQP7kiw5Fk'>
          Travel_Funny.com
        </a>
      </div>
    </footer>
  );
}