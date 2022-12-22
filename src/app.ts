import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import userRouter from './routes/users.routes';
import { errorHandler } from './errors';
import sessionsRoutes from './routes/sessions.routes';

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/login', sessionsRoutes);
app.use(errorHandler);

export default app;
