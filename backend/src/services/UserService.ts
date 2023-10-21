import List from '@entities/List';
import User from '@entities/User';
import AppError from '@helpers/AppError';
import bcrypt from 'bcryptjs';

interface IRequest {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export default class UserService {

  public async findAll({ page = 0, size = 10 }) {
    return await User.findAll({
      offset: page * size,
      limit: size,
    })
  }

  public async findOne(id: number) {
    const user = await User.findByPk(id, { include: List, });

    if (!user) {
      throw new AppError('User does not exist.');
    }

    return user;
  }

  public async create({ name, email, password, }: IRequest) {
    const user = await User.findAll({ where: { email }});

    if (user.length) {
      throw new AppError('User is already created.');
    }

    console.log(user.length, email)

    return await User.create({ name, email, password_hash: password, });
  }

  public async update(id: number, record: Partial<IRequest>) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError('User does not exist.');
    }
    
    user.name = record.name ?? user.name;
    user.email = record.email ?? user.email;
    
    if (record.password) {
      const salt = bcrypt.genSaltSync(10);
      user.password_hash = bcrypt.hashSync(record.password, salt);
    }
    
    await user.save();
    
    return user;

  }

  public async delete(id: number) {
    const deleted = await User.destroy({ where: { id }});
    return deleted != 0;
  }


}