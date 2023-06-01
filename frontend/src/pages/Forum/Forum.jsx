import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './Forum.module.css';
import ForumSidebar from '../../components/forum/ForumSidebar/ForumSidebar';
import CreatePost from '../../components/forum/CreatePost/CreatePost';
import Posts from '../../components/forum/Posts/Posts';
import { VIEW_TYPES } from '../../service/forum/constants/forumConstants';
import { orderByCreatedAt } from '../../utils/array';
import { toSentenceCase } from '../../utils/string';
import { AppContext } from '../../service/contexts/context';

const Forum = ({ forumService }) => {
  const { user } = useContext(AppContext);
  const [viewType, setViewType] = useState(VIEW_TYPES.posts);
  const [posts, setPosts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [myUsername, setMyUsername] = useState(null);

  useEffect(() => {
    const loggedInUsername = user ? user.username : 'anonymous';
    if (loggedInUsername) {
      setMyUsername(loggedInUsername);
    }
  }, []);

  const locations = useMemo(() => {
    const list = [];
    posts.forEach((p) => {
      if (!list.includes(p.location)) {
        list.push(p.location);
      }
    });
    list.sort();
    return list;
  }, [posts]);

  const refreshPosts = useCallback(async () => {
    let refreshedPosts = await forumService.getPosts();
    setPosts(orderByCreatedAt(refreshedPosts));
  }, [forumService]);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  const postsToDisplay = useMemo(
    () =>
      posts.filter((post) => {
        if (authorInput) {
          if (
            !post.username.toLowerCase().startsWith(authorInput.toLowerCase())
          ) {
            return false;
          }
        }

        if (selectedLocation) {
          if (post.location.toLowerCase() !== selectedLocation.toLowerCase()) {
            return false;
          }
        }

        return true;
      }),
    [authorInput, posts, selectedLocation]
  );

  const switchViewType = (viewType) => {
    setViewType(viewType);
  };

  const publish = async (location, content, imageUrl) => {
    await forumService.createPost(myUsername, location, content, imageUrl);
    await refreshPosts();
    setViewType(VIEW_TYPES.posts);
  };

  const deletePost = async (postId) => {
    if (!posts.find((post) => post.id === postId)) {
      return;
    }

    await forumService.deletePost(postId);
    await refreshPosts();
  };

  const updatePost = async (postId, content, likes) => {
    await forumService.updatePost(postId, content, likes);
    await refreshPosts();
  };

  const updateLocationFilter = (location) => {
    const parsedLocationName = toSentenceCase(location);
    setSelectedLocation(parsedLocationName);
  };

  const getViewContent = (viewType) => {
    switch (viewType) {
      case VIEW_TYPES.create:
        return <CreatePost publish={publish} />;
      case VIEW_TYPES.posts:
      default:
        return (
          <Posts
            posts={postsToDisplay}
            deletePost={deletePost}
            updatePost={updatePost}
            forumService={forumService}
            myUsername={myUsername}
          />
        );
    }
  };

  return (
    <div className={styles.page} data-testid="forum">
      <ForumSidebar
        locations={locations}
        switchViewType={switchViewType}
        viewType={viewType}
        selectedLocation={selectedLocation}
        updateLocationFilter={updateLocationFilter}
        authorInput={authorInput}
        setAuthorInput={setAuthorInput}
        refreshPosts={refreshPosts}
        isLoggedIn={myUsername ? true : false}
      />
      <section className={styles.mainContainer}>
        {getViewContent(viewType)}
      </section>
    </div>
  );
};

export default Forum;
