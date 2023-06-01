import express from 'express';
import * as userController from '../controller/userController.js'

export const user_route = express.Router();

user_route.get('/', userController.user_get_req);

user_route.get('/info/:id', userController.info_get_req);

user_route.put('/info/:id', userController.info_put_req);

user_route.post('/register', userController.sign_up_req);

user_route.put('/pwdchange', userController.pwdchange);

user_route.post('/login', userController.login_req);

user_route.get('/msg',userController.msg_get_req);

user_route.put('/msg/:id', userController.msg_put_req);

user_route.post('/msg', userController.msg_post_req);

user_route.get('/follow', userController.follow_get_req);

user_route.post('/follow', userController.follow_post_req);

user_route.delete('/follow', userController.follow_delete_req);
