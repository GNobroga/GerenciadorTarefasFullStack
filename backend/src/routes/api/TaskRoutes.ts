import { Router } from "express";
import TaskController from "@controllers/TaskController";
import { celebrate, Segments, Joi } from "celebrate";
import AuthGuard from "@middlewares/AuthGuard";

const routes = Router();

const taskController = new TaskController();

routes.get('/', AuthGuard, taskController.index);
routes.get('/list', AuthGuard, taskController.findByListId);

routes.get(
  '/:id',
  AuthGuard,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  taskController.show
);

routes.post(
  '/',
  AuthGuard,
  celebrate({
    [Segments.BODY]: { 
      title: Joi.string().required(),
      description: Joi.string().optional().allow(''),
      estimation: Joi.date().required(),
      done: Joi.boolean().optional(),
      list_id: Joi.number().required(),
    },
  }),
  taskController.create
);

routes.put(
  '/:id',
  AuthGuard,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().optional(),
      description: Joi.string().optional().allow(''),
      done: Joi.boolean().optional(),
    },
  }),
  taskController.update
);

routes.delete(
  '/:id',
  AuthGuard,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  taskController.delete
);


export default routes;