import List from '@entities/List';
import Task from '@entities/Task';
import User from '@entities/User';
import AppError from '@helpers/AppError';

interface IRequest {
  title: string;
}

export default class ListService {

  public async findByUserId(user_id: number) {
    const lists = await List.findAll({
      where: {
        user_id
      },
      order: [['id', 'asc']]
    });
    return lists;
  }


  public async findAll({ page = 0, size = 10 }) {
    return await List.findAll({ 
      include: [{ model: Task, as: 'tasks'}, { model: User, as: 'user'}],
      attributes: { exclude: ['updatedAt', 'createdAt', 'user_id']},
      offset: page * size,
      limit: size,
    });
  }

  public async findOne(id: number) {
    const list = await List.findByPk(id, { include: Task, });

    if (!list) {
      throw new AppError('List does not exist.');
    }

    return list;
  }

  public async create({ user_id, title }: IRequest & { user_id: number; }) {
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new AppError('User does not exist.');
    }
    const list = await List.create({ title });
    list.setUser(user);
    return list;
  }

  public async update(id: number, { title }: IRequest) {
    const list = await List.findByPk(id);

    if (!list) {
      throw new AppError('List does not exist.');
    }

    list.title = title;

    await list.save();

    return list;

  }

  public async delete(id: number) {
    const deleted = await List.destroy({ where: { id }});
    return deleted != 0;
  }


}