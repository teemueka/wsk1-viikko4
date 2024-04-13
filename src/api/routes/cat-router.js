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
import {body} from 'express-validator';

const catRouter = express.Router();
const upload = multer({
  dest: 'uploads/',
  limits: {
    filesize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

catRouter.route('/')
  .get(getCat)
  .post(
    authenticateToken,
    upload.single('file'),
    body("cat_name").trim().isLength({min: 3, max: 30}),
    createThumbnail,
    postCat);

catRouter.route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat)
  .delete(authenticateToken, getCatsByOwner)

export default catRouter;
