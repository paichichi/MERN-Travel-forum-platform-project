import React, { useCallback, useEffect, useState } from 'react';
import styles from './Posts.module.css';
import Post from '../Post/Post';
import { orderByCreatedAt } from '../../../utils/array';

const Posts = ({ posts, deletePost, updatePost, forumService, myUsername }) => {
  const [allComments, setAllComments] = useState([]);

  const refreshComments = useCallback(async () => {
    const comments = await forumService.getComments();
    orderByCreatedAt(comments);
    setAllComments(comments);
  }, [forumService]);

  useEffect(() => {
    refreshComments();
  }, [forumService]);

  return (
    <div className={styles.container}>
      {posts.length === 0 && (
        <div className={styles.noPost}>
          <p>No post yet! Will you be the first one?</p>
        </div>
      )}
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          deletePost={deletePost}
          updatePost={updatePost}
          allComments={allComments}
          forumService={forumService}
          refreshComments={refreshComments}
          myUsername={myUsername}
        />
      ))}
    </div>
  );
};

export default Posts;
