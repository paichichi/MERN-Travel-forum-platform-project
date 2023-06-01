import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePost from '../components/forum/CreatePost/CreatePost';
import ForumSidebar from '../components/forum/ForumSidebar/ForumSidebar';

test('forum page displays correct sidebar options', async () => {
  const { getByText } = render(
    <ForumSidebar
      {...{
        locations: [
          'Addw',
          'Auckland',
          'Beijing',
          'Hey',
          'Hi',
          'Korea',
          'Queens town',
          'Somewhere',
        ],
        viewType: 'posts',
        selectedLocation: '',
        authorInput: '',
        isLoggedIn: true,
      }}
    />
  );
  const createPostMenu = getByText('Share your stories');
  expect(createPostMenu).toBeInTheDocument();

  const viewPostsMenu = getByText('All Posts');
  expect(viewPostsMenu).toBeInTheDocument();
});

test('opening create page works', () => {
  const { getByText } = render(<CreatePost publish={() => {}} />);
  const createPostPageLabel = getByText('New Post');
  expect(createPostPageLabel).toBeInTheDocument();
});
