import { Router } from "express";
import ListController from "@controllers/ListController";
import { celebrate, Segments, Joi } from "celebrate";
import AuthGuard from "@middlewares/AuthGuard";

const routes = Router();

const listController = new ListController();

routes.get('/user', AuthGuard, listController.findByUserId);
routes.get('/', AuthGuard, listController.index);

routes.get(
  '/:id', 
  AuthGuard,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  listController.show
);

routes.post( 
  '/',
  AuthGuard,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.number().required(),
      title: Joi.string().required(),
    },
  }),
  listController.create
);

routes.put(
  '/:id',
  AuthGuard,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  listController.update
);

routes.delete(
  '/:id',
  AuthGuard, 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  listController.delete
);


export default routes;