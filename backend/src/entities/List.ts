import { BelongsToSetAssociationMixin, CreationOptional, DataTypes, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model } from  'sequelize';
import connection from '@configs/sequelize/connection';
import Task from './Task';
import User from './User';

export default class List extends Model<InferAttributes<List>, InferCreationAttributes<List>> {
  declare id: CreationOptional<number>;
  declare user_id: CreationOptional<number>;
  declare title: string;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
};

List.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
      }
    },
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'lists',
    timestamps: true,
  }
);

List.hasMany(Task, {
  foreignKey: 'list_id',
  as: 'tasks',
});

Task.belongsTo(List, {
  foreignKey: 'list_id',
  as: 'list',
});

