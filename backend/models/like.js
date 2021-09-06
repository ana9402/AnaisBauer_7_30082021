'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Like.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Like.init({
    rate: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    },
    post_id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};