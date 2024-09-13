import { Model } from 'sequelize'
import db from '.'
import sequelize from 'sequelize'
import User from './User'

class Photo extends Model {
  declare id: number
  declare filename: string
  declare url: string
  declare userId: number
}

Photo.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize.INTEGER,
    },
    filename: {
      type: sequelize.STRING,
    },
    url: {
      type: sequelize.STRING,
    },
    userId: {
      type: sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize: db,
    tableName: 'photos',
    timestamps: false,
  }
)

Photo.belongsTo(User)

export default Photo
