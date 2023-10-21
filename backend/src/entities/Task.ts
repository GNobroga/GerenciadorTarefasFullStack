import { BelongsToSetAssociationMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from  'sequelize';
import connection from '@configs/sequelize/connection';
import List from './List';

export default class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: CreationOptional<string>;
  declare estimation: Date;
  declare list_id: CreationOptional<number>;
  declare done: CreationOptional<boolean>;

  declare setList: BelongsToSetAssociationMixin<List, number>;
};

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lists',
      },
    },
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    }, 
    estimation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    sequelize: connection,
    tableName: 'tasks',
    timestamps: true,
  }
);

