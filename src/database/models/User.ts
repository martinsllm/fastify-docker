import { Model } from 'sequelize'
import db from '.'
import sequelize from 'sequelize'
import Photo from './Photo'

class User extends Model {
  declare id: number
  declare name: string
  declare email: string
  declare password: string
}

User.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'user',
    timestamps: false,
  }
)

User.hasMany(Photo, {
  foreignKey: 'userId',
})

export default User
