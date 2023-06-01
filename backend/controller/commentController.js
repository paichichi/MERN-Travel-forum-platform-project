import * as commentRepository from '../database/commentRepository.js';

export const getCommentsController = async (req, res, next) => {
  const username = req.query.username;
  const postId = req.query['post-id'];
  let data;

  if (!username && !postId) {
    data = await commentRepository.getAllComments();
  } else if (!postId) {
    data = await commentRepository.getCommentsByUsername(username);
  } else if (!username) {
    data = await commentRepository.getCommentsByPost(postId);
  } else {
    data = await commentRepository.getCommentsByPostAndUsername(
      postId,
      username
    );
  }

  res.status(200).json(data);
};

export const getCommentController = async (req, res, next) => {
  const id = req.params.id;
  const comment = await commentRepository.getCommentByID(id);

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({
      message: `Comment [id: ${id}] not found`,
    });
  }
};

export const createCommentController = async (req, res, next) => {
  const postId = req.query['post-id'];
  const { username, content } = req.body;
  const comment = await commentRepository.createComment(
    postId,
    username,
    content
  );
  res.status(201).json(comment);
};

export const updateCommentController = async (req, res, next) => {
  const id = req.params.id;
  const { content } = req.body;
  const comment = await commentRepository.updateComment(id, content);

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({
      message: `Comment [id: ${id}] not found`,
    });
  }
};

export const deleteCommentController = async (req, res, next) => {
  const postId = req.query['post-id'];
  const commentId = req.params.id;
  await commentRepository.removeComment(commentId, postId);
  res.sendStatus(204);
};
