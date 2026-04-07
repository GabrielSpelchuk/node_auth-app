/* eslint-disable no-console */
'use strict';

import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authRoute } from './routes/auth.route.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { userRouter } from './routes/user.route.js';

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }),
);

app.use(authRoute);
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Server is started on http://localhost:3005');
});
