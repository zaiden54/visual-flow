const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Channel }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Channel, { foreignKey: 'channelId' });
    }
  }
  Subscription.init(
    {
      userId: DataTypes.INTEGER,
      channelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Subscription',
    },
  );
  return Subscription;
};
