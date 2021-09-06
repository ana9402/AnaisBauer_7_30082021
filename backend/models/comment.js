'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User)
      models.Comment.belongsTo(models.Post)
    }
  };
  Comment.init({
    content: {
      allowNull: false,
      type: DataTypes.TEXT
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
    modelName: 'Comment',
  });
  return Comment;
};