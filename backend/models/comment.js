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
      models.Comment.belongsTo(models.User, {
        onDelete: 'CASCADE'
      })
      models.Comment.belongsTo(models.Post, {
        onDelete: 'CASCADE'
      })
    }
  };
  Comment.init({
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};