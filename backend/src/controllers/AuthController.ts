import AuthService from "@services/AuthService";
import { Request, Response, NextFunction } from 'express';

export default class AuthController {
  
  private static readonly _service = new AuthService();

  public async index(req: Request, res: Response, next: NextFunction) {
    try {

      const token = await AuthController._service.authenticate(req.body);
      return res.json({ token });
    } catch (e) { next(e) }
  }

  public async isValidToken(req: Request, res: Response) {
    const isValid = await AuthController._service.isTokenValid(req.body);
    return res.json({ token_valid: isValid });
  }

}