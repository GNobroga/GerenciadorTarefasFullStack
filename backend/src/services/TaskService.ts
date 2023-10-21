import List from '@entities/List';
import Task from '@entities/Task';
import AppError from '@helpers/AppError';

interface IRequest {
  title: string;
  description?: string;
  estimation: Date;
  done?: boolean;
}

export default class TaskService {

  public async findByListId(list_id: number) {
    const tasks = await Task.findAll({ where: { list_id }, order: [['id', 'asc']]});
    return tasks;
  } 

  public async findAll({ page = 0, size = 10 }) {
    return await Task.findAll({
      include: { model: List, as: 'list' },
      offset: page * size,
      limit: size,
    })
  }

  public async findOne(id: number) {
    const task = await Task.findByPk(id, { include: Task, });

    if (!task) {
      throw new AppError('Task does not exist.');
    }

    return task;
  }

  public async create({ list_id, ...record }: IRequest & { list_id: number; }) {
    const list = await List.findByPk(list_id);

    if (!list) {
      throw new AppError('List does not exist.');
    }

    const tasks = await Task.create(record);

    await tasks.setList(list);

    return tasks;
  }

  public async update(id: number, record: IRequest) {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new AppError('Task does not exist.');
    }

    console.log('Entrou aqui em atualizar task')


    console.log(record);
    
    task.title = record.title ?? task.title;
    task.description = record.description ?? task.description;
    task.done = record.done ?? task.done;

    await task.save();

    return task;

  }

  public async delete(id: number) {
    const deleted = await Task.destroy({ where: { id }});
    return deleted != 0;
  }


}