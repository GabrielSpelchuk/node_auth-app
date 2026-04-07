import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { catchError } from '../utils/catchError.js';
import { userController } from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.put(
  '/update-profile',
  authMiddleware,
  catchError(userController.updateProfile),
);
