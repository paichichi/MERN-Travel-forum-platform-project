import React from 'react';
import axios from 'axios';
import HttpClient from '../network/http';
import ForumService from '../forum/forumService';
import useGet from '../useGet';

const baseURL = process.env.REACT_APP_BASE_URL;

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  //user and authentication related
  const user = JSON.parse(localStorage.getItem('user'));
  const getTargetUserID = (username, setUserId) => {
    axios
      .get(`${baseURL}/user?username=${username}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const id = res.data[0]?.id;
        if (id) {
          setUserId(id);
        }
      });
  };
  const token = localStorage.getItem('token');
  const login = (username, password, setErrorMessage) => {
    axios
      .post(`${baseURL}/user/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          const user = res.data.user;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          localStorage.setItem('username', user.username);
          alert('Log in successful. Welcome back!');

          if (window.location.href !== '/login') {
            window.location.href = window.location.href;
          } else {
            window.location.href = '/';
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log(error.response.data.msg);
          setErrorMessage(error.response.data.msg);
        } else {
          console.log(error);
          setErrorMessage(error);
        }
      });
  };
  const signup = (username, password, confirmPassword, setErrorMessage) => {
    axios
      .post(`${baseURL}/user/register`, {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
        if (res.status === 201) {
          const user = res.data.user;
          const token = res.data.token;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          alert(res.data.msg);
          window.location.href = '/';
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log(error.response.data.msg);
          setErrorMessage(error.response.data.msg);
        } else {
          console.log(error);
          setErrorMessage(error);
        }
      });
  };
  const updatePassword = (
    currentPassword,
    newPassword,
    confirmNewPassword,
    id,
    setErrorMessage,
    token
  ) => {
    axios
      .put(
        `${baseURL}/user/pwdchange`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
          userid: id,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status === 200) {
          alert('you have changed your password');
          window.location.reload();
        } else {
          setErrorMessage('Unknown error.');
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log(error.response.data.msg);
          setErrorMessage(error.response.data.msg);
        } else {
          console.log(error);
          setErrorMessage(error);
        }
      });
  };
  const msgSend = async (sender, targetUser, msg, token) => {
    await axios.post(
      `${baseURL}/user/msg`,
      { senderid: sender.id, receiverid: targetUser.id, content: msg },
      { headers: { Authorization: token } }
    );
  };
  const getMatch = (token, localUser, id, settargetUser, alterMatch) => {
    axios
      .get(`${baseURL}/user/info/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        settargetUser(res.data);
        if (res.data.id === localUser.id) {
          alterMatch(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const updateFollow = (localUser, targetUser, token, setFollowed) => {
    axios
      .get(`${baseURL}/user/follow?fID=${localUser.id}&bfID=${targetUser.id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.data === true) {
          setFollowed(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const updateTargetUser = (targetUser, token, settargetusername) => {
    axios
      .get(`${baseURL}/user?id=${targetUser.id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        settargetusername(res.data[0].userName);
      })
      .catch((err) => console.log(err));
  };
  const updateFollowList = (token, targetUser, setfollowList) => {
    axios
      .get(`${baseURL}/user/follow?fID=${targetUser.id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setfollowList(res.data);
      });
  };
  const updateInfoCon = async (token, id, new_info) => {
    await axios.put(
      `${baseURL}/user/info/${id}`,
      { new_info: new_info },
      { headers: { Authorization: token } }
    );
  };
  const followCon = async (token, fID, fbID) => {
    await axios.post(
      `${baseURL}/user/follow`,
      { fID: fID, fbID: fbID },
      { headers: { Authorization: token } }
    );
  };
  const unfollowCon = async (token, fID, fbID) => {
    await axios.delete(
      `${baseURL}/user/follow?followerid=${fID}&fbID=${fbID}`,
      { headers: { Authorization: token } }
    );
  };

  const postDetail = (
    user,
    capCity,
    accoDetails,
    checkIn,
    checkOut,
    totalPrice,
    encodedHashedData
  ) => {
    axios.post(`${baseURL}/plans`, {
      userID: user.id,
      destination: capCity,
      accomodation: accoDetails[0].name,
      latitude: accoDetails[0].latitude,
      longitude: accoDetails[0].longitude,
      checkIn: checkIn,
      checkOut: checkOut,
      guestNum: accoDetails[0].num_Guest,
      price: totalPrice,
      _id: encodedHashedData,
    });
  };

  // forum
  const forumService = new ForumService(new HttpClient(baseURL));

  // plans
  const { data: plans } = useGet(`${baseURL}/plans?uid=${user?.id}`, []);

  const context = {
    user,
    plans,
    getTargetUserID,
    token,
    login,
    signup,
    updatePassword,
    msgSend,
    getMatch,
    updateFollow,
    updateTargetUser,
    updateFollowList,
    updateInfoCon,
    followCon,
    unfollowCon,
    forumService,
    postDetail,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
