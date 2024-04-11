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
import {createThumbnail} from '../../middlewares.js';

const catRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

catRouter.post('/', upload.single('file'), createThumbnail, postCat);

catRouter.route('/')
  .get(getCat)
  .post(postCat);

catRouter.route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat)
  .delete(getCatsByOwner)

export default catRouter;
