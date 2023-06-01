import React, { useContext, useState } from "react";
import { AppContext } from "../../../service/contexts/context";
import { useParams } from "react-router-dom";
import styles from "./pwdChanging.module.css";

const ChangePassword = () => {
  const { token, updatePassword } = useContext(AppContext);
  const { id } = useParams();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword(
      currentPassword,
      newPassword,
      confirmNewPassword,
      id,
      setErrorMessage,
      token
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.title}>Change Password</h2>
      <label className={styles.label} htmlFor="current-password">
        Current Password:
      </label>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
        className={styles.input}
      />
      <label className={styles.label} htmlFor="new-password">
        New Password:
      </label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        className={styles.input}
      />
      <label className={styles.label} htmlFor="confirm-new-password">
        Confirm New Password:
      </label>
      <input
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        required
        className={styles.input}
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div className={styles.btnDiv}>
        <button className={styles.btn} type="submit">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
