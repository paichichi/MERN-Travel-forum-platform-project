import * as postRepository from '../database/postRepository.js';

export const getPostsController = async (req, res, next) => {
  const username = req.query.username;
  const location = req.query.location;
  let data;

  if (!username && !location) {
    data = await postRepository.getAllPosts();
  } else if (!location) {
    data = await postRepository.getPostsByUsername(username);
  } else if (!username) {
    data = await postRepository.getPostsByLocation(location);
  } else {
    data = await postRepository.getPostsByUsernameAndLocation(
      username,
      location
    );
  }

  res.status(200).json(data);
};

export const getPostController = async (req, res, next) => {
  const id = req.params.id;
  const post = await postRepository.getPostById(id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({
      message: `Post [id: ${id}] not found`,
    });
  }
};

export const createPostController = async (req, res, next) => {
  const { username, location, content, imageUrl } = req.body;
  const post = await postRepository.createPost(
    username,
    location,
    content,
    imageUrl
  );
  res.status(201).json(post);
};

export const updatePostController = async (req, res, next) => {
  const id = req.params.id;
  const { content, likes } = req.body;

  const updatedContent = content == null ? null : content;
  const updatedLikes = likes == null ? null : likes;

  const updateInfo = {
    content: updatedContent,
    likes: updatedLikes,
  };

  const post = await postRepository.updatePost(id, updateInfo);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({
      message: `Post [id: ${id}] not found`,
    });
  }
};

export const deletePostController = async (req, res, next) => {
  const id = req.params.id;
  await postRepository.removePost(id);
  res.sendStatus(204);
};
