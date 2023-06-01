import React, { useContext, useState } from "react";
import { AppContext } from "../../service/contexts/context";
import styles from "./signup.module.css";

const SignUp = () => {
  const { signup } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password, confirmPassword, setErrorMessage);
  };

  return (
    <>
    <div className={styles.left}>
      <img src="https://res.cloudinary.com/hcti/image/fetch/c_limit,f_auto,q_auto:good,w_800/https://docs.htmlcsstoimage.com/assets/images/cat.png" alt="travel" className={styles.img} />
    </div>
    <div className={styles.right}>
    <form onSubmit={handleSubmit} className={styles.main}>
      <h2 className={styles.title}>Get started now!</h2>
      <p className={styles.subtitle}>
        <i>Enter detail to create your account</i>
      </p>
      <label className={styles.ulabel} htmlFor="username">
        userame:
      </label>
      <input
        className={styles.uinput}
        type="text"
        id="name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label className={styles.plabel} htmlFor="password">
        password:
      </label>
      <input
        className={styles.pinput}
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label className={styles.cplabel} htmlFor="confirm-password">
        confirm Password:
      </label>
      <input
        className={styles.cpinput}
        type="password"
        id="confirm-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <button type="submit" className={styles.btn}>
        Sign Up
      </button>
      <div className={styles.lower}>
        <p className={styles.lowerp}>Already have account?</p>
        <a href="/login" className={styles.lowera}>
          Sign in to account
        </a>
      </div>
    </form>

    </div>
    </>
  );
};

export default SignUp;
