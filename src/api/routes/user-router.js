import express from 'express';
import {
  getUser,
  getUserById,
  putUser,
  deleteUser,
  postUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares.js';

const userRouter = express.Router();

userRouter.route('/')
  .get(getUser)
  .post(postUser);

userRouter.route('/:id')
  .get(getUserById)
  .put(putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
