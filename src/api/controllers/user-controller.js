import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
  updateUser,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';
import {validationErrors} from '../../middlewares.js';

const getUser = async (req, res) => {
  const users = res.json(await listAllUsers());
  if (!users) {
    res.sendStatus(404);
    return;
  }
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res, next) => {
  const errors = validationErrors(req);
  if (!errors.isEmpty) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  res.json({message: 'New user added.', result});
};

const putUser = async (req, res) => {
  if (
    res.locals.user.user_id !== Number(req.params.id) &&
    res.locals.user.role !== 'admin'
  ) {
    res.sendStatus(403);
    return;
  }

  const result = await updateUser(req.body, req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteUser = async (req, res) => {
  if (
    res.locals.user.user_id !== Number(req.params.id) &&
    res.locals.user.role !== 'admin'
  ) {
    res.sendStatus(403);
    return;
  }
  const result = await removeUser(req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

export {getUser, getUserById, postUser, putUser, deleteUser}
