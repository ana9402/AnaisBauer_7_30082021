'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.hasMany(models.Comment);
      models.Post.hasMany(models.Like);

      models.Post.belongsTo(models.User, {
        onDelete: 'cascade'
      });
    }
  };
  Post.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    media: {
      type: DataTypes.STRING
    },
    likes: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    }
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post;
};