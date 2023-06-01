import express from 'express';
import 'express-async-errors';
import * as commentController from '../controller/commentController.js';

export const commentRoute = express.Router();

/**
 * This middleware handles following requests
 *
 * GET: /comments
 *  - get all existing comments
 *
 * GET: /comments?username=:username
 *  - get all comments of a user
 *
 * GET: /comments?post-id=:post-id
 * - get all comments of a post
 */
commentRoute.get('/', commentController.getCommentsController);

/**
 * This middleware handles following requests
 *
 * GET: /comments/:id
 *  - get a comment with matching id
 */
commentRoute.get('/:id', commentController.getCommentController);

/**
 * This middleware handles following requests
 *
 * POST: /comments?post-id=:post-id
 *  - create a new comment
 */
commentRoute.post('/', commentController.createCommentController);

/**
 * This middleware handles following requests
 *
 * PUT: /comments/:id
 *  - update a comment with matching id
 */
commentRoute.put('/:id', commentController.updateCommentController);

/**
 * This middleware handles following requests
 *
 * DELETE: /comments/:id?post-id=:postid
 *  - delete a comment with matching id
 */
commentRoute.delete('/:id', commentController.deleteCommentController);
