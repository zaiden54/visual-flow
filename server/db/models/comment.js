const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Video }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Video, { foreignKey: 'videoId' });
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      videoId: DataTypes.INTEGER,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );
  return Comment;
};
