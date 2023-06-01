import React from 'react';
import styles from './Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ onDelete, comment, postAuthorName, myUsername }) => {
  const { id, username, content } = comment;

  const handleDelete = () => {
    if (myUsername !== username) {
      throw new Error('Unauthorized deletion');
    }
    const result = window.confirm('Are you sure to delete?');
    if (result) {
      onDelete(id);
    }
  };

  return (
    <div className={styles.container}>
      {myUsername === username && (
        <button className={styles.deleteBtn} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <div className={styles.top}>
        <p>
          <span className={styles.authorName}>@{postAuthorName}</span>
          {content}
        </p>
      </div>
      <hr className={styles.separator} />
      <div className={styles.bottom}>
        <span>By @{username}</span>
      </div>
    </div>
  );
};

export default Comment;
