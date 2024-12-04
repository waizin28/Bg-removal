import express from 'express';
import { removeBackground } from '../controllers/ImageController.js';
import upload from '../middlewares/multer.js';
import { authUser } from '../middlewares/auth.js';

const imageRouter = express.Router();

imageRouter.post(
  '/remove-bg',
  upload.single('image'),
  authUser,
  removeBackground
);

export default imageRouter;
