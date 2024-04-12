import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByOwner,
} from '../controllers/cat-controller.js';
import {authenticateToken, createThumbnail} from '../../middlewares.js';

const catRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

catRouter.route('/')
  .get(getCat)
  .post(authenticateToken, upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat)
  .delete(authenticateToken, getCatsByOwner)

export default catRouter;
