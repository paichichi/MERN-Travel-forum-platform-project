import React from 'react';
import styles from './ProfileSideBar.module.css';

const ProfileSidebar = ({
    currentcontent,
    changeContent,
    match,
    targetusername,
}) => {
    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.hint}>{match ? ("My profile") : (`${targetusername}'s profile`)}</h2>
                <p className={`${styles.p} ${currentcontent === "profile" ? styles.active : null}`}
                    onClick={() => changeContent('profile')}>
                    {match ? ("MyProfile") : ("Profile")}
                </p>
                {match && (<p className={`${styles.p} ${currentcontent === "msg" ? styles.active : null}`}
                    onClick={() => changeContent('msg')}>
                    MyMessage
                </p>)}
                {match && (<p className={`${styles.p} ${currentcontent === "pwd" ? styles.active : null}`}
                    onClick={() => changeContent('pwd')}>
                    MyPassword
                </p>)}
            </div>
        </div>
    );

};

export default ProfileSidebar;