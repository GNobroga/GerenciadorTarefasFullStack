import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from  'sequelize';
import connection from '@configs/sequelize/connection';
import bcrypt from 'bcryptjs';
import List from './List';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password_hash: string;
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, 
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password_hash', hash);
      }
    },
  },
  {
    sequelize: connection,
    tableName: 'users',
    timestamps: true,
  }
);

User.hasMany(List, {
  foreignKey: 'user_id',
});

List.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});
