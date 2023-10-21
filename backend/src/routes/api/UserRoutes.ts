import { Router } from "express";
import UserController from "@controllers/UserController";
import { celebrate, Segments, Joi } from "celebrate";
import AuthGuard from "@middlewares/AuthGuard";

const routes = Router();

const userController = new UserController();

routes.get('/', AuthGuard, userController.index);
routes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  userController.show
);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  userController.create
);

routes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().optional(),
    },
  }),
  userController.update
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  userController.delete
);


export default routes;