import { Sequelize } from 'sequelize';

export default new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

