import React, { useState } from 'react';
import styles from './CreatePost.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
const CreatePost = ({ publish }) => {
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const isValidPost = location && content ? true : false;

  const handlePublish = () => {
    publish(location, content, imageUrl);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>New Post</h1>
        <input
          className={styles.location}
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          className={styles.content}
          placeholder="Share your stories"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className={styles.image}
          type="text"
          placeholder="Do you have an image? Simply place URL here"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          className={`${styles.publishBtn} ${
            !isValidPost ? styles.disable : null
          }`}
          onClick={handlePublish}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
          Publish
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
