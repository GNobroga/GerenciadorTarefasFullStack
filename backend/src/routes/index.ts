import { Router, Request, Response } from "express";
import listRoutes from './api/ListRoutes';
import userRoutes from './api/UserRoutes';
import taskRoutes from './api/TaskRoutes';
import authRoutes from './api/AuthRoutes';

const routes = Router();

routes.use('/lists', listRoutes);
routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/auth', authRoutes);

export default routes;