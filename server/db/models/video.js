const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Channel, User, Comment, Like }) {
      this.belongsTo(Channel, { foreignKey: 'channelId' });
      this.belongsToMany(User, { as: 'likes', through: 'Likes' });
      this.hasMany(Comment, { foreignKey: 'videoId' });
      this.hasMany(Like, { foreignKey: 'videoId' });
    }
  }
  Video.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      views: DataTypes.INTEGER,
      link: DataTypes.STRING,
      fileName: DataTypes.STRING,
      preview: DataTypes.STRING,
      channelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Video',
    },
  );
  return Video;
};
