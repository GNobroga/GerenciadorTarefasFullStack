import { Request, Response, NextFunction } from 'express';
import ListService from "@services/ListService";
import AppError from '@helpers/AppError';

export default class ListController {

  private static readonly _service = new ListService();

  public async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.query;
      if (Number.isNaN(parseInt(user_id as string))) {
        throw new AppError('The query string with name user_id is not a number.');
      } 
      const lists = await ListController._service.findByUserId(parseInt(user_id as string));
      return res.json({ lists });
    } catch (e) {
      next(e);
    }
  } 

  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      const lists = await ListController._service.findAll(req.query);
      return res.json({ lists });
    } catch (e) {
      next(e);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await ListController._service.findOne(parseInt(req.params.id));
      return res.json({ list });
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await ListController._service.create(req.body);
      return res.json({ list });
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await ListController._service.update(parseInt(req.params.id), req.body);
      return res.json(list);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await ListController._service.delete(parseInt(req.params.id));
      return res.json({ deleted });
    } catch (e) {
      next(e);
    }
  }
  
  

}