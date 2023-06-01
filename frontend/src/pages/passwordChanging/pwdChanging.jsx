import React, { useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChangePassword = ({token}) => {
  const { id } = useParams();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put("http://localhost:8080/user/pwdchange", { currentPassword: currentPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword, userid: id }, { headers: { Authorization: token } })
      .then(res => {
        if (res.status === 200) {
          alert("you have changed your password")
          window.location.href = `/profile/${id}`
        } else {
          setErrorMessage("Unknown error.");
          window.location.reload();
        }
      }).catch(error => {
        if (error.response.status === 403) {
          console.log(error.response.data.msg);
          setErrorMessage(error.response.data.msg)
        } else {
          console.log(error);
          setErrorMessage(error)
        }
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Change Password</h2>
      <label htmlFor="current-password">Current Password:</label>
      <input
        type="password"
        id="current-password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
      <label htmlFor="new-password">New Password:</label>
      <input
        type="password"
        id="new-password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <label htmlFor="confirm-new-password">Confirm New Password:</label>
      <input
        type="password"
        id="confirm-new-password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        required
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;