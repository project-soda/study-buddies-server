import { Sequelize, Model, DataTypes, BelongsTo, BelongsToGetAssociationMixin } from 'sequelize'
import { User } from '../models/User'

export class Follow extends Model {
  public readonly id!: number
  public followingUserID!: string
  public followerID!: string
  public static Follower: BelongsTo<Follow, User>
  public static FollowingUser: BelongsTo<Follow, User>
}

export function init(sequelize: Sequelize) {
  Follow.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      followingUserID: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'following_id',
      },
      followerID: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'follower_id',
      },
    },
    {
      sequelize,
      tableName: 'follow',
      timestamps: false,
    },
  )
}

export function associate() {
  Follow.Follower = Follow.belongsTo(User, {
    as: 'follower',
    foreignKey: 'follower_id',
  })

  Follow.FollowingUser = Follow.belongsTo(User, {
    as: 'followingUser',
    foreignKey: 'following_id',
  })
}