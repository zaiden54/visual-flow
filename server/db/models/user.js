const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Channel, Comment, Video }) {
      this.belongsTo(Role, { foreignKey: 'roleId' });
      this.hasOne(Channel, { foreignKey: 'userId' });
      this.belongsToMany(Channel, { as: 'subscribers', through: 'Subscriptions' });
      this.belongsToMany(Video, { as: 'likes', through: 'Likes' });
      this.hasMany(Comment, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isActivated: DataTypes.BOOLEAN,
      link: DataTypes.STRING,
      avatar: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
