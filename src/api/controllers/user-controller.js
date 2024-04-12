import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
  updateUser,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';
import promisePool from '../../utils/database.js';

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

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
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
