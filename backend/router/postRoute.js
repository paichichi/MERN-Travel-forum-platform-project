import express from 'express';
import 'express-async-errors';
import * as postController from '../controller/postController.js';

export const postRoute = express.Router();

/**
 * This middleware handles following requests
 *
 * GET: /posts
 *  - get all existing posts
 *
 * GET: /posts?username=:username
 *  - get all posts of a user
 *
 * GET: /posts?location=:location
 *  - get all posts filtered by location
 *
 * GET: /posts?username=:username&location=:location
 *  - get all posts of user filtered by location
 */
postRoute.get('/', postController.getPostsController);

/**
 * This middleware handles following requests
 *
 * GET: /posts/:id
 *  - get a post with matching id
 */
postRoute.get('/:id', postController.getPostController);

/**
 * This middleware handles following requests
 *
 * POST: /posts
 *  - create a new post
 */
postRoute.post('/', postController.createPostController);

/**
 * This middleware handles following requests
 *
 * PUT: /posts/:id
 *  - update a post with matching id
 */
postRoute.put('/:id', postController.updatePostController);

/**
 * This middleware handles following requests
 *
 * DELETE: /posts/:id
 *  - delete a post
 */
postRoute.delete('/:id', postController.deletePostController);
