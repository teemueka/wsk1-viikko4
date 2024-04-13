import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {validationResult} from 'express-validator';
const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const thumbnailPath = filePath + '_thumb.png';
  try {
    await sharp(filePath).resize(160, 160).toFormat('png').toFile(thumbnailPath);
    next();
  } catch (error) {
    console.log('Error creating thumbnail', error);
    return res.status(500).send('Error creating thumbnail');
  }
};

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
};

const validationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(', ');
    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }
  next();
};

export {authenticateToken, createThumbnail, notFoundHandler, errorHandler, validationErrors};
