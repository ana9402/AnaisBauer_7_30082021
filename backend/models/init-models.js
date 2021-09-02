var DataTypes = require("sequelize").DataTypes;
var _Comments = require("./Comments");
var _Posts = require("./Posts");
var _Users = require("./Users");

function initModels(sequelize) {
  var Comments = _Comments(sequelize, DataTypes);
  var Posts = _Posts(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Comments.belongsTo(Posts, { as: "post", foreignKey: "post_id"});
  Posts.hasMany(Comments, { as: "Comments", foreignKey: "post_id"});
  Comments.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Comments, { as: "Comments", foreignKey: "user_id"});
  Posts.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Posts, { as: "Posts", foreignKey: "user_id"});

  return {
    Comments,
    Posts,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
