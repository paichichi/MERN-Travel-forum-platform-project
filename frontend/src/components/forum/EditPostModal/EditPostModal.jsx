import React, { useEffect, useRef, useState } from 'react';
import styles from './EditPostModal.module.css';

const EditPostModal = ({ previousContent, onCancel, onUpdate }) => {
  const [content, setContent] = useState(previousContent);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <span className={styles.title}>Edit your post</span>
        <textarea
          ref={inputRef}
          className={styles.content}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
        />
        <div className={styles.btnContainer}>
          <button
            className={styles.updateBtn}
            onClick={() => onUpdate(content)}
          >
            Update
          </button>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
