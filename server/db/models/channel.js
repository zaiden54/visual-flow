const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Video, Subscription }) {
      // this.belongsToMany(User, {
      //   as: 'subscribers',
      //   through: 'Subscriptions',
      //   foreignKey: 'channelId',
      // });
      this.hasMany(Subscription, { foreignKey: 'channelId' });
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Video, { foreignKey: 'channelId' });
    }
  }
  Channel.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Channel',
    },
  );
  return Channel;
};
