import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

catRouter.post('/', upload.single('file'), postCat);

catRouter.route('/')
  .get(getCat)
  .post(postCat);

catRouter.route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;
