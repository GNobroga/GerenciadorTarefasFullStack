import { Request, Response, NextFunction } from 'express';
import UserService from "@services/UserService";

export default class UserController {

  private static readonly _service = new UserService();

  // Quando o usuario tiver autenticado elee vai entrar aqui
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('USERID', req.user.id)
      const user = await UserController._service.findOne(req.user.id);
      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserController._service.findOne(parseInt(req.params.id));
      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('ENTROU AQUI EM')
      const user = await UserController._service.create(req.body);
      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    console.log('oiii')
    console.log(req.params)
    try {
      const user = await UserController._service.update(parseInt(req.params.id), req.body);
      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await UserController._service.delete(parseInt(req.params.id));
      return res.json({ deleted });
    } catch (e) {
      next(e);
    }
  }
  
  

}