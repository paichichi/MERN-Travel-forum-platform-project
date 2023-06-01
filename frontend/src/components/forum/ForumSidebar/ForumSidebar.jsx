import React from 'react';
import styles from './ForumSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { VIEW_TYPES } from '../../../service/forum/constants/forumConstants';

const ForumSidebar = ({
  locations,
  switchViewType,
  viewType,
  selectedLocation,
  authorInput,
  updateLocationFilter,
  setAuthorInput,
  isLoggedIn,
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarSectionLabel}>MENU</p>
        <ul className={styles.selectionContainer}>
          <li
            data-testid="createPostBtn"
            className={`${styles.option} ${
              viewType === VIEW_TYPES.create ? styles.active : null
            }`}
            onClick={() => {
              if (!isLoggedIn) {
                alert('Please log in');
                return;
              }
              switchViewType(VIEW_TYPES.create);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            Share your stories
          </li>
          <li
            className={`${styles.option} ${
              viewType === VIEW_TYPES.posts ? styles.active : null
            }`}
            onClick={() => switchViewType(VIEW_TYPES.posts)}
          >
            <FontAwesomeIcon icon={faList} />
            All Posts
          </li>
        </ul>
      </div>
      {viewType === VIEW_TYPES.posts && (
        <>
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarSectionLabel}>Filter by Locations</p>
            <ul className={styles.selectionContainer}>
              {locations.map((loc, idx) => (
                <div className={styles.location} key={idx}>
                  <input
                    type="checkbox"
                    id={loc}
                    onChange={(e) => updateLocationFilter(e.target.id)}
                    checked={loc === selectedLocation}
                  />
                  <label htmlFor={loc}>{loc}</label>
                </div>
              ))}
              <button
                onClick={() => updateLocationFilter('')}
                className={styles.clearFilterBtn}
              >
                <FontAwesomeIcon icon={faTimes} />
                Clear filter
              </button>
            </ul>
          </div>
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarSectionLabel}>Filter by Author</p>
            <ul className={styles.selectionContainer}>
              <div className={styles.userSearchContainer}>
                <input
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  placeholder="Search by username"
                  type="text"
                  className={styles.authorInput}
                />
                <button onClick={() => setAuthorInput('')}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ForumSidebar;
