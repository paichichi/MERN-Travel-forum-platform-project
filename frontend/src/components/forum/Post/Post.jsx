import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEllipsisV,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "../Comments/Comments";
import { useModal } from "../../../hooks/useModal";
import EditPostModal from "../EditPostModal/EditPostModal";
import { formatDate } from "../../../utils/date";
import { toSentenceCase } from "../../../utils/string";
import { AppContext } from "../../../service/contexts/context";

const MockUser = () => (
  <div className={styles.mockUser}>
    <FontAwesomeIcon icon={faUser} />
  </div>
);

const Post = ({
  post,
  deletePost,
  updatePost,
  allComments,
  forumService,
  refreshComments,
  myUsername,
}) => {
  const { getTargetUserID } = useContext(AppContext);
  const moreBtnRef = useRef();
  const [showComment, setShowComment] = useState(false);
  const [userId, setUserId] = useState(null);

  const postComments = allComments.filter(
    (comment) => comment.postId === post.id
  );

  const { id, createdAt, username, location, content, likes, imageUrl } = post;

  useEffect(() => {
    getTargetUserID(username, setUserId);
  }, []);

  const {
    modalRef: optionsRef,
    isOpen: isOptionsOpen,
    openModal: openOptions,
    closeModal: closeOptions,
  } = useModal(moreBtnRef);

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal(moreBtnRef);

  const toggleComments = () => {
    setShowComment((prev) => !prev);
  };

  const toggleActions = () => {
    if (isOptionsOpen) {
      closeOptions();
      return;
    }
    openOptions();
  };

  const likePost = async () => {
    await updatePost(id, null, likes + 1);
  };

  const handleDelete = async () => {
    if (username !== myUsername) {
      throw new Error("Unauthorized deletion");
    }
    const result = window.confirm("Are you sure to delete?");
    if (result) {
      await deletePost(id);
    }
  };

  const handleUpdate = async (newContent) => {
    await updatePost(id, newContent, null);
    closeEditModal();
  };

  return (
    <div className={styles.container}>
      {isEditModalOpen && (
        <EditPostModal
          previousContent={content}
          onUpdate={handleUpdate}
          onCancel={closeEditModal}
        />
      )}
      <div className={styles.top}>
        <div className={styles.user}>
          <div className={styles.imageContainer}>
            <MockUser />
          </div>
          <div className={styles.userInfo}>
            <span
              className={styles.username}
              onClick={() => {
                if (userId) {
                  window.location.href = `/profile/${userId}`;
                }
              }}
            >
              @{username}
            </span>
            <span className={styles.date}>{formatDate(createdAt)}</span>
          </div>
        </div>
        {username === myUsername && (
          <>
            <button
              ref={moreBtnRef}
              className={styles.moreBtn}
              onClick={toggleActions}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {isOptionsOpen && (
              <ul ref={optionsRef} className={styles.actions}>
                <li onClick={openEditModal}>Edit</li>
                <li onClick={handleDelete}>Delete</li>
              </ul>
            )}
          </>
        )}
      </div>
      <p className={styles.content}>{content}</p>
      {imageUrl && <img src={imageUrl} className={styles.image} />}
      <div className={styles.bottom}>
        <span className={styles.location}>{toSentenceCase(location)}</span>
        <div className={styles.interactionContainer}>
          <button onClick={likePost}>
            {likes}
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button onClick={toggleComments}>
            {postComments.length}
            <FontAwesomeIcon icon={faComment} />
          </button>
        </div>
      </div>
      {showComment && (
        <Comments
          postId={id}
          postComments={postComments}
          postAuthorName={username}
          forumService={forumService}
          refreshComments={refreshComments}
          myUsername={myUsername}
        />
      )}
    </div>
  );
};

export default Post;
