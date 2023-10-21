import { Request, Response, NextFunction } from 'express';
import TaskService from "@services/TaskService";
import AppError from '@helpers/AppError';

export default class TaskController {

  private static readonly _service = new TaskService();

  public async findByListId(req: Request, res: Response, next: NextFunction) {
   try {
    const { list_id } = req.query as { list_id: string; };
    if (Number.isNaN(parseInt(list_id))) {
      throw new AppError('The query string with name list_id is not a number.');
    } 
    const tasks = await TaskController._service.findByListId(parseInt(list_id));
    return res.json({ tasks });
   } catch(e) {
    next(e);
   }
  } 

  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await TaskController._service.findAll(req.query);
      return res.json({ tasks });
    } catch (e) {
      next(e);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskController._service.findOne(parseInt(req.params.id));
      return res.json({ task });
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("AQIIOOO");
      const task = await TaskController._service.create(req.body);
      return res.json({ task });
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskController._service.update(parseInt(req.params.id), req.body);
      return res.json({ task });
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await TaskController._service.delete(parseInt(req.params.id));
      return res.json({ deleted });
    } catch (e) {
      next(e);
    }
  }
  
  

}