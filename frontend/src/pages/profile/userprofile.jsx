import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./userprofile.module.css";
import ProfileSidebar from "../../components/Profile/ProfileSidebar/ProfileSideBar";
import Pwdchange from "../../components/Profile/passwordChanging/pwdChanging";
import MainProfile from "../../components/Profile/MainProfile/Mainprofile";
import MsgView from "../../components/Profile/Message/msg";
import { AppContext } from "../../service/contexts/context";

const UserProfile = () => {
  const {
    user,
    token,
    getMatch,
    updateFollow,
    updateTargetUser,
    updateFollowList,
    updateInfoCon,
    followCon,
    unfollowCon,
  } = useContext(AppContext);
  const { id } = useParams();
  const [targetUser, settargetUser] = useState({});
  const [localUser, setlocalUser] = useState({});
  const [match, alterMatch] = useState(false);
  const [editable, setEditable] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [currentcontent, changeContent] = useState("profile");
  const [targetusername, settargetusername] = useState("");
  const [followList, setfollowList] = useState([]);
  const [sending, setsending] = useState(false);

  useEffect(() => {
    setlocalUser(user);

    getMatch(token, localUser, id, settargetUser, alterMatch);

    if (match === false) {
      updateFollow(localUser, targetUser, token, setFollowed);
      updateTargetUser(targetUser, token, settargetusername);
    }

    updateFollowList(token, targetUser, setfollowList);
  }, [localUser.id, targetUser.id, id, match, token]);

  function convertEditable() {
    setEditable(!editable);
  }

  async function updateInfo() {
    const new_info = {
      fullName: targetUser.fullname,
      email: targetUser.email,
      phone: targetUser.phone,
      mobile: targetUser.mobile,
      address: targetUser.address,
      web: targetUser.web,
      FB: targetUser.fb,
      twit: targetUser.twit,
      ins: targetUser.ins,
      li: targetUser.li,
    };
    setEditable(!editable);
    updateInfoCon(token, id, new_info);
  }

  async function follow() {
    const fID = localUser.id;
    const fbID = targetUser.id;
    followCon(token, fID, fbID);
    setFollowed(true);
  }

  async function unFollow() {
    const fID = localUser.id;
    const fbID = targetUser.id;
    unfollowCon(token, fID, fbID);
    setFollowed(false);
  }

  const showcontent = (currentcontent) => {
    switch (currentcontent) {
      case "profile":
        return (
          <MainProfile
            editable={editable}
            targetUser={targetUser}
            settargetUser={settargetUser}
            match={match}
            followed={followed}
            unFollow={unFollow}
            follow={follow}
            updateInfo={updateInfo}
            convertEditable={convertEditable}
            targetusername={targetusername}
            flist={followList}
            sending={sending}
            setsending={setsending}
          />
        );
      case "msg":
        return <MsgView token={token}/>;
      case "pwd":
        return <Pwdchange token={token}/>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.main}>
      <ProfileSidebar
        currentcontent={currentcontent}
        changeContent={changeContent}
        match={match}
        targetusername={targetusername}
      />
      <div className={styles.content}>{showcontent(currentcontent)}</div>
    </div>
  );
};

export default UserProfile;
