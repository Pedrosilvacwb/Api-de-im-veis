import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import userRouter from './routes/users.routes';
import { errorHandler } from './errors';
import sessionsRoutes from './routes/sessions.routes';
import categoriesRoutes from './routes/categories.routes';
import propertiesRoutes from './routes/properties.routes';
import schedulesRoutes from './routes/schedules.routes';

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/login', sessionsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/properties', propertiesRoutes);
app.use('/schedules', schedulesRoutes);
app.use(errorHandler);

export default app;
