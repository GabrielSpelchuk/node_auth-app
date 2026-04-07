import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { catchError } from '../utils/catchError.js';

export const authRoute = new express.Router();

authRoute.post('/registration', catchError(authController.registration));
authRoute.post('/login', catchError(authController.login));

authRoute.get(
  '/activation/:activationToken',
  catchError(authController.activate),
);

authRoute.get('/refresh', catchError(authController.refresh));
authRoute.post('/logout', catchError(authController.logout));

authRoute.post('/forgot-password', authController.forgotPassword);
authRoute.post('/reset-password', authController.resetPassword);
