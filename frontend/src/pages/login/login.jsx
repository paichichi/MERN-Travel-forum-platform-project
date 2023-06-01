import React, { useContext, useState } from "react";
import styles from "./login.module.css";
import { AppContext } from "../../service/contexts/context";

const Login = () => {
  const { login } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password, setErrorMessage);
  };

  return (
    <>
    <div className={styles.left}>
      <img src="https://www.lunapic.com/editor/premade/transparent.gif" alt="travel" className={styles.img} />
    </div>
    <div className={styles.right}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Welcome back!</h2>
        <p className={styles.subtitle}>
          <i>Continue with your credentials</i>
        </p>
        <div className={styles.inputdiv}>
          <label className={styles.ulabel} htmlFor="username">
            username:
          </label>
          <input
            type="username"
            className={styles.uinputs}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={styles.plabel} htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            className={styles.pinputs}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
  
          <button className={styles.btn} type="submit">
            Log in
          </button>
          <div className={styles.bot}>
            <p className={styles.ask}>Don't have account yet?</p>
            <a className={styles.anchor} href="/signup">
              Create account
            </a>
          </div>
        </div>
      </form>
    </div>
  </>
  
  );
};

export default Login;
