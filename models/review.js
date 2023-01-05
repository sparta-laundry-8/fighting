'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Review.belongsTo(models.Supplier, {
        foreignKey: 'managerId',
        onDelete: 'NO ACTION',
      });
      models.Review.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        onDelete: 'NO ACTION',
      });
      models.Review.belongsTo(models.Laundry, {
        foreignKey: 'laundryId',
        onDelete: 'NO ACTION',
      });
    }
  }
  Review.init(
    {
      reviewId: {
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      customerId: DataTypes.BIGINT,
      supplierId: DataTypes.BIGINT,
      laundryId: DataTypes.BIGINT,
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};
