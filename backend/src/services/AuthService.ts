import User from '@entities/User';
import AppError from '@helpers/AppError';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

interface IUser {
  email: string;
  password: string;
}

export default class AuthService {

  public async authenticate({ email, password }: IUser) {
    const users = await User.findAll({ where: {
      email
    }});

    if (!users.length) {
      throw new AppError('Email or password is incorrect.', 401);
    }

    const user = users[0];

    if (!bcrypt.compareSync(password, user.password_hash)) {
      throw new AppError('Email or password is incorrect.', 401);
    }

    const token = jwt.sign({}, process.env.APP_SECRET_KEY as string, {
      expiresIn: '1 days',
      subject: `${user.id}`,
    })

    return token;
  }

  public async isTokenValid({ token }: { token: string; }) {
    try {
      const decoded = jwt.verify(token, process.env.APP_SECRET_KEY as string);
      const { sub } = decoded as { sub: string };
      const id = parseInt(sub);
      const user = await User.findByPk(id);
      if (!user) return false;
      return true;
    } catch (e) {
      return false;
    }
  } 

}