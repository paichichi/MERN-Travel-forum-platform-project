import React, { useState } from 'react';
import styles from './Comments.module.css';
import Comment from '../Comment/Comment';

const Comments = ({
  postId,
  postComments,
  postAuthorName,
  forumService,
  refreshComments,
  myUsername,
}) => {
  const [comment, setComment] = useState('');

  const handleDelete = async (commentId) => {
    await forumService.deleteComment(postId, commentId);
    await refreshComments();
  };

  const submit = async () => {
    if (!comment) {
      return;
    }
    await forumService.createComment(postId, myUsername, comment);
    setComment('');
    await refreshComments();
  };

  return (
    <div className={styles.container}>
      <div className={styles.addComment}>
        <input
          placeholder="Anything to comment?"
          type="text"
          className={styles.addCommentInput}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={styles.addCommentBtn} onClick={submit}>
          Comment
        </button>
      </div>
      <div className={styles.comments}>
        {postComments.map((c) => (
          <Comment
            key={c.id}
            onDelete={handleDelete}
            comment={c}
            postAuthorName={postAuthorName}
            myUsername={myUsername}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
