import AppError from '@helpers/AppError';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET_KEY as string);
    const { sub } = decoded; 
    return sub;
  } catch (e) {
    throw new Error('Invalid token.');
  }
}

const AuthGuard = (req: Request, res: Response, next: NextFunction) => {
  
  const authorization = req.headers.authorization;


  if (!authorization || authorization && (!authorization.includes('Bearer ') || authorization.split('Bearer ').length < 2)) {
    throw new AppError('Permission denied.', 401);
  }

  const token = authorization.split('Bearer ')[1];
 
  const sub = validateToken(token) as string;

  req.user = { id: parseInt(sub) };

  next();
};

export default AuthGuard;