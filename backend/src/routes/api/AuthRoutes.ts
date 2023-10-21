import AuthController from "@controllers/AuthController";
import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";

const routes = Router();
const authController = new AuthController();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    }
  }),
  authController.index);

routes.post(
  '/token',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    }
  }),
  authController.isValidToken);

export default routes;